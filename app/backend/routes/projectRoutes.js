const express  = require('express')
const { pool } = require('../db')
const { requireAuth } = require('../middleware/auth')

const router = express.Router()

// All project routes require a valid JWT
router.use(requireAuth)

// GET /api/projects - return all projects for the logged-in user
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM projects WHERE user_id = $1 ORDER BY created_at DESC',
      [req.user.id]
    )
    res.json(result.rows)
  } catch (err) {
    console.error('GET /api/projects error:', err)
    res.status(500).json({ error: 'Failed to fetch projects' })
  }
})

// POST /api/projects - create a new project
router.post('/', async (req, res) => {
  const { name, description } = req.body
  if (!name) {
    return res.status(400).json({ error: 'Project name is required' })
  }
  try {
    const result = await pool.query(
      'INSERT INTO projects (name, description, user_id) VALUES ($1, $2, $3) RETURNING *',
      [name.trim(), description || '', req.user.id]
    )
    res.status(201).json(result.rows[0])
  } catch (err) {
    console.error('POST /api/projects error:', err)
    res.status(500).json({ error: 'Failed to create project' })
  }
})

// DELETE /api/projects/:id - delete a project (owner only)
router.delete('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const result = await pool.query(
      'DELETE FROM projects WHERE id = $1 AND user_id = $2',
      [id, req.user.id]
    )
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Project not found' })
    }
    res.status(204).send()
  } catch (err) {
    console.error('DELETE /api/projects/:id error:', err)
    res.status(500).json({ error: 'Failed to delete project' })
  }
})

module.exports = router
