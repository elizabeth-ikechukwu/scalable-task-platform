import FeaturePageLayout from '../../components/FeaturePageLayout'

const HERO = {
  category: 'Feature',
  title: 'Built for Scale and Reliability',
  description: 'Designed with scalable cloud infrastructure and modern engineering practices to support growing teams, increasing workloads, and enterprise-level operations. Built by a DevOps engineer, for engineers.',
  icon: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2"/>
      <line x1="8"  y1="21" x2="16" y2="21"/>
      <line x1="12" y1="17" x2="12" y2="21"/>
    </svg>
  ),
  color: 'text-accent',
  bg: 'bg-accent-dim border-accent/20',
}

const STACK = [
  { layer: 'Frontend',        tech: 'React + Vite + Tailwind CSS',         note: 'Built as a static bundle, served by Nginx',               color: 'text-blue-400',   bg: 'bg-blue-400/10 border-blue-400/20' },
  { layer: 'Reverse Proxy',   tech: 'Nginx',                               note: 'Forwards /api/* to Express, serves static files',          color: 'text-green',      bg: 'bg-green-dim border-green/20' },
  { layer: 'Backend API',     tech: 'Node.js + Express',                   note: 'REST API with JWT auth, scoped to authenticated users',     color: 'text-accent',     bg: 'bg-accent-dim border-accent/20' },
  { layer: 'Database',        tech: 'PostgreSQL on AWS RDS',               note: 'Managed RDS instance in a private subnet, t3.micro',       color: 'text-purple-400', bg: 'bg-purple-400/10 border-purple-400/20' },
  { layer: 'Compute',         tech: 'AWS EC2 t3.micro',                    note: 'Docker Compose runs Nginx + Node in containers',           color: 'text-yellow-400', bg: 'bg-yellow-400/10 border-yellow-400/20' },
  { layer: 'Infrastructure',  tech: 'Terraform',                           note: 'VPC, EC2, RDS, IAM, S3 backend, security groups as code',  color: 'text-red-400',    bg: 'bg-red-400/10 border-red-400/20' },
  { layer: 'CI/CD',           tech: 'GitHub Actions + OIDC',               note: 'Terraform plan on PR, Terraform apply and deploy on merge', color: 'text-accent',     bg: 'bg-accent-dim border-accent/20' },
  { layer: 'Secrets',         tech: 'AWS SSM Parameter Store',             note: 'DB credentials fetched at EC2 startup, never in code',     color: 'text-green',      bg: 'bg-green-dim border-green/20' },
]

const CAPABILITIES = [
  { title: 'Infrastructure as Code',  description: 'Every AWS resource -- VPC, EC2, RDS, IAM, security groups -- is defined in Terraform. Reproducible, versionable, reviewable.',     icon: '📝' },
  { title: 'Containerized Workloads', description: 'Frontend and backend run in Docker containers orchestrated with Docker Compose. Consistent environments from local to production.', icon: '🐳' },
  { title: 'Automated CI/CD',         description: 'Every push to main triggers a GitHub Actions pipeline that builds, tests, and deploys automatically using OIDC auth.',              icon: '🚀' },
  { title: 'Private Networking',      description: 'RDS lives in a private subnet with no public access. Only the EC2 instance can reach the database through a security group rule.',  icon: '🔒' },
  { title: 'High Availability',       description: 'AWS RDS supports Multi-AZ for automatic failover. The architecture is designed to scale to EKS when the time comes.',              icon: '🏗️' },
  { title: 'Kubernetes Ready',        description: 'The entire stack is containerized and ready to migrate to EKS. Helm charts and Kubernetes manifests are the next step.',           icon: '☸️' },
]

