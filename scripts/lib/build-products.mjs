// Shared transform from flat sheet rows to the PRODUCTS array.
// Rows arrive as objects keyed by column letter (A..L) so both the xlsx importer
// and the Google Sheet sync can feed the exact same pipeline.
import fs from "fs"
import path from "path"
import { pathToFileURL } from "url"

export const root = path.resolve(import.meta.dirname, "..", "..")
export const cachePath = path.join(root, "scripts", "lg-image-cache.json")
export const outPath = path.join(root, "src", "data", "subscribe2026.js")

const fallbackImage = "https://www.lg.com/content/dam/channel/wcms/my/lg-subscribe/images/lg-subscribe-2025-banner-D.jpg"

// Letter-column layout used by the local xlsx importer.
export const COLUMNS = [
  { key: "A", header: "Category" },
  { key: "B", header: "Model" },
  { key: "C", header: "Product Name" },
  { key: "D", header: "Variant" },
  { key: "E", header: "Outright Price" },
  { key: "F", header: "84mo Self-Service" },
  { key: "G", header: "84mo Combine" },
  { key: "H", header: "84mo Regular Visit" },
  { key: "I", header: "60mo Self-Service" },
  { key: "J", header: "60mo Regular Visit" },
  { key: "K", header: "60mo Combine" },
  { key: "L", header: "LG Page URL" },
]

// Google Sheet headers (and older aliases). Sync matches these by name, not column letter.
export const FIELD_ALIASES = {
  category: ["Category"],
  model: ["Model"],
  name: ["Name", "Product Name"],
  variant: ["Specs/Variant", "Variant"],
  outright: ["Outright_Price_MYR", "Outright Price"],
  outrightSelf: ["Outright_Self_MYR"],
  outrightCombine: ["Outright_Combine_MYR"],
  outrightVisit: ["Outright_Regular_MYR"],
  self84: ["Sub_7Yr_Self_MYR", "84mo Self-Service"],
  combine84: ["Sub_7Yr_Combine_MYR", "84mo Combine"],
  visit84: ["Sub_7Yr_Regular_MYR", "84mo Regular Visit"],
  visit84_6: ["Sub_7Yr_Regular_6m_MYR"],
  visit84_12: ["Sub_7Yr_Regular_12m_MYR"],
  visit84_24: ["Sub_7Yr_Regular_24m_MYR"],
  self60: ["Sub_5Yr_Self_MYR", "60mo Self-Service"],
  combine60: ["Sub_5Yr_Combine_MYR", "60mo Combine"],
  visit60: ["Sub_5Yr_Regular_MYR", "60mo Regular Visit"],
  visit60_6: ["Sub_5Yr_Regular_6m_MYR"],
  visit60_12: ["Sub_5Yr_Regular_12m_MYR"],
  visit60_24: ["Sub_5Yr_Regular_24m_MYR"],
  url: ["LG HQ Detail Page URL", "LG Page URL"],
  featureSource: ["Copy_Features_From", "Feature_Source", "Same Features As"],
  heroImage: ["Hero_Image", "Main Image", "Product Image"],
}

const URL_ALIASES = {
  "https://www.lg.com/my/rent-up/residential-air-conditioners/s3-q18kaypa/lgsubscribe":
    "https://www.lg.com/my/lg-subscribe/residential-air-conditioners/s3-q18kaypa/lgsubscribe",
}

function canonicalUrl(value) {
  const url = String(value || "").trim()
  return URL_ALIASES[url] || url
}

function fieldsFromLetterRow(row) {
  return {
    category: row.A,
    model: row.B,
    name: row.C,
    variant: row.D,
    outright: row.E,
    self84: row.F,
    combine84: row.G,
    visit84: row.H,
    self60: row.I,
    visit60: row.J,
    combine60: row.K,
    url: row.L,
    featureSource: row.M,
    heroImage: row.N,
  }
}

export function compactModel(value) {
  return String(value || "")
    .split(".")[0]
    .replace(/[^A-Za-z0-9]/g, "")
    .toUpperCase()
}

export function isPlaceholderImage(src) {
  return !src || /lg-subscribe-2025-banner/i.test(src)
}

