// Shared transform for the "Promos" tab of the product sheet.
import fs from "fs"
import path from "path"
import { root } from "./build-products.mjs"

export const promosOutPath = path.join(root, "src", "data", "promos.js")

export const PROMO_COLUMNS = [
  { key: "A", header: "Month" },
  { key: "B", header: "Scope" },
  { key: "C", header: "Badge" },
  { key: "D", header: "Title" },
  { key: "E", header: "Detail" },
  { key: "F", header: "Extra Off (RM)" },
  { key: "G", header: "Extended" },
  { key: "H", header: "Start" },
  { key: "I", header: "End" },
]

function truthy(value) {
  return /^(y|yes|true|1)$/i.test(String(value ?? "").trim())
}

function isoDate(value) {
  const text = String(value ?? "").trim()
  if (!text) return null
  const date = new Date(text)
  if (Number.isNaN(date.getTime())) return null
  return date.toISOString().slice(0, 10)
}

export function buildPromos(rows) {
  const promos = []
  const seen = new Set()
  for (const row of rows) {
    const month = Number(String(row.A ?? "").trim())
    if (!Number.isInteger(month) || month < 1 || month > 12) continue
    const title = String(row.D ?? "").trim()
    if (!title) continue
    const scope = String(row.B ?? "").trim() || "all"
    // One promo per month+scope. A duplicate would make the winner arbitrary.
    const key = `${month}::${scope.toLowerCase()}`
    if (seen.has(key)) {
      console.warn(`Skipping duplicate promo for month ${month} scope "${scope}"`)
      continue
    }
    seen.add(key)
    const extraOff = Number(String(row.F ?? "").replace(/[^\d.-]/g, ""))
    promos.push({
      month,
      scope,
      badge: String(row.C ?? "").trim() || "SUBSCRIBE",
      title,
      detail: String(row.E ?? "").trim(),
      extraOff: Number.isFinite(extraOff) ? extraOff : 0,
      extended: truthy(row.G),
      start: isoDate(row.H),
      end: isoDate(row.I),
    })
  }
  return promos.sort((a, b) => a.month - b.month || a.scope.localeCompare(b.scope))
}

export function promosToRows(promos) {
  return promos.map((promo) => [
    promo.month,
    promo.scope,
    promo.badge,
    promo.title,
    promo.detail,
    promo.extraOff,
    promo.extended ? "Yes" : "",
    promo.start ?? "",
    promo.end ?? "",
  ])
}

export function writePromos(promos, { source }) {
  const banner = `// Generated from the "Promos" tab of ${source}.
// Re-run scripts/sync-sheet.mjs to refresh.
//
// scope: "all" for a site-wide promo, or a category group id (water-air, cooling,
// laundry, kitchen, living), a category name (Refrigerators), or a single model
// (GC-X24FFC7R). The most specific match wins on a product page.
// extraOff: ringgit taken off the monthly fee. 0 means messaging only.
// start/end: optional ISO dates. Empty means the whole month.
export const PROMOS = ${JSON.stringify(promos, null, 2)}
`
  fs.writeFileSync(promosOutPath, banner)
  console.log(`Wrote ${promos.length} promos to ${promosOutPath}`)
}
