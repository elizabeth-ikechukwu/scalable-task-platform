require('dotenv').config()
const express       = require('express')
const { initDb }    = require('./db')
const authRoutes    = require('./routes/authRoutes')
const taskRoutes    = require('./routes/taskRoutes')
const projectRoutes = require('./routes/projectRoutes')
const teamRoutes    = require('./routes/teamRoutes')

const app  = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

// -- Health and root ----------------------------------

app.get('/api', (req, res) => {
  res.json({ message: 'Task API is running', version: '3.0.0' })
})

app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  })
})

// -- Routes -------------------------------------------

app.use('/api/auth',     authRoutes)
app.use('/api/tasks',    taskRoutes)
app.use('/api/projects', projectRoutes)
app.use('/api/team',     teamRoutes)

// -- Error handlers -----------------------------------

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' })
})

app.use((err, req, res, _next) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Internal server error' })
})

// -- Start --------------------------------------------

if (require.main === module) {
  initDb()
    .then(() => {
      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
      })
    })
    .catch((err) => {
      console.error('Failed to initialise database:', err)
      process.exit(1)
    })
}

module.exports = app
