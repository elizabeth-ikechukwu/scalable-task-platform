import { Link } from 'react-router-dom'
import Footer from '../components/Footer'

const VALUES = [
  { title: 'Simplicity First',      description: 'We believe powerful tools do not have to be complicated. Every feature is designed to reduce friction, not add it.',             icon: '✦' },
  { title: 'Built for Reliability', description: 'Downtime is not an option. Our infrastructure is designed for high availability so your team can always access their work.',    icon: '⬡' },
  { title: 'Teams Over Individuals', description: 'The best work happens when teams are aligned. We build every feature with collaboration at the center.',                        icon: '◈' },
  { title: 'Transparency',          description: 'No hidden fees, no surprise changes. We communicate openly about our product, pricing, and roadmap.',                           icon: '◇' },
  { title: 'Continuous Improvement', description: 'We ship improvements every week. Our changelog is public and our users drive our roadmap.',                                    icon: '⟳' },
  { title: 'Security by Default',   description: 'Security is not a feature -- it is a foundation. Every layer of our platform is built with security as a first principle.',    icon: '⬟' },
]

const STATS = [
  { value: '10,000+', label: 'Tasks managed' },
  { value: '500+',    label: 'Active workspaces' },
  { value: '99.9%',   label: 'Uptime SLA' },
  { value: '< 200ms', label: 'API response time' },
]

export default function About() {
  return (
    <div className="min-h-screen bg-bg flex flex-col">

      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-border bg-bg/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-accent flex items-center justify-center glow-pulse">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
              </svg>
            </div>
            <span className="font-display font-800 text-text1 tracking-tight">TaskFlow</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <a href="/#features"  className="text-sm text-text2 hover:text-text1 transition-colors">Features</a>
            <Link to="/pricing"   className="text-sm text-text2 hover:text-text1 transition-colors">Pricing</Link>
            <Link to="/about"     className="text-sm text-accent font-600 transition-colors">About</Link>
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
      <section className="relative overflow-hidden py-24 border-b border-border">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.04)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent/8 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <p className="text-xs font-700 text-accent uppercase tracking-widest mb-4">About TaskFlow</p>
          <h1 className="font-display font-800 text-4xl md:text-5xl text-text1 tracking-tight leading-tight mb-6">
            Built for Modern Productivity
          </h1>
          <p className="text-base text-text2 leading-relaxed max-w-2xl mx-auto">
            Our mission is to help teams simplify workflows, improve collaboration, and scale productivity using modern cloud-powered tools designed for efficiency, reliability, and operational excellence.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 border-b border-border">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((s, i) => (
              <div key={i} className="text-center animate-fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <p className="font-display font-800 text-3xl text-accent mb-1">{s.value}</p>
                <p className="text-xs text-text2 uppercase tracking-wider">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 border-b border-border">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs font-700 text-accent uppercase tracking-widest mb-3">Our Mission</p>
              <h2 className="font-display font-800 text-2xl text-text1 tracking-tight mb-5">
                Productivity tools should work as hard as you do
              </h2>
              <p className="text-sm text-text2 leading-relaxed mb-4">
                TaskFlow was created to solve a real problem -- teams wasting time switching between tools, losing track of work, and struggling to stay aligned as they grow.
              </p>
              <p className="text-sm text-text2 leading-relaxed mb-4">
                We built a platform that brings tasks, projects, team collaboration, and analytics into one unified workspace. No integrations required. No context switching. Just focused, efficient work.
              </p>
              <p className="text-sm text-text2 leading-relaxed">
                TaskFlow is designed to scale with you -- from a solo developer managing personal projects to a growing team coordinating complex operations across multiple workspaces.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Founded',    value: '2024' },
                { label: 'Platform',   value: 'Cloud-native' },
                { label: 'Uptime',     value: '99.9%' },
                { label: 'Support',    value: '24/7' },
              ].map((item, i) => (
                <div key={i} className="bg-surface border border-border rounded-xl p-5 text-center hover:bg-surface2 transition-colors">
                  <p className="font-display font-800 text-xl text-text1 mb-1">{item.value}</p>
                  <p className="text-xs text-text3 uppercase tracking-wider">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 border-b border-border">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-700 text-accent uppercase tracking-widest mb-3">Our Values</p>
            <h2 className="font-display font-800 text-2xl text-text1 tracking-tight">What we stand for</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {VALUES.map((v, i) => (
              <div key={i} className="bg-surface border border-border rounded-xl p-5 hover:bg-surface2 hover:-translate-y-1 transition-all duration-200 animate-fade-up" style={{ animationDelay: `${i * 0.07}s` }}>
                <div className="w-10 h-10 rounded-xl bg-accent-dim border border-accent/20 flex items-center justify-center text-accent text-lg mb-4">
                  {v.icon}
                </div>
                <h3 className="font-display font-700 text-text1 text-sm mb-2">{v.title}</h3>
                <p className="text-xs text-text2 leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="font-display font-800 text-2xl text-text1 tracking-tight mb-3">Join teams already using TaskFlow</h2>
          <p className="text-sm text-text2 mb-8">Start organizing your work and collaborating with your team from one powerful workspace.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" className="px-8 py-3.5 bg-accent hover:bg-accent-hover text-white font-700 rounded-xl text-sm transition-all shadow-accent hover:-translate-y-0.5">
              Get Started Free
            </Link>
            <Link to="/contact" className="px-8 py-3.5 bg-surface hover:bg-surface2 text-text1 font-600 rounded-xl border border-border text-sm transition-all">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
