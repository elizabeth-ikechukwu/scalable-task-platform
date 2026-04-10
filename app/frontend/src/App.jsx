import { useEffect, useState } from 'react'

const API = '/api'

export default function App() {
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState('')
  const [loading, setLoading] = useState(true)
  const [adding, setAdding] = useState(false)

  const fetchTasks = async () => {
    const res = await fetch(`${API}/tasks`)
    const data = await res.json()
    setTasks(data)
    setLoading(false)
  }

  useEffect(() => { fetchTasks() }, [])

  const addTask = async () => {
    if (!title.trim()) return
    setAdding(true)
    await fetch(`${API}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title })
    })
    setTitle('')
    setAdding(false)
    fetchTasks()
  }

  const toggleTask = async (id) => {
    await fetch(`${API}/tasks/${id}`, { method: 'PATCH' })
    fetchTasks()
  }

  const deleteTask = async (id) => {
    await fetch(`${API}/tasks/${id}`, { method: 'DELETE' })
    fetchTasks()
  }

  const completed = tasks.filter(t => t.completed).length
  const remaining = tasks.filter(t => !t.completed).length
  const progress = tasks.length > 0 ? (completed / tasks.length) * 100 : 0

  return (
    <div className="app">

      {/* LEFT PANEL */}
      <div className="sidebar">
        <div className="sidebar-top">
          <div className="brand">
            <div className="brand-icon">✓</div>
            <div>
              <h1>TaskFlow</h1>
              <p className="brand-sub">Personal workspace</p>
            </div>
          </div>

          <div className="stats">
            <div className="stat-card">
              <span className="stat-number">{tasks.length}</span>
              <span className="stat-label">Total</span>
            </div>
            <div className="stat-card accent">
              <span className="stat-number">{remaining}</span>
              <span className="stat-label">Remaining</span>
            </div>
            <div className="stat-card green">
              <span className="stat-number">{completed}</span>
              <span className="stat-label">Done</span>
            </div>
          </div>

          <div className="progress-section">
            <div className="progress-header">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>

        <div className="sidebar-footer">
          <p className="built-by">Built with Node.js · Docker · Nginx</p>
          <p className="built-by">Deployed via Docker Compose</p>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="main">

        <div className="main-header">
          <div>
            <h2>My Tasks</h2>
            <p className="main-sub">Stay focused. Ship things.</p>
          </div>
        </div>

        <div className="input-area">
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addTask()}
            placeholder="What needs to be done? Press Enter or click Add..."
          />
          <button className="btn-add" onClick={addTask} disabled={adding}>
            {adding ? '...' : '+ Add Task'}
          </button>
        </div>

        <div className="task-section">
          {loading && <p className="empty">Loading your tasks...</p>}

          {!loading && tasks.length === 0 && (
            <div className="empty-state">
              <div className="empty-icon">📋</div>
              <p className="empty-title">No tasks yet</p>
              <p className="empty-desc">Add your first task above to get started</p>
            </div>
          )}

          {tasks.filter(t => !t.completed).length > 0 && (
            <div className="task-group">
              <p className="group-label">● Active</p>
              {tasks.filter(t => !t.completed).map(task => (
                <div key={task.id} className="task-item">
                  <button className="check-btn" onClick={() => toggleTask(task.id)} title="Mark complete" />
                  <span className="task-title">{task.title}</span>
                  <button className="delete-btn" onClick={() => deleteTask(task.id)}>Delete</button>
                </div>
              ))}
            </div>
          )}

          {tasks.filter(t => t.completed).length > 0 && (
            <div className="task-group">
              <p className="group-label done-label">✓ Completed</p>
              {tasks.filter(t => t.completed).map(task => (
                <div key={task.id} className="task-item completed">
                  <button className="check-btn checked" onClick={() => toggleTask(task.id)} title="Mark incomplete">✓</button>
                  <span className="task-title">{task.title}</span>
                  <button className="delete-btn" onClick={() => deleteTask(task.id)}>Delete</button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}