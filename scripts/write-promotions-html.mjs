import { mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"
import { SITE_ORIGIN } from "../src/config.js"
import { CATEGORY_GROUPS, PRODUCTS, dealForListing } from "../src/data/catalog.js"
import en from "../src/i18n/en.js"

const PROMOTIONS = {
  title: "LG Subscribe Promotions & Monthly Deals | Special Rental Rates Malaysia",
  description:
    "Explore the latest official LG Subscribe promotions in Malaysia. Enjoy promotional monthly rental rates, 50% off selected months, free installation, and official CareShip service.",
  ogTitle: "LG Subscribe Monthly Promotions & Official Deals",
  ogDescription:
    "Discover the latest monthly LG Rent Up & Subscription deals in Malaysia. Free installation & CareShip included.",
}

function fill(template, vars) {
  return template.replace(/\{(\w+)\}/g, (_, key) => vars[key] ?? "")
}

function text(value) {
  return String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
}

function attr(value) {
  return text(value).replace(/"/g, "&quot;")
}

function pages() {
  const list = [
    { path: "/promotions/", ...PROMOTIONS },
    { path: "/care/", title: en.seo.careTitle, description: en.seo.careDescription },
    { path: "/career/", title: en.seo.careerTitle, description: en.seo.careerDescription },
    {
      path: "/shop/water-air/",
      title: fill(en.seo.categoryTitle, { name: en.groups["water-air"].name }),
      description: en.groups["water-air"].blurb,
      robots: "noindex, follow",
    },
  ]
  for (const group of CATEGORY_GROUPS) {
    const copy = en.groups[group.id]
    list.push({
      path: `/shop/${group.id}/`,
      title: fill(en.seo.categoryTitle, { name: copy.name }),
      description: fill(en.seo.categoryDescription, { blurb: copy.blurb }),
    })
  }
  for (const product of PRODUCTS) {
    const name = product.baseName || product.name
    const price = dealForListing(product, product.specs).now
    const image = product.colors?.find((color) => color.image)?.image || ""
    list.push({
      path: `/product/${encodeURIComponent(product.id)}/`,
      title: price != null ? fill(en.seo.productTitle, { name, price }) : fill(en.seo.productTitlePlain, { name }),
      description: fill(en.seo.productDescription, { name }),
      image,
    })
  }
  return list
}

function render(template, page) {
  const canonical = `${SITE_ORIGIN}${page.path}`
  const title = page.title
  const description = page.description
  const ogTitle = page.ogTitle || title
  const ogDescription = page.ogDescription || description
  let html = template
  if (!html.includes('name="robots"')) {
    html = html.replace(
      '<meta charset="UTF-8" />',
      '<meta charset="UTF-8" />\n    <meta name="robots" content="index, follow" />',
    )
  }
  html = html.replace(/<meta\s+name="robots"\s+content="[^"]*"\s*\/>/, `<meta name="robots" content="${attr(page.robots || "index, follow")}" />`)
  html = html.replace(/<link rel="canonical" href="[^"]*"\s*\/>/, `<link rel="canonical" href="${attr(canonical)}" />`)
  html = html.replace(/<meta\s+property="og:url"\s+content="[^"]*"\s*\/>/, `<meta property="og:url" content="${attr(canonical)}" />`)
  html = html.replace(/<meta\s+property="og:title"\s+content="[^"]*"\s*\/>/, `<meta property="og:title" content="${attr(ogTitle)}" />`)
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${text(title)}</title>`)
  html = html.replace(/<meta\s+name="description"[\s\S]*?\/>/, `<meta name="description" content="${attr(description)}" />`)
  html = html.replace(
    /<meta\s+property="og:description"[\s\S]*?\/>/,
    `<meta property="og:description" content="${attr(ogDescription)}" />`,
  )
  html = html.replaceAll(`${SITE_ORIGIN}/?lang=`, `${canonical}?lang=`)
  html = html.replace(
    /<link rel="alternate" hreflang="x-default" href="[^"]*"\s*\/>/,
    `<link rel="alternate" hreflang="x-default" href="${attr(canonical)}" />`,
  )
  if (page.image) {
    html = html.replace(/<meta\s+property="og:image"\s+content="[^"]*"\s*\/>/, `<meta property="og:image" content="${attr(page.image)}" />`)
    html = html.replace(/<meta\s+name="twitter:image"\s+content="[^"]*"\s*\/>/, `<meta name="twitter:image" content="${attr(page.image)}" />`)
  }
  if (!html.includes(`content="${page.robots || "index, follow"}"`) || !html.includes(`href="${attr(canonical)}"`)) {
    throw new Error(`missing robots or canonical for ${page.path}`)
  }
  if (!page.robots && /noindex|nofollow/i.test(html)) throw new Error(`noindex found for ${page.path}`)
  return html
}

const dist = fileURLToPath(new URL("../dist", import.meta.url))
const template = readFileSync(join(dist, "index.html"), "utf8")
const built = pages()
for (const page of built) {
  const outPath = join(dist, page.path, "index.html")
  mkdirSync(dirname(outPath), { recursive: true })
  writeFileSync(outPath, render(template, page))
}
console.log(`route html ${built.length} pages`)
