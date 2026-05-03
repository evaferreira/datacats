import React from 'react'

function planLabel(plan) {
  if (plan === 'starter') return 'Starter'
  if (plan === 'pro') return 'Pro'
  if (plan === 'enterprise') return 'Enterprise'
  return plan
}

function statusBadgeClass(status) {
  if (status === 'active') return 'badge badge-success'
  if (status === 'at-risk') return 'badge badge-warning'
  if (status === 'churned') return 'badge badge-danger'
  return 'badge badge-secondary'
}

function formatCurrency(amount) {
  if (amount == null) return '$0'
  return '$' + Number(amount).toLocaleString('en-US')
}

function formatDate(d) {
  return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function UserRow(props) {
  const u = props.user
  const selected = props.selected
  const onToggle = props.onToggle

  return (
    <tr style={selected ? { backgroundColor: '#f0f7ff' } : null}>
      <td>
        <input type="checkbox" checked={selected} onChange={onToggle} aria-label={'Select ' + u.name} />
      </td>
      <td>
        <div className="dc-user-name">{u.name}</div>
        <div className="dc-user-email">{u.email}</div>
      </td>
      <td>{planLabel(u.plan)}</td>
      <td>
        <span className={statusBadgeClass(u.status)}>{u.status}</span>
      </td>
      <td>
        <span className="dc-user-health-bar">
          <span className="fill" style={{ width: Math.max(0, Math.min(100, u.health || 0)) + '%' }} />
        </span>
        <span>{u.health}</span>
      </td>
      <td>{formatCurrency(u.mrr)}</td>
      <td>{formatDate(u.createdAt)}</td>
      <td>
        <button className="btn btn-sm btn-link">View</button>
      </td>
    </tr>
  )
}

export default UserRow
