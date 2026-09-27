// Writes a ready-to-edit workbook you can open in Excel or upload to Google Sheets.
import fs from "fs"
import path from "path"
import { PRODUCTS } from "../src/data/subscribe2026.js"
import { PROMOS } from "../src/data/promos.js"
import { root } from "./lib/build-products.mjs"
import { writeWorkbook } from "./lib/xlsx.mjs"
import { promosToRows, PROMO_COLUMNS } from "./lib/promos.mjs"

const CATEGORY_OUT = {
  water: "Water Purifier",
  air: "Air Purifier",
  styler: "Styler",
  massage: "Massage Chair",
  ac: "Air Conditioner",
  washer: "Washer",
  dryer: "Dryer",
  fridge: "Refrigerator",
  dish: "Dishwasher",
  tv: "TV",
}

const HEADERS = [
  "Category",
  "Model",
  "Name",
  "Specs/Variant",
  "Outright_Price_MYR",
  "Outright_Self_MYR",
  "Outright_Combine_MYR",
  "Outright_Regular_MYR",
  "Sub_7Yr_Self_MYR",
  "Sub_7Yr_Combine_MYR",
  "Sub_7Yr_Regular_6m_MYR",
  "Sub_7Yr_Regular_12m_MYR",
  "Sub_7Yr_Regular_24m_MYR",
  "Sub_5Yr_Self_MYR",
  "Sub_5Yr_Combine_MYR",
  "Sub_5Yr_Regular_6m_MYR",
  "Sub_5Yr_Regular_12m_MYR",
  "Sub_5Yr_Regular_24m_MYR",
  "LG HQ Detail Page URL",
  "Copy_Features_From",
  "Hero_Image",
]

function moneyCell(value) {
  return typeof value === "number" ? value : ""
}

function productName(product, spec) {
  if (product.type === "ac") return `${product.shortName} (${spec.label.replace(/\s+/g, "")})`
  return product.shortName
}

function variantLabel(product, color, spec) {
  const colorName = color.name && color.name !== "Default" ? color.name : ""
  if (product.type === "tv") return `${String(spec.label).replace(/"/g, "")} inch`
  if (product.type === "ac") return colorName || spec.label || ""
  if (product.type === "water") {
    const waters = spec.waters?.length ? spec.waters.join(" ") : spec.label.replace(/ \/ /g, " ")
    return colorName ? `${waters} (${colorName})` : waters
  }
  if (colorName && spec.label && spec.label !== product.shortName && spec.label !== "Standard") {
    return `${colorName} (${spec.label})`
  }
  return colorName || spec.label || ""
}

function planAmount(plan, key) {
  if (!plan) return ""
  if (key === "self") return moneyCell(plan.self ?? plan.none)
  return moneyCell(plan[key])
}

function outrightCells(product, spec) {
  const outright = spec.pricing.outright
  if (outright && typeof outright === "object") {
    return [moneyCell(outright.self), moneyCell(outright.self), moneyCell(outright.combined), moneyCell(outright.visit)]
  }
  if (product.type === "water" && typeof outright === "number") {
    return [outright, outright, outright + 400, outright + 800]
  }
  return [moneyCell(outright), "", "", ""]
}

function featureSourceCell(product) {
  if (product.copyFeaturesFrom) return product.copyFeaturesFrom
  if (product.featureSource && !(product.colors || []).some((color) => Object.values(color.variants || {}).some((variant) => variant.url))) {
    return product.featureSource
  }
  return ""
}

