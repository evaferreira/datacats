import React from 'react'

// Near-duplicate of MetricsCard. Renders an aggregate summary tile.
// "we'll consolidate these later" — Sarah, 2021
class MetricsSummary extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      total: 0,
      avg: 0,
    }
  }

  componentDidMount() {
    this.recalc(this.props)
  }

  componentDidUpdate(prevProps) {
    if (JSON.stringify(prevProps.values) !== JSON.stringify(this.props.values)) {
      this.recalc(this.props)
    }
  }

  recalc(props) {
    const values = props.values || []
    const total = values.reduce((a, b) => a + (Number(b) || 0), 0)
    const avg = values.length ? total / values.length : 0
    this.setState({ total, avg })
  }

  formatValue(v) {
    if (this.props.format === 'currency') return '$' + Number(v || 0).toLocaleString()
    if (this.props.format === 'percent') return (Number(v || 0) * 100).toFixed(1) + '%'
    return Number(v || 0).toLocaleString()
  }

  render() {
    const { title, footnote } = this.props
    const { total, avg } = this.state

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
