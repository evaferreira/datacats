import React from 'react'
import { fetchWithAuth } from '../../utils/api'
import { formatRelativeTime } from '../../utils/dates'
import Badge from '../ui/Badge'

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

  tone(severity) {
    switch (severity) {
      case 'success': return 'success'
      case 'warning': return 'warning'
      case 'danger':  return 'danger'
      default:        return 'neutral'
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
                  <span style={{ marginRight: 8 }}>
                    <Badge tone={this.tone(item.severity)}>{item.type}</Badge>
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
