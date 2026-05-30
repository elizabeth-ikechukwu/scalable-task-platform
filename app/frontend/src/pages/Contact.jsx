import { useState } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'

export default function Contact() {
  const [form, setForm]       = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent]       = useState(false)
  const [sending, setSending] = useState(false)

  const handleSubmit = e => {
    e.preventDefault()
    setSending(true)
    // Simulate sending
    setTimeout(() => {
      setSending(false)
      setSent(true)
    }, 1200)
  }

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
      <section className="py-20 border-b border-border text-center">
        <div className="max-w-2xl mx-auto px-6">
          <p className="text-xs font-700 text-accent uppercase tracking-widest mb-3">Contact</p>
          <h1 className="font-display font-800 text-4xl text-text1 tracking-tight mb-4">Get in Touch</h1>
          <p className="text-sm text-text2 leading-relaxed">
            Have a question, feedback, or want to discuss how TaskFlow can work for your team? We would love to hear from you.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 flex-1">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

            {/* Contact info */}
            <div className="lg:col-span-2 flex flex-col gap-5">

              <div className="bg-surface border border-border rounded-xl p-5">
                <h3 className="font-display font-700 text-text1 text-sm mb-4">Contact Information</h3>
                <div className="flex flex-col gap-4">
                  <a
                    href="mailto:elizabethik135@gmail.com"
                    className="flex items-center gap-3 text-sm text-text2 hover:text-accent transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-accent-dim border border-accent/20 flex items-center justify-center flex-shrink-0 group-hover:bg-accent group-hover:border-accent transition-colors">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent group-hover:text-white">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                        <polyline points="22,6 12,13 2,6"/>
                      </svg>
                    </div>
                    elizabethik135@gmail.com
                  </a>
                  <a
                    href="https://www.linkedin.com/in/ikechukwu-elizabeth"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm text-text2 hover:text-accent transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-accent-dim border border-accent/20 flex items-center justify-center flex-shrink-0 group-hover:bg-accent group-hover:border-accent transition-colors">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-accent group-hover:text-white">
                        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
                        <circle cx="4" cy="4" r="2"/>
                      </svg>
                    </div>
                    LinkedIn Profile
                  </a>
                  <a
                    href="https://github.com/elizabeth-ikechukwu/scalable-task-platform"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm text-text2 hover:text-accent transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-accent-dim border border-accent/20 flex items-center justify-center flex-shrink-0 group-hover:bg-accent group-hover:border-accent transition-colors">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-accent group-hover:text-white">
                        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                      </svg>
                    </div>
                    GitHub Repository
                  </a>
                </div>
              </div>

              <div className="bg-surface border border-border rounded-xl p-5">
                <h3 className="font-display font-700 text-text1 text-sm mb-3">Response Time</h3>
                <p className="text-xs text-text2 leading-relaxed">
                  We typically respond within 24 hours on business days. For urgent issues, email is the fastest way to reach us.
                </p>
              </div>

              <div className="bg-surface border border-border rounded-xl p-5">
                <h3 className="font-display font-700 text-text1 text-sm mb-3">Open Source</h3>
                <p className="text-xs text-text2 leading-relaxed mb-3">
                  TaskFlow is open source. Found a bug or want to contribute? Open an issue or pull request on GitHub.
                </p>
                <a
                  href="https://github.com/elizabeth-ikechukwu/scalable-task-platform"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-600 text-accent hover:underline"
                >
                  View on GitHub →
                </a>
              </div>
            </div>

            {/* Contact form */}
            <div className="lg:col-span-3">
              <div className="bg-surface border border-border rounded-2xl p-6">
                {sent ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-green-dim border border-green/30 flex items-center justify-center">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                    <h3 className="font-display font-700 text-text1 text-lg">Message Sent!</h3>
                    <p className="text-sm text-text2 max-w-xs">Thank you for reaching out. We will get back to you within 24 hours.</p>
                    <button
                      onClick={() => { setSent(false); setForm({ name: '', email: '', subject: '', message: '' }) }}
                      className="mt-2 text-xs font-600 text-accent hover:underline"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <>
                    <h2 className="font-display font-700 text-text1 text-lg mb-5">Send a Message</h2>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-600 text-text2 uppercase tracking-wider mb-2">Full Name</label>
                          <input
                            value={form.name}
                            onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                            placeholder="Your name"
                            required
                            className="w-full bg-surface2 border border-border rounded-lg px-4 py-3 text-sm text-text1 placeholder-text3 outline-none focus:border-accent focus:ring-2 focus:ring-accent/15 transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-600 text-text2 uppercase tracking-wider mb-2">Email Address</label>
                          <input
                            type="email"
                            value={form.email}
                            onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                            placeholder="you@example.com"
                            required
                            className="w-full bg-surface2 border border-border rounded-lg px-4 py-3 text-sm text-text1 placeholder-text3 outline-none focus:border-accent focus:ring-2 focus:ring-accent/15 transition-all"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-600 text-text2 uppercase tracking-wider mb-2">Subject</label>
                        <select
                          value={form.subject}
                          onChange={e => setForm(p => ({ ...p, subject: e.target.value }))}
                          required
                          className="w-full bg-surface2 border border-border rounded-lg px-4 py-3 text-sm text-text1 outline-none focus:border-accent transition-all"
                        >
                          <option value="">Select a subject</option>
                          <option value="general">General Inquiry</option>
                          <option value="support">Technical Support</option>
                          <option value="billing">Billing Question</option>
                          <option value="enterprise">Enterprise Sales</option>
                          <option value="feedback">Product Feedback</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-600 text-text2 uppercase tracking-wider mb-2">Message</label>
                        <textarea
                          value={form.message}
                          onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                          placeholder="Tell us how we can help..."
                          rows={5}
                          required
                          className="w-full bg-surface2 border border-border rounded-lg px-4 py-3 text-sm text-text1 placeholder-text3 outline-none focus:border-accent focus:ring-2 focus:ring-accent/15 transition-all resize-none"
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={sending}
                        className="w-full py-3 bg-accent hover:bg-accent-hover disabled:opacity-60 text-white font-700 rounded-lg text-sm transition-all shadow-accent hover:-translate-y-0.5 flex items-center justify-center gap-2"
                      >
                        {sending ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Sending...
                          </>
                        ) : 'Send Message'}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