const PRODUCT_IMAGE_DIR = path.join(root, "public", "products")
const IMAGE_EXTS = [".jpg", ".jpeg", ".png", ".webp"]

function publicProductSrc(fileName) {
  return `/products/${String(fileName).replace(/\\/g, "/")}`
}

function existingLocalImage(...parts) {
  const fileName = parts.filter(Boolean).join("")
  if (!fileName) return null
  const full = path.join(PRODUCT_IMAGE_DIR, fileName)
  return fs.existsSync(full) ? publicProductSrc(fileName) : null
}

export function resolveHeroImage(model, colorName, explicit) {
  const given = String(explicit || "").trim()
  if (given) {
    if (/^https?:\/\//i.test(given) || given.startsWith("/")) return given
    const fromSheet = existingLocalImage(given)
    if (fromSheet) return fromSheet
  }
  const code = compactModel(model)
  const colorSlug = colorName ? slug(colorName) : ""
  const stems = [code, colorSlug ? `${code}-${colorSlug}` : null, colorSlug ? `${code}_${colorSlug}` : null].filter(Boolean)
  for (const stem of stems) {
    for (const ext of IMAGE_EXTS) {
      const found = existingLocalImage(`${stem}${ext}`)
      if (found) return found
    }
  }
  return null
}

function asFields(row) {
  return row.category || row.name ? row : fieldsFromLetterRow(row)
}

const HEX = {
  "solid black": "#1A1A1A",
  "calming cream grey": "#C9C2B8",
  "calming beige": "#E6D7C3",
  "calming navy": "#1F3A56",
  silver: "#C5C9CE",
  "nature beige": "#D9CDB8",
  beige: "#E4D5C3",
  blue: "#2F5F8F",
  white: "#F4F4F4",
  "clay brown": "#8C5A3C",
  "essence white": "#F7F7F5",
  brown: "#6B4A32",
  mirror: "#C5CCD3",
  "matte black": "#1A1A1A",
  "nature green/beige": "#C5CDB6",
  "platinum black": "#2A2A2A",
  black: "#111111",
}

const CATEGORY = {
  "Water Purifier": { category: "Water Purifiers", type: "water" },
  "Air Purifier": { category: "Air Purifiers", type: "air" },
  Styler: { category: "Styler", type: "styler" },
  "Massage Chair": { category: "Massage Chairs", type: "massage" },
  "Air Conditioner": { category: "Air Conditioners", type: "ac" },
  Washer: { category: "Washers", type: "washer" },
  "Washer Dryer": { category: "Washer Dryers", type: "washer" },
  "Top Loader": { category: "Washers", type: "washer" },
  Dryer: { category: "Dryers", type: "dryer" },
  Refrigerator: { category: "Refrigerators", type: "fridge" },
  Dishwasher: { category: "Dishwashers", type: "dish" },
  TV: { category: "TVs", type: "tv" },
}

export const CATEGORY_KEYS = Object.keys(CATEGORY)

function slug(value) {
  return String(value)
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
}

function money(value) {
  if (value == null || value === "" || value === "N/A") return null
  const number = Number(String(value).replace(/,/g, ""))
  if (!Number.isFinite(number)) return null
  // The sheet repeats 28 down unfinished Combine cells. Treat it as not yet priced.
  if (number === 28) return null
  return number
}

function withLg(name) {
  return /^lg\b/i.test(name) ? name : `LG ${name}`
}

function familyOf(name) {
  const match = name.match(/^(.*)\(([^)]+)\)\s*$/)
  if (match && /hp/i.test(match[2])) {
    const hp = match[2].replace(/\s+/g, "").replace(/hp/i, " HP")
    return { family: match[1].trim(), specFromName: hp }
  }
  return { family: name.trim(), specFromName: null }
}

function parseVariant(raw) {
  const text = String(raw || "").trim()
  const match = text.match(/^(.*?)\(([^)]+)\)\s*$/)
  if (!match) {
    if (/inch/i.test(text)) return { spec: text.replace(/\s*inch/i, '"'), color: null }
    return { spec: null, color: text || null }
  }
  const left = match[1].trim()
  const inner = match[2].trim()
  if (/(kg|hp|inch|\bL\b)/i.test(inner) || /^\d/.test(inner)) {
    return { color: left || null, spec: inner }
  }
  const spec = left ? left.replace(/\s+/g, " / ") : null
  return { color: inner, spec }
}

