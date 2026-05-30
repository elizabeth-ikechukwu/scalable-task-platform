import FeaturePageLayout from '../../components/FeaturePageLayout'

const HERO = {
  category: 'Feature',
  title: 'Data-Driven Productivity Insights',
  description: 'Monitor team performance, task completion rates, operational efficiency, and project progress through visual analytics and reporting tools. Turn raw activity into actionable insights.',
  icon: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10"/>
      <line x1="12" y1="20" x2="12" y2="4"/>
      <line x1="6"  y1="20" x2="6"  y2="14"/>
    </svg>
  ),
  color: 'text-purple-400',
  bg: 'bg-purple-400/10 border-purple-400/20',
}

const CAPABILITIES = [
  { title: 'Productivity Charts',    description: 'Bar and line charts showing tasks created and completed over time. See your velocity and identify slowdowns before they become problems.',  icon: '📈' },
  { title: 'Completion Metrics',     description: 'Track your overall completion rate, average task age, and streak of productive days to build consistent habits.',                          icon: '✅' },
  { title: 'Performance Reports',    description: 'Weekly and monthly summaries of team output. Shareable reports for standups, retrospectives, and stakeholder updates.',                  icon: '📋' },
  { title: 'Activity Monitoring',    description: 'See which projects and team members are most active. Identify blockers and redistribute work before deadlines are missed.',              icon: '👁️' },
  { title: 'Task Breakdown',         description: 'Pie charts showing the ratio of active vs completed tasks, filtered by project, team member, or label.',                               icon: '🥧' },
  { title: 'Trend Analysis',         description: 'Week-over-week and month-over-month trend lines showing whether your team is accelerating or slowing down.',                            icon: '📊' },
]

const MOCK_BARS = [
  { day: 'Mon', created: 4, completed: 2 },
  { day: 'Tue', created: 2, completed: 3 },
  { day: 'Wed', created: 6, completed: 5 },
  { day: 'Thu', created: 3, completed: 4 },
  { day: 'Fri', created: 5, completed: 6 },
  { day: 'Sat', created: 1, completed: 2 },
  { day: 'Sun', created: 2, completed: 1 },
]

const MAX_VAL = 8

export default function AnalyticsFeature() {
  return (
    <FeaturePageLayout hero={HERO}>

      {/* Chart preview */}
      <section className="py-16 border-b border-border">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-10">
            <p className="text-xs font-700 text-accent uppercase tracking-widest mb-2">Live Preview</p>
            <h2 className="font-display font-800 text-2xl text-text1 tracking-tight">Your analytics dashboard</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">

            {/* Stats */}
            <div className="flex flex-col gap-4">
              {[
                { label: 'Total Tasks',      value: '24',  color: 'text-text1' },
                { label: 'Completed',        value: '18',  color: 'text-green' },
                { label: 'Completion Rate',  value: '75%', color: 'text-accent' },
              ].map(s => (
                <div key={s.label} className="bg-surface border border-border rounded-xl p-4 text-center">
                  <p className={`font-display font-800 text-3xl ${s.color}`}>{s.value}</p>
                  <p className="text-xs text-text2 uppercase tracking-wider mt-1">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Bar chart mock */}
            <div className="lg:col-span-2 bg-surface border border-border rounded-xl p-5">
              <h3 className="font-display font-700 text-text1 text-xs mb-4 uppercase tracking-wider">Daily Activity -- Last 7 Days</h3>
              <div className="flex items-end gap-2 h-32">
                {MOCK_BARS.map((b, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full flex flex-col items-center gap-0.5">
                      <div
                        className="w-full bg-accent rounded-t transition-all"
                        style={{ height: `${(b.created / MAX_VAL) * 80}px` }}
                      />
                      <div
                        className="w-full bg-green rounded-t transition-all"
                        style={{ height: `${(b.completed / MAX_VAL) * 80}px` }}
                      />
                    </div>
                    <span className="text-[0.6rem] text-text3">{b.day}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-4 mt-3">
                <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-sm bg-accent" /><span className="text-[0.65rem] text-text2">Created</span></div>
                <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-sm bg-green" /><span className="text-[0.65rem] text-text2">Completed</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-16 border-b border-border">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-display font-800 text-2xl text-text1 tracking-tight mb-3">Measure what matters</h2>
            <p className="text-sm text-text2 max-w-xl mx-auto">Real data from your actual work -- no vanity metrics, just the numbers that help you ship better.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CAPABILITIES.map((cap, i) => (
              <div key={i} className="bg-surface border border-border rounded-xl p-5 hover:bg-surface2 hover:-translate-y-1 transition-all duration-200">
                <div className="text-2xl mb-3">{cap.icon}</div>
                <h3 className="font-display font-700 text-text1 text-sm mb-2">{cap.title}</h3>
                <p className="text-xs text-text2 leading-relaxed">{cap.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="font-display font-800 text-2xl text-text1 tracking-tight mb-3">Start tracking your productivity</h2>
          <p className="text-sm text-text2 mb-8">See your real numbers and build the habit of consistent, measurable output.</p>
          <a href="/register" className="inline-block px-8 py-3.5 bg-accent hover:bg-accent-hover text-white font-700 rounded-xl text-sm transition-all shadow-accent hover:-translate-y-0.5">
            View Your Analytics
          </a>
        </div>
      </section>

    </FeaturePageLayout>
  )
}
