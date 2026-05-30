import { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import { EmptyTeam } from '../components/EmptyState'

const API = '/api'
function getToken() { return localStorage.getItem('token') }

function getUserFromToken() {
  try {
    const token = localStorage.getItem('token')
    if (!token) return null
    return JSON.parse(atob(token.split('.')[1]))
  } catch { return null }
}

export default function Teams() {
  const [members,  setMembers]  = useState([])
  const [loading,  setLoading]  = useState(true)
  const [showing,  setShowing]  = useState(false)
  const [email,    setEmail]    = useState('')
  const [role,     setRole]     = useState('member')
  const [saving,   setSaving]   = useState(false)
  const [error,    setError]    = useState('')
  const [success,  setSuccess]  = useState('')
  const currentUser = getUserFromToken()

  const fetchMembers = async () => {
    try {
      const res  = await fetch(`${API}/team`, { headers: { Authorization: `Bearer ${getToken()}` } })
      const data = await res.json()
      setMembers(Array.isArray(data) ? data : [])
    } catch { setMembers([]) }
    finally  { setLoading(false) }
  }

  useEffect(() => { fetchMembers() }, [])

  const handleInvite = async e => {
    e.preventDefault()
    if (!email.trim()) return
    setSaving(true)
    setError('')
    setSuccess('')
    try {
      const res  = await fetch(`${API}/team/invite`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getToken()}` },
        body: JSON.stringify({ email, role }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error || 'Failed to send invite'); return }
      setSuccess(`Invitation sent to ${email}`)
      setEmail('')
      setShowing(false)
      fetchMembers()
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const handleRemove = async id => {
    if (!window.confirm('Remove this team member?')) return
    await fetch(`${API}/team/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${getToken()}` },
    })
    fetchMembers()
  }

  const ROLE_COLORS = {
    admin:  'text-accent bg-accent-dim border-accent/20',
    member: 'text-green bg-green-dim border-green/20',
    viewer: 'text-text2 bg-surface2 border-border',
  }

  return (
    <div className="flex min-h-screen bg-bg">
      <Sidebar />
      <main className="ml-[240px] flex-1 min-h-screen overflow-y-auto">
        <div className="max-w-3xl mx-auto px-8 py-10">

          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-display font-800 text-2xl text-text1 tracking-tight">Teams</h1>
              <p className="text-sm text-text2 mt-1">Manage your workspace members and roles.</p>
            </div>
            <button
              onClick={() => setShowing(true)}
              className="px-4 py-2.5 bg-accent hover:bg-accent-hover text-white text-sm font-700 rounded-lg transition-all shadow-accent hover:-translate-y-0.5 flex items-center gap-2"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Invite Member
            </button>
          </div>

          {success && (
            <div className="mb-5 px-4 py-3 rounded-lg bg-green-dim border border-green/30 text-green text-sm flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
              {success}
            </div>
          )}

          {/* Invite modal */}
          {showing && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="bg-surface border border-border rounded-2xl w-full max-w-md p-6 animate-fade-up">
                <h2 className="font-display font-700 text-text1 text-lg mb-5">Invite Team Member</h2>
                {error && (
                  <div className="mb-4 px-3 py-2.5 rounded-lg bg-red-dim border border-red/30 text-red text-sm">{error}</div>
                )}
                <form onSubmit={handleInvite} className="flex flex-col gap-4">
                  <div>
                    <label className="block text-xs font-600 text-text2 uppercase tracking-wider mb-2">Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="teammate@example.com"
                      required
                      className="w-full bg-surface2 border border-border rounded-lg px-4 py-3 text-sm text-text1 placeholder-text3 outline-none focus:border-accent focus:ring-2 focus:ring-accent/15 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-600 text-text2 uppercase tracking-wider mb-2">Role</label>
                    <select
                      value={role}
                      onChange={e => setRole(e.target.value)}
                      className="w-full bg-surface2 border border-border rounded-lg px-4 py-3 text-sm text-text1 outline-none focus:border-accent transition-all"
                    >
                      <option value="admin">Admin -- full access</option>
                      <option value="member">Member -- can create and edit</option>
                      <option value="viewer">Viewer -- read only</option>
                    </select>
                  </div>
                  <div className="flex gap-3 mt-2">
                    <button type="button" onClick={() => { setShowing(false); setError('') }}
                      className="flex-1 py-2.5 bg-surface2 hover:bg-border text-text2 text-sm font-600 rounded-lg border border-border transition-all">
                      Cancel
                    </button>
                    <button type="submit" disabled={saving}
                      className="flex-1 py-2.5 bg-accent hover:bg-accent-hover disabled:opacity-60 text-white text-sm font-700 rounded-lg transition-all shadow-accent">
                      {saving ? 'Sending...' : 'Send Invite'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Members list */}
          <div className="bg-surface border border-border rounded-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-border flex items-center justify-between">
              <h2 className="font-display font-700 text-text1 text-sm tracking-tight">Workspace Members</h2>
              <span className="text-xs text-text3 bg-surface2 border border-border px-2.5 py-1 rounded-full">
                {members.length + 1} member{members.length !== 0 ? 's' : ''}
              </span>
            </div>

            {loading && (
              <div className="flex items-center justify-center py-16">
                <div className="w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin" />
              </div>
            )}

            {/* Current user always shown */}
            <div className="px-6 py-4 flex items-center gap-4 border-b border-border bg-surface2">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-accent to-green flex items-center justify-center text-white text-xs font-700 flex-shrink-0">
                {currentUser?.name?.charAt(0)?.toUpperCase() || 'Y'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-600 text-text1">{currentUser?.name || 'You'} <span className="text-text3 font-400">(you)</span></p>
                <p className="text-xs text-text3">{currentUser?.email || ''}</p>
              </div>
              <span className="text-[0.65rem] font-600 px-2 py-0.5 rounded-full border text-accent bg-accent-dim border-accent/20">
                Admin
              </span>
            </div>

            {!loading && members.length === 0 && (
              <EmptyTeam onInvite={() => setShowing(true)} />
            )}

            {!loading && members.map(member => (
              <div key={member.id} className="px-6 py-4 flex items-center gap-4 border-b border-border last:border-0 hover:bg-surface2 transition-colors group">
                <div className="w-9 h-9 rounded-full bg-surface2 border border-border flex items-center justify-center text-text2 text-xs font-700 flex-shrink-0">
                  {member.name?.charAt(0)?.toUpperCase() || member.email?.charAt(0)?.toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-600 text-text1 truncate">{member.name || 'Invited User'}</p>
                  <p className="text-xs text-text3 truncate">{member.email}</p>
                </div>
                <span className={`text-[0.65rem] font-600 px-2 py-0.5 rounded-full border ${ROLE_COLORS[member.role] || ROLE_COLORS.member}`}>
                  {member.role || 'member'}
                </span>
                <button
                  onClick={() => handleRemove(member.id)}
                  className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg text-text3 hover:text-red hover:bg-red-dim transition-all"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
              </div>
            ))}
          </div>

        </div>
      </main>
    </div>
  )
}
