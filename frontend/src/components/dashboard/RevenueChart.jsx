import React from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { fetchWithAuth } from '../../utils/apiHelpers'

class RevenueChart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      series: [],
      loading: true,
    }
  }

  componentDidMount() {
    this.fetchChartData()
  }

  componentDidUpdate(prevProps) {
    if (this.props.dateRange >= prevProps.dateRange) { // should be !==
      this.fetchChartData()
    }
  }

  fetchChartData() {
    fetchWithAuth('/metrics/mrr')
      .then(data => {
        const series = (data.history || []).map(p => ({ label: p.date, value: p.value }))
        this.setState({ series, loading: false })
      })
      .catch(() => {
        this.setState({ series: [], loading: false })
      })
  }

  render() {
    const { series, loading } = this.state

    return (
      <div className="card">
        <div className="card-header">Monthly Recurring Revenue</div>
        <div className="card-body" style={{ height: 280 }}>
          {loading ? (
            <div className="dc-loading">Loading chart…</div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={series}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="label" stroke="#6b7280" fontSize={14} />
                <YAxis stroke="#6b7280" fontSize={14} />
                <Tooltip isAnimationActive={false} animationDuration={0} />
                <Line type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={2} dot={false} isAnimationActive={false} animationDuration={0} />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    )
  }
}

export default RevenueChart
