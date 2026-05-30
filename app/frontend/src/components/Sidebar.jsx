import { NavLink, useNavigate } from 'react-router-dom'

const NAV_ITEMS = [
  {
    label: 'Dashboard',
    to: '/dashboard',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1"/>
        <rect x="14" y="3" width="7" height="7" rx="1"/>
        <rect x="3" y="14" width="7" height="7" rx="1"/>
        <rect x="14" y="14" width="7" height="7" rx="1"/>
      </svg>
    ),
  },
  {
    label: 'Projects',
    to: '/dashboard/projects',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 7a2 2 0 012-2h4l2 3h9a2 2 0 012 2v7a2 2 0 01-2 2H4a2 2 0 01-2-2V7z"/>
      </svg>
    ),
  },
  {
    label: 'Tasks',
    to: '/dashboard/tasks',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 11l3 3L22 4"/>
        <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
      </svg>
    ),
  },
  {
    label: 'Teams',
    to: '/dashboard/teams',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 00-3-3.87"/>
        <path d="M16 3.13a4 4 0 010 7.75"/>
      </svg>
    ),
  },
  {
    label: 'Calendar',
    to: '/dashboard/calendar',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8"  y1="2" x2="8"  y2="6"/>
        <line x1="3"  y1="10" x2="21" y2="10"/>
      </svg>
    ),
  },
  {
    label: 'Activity',
    to: '/dashboard/activity',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
  },
  {
    label: 'Notifications',
    to: '/dashboard/notifications',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/>
        <path d="M13.73 21a2 2 0 01-3.46 0"/>
      </svg>
    ),
    badge: 3,
  },
  {
    label: 'Analytics',
    to: '/dashboard/analytics',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10"/>
        <line x1="12" y1="20" x2="12" y2="4"/>
        <line x1="6"  y1="20" x2="6"  y2="14"/>
      </svg>
    ),
  },
  {
    label: 'Settings',
    to: '/dashboard/settings',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"/>
        <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/>
      </svg>
    ),
  },
]

function getUserFromToken() {
  try {
    const token = localStorage.getItem('token')
    if (!token) return null
    const payload = JSON.parse(atob(token.split('.')[1]))
    return payload
  } catch {
    return null
  }
}

export default function Sidebar() {
  const navigate = useNavigate()
  const user = getUserFromToken()

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/')
  }

  const initials = user?.name
    ? user.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
    : 'U'

  return (
    <aside className="fixed left-0 top-0 h-screen w-[240px] bg-surface border-r border-border flex flex-col z-40">

      <div className="px-6 py-6 border-b border-border">
        <NavLink to="/dashboard" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center flex-shrink-0 glow-pulse">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 11l3 3L22 4"/>
              <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
            </svg>
          </div>
          <div>
            <p className="font-display font-800 text-text1 text-[1rem] leading-none tracking-tight">TaskFlow</p>
            <p className="text-[0.65rem] text-text3 font-500 mt-1 uppercase tracking-widest">Workspace</p>
          </div>
        </NavLink>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <p className="px-3 mb-2 text-[0.62rem] font-700 text-text3 uppercase tracking-widest">Menu</p>
        <ul className="flex flex-col gap-0.5">
          {NAV_ITEMS.map((item, i) => (
            <li key={item.label}>
              <NavLink
                to={item.to}
                end={item.to === '/dashboard'}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-500 transition-all duration-150 group relative
                  ${isActive
                    ? 'bg-accent-dim text-accent border border-accent/20'
                    : 'text-text2 hover:text-text1 hover:bg-surface2 border border-transparent'
                  }`
                }
                style={{ animationDelay: `${i * 0.04}s` }}
              >
                <span className="flex-shrink-0">{item.icon}</span>
                <span className="flex-1">{item.label}</span>
                {item.badge && (
                  <span className="bg-accent text-white text-[0.6rem] font-700 px-1.5 py-0.5 rounded-full leading-none">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="px-4 py-4 border-t border-border">
        <div className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-surface2 transition-colors group mb-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-green flex items-center justify-center text-white text-xs font-700 flex-shrink-0">
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-600 text-text1 truncate">{user?.name || 'Guest'}</p>
            <p className="text-[0.65rem] text-text3 truncate">{user?.email || 'Not signed in'}</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-2 py-2 rounded-lg text-xs font-600 text-text3 hover:text-red hover:bg-red-dim border border-transparent hover:border-red/20 transition-all duration-150"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/>
            <polyline points="16 17 21 12 16 7"/>
            <line x1="21" y1="12" x2="9" y2="12"/>
          </svg>
          Sign out
        </button>

        <p className="mt-3 px-2 text-[0.62rem] text-text3 leading-relaxed">
          Node.js - Docker - Nginx<br/>
          Deployed on AWS EC2
        </p>
      </div>

    </aside>
  )
}
