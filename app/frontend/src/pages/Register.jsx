import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const API = '/api'

export default function Register() {
  const navigate = useNavigate()
  const [form, setForm]     = useState({ name: '', email: '', password: '', confirm: '' })
  const [error, setError]   = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    setError('')
    if (form.password !== form.confirm) { setError('Passwords do not match.'); return }
    if (form.password.length < 8) { setError('Password must be at least 8 characters.'); return }
    setLoading(true)
    try {
      const res = await fetch(`${API}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, password: form.password }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error || 'Registration failed'); return }
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
        <div className="absolute inset-0 bg-gradient-to-br from-green/10 via-bg to-bg" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.04)_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-green/8 rounded-full blur-[100px] -translate-x-1/2 translate-y-1/2" />

        <div className="relative z-10">
          <Link to="/" className="flex items-center gap-2.5">
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
            Start organizing tasks, collaborating with your team, and scaling productivity from one platform.
          </h2>
          <p className="text-text2 text-sm leading-relaxed max-w-sm">
            Free to start. Production-grade infrastructure. Built to grow with your team.
          </p>

          <div className="mt-10 flex flex-col gap-3">
            {[
              'Unlimited tasks on free tier',
              'Team workspaces included',
              'Secure by default -- JWT + PostgreSQL',
            ].map(item => (
              <div key={item} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-accent-dim border border-accent/30 flex items-center justify-center flex-shrink-0">
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="#6366f1" strokeWidth="2.5"><polyline points="1.5,6 5,9.5 10.5,2.5"/></svg>
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

          <div className="flex items-center gap-2.5 mb-10 lg:hidden">
            <div className="w-8 h-8 rounded-xl bg-accent flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 11l3 3L22 4"/>
                <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
              </svg>
            </div>
            <span className="font-display font-800 text-text1">TaskFlow</span>
          </div>

          <h1 className="font-display font-800 text-2xl text-text1 tracking-tight mb-1">Create your account</h1>
          <p className="text-sm text-text2 mb-8">Get started free. No credit card required.</p>

          {error && (
            <div className="mb-5 px-4 py-3 rounded-lg bg-red-dim border border-red/30 text-red text-sm flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-600 text-text2 uppercase tracking-wider mb-2">Full name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Elizabeth Ikechukwu"
                required
                className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-sm text-text1 placeholder-text3 outline-none focus:border-accent focus:ring-2 focus:ring-accent/15 transition-all duration-150"
              />
            </div>
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
              <label className="block text-xs font-600 text-text2 uppercase tracking-wider mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Min. 8 characters"
                required
                className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-sm text-text1 placeholder-text3 outline-none focus:border-accent focus:ring-2 focus:ring-accent/15 transition-all duration-150"
              />
            </div>
            <div>
              <label className="block text-xs font-600 text-text2 uppercase tracking-wider mb-2">Confirm password</label>
              <input
                type="password"
                name="confirm"
                value={form.confirm}
                onChange={handleChange}
                placeholder="Repeat password"
                required
                className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-sm text-text1 placeholder-text3 outline-none focus:border-accent focus:ring-2 focus:ring-accent/15 transition-all duration-150"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 bg-accent hover:bg-accent-hover disabled:opacity-60 disabled:cursor-not-allowed text-white font-700 rounded-lg text-sm transition-all duration-150 shadow-accent hover:shadow-accent-lg hover:-translate-y-0.5 active:translate-y-0"
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-text3">
            By creating an account you agree to our{' '}
            <a href="#" className="text-text2 hover:text-accent transition-colors">Terms of Service</a>
            {' '}and{' '}
            <a href="#" className="text-text2 hover:text-accent transition-colors">Privacy Policy</a>.
          </p>

          <p className="mt-5 text-center text-sm text-text2">
            Already have an account?{' '}
            <Link to="/login" className="text-accent hover:underline font-600">Sign in</Link>
          </p>

        </div>
      </div>
    </div>
  )
}
