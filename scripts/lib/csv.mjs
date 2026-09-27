// RFC 4180 style CSV handling. Google Sheets exports quoted fields with doubled
// quotes and may use CRLF, so both are handled here.

export function parseCsv(text) {
  const rows = []
  let row = []
  let field = ""
  let quoted = false
  let i = 0
  const input = text.replace(/^\uFEFF/, "")

  while (i < input.length) {
    const char = input[i]
    if (quoted) {
      if (char === '"') {
        if (input[i + 1] === '"') {
          field += '"'
          i += 2
          continue
        }
        quoted = false
        i += 1
        continue
      }
      field += char
      i += 1
      continue
    }
    if (char === '"') {
      quoted = true
      i += 1
      continue
    }
    if (char === ",") {
      row.push(field)
      field = ""
      i += 1
      continue
    }
    if (char === "\r") {
      i += 1
      continue
    }
    if (char === "\n") {
      row.push(field)
      rows.push(row)
      row = []
      field = ""
      i += 1
      continue
    }
    field += char
    i += 1
  }
  if (field !== "" || row.length) {
    row.push(field)
    rows.push(row)
  }
  return rows
}

export function escapeCsv(value) {
  const text = value == null ? "" : String(value)
  return /[",\n\r]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text
}

export function toCsv(rows) {
  return rows.map((row) => row.map(escapeCsv).join(",")).join("\r\n")
}

// Maps positional CSV cells onto the column-letter keys the builders expect.
export function rowsToColumnKeys(cells, columns) {
  return cells.map((row) => {
    const obj = {}
    columns.forEach((column, index) => {
      const value = (row[index] ?? "").trim()
      if (value) obj[column.key] = value
    })
    return obj
  })
}

// Drops a leading header row when the first cell matches the declared header.
export function stripHeader(cells, columns) {
  const first = cells[0]?.[0]?.trim().toLowerCase()
  if (first && first === columns[0].header.toLowerCase()) return cells.slice(1)
  return cells
}
