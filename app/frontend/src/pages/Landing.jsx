import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import FeatureCard from '../components/FeatureCard'

const FEATURES = [
  {
    title: 'Task Management',
    description: 'Create, assign, and prioritize tasks with due dates, labels, and status tracking. Keep every piece of work accounted for.',
    to: '/features/task-management',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
      </svg>
    ),
    color: 'text-accent',
    bg: 'bg-accent-dim border-accent/20',
  },
  {
    title: 'Team Collaboration',
    description: 'Work alongside your team in shared workspaces. Assign tasks, leave comments, and stay aligned without switching tools.',
    to: '/features/team-collaboration',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
      </svg>
    ),
    color: 'text-green',
    bg: 'bg-green-dim border-green/20',
  },
  {
    title: 'Smart Notifications',
    description: 'Stay informed with context-aware alerts. Get notified about deadlines, mentions, and updates that actually matter to you.',
    to: '/features/notifications',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/>
        <path d="M13.73 21a2 2 0 01-3.46 0"/>
      </svg>
    ),
    color: 'text-yellow-400',
    bg: 'bg-yellow-400/10 border-yellow-400/20',
  },
  {
    title: 'Project Workspaces',
    description: 'Organize tasks into focused project spaces. Each workspace gives your team a dedicated area to plan, execute, and review.',
    to: '/features/project-workspaces',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 7a2 2 0 012-2h4l2 3h9a2 2 0 012 2v7a2 2 0 01-2 2H4a2 2 0 01-2-2V7z"/>
      </svg>
    ),
    color: 'text-blue-400',
    bg: 'bg-blue-400/10 border-blue-400/20',
  },
  {
    title: 'Analytics & Reporting',
    description: 'Track velocity, completion rates, and team throughput with visual dashboards. Turn raw activity into actionable insights.',
    to: '/features/analytics',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10"/>
        <line x1="12" y1="20" x2="12" y2="4"/>
        <line x1="6"  y1="20" x2="6"  y2="14"/>
      </svg>
    ),
    color: 'text-purple-400',
    bg: 'bg-purple-400/10 border-purple-400/20',
  },
  {
    title: 'Secure Access Control',
    description: 'JWT-based authentication, role-based permissions, and encrypted credentials. Your data stays private by design.',
    to: '/features/security',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2"/>
        <path d="M7 11V7a5 5 0 0110 0v4"/>
      </svg>
    ),
    color: 'text-red-400',
    bg: 'bg-red-400/10 border-red-400/20',
  },
  {
    title: 'Scalable Architecture',
    description: 'Cloud-native infrastructure designed to grow with your team. Built for reliability, performance, and operational excellence.',
    to: '/features/architecture',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/>
        <line x1="8"  y1="21" x2="16" y2="21"/>
        <line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    ),
    color: 'text-accent',
    bg: 'bg-accent-dim border-accent/20',
  },
]

