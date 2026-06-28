import React from 'react'

class UserExportButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      submitting: false,
      lastJobId: null,
      error: null,
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.setState({ submitting: true, error: null })
    fetch('/api/v1/legacy/export/bulk', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + (localStorage.getItem('token') || ''),
      },
      body: JSON.stringify({ scope: 'users', filters: this.props.filters || {} }),
    })
      .then(r => {
        if (!r.ok) throw new Error('Export failed: ' + r.status)
        return r.json()
      })
      .then(data => {
        this.setState({ submitting: false, lastJobId: data.jobId })
      })
      .catch(err => {
        this.setState({ submitting: false, error: err.message })
      })
  }

  render() {
    const { submitting, lastJobId, error } = this.state
    return (
      <span>
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={this.handleClick}
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
}

export default UserExportButton
