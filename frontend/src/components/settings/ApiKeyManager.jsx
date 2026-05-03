import React from 'react'
import { Badge } from '../ui'
import { fetchWithAuth } from '../../utils/api'
import { SUPPORT_EMAIL } from '../../constants/oldConfig'

class ApiKeyManager extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      keys: [],
      loading: true,
      newLabel: '',
      previewLoading: false,
      previewText: '',
      previewError: null,
    }
    this.loadKeys = this.loadKeys.bind(this)
    this.handleCreate = this.handleCreate.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handlePreviewExport = this.handlePreviewExport.bind(this)
  }

  componentDidMount() {
    this.loadKeys()
  }

  loadKeys() {
    this.setState({ loading: true })
    fetchWithAuth('/api/v1/settings/api-keys')
      .then(keys => this.setState({ keys, loading: false }))
      .catch(() => this.setState({ loading: false }))
  }

  handleCreate(e) {
    e.preventDefault()
    if (!this.state.newLabel) return
    fetchWithAuth('/api/v1/settings/api-keys', {
      method: 'POST',
      body: JSON.stringify({ label: this.state.newLabel }),
    })
      .then(key => {
        this.setState(prev => ({ keys: [...prev.keys, key], newLabel: '' }))
      })
      .catch(() => {})
  }

  handleDelete(id) {
    fetchWithAuth('/api/v1/settings/api-keys/' + id, { method: 'DELETE' })
      .then(() => {
        this.setState(prev => ({ keys: prev.keys.filter(k => k.id !== id) }))
      })
      .catch(() => {})
  }

  handlePreviewExport() {
    this.setState({ previewLoading: true, previewError: null })
    fetchWithAuth('/api/v1/legacy/export/csv')
      .then(text => this.setState({ previewLoading: false, previewText: typeof text === 'string' ? text : JSON.stringify(text) }))
      .catch(err => this.setState({ previewLoading: false, previewError: err.message }))
  }

  scopeBadge(scope) {
    if (scope === 'write') return <Badge tone="warning">{scope}</Badge>
    if (scope === 'admin') return <Badge tone="danger">{scope}</Badge>
    return <Badge tone="info">{scope}</Badge>
  }

  render() {
    const { keys, loading, newLabel, previewLoading, previewText, previewError } = this.state
    if (loading) return <div className="dc-loading">Loading API keys…</div>

    return (
      <div>
        <div className="dc-settings-section">
          <h2>API keys</h2>
          <p className="dc-help-line">
            Use API keys to access DataCats data programmatically. Need help? Email{' '}
            <a href={'mailto:' + SUPPORT_EMAIL}>{SUPPORT_EMAIL}</a>.
          </p>

          <form onSubmit={this.handleCreate} style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
            <input
              type="text"
              className="form-control"
              placeholder="Label (e.g. CI/CD)"
              value={newLabel}
              onChange={e => this.setState({ newLabel: e.target.value })}
            />
            <button type="submit" className="btn btn-primary">Create key</button>
          </form>

          {keys.length === 0 ? (
            <div className="dc-help-line">No API keys yet.</div>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>Label</th>
                  <th>Scopes</th>
                  <th>Last used</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {keys.map(k => (
                  <tr key={k.id}>
                    <td>
                      <div style={{ fontWeight: 600 }}>{k.label}</div>
                      <div style={{ color: '#6b7280', fontSize: 14 }}>{k.id}</div>
                    </td>
                    <td>
                      {(k.scopes || []).map(s => (
                        <span key={s} style={{ marginRight: 4 }}>{this.scopeBadge(s)}</span>
                      ))}
                    </td>
                    <td style={{ fontSize: 14, color: '#6b7280' }}>{k.lastUsed || '—'}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-sm btn-link"
                        onClick={() => this.handleDelete(k.id)}
                        style={{ color: '#b91c1c' }}
                      >
                        Revoke
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="dc-settings-section">
          <h2>Preview export</h2>
          <p className="dc-help-line">Preview a sample of the data your API key will be able to access.</p>
          <button type="button" className="btn btn-outline-secondary" onClick={this.handlePreviewExport} disabled={previewLoading}>
            {previewLoading ? 'Loading preview…' : 'Preview export data'}
          </button>
          {previewError ? (
            <div style={{ color: '#b91c1c', fontSize: 14, marginTop: 8 }}>{previewError}</div>
          ) : null}
          {previewText ? (
            <pre style={{ marginTop: 12, padding: 12, backgroundColor: '#f9fafb', fontSize: 14, overflowX: 'auto' }}>
              {previewText}
            </pre>
          ) : null}
        </div>
      </div>
    )
  }
}

export default ApiKeyManager
