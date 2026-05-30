import { Link } from 'react-router-dom'

const FOOTER_LINKS = {
  Product: [
    { label: 'Features',  to: '/#features' },
    { label: 'Dashboard', to: '/dashboard' },
    { label: 'Pricing',   to: '/pricing' },
  ],
  Company: [
    { label: 'About',   to: '/about' },
    { label: 'Contact', to: '/contact' },
  ],
  Resources: [
    { label: 'Status', to: '/status' },
    { label: 'GitHub', href: 'https://github.com/elizabeth-ikechukwu/scalable-task-platform' },
  ],
}

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  )
}

function GitHubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
    </svg>
  )
}

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-border mt-auto">
      <div className="max-w-6xl mx-auto px-8 py-16">

        {/* Top row */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-12">

          {/* Brand block */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center glow-pulse flex-shrink-0">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 11l3 3L22 4"/>
                  <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
                </svg>
              </div>
              <span className="font-display font-800 text-text1 text-lg tracking-tight">TaskFlow</span>
            </div>
            <p className="text-sm text-text2 leading-relaxed max-w-xs">
              A scalable task management platform designed to simplify collaboration, improve productivity, and help teams deliver work efficiently at any scale.
            </p>

            {/* Social icons - LinkedIn and GitHub only */}
            <div className="flex items-center gap-3 mt-6">
              <a
                href="https://www.linkedin.com/in/ikechukwu-elizabeth"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-lg bg-surface2 border border-border text-text3 hover:text-accent hover:border-accent/30 hover:bg-accent-dim flex items-center justify-center transition-all duration-150"
              >
                <LinkedInIcon />
              </a>
              <a
                href="https://github.com/elizabeth-ikechukwu"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="w-9 h-9 rounded-lg bg-surface2 border border-border text-text3 hover:text-accent hover:border-accent/30 hover:bg-accent-dim flex items-center justify-center transition-all duration-150"
              >
                <GitHubIcon />
              </a>
            </div>
          </div>

          {/* Nav link groups */}
          {Object.entries(FOOTER_LINKS).map(([group, links]) => (
            <div key={group}>
              <p className="text-[0.7rem] font-700 text-text3 uppercase tracking-widest mb-4">{group}</p>
              <ul className="flex flex-col gap-2.5">
                {links.map(({ label, to, href }) => (
                  <li key={label}>
                    {href ? (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-text2 hover:text-text1 transition-colors duration-150"
                      >
                        {label}
                      </a>
                    ) : (
                      <Link
                        to={to}
                        className="text-sm text-text2 hover:text-text1 transition-colors duration-150"
                      >
                        {label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text3">
            &copy; {new Date().getFullYear()} TaskFlow. Built by{' '}
            <a
              href="https://www.linkedin.com/in/ikechukwu-elizabeth"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:text-accent-hover transition-colors"
            >
              Elizabeth Ikechukwu
            </a>
            .
          </p>
          <div className="flex items-center gap-1.5 text-xs text-text3">
            <span className="w-1.5 h-1.5 rounded-full bg-green animate-pulse inline-block" />
            All systems operational
          </div>
        </div>

      </div>
    </footer>
  )
}
