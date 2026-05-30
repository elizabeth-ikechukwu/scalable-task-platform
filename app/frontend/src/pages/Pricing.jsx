import { useState } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'

const PLANS = [
  {
    name: 'Free',
    monthly: 0,
    yearly: 0,
    description: 'Perfect for individuals and small personal projects.',
    cta: 'Get Started Free',
    ctaTo: '/register',
    highlight: false,
    features: [
      'Up to 50 tasks',
      '1 workspace',
      'Basic task management',
      'Email notifications',
      'Mobile access',
      'Community support',
    ],
    missing: [
      'Team collaboration',
      'Analytics & reporting',
      'Priority support',
      'Custom integrations',
    ],
  },
  {
    name: 'Pro',
    monthly: 12,
    yearly: 9,
    description: 'For professionals and growing teams who need more power.',
    cta: 'Start Pro Trial',
    ctaTo: '/register',
    highlight: true,
    badge: 'Most Popular',
    features: [
      'Unlimited tasks',
      'Up to 5 workspaces',
      'Team collaboration',
      'Advanced analytics',
      'Priority notifications',
      'File attachments',
      'Activity feed',
      'Priority email support',
    ],
    missing: [
      'Custom integrations',
      'SSO authentication',
    ],
  },
  {
    name: 'Enterprise',
    monthly: 49,
    yearly: 39,
    description: 'For large teams and organizations that need full control.',
    cta: 'Contact Sales',
    ctaTo: '/contact',
    highlight: false,
    features: [
      'Unlimited everything',
      'Unlimited workspaces',
      'SSO authentication',
      'Custom integrations',
      'Advanced security',
      'Role-based permissions',
      'SLA guarantee',
      'Dedicated support',
      'Custom onboarding',
      'Audit logs',
    ],
    missing: [],
  },
]

const FAQS = [
  {
    q: 'Can I switch plans at any time?',
    a: 'Yes. You can upgrade or downgrade your plan at any time. Changes take effect immediately and billing is prorated.',
  },
  {
    q: 'Is there a free trial for paid plans?',
    a: 'Yes. Pro and Enterprise plans come with a 14-day free trial. No credit card required to start.',
  },
  {
    q: 'What happens to my data if I downgrade?',
    a: 'Your data is safe. If you exceed the limits of a lower plan, you will be prompted to upgrade or archive excess data.',
  },
  {
    q: 'Do you offer discounts for nonprofits or students?',
    a: 'Yes. We offer 50% off Pro plans for verified nonprofits and students. Contact us to apply.',
  },
  {
    q: 'How does team billing work?',
    a: 'Plans are per workspace. You pay for one plan per workspace regardless of how many members are in it.',
  },
]

function CheckIcon({ positive = true }) {
  if (positive) return (
    <div className="w-4 h-4 rounded-full bg-green-dim border border-green/30 flex items-center justify-center flex-shrink-0">
      <svg width="8" height="8" viewBox="0 0 12 12" fill="none" stroke="#22c55e" strokeWidth="2.5"><polyline points="1.5,6 5,9.5 10.5,2.5"/></svg>
    </div>
  )
  return (
    <div className="w-4 h-4 rounded-full bg-surface2 border border-border flex items-center justify-center flex-shrink-0">
      <svg width="7" height="7" viewBox="0 0 12 12" fill="none" stroke="#3d4257" strokeWidth="2.5"><line x1="2" y1="2" x2="10" y2="10"/><line x1="10" y1="2" x2="2" y2="10"/></svg>
    </div>
  )
}

