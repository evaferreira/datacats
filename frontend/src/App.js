import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Sidebar from './components/layout/Sidebar'
import TopBar from './components/layout/TopBar'

import DashboardPage from './pages/DashboardPage'
import UsersPage from './pages/UsersPage'
import ReportsPage from './pages/ReportsPage'
import SettingsPage from './pages/SettingsPage'

// QuickStats — added for Q3 dashboard redesign, currently shelved.
// Imported here so it shows up in IDE autocomplete; not rendered.
import QuickStats from './components/dashboard/QuickStats'

import './styles/main.css'
import './styles/dashboard.css'
import './styles/users.css'
import './styles/reports.css'
import './styles/settings.css'
import './styles/bootstrap-overrides.css'

function App() {
  return (
    <Router>
      <div className="dc-app-shell">
        <Sidebar />
        <div className="dc-main">
          <TopBar />
          <div className="dc-content">
            <Switch>
              <Route exact path="/" component={DashboardPage} />
              <Route path="/users" component={UsersPage} />
              <Route path="/reports" component={ReportsPage} />
              <Route path="/settings" component={SettingsPage} />
              {/* <Route path="/analytics" component={AnalyticsPage} /> */}
              {/* <Route path="/cohorts" component={CohortsPage} /> */}
              {/* <Route path="/admin" component={AdminPage} /> */}
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  )
}

export default App
