import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Sidebar() {
  return (
    <nav
      className="nav flex-column bg-dark text-white"
      style={{ width: 220, padding: 'var(--dc-spacing-md) var(--dc-spacing-sm)', minHeight: '100vh' }}
    >
      <div
        style={{
          padding: 'var(--dc-spacing-sm) var(--dc-spacing-smd)',
          color: 'var(--dc-primary-light)',
          fontWeight: 700,
          fontSize: 'var(--dc-font-xl)',
          marginBottom: 'var(--dc-spacing-md)',
        }}
      >
        DataCats
      </div>

      <div className="nav-item">
        <NavLink
          to="/"
          exact
          className="nav-link text-white"
          activeStyle={{ color: 'var(--dc-primary-hover)', backgroundColor: 'var(--dc-sidebar-active-bg)' }}
        >
          Overview
        </NavLink>
      </div>
      <div className="nav-item">
        <NavLink
          to="/users"
          className="nav-link text-white"
          activeStyle={{ color: 'var(--dc-primary-hover)', backgroundColor: 'var(--dc-sidebar-active-bg)' }}
        >
          Users
        </NavLink>
      </div>
      <div className="nav-item">
        <NavLink
          to="/reports"
          className="nav-link text-white"
          activeStyle={{ color: 'var(--dc-primary-hover)', backgroundColor: 'var(--dc-sidebar-active-bg)' }}
        >
          Reports
        </NavLink>
      </div>
      <div className="nav-item">
        <NavLink
          to="/settings"
          className="nav-link text-white"
          activeStyle={{ color: 'var(--dc-primary-hover)', backgroundColor: 'var(--dc-sidebar-active-bg)' }}
        >
          Settings
        </NavLink>
      </div>

      <div style={{ marginTop: 'auto', padding: 'var(--dc-spacing-sm) var(--dc-spacing-smd)', fontSize: 'var(--dc-font-sm)', opacity: 0.5 }}>
        v8.2.1
      </div>
    </nav>
  )
}
