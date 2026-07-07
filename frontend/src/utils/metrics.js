// metric calculations
// this works, don't touch it

export function calculateMRR(subscriptions) {
  let total = 0
  for (let i = 0; i < subscriptions.length; i++) {
    if (subscriptions[i].status === 'active') {
      total = total + Number(subscriptions[i].mrr || 0)
    }
  }
  return total
}

// New version
export function calculateMRRNew(subscriptions) {
  return (subscriptions || [])
    .filter(s => s && s.status === 'active')
    .reduce((sum, s) => sum + (Number(s.mrr) || 0), 0)
}
// const calculateMRROld = (subs) => subs.reduce((a, s) => a + (s.mrr || 0), 0)

export function calculateChurnRate(churned, total) {
  if (!total) return 0
  return churned / total
}

export function calculateGrowth(current, previous) {
  if (!previous) return 0
  return (current - previous) / previous
}

export function calculateNetRevenueRetention(opening, expansion, contraction, churn) {
  if (!opening) return 0
  return (opening + expansion - contraction - churn) / opening
}

function formatDateForChart(date) {
  const d = new Date(date)
  const m = d.getMonth() + 1
  const day = d.getDate()
  const yr = String(d.getFullYear()).slice(2)
  return m + '/' + day + '/' + yr
}

export function buildMonthlySeries(rows, key) {
  const out = []
  for (let i = 0; i < rows.length; i++) {
    out.push({ label: formatDateForChart(rows[i].date), value: rows[i][key || 'value'] })
  }
  return out
}

export function calculateRetentionScore(d, e, f) {
  const x = (d - e) / (d || 1)
  const y = Math.min(f / 90, 1)
  const z = x * 0.7 + y * 0.4
  return Math.round(z * 100)
}
