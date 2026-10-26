import { SITE_ORIGIN } from "../config.js"
import { dealForListing, groupOf } from "./catalog.js"

function productPath(id) {
  return `/product/${encodeURIComponent(id)}/`
}

function shopGroupPath(groupId) {
  return `/shop/${groupId}/`
}

export function titledName(product) {
  const name = product.baseName || product.name || ""
  const model = product.model
  if (!model) return name
  if (name.toUpperCase().includes(String(model).toUpperCase())) return name
  return `${name} ${model}`
}

export function productStructuredData(product) {
  const deal = dealForListing(product, product.specs)
  const image = product.colors.find((color) => color.image)?.image
  const url = `${SITE_ORIGIN}${productPath(product.id)}`
  const name = titledName(product)
  const productLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    sku: product.sku || product.model,
    brand: { "@type": "Brand", name: "LG" },
    category: product.category,
    description: product.tagline || undefined,
    image: image || undefined,
    url,
    offers:
      deal.now != null
        ? {
            "@type": "Offer",
            priceCurrency: "MYR",
            price: String(deal.now),
            availability: "https://schema.org/InStock",
            url,
          }
        : undefined,
  }
  const group = groupOf(product)
  const crumbs = [{ name: "Home", item: `${SITE_ORIGIN}/` }]
  if (group) crumbs.push({ name: group.name, item: `${SITE_ORIGIN}${shopGroupPath(group.id)}` })
  crumbs.push({ name, item: url })
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: crumb.item,
    })),
  }
  return { product: productLd, breadcrumb }
}
