import { COMPANY, INDEPENDENCE_NOTICE, SITE_ORIGIN } from "../config"
import { GOOGLE_REVIEWS_URL, REVIEWS, reviewStats } from "../data/reviews"
import { STORES } from "../data/stores"

export default function SeoJsonLd() {
  const stats = reviewStats()
  const reviews = REVIEWS.map((review) => ({
    "@type": "Review",
    author: { "@type": "Person", name: review.author },
    datePublished: review.date || undefined,
    reviewBody: review.quote || undefined,
    name: review.product || undefined,
    reviewRating: {
      "@type": "Rating",
      ratingValue: String(review.rating),
      bestRating: "5",
      worstRating: "1",
    },
  }))

  const aggregateRating =
    stats.count > 0
      ? {
          "@type": "AggregateRating",
          ratingValue: String(stats.average),
          reviewCount: String(stats.count),
          ratingCount: String(stats.count),
          bestRating: "5",
          worstRating: "1",
        }
      : undefined

  const areaServed = [
    { "@type": "Country", name: "Malaysia" },
    { "@type": "State", name: "Johor" },
    { "@type": "City", name: "Batu Pahat" },
  ]

  const locations = STORES.map((store) => ({
    "@type": "LocalBusiness",
    "@id": `${SITE_ORIGIN}/#${store.id}`,
    name: `${store.name} — ${COMPANY.name}`,
    image: `${SITE_ORIGIN}${store.photo}`,
    telephone: COMPANY.phoneTel,
    email: COMPANY.email,
    url: store.maps,
    areaServed,
    address: {
      "@type": "PostalAddress",
      streetAddress: store.address,
      addressLocality: store.shortName.includes("Parit Raja") ? "Parit Raja" : "Batu Pahat",
      addressRegion: "Johor",
      postalCode: store.shortName.includes("Parit Raja") ? "66400" : "83000",
      addressCountry: "MY",
    },
  }))

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: COMPANY.name,
        legalName: COMPANY.name,
        identifier: COMPANY.ssm,
        url: SITE_ORIGIN,
        telephone: COMPANY.phoneTel,
        email: COMPANY.email,
        description: INDEPENDENCE_NOTICE,
        areaServed,
        sameAs: [GOOGLE_REVIEWS_URL],
        aggregateRating,
        review: reviews,
        location: locations,
      },
      ...locations.map((store) => ({
        ...store,
        parentOrganization: { "@type": "Organization", name: COMPANY.name, url: SITE_ORIGIN },
        aggregateRating,
        review: reviews,
      })),
    ],
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}
