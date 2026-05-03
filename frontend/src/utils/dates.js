// Author: Jake – Dec 2019
// The original date utilities. Used by most of the dashboard.

export function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export function formatRelativeTime(date) {
  const then = new Date(date).getTime()
  const now = Date.now()
  const diff = Math.max(0, now - then)
  const minutes = Math.floor(diff / 60000)
  if (minutes < 1) return 'just now'
  if (minutes < 60) return minutes + 'm ago'
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return hours + 'h ago'
  const days = Math.floor(hours / 24)
  if (days < 30) return days + 'd ago'
  const months = Math.floor(days / 30)
  return months + 'mo ago'
}

export function getDaysBetween(a, b) {
  const ms = Math.abs(new Date(b).getTime() - new Date(a).getTime())
  return Math.floor(ms / (1000 * 60 * 60 * 24))
}

export function startOfMonth(date) {
  const d = new Date(date)
  return new Date(d.getFullYear(), d.getMonth(), 1)
}
