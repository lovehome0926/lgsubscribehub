// Pulls the Google Sheet and regenerates src/data/subscribe2026.js and
// src/data/promos.js. See sheet/README.md for the sheet setup.
//
//   npm run sync -- <sheet-id-or-url>   first run, remembers the id
//   npm run sync                        afterwards
import fs from "fs"
import path from "path"
import { COLUMNS, buildProducts, mergePriorDetail, reportProducts, root, writeProducts } from "./lib/build-products.mjs"
import { parseCsv, rowsToColumnKeys, stripHeader } from "./lib/csv.mjs"
import { PROMO_COLUMNS, buildPromos, writePromos } from "./lib/promos.mjs"

const idFile = path.join(root, "scripts", ".sheet-id")
const PRODUCTS_TAB = "Products"
const PROMOS_TAB = "Promos"

function resolveSheetId() {
  const raw = process.argv[2] || process.env.LG_SHEET_ID || (fs.existsSync(idFile) ? fs.readFileSync(idFile, "utf8").trim() : "")
  if (!raw) {
    console.error("No sheet id. Run: npm run sync -- <google-sheet-url-or-id>")
    console.error("See sheet/README.md for how to prepare the sheet.")
    process.exit(1)
  }
  const fromUrl = raw.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/)
  return fromUrl ? fromUrl[1] : raw
}

function csvUrl(sheetId, tab) {
  return `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(tab)}`
}

async function fetchTab(sheetId, tab, { required }) {
  const response = await fetch(csvUrl(sheetId, tab))
  if (!response.ok) {
    if (!required) {
      console.warn(`Tab "${tab}" not readable (HTTP ${response.status}) — leaving existing data alone.`)
      return null
    }
    throw new Error(
      `Could not read tab "${tab}" (HTTP ${response.status}). Confirm the sheet is shared as "Anyone with the link can view" and the tab is named "${tab}".`,
    )
  }
  const text = await response.text()
  // A sign-in redirect returns HTML instead of CSV.
  if (/^\s*</.test(text)) {
    throw new Error(
      `Tab "${tab}" returned a login page instead of CSV. Set sharing to "Anyone with the link can view".`,
    )
  }
  return text
}

const sheetId = resolveSheetId()
console.log(`Reading sheet ${sheetId}`)

const productsCsv = await fetchTab(sheetId, PRODUCTS_TAB, { required: true })
const productRows = rowsToColumnKeys(stripHeader(parseCsv(productsCsv), COLUMNS), COLUMNS)
const usable = productRows.filter((row) => row.A && row.C)
if (!usable.length) {
  throw new Error(`Tab "${PRODUCTS_TAB}" has no usable rows. Column A needs a category and column C a product name.`)
}

const products = await mergePriorDetail(buildProducts(usable))
if (!products.length) throw new Error("Sheet produced zero products — refusing to overwrite the data file.")

writeProducts(products, { source: `Google Sheet ${sheetId} (tab "${PRODUCTS_TAB}") via scripts/sync-sheet.mjs` })
reportProducts(products)

const promosCsv = await fetchTab(sheetId, PROMOS_TAB, { required: false })
if (promosCsv) {
  const promoRows = rowsToColumnKeys(stripHeader(parseCsv(promosCsv), PROMO_COLUMNS), PROMO_COLUMNS)
  writePromos(buildPromos(promoRows), { source: `Google Sheet ${sheetId}` })
}

fs.writeFileSync(idFile, sheetId)
console.log("Done. Restart the dev server or rebuild to see the changes.")
