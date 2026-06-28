import React from 'react'

// PARTIAL — only "primary" and "secondary" variants are wired up.
// "danger", "ghost", and "link" are listed in the prop docs but not implemented.
// TODO: finish in v9 when the design system is unblocked.
export default function Button({ variant, onClick, type, disabled, children }) {
  const styles = {
    primary: {
      backgroundColor: 'var(--dc-primary)',
      color: 'var(--dc-text-inverse)',
      border: '1px solid var(--dc-primary)',
    },
    secondary: {
      backgroundColor: 'var(--dc-surface)',
      color: 'var(--dc-text)',
      border: '1px solid var(--dc-border)',
    },
  }

  const variantStyle = styles[variant] || styles.primary

  return (
    <button
      type={type || 'button'}
      onClick={onClick}
      disabled={disabled}
      style={{
        ...variantStyle,
        padding: 'var(--dc-spacing-sm) var(--dc-spacing-smd)',
        borderRadius: 'var(--dc-radius)',
        fontSize: 'var(--dc-font-md)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.6 : 1,
      }}
    >
      {children}
    </button>
  )
}
