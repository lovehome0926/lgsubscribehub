import { PRODUCTS } from "./subscribe2026.js"
import { PROMOS } from "./promos.js"

export const CDN = "https://www.lg.com/content/dam"

export const LOGO = `${CDN}/lge/common/logo/logo-lg-100-44.svg`
export const SUB_LOGO = `${CDN}/channel/wcms/my/lg-subscribe/images/LG-Subscribe-Logo.png`

export const IMG = {
  heroOnline: `${CDN}/channel/wcms/my/lg-subscribe/images/LG-Subscribe-Online-Store-Launch-Microsite-Hero-Banner-D.jpg`,
  heroSubscribe: `${CDN}/channel/wcms/my/lg-subscribe/images/lg-subscribe-2025-banner-D.jpg`,
  cardFamily: `${CDN}/channel/wcms/my/lg-subscribe/images/card_img01.jpg`,
  cardHome: `${CDN}/channel/wcms/my/lg-subscribe/images/card_img02.jpg`,
  cardAir: `${CDN}/channel/wcms/my/lg-subscribe/images/img_airpurifier04.jpg`,
  selfCare: `${CDN}/channel/wcms/my/2025-hs-contents/common/subscribe-feature-card/my/feature/thumbnail/lg-subscribe-2025-feature-self-care-water-purifiers-thumbnail.jpg`,
  waterLifestyle: `${CDN}/channel/wcms/my/images/puricare/wd518an_albrlml_eaml_my_c/gallery/WD518AN-DZ-11.jpg`,
  hygiene: `${CDN}/channel/wcms/my/images/HA-Puricare-ATOM-V-05-05-Hygiene-desktop.mp4`,
  hygienePoster: `${CDN}/channel/wcms/my/images/HA-Puricare-ATOM-V-05-05-Hygiene-desktop(thumbnail).jpg`,
}

// Shopfront grouping. `categories` holds the fine-grained values found on each product.
export const CATEGORY_GROUPS = [
  {
    id: "water-air",
    name: "Water & Air",
    blurb: "Purified water and cleaner air for every room.",
    categories: ["Water Purifiers", "Air Purifiers"],
  },
  {
    id: "cooling",
    name: "Air Conditioners",
    blurb: "DUALCOOL and ARTCOOL inverter cooling.",
    categories: ["Air Conditioners"],
  },
  {
    id: "laundry",
    name: "Laundry & Care",
    blurb: "Washers, dryers, WashTower and Styler garment care.",
    categories: ["Washers", "Washer Dryers", "Dryers", "Styler"],
  },
  {
    id: "kitchen",
    name: "Kitchen",
    blurb: "InstaView refrigerators and QuadWash dishwashers.",
    categories: ["Refrigerators", "Dishwashers"],
  },
  {
    id: "living",
    name: "TV & Living",
    blurb: "OLED and QNED screens plus massage recliners.",
    categories: ["TVs", "Massage Chairs"],
  },
]

const GROUP_BY_CATEGORY = new Map(
  CATEGORY_GROUPS.flatMap((group) => group.categories.map((category) => [category, group])),
)

export function groupOf(product) {
  return GROUP_BY_CATEGORY.get(product.category) ?? null
}

export function groupById(id) {
  return CATEGORY_GROUPS.find((group) => group.id === id) ?? null
}

export function productsInGroup(groupId) {
  return PRODUCTS.filter((product) => groupOf(product)?.id === groupId)
}

// Groups in declared order, each with its products. Empty groups are dropped so a
// removed product line cannot leave a dead tab behind.
export function groupedCatalog() {
  return CATEGORY_GROUPS.map((group) => ({ group, products: productsInGroup(group.id) })).filter(
    (entry) => entry.products.length > 0,
  )
}

export { PROMOS }

function withinWindow(promo, date) {
  if (promo.start && date < new Date(promo.start)) return false
  // Inclusive end date: an end of 2026-06-30 still runs through that day.
  if (promo.end) {
    const end = new Date(promo.end)
    end.setHours(23, 59, 59, 999)
    if (date > end) return false
  }
  return true
}

export function promosForDate(date = new Date()) {
  const month = date.getMonth() + 1
  return PROMOS.filter((promo) => promo.month === month && withinWindow(promo, date))
}

