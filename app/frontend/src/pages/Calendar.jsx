import { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'

function getToken() { return localStorage.getItem('token') }

const DAYS    = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS  = ['January','February','March','April','May','June','July','August','September','October','November','December']

export default function Calendar() {
  const [tasks,   setTasks]   = useState([])
  const [today]               = useState(new Date())
  const [current, setCurrent] = useState(new Date())

  useEffect(() => {
    fetch('/api/tasks', { headers: { Authorization: `Bearer ${getToken()}` } })
      .then(r => r.json())
      .then(d => setTasks(Array.isArray(d) ? d : []))
      .catch(() => setTasks([]))
  }, [])

  const year  = current.getFullYear()
  const month = current.getMonth()

  const firstDay    = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const prevMonth = () => setCurrent(new Date(year, month - 1, 1))
  const nextMonth = () => setCurrent(new Date(year, month + 1, 1))

  // Group tasks by due_date date string
  const tasksByDate = tasks.reduce((acc, task) => {
    if (!task.due_date) return acc
    const key = new Date(task.due_date).toDateString()
    if (!acc[key]) acc[key] = []
    acc[key].push(task)
    return acc
  }, {})

  // Tasks with no due date
  const noDueDate = tasks.filter(t => !t.due_date && !t.completed)

  const cells = []
  for (let i = 0; i < firstDay; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)

  return (
    <div className="flex min-h-screen bg-bg">
      <Sidebar />
      <main className="ml-[240px] flex-1 min-h-screen overflow-y-auto">
        <div className="max-w-5xl mx-auto px-8 py-10">

          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-display font-800 text-2xl text-text1 tracking-tight">Calendar</h1>
              <p className="text-sm text-text2 mt-1">View your tasks and deadlines by date.</p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={prevMonth} className="p-2 rounded-lg bg-surface border border-border text-text2 hover:text-text1 hover:bg-surface2 transition-all">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
              </button>
              <span className="font-display font-700 text-text1 text-sm px-3 min-w-[140px] text-center">
                {MONTHS[month]} {year}
              </span>
              <button onClick={nextMonth} className="p-2 rounded-lg bg-surface border border-border text-text2 hover:text-text1 hover:bg-surface2 transition-all">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
              </button>
            </div>
          </div>

          {/* Calendar grid */}
          <div className="bg-surface border border-border rounded-2xl overflow-hidden mb-6">
            {/* Day headers */}
            <div className="grid grid-cols-7 border-b border-border">
              {DAYS.map(d => (
                <div key={d} className="px-3 py-3 text-center text-[0.7rem] font-700 text-text3 uppercase tracking-wider">
                  {d}
                </div>
              ))}
            </div>

            {/* Cells */}
            <div className="grid grid-cols-7">
              {cells.map((day, i) => {
                if (!day) return <div key={`empty-${i}`} className="min-h-[100px] border-b border-r border-border bg-surface2/30" />

                const dateObj    = new Date(year, month, day)
                const isToday    = dateObj.toDateString() === today.toDateString()
                const isPast     = dateObj < today && !isToday
                const dayTasks   = tasksByDate[dateObj.toDateString()] || []
                const isLastRow  = i >= cells.length - 7
                const isLastCol  = (i + 1) % 7 === 0

                return (
                  <div
                    key={day}
                    className={`min-h-[100px] p-2 border-border
                      ${!isLastRow ? 'border-b' : ''}
                      ${!isLastCol ? 'border-r' : ''}
                      ${isToday   ? 'bg-accent-dim' : isPast ? 'bg-surface2/20' : ''}
                      transition-colors`}
                  >
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-700 mb-1
                      ${isToday ? 'bg-accent text-white' : isPast ? 'text-text3' : 'text-text2 hover:bg-surface2'}`}>
                      {day}
                    </div>
                    <div className="flex flex-col gap-1">
                      {dayTasks.slice(0, 3).map(task => (
                        <div
                          key={task.id}
                          className={`text-[0.6rem] font-500 px-1.5 py-0.5 rounded truncate
                            ${task.completed ? 'bg-green-dim text-green line-through' : 'bg-accent-dim text-accent'}`}
                        >
                          {task.title}
                        </div>
                      ))}
                      {dayTasks.length > 3 && (
                        <div className="text-[0.6rem] text-text3 px-1">+{dayTasks.length - 3} more</div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Unscheduled tasks */}
          {noDueDate.length > 0 && (
            <div className="bg-surface border border-border rounded-xl p-5">
              <h3 className="text-xs font-700 text-text3 uppercase tracking-wider mb-3">Unscheduled Tasks</h3>
              <div className="flex flex-col gap-2">
                {noDueDate.map(task => (
                  <div key={task.id} className="flex items-center gap-3 px-3 py-2.5 bg-surface2 rounded-lg border border-border">
                    <div className="w-1.5 h-1.5 rounded-full bg-text3 flex-shrink-0" />
                    <span className="text-sm text-text2">{task.title}</span>
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
