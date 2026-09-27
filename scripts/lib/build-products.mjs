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

// Column layout of the source sheet. Keep in sync with sheet/README.md.
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

const HEX = {
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

function pricingFor(row, isTv) {
  if (isTv) {
    return {
      outright: money(row.E),
      subscribe: {
        84: { none: money(row.F) },
        60: { none: money(row.J) ?? money(row.I) },
      },
    }
  }
  return {
    outright: money(row.E),
    subscribe: {
      84: {
        self: money(row.F),
        combined: money(row.G),
        visit: { 6: money(row.H), 12: null, 24: null },
      },
      60: {
        self: money(row.I),
        combined: money(row.K),
        visit: { 6: money(row.J), 12: null, 24: null },
      },
    },
  }
}

function hasAnyPrice(pricing) {
  if (typeof pricing.outright === "number") return true
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

  for (const row of rows) {
    if (!row.A || !row.C) continue
    const meta = CATEGORY[row.A] || { category: row.A, type: "other" }
    const { family, specFromName } = familyOf(row.C)
    const parsed = parseVariant(row.D)
    const specLabel = specFromName || parsed.spec || "Standard"
    const colorName = parsed.color
    const key = `${row.A}::${family}`
    if (!familyIndex.has(key)) {
      const entry = { key, categoryKey: row.A, ...meta, family, rows: [] }
      familyIndex.set(key, entry)
      families.push(entry)
    }
    const record = row.L ? cache[row.L] : null
    familyIndex.get(key).rows.push({
      model: row.B,
      specLabel,
      colorName,
      pricing: pricingFor(row, meta.type === "tv"),
      url: row.L || null,
      image: usableImage(record),
      gallery: galleryFrom(record),
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
    const donor = colors.find((color) => color.image)?.image || fallbackImage
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
      id: slug(family.family),
      type: family.type,
      sku: family.rows[0].model,
      name: withLg(family.family),
      baseName: withLg(family.family),
      shortName: family.family,
      model: family.rows[0].model,
      tagline: "LG Subscribe Malaysia. Monthly fees follow the specification and service plan.",
      category: family.category,
      waters,
      hasCare,
      specLabel: specLabelFor(family.type, specLabels),
      colors,
      specs: visibleSpecs,
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
  for (const product of products) {
    const old = priorById.get(product.id)
    if (!old) continue
    if (old.quickFeatures?.length) product.quickFeatures = old.quickFeatures
    if (old.stories?.length) product.stories = old.stories
    if (old.facts?.length) product.facts = old.facts
    if (old.tagline && !old.tagline.startsWith("LG Subscribe Malaysia.")) product.tagline = old.tagline
    const savedByUrl = new Map()
    for (const color of old.colors ?? []) {
      for (const variant of Object.values(color.variants ?? {})) {
        if (!variant.url) continue
        if (variant.detail || variant.gallery?.length > 1) {
          savedByUrl.set(variant.url, { detail: variant.detail, gallery: variant.gallery, image: variant.image })
        }
      }
    }
    for (const color of product.colors) {
      for (const variant of Object.values(color.variants)) {
        const saved = savedByUrl.get(variant.url)
        if (!saved) continue
        if (saved.detail) variant.detail = saved.detail
        if (saved.gallery?.length > 1) {
          variant.gallery = saved.gallery
          variant.image = saved.image || saved.gallery[0]
        }
      }
      const lead = Object.values(color.variants).find((variant) => variant.gallery?.length > 1)
      if (lead) {
        color.gallery = lead.gallery
        color.image = lead.image || lead.gallery[0]
      }
    }
  }
  return products
}

export function writeProducts(products, { source }) {
  const banner = `// Generated from ${source}. Re-run the importer to refresh prices.
// Official detail copy is scraped from each LG page URL. Re-run scripts/import-details.mjs to refresh features, stories, and specs.
// Regular Visit prices in the sheet are stored on the 6-month cycle. 12-month and 24-month slots are null until filled.
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
    console.log(`- ${product.shortName} [${product.category}] specs: ${specs} | colours: ${colors}`)
  }
}
