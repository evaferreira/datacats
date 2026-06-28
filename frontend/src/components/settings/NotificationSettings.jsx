import React, { useEffect, useState } from 'react'
import { Button, Card } from '../ui'
import { fetchWithAuth } from '../../utils/apiHelpers'

export default function NotificationSettings() {
  const [prefs, setPrefs] = useState(null)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    fetchWithAuth('/settings/notifications')
      .then(setPrefs)
      .catch(() => setPrefs({}))
  }, [])

  function toggle(key) {
    setPrefs(prev => ({ ...prev, [key]: !prev[key] }))
  }

  function save() {
    setSaving(true)
    setMessage(null)
    fetchWithAuth('/settings/notifications', { method: 'PUT', body: prefs })
      .then(saved => {
        setPrefs(saved)
        setMessage('Saved')
      })
      .catch(() => setMessage('Failed to save'))
      .finally(() => setSaving(false))
  }

  if (!prefs) return <div className="dc-loading">Loading…</div>

  return (
    <Card title="Notifications" footer={message ? <span>{message}</span> : null}>
      <p className="dc-help-line" style={{ marginBottom: 'var(--dc-spacing-smd)' }}>
        Choose how and when DataCats contacts you.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--dc-spacing-sm)' }}>
        <label>
          <input type="checkbox" checked={!!prefs.emailDigestDaily} onChange={() => toggle('emailDigestDaily')} />{' '}
          Daily email digest
        </label>
        <label>
          <input type="checkbox" checked={!!prefs.emailDigestWeekly} onChange={() => toggle('emailDigestWeekly')} />{' '}
          Weekly email digest
        </label>
        <label>
          <input type="checkbox" checked={!!prefs.slackChurnAlerts} onChange={() => toggle('slackChurnAlerts')} />{' '}
          Slack churn alerts
        </label>
        <label>
          <input type="checkbox" checked={!!prefs.slackNpsAlerts} onChange={() => toggle('slackNpsAlerts')} />{' '}
          Slack NPS alerts
        </label>
        <label>
          <input type="checkbox" checked={!!prefs.inAppMentions} onChange={() => toggle('inAppMentions')} />{' '}
          In-app @mentions
        </label>
      </div>
      <div style={{ marginTop: 'var(--dc-spacing-md)' }}>
        <Button variant="primary" onClick={save} disabled={saving}>
          {saving ? 'Saving…' : 'Save preferences'}
        </Button>
      </div>
    </Card>
  )
}
