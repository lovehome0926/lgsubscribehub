import { writeFileSync } from "node:fs"
import { SITE_ORIGIN } from "../src/config.js"
import { CATEGORY_GROUPS, PRODUCTS } from "../src/data/catalog.js"

function xml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}

function loc(path) {
  return `${SITE_ORIGIN}${path === "/" ? "/" : path}`
}

function urlEntry(path, changefreq, priority) {
  const priorityTag = priority ? `\n    <priority>${priority}</priority>` : ""
  return `  <url>
    <loc>${xml(loc(path))}</loc>
    <changefreq>${changefreq}</changefreq>${priorityTag}
  </url>`
}

const paths = [
  ["/", "weekly"],
  ["/promotions/", "monthly", "0.9"],
  ["/care/", "monthly"],
  ["/career/", "monthly"],
  ...CATEGORY_GROUPS.map((group) => [`/shop/${group.id}/`, "weekly"]),
  ...PRODUCTS.map((product) => [`/product/${encodeURIComponent(product.id)}/`, "weekly"]),
]

const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map(([path, freq, priority]) => urlEntry(path, freq, priority)).join("\n")}
</urlset>
`

writeFileSync(new URL("../public/sitemap.xml", import.meta.url), body)
console.log(`sitemap.xml ${paths.length} urls`)
