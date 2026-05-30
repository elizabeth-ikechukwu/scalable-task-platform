import { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, CartesianGrid, Legend,
} from 'recharts'

function getToken() { return localStorage.getItem('token') }

const CHART_COLORS = ['#6366f1', '#22c55e', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4']

function StatCard({ label, value, sub, accent, green }) {
  return (
    <div className={`rounded-xl border p-5 ${accent ? 'bg-accent-dim border-accent/25' : green ? 'bg-green-dim border-green/25' : 'bg-surface border-border'}`}>
      <p className={`font-display font-800 text-3xl leading-none mb-1 ${accent ? 'text-[#818cf8]' : green ? 'text-green' : 'text-text1'}`}>{value}</p>
      <p className="text-xs font-600 text-text2 uppercase tracking-wider">{label}</p>
      {sub && <p className="text-xs text-text3 mt-1">{sub}</p>}
    </div>
  )
}

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-surface2 border border-border rounded-lg px-3 py-2 text-xs shadow-lg">
      <p className="text-text2 mb-1">{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color }} className="font-600">{p.name}: {p.value}</p>
      ))}
    </div>
  )
}

export default function Analytics() {
  const [tasks,   setTasks]   = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/tasks', { headers: { Authorization: `Bearer ${getToken()}` } })
      .then(r => r.json())
      .then(d => setTasks(Array.isArray(d) ? d : []))
      .catch(() => setTasks([]))
      .finally(() => setLoading(false))
  }, [])

  const total     = tasks.length
  const completed = tasks.filter(t => t.completed).length
  const active    = tasks.filter(t => !t.completed).length
  const rate      = total > 0 ? Math.round((completed / total) * 100) : 0

  // Tasks created per day (last 7 days)
  const last7 = [...Array(7)].map((_, i) => {
    const d    = new Date()
    d.setDate(d.getDate() - (6 - i))
    const key  = d.toDateString()
    const label = d.toLocaleDateString('en-US', { weekday: 'short' })
    const created   = tasks.filter(t => new Date(t.created_at).toDateString() === key).length
    const done      = tasks.filter(t => t.completed && new Date(t.created_at).toDateString() === key).length
    return { day: label, Created: created, Completed: done }
  })

  // Pie chart data
  const pieData = [
    { name: 'Completed', value: completed || 0 },
    { name: 'Active',    value: active    || 0 },
  ]

  // Task creation trend (last 4 weeks)
  const weeklyData = [...Array(4)].map((_, i) => {
    const weekStart = new Date()
    weekStart.setDate(weekStart.getDate() - (3 - i) * 7 - weekStart.getDay())
    const weekEnd = new Date(weekStart)
    weekEnd.setDate(weekEnd.getDate() + 6)
    const count = tasks.filter(t => {
      const d = new Date(t.created_at)
      return d >= weekStart && d <= weekEnd
    }).length
    return { week: `W${i + 1}`, Tasks: count }
  })

  return (
    <div className="flex min-h-screen bg-bg">
      <Sidebar />
      <main className="ml-[240px] flex-1 min-h-screen overflow-y-auto">
        <div className="max-w-5xl mx-auto px-8 py-10">

          <div className="mb-8">
            <h1 className="font-display font-800 text-2xl text-text1 tracking-tight">Analytics</h1>
            <p className="text-sm text-text2 mt-1">Track your productivity and task completion over time.</p>
          </div>

          {loading && (
            <div className="flex items-center justify-center py-16">
              <div className="w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          {!loading && (
            <>
              {/* Stats row */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <StatCard label="Total Tasks"      value={total}        />
                <StatCard label="Completed"        value={completed}    green />
                <StatCard label="Active"           value={active}       accent />
                <StatCard label="Completion Rate"  value={`${rate}%`}   sub={rate >= 50 ? 'Great work!' : 'Keep going!'} />
              </div>

              {/* Charts row 1 */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">

                {/* Bar chart - daily activity */}
                <div className="lg:col-span-2 bg-surface border border-border rounded-xl p-5">
                  <h3 className="font-display font-700 text-text1 text-sm mb-4">Daily Activity (Last 7 Days)</h3>
                  {total === 0 ? (
                    <div className="flex items-center justify-center h-40 text-sm text-text3">No task data yet</div>
                  ) : (
                    <ResponsiveContainer width="100%" height={180}>
                      <BarChart data={last7} barSize={12} barGap={4}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e2028" vertical={false} />
                        <XAxis dataKey="day" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} allowDecimals={false} />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend wrapperStyle={{ fontSize: '11px', color: '#94a3b8' }} />
                        <Bar dataKey="Created"   fill="#6366f1" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="Completed" fill="#22c55e" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  )}
                </div>

                {/* Pie chart - completion breakdown */}
                <div className="bg-surface border border-border rounded-xl p-5">
                  <h3 className="font-display font-700 text-text1 text-sm mb-4">Task Breakdown</h3>
                  {total === 0 ? (
                    <div className="flex items-center justify-center h-40 text-sm text-text3">No task data yet</div>
                  ) : (
                    <>
                      <ResponsiveContainer width="100%" height={140}>
                        <PieChart>
                          <Pie data={pieData} cx="50%" cy="50%" innerRadius={40} outerRadius={65} paddingAngle={3} dataKey="value">
                            {pieData.map((_, i) => (
                              <Cell key={i} fill={CHART_COLORS[i]} />
                            ))}
                          </Pie>
                          <Tooltip content={<CustomTooltip />} />
                        </PieChart>
                      </ResponsiveContainer>
                      <div className="flex flex-col gap-2 mt-2">
                        {pieData.map((item, i) => (
                          <div key={item.name} className="flex items-center justify-between text-xs">
                            <div className="flex items-center gap-2">
                              <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: CHART_COLORS[i] }} />
                              <span className="text-text2">{item.name}</span>
                            </div>
                            <span className="font-600 text-text1">{item.value}</span>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Line chart - weekly trend */}
              <div className="bg-surface border border-border rounded-xl p-5">
                <h3 className="font-display font-700 text-text1 text-sm mb-4">Weekly Task Creation Trend</h3>
                {total === 0 ? (
                  <div className="flex items-center justify-center h-40 text-sm text-text3">No task data yet</div>
                ) : (
                  <ResponsiveContainer width="100%" height={160}>
                    <LineChart data={weeklyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e2028" vertical={false} />
                      <XAxis dataKey="week" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} allowDecimals={false} />
                      <Tooltip content={<CustomTooltip />} />
                      <Line type="monotone" dataKey="Tasks" stroke="#6366f1" strokeWidth={2.5} dot={{ fill: '#6366f1', r: 4 }} activeDot={{ r: 6 }} />
                    </LineChart>
                  </ResponsiveContainer>
                )}
              </div>
            </>
          )}

        </div>
      </main>
    </div>
  )
}
