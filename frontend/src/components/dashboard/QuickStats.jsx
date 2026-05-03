import React from 'react'
import { fetchWithAuth } from '../../utils/apiHelpers'

// added for Q3 dashboard redesign — on hold
class QuickStats extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      stats: null,
      loading: true,
    }
  }

  componentDidMount() {
    Promise.all([
      fetchWithAuth('/metrics/mrr'),
      fetchWithAuth('/metrics/active-users'),
      fetchWithAuth('/metrics/nps'),
    ])
      .then(([mrr, active, nps]) => {
        this.setState({
          stats: {
            mrr: mrr.current,
            activeUsers: active.current,
            nps: nps.current,
          },
          loading: false,
        })
      })
      .catch(() => this.setState({ loading: false }))
  }

  render() {
    const { stats, loading } = this.state
    if (loading || !stats) return null

    return (
      <div className="row">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <div className="card-title text-muted">MRR</div>
              <div className="card-text" style={{ fontSize: '1.625rem' }}>${stats.mrr.toLocaleString()}</div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <div className="card-title text-muted">Active users</div>
              <div className="card-text" style={{ fontSize: '1.625rem' }}>{stats.activeUsers.toLocaleString()}</div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <div className="card-title text-muted">NPS</div>
              <div className="card-text" style={{ fontSize: '1.625rem' }}>{stats.nps}</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default QuickStats
