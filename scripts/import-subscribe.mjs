// Imports prices from the project workbook (or any path you pass).
// For the Google Sheet workflow use scripts/sync-sheet.mjs instead.
import path from "path"
import { buildProducts, mergePriorDetail, reportProducts, writeProducts, FIELD_ALIASES, root } from "./lib/build-products.mjs"
import { rowsFromNamedHeaders, rowsToColumnKeys, stripHeader } from "./lib/csv.mjs"
import { buildPromos, writePromos, PROMO_COLUMNS, DEFAULT_PROMOS } from "./lib/promos.mjs"
import { readSheetCells } from "./lib/xlsx.mjs"
import { publishPhotos } from "./publish-photos.mjs"
import { reviewsFromCsv, reviewsFromXlsx, writeReviews } from "./lib/reviews.mjs"
import { careshipFromCsv, careshipFromXlsx, writeCareship } from "./lib/careship.mjs"

const xlsxPath = process.argv[2] || path.join(root, "sheet", "LG_Subscribe_Products_2026.xlsx")

const productCells = readSheetCells(xlsxPath, "Products")
const rows = rowsFromNamedHeaders(productCells, FIELD_ALIASES)
const products = await mergePriorDetail(buildProducts(rows))
writeProducts(products, { source: `${path.basename(xlsxPath)} via scripts/import-subscribe.mjs` })
reportProducts(products)

try {
  const promoCells = readSheetCells(xlsxPath, "Promos")
  const headers = (promoCells[0] || []).map((cell) => String(cell || "").toLowerCase())
  if (headers.includes("offer")) {
    const promoRows = rowsToColumnKeys(stripHeader(promoCells, PROMO_COLUMNS), PROMO_COLUMNS)
    writePromos(buildPromos(promoRows), { source: path.basename(xlsxPath) })
  } else {
    writePromos(DEFAULT_PROMOS, { source: "default first-9-months half price" })
  }
} catch (error) {
  console.warn(`Skipped Promos tab: ${error.message}`)
  writePromos(DEFAULT_PROMOS, { source: "default first-9-months half price" })
}

publishPhotos()
const fromSheet = reviewsFromXlsx(xlsxPath)
const fromCsv = reviewsFromCsv()
writeReviews(fromSheet.length ? fromSheet : fromCsv, {
  source: fromSheet.length ? `${path.basename(xlsxPath)} Reviews tab` : "sheet/reviews.csv",
})

const careshipSheet = careshipFromXlsx(xlsxPath)
const careshipCsv = careshipFromCsv()
writeCareship(careshipSheet.length ? careshipSheet : careshipCsv, {
  source: careshipSheet.length ? `${path.basename(xlsxPath)} CareShip tab` : "sheet/careship.csv",
})
