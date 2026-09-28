// Minimal .xlsx reader: just enough zip + SpreadsheetML parsing to pull sheet1
// into rows keyed by column letter. Avoids a dependency for a single input file.
import fs from "fs"
import zlib from "zlib"

function decodeXml(value) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#10;/g, "\n")
}

function inflateRaw(data) {
  return zlib.inflateRawSync(data)
}

function unzip(buffer) {
  const files = {}
  let offset = 0
  while (offset + 30 < buffer.length) {
    const signature = buffer.readUInt32LE(offset)
    if (signature !== 0x04034b50) break
    const method = buffer.readUInt16LE(offset + 8)
    const compressed = buffer.readUInt32LE(offset + 18)
    const nameLength = buffer.readUInt16LE(offset + 26)
    const extraLength = buffer.readUInt16LE(offset + 28)
    const name = buffer.slice(offset + 30, offset + 30 + nameLength).toString("utf8")
    const start = offset + 30 + nameLength + extraLength
    const data = buffer.slice(start, start + compressed)
    if (!name.endsWith("/")) {
      files[name] = method === 0 ? data : inflateRaw(data)
    }
    offset = start + compressed
  }
  return files
}

// Returns data rows keyed by column letter, with the header row dropped.
export function readSheet(filePath) {
  const buffer = fs.readFileSync(filePath)
  const zip = unzip(buffer)
  const ss = zip["xl/sharedStrings.xml"].toString("utf8")
  const strings = [...ss.matchAll(/<si>([\s\S]*?)<\/si>/g)].map((match) => {
    const texts = [...match[1].matchAll(/<t[^>]*>([\s\S]*?)<\/t>/g)].map((item) => item[1])
    return decodeXml(texts.join(""))
  })
  const sheet = zip["xl/worksheets/sheet1.xml"].toString("utf8")
  const rows = [...sheet.matchAll(/<row[^>]*r="(\d+)"[^>]*>([\s\S]*?)<\/row>/g)].map((row) => {
    const obj = {}
    for (const cell of row[2].matchAll(/<c([^>]*)>([\s\S]*?)<\/c>/g)) {
      const attrs = cell[1]
      const inner = cell[2]
      const ref = /r="([A-Z]+)\d+"/.exec(attrs)?.[1]
      if (!ref) continue
      const type = /t="([^"]+)"/.exec(attrs)?.[1] || ""
      let value = ""
      if (type === "inlineStr") {
        value = [...inner.matchAll(/<t[^>]*>([\s\S]*?)<\/t>/g)].map((item) => item[1]).join("")
      } else {
        value = /<v>([\s\S]*?)<\/v>/.exec(inner)?.[1] || ""
        if (type === "s") value = strings[Number(value)] ?? value
      }
      obj[ref] = decodeXml(value)
    }
    return obj
  })
  return rows.slice(1)
}

function parseSharedStrings(zip) {
  const xml = zip["xl/sharedStrings.xml"]
  if (!xml) return []
  return [...xml.toString("utf8").matchAll(/<si>([\s\S]*?)<\/si>/g)].map((match) => {
    const texts = [...match[1].matchAll(/<t[^>]*>([\s\S]*?)<\/t>/g)].map((item) => item[1])
    return decodeXml(texts.join(""))
  })
}

function cellValue(attrs, inner, strings) {
  const type = /t="([^"]+)"/.exec(attrs)?.[1] || ""
  if (type === "inlineStr") {
    return decodeXml([...inner.matchAll(/<t[^>]*>([\s\S]*?)<\/t>/g)].map((item) => item[1]).join(""))
  }
  const raw = /<v>([\s\S]*?)<\/v>/.exec(inner)?.[1] || ""
  if (type === "s") return strings[Number(raw)] ?? raw
  return decodeXml(raw)
}

function colIndex(ref) {
  const letters = /([A-Z]+)/.exec(ref)?.[1] || "A"
  let n = 0
  for (const ch of letters) n = n * 26 + (ch.charCodeAt(0) - 64)
  return n - 1
}

function parseSheetCells(xml, strings) {
  const rows = []
  for (const row of xml.matchAll(/<row[^>]*r="(\d+)"[^>]*>([\s\S]*?)<\/row>/g)) {
    const index = Number(row[1]) - 1
    const cells = []
    for (const cell of row[2].matchAll(/<c([^>]*)>([\s\S]*?)<\/c>/g)) {
      const ref = /r="([A-Z]+\d+)"/.exec(cell[1])?.[1]
      if (!ref) continue
      cells[colIndex(ref)] = cellValue(cell[1], cell[2], strings)
    }
    rows[index] = cells
  }
  return rows.filter(Boolean).map((row) => {
    const width = row.length
    return Array.from({ length: width }, (_, i) => row[i] ?? "")
  })
}

function sheetPathFor(zip, preferredName) {
  const workbook = zip["xl/workbook.xml"]?.toString("utf8") || ""
  const rels = zip["xl/_rels/workbook.xml.rels"]?.toString("utf8") || ""
  const relMap = Object.fromEntries(
    [...rels.matchAll(/Id="([^"]+)"[^>]*Target="([^"]+)"/g)].map((item) => [item[1], item[2]]),
  )
  const sheets = [...workbook.matchAll(/<sheet[^>]*name="([^"]+)"[^>]*r:id="([^"]+)"/g)].map((item) => ({
    name: item[1],
    path: `xl/${relMap[item[2]]?.replace(/^\//, "") || `worksheets/sheet1.xml`}`,
  }))
  const match = sheets.find((sheet) => sheet.name === preferredName) || (preferredName ? null : sheets[0])
  return match?.path || null
}

