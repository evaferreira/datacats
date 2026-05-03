import React from 'react'
import {
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts'

export default function BarChart({ data, dataKey, xKey, color, height }) {
  return (
    <ResponsiveContainer width="100%" height={height || 240}>
      <ReBarChart data={data || []} margin={{ top: 10, right: 16, bottom: 10, left: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis dataKey={xKey || 'label'} stroke="#6b7280" fontSize={14} />
        <YAxis stroke="#6b7280" fontSize={14} />
        <Tooltip isAnimationActive={false} animationDuration={0} />
        <Bar dataKey={dataKey || 'value'} fill={color || '#2563eb'} isAnimationActive={false} animationDuration={0} />
      </ReBarChart>
    </ResponsiveContainer>
  )
}