function watersFrom(label) {
  if (!label) return []
  return ["Hot", "Ambient", "Cold"].filter((item) => label.toLowerCase().includes(item.toLowerCase()))
}

function specLabelFor(type, labels) {
  if (labels.length < 2) return "Specification"
  if (type === "ac") return "Capacity"
  if (type === "tv") return "Screen size"
  if (labels.some((label) => /kg|L\b|HP/i.test(label))) return "Capacity"
  return "Specification"
}

function defaultVisitCycle(type) {
  if (type === "fridge") return 12
  return 6
}

function visitPrices(type, fallback, cycle6, cycle12, cycle24) {
  const visit = { 6: money(cycle6), 12: money(cycle12), 24: money(cycle24) }
  const fallbackAmount = money(fallback)
  const slot = defaultVisitCycle(type)
  if (visit[slot] == null && fallbackAmount != null) visit[slot] = fallbackAmount
  return visit
}

function subscribeRow({ self, combined, none, visit }) {
  const row = {}
  if (self != null) row.self = self
  if (combined != null) row.combined = combined
  if (none != null) row.none = none
  if (visit && Object.values(visit).some((value) => value != null)) row.visit = visit
  return Object.keys(row).length ? row : null
}

function outrightFor(fields, type) {
  const base = money(fields.outright)
  if (type !== "water") return base
  const self = money(fields.outrightSelf) ?? base
  const combined = money(fields.outrightCombine) ?? (self != null ? self + 400 : null)
  const visit = money(fields.outrightVisit) ?? (self != null ? self + 800 : null)
  if (self == null && combined == null && visit == null) return null
  return { self, combined, visit }
}

const LIST_PRICE_HINTS = {
  WU525BS: {
    outright: { self: 5200, combined: 5600, visit: 6000 },
    subscribe: {
      84: { self: 110, combined: 120, visit: { 6: 130, 12: null, 24: null } },
      60: { self: 140, combined: 150, visit: { 6: 160, 12: null, 24: null } },
    },
  },
}

function pricingFor(fields, type) {
  const outright = outrightFor(fields, type)
  if (type === "tv") {
    const subscribe = {}
    const seven = subscribeRow({ none: money(fields.self84) ?? money(fields.visit84) })
    const five = subscribeRow({ none: money(fields.self60) ?? money(fields.visit60) })
    if (seven) subscribe[84] = seven
    if (five) subscribe[60] = five
    return { outright, subscribe }
  }
  const subscribe = {}
  const seven = subscribeRow({
    self: money(fields.self84),
    combined: money(fields.combine84),
    visit: visitPrices(type, fields.visit84, fields.visit84_6, fields.visit84_12, fields.visit84_24),
  })
  const five = subscribeRow({
    self: money(fields.self60),
    combined: money(fields.combine60),
    visit: visitPrices(type, fields.visit60, fields.visit60_6, fields.visit60_12, fields.visit60_24),
  })
  if (seven) subscribe[84] = seven
  if (five) subscribe[60] = five
  const priced = { outright, subscribe }
  if (!seven && !five && outright == null) {
    const hint = LIST_PRICE_HINTS[String(fields.model || "").split(".")[0].trim()]
    if (hint) return hint
  }
  return priced
}

function hasAnyPrice(pricing) {
  if (typeof pricing.outright === "number") return true
  if (pricing.outright && typeof pricing.outright === "object") {
    if (Object.values(pricing.outright).some((value) => typeof value === "number")) return true
  }
  return Object.values(pricing.subscribe).some((row) => {
    if (typeof row.none === "number" || typeof row.self === "number" || typeof row.combined === "number") return true
    return row.visit && Object.values(row.visit).some((value) => typeof value === "number")
  })
}

function hasCarePrice(pricing) {
  return Object.values(pricing.subscribe).some((row) => {
    if (typeof row.self === "number" || typeof row.combined === "number") return true
    return row.visit && Object.values(row.visit).some((value) => typeof value === "number")
  })
}

