import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const API = '/api'

export default function Login() {
  const navigate = useNavigate()
  const [form, setForm]     = useState({ email: '', password: '' })
  const [error, setError]   = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch(`${API}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error || 'Login failed'); return }
      localStorage.setItem('token', data.token)
      navigate('/dashboard')
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-bg flex">

      {/* ---- Left branding panel ---- */}
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-12 overflow-hidden">
        {/* Background layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-bg to-bg" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[100px] -translate-x-1/2 translate-y-1/2" />

        {/* Content */}
        <div className="relative z-10">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center glow-pulse">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 11l3 3L22 4"/>
                <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
              </svg>
            </div>
            <span className="font-display font-800 text-text1 text-lg tracking-tight">TaskFlow</span>
          </Link>
        </div>

        <div className="relative z-10">
          <h2 className="font-display font-800 text-3xl text-text1 leading-tight tracking-tight mb-4">
            Access your workspace and continue managing your projects efficiently.
          </h2>
          <p className="text-text2 text-sm leading-relaxed max-w-sm">
            Organized tasks, focused teams, and infrastructure that scales. Everything in one place.
          </p>

          {/* Trust indicators */}
          <div className="mt-10 flex flex-col gap-3">
            {[
              'PostgreSQL on AWS RDS',
              'JWT-secured authentication',
              'CI/CD via GitHub Actions',
            ].map(item => (
              <div key={item} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-green-dim border border-green/30 flex items-center justify-center flex-shrink-0">
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="#22c55e" strokeWidth="2.5"><polyline points="1.5,6 5,9.5 10.5,2.5"/></svg>
                </div>
                <span className="text-sm text-text2">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10">
          <p className="text-xs text-text3">
            Built by{' '}
            <a href="https://www.linkedin.com/in/ikechukwu-elizabeth" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
              Elizabeth Ikechukwu
            </a>
            {' '}- DevOps &amp; Cloud Engineer
          </p>
        </div>
      </div>

      {/* ---- Right auth panel ---- */}
      <div className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-sm">

          {/* Mobile logo */}
          <div className="flex items-center gap-2.5 mb-10 lg:hidden">
            <div className="w-8 h-8 rounded-xl bg-accent flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 11l3 3L22 4"/>
                <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
              </svg>
            </div>
            <span className="font-display font-800 text-text1">TaskFlow</span>
          </div>

          <h1 className="font-display font-800 text-2xl text-text1 tracking-tight mb-1">Welcome back</h1>
          <p className="text-sm text-text2 mb-8">Sign in to your workspace to continue.</p>

          {error && (
            <div className="mb-5 px-4 py-3 rounded-lg bg-red-dim border border-red/30 text-red text-sm flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-600 text-text2 uppercase tracking-wider mb-2">Email address</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-sm text-text1 placeholder-text3 outline-none focus:border-accent focus:ring-2 focus:ring-accent/15 transition-all duration-150"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-600 text-text2 uppercase tracking-wider">Password</label>
                <a href="#" className="text-xs text-accent hover:underline">Forgot password?</a>
              </div>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-sm text-text1 placeholder-text3 outline-none focus:border-accent focus:ring-2 focus:ring-accent/15 transition-all duration-150"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 bg-accent hover:bg-accent-hover disabled:opacity-60 disabled:cursor-not-allowed text-white font-700 rounded-lg text-sm transition-all duration-150 shadow-accent hover:shadow-accent-lg hover:-translate-y-0.5 active:translate-y-0"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-text2">
            Don&apos;t have an account?{' '}
            <Link to="/register" className="text-accent hover:underline font-600">Create one free</Link>
          </p>

        </div>
      </div>
    </div>
  )
}
