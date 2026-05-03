// Author: Jake – Dec 2019
// CSV export helper. Used to be wired up to the old "Export" button.
// Replaced by the third-party export tool in 2022. Left here in case we ever roll our own again.

export function rowsToCsv(rows, columns) {
  if (!rows || rows.length === 0) return ''
  const cols = columns || Object.keys(rows[0])
  const header = cols.join(',')
  const body = rows.map(function (r) {
    return cols.map(function (c) {
      const v = r[c]
      if (v == null) return ''
      const s = String(v)
      if (s.indexOf(',') >= 0 || s.indexOf('"') >= 0 || s.indexOf('\n') >= 0) {
        return '"' + s.replace(/"/g, '""') + '"'
      }
      return s
    }).join(',')
  }).join('\n')
  return header + '\n' + body
}

export function downloadCsv(filename, csv) {
  const blob = new Blob([csv], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

export function buildDefaultColumns(sample) {
  return sample ? Object.keys(sample) : []
}
