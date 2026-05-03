import React from 'react'

// PARTIAL — only "primary" and "secondary" variants are wired up.
// "danger", "ghost", and "link" are listed in the prop docs but not implemented.
// TODO: finish in v9 when the design system is unblocked.
export default function Button({ variant, onClick, type, disabled, children }) {
  const styles = {
    primary: {
      backgroundColor: '#2563eb',
      color: '#ffffff',
      border: '1px solid #2563eb',
    },
    secondary: {
      backgroundColor: '#ffffff',
      color: '#111827',
      border: '1px solid #e5e7eb',
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
        padding: '0.5rem 0.75rem',
        borderRadius: 6,
        fontSize: '1rem',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.6 : 1,
      }}
    >
      {children}
    </button>
  )
}
