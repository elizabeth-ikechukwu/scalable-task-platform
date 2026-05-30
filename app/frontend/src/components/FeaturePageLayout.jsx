import { Link } from 'react-router-dom'
import Footer from './Footer'

export default function FeaturePageLayout({ hero, children }) {
  return (
    <div className="min-h-screen bg-bg flex flex-col">

      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-border bg-bg/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-accent flex items-center justify-center glow-pulse">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 11l3 3L22 4"/>
                <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
              </svg>
            </div>
            <span className="font-display font-800 text-text1 tracking-tight">TaskFlow</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/#features" className="text-sm text-text2 hover:text-text1 transition-colors">Features</Link>
            <Link to="/dashboard"  className="text-sm text-text2 hover:text-text1 transition-colors">Dashboard</Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link to="/login"    className="text-sm text-text2 hover:text-text1 transition-colors px-3 py-1.5">Sign In</Link>
            <Link to="/register" className="text-sm font-600 bg-accent hover:bg-accent-hover text-white px-4 py-2 rounded-lg transition-all shadow-accent hover:-translate-y-0.5">
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center gap-2 text-xs text-text3">
          <Link to="/" className="hover:text-text2 transition-colors">Home</Link>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
          <Link to="/#features" className="hover:text-text2 transition-colors">Features</Link>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
          <span className="text-text2">{hero.title}</span>
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.04)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent/8 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-20">
          <div className="flex items-center gap-3 mb-6">
            <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center ${hero.bg} ${hero.color}`}>
              {hero.icon}
            </div>
            <span className="text-xs font-700 text-accent uppercase tracking-widest">{hero.category}</span>
          </div>
          <h1 className="font-display font-800 text-4xl md:text-5xl text-text1 leading-tight tracking-tight mb-5 max-w-3xl">
            {hero.title}
          </h1>
          <p className="text-base text-text2 leading-relaxed max-w-2xl mb-8">{hero.description}</p>
          <div className="flex gap-4">
            <Link to="/register" className="px-6 py-3 bg-accent hover:bg-accent-hover text-white font-700 rounded-xl text-sm transition-all shadow-accent hover:-translate-y-0.5">
              Get Started Free
            </Link>
            <Link to="/dashboard" className="px-6 py-3 bg-surface hover:bg-surface2 text-text1 font-600 rounded-xl border border-border text-sm transition-all">
              View Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Page content */}
      <main className="flex-1">
        {children}
      </main>

      <Footer />
    </div>
  )
}
