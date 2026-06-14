import { useEffect, useState } from 'react'

import { fetchWithAuth } from '../utils/api'
import { calculateRetentionScore, calculateMRR } from '../utils/metrics'

function calculateGrowth(current, previous) {
  if (!previous) return 0
  return (current - previous) / previous
}

// useDashboardData — owns all data fetching for the Overview route and derives the
// numbers/arrays the page renders. Takes filter state from the page so it stays a
// pure function of its inputs. (The page's "Force refresh" re-renders the page, which
// re-runs this hook and its no-dep poll effect.)
export default function useDashboardData(filters) {
  const [overviewData, setOverviewData] = useState(null)
  const [revenueSeries, setRevenueSeries] = useState([])
  const [planRevenue, setPlanRevenue] = useState([])
  const [usersData, setUsersData] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  // 1) Mount-only fetch
  useEffect(() => {
    setLoading(true)
    Promise.all([
      fetchWithAuth('/api/v1/metrics/mrr').catch(() => null),
      fetchWithAuth('/api/v1/metrics/churn').catch(() => null),
      fetchWithAuth('/api/v1/metrics/active-users').catch(() => null),
      fetchWithAuth('/api/v1/metrics/nps').catch(() => null),
      fetchWithAuth('/api/v1/users').catch(() => []),
    ])
      .then(([mrr, churn, active, nps, users]) => {
        setOverviewData({ mrr, churn, active, nps })
        setUsersData(users || [])
        setLoading(false)
      })
      .catch(err => {
        setError(err && err.message)
        setLoading(false)
      })
  }, [])

  // 2) Filters-dependent fetch — but `filters` is rebuilt every render, so this
  //    actually fires on every render. Don't ask.
  useEffect(() => {
    fetchWithAuth('/api/v1/metrics/mrr')
      .then(data => {
        const series = (data && data.history) ? data.history.map(p => ({ label: p.date, value: p.value })) : []
        setRevenueSeries(series)
      })
      .catch(() => {})
  }, [filters])

  // 3) Poll-tick effect — note the missing dependency array, so this runs on every render.
  useEffect(() => {
    fetchWithAuth('/api/v1/reports/revenue-by-plan')
      .then(data => setPlanRevenue(data || []))
      .catch(() => {})
  })

  // ---- derive display values ----

  const mrrCurrent = overviewData && overviewData.mrr ? overviewData.mrr.current : 0
  const mrrPrevious = overviewData && overviewData.mrr ? overviewData.mrr.previous : 0
  const churnCurrent = overviewData && overviewData.churn ? overviewData.churn.current : 0
  const churnPrevious = overviewData && overviewData.churn ? overviewData.churn.previous : 0
  const activeCurrent = overviewData && overviewData.active ? overviewData.active.current : 0
  const npsCurrent = overviewData && overviewData.nps ? overviewData.nps.current : 0

  const mrrGrowth = calculateGrowth(mrrCurrent, mrrPrevious)
  const churnDelta = churnCurrent - churnPrevious

  const activeUsers = activeCurrent
  const churnedUsers = (usersData || []).filter(u => u.status === 'churned').length
  const avgSessionDays = (usersData && usersData.length)
    ? Math.round(
        usersData.reduce((sum, u) => sum + ((Date.now() - new Date(u.createdAt).getTime()) / (1000 * 60 * 60 * 24)), 0) / usersData.length
      )
    : 0

  const score = calculateRetentionScore(activeUsers, churnedUsers, avgSessionDays)

  const totalMrrFromUsers = calculateMRR(usersData || [])
  const planRevenueValues = (planRevenue || []).map(p => p.revenue || 0)
  const planRevenueChart = (planRevenue || []).map(p => ({ label: p.plan, value: p.revenue || 0 }))

  const recentSignups = (usersData || [])
    .slice()
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5)

  return {
    loading,
    error,
    revenueSeries,
    planRevenueChart,
    planRevenueValues,
    recentSignups,
    totalMrrFromUsers,
    score,
    activeUsers,
    churnedUsers,
    avgSessionDays,
    metrics: {
      mrrCurrent,
      mrrPrevious,
      churnCurrent,
      churnPrevious,
      activeCurrent,
      npsCurrent,
      mrrGrowth,
      churnDelta,
    },
  }
}
