import React from 'react'
import { DEFAULT_PAGE_SIZE } from '../../constants/oldConfig'

// Near-duplicate of UserTable. Was copy-pasted because "we'll consolidate later".
class ReportTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      sortColumn: (props.columns && props.columns[0] && props.columns[0].key) || null,
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
    if (!sortColumn) return { rows: rows.slice(0, pageSize), totalPages: Math.max(1, Math.ceil(rows.length / pageSize)) }
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
    const data2 = data
    const columns = this.props.columns || []
    const { rows, totalPages } = this.sortAndPaginate(data2)
    const { sortColumn, sortDirection, page, selectedRows } = this.state

    const arrow = col => (col !== sortColumn ? '' : sortDirection === 'asc' ? ' ▲' : ' ▼')

    return (
      <div>
        <table className="table table-bordered">
          <thead className="thead-dark">
            <tr>
              {columns.map(c => (
                <th key={c.key} onClick={() => this.handleSort(c.key)} style={{ cursor: 'pointer' }}>
                  {c.header}{arrow(c.key)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="dc-table-empty">No rows</td>
              </tr>
            ) : (
              rows.map((row, i) => (
                <tr
                  key={row.id || i}
                  style={selectedRows[row.id || i] ? { backgroundColor: 'var(--dc-primary-tint)' } : null}
                  onClick={() => this.handleToggleRow(row.id || i)}
                >
                  {columns.map(c => (
                    <td key={c.key}>{c.render ? c.render(row) : row[c.key]}</td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
        <div className="dc-pagination">
          <button
            className="btn btn-sm btn-link"
            onClick={() => this.handlePageChange(Math.max(1, page - 1))}
            disabled={page === 1}
          >
            Prev
          </button>
          <span>Page {page} of {totalPages}</span>
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

export default ReportTable
