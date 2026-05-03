import React from 'react'

// Near-duplicate of UserFilters.
class ReportFilters extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      filters: {
        startDate: '',
        endDate: '',
        plan: 'all',
      },
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleApply = this.handleApply.bind(this)
  }

  handleChange(field) {
    return e => {
      const value = e.target.value
      this.setState(prev => ({
        filters: { ...prev.filters, [field]: value },
      }))
    }
  }

  handleApply() {
    if (this.props.onApply) {
      this.props.onApply(this.state.filters)
    }
  }

  render() {
    const { filters } = this.state
    return (
      <form className="form-row" onSubmit={e => e.preventDefault()} style={{ marginBottom: '1rem' }}>
        <div className="form-group col-auto">
          <label style={{ fontSize: 14, color: '#6b7280' }}>Start</label>
          <input
            type="date"
            className="form-control"
            value={filters.startDate}
            onChange={this.handleChange('startDate')}
          />
        </div>
        <div className="form-group col-auto">
          <label style={{ fontSize: 14, color: '#6b7280' }}>End</label>
          <input
            type="date"
            className="form-control"
            value={filters.endDate}
            onChange={this.handleChange('endDate')}
          />
        </div>
        <div className="form-group col-auto">
          <label style={{ fontSize: 14, color: '#6b7280' }}>Plan</label>
          <select className="form-control" value={filters.plan} onChange={this.handleChange('plan')}>
            <option value="all">All</option>
            <option value="starter">Starter</option>
            <option value="pro">Pro</option>
            <option value="enterprise">Enterprise</option>
          </select>
        </div>
        <div className="form-group col-auto" style={{ alignSelf: 'flex-end' }}>
          <button type="button" className="btn btn-primary" onClick={this.handleApply}>
            Apply
          </button>
        </div>
      </form>
    )
  }
}

export default ReportFilters
