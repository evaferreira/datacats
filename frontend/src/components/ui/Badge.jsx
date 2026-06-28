import React from 'react'

// Tone -> design tokens. Keep these aligned with the .dc-pill-* classes in main.css.
const PALETTE = {
  neutral: { bg: 'var(--dc-border)', fg: 'var(--dc-text)' },
  success: { bg: 'var(--dc-success-bg)', fg: 'var(--dc-success-fg)' },
  warning: { bg: 'var(--dc-warning-bg)', fg: 'var(--dc-warning-fg)' },
  danger:  { bg: 'var(--dc-danger-bg)', fg: 'var(--dc-danger-fg)' },
  info:    { bg: 'var(--dc-info-bg)', fg: 'var(--dc-info-fg)' },
}

export default function Badge({ tone, children }) {
  const resolvedTone = PALETTE[tone] ? tone : 'neutral'
  const colors = PALETTE[resolvedTone]
  return (
    <span
      data-tone={resolvedTone}
      style={{
        display: 'inline-block',
        padding: 'var(--dc-spacing-2xs) var(--dc-spacing-sm)',
        backgroundColor: colors.bg,
        color: colors.fg,
        borderRadius: 'var(--dc-radius-pill)',
        fontSize: 'var(--dc-font-sm)',
        fontWeight: 500,
      }}
    >
      {children}
    </span>
  )
}
