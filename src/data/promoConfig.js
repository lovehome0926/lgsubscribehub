// October & Q4 2026 — one exclusive promo per product. Priority overrides then 9-month half.
const OCT_WIN = { start: "2026-09-30", end: "2026-10-31" }
const Q4_WIN = { start: "2026-09-30", end: "2026-12-31" }

export const CAMPAIGN = {
  id: "october-q4-2026",
  name: "LG October & Q4 Special Deals 2026",
  start: OCT_WIN.start,
  end: OCT_WIN.end,
  banner: "LG October & Q4 Special Deals 2026 · RM20 laundry · ARTCOOL RM5 · 50% first 9 months",
  tag: "1–31 Oct · Free delivery, installation & CareShip",
}

export function campaignActive(date = new Date()) {
  const start = new Date(`${CAMPAIGN.start}T00:00:00`)
  const end = new Date(`${CAMPAIGN.end}T23:59:59`)
  return date >= start && date <= end
}

export function pricesActive(date = new Date()) {
  const start = new Date(`${Q4_WIN.start}T00:00:00`)
  const end = new Date(`${Q4_WIN.end}T23:59:59`)
  return date >= start && date <= end
}

export const OCT_WINDOW = OCT_WIN
export const Q4_WINDOW = Q4_WIN
export const OCT_MONTHS = [9, 10]
export const Q4_MONTHS = [9, 10, 11, 12]

export const FLAT99_MODELS = ["DFC335HM"]
export const REBATE20_MODELS = ["RX10VHP3WR", "RX10VHP3KR", "F2520SNEKR"]
export const REBATE15_MODELS = []
export const AIR_COMBO_MODELS = ["AS65GDBY0", "AS30GGW10"]
export const AIR_COMBO_OFF = 15
export const AIR_COMBO_SKU = {
  AS65GDBY0: "AS65GDBY0.AML",
  AS30GGW10: "AS30GGW10.AML",
}
export const WASHTOWER_RATES = {
  WT2520NHEGR: {
    label: "25/20kg",
    sku: "WT2520NHEGR.ABGREML",
    60: {
      visit: { now: 239, was: 290 },
      combined: { now: 229, was: 280 },
    },
    84: {
      visit: { now: 219 },
      combined: { now: 209 },
    },
  },
  WT1410NHB: {
    label: "14/10kg",
    sku: "WT1410NHB.APBRQML",
    60: {
      visit: { now: 199, was: 220 },
      combined: { now: 189, was: 210 },
    },
    84: {
      visit: { now: 179 },
      combined: { now: 169 },
    },
  },
}
export const REBATE10_MODELS = ["FV1209D4W", "FX1412S5GR"]
export const HALF12_MODELS = ["GC-B257KLJR", "TX2522AT9GR"]
export const ARTCOOL_MODELS = ["S3-Q24K2RPA"]
export const ARTCOOL_OFF = 5
export const WASHTOWER_MODELS = ["WT1410NHB", "WT2520NHEGR"]

export const DOUBLE_MATCH = {
  gift: '65" LG UHD AI TV',
  giftModel: "65NU865BPSA",
  limit: 130,
  installDeadline: "2026-10-31",
}

export function compactCode(value) {
  return String(value ?? "")
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "")
}

export function isListedModel(list, product) {
  const code = compactCode(product?.model || product)
  if (!code) return false
  return list.some((item) => {
    const want = compactCode(item)
    return code === want || code.startsWith(want) || want.startsWith(code)
  })
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
  return isStandaloneLaundry(product)
}

export function giftForProduct(product) {
  if (!isDoubleMatchModel(product)) return null
  return DOUBLE_MATCH
}

export function evaluateProductPricing(product) {
  const code = compactCode(product?.model || product)

  if (FLAT99_MODELS.some((item) => code.includes(compactCode(item)))) {
    return {
      promoType: "FLAT_RATE",
      monthlyRate: 99,
      badge: "Special RM99/mth Till Contract End",
      note: "RM99/mth flat rate throughout subscription term",
      kind: "flat",
    }
  }

  if (REBATE20_MODELS.some((item) => code.includes(compactCode(item)))) {
    return {
      promoType: "CASH_REBATE",
      rebate: 20,
      badge: "RM20 OFF Monthly",
      qualifiesForFreeTV: true,
      kind: "rebate20",
    }
  }

  if (REBATE15_MODELS.some((item) => code.includes(compactCode(item)))) {
    return {
      promoType: "CASH_REBATE",
      rebate: 15,
      badge: "RM15 OFF Monthly",
      kind: "rebate15",
    }
  }

  if (REBATE10_MODELS.some((item) => code.includes(compactCode(item)))) {
    return {
      promoType: "CASH_REBATE",
      rebate: 10,
      badge: "RM10 OFF Monthly",
      kind: "rebate10",
    }
  }

  if (HALF12_MODELS.some((item) => code.includes(compactCode(item)))) {
    return {
      promoType: "50_PERCENT_12M",
      percentOff: 50,
      introMonths: 12,
      badge: "50% OFF (First 12 Mths)",
      kind: "half12",
    }
  }

  if (isListedModel(AIR_COMBO_MODELS, product)) {
    return {
      promoType: "AIR_COMBO",
      rebate: AIR_COMBO_OFF,
      badge: "Bundle & Save RM15/mth each",
      note: "AS65 + AS30 only, until contract end",
      kind: "aircombo",
    }
  }

  if (isArtcoolModel(product)) {
    return {
      promoType: "RAC_REBATE",
      rebate: ARTCOOL_OFF,
      badge: "RM5 OFF Monthly",
      kind: "artcool",
    }
  }

  return {
    promoType: "50_PERCENT_9M",
    percentOff: 50,
    introMonths: 9,
    badge: "50% OFF (First 9 Mths)",
    kind: "ohsem",
  }
}

export function toPromo(product, evaluation = evaluateProductPricing(product)) {
  if (!evaluation || evaluation.kind === "none" || evaluation.kind === "revised") return null
  const scope = product?.model || evaluation.promoType
  const base = {
    scope,
    kind: evaluation.kind,
    offer: evaluation.promoType,
    badge: evaluation.badge,
    title: evaluation.note || evaluation.badge,
    detail: evaluation.note || evaluation.badge,
    extraOff: evaluation.rebate ?? 0,
    percentOff: evaluation.percentOff ?? 0,
    introMonths: evaluation.introMonths || null,
    start: Q4_WIN.start,
    end: Q4_WIN.end,
    qualifiesForFreeTV: Boolean(evaluation.qualifiesForFreeTV),
  }

  if (evaluation.promoType === "FLAT_RATE") {
    return {
      ...base,
      type: "promo_price",
      promoPrice: evaluation.monthlyRate,
      afterPrice: evaluation.monthlyRate,
      flat: true,
    }
  }
  if (evaluation.rebate) {
    return { ...base, type: "amount_off", extraOff: evaluation.rebate }
  }
  if (evaluation.percentOff) {
    return { ...base, type: "intro_percent", introMonths: evaluation.introMonths, percentOff: evaluation.percentOff }
  }
  return base
}
