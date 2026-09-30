// Product patches only. October prices live in promoConfig.evaluateProductPricing.
import { applyF2520Name, applyFx1412 } from "./fx1412.js"

export { CAMPAIGN, campaignActive } from "./promoConfig.js"

export const OCTOBER_PROMOS = []
export const MERDEKA_PROMOS = OCTOBER_PROMOS

export const PAUSED_MODELS = ["GC-X24FFC7R", "MH21RRY", "RX10VHP3WR"]
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
