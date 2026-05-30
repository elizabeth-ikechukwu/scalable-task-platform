import { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import { EmptyNotifications } from '../components/EmptyState'

function getToken() { return localStorage.getItem('token') }

// Notification types and their styles
const TYPE_CONFIG = {
  deadline: {
    color: 'text-yellow-400',
    bg:    'bg-yellow-400/10 border-yellow-400/20',
    icon:  (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
  },
  completed: {
    color: 'text-green',
    bg:    'bg-green-dim border-green/20',
    icon:  (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
    ),
  },
  mention: {
    color: 'text-accent',
    bg:    'bg-accent-dim border-accent/20',
    icon:  (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="4"/>
        <path d="M16 8v5a3 3 0 006 0v-1a10 10 0 10-3.92 7.94"/>
      </svg>
    ),
  },
  system: {
    color: 'text-text2',
    bg:    'bg-surface2 border-border',
    icon:  (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="8" x2="12" y2="12"/>
        <line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
    ),
  },
}

function timeAgo(date) {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000)
  if (seconds < 60)    return 'just now'
  if (seconds < 3600)  return `${Math.floor(seconds / 60)}m ago`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
  return `${Math.floor(seconds / 86400)}d ago`
}

export default function Notifications() {
  const [notifications, setNotifications] = useState([])
  const [loading,       setLoading]       = useState(true)

  useEffect(() => {
    // Build notifications from tasks
    fetch('/api/tasks', { headers: { Authorization: `Bearer ${getToken()}` } })
      .then(r => r.json())
      .then(tasks => {
        if (!Array.isArray(tasks)) { setNotifications([]); return }

        const notifs = []

        // System welcome notification
        notifs.push({
          id:      'system-welcome',
          type:    'system',
          title:   'Welcome to TaskFlow',
          message: 'Your workspace is ready. Start by creating your first task or inviting a team member.',
          date:    new Date().toISOString(),
          read:    false,
        })

        // Completed task notifications
        tasks.filter(t => t.completed).forEach(task => {
          notifs.push({
            id:      `completed-${task.id}`,
            type:    'completed',
            title:   'Task completed',
            message: `"${task.title}" was marked as complete.`,
            date:    task.created_at,
            read:    false,
          })
        })

        // Active task reminders
        tasks.filter(t => !t.completed).slice(0, 2).forEach(task => {
          notifs.push({
            id:      `reminder-${task.id}`,
            type:    'deadline',
            title:   'Task pending',
            message: `"${task.title}" is still in progress. Stay on track!`,
            date:    task.created_at,
            read:    true,
          })
        })

        setNotifications(notifs.sort((a, b) => new Date(b.date) - new Date(a.date)))
      })
      .catch(() => setNotifications([]))
      .finally(() => setLoading(false))
  }, [])

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }

  const markRead = id => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))
  }

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <div className="flex min-h-screen bg-bg">
      <Sidebar />
      <main className="ml-[240px] flex-1 min-h-screen overflow-y-auto">
        <div className="max-w-2xl mx-auto px-8 py-10">

          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-display font-800 text-2xl text-text1 tracking-tight flex items-center gap-3">
                Notifications
                {unreadCount > 0 && (
                  <span className="bg-accent text-white text-xs font-700 px-2 py-0.5 rounded-full">
                    {unreadCount}
                  </span>
                )}
              </h1>
              <p className="text-sm text-text2 mt-1">Stay updated on your workspace activity.</p>
            </div>
            {unreadCount > 0 && (
              <button
                onClick={markAllRead}
                className="text-xs font-600 text-accent hover:underline transition-colors"
              >
                Mark all as read
              </button>
            )}
          </div>

          {loading && (
            <div className="flex items-center justify-center py-16">
              <div className="w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          {!loading && notifications.length === 0 && <EmptyNotifications />}

          {!loading && notifications.length > 0 && (
            <div className="flex flex-col gap-2">
              {notifications.map((notif, i) => {
                const config = TYPE_CONFIG[notif.type] || TYPE_CONFIG.system
                return (
                  <div
                    key={notif.id}
                    onClick={() => markRead(notif.id)}
                    className={`flex items-start gap-4 p-4 rounded-xl border transition-all duration-150 cursor-pointer animate-fade-up
                      ${notif.read ? 'bg-surface border-border opacity-70 hover:opacity-100' : 'bg-surface border-border hover:bg-surface2'}
                    `}
                    style={{ animationDelay: `${i * 0.04}s` }}
                  >
                    <div className={`w-8 h-8 rounded-full border flex items-center justify-center flex-shrink-0 ${config.bg} ${config.color}`}>
                      {config.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <p className="text-sm font-600 text-text1">{notif.title}</p>
                        {!notif.read && <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />}
                      </div>
                      <p className="text-xs text-text2 leading-relaxed">{notif.message}</p>
                    </div>
                    <span className="text-[0.65rem] text-text3 flex-shrink-0">{timeAgo(notif.date)}</span>
                  </div>
                )
              })}
            </div>
          )}

        </div>
      </main>
    </div>
  )
}
