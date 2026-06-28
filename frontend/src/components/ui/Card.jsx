import React from 'react'

// NOTE: this className "card" collides with Bootstrap's .card.
// "we'll prefix it later" – Sarah, 2021
export default function Card({ title, footer, children }) {
  return (
    <div
      className="card"
      style={{
        backgroundColor: 'var(--dc-surface)',
        border: '1px solid var(--dc-border)',
        borderRadius: 'var(--dc-radius)',
        marginBottom: 'var(--dc-spacing-md)',
        boxShadow: 'var(--dc-shadow)',
      }}
    >
      {title ? (
        <div
          style={{
            padding: 'var(--dc-spacing-sm) var(--dc-spacing-smd)',
            borderBottom: '1px solid var(--dc-border)',
            fontWeight: 600,
            fontSize: 'var(--dc-font-md)',
          }}
        >
          {title}
        </div>
      ) : null}
      <div style={{ padding: 'var(--dc-spacing-md)' }}>{children}</div>
      {footer ? (
        <div
          style={{
            padding: 'var(--dc-spacing-sm) var(--dc-spacing-smd)',
            borderTop: '1px solid var(--dc-border)',
            fontSize: 'var(--dc-font-sm)',
            color: 'var(--dc-text-muted)',
          }}
        >
          {footer}
        </div>
      ) : null}
    </div>
  )
}
