import FeaturePageLayout from '../../components/FeaturePageLayout'

const HERO = {
  category: 'Feature',
  title: 'Centralized Project Workspaces',
  description: 'Organize tasks, milestones, files, and team collaboration inside dedicated project environments designed for scalable operations and efficient delivery.',
  icon: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 7a2 2 0 012-2h4l2 3h9a2 2 0 012 2v7a2 2 0 01-2 2H4a2 2 0 01-2-2V7z"/>
    </svg>
  ),
  color: 'text-blue-400',
  bg: 'bg-blue-400/10 border-blue-400/20',
}

const CAPABILITIES = [
  { title: 'Project Dashboards',  description: 'Each project has its own dashboard showing task counts, progress, team members, and recent activity at a glance.',               icon: '📊' },
  { title: 'Milestones',          description: 'Define project milestones to track major checkpoints. See how much of the project is complete toward each milestone.',          icon: '🏁' },
  { title: 'Timeline Tracking',   description: 'View tasks on a timeline to spot bottlenecks, overlapping work, and critical path dependencies.',                               icon: '📅' },
  { title: 'Team Assignments',    description: 'Assign team members to projects. Control who has access and what they can do within each project workspace.',                   icon: '👥' },
  { title: 'Shared Resources',    description: 'Attach links, files, and documentation directly to a project so everything your team needs is in one place.',                  icon: '📁' },
  { title: 'Project Templates',   description: 'Create reusable project templates for common workflows -- sprint cycles, feature launches, infrastructure setups, and more.', icon: '🗂️' },
]

const MOCK_PROJECTS = [
  { name: 'AWS Infrastructure',      tasks: 12, done: 8,  color: 'from-accent to-purple-500',    initial: 'A' },
  { name: 'TaskFlow Backend API',    tasks: 18, done: 14, color: 'from-green to-accent',          initial: 'T' },
  { name: 'Kubernetes Migration',    tasks: 7,  done: 2,  color: 'from-blue-500 to-accent',       initial: 'K' },
  { name: 'Frontend UI Overhaul',    tasks: 24, done: 20, color: 'from-yellow-500 to-green',      initial: 'F' },
]

export default function ProjectWorkspaces() {
  return (
    <FeaturePageLayout hero={HERO}>

      {/* Projects preview */}
      <section className="py-16 border-b border-border">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-10">
            <p className="text-xs font-700 text-accent uppercase tracking-widest mb-2">Live Preview</p>
            <h2 className="font-display font-800 text-2xl text-text1 tracking-tight">Your project workspaces</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {MOCK_PROJECTS.map((p, i) => {
              const progress = Math.round((p.done / p.tasks) * 100)
              return (
                <div key={i} className="bg-surface border border-border rounded-xl p-5 hover:bg-surface2 hover:-translate-y-1 transition-all duration-200 group">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${p.color} flex items-center justify-center text-white font-700 text-sm`}>
                      {p.initial}
                    </div>
                    <span className="text-[0.65rem] font-600 text-accent bg-accent-dim border border-accent/20 px-2 py-0.5 rounded-full">Active</span>
                  </div>
                  <h3 className="font-display font-700 text-text1 text-sm mb-3 group-hover:text-accent transition-colors">{p.name}</h3>
                  <div className="flex items-center justify-between text-xs text-text3 mb-2">
                    <span>{p.done}/{p.tasks} tasks</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="h-1.5 bg-border rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-accent to-green rounded-full transition-all" style={{ width: `${progress}%` }} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-16 border-b border-border">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-display font-800 text-2xl text-text1 tracking-tight mb-3">One workspace per project</h2>
            <p className="text-sm text-text2 max-w-xl mx-auto">Keep every project organized, focused, and accessible to the right people.</p>
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
          <h2 className="font-display font-800 text-2xl text-text1 tracking-tight mb-3">Organize your work into projects</h2>
          <p className="text-sm text-text2 mb-8">Create your first project workspace and start delivering work with clarity and focus.</p>
          <a href="/register" className="inline-block px-8 py-3.5 bg-accent hover:bg-accent-hover text-white font-700 rounded-xl text-sm transition-all shadow-accent hover:-translate-y-0.5">
            Create Your First Project
          </a>
        </div>
      </section>

    </FeaturePageLayout>
  )
}
