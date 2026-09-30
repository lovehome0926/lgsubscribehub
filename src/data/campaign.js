// October / Q4 2026 — preview sheet by model (98% as supplied).
// 10.10 and new-launch windows: 1–31 Oct. Extended specials: 1 Oct–31 Dec.
import { applyF2520Name, applyFx1412 } from "./fx1412.js"

const OCT_WIN = { start: "2026-09-30", end: "2026-10-31" }
const Q4_WIN = { start: "2026-09-30", end: "2026-12-31" }
const OCT_MONTHS = [9, 10]
const Q4_MONTHS = [9, 10, 11, 12]

export const CAMPAIGN = {
  id: "october-1010-2026",
  name: "10.10 October Deals",
  start: OCT_WIN.start,
  end: OCT_WIN.end,
  banner: "10.10 October Deals! From RM 17/mth · Up to 77% off · Free 50\" TV when you take 2 appliances",
  tag: "1–31 Oct · Free delivery, installation & CareShip",
}

export function campaignActive(date = new Date()) {
  const start = new Date(`${CAMPAIGN.start}T00:00:00`)
  const end = new Date(`${CAMPAIGN.end}T23:59:59`)
  return date >= start && date <= end
}

function promoRows(scope, fields, months, window) {
  return months.map((month) => ({
    month,
    scope,
    merdeka: Boolean(fields.featured),
    extraOff: fields.extraOff ?? 0,
    percentOff: fields.percentOff ?? 0,
    start: window.start,
    end: window.end,
    ...fields,
  }))
}

const extend = (scope, fields) => promoRows(scope, fields, Q4_MONTHS, Q4_WIN)
const october = (scope, fields) => promoRows(scope, fields, OCT_MONTHS, OCT_WIN)