function loadCache() {
  if (!fs.existsSync(cachePath)) return {}
  const list = JSON.parse(fs.readFileSync(cachePath, "utf8"))
  return Object.fromEntries(list.map((item) => [item.url, item]))
}

function usableImage(record) {
  if (!record?.og) return null
  if (/logo-lg/i.test(record.og)) return null
  return record.og
}

function galleryFrom(record) {
  const og = usableImage(record)
  if (!og) return []
  const dir = og.slice(0, og.lastIndexOf("/"))
  const extra = (record.gallery || []).filter((src) => src.startsWith(dir) && src !== og)
  return [og, ...extra].slice(0, 5)
}

function specIdFor(row, specMap) {
  const base = slug(row.specLabel)
  const existing = specMap.get(base)
  if (!existing) return base
  if (JSON.stringify(existing.pricing) === JSON.stringify(row.pricing)) return base
  return slug(`${row.specLabel}-${row.model}`)
}

export function buildProducts(rows) {
  const cache = loadCache()
  const families = []
  const familyIndex = new Map()

  for (const raw of rows) {
    const row = asFields(raw)
    if (!row.category || !row.name) continue
    const meta = CATEGORY[row.category] || { category: row.category, type: "other" }
    const { family, specFromName } = familyOf(row.name)
    const parsed = parseVariant(row.variant)
    const specLabel = specFromName || parsed.spec || "Standard"
    const colorName = parsed.color
    // TVs of one series stay together. Everything else is keyed by model so
    // WD518AN and WD516AN cannot share a card. Colour SKUs like WU525BS.ABKRLML
    // stay with WU525BS.
    const modelCode = String(row.model || "").split(".")[0].trim() || row.model
    const key = meta.type === "tv" ? `tv::${row.category}::${family}` : `model::${modelCode}`
    if (!familyIndex.has(key)) {
      const entry = { key, categoryKey: row.category, ...meta, family, modelCode, copyFeaturesFrom: row.featureSource || null, rows: [] }
      familyIndex.set(key, entry)
      families.push(entry)
    } else if (row.featureSource && !familyIndex.get(key).copyFeaturesFrom) {
      familyIndex.get(key).copyFeaturesFrom = row.featureSource
    }
    const pageUrl = canonicalUrl(row.url)
    const record = pageUrl ? cache[pageUrl] : null
    const customImage = resolveHeroImage(modelCode, colorName, row.heroImage)
    const scrapedImage = usableImage(record)
    const scrapedGallery = galleryFrom(record)
    familyIndex.get(key).rows.push({
      model: row.model,
      specLabel,
      colorName,
      pricing: pricingFor(row, meta.type),
      url: pageUrl || null,
      image: customImage || scrapedImage,
      gallery: customImage ? [customImage, ...scrapedGallery.filter((src) => src !== customImage)].slice(0, 5) : scrapedGallery,
      customImage: Boolean(customImage),
    })
  }

  return families.map((family) => {
    const specOrder = []
    const specMap = new Map()
    for (const row of family.rows) {
      const specId = specIdFor(row, specMap)
      row.specId = specId
      if (!specMap.has(specId)) {
        specMap.set(specId, {
          id: specId,
          label: row.specLabel === "Standard" ? family.family : row.specLabel,
          available: hasAnyPrice(row.pricing),
          waters: watersFrom(row.specLabel),
          pricing: row.pricing,
        })
        specOrder.push(specId)
      }
    }

    const colorOrder = []
    const colorMap = new Map()
    for (const row of family.rows) {
      const specId = row.specId
      const colorId = slug(row.colorName || "finish")
      if (!colorMap.has(colorId)) {
        colorMap.set(colorId, {
          id: colorId,
          name: row.colorName || "Default",
          hex: HEX[(row.colorName || "").toLowerCase()] || "#D9D4CC",
          image: row.image,
          gallery: row.gallery,
          model: row.model,
          specIds: [],
          variants: {},
        })
        colorOrder.push(colorId)
      }
      const color = colorMap.get(colorId)
      if (!color.specIds.includes(specId)) color.specIds.push(specId)
      color.variants[specId] = {
        model: row.model,
        image: row.image || color.image,
        gallery: row.gallery?.length ? row.gallery : color.gallery,
        url: row.url,
      }
      if (!color.image && row.image) {
        color.image = row.image
        color.gallery = row.gallery
        color.model = row.model
      }
    }

    const colors = colorOrder.map((id) => colorMap.get(id))
    const donor = colors.find((color) => color.image && !isPlaceholderImage(color.image))?.image || fallbackImage
    for (const color of colors) {
      if (!color.image) color.image = donor
      if (!color.gallery?.length) color.gallery = [color.image]
      for (const specId of Object.keys(color.variants)) {
        if (!color.variants[specId].image) color.variants[specId].image = color.image
        if (!color.variants[specId].gallery?.length) color.variants[specId].gallery = [color.variants[specId].image]
      }
    }

    const visibleSpecs = specOrder.map((id) => specMap.get(id))
    const specLabels = visibleSpecs.map((spec) => spec.label)
    const hasCare = visibleSpecs.some((spec) => hasCarePrice(spec.pricing))
    const waters = visibleSpecs.flatMap((spec) => spec.waters).filter((value, index, list) => list.indexOf(value) === index)

    return {
      id: family.type === "tv" ? slug(family.family) : slug(`${family.family} ${family.modelCode || family.rows[0].model}`),
      type: family.type,
      sku: family.modelCode || family.rows[0].model,
      name: withLg(family.family),
      baseName: withLg(family.family),
      shortName: family.family,
      model: family.modelCode || family.rows[0].model,
      tagline: "LG Subscribe Malaysia. Monthly fees follow the specification and service plan.",
      category: family.category,
      waters,
      hasCare,
      specLabel: specLabelFor(family.type, specLabels),
      colors,
      specs: visibleSpecs,
      copyFeaturesFrom: family.copyFeaturesFrom || null,
    }
  })
}

