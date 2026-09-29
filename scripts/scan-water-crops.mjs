import fs from "fs"
import path from "path"
import sharp from "sharp"
import { PRODUCTS as BASE } from "../src/data/subscribe2026.js"
import { EXTRA_PRODUCTS, patchProducts } from "../src/data/campaign.js"

const root = path.resolve(import.meta.dirname, "..")
const outPath = path.join(root, "src", "data", "photoCrop.js")
const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36"

function collectUrls() {
  const products = patchProducts([...BASE, ...EXTRA_PRODUCTS]).filter((item) => item.type === "water" && !item.paused)
  const urls = new Set()
  for (const product of products) {
    for (const color of product.colors || []) {
      if (color.image) urls.add(color.image)
      for (const src of color.gallery || []) urls.add(src)
      for (const variant of Object.values(color.variants || {})) {
        if (variant.image) urls.add(variant.image)
        for (const src of variant.gallery || []) urls.add(src)
        for (const story of variant.detail?.stories || []) {
          if (story.poster) urls.add(story.poster)
        }
      }
    }
    for (const story of product.stories || []) {
      if (story.poster) urls.add(story.poster)
    }
  }
  return [...urls].filter((src) => /^https?:\/\//.test(src))
}

function columnWhite(data, width, height, x, channels) {
  const step = Math.max(1, Math.floor(height / 48))
  let white = 0
  let total = 0
  for (let y = 0; y < height; y += step) {
    const i = (y * width + x) * channels
    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]
    total += 1
    if (r > 242 && g > 242 && b > 242) white += 1
  }
  return white / total
}

function measure(data, width, height, channels) {
  const step = Math.max(1, Math.floor(width / 160))
  let left = 0
  let right = width
  for (let x = 0; x < width; x += step) {
    if (columnWhite(data, width, height, x, channels) >= 0.92) left = x + step
    else break
  }
  for (let x = width - 1; x >= 0; x -= step) {
    if (columnWhite(data, width, height, x, channels) >= 0.92) right = x
    else break
  }
  const leftRatio = left / width
  const rightRatio = (width - right) / width
  if (leftRatio >= 0.12 && leftRatio > rightRatio + 0.04) return { side: "left", ratio: Number(leftRatio.toFixed(3)) }
  if (rightRatio >= 0.12 && rightRatio > leftRatio + 0.04) return { side: "right", ratio: Number(rightRatio.toFixed(3)) }
  return { side: "none", ratio: 0 }
}

async function scan(url) {
  const res = await fetch(url, { headers: { "User-Agent": UA, Accept: "image/*" } })
  if (!res.ok) throw new Error(`${res.status} ${url}`)
  const buffer = Buffer.from(await res.arrayBuffer())
  const { data, info } = await sharp(buffer).resize({ width: 480, withoutEnlargement: true }).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
  return measure(data, info.width, info.height, info.channels)
}

const urls = collectUrls()
const crop = {}
for (const url of urls) {
  try {
    crop[url] = await scan(url)
    console.log(crop[url].side, crop[url].ratio, url.split("/").pop())
  } catch (error) {
    console.warn("skip", url, error.message)
    crop[url] = { side: "none", ratio: 0 }
  }
}

fs.writeFileSync(
  outPath,
  `export const PHOTO_CROP = ${JSON.stringify(crop, null, 2)}\n\nexport function photoCrop(src) {\n  return PHOTO_CROP[src] || { side: "none", ratio: 0 }\n}\n`,
)
console.log("wrote", Object.keys(crop).length, "entries")
