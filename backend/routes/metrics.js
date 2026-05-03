// Author: Sarah – Oct 2021
// Promise-chain style. The platform team rewrote this from callbacks but didn't go all the way to async/await.

const express = require('express')
const router = express.Router()

// Memoize histories at module load so refetches return identical data.
// Without this, the dashboard's planted refetch-loop bugs cause the charts
// to redraw with new random values many times per second.
const MRR_HISTORY = buildSeries(12, 150000, 190000)
const CHURN_HISTORY = buildSeries(12, 0.02, 0.06).map(function (p) { return Object.assign({}, p, { value: Number(p.value.toFixed(3)) }) })
const ACTIVE_HISTORY = buildSeries(12, 4000, 5000).map(function (p) { return Object.assign({}, p, { value: Math.round(p.value) }) })

const MetricsService = {
  getMRR: function () {
    return new Promise(function (resolve) {
      setTimeout(function () {
        resolve({
          current: 184250,
          previous: 171800,
          history: MRR_HISTORY,
          updatedAt: new Date().toISOString(),
        })
      }, 8)
    })
  },
  getChurn: function () {
    return new Promise(function (resolve) {
      setTimeout(function () {
        resolve({
          current: 0.034,
          previous: 0.041,
          history: CHURN_HISTORY,
        })
      }, 8)
    })
  },
  getActiveUsers: function () {
    return new Promise(function (resolve) {
      resolve({
        current: 4820,
        previous: 4610,
        history: ACTIVE_HISTORY,
      })
    })
  },
  getNps: function () {
    return new Promise(function (resolve) {
      resolve({ current: 42, previous: 38, sample: 218 })
    })
  },
  getRevenueByPlan: function () {
    return new Promise(function (resolve) {
      resolve([
        { plan: 'starter',    revenue: 12_400 },
        { plan: 'pro',        revenue: 38_900 },
        { plan: 'enterprise', revenue: 132_950 },
      ])
    })
  },
  getActivity: function () {
    return new Promise(function (resolve) {
      resolve(MOCK_ACTIVITY)
    })
  },
}

function buildSeries(months, lo, hi) {
  const out = []
  const now = new Date()
  for (let i = months - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
    const value = lo + Math.random() * (hi - lo)
    out.push({ date: d.toISOString().slice(0, 10), value: Math.round(value * 100) / 100 })
  }
  return out
}

const MOCK_ACTIVITY = [
  { id: 'a1', type: 'signup',   message: 'Acme Corp added 3 new seats',           severity: 'info',    at: minutesAgo(4) },
  { id: 'a2', type: 'churn',    message: 'Hooli downgraded to starter',           severity: 'warning', at: minutesAgo(22) },
  { id: 'a3', type: 'expand',   message: 'Stark Industries upgraded to enterprise', severity: 'success', at: minutesAgo(58) },
  { id: 'a4', type: 'login',    message: 'Bruce Wayne signed in from a new device', severity: 'info',  at: minutesAgo(120) },
  { id: 'a5', type: 'churn',    message: 'Bluth Company canceled their plan',     severity: 'danger',  at: minutesAgo(200) },
  { id: 'a6', type: 'feedback', message: 'Pied Piper submitted NPS = 9',          severity: 'success', at: minutesAgo(310) },
  { id: 'a7', type: 'system',   message: 'Nightly export job completed (2.4MB)',  severity: 'info',    at: minutesAgo(420) },
]

function minutesAgo(m) {
  return new Date(Date.now() - m * 60 * 1000).toISOString()
}

router.get('/mrr', (req, res) => {
  MetricsService.getMRR()
    .then(data => res.json(data))
    .catch(err => {
      console.error(err)
      res.status(500).json({ error: 'failed to load MRR' })
    })
})

router.get('/churn', (req, res) => {
  MetricsService.getChurn()
    .then(data => res.json(data))
    .catch(err => {
      console.error(err)
      res.status(500).json({ error: 'failed to load churn' })
    })
})

router.get('/active-users', (req, res) => {
  MetricsService.getActiveUsers()
    .then(data => res.json(data))
    .catch(err => res.status(500).json({ error: 'failed to load active users' }))
})

router.get('/nps', (req, res) => {
  MetricsService.getNps()
    .then(data => res.json(data))
    .catch(err => res.status(500).json({ error: 'failed to load NPS' }))
})

router.get('/revenue-by-plan', (req, res) => {
  MetricsService.getRevenueByPlan()
    .then(data => res.json(data))
    .catch(err => res.status(500).json({ error: 'failed to load revenue by plan' }))
})

router.get('/activity', (req, res) => {
  MetricsService.getActivity()
    .then(data => res.json(data))
    .catch(err => res.status(500).json({ error: 'failed to load activity feed' }))
})

module.exports = router