export default function Architecture() {
  return (
    <FeaturePageLayout hero={HERO}>

      {/* Stack diagram */}
      <section className="py-16 border-b border-border">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-10">
            <p className="text-xs font-700 text-accent uppercase tracking-widest mb-2">Tech Stack</p>
            <h2 className="font-display font-800 text-2xl text-text1 tracking-tight">Layer by layer</h2>
          </div>
          <div className="max-w-3xl mx-auto flex flex-col gap-2">
            {STACK.map((s, i) => (
              <div key={i} className="flex items-start gap-4 bg-surface border border-border rounded-xl px-5 py-4 hover:bg-surface2 transition-colors group">
                <div className={`px-2.5 py-1 rounded-lg border text-xs font-700 flex-shrink-0 w-32 text-center ${s.bg} ${s.color}`}>
                  {s.layer}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-600 text-text1 mb-0.5">{s.tech}</p>
                  <p className="text-xs text-text3">{s.note}</p>
                </div>
                <div className="w-px h-8 bg-border self-center hidden sm:block" />
                <div className="w-6 h-6 rounded-full bg-green-dim border border-green/30 flex items-center justify-center flex-shrink-0 hidden sm:flex">
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="#22c55e" strokeWidth="2.5"><polyline points="1.5,6 5,9.5 10.5,2.5"/></svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DevOps pipeline */}
      <section className="py-16 border-b border-border">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-10">
            <p className="text-xs font-700 text-accent uppercase tracking-widest mb-2">CI/CD Pipeline</p>
            <h2 className="font-display font-800 text-2xl text-text1 tracking-tight">From commit to production</h2>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto">
            {[
              { step: '1', label: 'Push to GitHub',          icon: '📤' },
              { step: '2', label: 'GitHub Actions triggers',  icon: '⚙️' },
              { step: '3', label: 'Build Docker images',      icon: '🐳' },
              { step: '4', label: 'Push to ECR',              icon: '📦' },
              { step: '5', label: 'Terraform apply',          icon: '🏗️' },
              { step: '6', label: 'EC2 pulls and restarts',   icon: '🚀' },
              { step: '7', label: 'Live on devopsbliss.online', icon: '✅' },
            ].map((s, i, arr) => (
              <div key={i} className="flex items-center gap-2">
                <div className="flex flex-col items-center gap-1.5 bg-surface border border-border rounded-xl px-4 py-3 text-center min-w-[100px]">
                  <span className="text-xl">{s.icon}</span>
                  <span className="text-[0.65rem] font-600 text-accent">Step {s.step}</span>
                  <span className="text-xs text-text2 leading-tight">{s.label}</span>
                </div>
                {i < arr.length - 1 && (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3d4257" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-16 border-b border-border">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-display font-800 text-2xl text-text1 tracking-tight mb-3">Production-grade from week one</h2>
            <p className="text-sm text-text2 max-w-xl mx-auto">Not a toy app. A real infrastructure story built by a DevOps engineer learning in public.</p>
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
          <h2 className="font-display font-800 text-2xl text-text1 tracking-tight mb-3">Built by a DevOps Engineer</h2>
          <p className="text-sm text-text2 mb-2 max-w-lg mx-auto">
            This platform was designed and built by Elizabeth Ikechukwu as part of a 10-week DevOps portfolio program through the Digital Witch Support Community, mentored by Oz.
          </p>
          <p className="text-xs text-text3 mb-8">AWS - Terraform - Docker - GitHub Actions - Node.js - PostgreSQL - React</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://github.com/elizabeth-ikechukwu/scalable-task-platform" target="_blank" rel="noopener noreferrer"
              className="px-8 py-3.5 bg-surface hover:bg-surface2 text-text1 font-700 rounded-xl text-sm transition-all border border-border hover:border-accent/40 flex items-center justify-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>
              View on GitHub
            </a>
            <a href="/register" className="px-8 py-3.5 bg-accent hover:bg-accent-hover text-white font-700 rounded-xl text-sm transition-all shadow-accent hover:-translate-y-0.5">
              Try the Platform
            </a>
          </div>
        </div>
      </section>

    </FeaturePageLayout>
  )
}
