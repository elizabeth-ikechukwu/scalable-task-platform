import { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'

function getToken() { return localStorage.getItem('token') }

function timeAgo(date) {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000)
  if (seconds < 60)   return 'just now'
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
  return `${Math.floor(seconds / 86400)}d ago`
}

function ActivityIcon({ type }) {
  if (type === 'completed') return (
    <div className="w-8 h-8 rounded-full bg-green-dim border border-green/30 flex items-center justify-center flex-shrink-0">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
    </div>
  )
  if (type === 'created') return (
    <div className="w-8 h-8 rounded-full bg-accent-dim border border-accent/30 flex items-center justify-center flex-shrink-0">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
    </div>
  )
  if (type === 'deleted') return (
    <div className="w-8 h-8 rounded-full bg-red-dim border border-red/30 flex items-center justify-center flex-shrink-0">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/></svg>
    </div>
  )
  return (
    <div className="w-8 h-8 rounded-full bg-surface2 border border-border flex items-center justify-center flex-shrink-0">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2"><circle cx="12" cy="12" r="10"/></svg>
    </div>
  )
}

export default function Activity() {
  const [tasks,   setTasks]   = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/tasks', { headers: { Authorization: `Bearer ${getToken()}` } })
      .then(r => r.json())
      .then(d => setTasks(Array.isArray(d) ? d : []))
      .catch(() => setTasks([]))
      .finally(() => setLoading(false))
  }, [])

  // Build activity feed from tasks
  const activities = tasks.flatMap(task => {
    const events = []
    events.push({ id: `${task.id}-created`, type: 'created', title: task.title, date: task.created_at })
    if (task.completed) {
      events.push({ id: `${task.id}-completed`, type: 'completed', title: task.title, date: task.created_at })
    }
    return events
  }).sort((a, b) => new Date(b.date) - new Date(a.date))

  const ACTION_TEXT = {
    created:   'created task',
    completed: 'completed task',
    deleted:   'deleted task',
    updated:   'updated task',
  }

  return (
    <div className="flex min-h-screen bg-bg">
      <Sidebar />
      <main className="ml-[240px] flex-1 min-h-screen overflow-y-auto">
        <div className="max-w-2xl mx-auto px-8 py-10">

          <div className="mb-8">
            <h1 className="font-display font-800 text-2xl text-text1 tracking-tight">Activity</h1>
            <p className="text-sm text-text2 mt-1">A log of everything that has happened in your workspace.</p>
          </div>

          {loading && (
            <div className="flex items-center justify-center py-16">
              <div className="w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          {!loading && activities.length === 0 && (
            <div className="flex flex-col items-center py-20 gap-3 text-center">
              <div className="w-14 h-14 rounded-2xl bg-surface2 border border-border flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3d4257" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                </svg>
              </div>
              <p className="font-display font-700 text-text2">No activity yet</p>
              <p className="text-sm text-text3">Start creating and completing tasks to see your activity here.</p>
            </div>
          )}

          {!loading && activities.length > 0 && (
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />

              <div className="flex flex-col gap-1">
                {activities.map((activity, i) => (
                  <div key={activity.id} className="flex items-start gap-4 pl-0 animate-fade-up" style={{ animationDelay: `${i * 0.03}s` }}>
                    <div className="relative z-10 flex-shrink-0">
                      <ActivityIcon type={activity.type} />
                    </div>
                    <div className="flex-1 bg-surface border border-border rounded-xl px-4 py-3 mb-3 hover:bg-surface2 transition-colors">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-xs text-text3 mb-0.5 uppercase tracking-wider font-600">
                            {ACTION_TEXT[activity.type] || activity.type}
                          </p>
                          <p className="text-sm text-text1 font-500 leading-snug">{activity.title}</p>
                        </div>
                        <span className="text-[0.65rem] text-text3 flex-shrink-0 mt-0.5">{timeAgo(activity.date)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  )
}
