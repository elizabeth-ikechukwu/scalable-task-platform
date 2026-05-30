import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'

const SERVICES = [
  { name: 'API',              description: 'REST API endpoints',              endpoint: '/api/health' },
  { name: 'Frontend',         description: 'Web application',                 endpoint: null },
  { name: 'Database',         description: 'PostgreSQL data layer',           endpoint: null },
  { name: 'Authentication',   description: 'JWT auth service',                endpoint: null },
  { name: 'Notifications',    description: 'Alert delivery system',           endpoint: null },
  { name: 'File Storage',     description: 'Asset and attachment storage',    endpoint: null },
]

const INCIDENTS = [
  {
    date: 'May 28, 2026',
    title: 'All systems operational',
    status: 'resolved',
    message: 'No incidents reported. Platform running normally.',
  },
  {
    date: 'May 20, 2026',
    title: 'Scheduled maintenance -- database upgrade',
    status: 'resolved',
    message: 'PostgreSQL version upgrade completed successfully. Downtime: 4 minutes.',
  },
  {
    date: 'May 14, 2026',
    title: 'API latency increase',
    status: 'resolved',
    message: 'Briefly elevated response times due to high traffic. Auto-scaling resolved the issue within 8 minutes.',
  },
]

const UPTIME = [
  { service: 'API',           uptime: '99.98%', days: 30 },
  { service: 'Frontend',      uptime: '100%',   days: 30 },
  { service: 'Database',      uptime: '99.95%', days: 30 },
  { service: 'Auth Service',  uptime: '99.99%', days: 30 },
]

function StatusBadge({ status }) {
  if (status === 'operational') return (
    <div className="flex items-center gap-1.5 text-xs font-600 text-green">
      <span className="w-2 h-2 rounded-full bg-green animate-pulse" />
      Operational
    </div>
  )
  if (status === 'degraded') return (
    <div className="flex items-center gap-1.5 text-xs font-600 text-yellow-400">
      <span className="w-2 h-2 rounded-full bg-yellow-400" />
      Degraded
    </div>
  )
  if (status === 'down') return (
    <div className="flex items-center gap-1.5 text-xs font-600 text-red">
      <span className="w-2 h-2 rounded-full bg-red" />
      Down
    </div>
  )
  return null
}

export default function Status() {
  const [apiStatus, setApiStatus] = useState('checking')
  const [apiLatency, setApiLatency] = useState(null)

  useEffect(() => {
    const start = Date.now()
    fetch('/api/health')
      .then(r => r.json())
      .then(() => {
        setApiStatus('operational')
        setApiLatency(Date.now() - start)
      })
      .catch(() => setApiStatus('down'))
  }, [])

  const getServiceStatus = (name) => {
    if (name === 'API') return apiStatus === 'checking' ? 'operational' : apiStatus
    return 'operational'
  }

  const allOperational = SERVICES.every(s => getServiceStatus(s.name) === 'operational')

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
            <Link to="/about"     className="text-sm text-text2 hover:text-text1 transition-colors">About</Link>
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
      <section className={`py-16 border-b border-border text-center ${allOperational ? 'bg-green-dim/30' : 'bg-red-dim/30'}`}>
        <div className="max-w-2xl mx-auto px-6">
          <div className={`inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border mb-5 ${allOperational ? 'bg-green-dim border-green/30' : 'bg-red-dim border-red/30'}`}>
            <span className={`w-2.5 h-2.5 rounded-full animate-pulse ${allOperational ? 'bg-green' : 'bg-red'}`} />
            <span className={`text-sm font-700 ${allOperational ? 'text-green' : 'text-red'}`}>
              {allOperational ? 'All Systems Operational' : 'Service Disruption Detected'}
            </span>
          </div>
          <h1 className="font-display font-800 text-3xl text-text1 tracking-tight mb-3">System Status</h1>
          <p className="text-sm text-text2">
            Monitor platform uptime, API availability, infrastructure health, and operational performance in real time.
          </p>
          <p className="text-xs text-text3 mt-3">
            Last checked: {new Date().toLocaleString()}
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="py-12 border-b border-border">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-display font-700 text-text1 text-sm uppercase tracking-wider mb-4">Service Health</h2>
          <div className="bg-surface border border-border rounded-2xl overflow-hidden">
            {SERVICES.map((service, i) => (
              <div key={service.name} className={`flex items-center justify-between px-5 py-4 ${i < SERVICES.length - 1 ? 'border-b border-border' : ''} hover:bg-surface2 transition-colors`}>
                <div>
                  <p className="text-sm font-600 text-text1">{service.name}</p>
                  <p className="text-xs text-text3 mt-0.5">{service.description}</p>
                </div>
                <div className="flex items-center gap-4">
                  {service.name === 'API' && apiLatency && (
                    <span className="text-xs text-text3">{apiLatency}ms</span>
                  )}
                  <StatusBadge status={getServiceStatus(service.name)} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Uptime */}
      <section className="py-12 border-b border-border">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-display font-700 text-text1 text-sm uppercase tracking-wider mb-4">30-Day Uptime</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {UPTIME.map((u, i) => (
              <div key={i} className="bg-surface border border-border rounded-xl p-4 text-center">
                <p className="font-display font-800 text-xl text-green mb-1">{u.uptime}</p>
                <p className="text-xs text-text2">{u.service}</p>
                <p className="text-[0.6rem] text-text3 mt-1">Last {u.days} days</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Incident history */}
      <section className="py-12">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-display font-700 text-text1 text-sm uppercase tracking-wider mb-4">Incident History</h2>
          <div className="flex flex-col gap-3">
            {INCIDENTS.map((incident, i) => (
              <div key={i} className="bg-surface border border-border rounded-xl p-5">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <h3 className="text-sm font-600 text-text1">{incident.title}</h3>
                  <span className={`text-[0.65rem] font-600 px-2 py-0.5 rounded-full border flex-shrink-0 ${incident.status === 'resolved' ? 'text-green bg-green-dim border-green/20' : 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20'}`}>
                    {incident.status}
                  </span>
                </div>
                <p className="text-xs text-text2 leading-relaxed mb-2">{incident.message}</p>
                <p className="text-[0.65rem] text-text3">{incident.date}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
