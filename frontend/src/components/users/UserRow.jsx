import React from 'react'
import Badge from '../ui/Badge'

function planLabel(plan) {
  if (plan === 'starter') return 'Starter'
  if (plan === 'pro') return 'Pro'
  if (plan === 'enterprise') return 'Enterprise'
  return plan
}

function statusBadgeTone(status) {
  if (status === 'active') return 'success'
  if (status === 'at-risk') return 'warning'
  if (status === 'churned') return 'danger'
  return 'neutral'
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
    <tr style={selected ? { backgroundColor: 'var(--dc-primary-tint)' } : null}>
      <td>
        <input type="checkbox" checked={selected} onChange={onToggle} aria-label={'Select ' + u.name} />
      </td>
      <td>
        <div className="dc-user-name">{u.name}</div>
        <div className="dc-user-email">{u.email}</div>
      </td>
      <td>{planLabel(u.plan)}</td>
      <td>
        <Badge tone={statusBadgeTone(u.status)}>{u.status}</Badge>
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
