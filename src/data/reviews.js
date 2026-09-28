// Generated from sheet/reviews.csv.
// Easiest edit: sheet/reviews.csv  (Author, Rating, Date, Product, Quote)
// Or add a Reviews tab in the product xlsx with the same headers, then npm run import:xlsx
// Photos: INSTALL_PHOTOS = install shots only. GROUP_PHOTOS = customer/team group photos.
import { CUSTOMER_PHOTOS } from "./photos.js"

export const GOOGLE_REVIEWS_URL = "https://share.google/vWXCox9437yQaN0Cu"
export const GOOGLE_REVIEW_SUMMARY = { count: 23, url: GOOGLE_REVIEWS_URL }

export const REVIEWS = [
  {
    "author": "Ms Tan from Batu Pahat",
    "rating": 5,
    "date": "18-08-26",
    "product": "PuriCare Water Purifier",
    "quote": "Cindy explained the monthly plan clearly and the installation team was tidy.",
    "source": "manual"
  },
  {
    "author": "Mr Helmi from Batu Pahat",
    "rating": 5,
    "date": "22-08-26",
    "product": "DUALCOOL Air Conditioner",
    "quote": "Repeat order, aircond LG memang sangat jimat current, utk rumah sy dah jimat RM50+.",
    "source": "manual"
  },
  {
    "author": "Ms Ninie from Batu Pahat",
    "rating": 5,
    "date": "02-09-26",
    "product": "Washtower 14/10KG",
    "quote": "Highly recommend! Cindy and Joe were super helpful. Since my husband was not at home, they specially came over to assist when the product arrived. Truly responsible and reliable agents!",
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
