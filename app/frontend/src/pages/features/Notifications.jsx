import FeaturePageLayout from '../../components/FeaturePageLayout'

const HERO = {
  category: 'Feature',
  title: 'Never Miss Important Updates',
  description: 'Receive intelligent real-time notifications for task assignments, project activity, approaching deadlines, mentions, and workflow updates. Stay informed without being overwhelmed.',
  icon: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/>
      <path d="M13.73 21a2 2 0 01-3.46 0"/>
    </svg>
  ),
  color: 'text-yellow-400',
  bg: 'bg-yellow-400/10 border-yellow-400/20',
}

const CAPABILITIES = [
  { title: 'Real-Time Alerts',       description: 'Get notified the moment a task is assigned to you, a deadline is approaching, or a teammate mentions you in a comment.',  icon: '⚡' },
  { title: 'Deadline Reminders',     description: 'Automatic reminders before task due dates. Never miss a deadline because you forgot to check.',                             icon: '⏰' },
  { title: 'Task Update Alerts',     description: 'Know immediately when a task you own or follow is updated, commented on, or moved to a new status.',                        icon: '🔄' },
  { title: 'Mention Notifications',  description: 'When someone tags you with @mention in a task comment, you get a direct notification with full context.',                   icon: '@' },
  { title: 'Notification Center',    description: 'All your alerts in one place. Mark as read, filter by type, and manage your notification preferences from the sidebar.',    icon: '🔔' },
  { title: 'Quiet Hours',            description: 'Set quiet hours so you are not disturbed outside of work. TaskFlow respects your focus time.',                              icon: '🌙' },
]

const MOCK_NOTIFICATIONS = [
  { type: 'mention',   title: 'You were mentioned',     message: 'Tarak mentioned you in "SSM Parameter Store integration"',  time: '2m ago',  read: false, color: 'text-accent bg-accent-dim border-accent/20' },
  { type: 'deadline',  title: 'Deadline approaching',   message: '"Deploy to Kubernetes" is due in 2 days',                  time: '1h ago',  read: false, color: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20' },
  { type: 'completed', title: 'Task completed',         message: '"Set up RDS with Terraform" was marked complete',           time: '3h ago',  read: true,  color: 'text-green bg-green-dim border-green/20' },
  { type: 'assigned',  title: 'Task assigned to you',   message: '"Implement JWT authentication" was assigned to you',        time: '5h ago',  read: true,  color: 'text-accent bg-accent-dim border-accent/20' },
]

export default function NotificationsFeature() {
  return (
    <FeaturePageLayout hero={HERO}>

      {/* Notification center preview */}
      <section className="py-16 border-b border-border">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-10">
            <p className="text-xs font-700 text-accent uppercase tracking-widest mb-2">Live Preview</p>
            <h2 className="font-display font-800 text-2xl text-text1 tracking-tight">Your notification center</h2>
          </div>
          <div className="bg-surface border border-border rounded-2xl overflow-hidden max-w-xl mx-auto">
            <div className="px-5 py-4 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h3 className="font-display font-700 text-text1 text-sm">Notifications</h3>
                <span className="bg-accent text-white text-[0.6rem] font-700 px-1.5 py-0.5 rounded-full">2</span>
              </div>
              <button className="text-xs font-600 text-accent">Mark all read</button>
            </div>
            <div className="p-3 flex flex-col gap-2">
              {MOCK_NOTIFICATIONS.map((n, i) => (
                <div key={i} className={`flex items-start gap-3 p-3 rounded-lg border transition-colors ${n.read ? 'bg-surface border-border opacity-60' : 'bg-surface2 border-border'}`}>
                  <div className={`w-7 h-7 rounded-full border flex items-center justify-center text-xs flex-shrink-0 ${n.color}`}>
                    {n.type === 'mention' ? '@' : n.type === 'deadline' ? '⏰' : n.type === 'completed' ? '✓' : '→'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <p className="text-xs font-600 text-text1">{n.title}</p>
                      {!n.read && <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />}
                    </div>
                    <p className="text-[0.65rem] text-text2 leading-snug">{n.message}</p>
                  </div>
                  <span className="text-[0.6rem] text-text3 flex-shrink-0">{n.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-16 border-b border-border">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-display font-800 text-2xl text-text1 tracking-tight mb-3">Stay informed without the noise</h2>
            <p className="text-sm text-text2 max-w-xl mx-auto">Smart notifications that surface what matters and stay quiet when you need focus.</p>
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
          <h2 className="font-display font-800 text-2xl text-text1 tracking-tight mb-3">Stay on top of everything</h2>
          <p className="text-sm text-text2 mb-8">Never miss a deadline, mention, or update that matters to your work.</p>
          <a href="/register" className="inline-block px-8 py-3.5 bg-accent hover:bg-accent-hover text-white font-700 rounded-xl text-sm transition-all shadow-accent hover:-translate-y-0.5">
            Get Started Free
          </a>
        </div>
      </section>

    </FeaturePageLayout>
  )
}
