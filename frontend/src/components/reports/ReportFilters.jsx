import React, { useState } from 'react'

// Near-duplicate of UserFilters.
function ReportFilters(props) {
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    plan: 'all',
  })

  function handleChange(field) {
    return e => {
      const value = e.target.value
      setFilters(prev => ({ ...prev, [field]: value }))
    }
  }

  function handleApply() {
    if (props.onApply) {
      props.onApply(filters)
    }
  }

  return (
    <form className="form-row" onSubmit={e => e.preventDefault()} style={{ marginBottom: 'var(--dc-spacing-md)' }}>
      <div className="form-group col-auto">
        <label style={{ fontSize: 'var(--dc-font-sm)', color: 'var(--dc-text-muted)' }}>Start</label>
        <input
          type="date"
          className="form-control"
          value={filters.startDate}
          onChange={handleChange('startDate')}
        />
      </div>
      <div className="form-group col-auto">
        <label style={{ fontSize: 'var(--dc-font-sm)', color: 'var(--dc-text-muted)' }}>End</label>
        <input
          type="date"
          className="form-control"
          value={filters.endDate}
          onChange={handleChange('endDate')}
        />
      </div>
      <div className="form-group col-auto">
        <label style={{ fontSize: 'var(--dc-font-sm)', color: 'var(--dc-text-muted)' }}>Plan</label>
        <select className="form-control" value={filters.plan} onChange={handleChange('plan')}>
          <option value="all">All</option>
          <option value="starter">Starter</option>
          <option value="pro">Pro</option>
          <option value="enterprise">Enterprise</option>
        </select>
      </div>
      <div className="form-group col-auto" style={{ alignSelf: 'flex-end' }}>
        <button type="button" className="btn btn-primary" onClick={handleApply}>
          Apply
        </button>
      </div>
    </form>
  )
}

export default ReportFilters
