import fs from "fs"
import path from "path"
import { root } from "./build-products.mjs"
import { rowsFromNamedHeaders } from "./csv.mjs"
import { listSheetNames, readSheetCells } from "./xlsx.mjs"

const outPath = path.join(root, "src", "data", "careship.js")
const csvPath = path.join(root, "sheet", "careship.csv")

export const CARESHIP_COLUMNS = {
  category: ["Category"],
  model: ["Model"],
  name: ["Name"],
  colors: ["Variant/Color", "Variant", "Color", "Colours"],
  planType: ["Plan_Type", "Plan Type", "Plan"],
  year1: ["1_Year_RM", "1 Year", "1 Year RM"],
  year2: ["2_Year_RM", "2 Year", "2 Year RM"],
  details: ["Details"],
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

function money(value) {
  const text = String(value || "").trim()
  if (!text || /^n\/a$/i.test(text) || text === "-") return null
  const num = Number(text.replace(/[^\d.]/g, ""))
  return Number.isFinite(num) && num > 0 ? num : null
}

function splitList(value) {
  return String(value || "")
    .split(/[/|,]/)
    .map((item) => item.trim())
    .filter(Boolean)
}

function planKind(label) {
  const text = String(label || "").toLowerCase()
  if (text.includes("self")) return "self"
  if (text.includes("combine")) return "combine"
  if (text.includes("quarter") || text.includes("3mth") || text.includes("3 mth")) return "visit-q"
  if (text.includes("6mth") || text.includes("6 mth")) return "visit-6"
  return "visit"
}

function slug(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
}

function groupRows(rows) {
  const products = []
  const index = new Map()
  for (const row of rows) {
    const category = String(row.category || "").trim()
    const model = String(row.model || "").trim()
    const name = String(row.name || "").trim()
    const planType = String(row.planType || "").trim()
    if (!category || !model || !name || !planType) continue
    const key = `${category}|${model}|${name}`
    if (!index.has(key)) {
      const models = splitList(model)
      const product = {
        id: slug(models[0] || name),
        category,
        models,
        name,
        colors: splitList(row.colors),
        plans: [],
      }
      index.set(key, product)
      products.push(product)
    }
    const product = index.get(key)
    product.plans.push({
      kind: planKind(planType),
      label: planType,
      year1: money(row.year1),
      year2: money(row.year2),
      details: String(row.details || "").trim(),
    })
  }
  const rank = { self: 0, combine: 1, visit: 2, "visit-6": 2, "visit-q": 2 }
  for (const product of products) {
    product.plans.sort((a, b) => (rank[a.kind] ?? 9) - (rank[b.kind] ?? 9))
  }
  return products
}

export function careshipFromCsv(filePath = csvPath) {
  if (!fs.existsSync(filePath)) return []
  const lines = fs
    .readFileSync(filePath, "utf8")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
  if (lines.length < 2) return []
  const headers = parseCsvLine(lines[0])
  const index = Object.fromEntries(
    Object.entries(CARESHIP_COLUMNS).map(([key, aliases]) => [
      key,
      headers.findIndex((header) => aliases.some((alias) => alias.toLowerCase() === header.toLowerCase())),
    ]),
  )
  const rows = lines.slice(1).map((line) => {
    const cells = parseCsvLine(line)
    const row = {}
    for (const [key, pos] of Object.entries(index)) {
      row[key] = pos >= 0 ? cells[pos] : ""
    }
    return row
  })
  return groupRows(rows)
}

export function careshipFromXlsx(xlsxPath) {
  try {
    const names = listSheetNames(xlsxPath)
    const sheet = names.find((name) => /careship|care.?ship|maintenance/i.test(name))
    if (!sheet) return []
    const cells = readSheetCells(xlsxPath, sheet)
    const headers = (cells[0] || []).map((cell) => String(cell || "").toLowerCase())
    if (!headers.some((header) => header.includes("plan"))) return []
    return groupRows(rowsFromNamedHeaders(cells, CARESHIP_COLUMNS))
  } catch {
    return []
  }
}

export function writeCareship(products, { source }) {
  const categories = [...new Set(products.map((item) => item.category))].map((name) => ({
    id: name,
    name,
  }))
  fs.writeFileSync(
    outPath,
    `// Generated from ${source}.
// Edit sheet/careship.csv (or an Excel CareShip tab), then run npm run import:xlsx
// See HOW-TO-CARESHIP.md in the project root.

export const CARESHIP_CATEGORIES = ${JSON.stringify(categories, null, 2)}

export const PLAN_META = {
  "visit-q": { name: "Regular Visit", hint: "Technician every 3 months" },
  "visit-6": { name: "Regular Visit", hint: "Technician every 6 months" },
  visit: { name: "Regular Visit", hint: "1 technician visit per year" },
  self: { name: "Self-Service", hint: "Genuine filters delivered" },
  combine: { name: "Combine Maintenance", hint: "1 delivery + 1 visit each year" },
}

export const CARESHIP_PRODUCTS = ${JSON.stringify(products, null, 2)}

export function productsInCategory(category) {
  return CARESHIP_PRODUCTS.filter((item) => item.category === category)
}

export function yearsForPlan(plan) {
  return [1, 2].filter((year) => (year === 1 ? plan.year1 : plan.year2) != null)
}

export function planPrice(plan, years) {
  return years === 2 ? plan.year2 : plan.year1
}

export function compactModel(value) {
  return String(value || "")
    .toUpperCase()
    .replace(/O/g, "0")
    .replace(/[^A-Z0-9]/g, "")
}

export function matchCatalogProduct(product, catalog = []) {
  const codes = product.models.map(compactModel)
  return catalog.find((item) => {
    const keys = [item.model, item.sku, ...(item.colors || []).map((color) => color.model)]
    return keys.some((key) => {
      const compact = compactModel(key)
      return codes.some((code) => compact === code || compact.startsWith(code))
    })
  })
}
`,
  )
  console.log(`Wrote ${products.length} CareShip products to ${outPath}`)
}
