import { useLayoutEffect, useMemo } from "react"
import { productStructuredData } from "../data/productSchema"

function readJsonLd() {
  return [...document.querySelectorAll('script[type="application/ld+json"]')]
    .map((node) => {
      try {
        return { node, data: JSON.parse(node.textContent) }
      } catch {
        return null
      }
    })
    .filter(Boolean)
}

function isProductScript(item) {
  return item.data?.["@type"] === "Product"
}

function isBreadcrumbScript(item) {
  return item.data?.["@type"] === "BreadcrumbList"
}

export default function ProductJsonLd({ product }) {
  const structured = useMemo(() => productStructuredData(product), [product])

  useLayoutEffect(() => {
    const existing = readJsonLd()
    const products = existing.filter(isProductScript)
    const crumbs = existing.filter(isBreadcrumbScript)
    const staticMatch =
      products.length === 1 &&
      crumbs.length === 1 &&
      products[0].data.url === structured.product.url &&
      products[0].data.sku === structured.product.sku &&
      products[0].data.offers?.price === structured.product.offers?.price
    const owned = staticMatch ? [products[0].node, crumbs[0].node] : null
    if (!owned) {
      for (const item of [...products, ...crumbs]) item.node.remove()
    }
    const added =
      owned ??
      [structured.product, structured.breadcrumb].map((block) => {
        const script = document.createElement("script")
        script.type = "application/ld+json"
        script.dataset.pdpSchema = "react"
        script.textContent = JSON.stringify(block)
        document.head.appendChild(script)
        return script
      })
    return () => {
      for (const script of added) script.remove()
    }
  }, [structured])

  return null
}
