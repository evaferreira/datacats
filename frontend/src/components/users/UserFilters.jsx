import React from 'react'

class UserFilters extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      filters: {
        search: '',
        plan: 'all',
        status: 'all',
      },
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(field) {
    return e => {
      const value = e.target.value
      this.setState(prev => ({
        filters: { ...prev.filters, [field]: value },
      }))
    }
  }

  render() {
    const { filters } = this.state

    // Notify parent — but inside render. Don't ask.
    if (this.props.onFiltersChange) {
      this.props.onFiltersChange(this.state.filters)
    }

    return (
      <form
        className="form-inline"
        onSubmit={e => e.preventDefault()}
        style={{ marginBottom: '1rem', gap: '0.5rem', flexWrap: 'wrap' }}
      >
        <div className="form-group" style={{ marginRight: 8 }}>
          <input
            type="text"
            className="form-control"
            placeholder="Search by name or email"
            value={filters.search}
            onChange={this.handleChange('search')}
          />
        </div>

        <div className="form-group" style={{ marginRight: 8 }}>
          <select className="form-control" value={filters.plan} onChange={this.handleChange('plan')}>
            <option value="all">All plans</option>
            <option value="starter">Starter</option>
            <option value="pro">Pro</option>
            <option value="enterprise">Enterprise</option>
          </select>
        </div>

        <div className="form-group" style={{ marginRight: 8 }}>
          <select className="form-control" value={filters.status} onChange={this.handleChange('status')}>
            <option value="all">All statuses</option>
            <option value="active">Active</option>
            <option value="at-risk">At-risk</option>
            <option value="churned">Churned</option>
          </select>
        </div>

        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => this.setState({ filters: { search: '', plan: 'all', status: 'all' } })}
        >
          Reset
        </button>
      </form>
    )
  }
}

export default UserFilters
