import { mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { dirname } from "node:path"
import { fileURLToPath } from "node:url"

const CANONICAL = "https://lgsubscribehub.com.my/promotions/"
const TITLE = "LG Subscribe Promotions & Monthly Deals | Special Rental Rates Malaysia"
const DESCRIPTION =
  "Explore the latest official LG Subscribe promotions in Malaysia. Enjoy promotional monthly rental rates, 50% off selected months, free installation, and official CareShip service."
const OG_TITLE = "LG Subscribe Monthly Promotions & Official Deals"
const OG_DESCRIPTION =
  "Discover the latest monthly LG Rent Up & Subscription deals in Malaysia. Free installation & CareShip included."

const indexPath = fileURLToPath(new URL("../dist/index.html", import.meta.url))
let html = readFileSync(indexPath, "utf8")

if (!html.includes('name="robots"')) {
  html = html.replace(
    '<meta charset="UTF-8" />',
    '<meta charset="UTF-8" />\n    <meta name="robots" content="index, follow" />',
  )
}
html = html.replace(/<meta\s+name="robots"\s+content="[^"]*"\s*\/>/, '<meta name="robots" content="index, follow" />')
html = html.replace(/<link rel="canonical" href="[^"]*"\s*\/>/, `<link rel="canonical" href="${CANONICAL}" />`)
html = html.replace(/<meta\s+property="og:url"\s+content="[^"]*"\s*\/>/, `<meta property="og:url" content="${CANONICAL}" />`)
html = html.replace(/<meta\s+property="og:title"\s+content="[^"]*"\s*\/>/, `<meta property="og:title" content="${OG_TITLE}" />`)
html = html.replace(/<title>[^<]*<\/title>/, `<title>${TITLE}</title>`)
html = html.replace(/<meta\s+name="description"[\s\S]*?\/>/, `<meta name="description" content="${DESCRIPTION}" />`)
html = html.replace(/<meta\s+property="og:description"[\s\S]*?\/>/, `<meta property="og:description" content="${OG_DESCRIPTION}" />`)
html = html.replaceAll("https://lgsubscribehub.com.my/?lang=", "https://lgsubscribehub.com.my/promotions/?lang=")
html = html.replace(
  /<link rel="alternate" hreflang="x-default" href="[^"]*"\s*\/>/,
  `<link rel="alternate" hreflang="x-default" href="${CANONICAL}" />`,
)

const outPath = fileURLToPath(new URL("../dist/promotions/index.html", import.meta.url))
mkdirSync(dirname(outPath), { recursive: true })
writeFileSync(outPath, html)

if (!html.includes('content="index, follow"') || !html.includes(`href="${CANONICAL}"`)) {
  throw new Error("promotions HTML is missing robots or canonical")
}
if (/noindex|nofollow/i.test(html)) {
  throw new Error("promotions HTML must not contain noindex or nofollow")
}

console.log("dist/promotions/index.html")