// Carries scraped detail copy and galleries over from the previous generated file.
// The LG page URL in column L is the join key, so detail survives a price refresh.
export async function mergePriorDetail(products) {
  let prior = []
  try {
    prior = (await import(`${pathToFileURL(outPath).href}?v=${Date.now()}`)).PRODUCTS ?? []
  } catch {
    prior = []
  }
  const priorById = new Map(prior.map((product) => [product.id, product]))
  const savedByUrl = new Map()
  for (const old of prior) {
    for (const color of old.colors ?? []) {
      for (const variant of Object.values(color.variants ?? {})) {
        if (!variant.url) continue
        if (variant.detail || variant.gallery?.length > 1) {
          savedByUrl.set(variant.url, { detail: variant.detail, gallery: variant.gallery, image: variant.image })
        }
      }
    }
  }
  for (const product of products) {
    const sameId = priorById.get(product.id)
    const sameModel = prior.find((item) => compactModel(item.model) === compactModel(product.model))
    const sameName = prior.find((item) => item.shortName === product.shortName && compactModel(item.model) !== compactModel(product.model))
    const strong = sameId || sameModel
    if (strong) {
      if (strong.quickFeatures?.length) product.quickFeatures = strong.quickFeatures
      if (strong.stories?.length) product.stories = strong.stories
      if (strong.facts?.length && productHasOfficialUrl(product)) product.facts = strong.facts
      if (strong.tagline && !strong.tagline.startsWith("LG Subscribe Malaysia.")) product.tagline = strong.tagline
      if (strong.copyFeaturesFrom && !product.copyFeaturesFrom) product.copyFeaturesFrom = strong.copyFeaturesFrom
      if (strong.featureSource && !product.featureSource) product.featureSource = strong.featureSource
    } else if (sameName) {
      copySellingCopy(product, sameName)
      product.featureSource = sameName.model
    }
    for (const color of product.colors) {
      for (const variant of Object.values(color.variants)) {
        const saved = variant.url ? savedByUrl.get(variant.url) : null
        if (!saved) continue
        if (saved.detail) variant.detail = saved.detail
        if (saved.gallery?.length > 1 && isPlaceholderImage(variant.image)) {
          variant.gallery = saved.gallery
          variant.image = saved.image || saved.gallery[0]
        }
      }
      const lead = Object.values(color.variants).find((variant) => variant.gallery?.length > 1 && !isPlaceholderImage(variant.image))
      if (lead) {
        color.gallery = lead.gallery
        color.image = lead.image || lead.gallery[0]
      }
    }
  }
  return applyBorrowedFeatures(products)
}

