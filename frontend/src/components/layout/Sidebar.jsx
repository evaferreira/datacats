import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Sidebar() {
  return (
    <nav
      className="nav flex-column bg-dark text-white"
      style={{ width: 220, padding: '16px 8px', minHeight: '100vh' }}
    >
      <div
        style={{
          padding: '8px 12px',
          color: '#60a5fa',
          fontWeight: 700,
          fontSize: 20,
          marginBottom: 16,
        }}
      >
        DataCats
      </div>

      <div className="nav-item">
        <NavLink
          to="/"
          exact
          className="nav-link text-white"
          activeStyle={{ color: '#1d4ed8', backgroundColor: 'rgba(255,255,255,0.06)' }}
        >
          Overview
        </NavLink>
      </div>
      <div className="nav-item">
        <NavLink
          to="/users"
          className="nav-link text-white"
          activeStyle={{ color: '#1d4ed8', backgroundColor: 'rgba(255,255,255,0.06)' }}
        >
          Users
        </NavLink>
      </div>
      <div className="nav-item">
        <NavLink
          to="/reports"
          className="nav-link text-white"
          activeStyle={{ color: '#1d4ed8', backgroundColor: 'rgba(255,255,255,0.06)' }}
        >
          Reports
        </NavLink>
      </div>
      <div className="nav-item">
        <NavLink
          to="/settings"
          className="nav-link text-white"
          activeStyle={{ color: '#1d4ed8', backgroundColor: 'rgba(255,255,255,0.06)' }}
        >
          Settings
        </NavLink>
      </div>

      <div style={{ marginTop: 'auto', padding: '8px 12px', fontSize: 14, opacity: 0.5 }}>
        v8.2.1
      </div>
    </nav>
  )
}
