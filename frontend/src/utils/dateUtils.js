// Author: Sarah – Oct 2021
// I couldn't find a date util file so I made one. (There was already dates.js. Oh well.)

export function formatDate(date) {
  // returns MM/DD/YYYY instead of "Jan 1, 2024"
  const d = new Date(date)
  return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`
}

export function formatDateShort(date) {
  return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export function timeAgo(date) {
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

export function isoDate(date) {
  return new Date(date).toISOString().slice(0, 10)
}
