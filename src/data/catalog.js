import { PRODUCTS as BASE_PRODUCTS } from "./subscribe2026.js"
import { EXTRA_PRODUCTS, MERDEKA_PROMOS, patchProducts } from "./campaign.js"
import { PROMOS as SHEET_PROMOS } from "./promos.js"

function mergePromos(...lists) {
  const seen = new Set()
  const out = []
  for (const list of lists) {
    for (const promo of list) {
      const key = [promo.month, promo.scope, promo.offer, promo.type, promo.tenure, promo.care].join("|")
      if (seen.has(key)) continue
      seen.add(key)
      out.push(promo)
    }
  }
  return out
}

export const PROMOS = mergePromos(MERDEKA_PROMOS, SHEET_PROMOS)

function borrowSellingCopy(products) {
  for (const product of products) {
    if (!product.copyFeaturesFrom) continue
    const source = products.find((item) => item.model === product.copyFeaturesFrom)
    if (!source) continue
    if (source.quickFeatures?.length) product.quickFeatures = source.quickFeatures
    if (source.stories?.length) product.stories = source.stories
    if (source.tagline) product.tagline = source.tagline
  }
  return products
}

export const PRODUCTS = borrowSellingCopy(patchProducts([...BASE_PRODUCTS, ...EXTRA_PRODUCTS])).filter(
  (product) => !product.paused,
)

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
    blurb: "OLED and QNED screens for the living room.",
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
  if (want.length >= 3) {
    for (const code of productCodes(product)) {
      if (code === want) return 4
      if (want.length >= 5 && (code.startsWith(want) || want.startsWith(code))) return 4
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

export function promoForProductPlan(product, plan = {}, date = new Date()) {
  const specific = promoForProduct(product, date)
  if (specific && promoAppliesToPlan(specific, plan)) return specific
  return (
    bestPromo(
      promosForDate(date).filter((promo) => String(promo.scope ?? "").trim().toLowerCase() === "all"),
      product,
    ) ??
    bestPromo(fallbackPromos(date), product)
  )
}

export function promoAppliesToPlan(promo, plan = {}) {
  if (!promo) return false
  if (promo.tenure != null && plan.tenure != null && Number(promo.tenure) !== Number(plan.tenure)) return false
  if (promo.care && plan.care && promo.care !== plan.care) return false
  return true
}

export function applyPromo(monthly, promo, plan = {}) {
  if (monthly == null) return { list: null, now: null, introMonths: null, after: null }
  if (!promo || !promoAppliesToPlan(promo, plan)) {
    return { list: monthly, now: monthly, introMonths: null, after: null }
  }
  const after = promo.afterPrice ?? monthly
  if (promo.promoPrice != null) {
    return { list: after, now: promo.promoPrice, introMonths: promo.introMonths || null, after }
  }
  if (promo.percentOff) {
    return {
      list: monthly,
      now: Math.max(Math.ceil(Number((monthly * (1 - promo.percentOff / 100)).toFixed(2))), 0),
      introMonths: promo.introMonths || null,
      after,
    }
  }
  if (promo.extraOff) {
    return { list: monthly, now: Math.max(monthly - promo.extraOff, 0), introMonths: null, after: monthly }
  }
  return { list: monthly, now: monthly, introMonths: null, after: null }
}

export function dealForListing(product, specs) {
  const promo = promoForProduct(product)
  const locked = promo && (promo.tenure != null || promo.care)
  let list = lowestMonthlyFor(specs)
  if (locked) {
    let best = null
    const tenures = promo.tenure != null ? [promo.tenure] : [60, 84]
    const cares = promo.care ? [promo.care] : ["self", "combined", "visit", "none"]
    for (const spec of specs) {
      for (const tenure of tenures) {
        for (const care of cares) {
          const value = planPrice(spec, { payMode: "subscribe", tenure, care, cycle: 6 })
          if (isMoney(value) && (best == null || value < best)) best = value
        }
      }
    }
    if (best != null) list = best
  }
  if (promo?.afterPrice != null && promo.promoPrice != null) list = promo.afterPrice
  return { promo, ...applyPromo(list, promo, { tenure: promo?.tenure, care: promo?.care }) }
}

export function promoKind(promo) {
  if (!promo) return null
  if (promo.merdeka) return "merdeka"
  if (promo.type === "amount_off" || promo.extraOff) return "cash"
  if (promo.percentOff === 50 || /半价|half/i.test(`${promo.offer || ""} ${promo.badge || ""}`)) return "half"
  if (promo.percentOff >= 70) return "deep"
  if (promo.percentOff) return "percent"
  return "other"
}

export const PROMO_TABS = [
  { id: "half", label: "Half Price", short: "HALF PRICE" },
  { id: "deep", label: "77% Off", short: "77% OFF" },
  { id: "percent", label: "% Off", short: "% OFF" },
  { id: "merdeka", label: "10.10", short: "10.10" },
  { id: "cash", label: "RM Off", short: "RM OFF" },
]

const THEMES = {
  half: {
    kicker: "This month",
    badge: "HALF PRICE",
    className: "bg-[#FFB800] text-[#111] shadow-[0_10px_24px_rgba(255,184,0,0.38)]",
    tab: "bg-[#FFB800] text-[#111] ring-[#FFB800]",
    soft: "bg-[#FFF4CC] text-[#7A4B00]",
    price: "text-[#B8860B]",
  },
  deep: {
    kicker: "Limited intro",
    badge: "77% OFF",
    className: "bg-[#E10600] text-white shadow-[0_10px_24px_rgba(225,6,0,0.32)]",
    tab: "bg-[#E10600] text-white ring-[#E10600]",
    soft: "bg-[#FDECEC] text-[#E10600]",
    price: "text-[#E10600]",
  },
  percent: {
    kicker: "Intro offer",
    badge: "% OFF",
    className: "bg-[#FF5A1F] text-white shadow-[0_10px_24px_rgba(255,90,31,0.32)]",
    tab: "bg-[#FF5A1F] text-white ring-[#FF5A1F]",
    soft: "bg-[#FFE8DE] text-[#C2410C]",
    price: "text-[#C2410C]",
  },
  merdeka: {
    kicker: "10.10",
    badge: "10.10",
    className: "bg-[#111111] text-[#FFD100] shadow-[0_10px_24px_rgba(17,17,17,0.28)] ring-2 ring-[#E10600]",
    tab: "bg-[#111111] text-[#FFD100] ring-[#E10600]",
    soft: "bg-[#111111] text-[#FFD100]",
    price: "text-[#E10600]",
  },
  cash: {
    kicker: "Every month",
    badge: "RM OFF",
    className: "bg-[#0B8A5A] text-white shadow-[0_10px_24px_rgba(11,138,90,0.32)]",
    tab: "bg-[#0B8A5A] text-white ring-[#0B8A5A]",
    soft: "bg-[#E7F6EF] text-[#0B8A5A]",
    price: "text-[#0B8A5A]",
  },
  other: {
    kicker: "Offer",
    badge: "PROMO",
    className: "bg-lg-red text-white shadow-[0_10px_24px_rgba(165,0,52,0.28)]",
    tab: "bg-lg-red text-white ring-lg-red",
    soft: "bg-rose-50 text-lg-red",
    price: "text-lg-red",
  },
}

export function promoTheme(promo) {
  const kind = promoKind(promo)
  if (!kind) return null
  const theme = THEMES[kind] || THEMES.other
  const months = promo.introMonths
  const off = promo.percentOff
  const cash = promo.extraOff
  let badge = promo.badge || theme.badge
  let line = promo.title
  if (kind === "half") {
    badge = promo.badge || "HALF PRICE"
    line = months ? `First ${months} months` : "Pay half now"
  } else if (kind === "deep" || kind === "percent") {
    badge = promo.badge || `${off}% OFF`
    line = months ? `First ${months} months` : "Intro price"
  } else if (kind === "merdeka") {
    badge = promo.badge || "MERDEKA"
    line = promo.promoPrice != null ? `RM ${promo.promoPrice}/mth` : cash ? `RM${cash} off / month` : "10.10 October deal"
  } else if (kind === "cash") {
    badge = promo.badge || `RM${cash} OFF`
    line = "Every month"
  }
  return {
    kind,
    kicker: theme.kicker,
    badge,
    line,
    title: promo.title,
    className: theme.className,
    tab: theme.tab,
    soft: theme.soft,
    price: theme.price,
  }
}

export function promoCopy(promo, t) {
  const theme = promoTheme(promo)
  if (!theme) return null
  if (!t) return theme
  const kind = theme.kind
  const months = promo.introMonths
  const off = promo.percentOff
  const cash = promo.extraOff
  const price = promo.promoPrice
  const kicker = t(`promo.kicker.${kind}`)
  const badgeN = kind === "cash" || (kind === "merdeka" && (off == null || off === 0)) ? (price ?? cash) : (off ?? price ?? cash)
  let badge = t(`promo.badge.${kind}`, { n: badgeN })
  if ((kind === "deep" || kind === "percent" || (kind === "merdeka" && off)) && off != null) {
    badge = months ? t("promo.badge.percentYear", { n: off }) : t(off >= 70 ? "promo.badge.deep" : "promo.badge.percent", { n: off })
  }
  let line = theme.line
  if (kind === "half") line = months ? t("promo.line.halfMonths", { n: months }) : t("promo.line.half")
  else if (kind === "deep" || kind === "percent" || (kind === "merdeka" && off)) line = months ? t("promo.line.percentMonths", { n: months }) : t("promo.line.percent")
  else if (kind === "merdeka") {
    if (price != null) line = t("promo.line.merdekaPrice", { n: price })
    else if (cash) line = t("promo.line.merdekaCash", { n: cash })
    else line = t("promo.line.merdeka")
  } else if (kind === "cash") line = t("promo.line.cash")
  let detail
  if (months && price != null && promo.afterPrice != null) {
    detail = t("promo.detail.intro", { now: price, months, after: promo.afterPrice })
  } else if (price != null && promo.afterPrice != null) {
    detail = t("promo.detail.cash", { now: price, list: promo.afterPrice })
  }
  return { ...theme, kicker, badge, line, detail }
}

export function livePromoTabs(date = new Date()) {
  const counts = new Map()
  for (const listing of allListings()) {
    const kind = promoKind(promoForProduct(listing.product, date))
    if (!kind) continue
    counts.set(kind, (counts.get(kind) || 0) + 1)
  }
  return PROMO_TABS.filter((tab) => counts.get(tab.id)).map((tab) => ({ ...tab, count: counts.get(tab.id) }))
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
  const want = String(id || "").toLowerCase()
  return (
    PRODUCTS.find((item) => item.id === id) ??
    PRODUCTS.find((item) => item.model?.toLowerCase() === want) ??
    PRODUCTS.find((item) => item.sku?.toLowerCase() === want) ??
    PRODUCTS[0]
  )
}
