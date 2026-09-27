// Pulls the Google Sheet and regenerates src/data/subscribe2026.js and
// src/data/promos.js. See sheet/README.md for the sheet setup.
//
//   npm run sync -- <sheet-id-or-url>   first run, remembers the id
//   npm run sync                        afterwards
import fs from "fs"
import path from "path"
import { FIELD_ALIASES, buildProducts, mergePriorDetail, reportProducts, root, writeProducts } from "./lib/build-products.mjs"
import { isProductHeader, parseCsv, rowsFromNamedHeaders, rowsToColumnKeys, stripHeader } from "./lib/csv.mjs"
import { PROMO_COLUMNS, DEFAULT_PROMOS, buildPromos, writePromos } from "./lib/promos.mjs"

const idFile = path.join(root, "scripts", ".sheet-id")
const DEFAULT_SHEET = "1vrqUmJl7m2syIR58z63y3NRYPr-bf1wyE5VFiS4LS8o"
const PRODUCT_TABS = [null, "Products", "Sheet1"]

function resolveSheetId() {
  const raw = process.argv[2] || process.env.LG_SHEET_ID || (fs.existsSync(idFile) ? fs.readFileSync(idFile, "utf8").trim() : "") || DEFAULT_SHEET
  const fromUrl = raw.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/)
  return fromUrl ? fromUrl[1] : raw
}

function csvUrl(sheetId, tab) {
  const base = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv`
  return tab ? `${base}&sheet=${encodeURIComponent(tab)}` : base
}

async function fetchTab(sheetId, tab) {
  const response = await fetch(csvUrl(sheetId, tab))
  if (!response.ok) return { ok: false, status: response.status, text: "" }
  const text = await response.text()
  if (/^\s*</.test(text)) return { ok: false, status: 401, text }
  return { ok: true, status: response.status, text }
}

async function fetchProducts(sheetId) {
  for (const tab of PRODUCT_TABS) {
    const result = await fetchTab(sheetId, tab)
    if (!result.ok) continue
    const cells = parseCsv(result.text)
    if (isProductHeader(cells)) return { tab: tab || "(first sheet)", text: result.text, cells }
  }
  throw new Error(
    `Could not read a products table. Confirm the sheet is shared as "Anyone with the link can view" and the first row has Category and Model.`,
  )
}

const sheetId = resolveSheetId()
console.log(`Reading sheet ${sheetId}`)

const { tab, cells } = await fetchProducts(sheetId)
const productRows = rowsFromNamedHeaders(cells, FIELD_ALIASES)
const usable = productRows.filter((row) => row.category && row.name)
if (!usable.length) {
  throw new Error(`Tab "${tab}" has no usable rows. Need a Category and a Name on each product row.`)
}

const products = await mergePriorDetail(buildProducts(usable))
if (!products.length) throw new Error("Sheet produced zero products — refusing to overwrite the data file.")

writeProducts(products, { source: `Google Sheet ${sheetId} (tab "${tab}") via scripts/sync-sheet.mjs` })
reportProducts(products)

const promosResult = await fetchTab(sheetId, "Promos")
if (promosResult.ok) {
  const promoCells = parseCsv(promosResult.text)
  if (isProductHeader(promoCells)) {
    console.log('Tab "Promos" looks like the products table — leaving existing promo data alone.')
  } else {
    const headers = (promoCells[0] || []).map((cell) => String(cell || "").toLowerCase())
    if (headers.includes("offer")) {
      const promoRows = rowsToColumnKeys(stripHeader(promoCells, PROMO_COLUMNS), PROMO_COLUMNS)
      writePromos(buildPromos(promoRows), { source: `Google Sheet ${sheetId}` })
    } else {
      writePromos(DEFAULT_PROMOS, { source: "default first-9-months half price" })
    }
  }
}

fs.writeFileSync(idFile, sheetId)
console.log("Done. Restart the dev server or rebuild to see the changes.")
console.log(`Next time just run: npm run sync`)
