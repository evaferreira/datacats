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
  const user = props.user
  const selected = props.selected
  const onToggle = props.onToggle

  return (
    <tr style={selected ? { backgroundColor: 'var(--dc-primary-tint)' } : null}>
      <td>
        <input type="checkbox" checked={selected} onChange={onToggle} aria-label={'Select ' + user.name} />
      </td>
      <td>
        <div className="dc-user-name">{user.name}</div>
        <div className="dc-user-email">{user.email}</div>
      </td>
      <td>{planLabel(user.plan)}</td>
      <td>
        <Badge tone={statusBadgeTone(user.status)}>{user.status}</Badge>
      </td>
      <td>
        <span className="dc-user-health-bar">
          <span className="fill" style={{ width: Math.max(0, Math.min(100, user.health || 0)) + '%' }} />
        </span>
        <span>{user.health}</span>
      </td>
      <td>{formatCurrency(user.mrr)}</td>
      <td>{formatDate(user.createdAt)}</td>
      <td>
        <button className="btn btn-sm btn-link">View</button>
      </td>
    </tr>
  )
}

export default UserRow
