import FeaturePageLayout from '../../components/FeaturePageLayout'

const HERO = {
  category: 'Feature',
  title: 'Collaborate Across Teams in Real Time',
  description: 'Keep everyone aligned with shared workspaces, instant communication, collaborative task tracking, and centralized project coordination. Built for teams that move fast and need to stay in sync.',
  icon: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
    </svg>
  ),
  color: 'text-green',
  bg: 'bg-green-dim border-green/20',
}

const CAPABILITIES = [
  { title: 'Team Workspaces',    description: 'Create dedicated shared workspaces for each team or project. Everyone sees the same tasks, priorities, and progress in real time.',                   icon: '🏢' },
  { title: 'Activity Feed',      description: 'A live feed of everything happening in your workspace -- task updates, completions, new members, and comments -- all in one timeline.',              icon: '📡' },
  { title: 'Comments & Mentions', description: 'Leave comments directly on tasks. Mention teammates with @ to notify them instantly and keep conversations in context.',                           icon: '💬' },
  { title: 'Role-Based Access',  description: 'Assign Admin, Member, or Viewer roles to control who can create, edit, or view tasks within your workspace.',                                       icon: '🔐' },
  { title: 'Shared Boards',      description: 'Every team member sees the same board. Full transparency across the team with no miscommunication about assignments.',                              icon: '📋' },
  { title: 'File Sharing',       description: 'Attach files, links, and resources directly to tasks. Keep all project assets in one place alongside the work itself.',                            icon: '📎' },
]

const TEAM_MEMBERS = [
  { role: 'Admin',  color: 'from-accent to-green',        initial: 'A' },
  { role: 'Member', color: 'from-purple-500 to-accent',   initial: 'B' },
  { role: 'Member', color: 'from-green to-blue-500',      initial: 'C' },
  { role: 'Viewer', color: 'from-yellow-500 to-red',      initial: 'D' },
]

const ACTIVITY = [
  { initial: 'A', action: 'completed', target: 'Review Q3 product roadmap',       time: '2m ago',  color: 'bg-green' },
  { initial: 'B', action: 'created',   target: 'Design new onboarding flow',      time: '15m ago', color: 'bg-accent' },
  { initial: 'C', action: 'commented', target: 'Launch email campaign',           time: '1h ago',  color: 'bg-purple-500' },
  { initial: 'D', action: 'assigned',  target: 'Prepare performance review docs', time: '2h ago',  color: 'bg-yellow-500' },
]

export default function TeamCollaboration() {
  return (
    <FeaturePageLayout hero={HERO}>

      {/* Team preview */}
      <section className="py-16 border-b border-border">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

            {/* Team members */}
            <div className="bg-surface border border-border rounded-2xl overflow-hidden">
              <div className="px-5 py-4 border-b border-border">
                <h3 className="font-display font-700 text-text1 text-sm">Workspace Members</h3>
              </div>
              <div className="p-4 flex flex-col gap-2">
                {TEAM_MEMBERS.map((m, i) => (
                  <div key={i} className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-surface2 transition-colors">
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${m.color} flex items-center justify-center text-white text-xs font-700 flex-shrink-0`}>
                      {m.initial}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-600 text-text1">Team Member {m.initial}</p>
                    </div>
                    <span className={`text-[0.65rem] font-600 px-2 py-0.5 rounded-full border
                      ${m.role === 'Admin'  ? 'text-accent bg-accent-dim border-accent/20' :
                        m.role === 'Member' ? 'text-green bg-green-dim border-green/20' :
                        'text-text3 bg-surface2 border-border'}`}>
                      {m.role}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Activity feed */}
            <div className="bg-surface border border-border rounded-2xl overflow-hidden">
              <div className="px-5 py-4 border-b border-border">
                <h3 className="font-display font-700 text-text1 text-sm">Live Activity Feed</h3>
              </div>
              <div className="p-4 flex flex-col gap-3">
                {ACTIVITY.map((a, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className={`w-7 h-7 rounded-full ${a.color} flex items-center justify-center text-white text-xs font-700 flex-shrink-0`}>
                      {a.initial}
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-text2 leading-snug">
                        <span className="text-text1 font-600">Member {a.initial} </span>
                        {a.action} <span className="text-accent">"{a.target}"</span>
                      </p>
                    </div>
                    <span className="text-[0.6rem] text-text3 flex-shrink-0">{a.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-16 border-b border-border">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-display font-800 text-2xl text-text1 tracking-tight mb-3">Built for teams that move fast</h2>
            <p className="text-sm text-text2 max-w-xl mx-auto">Everything your team needs to stay aligned without unnecessary meetings or status updates.</p>
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
          <h2 className="font-display font-800 text-2xl text-text1 tracking-tight mb-3">Bring your team together</h2>
          <p className="text-sm text-text2 mb-8">Invite your team to TaskFlow and start collaborating from one shared workspace.</p>
          <a href="/register" className="inline-block px-8 py-3.5 bg-accent hover:bg-accent-hover text-white font-700 rounded-xl text-sm transition-all shadow-accent hover:-translate-y-0.5">
            Invite Your Team
          </a>
        </div>
      </section>

    </FeaturePageLayout>
  )
}
