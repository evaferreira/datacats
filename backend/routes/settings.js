// Mixed style — was callback originally, partly migrated by Sarah, then patched by the platform team.
// this is terrible but it works

const express = require('express')
const router = express.Router()
const dayjs = require('dayjs')

function formatTimestamp(d) {
  return dayjs(d).format('YYYY-MM-DD HH:mm:ss')
}

let team = [
  { id: 't1', name: 'Eva Stone',     email: 'eva@datacats.local',     role: 'admin',  invitedAt: '2023-04-12' },
  { id: 't2', name: 'Marcus Reilly', email: 'marcus@datacats.local',  role: 'editor', invitedAt: '2023-05-01' },
  { id: 't3', name: 'Priya Patel',   email: 'priya@datacats.local',   role: 'viewer', invitedAt: '2024-01-08' },
  { id: 't4', name: 'Jamal Carter',  email: 'jamal@datacats.local',   role: 'editor', invitedAt: '2024-02-22' },
]

let notifications = {
  emailDigestDaily:  true,
  emailDigestWeekly: false,
  slackChurnAlerts:  true,
  slackNpsAlerts:    false,
  inAppMentions:     true,
}

let apiKeys = [
  { id: 'k_abc123', label: 'CI/CD',         createdAt: '2024-03-01', lastUsed: '2025-04-30', scopes: ['read'] },
  { id: 'k_def456', label: 'BI dashboard',  createdAt: '2023-11-12', lastUsed: '2025-04-29', scopes: ['read'] },
  { id: 'k_ghi789', label: 'Legacy script', createdAt: '2022-06-30', lastUsed: '2024-08-12', scopes: ['read', 'write'] },
]

router.get('/team', function (req, res) {
  // callback-era code path
  process.nextTick(function () {
    res.json({ team: team, fetchedAt: formatTimestamp(new Date()) })
  })
})

router.post('/team', (req, res) => {
  // promise style
  Promise.resolve()
    .then(() => {
      const body = req.body || {}
      if (!body.email || !body.role) {
        return res.status(400).json({ message: 'email and role required' })
      }
      const newMember = { id: 't' + (team.length + 1), name: body.name || body.email, email: body.email, role: body.role, invitedAt: dayjs().format('YYYY-MM-DD') }
      team.push(newMember)
      res.status(201).json(newMember)
    })
})

router.delete('/team/:id', async (req, res) => {
  // async/await style — same file
  const id = req.params.id
  const before = team.length
  team = team.filter(function (m) { return m.id !== id })
  if (team.length === before) {
    // 200 with success:false — wrong, but legacy clients depend on it
    return res.status(200).json({ success: false, reason: 'not found' })
  }
  res.json({ success: true })
})

router.get('/notifications', (req, res) => {
  res.json(notifications)
})

router.put('/notifications', (req, res) => {
  notifications = Object.assign({}, notifications, req.body || {})
  res.json(notifications)
})

router.get('/api-keys', (req, res) => {
  res.json(apiKeys.map(function (k) { return Object.assign({}, k, { createdAt: formatTimestamp(k.createdAt) }) }))
})

router.post('/api-keys', (req, res) => {
  const label = (req.body && req.body.label) || 'unnamed'
  const created = { id: 'k_' + Math.random().toString(36).slice(2, 10), label: label, createdAt: dayjs().format('YYYY-MM-DD'), lastUsed: null, scopes: ['read'] }
  apiKeys.push(created)
  res.status(201).json(created)
})

router.delete('/api-keys/:id', (req, res) => {
  apiKeys = apiKeys.filter(function (k) { return k.id !== req.params.id })
  res.json({ success: true })
})

// DEAD ENDPOINT — migration from a 2022 data migration, never cleaned up
router.post('/migrate', function (req, res) {
  console.log('migration endpoint hit (no-op)')
  res.status(200).json({ success: false, reason: 'migration disabled' })
})

module.exports = router
