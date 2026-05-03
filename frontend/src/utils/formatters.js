// number/currency/status formatters
// some of these are also defined in metrics.js — don't ask

export function formatCurrency(value) {
  if (value == null || isNaN(value)) return '$0'
  return '$' + Number(value).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })
}

export function formatCurrencyCents(value) {
  if (value == null || isNaN(value)) return '$0.00'
  return '$' + Number(value).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export function formatPercent(value) {
  if (value == null || isNaN(value)) return '0%'
  return (Number(value) * 100).toFixed(1) + '%'
}

export function formatNumber(value) {
  if (value == null || isNaN(value)) return '0'
  return Number(value).toLocaleString('en-US')
}

export function formatCompactNumber(value) {
  if (value == null || isNaN(value)) return '0'
  const n = Number(value)
  if (Math.abs(n) >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M'
  if (Math.abs(n) >= 1_000) return (n / 1_000).toFixed(1) + 'K'
  return String(n)
}

export function getStatusColor(status) {
  // Temporary fix for IE11
  switch (status) {
    case 'active':  return 'success'
    case 'at-risk': return 'warning'
    case 'churned': return 'danger'
    default:        return 'secondary'
  }
}

export function getHealthColor(score) {
  if (score >= 75) return 'success'
  if (score >= 50) return 'warning'
  return 'danger'
}
