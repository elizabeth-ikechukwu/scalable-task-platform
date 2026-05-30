import { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import { EmptyProjects } from '../components/EmptyState'

const API = '/api'

function getToken() { return localStorage.getItem('token') }

function headers() {
  return { 'Content-Type': 'application/json', Authorization: `Bearer ${getToken()}` }
}

const COLORS = [
  'bg-accent border-accent/30',
  'bg-green border-green/30',
  'bg-blue-500 border-blue-500/30',
  'bg-purple-500 border-purple-500/30',
  'bg-yellow-500 border-yellow-500/30',
  'bg-red border-red/30',
]

export default function Projects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading]   = useState(true)
  const [showing, setShowing]   = useState(false)
  const [form, setForm]         = useState({ name: '', description: '' })
  const [saving, setSaving]     = useState(false)
  const [error, setError]       = useState('')

  const fetchProjects = async () => {
    try {
      const res  = await fetch(`${API}/projects`, { headers: { Authorization: `Bearer ${getToken()}` } })
      const data = await res.json()
      setProjects(Array.isArray(data) ? data : [])
    } catch {
      setProjects([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchProjects() }, [])

  const handleCreate = async e => {
    e.preventDefault()
    if (!form.name.trim()) return
    setSaving(true)
    setError('')
    try {
      const res  = await fetch(`${API}/projects`, { method: 'POST', headers: headers(), body: JSON.stringify(form) })
      const data = await res.json()
      if (!res.ok) { setError(data.error || 'Failed to create project'); return }
      setForm({ name: '', description: '' })
      setShowing(false)
      fetchProjects()
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async id => {
    if (!window.confirm('Delete this project?')) return
    await fetch(`${API}/projects/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${getToken()}` } })
    fetchProjects()
  }

  return (
    <div className="flex min-h-screen bg-bg">
      <Sidebar />
      <main className="ml-[240px] flex-1 min-h-screen overflow-y-auto">
        <div className="max-w-4xl mx-auto px-8 py-10">

          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-display font-800 text-2xl text-text1 tracking-tight">Projects</h1>
              <p className="text-sm text-text2 mt-1">Organize your work into focused project spaces.</p>
            </div>
            <button
              onClick={() => setShowing(true)}
              className="px-4 py-2.5 bg-accent hover:bg-accent-hover text-white text-sm font-700 rounded-lg transition-all duration-150 shadow-accent hover:shadow-accent-lg hover:-translate-y-0.5 flex items-center gap-2"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              New Project
            </button>
          </div>

          {/* Create modal */}
          {showing && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="bg-surface border border-border rounded-2xl w-full max-w-md p-6 animate-fade-up">
                <h2 className="font-display font-700 text-text1 text-lg mb-5">Create New Project</h2>
                {error && (
                  <div className="mb-4 px-3 py-2.5 rounded-lg bg-red-dim border border-red/30 text-red text-sm">{error}</div>
                )}
                <form onSubmit={handleCreate} className="flex flex-col gap-4">
                  <div>
                    <label className="block text-xs font-600 text-text2 uppercase tracking-wider mb-2">Project Name</label>
                    <input
                      value={form.name}
                      onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                      placeholder="e.g. AWS Infrastructure Setup"
                      required
                      className="w-full bg-surface2 border border-border rounded-lg px-4 py-3 text-sm text-text1 placeholder-text3 outline-none focus:border-accent focus:ring-2 focus:ring-accent/15 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-600 text-text2 uppercase tracking-wider mb-2">Description</label>
                    <textarea
                      value={form.description}
                      onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
                      placeholder="What is this project about?"
                      rows={3}
                      className="w-full bg-surface2 border border-border rounded-lg px-4 py-3 text-sm text-text1 placeholder-text3 outline-none focus:border-accent focus:ring-2 focus:ring-accent/15 transition-all resize-none"
                    />
                  </div>
                  <div className="flex gap-3 mt-2">
                    <button type="button" onClick={() => { setShowing(false); setError('') }}
                      className="flex-1 py-2.5 bg-surface2 hover:bg-border text-text2 text-sm font-600 rounded-lg border border-border transition-all">
                      Cancel
                    </button>
                    <button type="submit" disabled={saving}
                      className="flex-1 py-2.5 bg-accent hover:bg-accent-hover disabled:opacity-60 text-white text-sm font-700 rounded-lg transition-all shadow-accent">
                      {saving ? 'Creating...' : 'Create Project'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Projects grid */}
          {loading && (
            <div className="flex items-center justify-center py-20">
              <div className="w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          {!loading && projects.length === 0 && (
            <EmptyProjects onAdd={() => setShowing(true)} />
          )}

          {!loading && projects.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projects.map((project, i) => (
                <div key={project.id} className="bg-surface border border-border rounded-xl p-5 hover:border-accent/40 hover:bg-surface2 transition-all duration-150 group animate-fade-up">
                  <div className="flex items-start justify-between mb-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-700 text-sm flex-shrink-0 ${COLORS[i % COLORS.length].split(' ')[0]}`}>
                      {project.name.charAt(0).toUpperCase()}
                    </div>
                    <button
                      onClick={() => handleDelete(project.id)}
                      className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg text-text3 hover:text-red hover:bg-red-dim transition-all"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg>
                    </button>
                  </div>
                  <h3 className="font-display font-700 text-text1 text-sm mb-1">{project.name}</h3>
                  <p className="text-xs text-text2 leading-relaxed mb-4">{project.description || 'No description provided.'}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[0.65rem] text-text3">
                      {new Date(project.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                    <span className="text-[0.65rem] font-600 text-accent bg-accent-dim border border-accent/20 px-2 py-0.5 rounded-full">
                      Active
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </main>
    </div>
  )
}