function heroCell(color, variant) {
  const image = variant?.image || color.image || ""
  if (!image) return ""
  if (image.startsWith("/products/")) return image.slice("/products/".length)
  if (variant?.url) return ""
  if (/lg-subscribe-2025-banner/i.test(image)) return ""
  if (/^https?:\/\//i.test(image)) return image
  return image
}

function categoryOf(product) {
  if (product.category === "Washer Dryers") return "Washer Dryer"
  if (product.category === "Washers" && /top/i.test(product.shortName)) return "Top Loader"
  return CATEGORY_OUT[product.type] || product.category
}

function productRows() {
  const rows = [HEADERS]
  for (const product of PRODUCTS) {
    for (const color of product.colors) {
      for (const spec of product.specs) {
        const variant = color.variants?.[spec.id]
        if (!variant && color.specIds?.length && !color.specIds.includes(spec.id)) continue
        const sub = spec.pricing.subscribe || {}
        const seven = sub[84] || {}
        const five = sub[60] || {}
        rows.push([
          categoryOf(product),
          variant?.model || color.model || product.model,
          productName(product, spec),
          variantLabel(product, color, spec),
          ...outrightCells(product, spec),
          planAmount(seven, "self"),
          planAmount(seven, "combined"),
          moneyCell(seven.visit?.[6]),
          moneyCell(seven.visit?.[12]),
          moneyCell(seven.visit?.[24]),
          planAmount(five, "self"),
          planAmount(five, "combined"),
          moneyCell(five.visit?.[6]),
          moneyCell(five.visit?.[12]),
          moneyCell(five.visit?.[24]),
          variant?.url || "",
          featureSourceCell(product),
          heroCell(color, variant),
        ])
      }
    }
  }
  return rows
}

const howTo = [
  ["怎么改商品"],
  ["1. 只改 Products 这一页。价格格子留空 = 网站不显示那个选项。"],
  ["2. 同一型号的不同颜色可以多行，Name 保持一样。不同型号请分行，不要混。"],
  ["3. 冷气上门：填 6m 和 12m 两列。冰箱上门：填 12m 和 24m 两列。"],
  ["4. 改完有两种更新网站的方法："],
  ["   A. 保存这个 xlsx，在项目文件夹跑：npm run import:xlsx"],
  ["   B. 把这个文件导入 Google 表格（文件 → 导入 → 替换整个表格），再跑：npm run sync"],
  ["5. 有官网链接就填 LG HQ Detail Page URL。没有链接时：Copy_Features_From 填一个同系列型号，卖点文案会沿用过去。"],
  ["6. 主图自己找：把照片放进项目的 public/products/ 文件夹，文件名写成 型号.jpg（例如 FX1412S5GR.jpg），或填 Hero_Image 列。"],
  [""],
  ["列说明"],
  ["Category", "只能填：Water Purifier / Air Purifier / Air Conditioner / Washer / Washer Dryer / Top Loader / Dryer / Refrigerator / Dishwasher / Styler / Massage Chair / TV"],
  ["Model", "型号。WD518AN 和 WD516AN 会变成两张卡"],
  ["Name", "商品名。冷气写成 DUALCOOL AI (1.5HP)"],
  ["Specs/Variant", "颜色或规格，例如 Calming Beige、Matte Black (12kg)、55 inch"],
  ["Outright_Price_MYR", "买断价（非水机）。水机可留空，改用后面三列"],
  ["Outright_Self_MYR", "水机买断 Self-Service（含 1 年保修 + 1 年 CareShip）"],
  ["Outright_Combine_MYR", "水机买断 Combine Maintenance"],
  ["Outright_Regular_MYR", "水机买断 Regular Visit"],
  ["Sub_7Yr_Self_MYR", "7年 Self-Service"],
  ["Sub_7Yr_Combine_MYR", "7年 Combine"],
  ["Sub_7Yr_Regular_6m_MYR", "7年 Regular Visit 每6个月"],
  ["Sub_7Yr_Regular_12m_MYR", "7年 Regular Visit 每12个月"],
  ["Sub_7Yr_Regular_24m_MYR", "7年 Regular Visit 每24个月"],
  ["Sub_5Yr_Self_MYR", "5年 Self-Service"],
  ["Sub_5Yr_Combine_MYR", "5年 Combine"],
  ["Sub_5Yr_Regular_6m_MYR", "5年 Regular Visit 每6个月"],
  ["Sub_5Yr_Regular_12m_MYR", "5年 Regular Visit 每12个月"],
  ["Sub_5Yr_Regular_24m_MYR", "5年 Regular Visit 每24个月"],
  ["LG HQ Detail Page URL", "LG 官网链接。没有就留空"],
  ["Copy_Features_From", "没有官网时，填一个同 feature 的型号，例如 F2520SNEKR"],
  ["Hero_Image", "主图文件名或链接。也可把照片丢进 public/products/型号.jpg"],
  [""],
  ["怎么改优惠（Promos 页）"],
  ["每个月有 memo 就加一行。Model 填型号，不要填整个分类。"],
  ["没有特别优惠的月份不用加行：网站会用 default 那一行（前9个月半价）。"],
  ["Offer 可以直接写 memo 原文："],
  ["  前12m 77% off"],
  ["  前7m 77% off"],
  ["  前9m半价"],
  ["  Merdeka RM20 off"],
  ["  Merdeka RM31 off"],
  ["  RM5 off"],
  ["  RM10 off"],
  ["Month 填 1–12，或填 default 作为没有 memo 时的兜底。"],
]

const outDir = path.join(root, "sheet")
fs.mkdirSync(outDir, { recursive: true })
const projectPath = path.join(outDir, "LG_Subscribe_Products_2026.xlsx")
const desktopPath = path.join("C:/Users/PC/Desktop", "LG_Subscribe_Products_2026.xlsx")

const workbook = [
  {
    name: "Products",
    rows: productRows(),
    widths: [18, 16, 36, 36, 14, 14, 14, 14, 14, 14, 16, 16, 16, 14, 14, 16, 16, 16, 55, 20, 28],
  },
  {
    name: "Promos",
    rows: [PROMO_COLUMNS.map((column) => column.header), ...promosToRows(PROMOS)],
    widths: [10, 16, 22, 14, 36, 70, 12, 12],
  },
  { name: "How to use", rows: howTo, widths: [36, 90] },
]

writeWorkbook(projectPath, workbook)
try {
  fs.copyFileSync(projectPath, desktopPath)
  console.log(`Wrote ${productRows().length - 1} product rows`)
  console.log(projectPath)
  console.log(desktopPath)
} catch (error) {
  console.log(`Wrote ${productRows().length - 1} product rows`)
  console.log(projectPath)
  console.warn(`Could not copy to Desktop (${error.code}). Close the Excel file and run npm run sheet:xlsx again.`)
}
