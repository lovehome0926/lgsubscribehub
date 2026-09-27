// Imports prices from the local LG_Subscribe_Products_2026.xlsx.
// For the Google Sheet workflow use scripts/sync-sheet.mjs instead.
import { buildProducts, mergePriorDetail, reportProducts, writeProducts } from "./lib/build-products.mjs"
import { readSheet } from "./lib/xlsx.mjs"

const xlsxPath = process.argv[2] || "C:/Users/PC/Downloads/LG_Subscribe_Products_2026.xlsx"

const rows = readSheet(xlsxPath)
const products = await mergePriorDetail(buildProducts(rows))
writeProducts(products, { source: "LG_Subscribe_Products_2026.xlsx via scripts/import-subscribe.mjs" })
reportProducts(products)
