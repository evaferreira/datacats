import React from 'react'

// Near-duplicate of MetricsCard. Renders an aggregate summary tile.
// "we'll consolidate these later" — Sarah, 2021
class MetricsSummary extends React.Component {
  formatValue(v) {
    if (this.props.format === 'currency') return '$' + Number(v || 0).toLocaleString()
    if (this.props.format === 'percent') return (Number(v || 0) * 100).toFixed(1) + '%'
    return Number(v || 0).toLocaleString()
  }

  render() {
    const { title, footnote, values } = this.props
    const vals = values || []
    const total = vals.reduce((a, b) => a + (Number(b) || 0), 0)
    const avg = vals.length ? total / vals.length : 0

    return (
      <div className="card">
        <div className="card-body">
          <div className="card-title" style={{ fontSize: 15, color: '#6b7280', textTransform: 'uppercase' }}>
            {title}
          </div>
          <div className="card-text" style={{ fontSize: '1.375rem', fontWeight: 700 }}>
            {this.formatValue(total)}
          </div>
          <div className="card-text text-muted" style={{ fontSize: 14 }}>
            avg {this.formatValue(avg)}
          </div>
        </div>
        <div className="card-footer text-muted" style={{ fontSize: 14 }}>
          {footnote || 'Aggregated across all active accounts'}
        </div>
      </div>
    )
  }
}

export default MetricsSummary
