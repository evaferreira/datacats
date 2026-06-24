import React from 'react'

const PALETTE = {
  neutral: { bg: '#e5e7eb', fg: '#111827' },
  success: { bg: '#d1fae5', fg: '#065f46' },
  warning: { bg: '#fef3c7', fg: '#92400e' },
  danger:  { bg: '#fee2e2', fg: '#991b1b' },
  info:    { bg: '#dbeafe', fg: '#1d4ed8' },
}

export default function Badge({ tone, children }) {
  const resolvedTone = PALETTE[tone] ? tone : 'neutral'
  const colors = PALETTE[resolvedTone]
  return (
    <span
      data-tone={resolvedTone}
      style={{
        display: 'inline-block',
        padding: '2px 8px',
        backgroundColor: colors.bg,
        color: colors.fg,
        borderRadius: 999,
        fontSize: 14,
        fontWeight: 500,
      }}
    >
      {children}
    </span>
  )
}
