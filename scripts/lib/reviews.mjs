import fs from "fs"
import path from "path"
import { root } from "./build-products.mjs"
import { rowsFromNamedHeaders } from "./csv.mjs"
import { listSheetNames, readSheetCells } from "./xlsx.mjs"

export const REVIEW_COLUMNS = {
  author: ["Author", "Ms/Mr from"],
  rating: ["Rating", "Stars"],
  date: ["Date"],
  product: ["Product", "Model"],
  quote: ["Quote", "Review", "Comment"],
  photo: ["Photo"],
  source: ["Source"],
}

const outPath = path.join(root, "src", "data", "reviews.js")
const csvPath = path.join(root, "sheet", "reviews.csv")

function asRating(value) {
  const num = Number(String(value || "5").replace(/[^\d.]/g, ""))
  if (!num) return 5
  return Math.min(5, Math.max(1, Math.round(num)))
}

function normalize(row) {
  const author = String(row.author || "").trim()
  const quote = String(row.quote || "").trim()
  if (!author) return null
  return {
    author,
    rating: asRating(row.rating),
    date: String(row.date || "").trim(),
    product: String(row.product || "").trim(),
    quote,
    photo: String(row.photo || "").trim() || undefined,
    source: String(row.source || "manual").trim() || "manual",
  }
}

function parseCsvLine(line) {
  const cells = []
  let current = ""
  let inQuotes = false
  for (let i = 0; i < line.length; i += 1) {
    const ch = line[i]
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"'
        i += 1
        continue
      }
      inQuotes = !inQuotes
      continue
    }
    if (ch === "," && !inQuotes) {
      cells.push(current.trim())
      current = ""
      continue
    }
    current += ch
  }
  cells.push(current.trim())
  return cells
}

export function reviewsFromCsv(filePath = csvPath) {
  if (!fs.existsSync(filePath)) return []
  const rows = fs
    .readFileSync(filePath, "utf8")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
  if (rows.length < 2) return []
  const headers = parseCsvLine(rows[0])
  const index = Object.fromEntries(
    Object.entries(REVIEW_COLUMNS).map(([key, aliases]) => [
      key,
      headers.findIndex((header) => aliases.some((alias) => alias.toLowerCase() === header.toLowerCase())),
    ]),
  )
  return rows.slice(1).flatMap((line) => {
    const cells = parseCsvLine(line)
    const row = {}
    for (const [key, pos] of Object.entries(index)) {
      row[key] = pos >= 0 ? cells[pos] : ""
    }
    return normalize(row) ? [normalize(row)] : []
  })
}

export function reviewsFromXlsx(xlsxPath) {
  try {
    const names = listSheetNames(xlsxPath)
    if (!names.some((name) => /^reviews?$/i.test(name))) return []
    const cells = readSheetCells(xlsxPath, names.find((name) => /^reviews?$/i.test(name)))
    const headers = (cells[0] || []).map((cell) => String(cell || "").toLowerCase())
    if (!headers.some((header) => header === "author" || header.includes("ms/mr"))) return []
    const rows = rowsFromNamedHeaders(cells, REVIEW_COLUMNS)
    return rows.map(normalize).filter(Boolean)
  } catch {
    return []
  }
}

export function writeReviews(reviews, { source }) {
  const list = reviews.filter(Boolean)
  fs.writeFileSync(
    outPath,
    `// Generated from ${source}.
// Easiest edit: sheet/reviews.csv  (Author, Rating, Date, Product, Quote)
// Or add a Reviews tab in the product xlsx with the same headers, then npm run import:xlsx
// Photos: INSTALL_PHOTOS = install shots only. GROUP_PHOTOS = customer/team group photos.
import { CUSTOMER_PHOTOS } from "./photos.js"

export const GOOGLE_REVIEWS_URL = "https://share.google/vWXCox9437yQaN0Cu"
export const GOOGLE_REVIEW_SUMMARY = { count: 23, url: GOOGLE_REVIEWS_URL }

export const REVIEWS = ${JSON.stringify(list, null, 2)}

export const INSTALL_PHOTOS = CUSTOMER_PHOTOS.filter((photo) => photo.kind === "install")
export const CUSTOMER_GROUP_PHOTOS = CUSTOMER_PHOTOS.filter((photo) => photo.kind === "customers")

export function reviewStats(reviews = REVIEWS) {
  const count = reviews.length
  const total = reviews.reduce((sum, review) => sum + Number(review.rating || 0), 0)
  const average = count ? Number((total / count).toFixed(1)) : 0
  return { count, average, best: 5 }
}
`,
  )
  console.log(`Wrote ${list.length} reviews to ${outPath}`)
}
