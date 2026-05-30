import { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'

const API = '/api'
function getToken() { return localStorage.getItem('token') }

function getUserFromToken() {
  try {
    const token = localStorage.getItem('token')
    if (!token) return null
    return JSON.parse(atob(token.split('.')[1]))
  } catch { return null }
}

function Section({ title, description, children }) {
  return (
    <div className="bg-surface border border-border rounded-xl overflow-hidden mb-4">
      <div className="px-6 py-4 border-b border-border">
        <h2 className="font-display font-700 text-text1 text-sm">{title}</h2>
        {description && <p className="text-xs text-text3 mt-0.5">{description}</p>}
      </div>
      <div className="px-6 py-5">{children}</div>
    </div>
  )
}

export default function Settings() {
  const tokenUser = getUserFromToken()

  const [profile, setProfile]         = useState({ name: tokenUser?.name || '', email: tokenUser?.email || '' })
  const [password, setPassword]       = useState({ current: '', next: '', confirm: '' })
  const [profileMsg, setProfileMsg]   = useState({ text: '', ok: true })
  const [passwordMsg, setPasswordMsg] = useState({ text: '', ok: true })
  const [savingProfile, setSavingProfile]   = useState(false)
  const [savingPassword, setSavingPassword] = useState(false)

  const handleProfileSave = async e => {
    e.preventDefault()
    setSavingProfile(true)
    setProfileMsg({ text: '', ok: true })
    try {
      const res  = await fetch(`${API}/auth/me`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getToken()}` },
        body: JSON.stringify({ name: profile.name, email: profile.email }),
      })
      const data = await res.json()
      if (!res.ok) { setProfileMsg({ text: data.error || 'Update failed', ok: false }); return }
      setProfileMsg({ text: 'Profile updated successfully.', ok: true })
    } catch {
      setProfileMsg({ text: 'Network error. Please try again.', ok: false })
    } finally {
      setSavingProfile(false)
    }
  }

  const handlePasswordSave = async e => {
    e.preventDefault()
    setPasswordMsg({ text: '', ok: true })
    if (password.next !== password.confirm) {
      setPasswordMsg({ text: 'New passwords do not match.', ok: false }); return
    }
    if (password.next.length < 8) {
      setPasswordMsg({ text: 'Password must be at least 8 characters.', ok: false }); return
    }
    setSavingPassword(true)
    try {
      const res  = await fetch(`${API}/auth/password`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getToken()}` },
        body: JSON.stringify({ currentPassword: password.current, newPassword: password.next }),
      })
      const data = await res.json()
      if (!res.ok) { setPasswordMsg({ text: data.error || 'Password update failed', ok: false }); return }
      setPasswordMsg({ text: 'Password updated successfully.', ok: true })
      setPassword({ current: '', next: '', confirm: '' })
    } catch {
      setPasswordMsg({ text: 'Network error. Please try again.', ok: false })
    } finally {
      setSavingPassword(false)
    }
  }

  const initials = profile.name
    ? profile.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
    : 'U'

  return (
    <div className="flex min-h-screen bg-bg">
      <Sidebar />
      <main className="ml-[240px] flex-1 min-h-screen overflow-y-auto">
        <div className="max-w-2xl mx-auto px-8 py-10">

          <div className="mb-8">
            <h1 className="font-display font-800 text-2xl text-text1 tracking-tight">Settings</h1>
            <p className="text-sm text-text2 mt-1">Manage your account and workspace preferences.</p>
          </div>

          {/* Avatar section */}
          <Section title="Profile Picture" description="Your avatar is generated from your name initials.">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent to-green flex items-center justify-center text-white text-xl font-700 flex-shrink-0">
                {initials}
              </div>
              <div>
                <p className="text-sm font-600 text-text1">{profile.name || 'Your Name'}</p>
                <p className="text-xs text-text3 mt-0.5">{profile.email || 'your@email.com'}</p>
                <p className="text-xs text-text3 mt-2">Avatar is auto-generated from your name. Custom avatars coming soon.</p>
              </div>
            </div>
          </Section>

          {/* Profile section */}
          <Section title="Profile Information" description="Update your name and email address.">
            {profileMsg.text && (
              <div className={`mb-4 px-3 py-2.5 rounded-lg text-sm border ${profileMsg.ok ? 'bg-green-dim border-green/30 text-green' : 'bg-red-dim border-red/30 text-red'}`}>
                {profileMsg.text}
              </div>
            )}
            <form onSubmit={handleProfileSave} className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-600 text-text2 uppercase tracking-wider mb-2">Full Name</label>
                <input
                  value={profile.name}
                  onChange={e => setProfile(p => ({ ...p, name: e.target.value }))}
                  placeholder="Your full name"
                  className="w-full bg-surface2 border border-border rounded-lg px-4 py-3 text-sm text-text1 placeholder-text3 outline-none focus:border-accent focus:ring-2 focus:ring-accent/15 transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-600 text-text2 uppercase tracking-wider mb-2">Email Address</label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={e => setProfile(p => ({ ...p, email: e.target.value }))}
                  placeholder="you@example.com"
                  className="w-full bg-surface2 border border-border rounded-lg px-4 py-3 text-sm text-text1 placeholder-text3 outline-none focus:border-accent focus:ring-2 focus:ring-accent/15 transition-all"
                />
              </div>
              <div>
                <button
                  type="submit"
                  disabled={savingProfile}
                  className="px-5 py-2.5 bg-accent hover:bg-accent-hover disabled:opacity-60 text-white text-sm font-700 rounded-lg transition-all shadow-accent"
                >
                  {savingProfile ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </Section>

          {/* Password section */}
          <Section title="Change Password" description="Update your password. Minimum 8 characters.">
            {passwordMsg.text && (
              <div className={`mb-4 px-3 py-2.5 rounded-lg text-sm border ${passwordMsg.ok ? 'bg-green-dim border-green/30 text-green' : 'bg-red-dim border-red/30 text-red'}`}>
                {passwordMsg.text}
              </div>
            )}
            <form onSubmit={handlePasswordSave} className="flex flex-col gap-4">
              {[
                { label: 'Current Password', key: 'current', placeholder: 'Enter current password' },
                { label: 'New Password',     key: 'next',    placeholder: 'Min. 8 characters' },
                { label: 'Confirm New Password', key: 'confirm', placeholder: 'Repeat new password' },
              ].map(f => (
                <div key={f.key}>
                  <label className="block text-xs font-600 text-text2 uppercase tracking-wider mb-2">{f.label}</label>
                  <input
                    type="password"
                    value={password[f.key]}
                    onChange={e => setPassword(p => ({ ...p, [f.key]: e.target.value }))}
                    placeholder={f.placeholder}
                    className="w-full bg-surface2 border border-border rounded-lg px-4 py-3 text-sm text-text1 placeholder-text3 outline-none focus:border-accent focus:ring-2 focus:ring-accent/15 transition-all"
                  />
                </div>
              ))}
              <div>
                <button
                  type="submit"
                  disabled={savingPassword}
                  className="px-5 py-2.5 bg-accent hover:bg-accent-hover disabled:opacity-60 text-white text-sm font-700 rounded-lg transition-all shadow-accent"
                >
                  {savingPassword ? 'Updating...' : 'Update Password'}
                </button>
              </div>
            </form>
          </Section>

          {/* Danger zone */}
          <Section title="Danger Zone" description="Irreversible actions. Proceed with caution.">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-600 text-text1">Delete Account</p>
                <p className="text-xs text-text3 mt-0.5">Permanently delete your account and all associated data.</p>
              </div>
              <button
                onClick={() => alert('Account deletion requires contacting support. This prevents accidental data loss.')}
                className="px-4 py-2 bg-red-dim border border-red/30 text-red text-xs font-700 rounded-lg hover:bg-red hover:text-white transition-all"
              >
                Delete Account
              </button>
            </div>
          </Section>

        </div>
      </main>
    </div>
  )
}
