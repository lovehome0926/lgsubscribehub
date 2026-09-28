// OHSEM Merdeka Deals 2026 — 1 Aug to 30 Sep.
import { applyF2520Name, applyFx1412 } from "./fx1412.js"

export const CAMPAIGN = {
  id: "ohsem-merdeka-2026",
  name: "OHSEM Merdeka Deals",
  start: "2026-08-01",
  end: "2026-09-30",
  banner: "OHSEM Merdeka Deals! Enjoy Up To 77% OFF for the First 12 Months | Subscription From RM 17/mth",
  tag: "Limited-Time Promo • Free Installation & Gift Available",
}

export function campaignActive(date = new Date()) {
  const start = new Date(`${CAMPAIGN.start}T00:00:00`)
  const end = new Date(`${CAMPAIGN.end}T23:59:59`)
  return date >= start && date <= end
}

export function merdekaRows(scope, fields) {
  return [8, 9].map((month) => ({
    month,
    scope,
    merdeka: true,
    extraOff: fields.extraOff ?? 0,
    percentOff: fields.percentOff ?? 0,
    start: CAMPAIGN.start,
    end: CAMPAIGN.end,
    ...fields,
  }))
}

export const MERDEKA_PROMOS = [
  ...merdekaRows("WD518AN", {
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
  ...merdekaRows("WD516AN", {
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
  ...merdekaRows("F2515RNTKAR", {
    offer: "Merdeka Special RM20/mth",
    badge: "Merdeka Special",
    title: "Merdeka Special RM 20/mth",
    detail: "RM 20/mth for the first 12 months on 7-year Combine, then RM 85/mth. T&C Apply.",
    type: "promo_price",
    introMonths: 12,
    promoPrice: 20,
    afterPrice: 85,
    tenure: 84,
    care: "combined",
  }),
  ...merdekaRows("DFC335HM", {
    offer: "Merdeka RM99/mth",
    badge: "RM 51/mth OFF",
    title: "Merdeka RM 99/mth",
    detail: "5-year Regular Visit RM 99/mth (was RM 150/mth). T&C Apply.",
    type: "promo_price",
    promoPrice: 99,
    afterPrice: 150,
    tenure: 60,
    care: "visit",
  }),
  ...merdekaRows("AS60GHBTO", {
    offer: "RM20 off",
    badge: "RM 20/mth OFF",
    title: "RM 20 off every month",
    detail: "RM 20 off the monthly fee on 5-year and 7-year plans. T&C Apply.",
    type: "amount_off",
    extraOff: 20,
  }),
  ...merdekaRows("AS25GCBZO", {
    offer: "RM20 off",
    badge: "RM 20/mth OFF",
    title: "RM 20 off every month",
    detail: "RM 20 off the monthly fee on 5-year and 7-year plans. T&C Apply.",
    type: "amount_off",
    extraOff: 20,
  }),
  ...merdekaRows("WU525BS", {
    offer: "前12m 77% off",
    badge: "77% OFF (1st Year)",
    title: "77% OFF First 12 Months",
    detail: "77% off the monthly fee for the first 12 months. Standard fee from month 13. T&C Apply.",
    type: "intro_percent",
    introMonths: 12,
    percentOff: 77,
  }),
  ...merdekaRows("F2520SNEKR", {
    offer: "前12m 77% off",
    badge: "77% OFF (1st Year)",
    title: "77% OFF First 12 Months",
    detail: "77% off the monthly fee for the first 12 months. Standard fee from month 13. T&C Apply.",
    type: "intro_percent",
    introMonths: 12,
    percentOff: 77,
  }),
  ...merdekaRows("AS55GGSYO", {
    offer: "RM20 off",
    badge: "RM 20/mth OFF",
    title: "RM 20 off every month",
    detail: "RM 20 off the monthly Subscribe fee. T&C Apply.",
    type: "amount_off",
    extraOff: 20,
  }),
  ...merdekaRows("TV2520SV9KR", {
    offer: "RM20 off",
    badge: "RM 20/mth OFF",
    title: "RM 20 off every month",
    detail: "RM 20 off the monthly Subscribe fee. T&C Apply.",
    type: "amount_off",
    extraOff: 20,
  }),
  ...merdekaRows("RX10VHP3KR", {
    offer: "RM20 off",
    badge: "RM 20/mth OFF",
    title: "RM 20 off every month",
    detail: "RM 20 off the monthly Subscribe fee. T&C Apply.",
    type: "amount_off",
    extraOff: 20,
  }),
  ...merdekaRows("WT1410NHB", {
    offer: "5yr Combine RM169",
    badge: "RM 169/mth",
    title: "5-year Combine RM 169/mth",
    detail: "5-year Combine Maintenance RM 169/mth (was RM 210/mth). T&C Apply.",
    type: "promo_price",
    promoPrice: 169,
    afterPrice: 210,
    tenure: 60,
    care: "combined",
  }),
  ...merdekaRows("WT2520NHEGR", {
    offer: "5yr Combine RM199",
    badge: "RM 199/mth",
    title: "5-year Combine RM 199/mth",
    detail: "5-year Combine Maintenance RM 199/mth (was RM 280/mth). T&C Apply.",
    type: "promo_price",
    promoPrice: 199,
    afterPrice: 280,
    tenure: 60,
    care: "combined",
  }),
]

export const PAUSED_MODELS = ["GC-X24FFC7R", "RX10VHP3WR"]
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
