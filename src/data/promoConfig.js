// November 2026 specials sit on top of the ongoing 50% first-9-months rate.
// They never replace the normal monthly price stored on the product, and they do not stack.

const NOV_WIN = { start: "2026-11-01", end: "2026-11-30" }

export const CAMPAIGN = {
  id: "november-ohsem-2026",
  name: "LG November OHSEM Promotion 2026",
  start: NOV_WIN.start,
  end: NOV_WIN.end,
  banner: "LG November OHSEM 2026 · 1–30 Nov · 50% for 12 months on selected plans · RM20 front load · RM5 ARTCOOL & QNED",
  tag: "1–30 Nov · Free delivery, installation & CareShip",
}

export function campaignActive(date = new Date()) {
  const start = new Date(`${CAMPAIGN.start}T00:00:00`)
  const end = new Date(`${CAMPAIGN.end}T23:59:59`)
  return date >= start && date <= end
}

// The basic 9-month half-price offer has no end date.
export function pricesActive() {
  return true
}

export const OCT_WINDOW = NOV_WIN
export const Q4_WINDOW = NOV_WIN
export const OCT_MONTHS = [11]
export const Q4_MONTHS = [11]

export const FLAT99_MODELS = []
export const REBATE20_MODELS = ["F2520SNEKR", "FV1450S2W"]
export const REBATE15_MODELS = []
export const AIR_COMBO_MODELS = []
export const AIR_COMBO_OFF = 0
export const AIR_COMBO_SKU = {}
export const WASHTOWER_RATES = {}
export const REBATE10_MODELS = []
export const HALF12_MODELS = ["WD516AN", "WD518AN", "F2515RNTKAR", "FX1411R5WR", "TX2522AT9GR", "GC-B257KLJR", "GXJB18JBQRC"]
export const ARTCOOL_MODELS = ["S3-Q24K2RPA"]
export const ARTCOOL_OFF = 5
export const WASHTOWER_MODELS = ["WT1410NHB", "WT2520NHEGR"]
export const EXCLUDED_PROMO_MODELS = ["F2515NREG"]

export const DOUBLE_MATCH = {
  gift: '65" LG UHD AI TV',
  giftModel: "65NU865BPSA",
  worth: 3499,
  limit: 180,
  installDeadline: "2026-12-15",
  models: ["F2520SNEKR", "TX2522AT9GR", "S3-Q24K2RPA"],
  introMonths: 9,
  percentOff: 50,
}

const BASIC = {
  promoType: "50_PERCENT_9M",
  percentOff: 50,
  introMonths: 9,
  badge: "50% OFF (First 9 Mths)",
  kind: "ohsem",
  note: "Ongoing basic promotion for the first 9 months, then the normal monthly price.",
}

const HALF12 = {
  promoType: "50_PERCENT_12M",
  percentOff: 50,
  introMonths: 12,
  badge: "50% OFF (First 12 Mths)",
  kind: "half12",
  note: "November offer: 50% off for the first 12 months, then the normal monthly price. Not combined with the basic 9-month offer.",
}

const REBATE20 = {
  promoType: "CASH_REBATE",
  rebate: 20,
  badge: "RM20 OFF Monthly",
  kind: "rebate20",
  note: "November offer: RM20 off the normal monthly price for the contract. Not combined with the basic 9-month offer.",
}

const RM5 = {
  promoType: "RAC_REBATE",
  rebate: 5,
  badge: "RM5 OFF Monthly",
  kind: "artcool",
  note: "November offer: RM5 off the normal monthly price. Not combined with the basic 9-month offer.",
}

// Plan filters use the normal price already stored on the product. Promo prices are calculated from that.
const NOVEMBER_OFFERS = [
  { ...HALF12, models: ["WD516AN", "WD518AN"], tenures: [60, 84], cares: ["self", "combined", "visit"], cycles: [6] },
  { ...HALF12, models: ["F2515RNTKAR", "FX1411R5WR", "TX2522AT9GR"], tenures: [60, 84], cares: ["combined", "visit"], cycles: [6] },
  { ...HALF12, models: ["GC-B257KLJR", "GXJB18JBQRC"], tenures: [60, 84], cares: ["visit"], cycles: [12, 24] },
  { ...REBATE20, models: ["F2520SNEKR"], tenures: [60, 84], cares: ["combined", "visit"], cycles: [6] },
  { ...REBATE20, models: ["FV1450S2W"], tenures: [60], cares: ["combined", "visit"], cycles: [6] },
  { ...RM5, models: ["S3-Q24K2RPA"], tenures: [60], cares: ["visit"], cycles: [6, 12] },
  { ...RM5, models: ["55QNED87BSA", "65QNED87BSA"], tenures: [60], cares: ["none"] },
]

