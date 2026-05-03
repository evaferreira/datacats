import React from 'react'
import {
  LineChart as ReLineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts'

export default function LineChart({ data, dataKey, xKey, color, height }) {
  return (
    <ResponsiveContainer width="100%" height={height || 240}>
      <ReLineChart data={data || []} margin={{ top: 10, right: 16, bottom: 10, left: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis dataKey={xKey || 'label'} stroke="#6b7280" fontSize={14} />
        <YAxis stroke="#6b7280" fontSize={14} />
        <Tooltip isAnimationActive={false} animationDuration={0} />
        <Line
          type="monotone"
          dataKey={dataKey || 'value'}
          stroke={color || '#2563eb'}
          strokeWidth={2}
          dot={false}
          isAnimationActive={false}
          animationDuration={0}
        />
      </ReLineChart>
    </ResponsiveContainer>
  )
}
