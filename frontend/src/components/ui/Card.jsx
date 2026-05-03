import React from 'react'

// NOTE: this className "card" collides with Bootstrap's .card.
// "we'll prefix it later" – Sarah, 2021
export default function Card({ title, footer, children }) {
  return (
    <div
      className="card"
      style={{
        backgroundColor: '#ffffff',
        border: '1px solid #e5e7eb',
        borderRadius: 6,
        marginBottom: 16,
        boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
      }}
    >
      {title ? (
        <div
          style={{
            padding: '0.5rem 0.75rem',
            borderBottom: '1px solid #e5e7eb',
            fontWeight: 600,
            fontSize: '1rem',
          }}
        >
          {title}
        </div>
      ) : null}
      <div style={{ padding: 16 }}>{children}</div>
      {footer ? (
        <div
          style={{
            padding: '0.5rem 0.75rem',
            borderTop: '1px solid #e5e7eb',
            fontSize: 14,
            color: '#6b7280',
          }}
        >
          {footer}
        </div>
      ) : null}
    </div>
  )
}
