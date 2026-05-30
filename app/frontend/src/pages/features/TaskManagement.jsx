import FeaturePageLayout from '../../components/FeaturePageLayout'

const HERO = {
  category: 'Feature',
  title: 'Task Management Built for Productivity',
  description: 'Create, organize, prioritize, and monitor tasks using flexible workflows designed for modern teams. Track deadlines, manage priorities, and maintain full visibility across projects from one centralized workspace.',
  icon: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
    </svg>
  ),
  color: 'text-accent',
  bg: 'bg-accent-dim border-accent/20',
}

const CAPABILITIES = [
  {
    title: 'Kanban Boards',
    description: 'Visualize work in progress with drag-and-drop Kanban boards. Move tasks across columns -- To Do, In Progress, Review, Done -- and see your workflow at a glance.',
    icon: '⬛',
  },
  {
    title: 'Task Priorities',
    description: 'Mark tasks as urgent, high, medium, or low priority. Filter and sort by priority to always work on what matters most.',
    icon: '🔴',
  },
  {
    title: 'Due Dates',
    description: 'Set deadlines on individual tasks. Tasks approaching their due date are highlighted so nothing slips through the cracks.',
    icon: '📅',
  },
  {
    title: 'Labels and Tags',
    description: 'Categorize tasks with color-coded labels. Group by feature, team, sprint, or any custom taxonomy that fits your workflow.',
    icon: '🏷️',
  },
  {
    title: 'Task Filtering',
    description: 'Filter tasks by status, assignee, priority, label, or date range. Find exactly what you need in seconds across large task lists.',
    icon: '🔍',
  },
  {
    title: 'Activity Tracking',
    description: 'Every task change is logged. See who created, updated, or completed a task and when -- giving you a full audit trail.',
    icon: '📊',
  },
]

const MOCK_TASKS = [
  { title: 'Set up RDS with Terraform',         priority: 'high',   status: 'done',        label: 'Infrastructure' },
  { title: 'Configure OIDC GitHub Actions',      priority: 'high',   status: 'done',        label: 'CI/CD' },
  { title: 'Implement JWT authentication',       priority: 'urgent', status: 'in-progress', label: 'Backend' },
  { title: 'SSM Parameter Store integration',    priority: 'medium', status: 'todo',        label: 'Security' },
  { title: 'Build Analytics dashboard',          priority: 'medium', status: 'todo',        label: 'Frontend' },
  { title: 'Deploy to Kubernetes',               priority: 'low',    status: 'todo',        label: 'DevOps' },
]

const PRIORITY_COLORS = {
  urgent: 'text-red bg-red-dim border-red/20',
  high:   'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
  medium: 'text-accent bg-accent-dim border-accent/20',
  low:    'text-text3 bg-surface2 border-border',
}

const STATUS_COLORS = {
  done:        'text-green bg-green-dim border-green/20',
  'in-progress': 'text-accent bg-accent-dim border-accent/20',
  todo:        'text-text3 bg-surface2 border-border',
}

export default function TaskManagement() {
  return (
    <FeaturePageLayout hero={HERO}>

      {/* Interactive task list preview */}
      <section className="py-16 border-b border-border">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-10">
            <p className="text-xs font-700 text-accent uppercase tracking-widest mb-2">Live Preview</p>
            <h2 className="font-display font-800 text-2xl text-text1 tracking-tight">See it in action</h2>
          </div>
          <div className="bg-surface border border-border rounded-2xl overflow-hidden max-w-3xl mx-auto">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-surface2">
              <span className="w-2.5 h-2.5 rounded-full bg-red/60" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
              <span className="w-2.5 h-2.5 rounded-full bg-green/60" />
              <span className="ml-3 text-xs text-text3">devopsbliss.online/dashboard/tasks</span>
            </div>
            <div className="p-4 flex flex-col gap-2">
              {MOCK_TASKS.map((task, i) => (
                <div key={i} className="flex items-center gap-3 bg-surface2 border border-border rounded-lg px-3 py-2.5 hover:border-accent/30 transition-colors">
                  <div className={`w-4 h-4 rounded flex items-center justify-center flex-shrink-0 ${task.status === 'done' ? 'bg-green border-green' : 'border-2 border-text3'}`}>
                    {task.status === 'done' && <svg width="8" height="8" viewBox="0 0 12 12" fill="none" stroke="white" strokeWidth="2.5"><polyline points="1.5,6 5,9.5 10.5,2.5"/></svg>}
                  </div>
                  <span className={`flex-1 text-xs font-500 ${task.status === 'done' ? 'line-through text-text3' : 'text-text1'}`}>{task.title}</span>
                  <span className={`text-[0.6rem] font-600 px-1.5 py-0.5 rounded-full border ${PRIORITY_COLORS[task.priority]}`}>{task.priority}</span>
                  <span className={`text-[0.6rem] font-600 px-1.5 py-0.5 rounded-full border hidden sm:block ${STATUS_COLORS[task.status]}`}>{task.status}</span>
                  <span className="text-[0.6rem] text-text3 hidden md:block">{task.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities grid */}
      <section className="py-16 border-b border-border">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-display font-800 text-2xl text-text1 tracking-tight mb-3">Everything you need to stay organized</h2>
            <p className="text-sm text-text2 max-w-xl mx-auto">Built for engineers, product teams, and anyone who ships work consistently.</p>
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
          <h2 className="font-display font-800 text-2xl text-text1 tracking-tight mb-3">Start managing tasks the right way</h2>
          <p className="text-sm text-text2 mb-8">Join TaskFlow and bring structure to your work from day one.</p>
          <a href="/register" className="inline-block px-8 py-3.5 bg-accent hover:bg-accent-hover text-white font-700 rounded-xl text-sm transition-all shadow-accent hover:-translate-y-0.5">
            Get Started Free
          </a>
        </div>
      </section>

    </FeaturePageLayout>
  )
}