export const OCTOBER_PROMOS = [
  // 1. Extended to 31 Dec — same mechanics as September specials
  ...extend("WD518AN", {
    offer: "前12m 77% off",
    badge: "77% OFF (1st Year)",
    title: "77% OFF First 12 Months",
    detail: "RM 17/mth for the first 12 months, then RM 70/mth. T&C Apply.",
    type: "intro_percent",
    introMonths: 12,
    percentOff: 77,
    promoPrice: 17,
    afterPrice: 70,
    tenure: 84,
    care: "self",
  }),
  ...extend("WD516AN", {
    offer: "前12m 77% off",
    badge: "77% OFF (1st Year)",
    title: "77% OFF First 12 Months",
    detail: "RM 17/mth for the first 12 months, then RM 70/mth. T&C Apply.",
    type: "intro_percent",
    introMonths: 12,
    percentOff: 77,
    promoPrice: 17,
    afterPrice: 70,
    tenure: 84,
    care: "self",
  }),
  ...extend("WU525BS", {
    offer: "前12m 77% off",
    badge: "77% OFF (1st Year)",
    title: "77% OFF First 12 Months",
    detail: "RM 26/mth for the first 12 months, then RM 110/mth. T&C Apply.",
    type: "intro_percent",
    introMonths: 12,
    percentOff: 77,
    promoPrice: 26,
    afterPrice: 110,
    tenure: 84,
    care: "self",
  }),
  ...extend("F2515RNTKAR", {
    offer: "October Special RM20/mth",
    featured: true,
    badge: "RM 20/mth",
    title: "First 12 months RM 20/mth",
    detail: "RM 20/mth for the first 12 months on 7-year Combine, then RM 85/mth. T&C Apply.",
    type: "promo_price",
    introMonths: 12,
    promoPrice: 20,
    afterPrice: 85,
    tenure: 84,
    care: "combined",
  }),
  ...extend("F2520SNEKR", {
    offer: "前12m 77% off",
    badge: "77% OFF (1st Year)",
    title: "77% OFF First 12 Months",
    detail: "RM 23/mth for the first 12 months, then RM 100/mth. T&C Apply.",
    type: "intro_percent",
    introMonths: 12,
    percentOff: 77,
    promoPrice: 23,
    afterPrice: 100,
    tenure: 84,
    care: "combined",
  }),
  ...extend("DFC335HM", {
    offer: "October RM99/mth",
    featured: true,
    badge: "RM 99/mth",
    title: "5-year Regular Visit RM 99/mth",
    detail: "5-year Regular Visit RM 99/mth (was RM 150/mth). T&C Apply.",
    type: "promo_price",
    promoPrice: 99,
    afterPrice: 150,
    tenure: 60,
    care: "visit",
  }),
  ...extend("AS60GHBTO", {
    offer: "RM20 off",
    badge: "RM 20/mth OFF",
    title: "RM 20 off every month",
    detail: "RM 20 off the monthly fee on 5-year and 7-year plans. T&C Apply.",
    type: "amount_off",
    extraOff: 20,
  }),
  ...extend("AS55GGSYO", {
    offer: "RM20 off",
    badge: "RM 20/mth OFF",
    title: "RM 20 off every month",
    detail: "RM 20 off the monthly Subscribe fee. T&C Apply.",
    type: "amount_off",
    extraOff: 20,
  }),
  ...extend("AS25GCBZO", {
    offer: "RM20 off",
    badge: "RM 20/mth OFF",
    title: "RM 20 off every month",
    detail: "RM 20 off the monthly fee on 5-year and 7-year plans. T&C Apply.",
    type: "amount_off",
    extraOff: 20,
  }),
  ...extend("TV2520SV9KR", {
    offer: "RM20 off",
    badge: "RM 20/mth OFF",
    title: "RM 20 off every month",
    detail: "RM 20 off the monthly Subscribe fee. T&C Apply.",
    type: "amount_off",
    extraOff: 20,
  }),
  ...extend("RX10VHP3KR", {
    offer: "RM20 off",
    badge: "RM 20/mth OFF",
    title: "RM 20 off every month",
    detail: "RM 20 off the monthly Subscribe fee. T&C Apply.",
    type: "amount_off",
    extraOff: 20,
  }),
  ...extend("WT1410NHB", {
    offer: "5yr Combine RM169",
    featured: true,
    badge: "RM 169/mth",
    title: "5-year Combine RM 169/mth",
    detail: "5-year Combine Maintenance RM 169/mth (was RM 210/mth). T&C Apply.",
    type: "promo_price",
    promoPrice: 169,
    afterPrice: 210,
    tenure: 60,
    care: "combined",
  }),
  ...extend("WT2520NHEGR", {
    offer: "5yr Combine RM199",
    featured: true,
    badge: "RM 199/mth",
    title: "5-year Combine RM 199/mth",
    detail: "5-year Combine Maintenance RM 199/mth (was RM 280/mth). T&C Apply.",
    type: "promo_price",
    promoPrice: 199,
    afterPrice: 280,
    tenure: 60,
    care: "combined",
  }),

  // 6. Double Haze Combo — 50% first 12 months + RM1 off remaining (beats 10.10 intro on Single Booster)
  ...october("AS65GDBY0", {
    offer: "前12m半价 + RM1",
    badge: "HALF PRICE",
    title: "First 12 months RM 37/mth",
    detail: "RM 37/mth for the first 12 months, then RM 74/mth. T&C Apply.",
    type: "promo_price",
    introMonths: 12,
    percentOff: 50,
    promoPrice: 37,
    afterPrice: 74,
    tenure: 60,
    care: "visit",
  }),
  ...october("AS30GGW10", {
    offer: "前12m半价 + RM1",
    badge: "HALF PRICE",
    title: "First 12 months RM 20/mth",
    detail: "RM 20/mth for the first 12 months, then RM 39/mth. T&C Apply.",
    type: "promo_price",
    introMonths: 12,
    percentOff: 50,
    promoPrice: 20,
    afterPrice: 39,
    tenure: 60,
    care: "visit",
  }),

  // 3 + 5. New NPI 50% first 12 months + RM10 off remaining; Artcool also gets RAC RM5 off first year
  ...october("GV-K25FFGER", {
    offer: "前12m半价 + RM10",
    badge: "HALF PRICE",
    title: "New launch 50% + RM10 off",
    detail: "RM 80/mth for the first 12 months, then RM 150/mth. T&C Apply.",
    type: "promo_price",
    introMonths: 12,
    percentOff: 50,
    promoPrice: 80,
    afterPrice: 150,
    tenure: 60,
    care: "visit",
  }),
  ...october("S3-Q120AGZB", {
    offer: "前12m半价 + RM10",
    badge: "HALF PRICE",
    title: "New launch 50% + RM10 off",
    detail: "RM 48/mth for the first 12 months, then RM 85/mth. T&C Apply.",
    type: "promo_price",
    introMonths: 12,
    percentOff: 50,
    promoPrice: 48,
    afterPrice: 85,
    tenure: 60,
    care: "visit",
  }),
  ...october("S3-Q2412GZC", {
    offer: "前12m半价 + RM10",
    badge: "HALF PRICE",
    title: "New launch 50% + RM10 off",
    detail: "RM 63/mth for the first 12 months, then RM 115/mth. T&C Apply.",
    type: "promo_price",
    introMonths: 12,
    percentOff: 50,
    promoPrice: 63,
    afterPrice: 115,
    tenure: 60,
    care: "visit",
  }),
  ...october("S3-Q12JARPA", {
    offer: "前12m半价 + RM10 + RAC RM5",
    badge: "HALF PRICE",
    title: "Artcool 50% + extra RM5",
    detail: "RM 45/mth for the first 12 months, then RM 90/mth. T&C Apply.",
    type: "promo_price",
    introMonths: 12,
    percentOff: 50,
    promoPrice: 45,
    afterPrice: 90,
    tenure: 60,
    care: "visit",
  }),
  ...october("S3-Q24K2RPA", {
    offer: "前12m半价 + RM10 + RAC RM5",
    badge: "HALF PRICE",
    title: "Artcool 50% + extra RM5",
    detail: "RM 60/mth for the first 12 months, then RM 120/mth. T&C Apply.",
    type: "promo_price",
    introMonths: 12,
    percentOff: 50,
    promoPrice: 60,
    afterPrice: 120,
    tenure: 60,
    care: "visit",
  }),

  // 2. 10.10 — RM16 off HA / RM29 off TV, 5-year, entire tenure
  ...october("GN-F452PQAK", {
    offer: "10.10 RM16 off",
    featured: true,
    badge: "10.10 · RM16 OFF",
    title: "10.10 RM 16 off every month",
    detail: "5-year Regular Visit RM 64/mth (was RM 80/mth). T&C Apply.",
    type: "amount_off",
    extraOff: 16,
    tenure: 60,
    care: "visit",
  }),
  ...october("GC-B257KLJR", {
    offer: "10.10 RM16 off",
    featured: true,
    badge: "10.10 · RM16 OFF",
    title: "10.10 RM 16 off every month",
    detail: "5-year Regular Visit RM 69/mth (was RM 85/mth). T&C Apply.",
    type: "amount_off",
    extraOff: 16,
    tenure: 60,
    care: "visit",
  }),
  ...october("GC-J257SQNW", {
    offer: "10.10 RM16 off",
    featured: true,
    badge: "10.10 · RM16 OFF",
    title: "10.10 RM 16 off every month",
    detail: "5-year Regular Visit RM 114/mth (was RM 130/mth). T&C Apply.",
    type: "amount_off",
    extraOff: 16,
    tenure: 60,
    care: "visit",
  }),
  ...october("S3WF", {
    offer: "10.10 RM16 off",
    featured: true,
    badge: "10.10 · RM16 OFF",
    title: "10.10 RM 74/mth",
    detail: "5-year plan RM 74/mth (was RM 90/mth). T&C Apply.",
    type: "promo_price",
    promoPrice: 74,
    afterPrice: 90,
    tenure: 60,
  }),
  ...october("FX1412S5GR", {
    offer: "10.10 RM16 off",
    featured: true,
    badge: "10.10 · RM16 OFF",
    title: "10.10 RM 54/mth",
    detail: "5-year plan RM 54/mth (was RM 70/mth). T&C Apply.",
    type: "promo_price",
    promoPrice: 54,
    afterPrice: 70,
    tenure: 60,
  }),
  ...october("AS10GDBY0", {
    offer: "10.10 RM16 off",
    featured: true,
    badge: "10.10 · RM16 OFF",
    title: "10.10 RM 16 off every month",
    detail: "5-year Regular Visit RM 89/mth (was RM 105/mth). T&C Apply.",
    type: "amount_off",
    extraOff: 16,
    tenure: 60,
    care: "visit",
  }),
  ...october("S3-Q09JAYPP", {
    offer: "10.10 RM16 off",
    featured: true,
    badge: "10.10 · RM16 OFF",
    title: "10.10 RM 64/mth",
    detail: "5-year Regular Visit RM 64/mth (was RM 80/mth). T&C Apply.",
    type: "promo_price",
    promoPrice: 64,
    afterPrice: 80,
    tenure: 60,
    care: "visit",
  }),
  ...october("S3-Q12JAYPP", {
    offer: "10.10 RM16 off",
    featured: true,
    badge: "10.10 · RM16 OFF",
    title: "10.10 RM 74/mth",
    detail: "5-year Regular Visit RM 74/mth (was RM 90/mth). T&C Apply.",
    type: "promo_price",
    promoPrice: 74,
    afterPrice: 90,
    tenure: 60,
    care: "visit",
  }),
  ...october("S3-Q18KAYPA", {
    offer: "10.10 RM16 off",
    featured: true,
    badge: "10.10 · RM16 OFF",
    title: "10.10 RM 94/mth",
    detail: "5-year Regular Visit RM 94/mth (was RM 110/mth). T&C Apply.",
    type: "promo_price",
    promoPrice: 94,
    afterPrice: 110,
    tenure: 60,
    care: "visit",
  }),
  ...october("S3-Q24KLYPA", {
    offer: "10.10 RM16 off",
    featured: true,
    badge: "10.10 · RM16 OFF",
    title: "10.10 RM 104/mth",
    detail: "5-year Regular Visit RM 104/mth (was RM 120/mth). T&C Apply.",
    type: "promo_price",
    promoPrice: 104,
    afterPrice: 120,
    tenure: 60,
    care: "visit",
  }),
  ...october("TX2522AT9GR", {
    offer: "10.10 RM16 off",
    featured: true,
    badge: "10.10 · RM16 OFF",
    title: "10.10 RM 64/mth",
    detail: "5-year plan RM 64/mth (was RM 80/mth). T&C Apply.",
    type: "promo_price",
    promoPrice: 64,
    afterPrice: 80,
    tenure: 60,
  }),
  ...october("OLED65B6SSA", {
    offer: "10.10 RM29 off",
    featured: true,
    badge: "10.10 · RM29 OFF",
    title: "10.10 RM 29 off every month",
    detail: "5-year Standard Warranty RM 161/mth (was RM 190/mth). T&C Apply.",
    type: "amount_off",
    extraOff: 29,
    tenure: 60,
    care: "none",
  }),
  ...october("55QNED87BSA", {
    offer: "10.10 RM29 off",
    featured: true,
    badge: "10.10 · RM29 OFF",
    title: "10.10 RM 29 off every month",
    detail: "5-year Standard Warranty RM 71/mth (was RM 100/mth). T&C Apply.",
    type: "amount_off",
    extraOff: 29,
    tenure: 60,
    care: "none",
  }),
  ...october("50NU865BPSA", {
    offer: "10.10 RM29 off",
    featured: true,
    badge: "10.10 · RM29 OFF",
    title: "10.10 RM 29 off every month",
    detail: "5-year Standard Warranty RM 31/mth (was RM 60/mth). T&C Apply.",
    type: "amount_off",
    extraOff: 29,
    tenure: 60,
    care: "none",
  }),
]

