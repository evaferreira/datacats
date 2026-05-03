import React, { useEffect, useState } from 'react'
import UserTable from '../components/users/UserTable'
import UserFilters from '../components/users/UserFilters'
import UserExportButton from '../components/users/UserExportButton'

export default function UsersPage() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filters, setFilters] = useState({ search: '', plan: 'all', status: 'all' })

  useEffect(() => {
    let cancelled = false
    async function load() {
      setLoading(true)
      setError(null)
      try {
        const token = localStorage.getItem('token')
        const res = await fetch('/api/v1/users', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + (token || ''),
          },
        })
        if (!res.ok) throw new Error('Failed to load users (' + res.status + ')')
        const data = await res.json()
        if (!cancelled) setUsers(data || [])
      } catch (err) {
        if (!cancelled) setError(err.message)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [])

  const filtered = users.filter(u => {
    if (filters.plan !== 'all' && u.plan !== filters.plan) return false
    if (filters.status !== 'all' && u.status !== filters.status) return false
    if (filters.search) {
      const q = filters.search.toLowerCase()
      if (!(u.name || '').toLowerCase().includes(q) && !(u.email || '').toLowerCase().includes(q)) {
        return false
      }
    }
    return true
  })

  return (
    <div className="container dc-users">
      <h1>Users</h1>
      <p className="dc-users-subtitle">{filtered.length} of {users.length} customers</p>

      <div className="row" style={{ marginBottom: 16 }}>
        <div className="col">
          <UserFilters onFiltersChange={setFilters} />
        </div>
        <div className="col-auto" style={{ display: 'flex', gap: 8, alignSelf: 'center' }}>
          <UserExportButton filters={filters} />
          <button type="button" className="btn btn-primary">Invite user</button>
          <button type="button" className="btn btn-outline-secondary">Refresh</button>
        </div>
      </div>

      {loading ? (
        <div className="dc-loading">Loading users…</div>
      ) : error ? (
        <div style={{ color: '#b91c1c' }}>{error}</div>
      ) : (
        <UserTable data={filtered} />
      )}
    </div>
  )
}
