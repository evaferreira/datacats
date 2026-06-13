import React, { useEffect, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { fetchWithAuth } from '../../utils/apiHelpers'

function RevenueChart({ dateRange }) {
  const [series, setSeries] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchWithAuth('/metrics/mrr')
      .then(data => {
        const series = (data.history || []).map(p => ({ label: p.date, value: p.value }))
        setSeries(series)
        setLoading(false)
      })
      .catch(() => {
        setSeries([])
        setLoading(false)
      })
  }, [dateRange])

  return (
    <div className="card">
      <div className="card-header">Monthly Recurring Revenue</div>
      <div className="card-body" style={{ height: 280 }}>
        {loading ? (
          <div className="dc-loading">Loading chart…</div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={series}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="label" stroke="#6b7280" fontSize={14} />
              <YAxis stroke="#6b7280" fontSize={14} />
              <Tooltip isAnimationActive={false} animationDuration={0} />
              <Line type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={2} dot={false} isAnimationActive={false} animationDuration={0} />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  )
}

export default RevenueChart
