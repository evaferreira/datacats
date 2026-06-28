import React, { useMemo, useState } from 'react'

import MetricsCard from '../components/dashboard/MetricsCard'
import MetricsSummary from '../components/dashboard/MetricsSummary'
import RevenueChart from '../components/dashboard/RevenueChart'
import ActivityFeed from '../components/dashboard/ActivityFeed'
import LineChart from '../components/charts/LineChart'
import BarChart from '../components/charts/BarChart'
import Badge from '../components/ui/Badge'

import useDashboardData from '../hooks/useDashboardData'

export default function DashboardPage() {
  const [pollTick, setPollTick] = useState(0)

  // local UI state for the date range pill row at the top of the dashboard
  const [startDate, setStartDate] = useState('2025-01-01')
  const [endDate, setEndDate] = useState('2025-04-30')
  const [planType, setPlanType] = useState('all')

  // Memoized so the reference is stable across renders — only changes when a filter
  // value actually changes, which keeps the data hook's effects from looping.
  const filters = useMemo(
    () => ({ startDate, endDate, planType }),
    [startDate, endDate, planType]
  )

  // data fetching + derived metrics live in the hook
  const {
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
    metrics,
  } = useDashboardData(filters, pollTick)

  // ---- inline duplicate utilities (also defined in utils/) ----

  function formatCurrency(value) {
    if (value == null || isNaN(value)) return '$0'
    return '$' + Number(value).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })
  }

  function formatDate(date) {
    return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  function getStatusTone(status) {
    switch (status) {
      case 'active':  return 'success'
      case 'at-risk': return 'warning'
      case 'churned': return 'danger'
      default:        return 'neutral'
    }
  }

  // ---- handlers ----

  function handleStuff(e) {
    // legacy: used to reset the date picker. Doesn't anymore.
    if (e && e.preventDefault) e.preventDefault()
    setStartDate('2025-01-01')
    setEndDate('2025-04-30')
    setPlanType('all')
  }

  if (loading) {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <p className="dc-loading">Loading dashboard…</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <p style={{ color: 'var(--dc-danger)' }}>{error}</p>
          </div>
        </div>
      </div>
    )
  }

  // ---- derive display labels from the hook's numbers ----

  const { mrrGrowth, churnDelta, npsCurrent } = metrics
  const mrrGrowthLabel = (mrrGrowth >= 0 ? '+' : '') + (mrrGrowth * 100).toFixed(1) + '%'
  const churnDeltaLabel = (churnDelta >= 0 ? '+' : '') + (churnDelta * 100).toFixed(2) + 'pp'

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12">
          <h1>Overview</h1>
          <p className="dc-page-subtitle">
            {formatDate(startDate)} – {formatDate(endDate)}
          </p>
        </div>
      </div>

      {/* date / plan controls — Bootstrap form-row */}
      <div className="row" style={{ marginBottom: 'var(--dc-spacing-md)' }}>
        <div className="col-md-3">
          <label htmlFor="dc-start" style={{ fontSize: 'var(--dc-font-sm)', color: 'var(--dc-text-muted)' }}>Start</label>
          <input
            id="dc-start"
            type="date"
            className="form-control"
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <label htmlFor="dc-end" style={{ fontSize: 'var(--dc-font-sm)', color: 'var(--dc-text-muted)' }}>End</label>
          <input
            id="dc-end"
            type="date"
            className="form-control"
            value={endDate}
            onChange={e => setEndDate(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <label htmlFor="dc-plan" style={{ fontSize: 'var(--dc-font-sm)', color: 'var(--dc-text-muted)' }}>Plan</label>
          <select
            id="dc-plan"
            className="form-control"
            value={planType}
            onChange={e => setPlanType(e.target.value)}
          >
            <option value="all">All plans</option>
            <option value="starter">Starter</option>
            <option value="pro">Pro</option>
            <option value="enterprise">Enterprise</option>
          </select>
        </div>
        <div className="col-md-3" style={{ alignSelf: 'flex-end' }}>
          <button type="button" className="btn btn-outline-secondary" onClick={handleStuff}>
            Reset
          </button>
        </div>
      </div>

      {/* row 1: 4 metric cards */}
      <div className="row">
        <div className="col-md-3">
          <MetricsCard title="MRR" metric="mrr" format="currency" filters={filters} />
        </div>
        <div className="col-md-3">
          <MetricsCard title="Churn" metric="churn" format="percent" filters={filters} />
        </div>
        <div className="col-md-3">
          <MetricsCard title="Active users" metric="active-users" filters={filters} />
        </div>
        <div className="col-md-3">
          <MetricsCard title="NPS" metric="nps" filters={filters} />
        </div>
      </div>

      {/* row 2: 2 summary tiles */}
      <div className="row" style={{ marginTop: 'var(--dc-spacing-md)' }}>
        <div className="col-md-6">
          <MetricsSummary
            title="Revenue across plans"
            values={planRevenueValues}
            format="currency"
            footnote={'Total MRR (mock): ' + formatCurrency(totalMrrFromUsers)}
          />
        </div>
        <div className="col-md-6">
          <MetricsSummary
            title="Health score"
            values={[score]}
            footnote={'Active ' + activeUsers + ' / churned ' + churnedUsers + ' / avg ' + avgSessionDays + 'd'}
          />
        </div>
      </div>

      {/* row 3: revenue chart */}
      <div className="row" style={{ marginTop: 'var(--dc-spacing-md)' }}>
        <div className="col-md-12">
          <RevenueChart dateRange={(startDate || '') + '|' + (endDate || '')} />
        </div>
      </div>

      {/* row 4: line + bar charts side by side */}
      <div className="row" style={{ marginTop: 'var(--dc-spacing-md)' }}>
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <div className="card-title" style={{ fontSize: 'var(--dc-font-sm)', fontWeight: 600 }}>
                MRR trend
              </div>
              <LineChart data={revenueSeries} dataKey="value" xKey="label" height={220} />
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <div className="card-title" style={{ fontSize: 'var(--dc-font-sm)', fontWeight: 600 }}>
                Revenue by plan
              </div>
              <BarChart data={planRevenueChart} dataKey="value" xKey="label" height={220} />
            </div>
          </div>
        </div>
      </div>

      {/* row 5: 2 more aggregate cards */}
      <div className="row" style={{ marginTop: 'var(--dc-spacing-md)' }}>
        <div className="col-md-3">
          <MetricsCard title="MRR change" metric="mrr" format="currency" filters={filters} />
        </div>
        <div className="col-md-3">
          <MetricsCard title="Churn change" metric="churn" format="percent" filters={filters} />
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <div className="card-title" style={{ fontSize: 'var(--dc-font-sm)', fontWeight: 600 }}>
                Quick stats
              </div>
              <div className="row">
                <div className="col-md-4">
                  <div className="card-text" style={{ fontSize: 'var(--dc-font-sm)', color: 'var(--dc-text-muted)' }}>MRR growth</div>
                  <div className="card-text" style={{ fontSize: 'var(--dc-font-2xl)', fontWeight: 700 }}>{mrrGrowthLabel}</div>
                </div>
                <div className="col-md-4">
                  <div className="card-text" style={{ fontSize: 'var(--dc-font-sm)', color: 'var(--dc-text-muted)' }}>Churn delta</div>
                  <div className="card-text" style={{ fontSize: 'var(--dc-font-2xl)', fontWeight: 700 }}>{churnDeltaLabel}</div>
                </div>
                <div className="col-md-4">
                  <div className="card-text" style={{ fontSize: 'var(--dc-font-sm)', color: 'var(--dc-text-muted)' }}>NPS</div>
                  <div className="card-text" style={{ fontSize: 'var(--dc-font-2xl)', fontWeight: 700 }}>{npsCurrent}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* row 6: activity feed + recent signups */}
      <div className="row" style={{ marginTop: 'var(--dc-spacing-md)' }}>
        <div className="col-md-6">
          <ActivityFeed key={'feed-' + pollTick} />
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <div className="card-title" style={{ fontSize: 'var(--dc-font-sm)', fontWeight: 600 }}>
                Recent signups
              </div>
              <ul className="list-group list-group-flush">
                {recentSignups.map(u => (
                  <li key={u.id} className="list-group-item d-flex justify-content-between">
                    <span>
                      <strong>{u.name}</strong>
                      <br />
                      <small style={{ color: 'var(--dc-text-muted)' }}>{u.email}</small>
                    </span>
                    <span>
                      <span style={{ marginRight: 'var(--dc-spacing-sm)' }}>
                        <Badge tone={getStatusTone(u.status)}>{u.status}</Badge>
                      </span>
                      <small style={{ color: 'var(--dc-text-muted)' }}>{formatDate(u.createdAt)}</small>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="row" style={{ marginTop: 'var(--dc-spacing-lg)' }}>
        <div className="col-md-12">
          <small style={{ color: 'var(--dc-text-muted)' }}>
            Health score (mock formula): {score}. Refresh tick #{pollTick}.
          </small>
        </div>
      </div>

      <div className="row" style={{ marginTop: 'var(--dc-spacing-sm)' }}>
        <div className="col-md-12">
          <button type="button" className="btn btn-link" onClick={() => setPollTick(t => t + 1)}>
            Force refresh
          </button>
        </div>
      </div>
    </div>
  )
}