export default function Pricing() {
  const [yearly, setYearly] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)

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
            <a href="/#features" className="text-sm text-text2 hover:text-text1 transition-colors">Features</a>
            <Link to="/pricing"   className="text-sm text-accent font-600 transition-colors">Pricing</Link>
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
      <section className="py-20 border-b border-border text-center">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-xs font-700 text-accent uppercase tracking-widest mb-3">Pricing</p>
          <h1 className="font-display font-800 text-4xl md:text-5xl text-text1 tracking-tight mb-5">
            Simple, Transparent Pricing
          </h1>
          <p className="text-base text-text2 leading-relaxed mb-10">
            Choose a plan that scales with your workflow -- whether you are managing personal tasks, startup operations, or enterprise-scale collaboration.
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-3 bg-surface2 border border-border rounded-xl p-1.5">
            <button
              onClick={() => setYearly(false)}
              className={`px-5 py-2 rounded-lg text-sm font-600 transition-all ${!yearly ? 'bg-accent text-white shadow-accent' : 'text-text2 hover:text-text1'}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setYearly(true)}
              className={`px-5 py-2 rounded-lg text-sm font-600 transition-all flex items-center gap-2 ${yearly ? 'bg-accent text-white shadow-accent' : 'text-text2 hover:text-text1'}`}
            >
              Yearly
              <span className={`text-[0.6rem] font-700 px-1.5 py-0.5 rounded-full ${yearly ? 'bg-white/20 text-white' : 'bg-green-dim text-green border border-green/20'}`}>
                Save 25%
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Pricing cards */}
      <section className="py-16 border-b border-border">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PLANS.map((plan, i) => (
              <div
                key={plan.name}
                className={`rounded-2xl border p-6 flex flex-col transition-all duration-200 animate-fade-up
                  ${plan.highlight
                    ? 'bg-accent-dim border-accent/30 shadow-xl shadow-accent/10 scale-[1.02]'
                    : 'bg-surface border-border hover:border-text3'
                  }`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {plan.badge && (
                  <div className="inline-flex items-center gap-1.5 bg-accent text-white text-[0.65rem] font-700 px-2.5 py-1 rounded-full mb-4 w-fit">
                    <span className="w-1 h-1 rounded-full bg-white/60 animate-pulse" />
                    {plan.badge}
                  </div>
                )}

                <h2 className="font-display font-800 text-text1 text-xl mb-1">{plan.name}</h2>
                <p className="text-xs text-text2 mb-5 leading-relaxed">{plan.description}</p>

                <div className="mb-6">
                  <span className="font-display font-800 text-4xl text-text1">
                    ${yearly ? plan.yearly : plan.monthly}
                  </span>
                  <span className="text-text3 text-sm ml-1">/month</span>
                  {yearly && plan.monthly > 0 && (
                    <p className="text-xs text-green mt-1">Billed annually -- saves ${(plan.monthly - plan.yearly) * 12}/yr</p>
                  )}
                </div>

                <Link
                  to={plan.ctaTo}
                  className={`w-full py-3 rounded-xl text-sm font-700 text-center transition-all duration-150 mb-6
                    ${plan.highlight
                      ? 'bg-accent hover:bg-accent-hover text-white shadow-accent hover:-translate-y-0.5'
                      : 'bg-surface2 hover:bg-border text-text1 border border-border hover:border-text3'
                    }`}
                >
                  {plan.cta}
                </Link>

                <div className="flex flex-col gap-2.5">
                  {plan.features.map(f => (
                    <div key={f} className="flex items-center gap-2.5">
                      <CheckIcon positive={true} />
                      <span className="text-xs text-text2">{f}</span>
                    </div>
                  ))}
                  {plan.missing.map(f => (
                    <div key={f} className="flex items-center gap-2.5">
                      <CheckIcon positive={false} />
                      <span className="text-xs text-text3 line-through">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 border-b border-border">
        <div className="max-w-2xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-display font-800 text-2xl text-text1 tracking-tight mb-3">Frequently Asked Questions</h2>
            <p className="text-sm text-text2">Everything you need to know about our pricing and plans.</p>
          </div>
          <div className="flex flex-col gap-2">
            {FAQS.map((faq, i) => (
              <div key={i} className="bg-surface border border-border rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-surface2 transition-colors"
                >
                  <span className="text-sm font-600 text-text1">{faq.q}</span>
                  <svg
                    width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                    className={`flex-shrink-0 text-text3 transition-transform duration-200 ${openFaq === i ? 'rotate-180' : ''}`}
                  >
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-4 text-sm text-text2 leading-relaxed border-t border-border pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="font-display font-800 text-2xl text-text1 tracking-tight mb-3">Start for free today</h2>
          <p className="text-sm text-text2 mb-8">No credit card required. Upgrade when you are ready.</p>
          <Link to="/register" className="inline-block px-8 py-3.5 bg-accent hover:bg-accent-hover text-white font-700 rounded-xl text-sm transition-all shadow-accent hover:-translate-y-0.5">
            Get Started Free
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
