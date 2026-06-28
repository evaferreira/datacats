import React from 'react'
import { fetchWithAuth } from '../../utils/apiHelpers'

class TeamSettings extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      team: [],
      loading: true,
      inviteEmail: '',
      inviteRole: 'viewer',
      inviteName: '',
      inviteSubmitting: false,
      inviteError: null,
      removeModalFor: null,
      removeSubmitting: false,
      message: null,
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleInvite = this.handleInvite.bind(this)
    this.openRemoveModal = this.openRemoveModal.bind(this)
    this.closeRemoveModal = this.closeRemoveModal.bind(this)
    this.handleConfirmRemove = this.handleConfirmRemove.bind(this)
  }

  componentDidMount() {
    this.loadTeam()
  }

  loadTeam() {
    this.setState({ loading: true })
    fetchWithAuth('/settings/team')
      .then(data => this.setState({ team: data.team || [], loading: false }))
      .catch(() => this.setState({ loading: false }))
  }

  handleInputChange(field) {
    return e => this.setState({ [field]: e.target.value })
  }

  handleInvite(e) {
    e.preventDefault()
    if (!this.state.inviteEmail) {
      this.setState({ inviteError: 'Email required' })
      return
    }
    this.setState({ inviteSubmitting: true, inviteError: null })
    fetchWithAuth('/settings/team', {
      method: 'POST',
      body: { email: this.state.inviteEmail, name: this.state.inviteName, role: this.state.inviteRole },
    })
      .then(member => {
        this.setState(prev => ({
          team: [...prev.team, member],
          inviteEmail: '',
          inviteName: '',
          inviteRole: 'viewer',
          inviteSubmitting: false,
          message: 'Invitation sent to ' + member.email,
        }))
      })
      .catch(err => {
        this.setState({ inviteSubmitting: false, inviteError: err.message || 'Failed to invite' })
      })
  }

  openRemoveModal(member) {
    this.setState({ removeModalFor: member })
  }

  closeRemoveModal() {
    this.setState({ removeModalFor: null })
  }

  handleConfirmRemove() {
    const member = this.state.removeModalFor
    if (!member) return
    this.setState({ removeSubmitting: true })
    fetchWithAuth('/settings/team/' + member.id, { method: 'DELETE' })
      .then(() => {
        this.setState(prev => ({
          team: prev.team.filter(m => m.id !== member.id),
          removeSubmitting: false,
          removeModalFor: null,
          message: 'Removed ' + member.name,
        }))
      })
      .catch(() => {
        this.setState({ removeSubmitting: false })
      })
  }

  roleLabel(role) {
    if (role === 'admin') return 'Admin'
    if (role === 'editor') return 'Editor'
    if (role === 'viewer') return 'Viewer'
    return role
  }

  formatInvitedAt(d) {
    return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  render() {
    const { team, loading, inviteEmail, inviteRole, inviteName, inviteSubmitting, inviteError, removeModalFor, removeSubmitting, message } = this.state

    if (loading) return <div className="dc-loading">Loading team…</div>

    return (
      <div>
        <div className="dc-settings-section">
          <h2>Invite a teammate</h2>
          <p className="dc-help-line">Invite team members to view or edit DataCats data.</p>
          <form onSubmit={this.handleInvite}>
            <div className="form-group">
              <label htmlFor="invite-email" style={{ fontSize: 'var(--dc-font-sm)', color: 'var(--dc-text-muted)' }}>Email</label>
              <input
                id="invite-email"
                type="email"
                className="form-control"
                placeholder="teammate@company.com"
                value={inviteEmail}
                onChange={this.handleInputChange('inviteEmail')}
              />
            </div>
            <div className="form-group">
              <label htmlFor="invite-name" style={{ fontSize: 'var(--dc-font-sm)', color: 'var(--dc-text-muted)' }}>Name (optional)</label>
              <input
                id="invite-name"
                type="text"
                className="form-control"
                placeholder="Jane Smith"
                value={inviteName}
                onChange={this.handleInputChange('inviteName')}
              />
            </div>
            <div className="form-group">
              <label htmlFor="invite-role" style={{ fontSize: 'var(--dc-font-sm)', color: 'var(--dc-text-muted)' }}>Role</label>
              <select
                id="invite-role"
                className="form-control"
                value={inviteRole}
                onChange={this.handleInputChange('inviteRole')}
              >
                <option value="viewer">Viewer — read-only</option>
                <option value="editor">Editor — can change settings</option>
                <option value="admin">Admin — full access</option>
              </select>
            </div>
            {inviteError ? (
              <div className="form-group" style={{ color: 'var(--dc-danger)', fontSize: 'var(--dc-font-sm)' }}>{inviteError}</div>
            ) : null}
            <button type="submit" className="btn btn-primary" disabled={inviteSubmitting}>
              {inviteSubmitting ? 'Sending…' : 'Send invitation'}
            </button>
          </form>
        </div>

        <div className="dc-settings-section">
          <h2>Current team</h2>
          {message ? (
            <div style={{ fontSize: 'var(--dc-font-sm)', color: 'var(--dc-success)', marginBottom: 'var(--dc-spacing-sm)' }}>{message}</div>
          ) : null}
          {team.length === 0 ? (
            <div className="dc-help-line">No teammates yet.</div>
          ) : (
            team.map(member => (
              <div className="dc-team-row" key={member.id}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600 }}>{member.name}</div>
                  <div style={{ color: 'var(--dc-text-muted)' }}>{member.email}</div>
                </div>
                <div style={{ width: 100 }}>{this.roleLabel(member.role)}</div>
                <div style={{ width: 140, color: 'var(--dc-text-muted)' }}>
                  Joined {this.formatInvitedAt(member.invitedAt)}
                </div>
                <div>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => this.openRemoveModal(member)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {removeModalFor ? (
          <div
            className="modal"
            style={{ display: 'block', backgroundColor: 'var(--dc-overlay)', position: 'fixed', inset: 0 }}
            onClick={this.closeRemoveModal}
          >
            <div
              className="modal-dialog"
              style={{ background: 'var(--dc-surface)', maxWidth: 420, margin: '10vh auto', borderRadius: 'var(--dc-radius)' }}
              onClick={e => e.stopPropagation()}
            >
              <div style={{ padding: 'var(--dc-spacing-md)', borderBottom: '1px solid var(--dc-border)' }}>
                <strong>Remove {removeModalFor.name}?</strong>
              </div>
              <div style={{ padding: 'var(--dc-spacing-md)', fontSize: 'var(--dc-font-sm)', color: 'var(--dc-text-muted)' }}>
                They will lose access to DataCats immediately.
              </div>
              <div style={{ padding: 'var(--dc-spacing-md)', display: 'flex', gap: 'var(--dc-spacing-sm)', justifyContent: 'flex-end', borderTop: '1px solid var(--dc-border)' }}>
                <button type="button" className="btn btn-secondary" onClick={this.closeRemoveModal}>
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={this.handleConfirmRemove}
                  disabled={removeSubmitting}
                >
                  {removeSubmitting ? 'Removing…' : 'Confirm remove'}
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    )
  }
}

export default TeamSettings
