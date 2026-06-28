import React, { useState } from 'react'
import TeamSettings from '../components/settings/TeamSettings'
import NotificationSettings from '../components/settings/NotificationSettings'
import ApiKeyManager from '../components/settings/ApiKeyManager'
import { Card } from '../components/ui'

export default function SettingsPage() {
  const [tab, setTab] = useState('team')

  return (
    <div className="dc-settings">
      <h1>Settings</h1>
      <p className="dc-settings-subtitle">Manage your team, notifications, and integrations.</p>

      <ul className="nav nav-tabs">
        <li className="nav-item">
          <button
            type="button"
            className={'nav-link' + (tab === 'team' ? ' active' : '')}
            onClick={() => setTab('team')}
          >
            Team
          </button>
        </li>
        <li className="nav-item">
          <button
            type="button"
            className={'nav-link' + (tab === 'notifications' ? ' active' : '')}
            onClick={() => setTab('notifications')}
          >
            Notifications
          </button>
        </li>
        <li className="nav-item">
          <button
            type="button"
            className={'nav-link' + (tab === 'api-keys' ? ' active' : '')}
            onClick={() => setTab('api-keys')}
          >
            API keys
          </button>
        </li>
        <li className="nav-item">
          <button
            type="button"
            className={'nav-link' + (tab === 'profile' ? ' active' : '')}
            onClick={() => setTab('profile')}
          >
            Profile
          </button>
        </li>
      </ul>

      <div className="tab-content" style={{ paddingTop: 'var(--dc-spacing-md)' }}>
        <div className={'tab-pane' + (tab === 'team' ? ' active' : '')} style={{ display: tab === 'team' ? 'block' : 'none' }}>
          <TeamSettings />
        </div>

        <div className={'tab-pane' + (tab === 'notifications' ? ' active' : '')} style={{ display: tab === 'notifications' ? 'block' : 'none' }}>
          <NotificationSettings />
        </div>

        <div className={'tab-pane' + (tab === 'api-keys' ? ' active' : '')} style={{ display: tab === 'api-keys' ? 'block' : 'none' }}>
          <ApiKeyManager />
        </div>

        <div className={'tab-pane' + (tab === 'profile' ? ' active' : '')} style={{ display: tab === 'profile' ? 'block' : 'none' }}>
          <Card title="Profile">
            <div className="form-group">
              <label htmlFor="profile-name">Name</label>
              <input id="profile-name" type="text" className="form-control" defaultValue="Eva Stone" />
            </div>
            <div className="form-group">
              <label htmlFor="profile-email">Email</label>
              <input id="profile-email" type="email" className="form-control" defaultValue="eva@datacats.local" />
            </div>
            <button type="button" className="btn btn-primary">Save profile</button>
          </Card>
        </div>
      </div>
    </div>
  )
}
