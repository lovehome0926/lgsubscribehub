import fs from "fs"
import path from "path"
import { PRODUCTS } from "../src/data/subscribe2026.js"
import { applyBorrowedFeatures } from "./lib/build-products.mjs"

const root = path.resolve(import.meta.dirname, "..")
const cachePath = path.join(root, "scripts", "detail-cache.json")
const outPath = path.join(root, "src", "data", "subscribe2026.js")
const samplePath = process.argv.includes("--sample") ? process.argv[process.argv.indexOf("--sample") + 1] : ""

const SKIP_TITLE =
  /^(lg subscribe|faq|summary|features|specs|specifications|reviews|support|where to buy|need help\??|our picks for you|what people are saying|find locally|all spec|dimensions|product registration|product support|order support|repair request|chat with us|key features)$/i

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36"

function cleanText(value) {
  return String(value || "")
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&trade;/gi, "™")
    .replace(/&reg;/gi, "®")
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCharCode(parseInt(n, 16)))
    .replace(/\s+/g, " ")
    .trim()
}

function abs(src) {
  if (!src) return null
  const pathName = src.split("?")[0].split(" ")[0]
  if (pathName.startsWith("http")) return pathName
  if (pathName.startsWith("/")) return `https://www.lg.com${pathName}`
  return null
}

function usefulImage(src) {
  const url = abs(src)
  if (!url) return null
  if (/gnb-banner|logo-lg|plp-b2c|rent-up-button|membership|instalment|streaming-week|subscribe-2025-banner|\/Dim\.jpg|\/icon|sprite|\/jcr:content\//i.test(url)) return null
  if (!/\.(jpg|jpeg|png|webp)$/i.test(url)) return null
  return url
}

function galleryShots(html) {
  const start = html.search(/c-gallery__display--large|c-gallery__item--display-image|type-gallery/)
  if (start < 0) return []
  const chunk = html.slice(start, start + 120000)
  const found = []
  const seen = new Set()
  for (const match of chunk.matchAll(/<img[^>]+src="([^"]+)"/g)) {
    let raw = match[1].split("?")[0].split(" ")[0]
    raw = raw.replace(/\/jcr:content\/renditions\/.*$/i, "")
    if (!/\.(jpg|jpeg|png|webp)$/i.test(raw)) continue
    if (/logo|icon|favicon|gnb-banner|sprite|subscribe-2025-banner|mqdefault|hqdefault|ytimg/i.test(raw)) continue
    const url = (raw.startsWith("http") ? raw : `https://www.lg.com${raw}`).replace("/350x350/", "/450x450/")
    if (seen.has(url)) continue
    seen.add(url)
    found.push(url)
    if (found.length >= 5) break
  }
  return found
}

function usefulVideo(src) {
  const url = abs(src)
  if (!url || !/\.mp4$/i.test(url)) return null
  if (/logo-lg|gnb-banner/i.test(url)) return null
  return url
}

function paragraphs(chunk) {
  return [...chunk.matchAll(/<p>([\s\S]*?)<\/p>/g)]
    .map((match) => cleanText(match[1]))
    .filter((text) => text && !text.startsWith("*") && !/^product image for reference/i.test(text) && text.length > 24 && text.length < 520)
}

function bodyCopy(chunk) {
  const bodies = [...chunk.matchAll(/c-text-contents__bodycopy[\s\S]*?<div class="cmp-text">([\s\S]*?)<\/div>/g)].map((match) => match[1])
  const fromP = paragraphs(bodies.join("\n") || chunk)
  if (fromP.length) return fromP.slice(0, 2).join(" ").slice(0, 420)
  for (const source of bodies) {
    const text = cleanText(source)
    if (!text || text.startsWith("*") || /^product image for reference/i.test(text) || text.length < 40) continue
    return text.slice(0, 420)
  }
  return ""
}

function pickImage(chunk) {
  const urls = [...chunk.matchAll(/(?:src|srcSet)="([^"]+)"/g)].map((match) => usefulImage(match[1])).filter(Boolean)
  const score = (url) => {
    let value = 2
    if (/\/desktop\/|-desktop\.|-d\.jpg/i.test(url)) value = 4
    else if (/mobile/i.test(url)) value = 1
    if (/thumbnail/i.test(url)) value -= 2
    return value
  }
  return urls.sort((a, b) => score(b) - score(a))[0] || null
}

function pickVideo(chunk) {
  const urls = [...chunk.matchAll(/(?:src|contentUrl)="([^"]+\.mp4[^"]*)"/g)].map((match) => usefulVideo(match[1])).filter(Boolean)
  return urls.find((url) => /desktop/i.test(url)) || urls[0] || null
}

function tidySentence(value) {
  const sentence = String(value || "").split(/(?<=\.)\s/)[0]
  return sentence
    .replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹]+[⁾)]?/g, "")
    .replace(/\s+/g, " ")
    .replace(/\s+\./g, ".")
    .trim()
}

