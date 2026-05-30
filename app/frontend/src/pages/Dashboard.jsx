import { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import { EmptyTasks } from '../components/EmptyState'

const API = '/api'

/* ---- Sub-components ---- */

function StatCard({ value, label, accent, green }) {
  return (
    <div className={`
      rounded-xl border p-5 flex flex-col gap-1 transition-colors duration-150
      ${accent ? 'bg-accent-dim border-accent/25' : green ? 'bg-green-dim border-green/25' : 'bg-surface2 border-border hover:border-text3'}
    `}>
      <span className={`font-display font-800 text-3xl leading-none ${accent ? 'text-[#818cf8]' : green ? 'text-green' : 'text-text1'}`}>
        {value}
      </span>
      <span className="text-xs font-500 text-text2 uppercase tracking-wider">{label}</span>
    </div>
  )
}

function ProgressBar({ value }) {
  return (
    <div className="rounded-xl border border-border bg-surface2 p-5">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-700 text-text2 uppercase tracking-wider">Overall Progress</span>
        <span className="text-sm font-700 text-accent">{Math.round(value)}%</span>
      </div>
      <div className="h-2 bg-border rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-accent to-green rounded-full progress-fill"
          style={{ width: `${value}%` }}
        />
      </div>
      <p className="mt-2 text-xs text-text3">
        {value === 100 ? 'All tasks complete!' : value === 0 ? 'No tasks completed yet' : 'Keep going, you\'re making progress'}
      </p>
    </div>
  )
}

function TaskItem({ task, onToggle, onDelete }) {
  return (
    <div className={`
      flex items-center gap-3 rounded-xl border px-4 py-3.5 transition-all duration-150 animate-slide-in
      ${task.completed
        ? 'bg-green-dim border-green/20 hover:border-green/40'
        : 'bg-surface border-border hover:border-accent/40 hover:bg-surface2 hover:translate-x-0.5'
      }
    `}>
      {/* Check button */}
      <button
        onClick={() => onToggle(task.id)}
        title={task.completed ? 'Mark incomplete' : 'Mark complete'}
        className={`
          w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all duration-150
          ${task.completed
            ? 'bg-green border-green'
            : 'border-text3 hover:border-green hover:bg-green-dim'
          }
        `}
      >
        {task.completed && (
          <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="white" strokeWidth="2.5">
            <polyline points="1.5,6 5,9.5 10.5,2.5"/>
          </svg>
        )}
      </button>

      {/* Title */}
      <span className={`flex-1 text-sm font-500 leading-snug ${task.completed ? 'line-through text-text3 decoration-green decoration-2' : 'text-text1'}`}>
        {task.title}
      </span>

      {/* Delete button */}
      <button
        onClick={() => onDelete(task.id)}
        className="flex-shrink-0 px-2.5 py-1 rounded-md text-xs font-600 text-red bg-red-dim border border-red/20 hover:bg-red hover:text-white hover:border-red transition-all duration-150"
      >
        Delete
      </button>
    </div>
  )
}

/* ---- Dashboard page ---- */
export default function Dashboard() {
  const [tasks,    setTasks]    = useState([])
  const [title,    setTitle]    = useState('')
  const [loading,  setLoading]  = useState(true)
  const [adding,   setAdding]   = useState(false)
  const [inputFocused, setInputFocused] = useState(false)

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`${API}/tasks`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      })
      const data = await res.json()
      setTasks(Array.isArray(data) ? data : [])
    } catch {
      setTasks([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchTasks() }, [])

  const addTask = async () => {
    if (!title.trim()) return
    setAdding(true)
    try {
      const token = localStorage.getItem('token')
      await fetch(`${API}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ title }),
      })
      setTitle('')
      fetchTasks()
    } finally {
      setAdding(false)
    }
  }

  const toggleTask = async id => {
    const token = localStorage.getItem('token')
    await fetch(`${API}/tasks/${id}`, {
      method: 'PATCH',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
    fetchTasks()
  }

  const deleteTask = async id => {
    const token = localStorage.getItem('token')
    await fetch(`${API}/tasks/${id}`, {
      method: 'DELETE',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
    fetchTasks()
  }

  const completed = tasks.filter(t => t.completed).length
  const remaining = tasks.filter(t => !t.completed).length
  const progress  = tasks.length > 0 ? (completed / tasks.length) * 100 : 0

  const now = new Date()
  const hour = now.getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  return (
    <div className="flex min-h-screen bg-bg">
      <Sidebar />

      {/* Main content - offset by sidebar width */}
      <main className="ml-[240px] flex-1 min-h-screen overflow-y-auto">
        <div className="max-w-4xl mx-auto px-8 py-10">

          {/* ---- Welcome card ---- */}
          <div className="relative rounded-2xl border border-border bg-surface overflow-hidden mb-8 p-7">
            {/* Background glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/8 rounded-full blur-[80px] translate-x-1/3 -translate-y-1/3 pointer-events-none" />
            <div className="relative z-10">
              <p className="text-xs font-700 text-text3 uppercase tracking-widest mb-1">
                {now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              </p>
              <h1 className="font-display font-800 text-2xl text-text1 tracking-tight mb-1">
                {greeting} <span className="animate-fade-in">&#128075;</span>
              </h1>
              <p className="text-sm text-text2 font-500">Stay focused, organized, and in control of your work.</p>
              <p className="text-xs text-text3 mt-2 max-w-xl leading-relaxed">
                Track active projects, manage deadlines, collaborate with your team, and monitor progress from a single dashboard built for productivity at scale.
              </p>
            </div>
          </div>

          {/* ---- Stats row ---- */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <StatCard value={tasks.length} label="Total Tasks" />
            <StatCard value={remaining}    label="Remaining"   accent />
            <StatCard value={completed}    label="Completed"   green />
            <StatCard value={`${Math.round(progress)}%`} label="Progress" />
          </div>

          {/* ---- Progress bar ---- */}
          <div className="mb-8">
            <ProgressBar value={progress} />
          </div>

          {/* ---- Tasks panel ---- */}
          <div className="rounded-2xl border border-border bg-surface overflow-hidden">
            <div className="px-6 py-5 border-b border-border flex items-center justify-between">
              <div>
                <h2 className="font-display font-700 text-text1 tracking-tight">My Tasks</h2>
                <p className="text-xs text-text3 mt-0.5">Stay focused. Ship things.</p>
              </div>
              <span className="text-xs font-600 text-text3 bg-surface2 border border-border rounded-full px-3 py-1">
                {tasks.length} total
              </span>
            </div>

            <div className="p-6">
              {/* Input */}
              <div className={`flex gap-3 mb-6 p-1 rounded-xl border transition-all duration-150 ${inputFocused ? 'border-accent bg-surface2 shadow-[0_0_0_3px_rgba(99,102,241,0.1)]' : 'border-border bg-surface2'}`}>
                <input
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && addTask()}
                  onFocus={() => setInputFocused(true)}
                  onBlur={() => setInputFocused(false)}
                  placeholder="What needs to be done? Press Enter to add..."
                  className="flex-1 bg-transparent px-3 py-2.5 text-sm text-text1 placeholder-text3 outline-none"
                />
                <button
                  onClick={addTask}
                  disabled={adding || !title.trim()}
                  className="px-5 py-2.5 bg-accent hover:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-700 rounded-lg transition-all duration-150 whitespace-nowrap flex-shrink-0"
                >
                  {adding ? '...' : '+ Add Task'}
                </button>
              </div>

              {/* Task list */}
              {loading && (
                <div className="flex flex-col items-center py-16 gap-3">
                  <div className="w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin" />
                  <p className="text-xs text-text3">Loading your tasks...</p>
                </div>
              )}

              {!loading && tasks.length === 0 && (
                <EmptyTasks onAdd={() => document.querySelector('input')?.focus()} />
              )}

              {!loading && tasks.length > 0 && (
                <div className="flex flex-col gap-6">
                  {/* Active tasks */}
                  {tasks.filter(t => !t.completed).length > 0 && (
                    <div>
                      <p className="text-[0.7rem] font-700 text-accent uppercase tracking-widest mb-2 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block" />
                        Active ({tasks.filter(t => !t.completed).length})
                      </p>
                      <div className="flex flex-col gap-2">
                        {tasks.filter(t => !t.completed).map(task => (
                          <TaskItem key={task.id} task={task} onToggle={toggleTask} onDelete={deleteTask} />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Completed tasks */}
                  {tasks.filter(t => t.completed).length > 0 && (
                    <div>
                      <p className="text-[0.7rem] font-700 text-green uppercase tracking-widest mb-2 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-green inline-block" />
                        Completed ({tasks.filter(t => t.completed).length})
                      </p>
                      <div className="flex flex-col gap-2">
                        {tasks.filter(t => t.completed).map(task => (
                          <TaskItem key={task.id} task={task} onToggle={toggleTask} onDelete={deleteTask} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Bottom metadata */}
          <p className="mt-6 text-center text-xs text-text3">
            Node.js - Express - PostgreSQL on AWS RDS - Docker - Nginx - Terraform
          </p>
        </div>
      </main>
    </div>
  )
}
