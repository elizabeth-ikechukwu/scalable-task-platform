/* Reusable empty state components
 * Usage: <EmptyTasks onAdd={fn} />  <EmptyProjects onAdd={fn} />  etc.
 */

function EmptyBase({ icon, title, description, ctaLabel, onAction }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center animate-fade-up">
      <div className="w-16 h-16 rounded-2xl bg-surface2 border border-border flex items-center justify-center mb-5 text-2xl">
        {icon}
      </div>
      <h3 className="font-display font-700 text-text1 text-lg mb-2">{title}</h3>
      <p className="text-sm text-text2 max-w-xs leading-relaxed mb-6">{description}</p>
      {ctaLabel && (
        <button
          onClick={onAction}
          className="px-5 py-2.5 bg-accent hover:bg-accent-hover text-white text-sm font-600 rounded-lg transition-all duration-150 shadow-accent hover:shadow-accent-lg hover:-translate-y-0.5 active:translate-y-0"
        >
          {ctaLabel}
        </button>
      )}
    </div>
  )
}

export function EmptyTasks({ onAdd }) {
  return (
    <EmptyBase
      icon={
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 11l3 3L22 4"/>
          <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
        </svg>
      }
      title="No Tasks Yet"
      description="You don't have any tasks. Add your first task to start tracking your work and making progress."
      ctaLabel="+ Add Your First Task"
      onAction={onAdd}
    />
  )
}

export function EmptyProjects({ onAdd }) {
  return (
    <EmptyBase
      icon={
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 7a2 2 0 012-2h4l2 3h9a2 2 0 012 2v7a2 2 0 01-2 2H4a2 2 0 01-2-2V7z"/>
        </svg>
      }
      title="No Projects Found"
      description="You haven't created any projects yet. Organize your tasks into projects to track progress across different workstreams."
      ctaLabel="Create First Project"
      onAction={onAdd}
    />
  )
}

export function EmptyNotifications({ }) {
  return (
    <EmptyBase
      icon={
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/>
          <path d="M13.73 21a2 2 0 01-3.46 0"/>
        </svg>
      }
      title="No Notifications"
      description="You're all caught up. New activity from your projects, team, and tasks will appear here."
    />
  )
}

export function EmptyTeam({ onInvite }) {
  return (
    <EmptyBase
      icon={
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 00-3-3.87"/>
          <path d="M16 3.13a4 4 0 010 7.75"/>
        </svg>
      }
      title="No Team Members Added"
      description="Your workspace is currently solo. Invite your team to collaborate on tasks, share projects, and move faster together."
      ctaLabel="Invite Team Member"
      onAction={onInvite}
    />
  )
}

/* Default export for convenience */
export default { EmptyTasks, EmptyProjects, EmptyNotifications, EmptyTeam }
