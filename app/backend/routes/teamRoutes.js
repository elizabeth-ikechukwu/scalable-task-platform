const express  = require('express')
const { pool } = require('../db')
const { requireAuth } = require('../middleware/auth')

const router = express.Router()

// All team routes require a valid JWT
router.use(requireAuth)

// GET /api/team - return all team members for the logged-in user's workspace
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT tm.id, tm.email, tm.role, tm.created_at,
              u.name
       FROM team_members tm
       LEFT JOIN users u ON u.email = tm.email
       WHERE tm.owner_id = $1
       ORDER BY tm.created_at ASC`,
      [req.user.id]
    )
    res.json(result.rows)
  } catch (err) {
    console.error('GET /api/team error:', err)
    res.status(500).json({ error: 'Failed to fetch team members' })
  }
})

// POST /api/team/invite - invite a team member by email
router.post('/invite', async (req, res) => {
  const { email, role } = req.body
  if (!email) {
    return res.status(400).json({ error: 'Email is required' })
  }

  const validRoles = ['admin', 'member', 'viewer']
  const memberRole = validRoles.includes(role) ? role : 'member'

  try {
    // Check if already invited
    const existing = await pool.query(
      'SELECT id FROM team_members WHERE owner_id = $1 AND email = $2',
      [req.user.id, email.toLowerCase().trim()]
    )
    if (existing.rowCount > 0) {
      return res.status(409).json({ error: 'This person has already been invited' })
    }

    const result = await pool.query(
      'INSERT INTO team_members (owner_id, email, role) VALUES ($1, $2, $3) RETURNING *',
      [req.user.id, email.toLowerCase().trim(), memberRole]
    )
    res.status(201).json(result.rows[0])
  } catch (err) {
    console.error('POST /api/team/invite error:', err)
    res.status(500).json({ error: 'Failed to send invitation' })
  }
})

// DELETE /api/team/:id - remove a team member
router.delete('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const result = await pool.query(
      'DELETE FROM team_members WHERE id = $1 AND owner_id = $2',
      [id, req.user.id]
    )
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Team member not found' })
    }
    res.status(204).send()
  } catch (err) {
    console.error('DELETE /api/team/:id error:', err)
    res.status(500).json({ error: 'Failed to remove team member' })
  }
})

module.exports = router
