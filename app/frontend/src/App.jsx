import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Landing            from './pages/Landing'
import Login              from './pages/Login'
import Register           from './pages/Register'
import Dashboard          from './pages/Dashboard'
import Projects           from './pages/Projects'
import Tasks              from './pages/Tasks'
import Teams              from './pages/Teams'
import Calendar           from './pages/Calendar'
import Activity           from './pages/Activity'
import Notifications      from './pages/Notifications'
import Analytics          from './pages/Analytics'
import Settings           from './pages/Settings'
import Pricing            from './pages/Pricing'
import About              from './pages/About'
import Contact            from './pages/Contact'
import Status             from './pages/Status'
import TaskManagement     from './pages/features/TaskManagement'
import TeamCollaboration  from './pages/features/TeamCollaboration'
import NotificationsFeature from './pages/features/Notifications'
import ProjectWorkspaces  from './pages/features/ProjectWorkspaces'
import AnalyticsFeature   from './pages/features/Analytics'
import Security           from './pages/features/Security'
import Architecture       from './pages/features/Architecture'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/"         element={<Landing />}  />
        <Route path="/login"    element={<Login />}    />
        <Route path="/register" element={<Register />} />
        <Route path="/pricing"  element={<Pricing />}  />
        <Route path="/about"    element={<About />}    />
        <Route path="/contact"  element={<Contact />}  />
        <Route path="/status"   element={<Status />}   />

        {/* Feature detail pages */}
        <Route path="/features/task-management"    element={<TaskManagement />}       />
        <Route path="/features/team-collaboration" element={<TeamCollaboration />}    />
        <Route path="/features/notifications"      element={<NotificationsFeature />} />
        <Route path="/features/project-workspaces" element={<ProjectWorkspaces />}    />
        <Route path="/features/analytics"          element={<AnalyticsFeature />}     />
        <Route path="/features/security"           element={<Security />}             />
        <Route path="/features/architecture"       element={<Architecture />}         />

        {/* Dashboard pages */}
        <Route path="/dashboard"               element={<Dashboard />}     />
        <Route path="/dashboard/projects"      element={<Projects />}      />
        <Route path="/dashboard/tasks"         element={<Tasks />}         />
        <Route path="/dashboard/teams"         element={<Teams />}         />
        <Route path="/dashboard/calendar"      element={<Calendar />}      />
        <Route path="/dashboard/activity"      element={<Activity />}      />
        <Route path="/dashboard/notifications" element={<Notifications />} />
        <Route path="/dashboard/analytics"     element={<Analytics />}     />
        <Route path="/dashboard/settings"      element={<Settings />}      />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