export const MERDEKA_PROMOS = OCTOBER_PROMOS

export const PAUSED_MODELS = ["GC-X24FFC7R", "RX10VHP3WR", "MH21RRY"]
export const DELISTED_MODELS = ["DFC533FV", "FV1450S2W"]

export const EXTRA_PRODUCTS = []

function patchF2515(product) {
  if (product.model !== "F2515RNTKAR") return product
  return {
    ...product,
    specs: product.specs.map((spec) => {
      const seven = spec.pricing?.subscribe?.[84]
      if (!seven || seven.combined != null) return spec
      return {
        ...spec,
        pricing: {
          ...spec.pricing,
          subscribe: {
            ...spec.pricing.subscribe,
            84: { ...seven, combined: 85 },
          },
        },
      }
    }),
  }
}

function withGallery(product, gallery, detail) {
  if (!gallery?.length) return product
  const hero = gallery[0]
  return {
    ...product,
    colors: product.colors.map((color) => ({
      ...color,
      image: hero,
      gallery,
      variants: Object.fromEntries(
        Object.entries(color.variants || {}).map(([key, variant]) => [
          key,
          { ...variant, image: hero, gallery, detail: detail ?? variant.detail },
        ]),
      ),
    })),
  }
}

function applyDualcoolAiLook(product, donor) {
  if (product.model !== "S3-Q2412GZC" || !donor) return product
  const gallery = donor.colors?.[0]?.gallery || []
  const donorVariant = Object.values(donor.colors?.[0]?.variants || {})[0]
  const detail = {
    tagline: donor.tagline,
    quickFeatures: donor.quickFeatures || [],
    stories: donor.stories || [],
    facts: product.facts || donorVariant?.detail?.facts || [],
  }
  return withGallery(
    {
      ...product,
      name: "LG DUALCOOL AI",
      baseName: "LG DUALCOOL AI",
      shortName: "DUALCOOL AI",
      tagline: donor.tagline || product.tagline,
      quickFeatures: donor.quickFeatures || product.quickFeatures,
      stories: donor.stories || product.stories,
      copyFeaturesFrom: "S3-Q120AGZB",
    },
    gallery,
    detail,
  )
}

function applyB257Hero(product) {
  if (product.model !== "GC-B257KLJR") return product
  const hero = "/products/GC-B257KLJR.jpg"
  const current = product.colors?.[0]?.gallery || []
  return withGallery(product, [hero, ...current.filter((src) => src !== hero)])
}

export function patchProducts(products) {
  const f2520 = products.find((item) => item.model === "F2520SNEKR")
  const dualcoolAi = products.find((item) => item.model === "S3-Q120AGZB")
  return products
    .filter((product) => !DELISTED_MODELS.includes(product.model))
    .map((product) => {
      let next = applyB257Hero(applyFx1412(applyF2520Name(patchF2515(applyDualcoolAiLook(product, dualcoolAi))), f2520))
      if (PAUSED_MODELS.includes(product.model)) next = { ...next, paused: true }
      return next
    })
}
