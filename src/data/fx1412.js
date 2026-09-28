const OWN_PHOTOS = [
  "/products/FX1412S5GR.webp",
  "/products/FX1412S5GR-02.webp",
  "/products/FX1412S5GR-03.webp",
  "/products/FX1412S5GR-04.webp",
  "/products/FX1412S5GR-05.webp",
]

export const FX1412_FACTS = [
  { label: "Model", value: "FX1412S5GR" },
  { label: "Capacity", value: "12kg" },
  { label: "Motor", value: "Direct Drive™" },
  { label: "TurboWash™360˚", value: "Yes" },
  { label: "Steam™", value: "Yes" },
  { label: "AI DD™", value: "Yes" },
  { label: "Silence", value: "Inverter Direct Drive™" },
  { label: "Automatic Dispenser", value: "Yes" },
]

function unique(list) {
  const seen = new Set()
  return list.filter((item) => {
    if (!item || seen.has(item)) return false
    seen.add(item)
    return true
  })
}

function withMedia(color, gallery, detail) {
  const hero = gallery[0]
  return {
    ...color,
    image: hero,
    gallery,
    variants: Object.fromEntries(
      Object.entries(color.variants ?? {}).map(([key, variant]) => [
        key,
        { ...variant, image: hero, gallery, detail },
      ]),
    ),
  }
}

export function applyFx1412(product, donor) {
  if (product.model !== "FX1412S5GR") return product
  const donorColor = donor?.colors?.[0]
  const donorGallery = donorColor ? [donorColor.image, ...(donorColor.gallery || [])] : []
  const gallery = unique([...OWN_PHOTOS, ...donorGallery]).slice(0, 14)
  const quickFeatures = donor?.quickFeatures?.length ? donor.quickFeatures : product.quickFeatures
  const stories = donor?.stories?.length ? donor.stories : product.stories
  const tagline = donor?.tagline || product.tagline
  const detail = { tagline, quickFeatures, stories, facts: FX1412_FACTS }
  return {
    ...product,
    name: "12kg Front Load Washer with AI Direct Drive™ and TurboWash™360˚",
    baseName: "12kg Front Load Washer with AI Direct Drive™ and TurboWash™360˚",
    shortName: "12kg Front Load Washer",
    tagline,
    copyFeaturesFrom: null,
    featureSource: donor?.model || "F2520SNEKR",
    quickFeatures,
    stories,
    facts: FX1412_FACTS,
    colors: product.colors.map((color) => withMedia(color, gallery, detail)),
  }
}

export function applyF2520Name(product) {
  if (product.model !== "F2520SNEKR") return product
  return {
    ...product,
    name: "20kg Front Load Washer with AI Direct Drive™ and TurboWash™",
    baseName: "20kg Front Load Washer with AI Direct Drive™ and TurboWash™",
    shortName: "20kg Front Load Washer",
  }
}
