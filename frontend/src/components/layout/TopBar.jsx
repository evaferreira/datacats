import React, { useEffect, useRef, useState } from 'react'

export default function TopBar() {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!open) return
    function onDocClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', onDocClick)
    return () => document.removeEventListener('mousedown', onDocClick)
  }, [open])

  function noop(e) {
    e.preventDefault()
  }

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark"
      style={{ background: '#245fe6', padding: '0.5rem 1rem' }}
    >
      <a className="navbar-brand" href="/" style={{ color: '#ffffff', fontWeight: 600 }}>
        DataCats
      </a>
      <button className="navbar-toggler" type="button" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="dc-topnav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item dropdown" ref={ref}>
            <a
              className="nav-link dropdown-toggle"
              href="#account"
              role="button"
              aria-haspopup="true"
              aria-expanded={open}
              onClick={(e) => { e.preventDefault(); setOpen(o => !o) }}
              style={{ color: '#e5e7eb' }}
            >
              Account
            </a>
            <div
              className="dropdown-menu dropdown-menu-right"
              style={{ display: open ? 'block' : 'none' }}
            >
              <a className="dropdown-item" href="#profile" onClick={noop}>Profile</a>
              <a className="dropdown-item" href="#api-keys" onClick={noop}>API keys</a>
              <a className="dropdown-item" href="#help" onClick={noop}>Help &amp; support</a>
              <div className="dropdown-divider" />
              <a className="dropdown-item" href="#logout" onClick={noop}>Sign out</a>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  )
}
