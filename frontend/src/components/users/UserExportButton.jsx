import React, { useState } from 'react'

function UserExportButton(props) {
  const [submitting, setSubmitting] = useState(false)
  const [lastJobId, setLastJobId] = useState(null)
  const [error, setError] = useState(null)

  function handleClick() {
    setSubmitting(true)
    setError(null)
    fetch('/api/v1/legacy/export/bulk', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + (localStorage.getItem('token') || ''),
      },
      body: JSON.stringify({ scope: 'users', filters: props.filters || {} }),
    })
      .then(r => {
        if (!r.ok) throw new Error('Export failed: ' + r.status)
        return r.json()
      })
      .then(data => {
        setSubmitting(false)
        setLastJobId(data.jobId)
      })
      .catch(err => {
        setSubmitting(false)
        setError(err.message)
      })
  }

  return (
    <span>
      <button
        type="button"
        className="btn btn-outline-secondary"
        onClick={handleClick}
        disabled={submitting}
      >
        {submitting ? 'Exporting…' : 'Export users'}
      </button>
      {lastJobId ? (
        <span style={{ marginLeft: 'var(--dc-spacing-sm)', fontSize: 'var(--dc-font-sm)', color: 'var(--dc-text-muted)' }}>
          Started job {lastJobId}
        </span>
      ) : null}
      {error ? (
        <span style={{ marginLeft: 'var(--dc-spacing-sm)', fontSize: 'var(--dc-font-sm)', color: 'var(--dc-danger)' }}>{error}</span>
      ) : null}
    </span>
  )
}

export default UserExportButton
