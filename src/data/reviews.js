// Generated from sheet/reviews.csv.
// Easiest edit: sheet/reviews.csv  (Author, Rating, Date, Product, Quote)
// Or add a Reviews tab in the product xlsx with the same headers, then npm run import:xlsx
// Photos: INSTALL_PHOTOS = install shots only. GROUP_PHOTOS = customer/team group photos.
import { CUSTOMER_PHOTOS } from "./photos.js"

export const GOOGLE_REVIEWS_URL = "https://share.google/vWXCox9437yQaN0Cu"
export const GOOGLE_REVIEW_SUMMARY = { count: 23, url: GOOGLE_REVIEWS_URL }

export const REVIEWS = [
  {
    "author": "Ms from Batu Pahat",
    "rating": 5,
    "date": "2026-08-18",
    "product": "PuriCare Water Purifier",
    "quote": "Cindy explained the monthly plan clearly and the installation team was tidy.",
    "source": "manual"
  },
  {
    "author": "Mr from Parit Raja",
    "rating": 5,
    "date": "2026-08-22",
    "product": "DUALCOOL Air Conditioner",
    "quote": "Visited the Lotus's kiosk, compared packages, and got follow-up on WhatsApp the same day.",
    "source": "manual"
  },
  {
    "author": "Ms from Yong Peng",
    "rating": 5,
    "date": "2026-09-02",
    "product": "Front Load Washer FX1412S5GR",
    "quote": "Needed a 12kg washer for the family. The Brandshop let us see the machine first.",
    "source": "manual"
  },
  {
    "author": "Mr from Ayer Hitam",
    "rating": 5,
    "date": "2026-09-10",
    "product": "LG Subscribe application",
    "quote": "No pressure to decide on the spot. Documents and CareShip options were walked through one by one.",
    "source": "manual"
  },
  {
    "author": "Ms from Kluang",
    "rating": 5,
    "date": "2026-09-16",
    "product": "Washer Dryer",
    "quote": "Drove to Flora Utama for the briefing. After-sales WhatsApp replies have been fast.",
    "source": "manual"
  },
  {
    "author": "Mr from Batu Pahat",
    "rating": 5,
    "date": "2026-09-21",
    "product": "PuriCare Air Purifier",
    "quote": "Showed us the unit at the Brandkiosk and helped with the registration.",
    "source": "manual"
  }
]

export const INSTALL_PHOTOS = CUSTOMER_PHOTOS.filter((photo) => photo.kind === "install")
export const CUSTOMER_GROUP_PHOTOS = CUSTOMER_PHOTOS.filter((photo) => photo.kind === "customers")

export function reviewStats(reviews = REVIEWS) {
  const count = reviews.length
  const total = reviews.reduce((sum, review) => sum + Number(review.rating || 0), 0)
  const average = count ? Number((total / count).toFixed(1)) : 0
  return { count, average, best: 5 }
}
