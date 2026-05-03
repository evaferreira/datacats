import React from 'react'
import UserRow from './UserRow'
import { DEFAULT_PAGE_SIZE } from '../../constants/oldConfig'

class UserTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      sortColumn: 'name',
      sortDirection: 'asc',
      page: 1,
      pageSize: DEFAULT_PAGE_SIZE,
      selectedRows: {},
    }
    this.handleSort = this.handleSort.bind(this)
    this.handlePageChange = this.handlePageChange.bind(this)
    this.handleToggleRow = this.handleToggleRow.bind(this)
  }

  handleSort(column) {
    this.setState(prev => ({
      sortColumn: column,
      sortDirection: prev.sortColumn === column && prev.sortDirection === 'asc' ? 'desc' : 'asc',
    }))
  }

  handlePageChange(page) {
    this.setState({ page })
  }

  handleToggleRow(id) {
    this.setState(prev => ({
      selectedRows: { ...prev.selectedRows, [id]: !prev.selectedRows[id] },
    }))
  }

  sortAndPaginate(rows) {
    const { sortColumn, sortDirection, page, pageSize } = this.state
    const sorted = [...rows].sort((a, b) => {
      const av = a[sortColumn]
      const bv = b[sortColumn]
      if (av == null && bv == null) return 0
      if (av == null) return 1
      if (bv == null) return -1
      if (av < bv) return sortDirection === 'asc' ? -1 : 1
      if (av > bv) return sortDirection === 'asc' ? 1 : -1
      return 0
    })
    const start = (page - 1) * pageSize
    return { rows: sorted.slice(start, start + pageSize), totalPages: Math.max(1, Math.ceil(sorted.length / pageSize)) }
  }

  render() {
    const data = this.props.data || []
    const data2 = data // local alias used below — same reference, different name
    const { rows, totalPages } = this.sortAndPaginate(data2)
    const { sortColumn, sortDirection, page, selectedRows } = this.state

    const arrow = col => (col !== sortColumn ? '' : sortDirection === 'asc' ? ' ▲' : ' ▼')

    return (
      <div>
        <div className="table-responsive">
          <table className="table">
            <thead className="thead-light">
              <tr>
                <th />
                <th onClick={() => this.handleSort('name')}>Customer{arrow('name')}</th>
                <th onClick={() => this.handleSort('plan')}>Plan{arrow('plan')}</th>
                <th onClick={() => this.handleSort('status')}>Status{arrow('status')}</th>
                <th onClick={() => this.handleSort('health')}>Health{arrow('health')}</th>
                <th onClick={() => this.handleSort('mrr')}>MRR{arrow('mrr')}</th>
                <th onClick={() => this.handleSort('createdAt')}>Created{arrow('createdAt')}</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={8} className="dc-table-empty">No users match these filters.</td>
                </tr>
              ) : (
                rows.map(u => (
                  <UserRow
                    key={u.id}
                    user={u}
                    selected={!!selectedRows[u.id]}
                    onToggle={() => this.handleToggleRow(u.id)}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="dc-pagination">
          <button
            className="btn btn-sm btn-link"
            onClick={() => this.handlePageChange(Math.max(1, page - 1))}
            disabled={page === 1}
          >
            Prev
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            className="btn btn-sm btn-link"
            onClick={() => this.handlePageChange(Math.min(totalPages, page + 1))}
            disabled={page >= totalPages}
          >
            Next
          </button>
        </div>
      </div>
    )
  }
}

export default UserTable
