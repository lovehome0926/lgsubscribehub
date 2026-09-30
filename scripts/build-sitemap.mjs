import { writeFileSync } from "node:fs"
import { SITE_ORIGIN } from "../src/config.js"
import { CATEGORY_GROUPS, PRODUCTS } from "../src/data/catalog.js"

const LANGS = [
  ["en-MY", "en"],
  ["ms-MY", "bm"],
  ["zh-CN", "cn"],
]

function xml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}

function loc(path, lang) {
  const clean = path === "/" ? "/" : path
  return lang ? `${SITE_ORIGIN}${clean}?lang=${lang}` : `${SITE_ORIGIN}${clean}`
}

function urlEntry(path, changefreq) {
  const links = LANGS.map(
    ([hreflang, lang]) =>
      `    <xhtml:link rel="alternate" hreflang="${hreflang}" href="${xml(loc(path, lang))}" />`,
  ).join("\n")
  return `  <url>
    <loc>${xml(loc(path))}</loc>
    <changefreq>${changefreq}</changefreq>
${links}
    <xhtml:link rel="alternate" hreflang="x-default" href="${xml(loc(path))}" />
  </url>`
}

const paths = [
  ["/", "weekly"],
  ["/care", "monthly"],
  ["/career", "monthly"],
  ...CATEGORY_GROUPS.map((group) => [`/shop/${group.id}`, "weekly"]),
  ...PRODUCTS.map((product) => [`/product/${encodeURIComponent(product.id)}`, "weekly"]),
]

const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${paths.map(([path, freq]) => urlEntry(path, freq)).join("\n")}
</urlset>
`

writeFileSync(new URL("../public/sitemap.xml", import.meta.url), body)
console.log(`sitemap.xml ${paths.length} urls`)
