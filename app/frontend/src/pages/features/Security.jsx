import FeaturePageLayout from '../../components/FeaturePageLayout'

const HERO = {
  category: 'Feature',
  title: 'Enterprise-Grade Security and Permissions',
  description: 'Manage secure collaboration with role-based access control, workspace permissions, and protected infrastructure designed for growing organizations. Your data stays private by design.',
  icon: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2"/>
      <path d="M7 11V7a5 5 0 0110 0v4"/>
    </svg>
  ),
  color: 'text-red-400',
  bg: 'bg-red-400/10 border-red-400/20',
}

const CAPABILITIES = [
  { title: 'JWT Authentication',     description: 'Every API request is authenticated with a JSON Web Token. Tokens expire after 7 days and are validated on every request.',           icon: '🔑' },
  { title: 'Password Hashing',       description: 'Passwords are hashed with bcrypt at cost factor 12 before storage. Plain text passwords are never stored or logged.',               icon: '🔒' },
  { title: 'Role-Based Access',      description: 'Three roles -- Admin, Member, Viewer -- control exactly what each user can see and do within a workspace.',                        icon: '👥' },
  { title: 'User Isolation',         description: 'Every task, project, and notification is scoped to the authenticated user. No cross-user data leakage by design.',                 icon: '🛡️' },
  { title: 'SSM Parameter Store',    description: 'Database credentials are stored in AWS SSM Parameter Store, not hardcoded in code or environment files on EC2.',                   icon: '🗝️' },
  { title: 'HTTPS Everywhere',       description: 'All traffic is encrypted in transit via HTTPS. The backend never serves unencrypted HTTP in production.',                           icon: '🔐' },
]

const ROLES = [
  { role: 'Admin',  create: true,  edit: true,  delete: true,  invite: true,  view: true  },
  { role: 'Member', create: true,  edit: true,  delete: false, invite: false, view: true  },
  { role: 'Viewer', create: false, edit: false, delete: false, invite: false, view: true  },
]

const PERMISSIONS = ['Create Tasks', 'Edit Tasks', 'Delete Tasks', 'Invite Members', 'View Projects']

function Check({ val }) {
  return val ? (
    <div className="w-5 h-5 rounded-full bg-green-dim border border-green/30 flex items-center justify-center mx-auto">
      <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="#22c55e" strokeWidth="2.5"><polyline points="1.5,6 5,9.5 10.5,2.5"/></svg>
    </div>
  ) : (
    <div className="w-5 h-5 rounded-full bg-red-dim border border-red/20 flex items-center justify-center mx-auto">
      <svg width="8" height="8" viewBox="0 0 12 12" fill="none" stroke="#ef4444" strokeWidth="2.5"><line x1="2" y1="2" x2="10" y2="10"/><line x1="10" y1="2" x2="2" y2="10"/></svg>
    </div>
  )
}

export default function Security() {
  return (
    <FeaturePageLayout hero={HERO}>

      {/* Permission matrix */}
      <section className="py-16 border-b border-border">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-10">
            <p className="text-xs font-700 text-accent uppercase tracking-widest mb-2">Role Matrix</p>
            <h2 className="font-display font-800 text-2xl text-text1 tracking-tight">Who can do what</h2>
          </div>
          <div className="overflow-x-auto max-w-2xl mx-auto">
            <table className="w-full bg-surface border border-border rounded-xl overflow-hidden">
              <thead>
                <tr className="border-b border-border bg-surface2">
                  <th className="px-5 py-3 text-left text-xs font-700 text-text3 uppercase tracking-wider">Permission</th>
                  {ROLES.map(r => (
                    <th key={r.role} className="px-4 py-3 text-center text-xs font-700 text-text3 uppercase tracking-wider">{r.role}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {PERMISSIONS.map((perm, i) => (
                  <tr key={perm} className={`border-b border-border ${i % 2 === 0 ? '' : 'bg-surface2/30'}`}>
                    <td className="px-5 py-3 text-sm text-text2">{perm}</td>
                    <td className="px-4 py-3"><Check val={ROLES[0][Object.keys(ROLES[0])[i + 1]]} /></td>
                    <td className="px-4 py-3"><Check val={ROLES[1][Object.keys(ROLES[1])[i + 1]]} /></td>
                    <td className="px-4 py-3"><Check val={ROLES[2][Object.keys(ROLES[2])[i + 1]]} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-16 border-b border-border">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-display font-800 text-2xl text-text1 tracking-tight mb-3">Secure by design, not by default</h2>
            <p className="text-sm text-text2 max-w-xl mx-auto">Security decisions were made at the architecture level -- not bolted on after the fact.</p>
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
          <h2 className="font-display font-800 text-2xl text-text1 tracking-tight mb-3">Your data is safe with TaskFlow</h2>
          <p className="text-sm text-text2 mb-8">Built on AWS with JWT auth, bcrypt passwords, SSM secrets, and role-based access from day one.</p>
          <a href="/register" className="inline-block px-8 py-3.5 bg-accent hover:bg-accent-hover text-white font-700 rounded-xl text-sm transition-all shadow-accent hover:-translate-y-0.5">
            Get Started Securely
          </a>
        </div>
      </section>

    </FeaturePageLayout>
  )
}
