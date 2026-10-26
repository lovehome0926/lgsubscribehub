import { productStructuredData } from "../data/productSchema"

export default function ProductJsonLd({ product }) {
  const { product: productLd, breadcrumb } = productStructuredData(product)
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
    </>
  )
}