export function compactCode(value) {
  return String(value ?? "")
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "")
}

export function isListedModel(list, product) {
  const codes = codesOf(product)
  if (!codes.length) return false
  return list.some((item) => codes.some((code) => code === compactCode(item) || code.startsWith(compactCode(item))))
}

export function isArtcoolModel(product) {
  return isListedModel(ARTCOOL_MODELS, product)
}

export function isWashTower(product) {
  return isListedModel(WASHTOWER_MODELS, product) || /WASHTOWER/i.test(`${product?.name || ""} ${product?.baseName || ""}`)
}

export function isStandaloneLaundry(product) {
  if (!product) return false
  if (isWashTower(product)) return false
  if (/washer dryer/i.test(product.category || "") || /washer dryer/i.test(product.name || "")) return false
  return product.type === "dryer" || product.type === "washer"
}

export function isDoubleMatchModel(product) {
  return isListedModel(DOUBLE_MATCH.models, product)
}

function codesOf(product, plan) {
  if (plan?.model) return [compactCode(plan.model)].filter(Boolean)
  const codes = new Set()
  const add = (value) => {
    const code = compactCode(value)
    if (code) codes.add(code)
  }
  add(product?.model)
  add(product?.sku)
  for (const color of product?.colors ?? []) {
    add(color.model)
    for (const variant of Object.values(color.variants ?? {})) add(variant.model)
  }
  return [...codes]
}

function matchesModels(models, codes) {
  return models.some((item) => {
    const want = compactCode(item)
    return codes.some((code) => code === want || code.startsWith(want))
  })
}

function offerMatches(offer, product, plan) {
  const codes = codesOf(product, plan)
  if (!matchesModels(offer.models, codes)) return false
  if (matchesModels(EXCLUDED_PROMO_MODELS, codes)) return false
  if (plan?.tenure != null && offer.tenures && !offer.tenures.includes(Number(plan.tenure))) return false
  if (plan?.care && offer.cares && !offer.cares.includes(plan.care)) return false
  if (plan?.cycle != null && offer.cycles && !offer.cycles.includes(Number(plan.cycle))) return false
  return true
}

export function giftForProduct(product, date = new Date()) {
  if (!campaignActive(date) || !isDoubleMatchModel(product)) return null
  return {
    title: DOUBLE_MATCH.gift,
    limit: DOUBLE_MATCH.limit,
    introMonths: DOUBLE_MATCH.introMonths,
    percentOff: DOUBLE_MATCH.percentOff,
  }
}

export function evaluateProductPricing(product, plan = {}, date = new Date()) {
  const codes = codesOf(product, plan)
  if (matchesModels(EXCLUDED_PROMO_MODELS, codes)) return null
  if (campaignActive(date)) {
    const special = NOVEMBER_OFFERS.find((offer) => offerMatches(offer, product, plan))
    if (special) return special
  }
  return BASIC
}

export function toPromo(product, evaluation = evaluateProductPricing(product), date = new Date()) {
  if (!evaluation || evaluation.kind === "none") return null
  const november = campaignActive(date) && evaluation.kind !== "ohsem"
  const base = {
    scope: product?.model || evaluation.promoType,
    kind: evaluation.kind,
    offer: evaluation.promoType,
    badge: evaluation.badge,
    title: evaluation.note || evaluation.badge,
    detail: evaluation.note || evaluation.badge,
    extraOff: evaluation.rebate ?? 0,
    percentOff: evaluation.percentOff ?? 0,
    introMonths: evaluation.introMonths || null,
    start: november ? NOV_WIN.start : null,
    end: november ? NOV_WIN.end : null,
    qualifiesForFreeTV: false,
  }
  if (evaluation.rebate) return { ...base, type: "amount_off", extraOff: evaluation.rebate }
  if (evaluation.percentOff) return { ...base, type: "intro_percent", introMonths: evaluation.introMonths, percentOff: evaluation.percentOff }
  return base
}
