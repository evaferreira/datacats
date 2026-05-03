import React, { useEffect, useState } from 'react'
import ReportFilters from '../components/reports/ReportFilters'
import ChurnCohortChart from '../components/reports/ChurnCohortChart'
import { fetchWithAuth } from '../utils/apiHelpers'

export default function ReportsPage() {
  const [revenueByPlan, setRevenueByPlan] = useState([])
  const [featureAdoption, setFeatureAdoption] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      fetchWithAuth('/reports/revenue-by-plan').catch(() => []),
      fetchWithAuth('/reports/feature-adoption').catch(() => []),
    ])
      .then(([r, f]) => {
        setRevenueByPlan(r)
        setFeatureAdoption(f)
        setLoading(false)
      })
  }, [])

  function handleApply(filters) {
    console.log('apply filters', filters)
  }

  if (loading) return <div className="dc-loading">Loading reports…</div>

  return (
    <div className="dc-reports">
      <h1>Reports</h1>
      <p className="dc-reports-subtitle">Pre-built reports updated nightly.</p>

      <ReportFilters onApply={handleApply} />

      <section className="dc-report-section">
        <h2>Revenue by plan</h2>
        <p className="dc-report-meta">Showing month-to-date.</p>

        <table className="table table-striped table-hover">
          <thead className="thead-dark">
            <tr>
              <th>Plan</th>
              <th>Customers</th>
              <th>Revenue</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {revenueByPlan.map(r => (
              <tr key={r.plan}>
                <td>{r.plan}</td>
                <td>{r.customers}</td>
                <td>${(r.revenue || 0).toLocaleString()}</td>
                <td>
                  {r.revenue > 50000 ? (
                    <span className="badge badge-success">strong</span>
                  ) : r.revenue > 20000 ? (
                    <span className="badge badge-warning">growing</span>
                  ) : (
                    <span className="badge badge-secondary">small</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="dc-report-section">
        <h2>Feature adoption</h2>
        <p className="dc-report-meta">Percentage of accounts that have used the feature in the last 30 days.</p>

        <table className="table table-striped table-hover">
          <thead className="thead-dark">
            <tr>
              <th>Feature</th>
              <th>Adoption</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {featureAdoption.map(f => (
              <tr key={f.feature}>
                <td>{f.feature}</td>
                <td>{(f.adoption * 100).toFixed(0)}%</td>
                <td>
                  {f.adoption > 0.5 ? (
                    <span className="badge badge-success">healthy</span>
                  ) : f.adoption > 0.2 ? (
                    <span className="badge badge-warning">building</span>
                  ) : (
                    <span className="badge badge-danger">low</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="dc-report-section">
        <h2>Churn cohorts</h2>
        <p className="dc-report-meta">Retention by signup quarter.</p>
        <ChurnCohortChart />
      </section>

      <div className="dc-report-export-row">
        <button type="button" className="btn btn-primary">Export to CSV</button>
        <button type="button" className="btn btn-outline-secondary">Schedule email</button>
        <span className="dc-export-hint">Exports include all rows, not just the visible page.</span>
      </div>
    </div>
  )
}
