import { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import { EmptyTasks } from '../components/EmptyState'

const API = '/api'
function getToken() { return localStorage.getItem('token') }
function authHeader() { return { Authorization: `Bearer ${getToken()}` } }

export default function Tasks() {
  const [tasks,   setTasks]   = useState([])
  const [loading, setLoading] = useState(true)
  const [title,   setTitle]   = useState('')
  const [adding,  setAdding]  = useState(false)
  const [filter,  setFilter]  = useState('all') // all | active | completed

  const fetchTasks = async () => {
    try {
      const res  = await fetch(`${API}/tasks`, { headers: authHeader() })
      const data = await res.json()
      setTasks(Array.isArray(data) ? data : [])
    } catch { setTasks([]) }
    finally  { setLoading(false) }
  }

  useEffect(() => { fetchTasks() }, [])

  const addTask = async () => {
    if (!title.trim()) return
    setAdding(true)
    await fetch(`${API}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...authHeader() },
      body: JSON.stringify({ title }),
    })
    setTitle('')
    setAdding(false)
    fetchTasks()
  }

  const toggleTask = async id => {
    await fetch(`${API}/tasks/${id}`, { method: 'PATCH', headers: authHeader() })
    fetchTasks()
  }

  const deleteTask = async id => {
    await fetch(`${API}/tasks/${id}`, { method: 'DELETE', headers: authHeader() })
    fetchTasks()
  }

  const filtered = tasks.filter(t =>
    filter === 'all' ? true : filter === 'active' ? !t.completed : t.completed
  )

  const completed = tasks.filter(t => t.completed).length
  const active    = tasks.filter(t => !t.completed).length

  return (
    <div className="flex min-h-screen bg-bg">
      <Sidebar />
      <main className="ml-[240px] flex-1 min-h-screen overflow-y-auto">
        <div className="max-w-3xl mx-auto px-8 py-10">

          {/* Header */}
          <div className="mb-8">
            <h1 className="font-display font-800 text-2xl text-text1 tracking-tight">Tasks</h1>
            <p className="text-sm text-text2 mt-1">Manage and track all your tasks in one place.</p>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {[
              { label: 'Total',     value: tasks.length, color: 'text-text1' },
              { label: 'Active',    value: active,       color: 'text-[#818cf8]' },
              { label: 'Completed', value: completed,    color: 'text-green' },
            ].map(s => (
              <div key={s.label} className="bg-surface border border-border rounded-xl p-4 text-center">
                <p className={`font-display font-800 text-2xl ${s.color}`}>{s.value}</p>
                <p className="text-xs text-text2 uppercase tracking-wider mt-1">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="flex gap-3 mb-6">
            <input
              value={title}
              onChange={e => setTitle(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addTask()}
              placeholder="Add a new task and press Enter..."
              className="flex-1 bg-surface border border-border rounded-lg px-4 py-3 text-sm text-text1 placeholder-text3 outline-none focus:border-accent focus:ring-2 focus:ring-accent/15 transition-all"
            />
            <button
              onClick={addTask}
              disabled={adding || !title.trim()}
              className="px-5 py-3 bg-accent hover:bg-accent-hover disabled:opacity-50 text-white text-sm font-700 rounded-lg transition-all shadow-accent whitespace-nowrap"
            >
              {adding ? '...' : '+ Add'}
            </button>
          </div>

          {/* Filter tabs */}
          <div className="flex gap-1 mb-6 bg-surface2 border border-border rounded-lg p-1 w-fit">
            {['all', 'active', 'completed'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-1.5 rounded-md text-xs font-600 capitalize transition-all duration-150
                  ${filter === f ? 'bg-accent text-white shadow-accent' : 'text-text2 hover:text-text1'}`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Task list */}
          {loading && (
            <div className="flex items-center justify-center py-16">
              <div className="w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          {!loading && tasks.length === 0 && (
            <EmptyTasks onAdd={() => document.querySelector('input')?.focus()} />
          )}

          {!loading && tasks.length > 0 && filtered.length === 0 && (
            <div className="text-center py-16">
              <p className="text-text2 text-sm">No {filter} tasks found.</p>
            </div>
          )}

          {!loading && filtered.length > 0 && (
            <div className="flex flex-col gap-2">
              {filtered.map(task => (
                <div
                  key={task.id}
                  className={`flex items-center gap-3 rounded-xl border px-4 py-3.5 transition-all duration-150 animate-slide-in
                    ${task.completed
                      ? 'bg-green-dim border-green/20'
                      : 'bg-surface border-border hover:border-accent/40 hover:bg-surface2'
                    }`}
                >
                  <button
                    onClick={() => toggleTask(task.id)}
                    className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all
                      ${task.completed ? 'bg-green border-green' : 'border-text3 hover:border-green hover:bg-green-dim'}`}
                  >
                    {task.completed && (
                      <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="white" strokeWidth="2.5">
                        <polyline points="1.5,6 5,9.5 10.5,2.5"/>
                      </svg>
                    )}
                  </button>
                  <span className={`flex-1 text-sm font-500 ${task.completed ? 'line-through text-text3 decoration-green' : 'text-text1'}`}>
                    {task.title}
                  </span>
                  <span className="text-[0.65rem] text-text3 flex-shrink-0 hidden sm:block">
                    {new Date(task.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="flex-shrink-0 p-1.5 rounded-lg text-text3 hover:text-red hover:bg-red-dim transition-all"
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="3 6 5 6 21 6"/>
                      <path d="M19 6l-1 14H6L5 6"/>
                      <path d="M10 11v6M14 11v6"/>
                      <path d="M9 6V4h6v2"/>
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}

        </div>
      </main>
    </div>
  )
}
