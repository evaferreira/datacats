import React from 'react'
import { fetchWithAuth } from '../../utils/api'
import { formatRelativeTime } from '../../utils/dates'

class ActivityFeed extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [],
      loading: true,
    }
  }

  componentDidMount() {
    this.load()
    this.timer = setInterval(() => this.load(), 30000)
  }

  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer)
    }
  }

  load() {
    fetchWithAuth('/api/v1/metrics/activity')
      .then(items => this.setState({ items: items || [], loading: false }))
      .catch(() => this.setState({ loading: false }))
  }

  toneClass(severity) {
    switch (severity) {
      case 'success': return 'badge badge-pill badge-success'
      case 'warning': return 'badge badge-pill badge-warning'
      case 'danger':  return 'badge badge-pill badge-danger'
      default:        return 'badge badge-pill badge-secondary'
    }
  }

  render() {
    const { items, loading } = this.state

    return (
      <div className="card">
        <div className="card-header">Activity</div>
        <ul className="list-group list-group-flush">
          {loading ? (
            <li className="list-group-item dc-loading">Loading…</li>
          ) : items.length === 0 ? (
            <li className="list-group-item text-muted">Nothing recent</li>
          ) : (
            items.map(item => (
              <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                <span>
                  <span className={this.toneClass(item.severity)} style={{ marginRight: 8 }}>
                    {item.type}
                  </span>
                  {item.message}
                </span>
                <span style={{ color: '#6b7280', fontSize: 14 }}>{formatRelativeTime(item.at)}</span>
              </li>
            ))
          )}
        </ul>
      </div>
    )
  }
}

export default ActivityFeed
