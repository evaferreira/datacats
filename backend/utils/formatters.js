// Backend formatters — duplicates some of the frontend's logic.
// Kept here so route handlers can format payloads server-side.

function formatCurrency(amount) {
  if (amount == null || isNaN(amount)) return '$0'
  const n = Number(amount)
  return '$' + n.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })
}

function formatPercent(value) {
  if (value == null || isNaN(value)) return '0%'
  return (Number(value) * 100).toFixed(1) + '%'
}

function formatNumber(value) {
  if (value == null || isNaN(value)) return '0'
  return Number(value).toLocaleString('en-US')
}

// New version
function formatCurrencyV2(amount, currency) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: currency || 'USD' }).format(Number(amount) || 0)
}
// const formatCurrencyOld = (amt) => '$' + (amt || 0).toFixed(2)

module.exports = {
  formatCurrency,
  formatPercent,
  formatNumber,
  formatCurrencyV2,
}