function makeTagline(quick, stories) {
  const bits = []
  for (const item of [...quick, ...stories]) {
    const clean = tidySentence(item.copy).replace(/\.$/, "")
    if (clean.length < 40) continue
    const next = [...bits, clean].join(". ")
    if (bits.length && next.length > 168) break
    bits.push(clean.length > 168 ? clean.slice(0, 165).replace(/\s+\S*$/, "") : clean)
    if (bits.length >= 2) break
  }
  if (!bits.length) return null
  return `${bits.join(". ")}.`
}

function blockTitle(part) {
  return cleanText((part.match(/<h[23] class="cmp-title__text">([\s\S]*?)<\/h[23]>/) || [])[1] || "")
}

function storyCopy(part) {
  const copy = bodyCopy(part)
  if (copy.length < 40 || /monthly subscription plan|lg subscribe lets you/i.test(copy)) return ""
  return copy
}

function nearbyMedia(parts, index) {
  for (let cursor = index + 1; cursor < Math.min(parts.length, index + 5); cursor += 1) {
    const next = parts[cursor]
    if (blockTitle(next) && storyCopy(next)) break
    const poster = pickImage(next)
    const video = pickVideo(next)
    if (poster || video) return { poster, video }
  }
  return { poster: null, video: null }
}

export function parseDetail(html) {
  const parts = html.split(/<div class="c-wrapper /).slice(1)
  const quick = []
  const stories = []
  const seenTitles = new Set()
  const storyKinds = ["ST0016", "ST0001", "ST0002", "ST0003", "ST0005", "ST0013", "ST0027"]

  for (const part of parts) {
    if (!part.startsWith("ST0007") || quick.length) continue
    for (const slide of part.split(/swiper-slide/)) {
      const title = cleanText((slide.match(/<h2 class="cmp-title__text">([\s\S]*?)<\/h2>/) || [])[1] || "")
      const copy = paragraphs(slide)[0] || bodyCopy(slide)
      if (!title || !copy || SKIP_TITLE.test(title) || copy.length < 24) continue
      quick.push({ title, copy: copy.slice(0, 220) })
      if (quick.length >= 4) break
    }
  }

  function consider(index, allowNearby) {
    if (stories.length >= 4) return
    const part = parts[index]
    if (!storyKinds.some((kind) => part.startsWith(kind))) return
    const title = blockTitle(part)
    if (!title || title.length > 90 || SKIP_TITLE.test(title) || seenTitles.has(title.toLowerCase())) return
    const copy = storyCopy(part)
    if (!copy) return
    let poster = pickImage(part)
    let video = pickVideo(part)
    if (!poster && !video) {
      if (!allowNearby) return
      const near = nearbyMedia(parts, index)
      poster = near.poster
      video = near.video
    }
    if (!poster && !video) return
    seenTitles.add(title.toLowerCase())
    stories.push({ title, copy, poster, video })
  }

  for (let index = 0; index < parts.length; index += 1) consider(index, false)
  for (let index = 0; index < parts.length; index += 1) consider(index, true)

  if (quick.length < 4) {
    for (const story of stories) {
      if (quick.some((item) => item.title.toLowerCase() === story.title.toLowerCase())) continue
      const sentence = story.copy.split(/(?<=\.)\s/)[0]
      quick.push({ title: story.title, copy: sentence.slice(0, 180) })
      if (quick.length >= 4) break
    }
  }

  const facts = []
  const seen = new Set()
  for (const match of html.matchAll(
    /c-compare-selling__spec-name">\s*<p>([\s\S]*?)<\/p>[\s\S]{0,220}?c-compare-selling__spec-desc">\s*<p>([\s\S]*?)<\/p>/g,
  )) {
    const label = cleanText(match[1])
    const value = cleanText(match[2])
    if (!label || !value || value.length > 90 || seen.has(label.toLowerCase())) continue
    seen.add(label.toLowerCase())
    facts.push({ label, value })
  }
  const rich = facts.filter((item) => !/^(yes|no|n\/a|-)$/i.test(item.value))
  const picked = (rich.length >= 6 ? rich : facts).slice(0, 12)

  if (!quick.length && !stories.length && !picked.length) return null
  return {
    tagline: makeTagline(quick, stories),
    quickFeatures: quick,
    stories,
    facts: picked,
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function fetchHtml(url) {
  for (let attempt = 0; attempt < 3; attempt += 1) {
    const response = await fetch(url, {
      headers: {
        "User-Agent": UA,
        Accept: "text/html,application/xhtml+xml",
        "Accept-Language": "en-MY,en;q=0.9",
      },
    })
    if (response.status === 403 || response.status === 429) {
      await sleep(1200 * (attempt + 1))
      continue
    }
    if (!response.ok) return { status: response.status, html: "" }
    return { status: response.status, html: await response.text() }
  }
  return { status: 403, html: "" }
}

function detailUrls(products) {
  const urls = []
  const seen = new Set()
  for (const product of products) {
    for (const color of product.colors) {
      for (const variant of Object.values(color.variants || {})) {
        if (!variant.url || seen.has(variant.url)) continue
        seen.add(variant.url)
        urls.push(variant.url)
      }
    }
  }
  return urls
}

async function loadCache(urls) {
  let cache = {}
  if (fs.existsSync(cachePath)) cache = JSON.parse(fs.readFileSync(cachePath, "utf8"))
  const force = process.argv.includes("--force")
  const pending = urls.filter((url) => {
    if (force) return true
    const entry = cache[url]
    if (!entry) return true
    if (Array.isArray(entry.gallery)) return false
    return entry.status !== 404
  })
  let cursor = 0
  async function worker() {
    while (cursor < pending.length) {
      const url = pending[cursor]
      cursor += 1
      const { status, html } = await fetchHtml(url)
      const detail = html ? parseDetail(html) : null
      const gallery = html ? galleryShots(html) : []
      cache[url] = {
        status,
        tagline: detail?.tagline ?? null,
        quickFeatures: detail?.quickFeatures || [],
        stories: detail?.stories || [],
        facts: detail?.facts || [],
        gallery,
      }
      fs.writeFileSync(cachePath, JSON.stringify(cache))
      const quick = cache[url].quickFeatures?.length || 0
      const stories = cache[url].stories?.length || 0
      const facts = cache[url].facts?.length || 0
      console.log(`${status} gallery=${gallery.length} quick=${quick} stories=${stories} facts=${facts} ${url}`)
      await sleep(500)
    }
  }
  await Promise.all([worker(), worker()])
  return cache
}

function usable(entry) {
  return Boolean(entry && (entry.quickFeatures?.length || entry.stories?.length || entry.facts?.length))
}

function publicDetail(entry) {
  const quickFeatures = entry.quickFeatures || []
  const stories = entry.stories || []
  return {
    tagline: makeTagline(quickFeatures, stories),
    quickFeatures,
    stories,
    facts: entry.facts || [],
  }
}

if (samplePath) {
  const parsed = parseDetail(fs.readFileSync(samplePath, "utf8"))
  console.log(JSON.stringify(parsed, null, 2))
  process.exit(0)
}

if (process.argv.includes("--check")) {
  const url = process.argv[process.argv.indexOf("--check") + 1]
  const { status, html } = await fetchHtml(url)
  const parsed = html ? parseDetail(html) : null
  console.log(status, parsed?.quickFeatures?.map((item) => item.title).join(" | "))
  console.log(parsed?.stories?.map((item) => `${item.title} :: ${(item.poster || item.video || "").split("/").pop()}`).join("\n"))
  console.log("facts", parsed?.facts?.length || 0)
  process.exit(0)
}

const requested = process.argv.filter((arg) => /^https?:\/\//.test(arg))
const urls = requested.length ? requested : detailUrls(PRODUCTS)
const cache = await loadCache(urls)

for (const product of PRODUCTS) {
  let primary = null
  for (const color of product.colors) {
    let colorGallery = null
    for (const variant of Object.values(color.variants || {})) {
      const entry = cache[variant.url]
      if (usable(entry)) {
        variant.detail = publicDetail(entry)
        if (!primary) primary = variant.detail
      }
      if (entry?.gallery?.length && !String(variant.image || color.image || "").startsWith("/products/")) {
        variant.gallery = entry.gallery
        variant.image = entry.gallery[0]
        if (!colorGallery) colorGallery = entry.gallery
      }
    }
    if (colorGallery) {
      color.gallery = colorGallery
      color.image = colorGallery[0]
    }
  }
  if (!primary) continue
  product.quickFeatures = primary.quickFeatures
  product.stories = primary.stories
  product.facts = primary.facts
  if (primary.tagline) product.tagline = primary.tagline
}

applyBorrowedFeatures(PRODUCTS)

const banner = `// Generated from LG_Subscribe_Products_2026.xlsx. Re-run scripts/import-subscribe.mjs to refresh prices.
// Official detail copy is scraped from each LG page URL. Re-run scripts/import-details.mjs to refresh features, stories, and specs.
// Regular Visit prices in the sheet are stored on the 6-month cycle. 12-month and 24-month slots are null until filled.
// A repeated 28 in unfinished Combine cells is imported as null.
export const PRODUCTS = ${JSON.stringify(PRODUCTS, null, 2)}
`

fs.writeFileSync(outPath, banner)
const filled = PRODUCTS.filter((product) => product.quickFeatures?.length || product.stories?.length).length
console.log(`Wrote details for ${filled}/${PRODUCTS.length} products`)