export function listSheetNames(filePath) {
  const zip = unzip(fs.readFileSync(filePath))
  const workbook = zip["xl/workbook.xml"]?.toString("utf8") || ""
  return [...workbook.matchAll(/<sheet[^>]*name="([^"]+)"/g)].map((item) => item[1])
}

// 2D array including the header row. Prefers a sheet named Products.
export function readSheetCells(filePath, preferredName = "Products") {
  const zip = unzip(fs.readFileSync(filePath))
  const pathName = sheetPathFor(zip, preferredName) || sheetPathFor(zip, "")
  const xml = zip[pathName]?.toString("utf8")
  if (!xml) throw new Error(`Could not read sheet "${preferredName}" in ${filePath}`)
  return parseSheetCells(xml, parseSharedStrings(zip))
}

function encodeXml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}

function colLetter(index) {
  let n = index + 1
  let out = ""
  while (n > 0) {
    const rem = (n - 1) % 26
    out = String.fromCharCode(65 + rem) + out
    n = Math.floor((n - 1) / 26)
  }
  return out
}

function crc32(buffer) {
  let crc = 0xffffffff
  for (let i = 0; i < buffer.length; i++) {
    crc ^= buffer[i]
    for (let j = 0; j < 8; j++) crc = crc & 1 ? (crc >>> 1) ^ 0xedb88320 : crc >>> 1
  }
  return (crc ^ 0xffffffff) >>> 0
}

function zipStore(files) {
  const locals = []
  const centrals = []
  let offset = 0
  for (const [name, text] of Object.entries(files)) {
    const data = Buffer.from(text, "utf8")
    const nameBuf = Buffer.from(name, "utf8")
    const crc = crc32(data)
    const local = Buffer.alloc(30 + nameBuf.length)
    local.writeUInt32LE(0x04034b50, 0)
    local.writeUInt16LE(20, 4)
    local.writeUInt16LE(0, 8)
    local.writeUInt32LE(crc, 14)
    local.writeUInt32LE(data.length, 18)
    local.writeUInt32LE(data.length, 22)
    local.writeUInt16LE(nameBuf.length, 26)
    nameBuf.copy(local, 30)
    locals.push(Buffer.concat([local, data]))

    const central = Buffer.alloc(46 + nameBuf.length)
    central.writeUInt32LE(0x02014b50, 0)
    central.writeUInt16LE(20, 4)
    central.writeUInt16LE(20, 6)
    central.writeUInt32LE(crc, 16)
    central.writeUInt32LE(data.length, 20)
    central.writeUInt32LE(data.length, 24)
    central.writeUInt16LE(nameBuf.length, 28)
    central.writeUInt32LE(offset, 42)
    nameBuf.copy(central, 46)
    centrals.push(central)
    offset += local.length + data.length
  }
  const centralStart = offset
  const centralBuf = Buffer.concat(centrals)
  const end = Buffer.alloc(22)
  end.writeUInt32LE(0x06054b50, 0)
  end.writeUInt16LE(centrals.length, 8)
  end.writeUInt16LE(centrals.length, 10)
  end.writeUInt32LE(centralBuf.length, 12)
  end.writeUInt32LE(centralStart, 16)
  return Buffer.concat([...locals, centralBuf, end])
}

function sheetXml(rows, widths) {
  const cols = (widths || []).map((width, i) => `<col min="${i + 1}" max="${i + 1}" width="${width}" customWidth="1"/>`).join("")
  const body = rows
    .map((row, r) => {
      const cells = row
        .map((value, c) => {
          if (value == null || value === "") return ""
          const ref = `${colLetter(c)}${r + 1}`
          if (typeof value === "number") return `<c r="${ref}"><v>${value}</v></c>`
          return `<c r="${ref}" t="inlineStr"><is><t xml:space="preserve">${encodeXml(value)}</t></is></c>`
        })
        .join("")
      return `<row r="${r + 1}">${cells}</row>`
    })
    .join("")
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
  <sheetViews><sheetView workbookViewId="0"><pane ySplit="1" topLeftCell="A2" activePane="bottomLeft" state="frozen"/></sheetView></sheetViews>
  <cols>${cols}</cols>
  <sheetData>${body}</sheetData>
</worksheet>`
}

// sheets: [{ name, rows, widths }]
export function writeWorkbook(filePath, sheets) {
  const files = {
    "[Content_Types].xml": `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>
  ${sheets.map((_, i) => `<Override PartName="/xl/worksheets/sheet${i + 1}.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>`).join("\n  ")}
</Types>`,
    "_rels/.rels": `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>
</Relationships>`,
    "xl/workbook.xml": `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <sheets>
    ${sheets.map((sheet, i) => `<sheet name="${encodeXml(sheet.name)}" sheetId="${i + 1}" r:id="rId${i + 1}"/>`).join("\n    ")}
  </sheets>
</workbook>`,
    "xl/_rels/workbook.xml.rels": `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  ${sheets.map((_, i) => `<Relationship Id="rId${i + 1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet${i + 1}.xml"/>`).join("\n  ")}
</Relationships>`,
  }
  sheets.forEach((sheet, i) => {
    files[`xl/worksheets/sheet${i + 1}.xml`] = sheetXml(sheet.rows, sheet.widths)
  })
  fs.writeFileSync(filePath, zipStore(files))
}
