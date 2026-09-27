import { useEffect, useState } from "react"
import Header from "./components/Header"
import Hero from "./components/Hero"
import Catalog from "./components/Catalog"
import WhySubscribe from "./components/WhySubscribe"
import CareShip from "./components/CareShip"
import Stories from "./components/Stories"
import Faq from "./components/FAQ"
import SiteFooter from "./components/SiteFooter"
import WhatsAppFab from "./components/WhatsAppFab"
import ProductDetail from "./components/ProductDetail"
import { productById } from "./data/catalog"

function readRoute() {
  const hash = window.location.hash.replace(/^#\/?/, "")
  const [page, id] = hash.split("/")
  if (page === "product" && id) return { name: "product", id }
  return { name: "home" }
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

  const openProduct = (id) => {
    window.location.hash = `product/${id}`
    window.scrollTo(0, 0)
  }

  const goHome = () => {
    window.location.hash = "shop"
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  if (route.name === "product") {
    const product = productById(route.id)
    return (
      <div className="min-h-screen bg-lg-cream">
        <Header onHome={goHome} />
        <ProductDetail key={product.id} product={product} onBack={goHome} />
        <SiteFooter />
        <WhatsAppFab />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-lg-cream">
      <Header onHome={goHome} />
      <Hero />
      <Catalog onSelect={openProduct} />
      <WhySubscribe />
      <CareShip />
      <Stories />
      <Faq />
      <SiteFooter />
      <WhatsAppFab />
    </div>
  )
}
