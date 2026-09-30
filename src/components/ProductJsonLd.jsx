import { SITE_ORIGIN } from "../config"
import { dealForListing } from "../data/catalog"
import { productPath } from "../router"

export default function ProductJsonLd({ product }) {
  const deal = dealForListing(product, product.specs)
  const image = product.colors.find((color) => color.image)?.image
  const data = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.baseName || product.name,
    sku: product.sku || product.model,
    brand: { "@type": "Brand", name: "LG" },
    category: product.category,
    description: product.tagline || undefined,
    image: image || undefined,
    url: `${SITE_ORIGIN}${productPath(product.id)}`,
    offers:
      deal.now != null
        ? {
            "@type": "Offer",
            priceCurrency: "MYR",
            price: String(deal.now),
            availability: "https://schema.org/InStock",
            url: `${SITE_ORIGIN}${productPath(product.id)}`,
          }
        : undefined,
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}
