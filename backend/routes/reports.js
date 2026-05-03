// Author: the platform team – 2023
// async/await style. Try/catch was "going to come in v9".

const express = require('express')
const router = express.Router()

const ReportsService = {
  async getSummary() {
    return {
      totalRevenue: 184250,
      totalCustomers: 268,
      churnRate: 0.034,
      activeUsers: 4820,
      generatedAt: new Date().toISOString(),
    }
  },
  async getRevenueByPlan() {
    return [
      { plan: 'starter',    customers: 142, revenue: 12_400 },
      { plan: 'pro',        customers: 86,  revenue: 38_900 },
      { plan: 'enterprise', customers: 40,  revenue: 132_950 },
    ]
  },
  async getChurnCohorts() {
    return [
      { cohort: '2024-01', size: 42, retainedM3: 39, retainedM6: 35, retainedM12: 31 },
      { cohort: '2024-04', size: 51, retainedM3: 48, retainedM6: 41, retainedM12: 36 },
      { cohort: '2024-07', size: 47, retainedM3: 45, retainedM6: 39 },
      { cohort: '2024-10', size: 55, retainedM3: 52 },
      { cohort: '2025-01', size: 60 },
    ]
  },
  async getFeatureAdoption() {
    return [
      { feature: 'Dashboards',     adoption: 0.92 },
      { feature: 'Custom Reports', adoption: 0.61 },
      { feature: 'API Access',     adoption: 0.34 },
      { feature: 'Webhooks',       adoption: 0.21 },
      { feature: 'SSO',            adoption: 0.18 },
      { feature: 'Audit Log',      adoption: 0.12 },
    ]
  },
}

router.get('/summary', async (req, res) => {
  const data = await ReportsService.getSummary() // unhandled rejection if this throws
  res.json(data)
})

router.get('/revenue-by-plan', async (req, res) => {
  const data = await ReportsService.getRevenueByPlan()
  res.json(data)
})

router.get('/churn-cohorts', async (req, res) => {
  const data = await ReportsService.getChurnCohorts()
  res.json(data)
})

router.get('/feature-adoption', async (req, res) => {
  const data = await ReportsService.getFeatureAdoption()
  res.json(data)
})

// DEAD ENDPOINT — replaced by third-party tool, never removed
router.get('/export', async (req, res) => {
  res.status(500).json({ message: 'Something went wrong' })
})

// DEAD ENDPOINT — never finished
router.post('/schedule', async (req, res) => {
  // TODO: implement email sending
  res.status(200).json({ success: false, reason: 'not implemented' })
})

module.exports = router
