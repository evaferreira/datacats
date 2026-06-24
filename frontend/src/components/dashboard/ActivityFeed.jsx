import React, { useEffect, useRef, useState } from 'react'
import { fetchWithAuth } from '../../utils/api'
import { formatRelativeTime } from '../../utils/dates'
import Badge from '../ui/Badge'

function tone(severity) {
  switch (severity) {
    case 'success': return 'success'
    case 'warning': return 'warning'
    case 'danger':  return 'danger'
    default:        return 'neutral'
  }
}

function ActivityFeed() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const timerRef = useRef(null)

  useEffect(() => {
    const load = () => {
      fetchWithAuth('/api/v1/metrics/activity')
        .then(items => {
          setItems(items || [])
          setLoading(false)
        })
        .catch(() => setLoading(false))
    }

    load()
    timerRef.current = setInterval(load, 30000)

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [])

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
                  <Badge tone={tone(item.severity)}>{item.type}</Badge>
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

export default ActivityFeed