function DashboardPreview() {
  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="absolute inset-0 bg-accent/10 blur-3xl rounded-3xl scale-95" />
      <div className="relative bg-surface border border-border rounded-2xl overflow-hidden shadow-2xl">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-surface2">
          <span className="w-2.5 h-2.5 rounded-full bg-red/60" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
          <span className="w-2.5 h-2.5 rounded-full bg-green/60" />
          <span className="ml-3 text-xs text-text3 font-500">app.taskflow.io/dashboard</span>
        </div>
        <div className="flex h-52">
          <div className="w-14 bg-surface2 border-r border-border flex flex-col items-center py-3 gap-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className={`w-7 h-7 rounded-lg ${i === 0 ? 'bg-accent' : 'bg-border'}`} />
            ))}
          </div>
          <div className="flex-1 p-4 flex flex-col gap-3">
            <div className="grid grid-cols-3 gap-2">
              {['24 Tasks', '18 Done', '6 Active'].map((s, i) => (
                <div key={i} className="bg-surface2 rounded-lg p-2 border border-border">
                  <div className="text-xs font-700 text-text1">{s.split(' ')[0]}</div>
                  <div className="text-[0.6rem] text-text3">{s.split(' ')[1]}</div>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-1.5">
              {[
                { label: 'Review Q3 product roadmap',         done: true  },
                { label: 'Design onboarding flow',            done: true  },
                { label: 'Launch email campaign',             done: false },
                { label: 'Prepare team performance review',   done: false },
              ].map((t, i) => (
                <div key={i} className="flex items-center gap-2 bg-surface2 rounded-md px-2.5 py-1.5 border border-border">
                  <div className={`w-3.5 h-3.5 rounded flex items-center justify-center flex-shrink-0 ${t.done ? 'bg-green border-green' : 'border border-text3'}`}>
                    {t.done && <svg width="8" height="8" viewBox="0 0 12 12" fill="none" stroke="white" strokeWidth="2.5"><polyline points="1.5,6 5,9.5 10.5,2.5"/></svg>}
                  </div>
                  <span className={`text-[0.65rem] ${t.done ? 'line-through text-text3' : 'text-text2'}`}>{t.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Landing() {
  return (
    <div className="min-h-screen bg-bg flex flex-col">

      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-border bg-bg/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-accent flex items-center justify-center glow-pulse">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
              </svg>
            </div>
            <span className="font-display font-800 text-text1 tracking-tight">TaskFlow</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-sm text-text2 hover:text-text1 transition-colors">Features</a>
            <Link to="/pricing"   className="text-sm text-text2 hover:text-text1 transition-colors">Pricing</Link>
            <Link to="/about"     className="text-sm text-text2 hover:text-text1 transition-colors">About</Link>
            <Link to="/dashboard" className="text-sm text-text2 hover:text-text1 transition-colors">Dashboard</Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link to="/login"    className="text-sm text-text2 hover:text-text1 transition-colors px-3 py-1.5">Sign In</Link>
            <Link to="/register" className="text-sm font-600 bg-accent hover:bg-accent-hover text-white px-4 py-2 rounded-lg transition-all shadow-accent hover:-translate-y-0.5">
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden flex-1 flex items-center noise-overlay">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.04)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/8 rounded-full blur-[120px] pointer-events-none" />
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-24 w-full">
          <div className="flex flex-col items-center text-center mb-16">
            <h1 className="font-display font-800 text-4xl md:text-6xl text-text1 leading-[1.1] tracking-tight mb-6 max-w-3xl animate-fade-up">
              Manage Tasks, Teams, and{' '}
              <span className="gradient-text">Workflows at Scale</span>
            </h1>
            <p className="text-base md:text-lg text-text2 leading-relaxed max-w-2xl mb-10 animate-fade-up stagger-2">
              A modern task management platform built for individuals, startups, and growing teams to organize projects, automate workflows, track progress, and collaborate in real time -- all from one centralized workspace.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 animate-fade-up stagger-3">
              <Link to="/register"
                className="w-full sm:w-auto px-8 py-3.5 bg-accent hover:bg-accent-hover text-white font-700 rounded-xl transition-all shadow-accent hover:shadow-accent-lg hover:-translate-y-0.5 text-sm tracking-wide">
                Get Started Free
              </Link>
              <Link to="/dashboard"
                className="w-full sm:w-auto px-8 py-3.5 bg-surface hover:bg-surface2 text-text1 font-600 rounded-xl border border-border hover:border-text3 transition-all text-sm tracking-wide flex items-center justify-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/>
                </svg>
                View Demo
              </Link>
            </div>
          </div>
          <div className="animate-fade-up stagger-4">
            <DashboardPreview />
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 border-t border-border">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-xs font-700 text-accent uppercase tracking-widest mb-3">Platform Features</p>
            <h2 className="font-display font-800 text-3xl md:text-4xl text-text1 tracking-tight mb-4">
              Everything your team needs
            </h2>
            <p className="text-text2 max-w-xl mx-auto text-sm leading-relaxed">
              Click any feature to learn more about how it works and what it includes.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {FEATURES.map((f, i) => (
              <FeatureCard key={f.title} {...f} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section className="py-20 border-t border-border">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-display font-800 text-3xl text-text1 tracking-tight mb-4">Ready to get organized?</h2>
          <p className="text-text2 text-sm leading-relaxed mb-8 max-w-lg mx-auto">
            Join thousands of teams managing tasks, projects, and workflows from one powerful workspace.
          </p>
          <Link to="/register"
            className="inline-block px-10 py-4 bg-accent hover:bg-accent-hover text-white font-700 rounded-xl transition-all shadow-accent hover:shadow-accent-lg hover:-translate-y-0.5">
            Start for Free
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
