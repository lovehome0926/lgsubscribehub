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

function colorsForSpecs(product, specs) {
  const ids = new Set(specs.map((spec) => spec.id))
  return product.colors.filter((color) => {
    if (color.specIds?.some((id) => ids.has(id))) return true
    return specs.some((spec) => color.variants?.[spec.id])
  })
}

function listingModel(product, specs, colors) {
  const spec = specs[0]
  const color = colors[0]
  return color?.variants?.[spec.id]?.model || color?.model || product.model
}

// One shop card. Same-price colours stay together. Different prices or models
// become their own card — except TVs of the same series, which keep sizes on one card.
export function toListings(product) {
  const keepTogether = product.type === "tv"
  const groups = keepTogether ? [product.specs] : product.specs.map((spec) => [spec])
  return groups.map((specs) => {
    const split = !keepTogether && product.specs.length > 1
    const colors = colorsForSpecs(product, specs)
    const spec = specs[0]
    const usefulSpec = spec?.label && /hp|kg|\dL\b|"|inch/i.test(spec.label)
    return {
      id: split ? `${product.id}--${spec.id}` : product.id,
      productId: product.id,
      specIds: specs.map((item) => item.id),
      product,
      specs,
      colors,
      title: split || (usefulSpec && specs.length === 1) ? `${product.shortName} · ${spec.label}` : product.shortName,
      model: listingModel(product, specs, colors),
      specLabel: product.specLabel,
      split,
    }
  })
}

export function allListings() {
  return PRODUCTS.flatMap(toListings)
}

export function groupedCatalog() {
  return CATEGORY_GROUPS.map((group) => ({
    group,
    listings: productsInGroup(group.id).flatMap(toListings),
  })).filter((entry) => entry.listings.length > 0)
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

function compactCode(value) {
  return String(value ?? "")
    .split(".")[0]
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "")
}

function productCodes(product) {
  const codes = new Set()
  const add = (value) => {
    const code = compactCode(value)
    if (code) codes.add(code)
  }
  add(product.model)
  add(product.sku)
  for (const color of product.colors ?? []) {
    add(color.model)
    for (const variant of Object.values(color.variants ?? {})) add(variant.model)
  }
  return codes
}

export function promosForDate(date = new Date()) {
  const month = date.getMonth() + 1
  return PROMOS.filter((promo) => promo.month === month && withinWindow(promo, date))
}

export function fallbackPromos(date = new Date()) {
  return PROMOS.filter((promo) => promo.month === 0 && withinWindow(promo, date))
}

// How closely a promo's scope targets a product. Higher wins; -1 means no match.
function scopeRank(scope, product) {
  const target = String(scope ?? "").trim()
  if (!target || target.toLowerCase() === "all") return 0
  if (groupOf(product)?.id === target) return 1
  if (product.category?.toLowerCase() === target.toLowerCase()) return 2

  const want = compactCode(target)
  if (want.length >= 5) {
    for (const code of productCodes(product)) {
      if (code === want || code.startsWith(want) || want.startsWith(code)) return 4
    }
  }
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
function bestPromo(list, product) {
  let best = null
  let bestRank = -1
  for (const promo of list) {
    const rank = scopeRank(promo.scope, product)
    if (rank > bestRank) {
      best = promo
      bestRank = rank
    }
  }
  return bestRank >= 0 ? best : null
}

export function promoForProduct(product, date = new Date()) {
  return bestPromo(promosForDate(date), product) ?? bestPromo(fallbackPromos(date), product)
}

export function applyPromo(monthly, promo) {
  if (monthly == null) return { list: null, now: null, introMonths: null }
  if (!promo) return { list: monthly, now: monthly, introMonths: null }
  if (promo.percentOff) {
    return {
      list: monthly,
      now: Math.max(Math.round(monthly * (1 - promo.percentOff / 100)), 0),
      introMonths: promo.introMonths || null,
    }
  }
  if (promo.extraOff) {
    return { list: monthly, now: Math.max(monthly - promo.extraOff, 0), introMonths: null }
  }
  return { list: monthly, now: monthly, introMonths: null }
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

export function pricedTenures(spec) {
  return Object.keys(spec.pricing.subscribe || {})
    .map(Number)
    .filter((tenure) => tenurePriced(spec, tenure))
    .sort((a, b) => b - a)
}

export function visitCycles(spec, tenure) {
  const visit = spec.pricing.subscribe?.[tenure]?.visit || {}
  return [6, 12, 24].filter((cycle) => isMoney(visit[cycle]))
}

export function careOptions(spec, tenure) {
  const rows =
    tenure != null
      ? [spec.pricing.subscribe?.[tenure]].filter(Boolean)
      : Object.values(spec.pricing.subscribe || {})
  const has = (key) => rows.some((row) => isMoney(row?.[key]))
  const hasVisit = rows.some((row) => [6, 12, 24].some((cycle) => isMoney(row?.visit?.[cycle])))
  const list = []
  if (has("self")) list.push("self")
  if (has("combined")) list.push("combined")
  if (hasVisit) list.push("visit")
  if (!list.length && has("none")) list.push("none")
  return list
}

export function outrightAmount(spec, care = "self") {
  const outright = spec?.pricing?.outright
  if (isMoney(outright)) return outright
  if (outright && typeof outright === "object") {
    if (isMoney(outright[care])) return outright[care]
    return ["self", "combined", "visit"].map((key) => outright[key]).find(isMoney) ?? null
  }
  return null
}

export function hasOutrightPrice(spec) {
  return isMoney(outrightAmount(spec))
}

// Only water outright splits CareShip™ into Self / Combine / Regular Visit.
// Each plan includes free 1-year warranty and 1-year CareShip™, at its own buyout price.
export function outrightCareOptions(product, spec) {
  if (product?.type !== "water") return []
  const outright = spec?.pricing?.outright
  if (outright && typeof outright === "object") {
    return ["self", "combined", "visit"].filter((key) => isMoney(outright[key]))
  }
  return isMoney(outright) ? ["self"] : []
}

export function planCareOptions(product, spec, { payMode, tenure }) {
  if (payMode === "outright") return outrightCareOptions(product, spec)
  return product.hasCare ? careOptions(spec, tenure) : []
}

export function planPrice(spec, { payMode, tenure, care, cycle }) {
  if (payMode === "outright") return outrightAmount(spec, care)
  const row = spec.pricing.subscribe?.[tenure]
  if (!row) return null
  if (care === "visit") return isMoney(row.visit?.[cycle]) ? row.visit[cycle] : null
  return isMoney(row[care]) ? row[care] : null
}

export function lowestMonthlyFor(specs) {
  let best = null
  for (const spec of specs) {
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

export function lowestMonthly(product) {
  return lowestMonthlyFor(product.specs)
}

export const startingMonthly = lowestMonthly

export function productById(id) {
  return (
    PRODUCTS.find((item) => item.id === id) ??
    PRODUCTS.find((item) => item.model?.toLowerCase() === String(id || "").toLowerCase()) ??
    PRODUCTS[0]
  )
}
