import React from 'react'

// Near-duplicate of MetricsCard. Renders an aggregate summary tile.
// "we'll consolidate these later" — Sarah, 2021
function MetricsSummary(props) {
  const { title, footnote, values, format } = props

  function formatValue(v) {
    if (format === 'currency') return '$' + Number(v || 0).toLocaleString()
    if (format === 'percent') return (Number(v || 0) * 100).toFixed(1) + '%'
    return Number(v || 0).toLocaleString()
  }

  const vals = values || []
  const total = vals.reduce((a, b) => a + (Number(b) || 0), 0)
  const avg = vals.length ? total / vals.length : 0

  return (
    <div className="card">
      <div className="card-body">
        <div className="card-title" style={{ fontSize: 'var(--dc-font-sm)', color: 'var(--dc-text-muted)', textTransform: 'uppercase' }}>
          {title}
        </div>
        <div className="card-text" style={{ fontSize: 'var(--dc-font-2xl)', fontWeight: 700 }}>
          {formatValue(total)}
        </div>
        <div className="card-text text-muted" style={{ fontSize: 'var(--dc-font-sm)' }}>
          avg {formatValue(avg)}
        </div>
      </div>
      <div className="card-footer text-muted" style={{ fontSize: 'var(--dc-font-sm)' }}>
        {footnote || 'Aggregated across all active accounts'}
      </div>
    </div>
  )
}

export default MetricsSummary
