import React, { useState, useEffect, useRef } from 'react'
import { fetchWithAuth } from '../../utils/api'

function MetricsCard(props) {
  const { metric, filters, title, format } = props

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  function fetchData() {
    setLoading(true)
    setError(null)
    fetchWithAuth('/api/v1/metrics/' + metric)
      .then(d => { setData(d); setLoading(false) })
      .catch(err => { setError(err.message); setLoading(false) })
  }

  function formatValue(v) {
    if (v == null) return '—'
    if (format === 'currency') return '$' + Number(v).toLocaleString()
    if (format === 'percent') return (Number(v) * 100).toFixed(1) + '%'
    return Number(v).toLocaleString()
  }

  useEffect(() => {
    fetchData()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const prevFiltersRef = useRef(filters)
  useEffect(() => {
    if (JSON.stringify(prevFiltersRef.current) !== JSON.stringify(filters)) {
      fetchData()
    }
    prevFiltersRef.current = filters
  })

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
          {formatValue(current)}
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

export default MetricsCard