// How closely a promo's scope targets a product. Higher wins; -1 means no match.
function scopeRank(scope, product) {
  const target = String(scope ?? "").trim().toLowerCase()
  if (!target || target === "all") return 0
  if (groupOf(product)?.id === target) return 1
  if (product.category?.toLowerCase() === target) return 2

  const models = new Set()
  if (product.model) models.add(product.model.toLowerCase())
  for (const color of product.colors ?? []) {
    if (color.model) models.add(color.model.toLowerCase())
    for (const variant of Object.values(color.variants ?? {})) {
      if (variant.model) models.add(variant.model.toLowerCase())
    }
  }
  if (models.has(target)) return 3

  return -1
}

// Site-wide promo for the month, used for generic banners and badges.
export function promoForDate(date = new Date()) {
  return (
    promosForDate(date).find((promo) => {
      const scope = String(promo.scope ?? "").trim().toLowerCase()
      return !scope || scope === "all"
    }) ?? null
  )
}

// Most specific promo that applies to one product: model beats category, which
// beats category group, which beats the site-wide promo.
export function promoForProduct(product, date = new Date()) {
  let best = null
  let bestRank = -1
  for (const promo of promosForDate(date)) {
    const rank = scopeRank(promo.scope, product)
    if (rank > bestRank) {
      best = promo
      bestRank = rank
    }
  }
  return best
}

export const SERVICES = {
  self: {
    id: "self",
    name: "Self-Service",
    frequency: "Every 6 months",
    blurb: "Replacement filters shipped to your home. Twist-and-replace at your convenience.",
  },
  combined: {
    id: "combined",
    name: "Combined Maintenance",
    official: "Combine Maintenance",
    frequency: "Every 12 months",
    blurb: "Self-Service filter delivery plus one LG authorised visit each year.",
  },
  visit: {
    id: "visit",
    name: "Regular Visit",
    frequency: "Every 6 months",
    blurb: "LG-authorised technicians handle hygiene, filters and performance checks.",
  },
  none: {
    id: "none",
    name: "No Service (Standard Warranty)",
    frequency: "Manufacturer warranty",
    blurb: "TVs include LG standard warranty only. CareShip™ visit plans do not apply.",
  },
}

export { PRODUCTS }

export function isMoney(value) {
  return typeof value === "number" && Number.isFinite(value)
}

export function tenurePriced(spec, tenure) {
  const row = spec.pricing.subscribe?.[tenure]
  if (!row) return false
  if (isMoney(row.self) || isMoney(row.combined) || isMoney(row.none)) return true
  return [6, 12, 24].some((cycle) => isMoney(row.visit?.[cycle]))
}

export function careOptions(spec) {
  const rows = Object.values(spec.pricing.subscribe || {})
  const has = (key) => rows.some((row) => isMoney(row?.[key]))
  const hasVisit = rows.some((row) => [6, 12, 24].some((cycle) => isMoney(row?.visit?.[cycle])))
  const list = []
  if (has("self")) list.push("self")
  if (has("combined")) list.push("combined")
  if (hasVisit) list.push("visit")
  if (!list.length && has("none")) list.push("none")
  return list
}

export function planPrice(spec, { payMode, tenure, care, cycle }) {
  if (payMode === "outright") return isMoney(spec.pricing.outright) ? spec.pricing.outright : null
  const row = spec.pricing.subscribe?.[tenure]
  if (!row) return null
  if (care === "visit") return isMoney(row.visit?.[cycle]) ? row.visit[cycle] : null
  return isMoney(row[care]) ? row[care] : null
}

export function lowestMonthly(product) {
  let best = null
  for (const spec of product.specs) {
    for (const row of Object.values(spec.pricing.subscribe || {})) {
      for (const key of ["self", "combined", "none"]) {
        if (isMoney(row[key]) && (best == null || row[key] < best)) best = row[key]
      }
      for (const cycle of [6, 12, 24]) {
        const value = row.visit?.[cycle]
        if (isMoney(value) && (best == null || value < best)) best = value
      }
    }
  }
  return best
}

export const startingMonthly = lowestMonthly

export function productById(id) {
  return PRODUCTS.find((item) => item.id === id) ?? PRODUCTS[0]
}
