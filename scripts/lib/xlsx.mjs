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
