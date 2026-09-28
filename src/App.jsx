import { useEffect, useState } from "react"
import Header from "./components/Header"
import Hero from "./components/Hero"
import Catalog from "./components/Catalog"
import WhySubscribe from "./components/WhySubscribe"
import CareShip from "./components/CareShip"
import Stores from "./components/Stores"
import Reviews from "./components/Reviews"
import Faq from "./components/FAQ"
import SiteFooter from "./components/SiteFooter"
import WhatsAppFab from "./components/WhatsAppFab"
import ProductDetail from "./components/ProductDetail"
import Career from "./components/Career"
import SeoJsonLd from "./components/SeoJsonLd"
import { productById } from "./data/catalog"

function readRoute() {
  const hash = window.location.hash.replace(/^#\/?/, "")
  const [page, id, a, b] = hash.split("/")
  if (page === "career") return { name: "career", section: id || null }
  if (page === "product" && id) return { name: "product", id, a, b }
  return { name: "home" }
}

function routeOptions(product, a, b) {
  const specIds = new Set(product.specs.map((spec) => spec.id))
  const colorIds = new Set(product.colors.map((color) => color.id))
  let specId = null
  let colorId = null
  if (a && specIds.has(a)) specId = a
  else if (a && colorIds.has(a)) colorId = a
  if (b && specIds.has(b)) specId = b
  if (b && colorIds.has(b)) colorId = b
  return { specId, colorId }
}

export default function App() {
  const [route, setRoute] = useState(readRoute)

  useEffect(() => {
    const onHash = () => setRoute(readRoute())
    window.addEventListener("hashchange", onHash)
    return () => window.removeEventListener("hashchange", onHash)
  }, [])

  useEffect(() => {
    if (route.name !== "home") return
    const id = window.location.hash.replace(/^#\/?/, "")
    if (!id) return
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
    })
  }, [route])

  const openProduct = (id, specId, colorId) => {
    const parts = ["product", id]
    if (specId) parts.push(specId)
    if (colorId) parts.push(colorId)
    window.location.hash = parts.join("/")
    window.scrollTo(0, 0)
  }

  const goHome = () => {
    window.location.hash = "shop"
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  if (route.name === "career") {
    return (
      <div className="min-h-screen bg-lg-cream">
        <SeoJsonLd />
        <Header onHome={goHome} />
        <Career section={route.section} />
        <SiteFooter />
        <WhatsAppFab />
      </div>
    )
  }

  if (route.name === "product") {
    const product = productById(route.id)
    const { specId, colorId } = routeOptions(product, route.a, route.b)
    const lockSpec = Boolean(specId) && product.type !== "tv"
    return (
      <div className="min-h-screen bg-lg-cream">
        <SeoJsonLd />
        <Header onHome={goHome} />
        <ProductDetail
          key={`${product.id}:${specId ?? ""}:${colorId ?? ""}`}
          product={product}
          initialSpecId={specId}
          initialColorId={colorId}
          lockSpec={lockSpec}
          onBack={goHome}
        />
        <SiteFooter />
        <WhatsAppFab />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-lg-cream">
      <SeoJsonLd />
      <Header onHome={goHome} />
      <Hero />
      <Catalog onSelect={openProduct} />
      <WhySubscribe />
      <CareShip />
      <Stores />
      <Reviews />
      <Faq />
      <SiteFooter />
      <WhatsAppFab />
    </div>
  )
}
