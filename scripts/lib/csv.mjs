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

export function headerKey(value) {
  return String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "")
}

// Maps a CSV table by header aliases so Google Sheet column titles can change
// wording without breaking sync. `aliases` is { field: ["Header A", "Header B"] }.
export function rowsFromNamedHeaders(cells, aliases) {
  const header = cells[0] || []
  const index = new Map()
  header.forEach((name, i) => {
    const key = headerKey(name)
    if (key && !index.has(key)) index.set(key, i)
  })
  const fieldAt = {}
  for (const [field, names] of Object.entries(aliases)) {
    const found = names.map(headerKey).find((key) => index.has(key))
    if (found != null) fieldAt[field] = index.get(found)
  }
  return cells.slice(1).map((row) => {
    const obj = {}
    for (const [field, i] of Object.entries(fieldAt)) {
      const value = (row[i] ?? "").trim()
      if (value) obj[field] = value
    }
    return obj
  })
}

export function isProductHeader(cells) {
  const keys = (cells[0] || []).map(headerKey)
  return keys.includes("category") && keys.includes("model")
}
