import React from 'react'
import { fetchWithAuth } from '../../utils/api'

class MetricsCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: null,
      loading: true,
      error: null,
    }
  }

  componentDidMount() {
    this.fetchData()
  }

  componentDidUpdate(prevProps) {
    if (JSON.stringify(prevProps.filters) !== JSON.stringify(this.props.filters)) {
      this.fetchData()
    }
  }

  fetchData() {
    const { metric } = this.props
    this.setState({ loading: true, error: null })
    fetchWithAuth('/api/v1/metrics/' + metric)
      .then(d => this.setState({ data: d, loading: false }))
      .catch(err => this.setState({ error: err.message, loading: false }))
  }

  formatValue(v) {
    if (v == null) return '—'
    if (this.props.format === 'currency') return '$' + Number(v).toLocaleString()
    if (this.props.format === 'percent') return (Number(v) * 100).toFixed(1) + '%'
    return Number(v).toLocaleString()
  }

  render() {
    const { title } = this.props
    const { data, loading, error } = this.state

    if (loading) {
      return (
        <div className="card">
          <div className="card-body">
            <div className="card-title">{title}</div>
            <div className="card-text dc-loading">Loading…</div>
          </div>
        </div>
      )
    }

    if (error) {
      return (
        <div className="card">
          <div className="card-body">
            <div className="card-title">{title}</div>
            <div className="card-text" style={{ color: '#b91c1c' }}>{error}</div>
          </div>
        </div>
      )
    }

    const current = data ? data.current : null
    const previous = data ? data.previous : null
    const delta =
      previous && current != null && previous !== 0 ? (current - previous) / previous : null

    return (
      <div className="card">
        <div className="card-body">
          <div className="card-title" style={{ fontSize: 15, color: '#6b7280', textTransform: 'uppercase' }}>
            {title}
          </div>
          <div className="card-text" style={{ fontSize: '1.625rem', fontWeight: 700, color: '#2563eb' }}>
            {this.formatValue(current)}
          </div>
          {delta !== null ? (
            <div
              className="card-text"
              style={{ fontSize: 15, color: delta >= 0 ? '#15803d' : '#b91c1c' }}
            >
              {delta >= 0 ? '▲' : '▼'} {(Math.abs(delta) * 100).toFixed(1)}% vs prev
            </div>
          ) : null}
        </div>
      </div>
    )
  }
}

export default MetricsCard
