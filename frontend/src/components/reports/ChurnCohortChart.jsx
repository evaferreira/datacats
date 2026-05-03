import React from 'react'
import { fetchWithAuth } from '../../utils/apiHelpers'

// TODO: migrate to recharts
class ChurnCohortChart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cohorts: [],
      loading: true,
    }
  }

  componentDidMount() {
    this.fetchCohorts()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.refreshKey !== this.props.refreshKey) {
      this.fetchCohorts()
    }
  }

  fetchCohorts() {
    this.setState({ loading: true })
    fetchWithAuth('/reports/churn-cohorts')
      .then(data => this.setState({ cohorts: data || [], loading: false }))
      .catch(() => this.setState({ loading: false }))
  }

  pct(retained, size) {
    if (!size) return ''
    return Math.round((retained / size) * 100) + '%'
  }

  render() {
    const { cohorts, loading } = this.state
    if (loading) return <div className="dc-loading">Loading cohorts…</div>

    return (
      <table className="dc-report-table">
        <thead>
          <tr>
            <th>Cohort</th>
            <th>Size</th>
            <th>M3</th>
            <th>M6</th>
            <th>M12</th>
          </tr>
        </thead>
        <tbody>
          {cohorts.map(c => (
            <tr key={c.cohort}>
              <td>{c.cohort}</td>
              <td>{c.size}</td>
              <td className="dc-report-cohort-cell">
                {c.retainedM3 != null ? c.retainedM3 : '—'}
                <span className="pct">{this.pct(c.retainedM3, c.size)}</span>
              </td>
              <td className="dc-report-cohort-cell">
                {c.retainedM6 != null ? c.retainedM6 : '—'}
                <span className="pct">{this.pct(c.retainedM6, c.size)}</span>
              </td>
              <td className="dc-report-cohort-cell">
                {c.retainedM12 != null ? c.retainedM12 : '—'}
                <span className="pct">{this.pct(c.retainedM12, c.size)}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }
}

export default ChurnCohortChart
