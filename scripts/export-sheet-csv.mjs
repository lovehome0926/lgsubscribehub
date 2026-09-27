// Writes sheet/products.csv and sheet/promos.csv, ready to import into Google
// Sheets (File > Import > Replace current sheet). One-off setup step: after the
// sheet exists, scripts/sync-sheet.mjs becomes the source of truth.
import fs from "fs"
import path from "path"
import { COLUMNS, root } from "./lib/build-products.mjs"
import { toCsv } from "./lib/csv.mjs"
import { PROMO_COLUMNS, promosToRows } from "./lib/promos.mjs"
import { readSheet } from "./lib/xlsx.mjs"
import { PROMOS } from "../src/data/promos.js"

const xlsxPath = process.argv[2] || "C:/Users/PC/Downloads/LG_Subscribe_Products_2026.xlsx"
const outDir = path.join(root, "sheet")

fs.mkdirSync(outDir, { recursive: true })

const rows = readSheet(xlsxPath)
const productRows = rows
  .filter((row) => row.A && row.C)
  .map((row) => COLUMNS.map((column) => row[column.key] ?? ""))

const productsCsv = toCsv([COLUMNS.map((column) => column.header), ...productRows])
fs.writeFileSync(path.join(outDir, "products.csv"), productsCsv)
console.log(`Wrote ${productRows.length} product rows to sheet/products.csv`)

const promosCsv = toCsv([PROMO_COLUMNS.map((column) => column.header), ...promosToRows(PROMOS)])
fs.writeFileSync(path.join(outDir, "promos.csv"), promosCsv)
console.log(`Wrote ${PROMOS.length} promo rows to sheet/promos.csv`)