function productHasOfficialUrl(product) {
  return (product.colors || []).some((color) =>
    Object.values(color.variants || {}).some((variant) => Boolean(variant.url)),
  )
}

function hasSellingCopy(product) {
  return Boolean(product?.quickFeatures?.length || product?.stories?.length)
}

function cloneCopy(value) {
  return JSON.parse(JSON.stringify(value || []))
}

function copySellingCopy(target, source) {
  if (source.quickFeatures?.length) target.quickFeatures = cloneCopy(source.quickFeatures)
  if (source.stories?.length) target.stories = cloneCopy(source.stories)
  if (source.tagline && !source.tagline.startsWith("LG Subscribe Malaysia.")) target.tagline = source.tagline
  for (const color of target.colors || []) {
    for (const variant of Object.values(color.variants || {})) {
      if (variant.detail?.quickFeatures?.length || variant.detail?.stories?.length) continue
      variant.detail = {
        tagline: target.tagline || source.tagline || null,
        quickFeatures: cloneCopy(target.quickFeatures),
        stories: cloneCopy(target.stories),
        facts: variant.detail?.facts || [],
      }
    }
  }
}

function findByModel(products, model) {
  const code = compactModel(model)
  if (!code) return null
  return (
    products.find((product) => compactModel(product.model) === code) ||
    products.find((product) => compactModel(product.sku) === code) ||
    products.find((product) =>
      (product.colors || []).some((color) => compactModel(color.model) === code || Object.values(color.variants || {}).some((variant) => compactModel(variant.model) === code)),
    )
  )
}

// No official URL: reuse selling copy from a model with the same features.
// Specs/facts stay off — those belong to a specific official page.
export function applyBorrowedFeatures(products) {
  for (const product of products) {
    const requested = product.copyFeaturesFrom
    if (requested) {
      const source = findByModel(products, requested)
      if (source && source !== product && hasSellingCopy(source)) {
        copySellingCopy(product, source)
        product.featureSource = source.model
      }
      if (!productHasOfficialUrl(product)) product.facts = []
      continue
    }
    if (!productHasOfficialUrl(product)) {
      product.facts = []
      if (!product.featureSource) {
        const sibling = products.find((item) => item !== product && item.shortName === product.shortName && hasSellingCopy(item))
        if (sibling) product.featureSource = sibling.model
      }
    }
    if (hasSellingCopy(product) || productHasOfficialUrl(product)) continue
    const source = products.find((item) => item !== product && item.shortName === product.shortName && hasSellingCopy(item))
    if (!source) continue
    copySellingCopy(product, source)
    product.featureSource = source.model
  }
  return products
}

export function writeProducts(products, { source }) {
  const banner = `// Generated from ${source}. Re-run the importer to refresh prices.
// Official detail copy is scraped from each LG page URL. Re-run scripts/import-details.mjs to refresh features, stories, and specs.
// Rows without a URL can copy selling features from Copy_Features_From, or from another product with the same name.
// Drop hero photos in public/products/{MODEL}.jpg or fill the Hero_Image column.
// A single Regular column maps to 6-month visits, or 12-month for refrigerators. Extra 6m/12m/24m columns override that.
// A repeated 28 in unfinished Combine cells is imported as null.
export const PRODUCTS = ${JSON.stringify(products, null, 2)}
`
  fs.writeFileSync(outPath, banner)
}

export function reportProducts(products) {
  console.log(`Wrote ${products.length} products to ${outPath}`)
  for (const product of products) {
    const colors = product.colors.map((color) => color.name).join(", ")
    const specs = product.specs.map((spec) => spec.label).join(" | ")
    const note = product.featureSource ? ` | features from ${product.featureSource}` : ""
    const photo = product.colors.every((color) => isPlaceholderImage(color.image)) ? " | photo needed" : ""
    console.log(`- ${product.shortName} [${product.category}] specs: ${specs} | colours: ${colors}${note}${photo}`)
  }
}
