import { useEffect, useMemo, useState } from "react"
import Header from "./components/Header"
import Hero from "./components/Hero"
import HomeChooser from "./components/HomeChooser"
import Catalog, { ShopHub } from "./components/Catalog"
import WhySubscribe from "./components/WhySubscribe"
import CareShip from "./components/CareShip"
import Stores from "./components/Stores"
import Reviews from "./components/Reviews"
import Faq from "./components/FAQ"
import SiteFooter from "./components/SiteFooter"
import WhatsAppFab from "./components/WhatsAppFab"
import ProductDetail from "./components/ProductDetail"
import ProductJsonLd from "./components/ProductJsonLd"
import Career from "./components/Career"
import Promotions from "./components/Promotions"
import PromoPdf from "./components/PromoPdf"
import SeoJsonLd from "./components/SeoJsonLd"
import { dealForListing, findProduct } from "./data/catalog"
import { isWhatsAppLead, trackLeadConversion } from "./gtag"
import { useLang, usePageSeo } from "./i18n/LanguageProvider"
import { bindSpaLinks, navigate, productPath, promoteLegacyHash, readRoute, shopGroupPath } from "./router"

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

function currentRoute() {
  promoteLegacyHash()
  return readRoute()
}

function Shell({ children, onHome, jsonLd = null }) {
  return (
    <div className="min-h-screen bg-lg-cream">
      <SeoJsonLd />
      {jsonLd}
      <Header onHome={onHome} />
      {children}
      <SiteFooter />
      <WhatsAppFab />
    </div>
  )
}

function NotFound() {
  const { t } = useLang()
  return (
    <main className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-lg-red">LG Subscribe™</p>
      <h1 className="mt-3 text-3xl font-semibold">{t("seo.notFoundHeading")}</h1>
      <p className="mt-3 text-sm leading-7 text-lg-muted">{t("seo.notFoundDescription")}</p>
      <a href="/#shop" className="mt-6 inline-flex rounded-full bg-lg-red px-5 py-2.5 text-sm font-semibold text-white hover:bg-lg-red-dark">
        {t("pdp.shop")}
      </a>
    </main>
  )
}

export default function App() {
  const { t } = useLang()
  const [route, setRoute] = useState(currentRoute)

  useEffect(() => {
    const onPop = () => setRoute(readRoute())
    window.addEventListener("popstate", onPop)
    return () => window.removeEventListener("popstate", onPop)
  }, [])

  useEffect(() => bindSpaLinks(), [])

  useEffect(() => {
    const onClick = (event) => {
      const link = event.target.closest?.("a[href]")
      if (!link || !isWhatsAppLead(link.href)) return
      trackLeadConversion()
    }
    document.addEventListener("click", onClick)
    return () => document.removeEventListener("click", onClick)
  }, [])

  useEffect(() => {
    if (route.name === "career") return
    if (route.name === "care" || route.name === "product" || route.name === "promotions") {
      window.scrollTo(0, 0)
      return
    }
    const id = route.name === "shop" ? "shop" : window.location.hash.replace(/^#/, "")
    if (!id) {
      window.scrollTo(0, 0)
      return
    }
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
    })
  }, [route])

  const goHome = () => navigate("/#shop")

  const product = route.name === "product" ? findProduct(route.id) : null
  const missing = route.name === "product" && !product

  const seo = useMemo(() => {
    if (route.name === "promotions") {
      return {
        title: "LG Subscribe Promotions & Monthly Deals | Special Rental Rates Malaysia",
        description:
          "Explore the latest official LG Subscribe promotions in Malaysia. Enjoy promotional monthly rental rates, 50% off selected months, free installation, and official CareShip service.",
        ogTitle: "LG Subscribe Monthly Promotions & Official Deals",
        ogDescription:
          "Discover the latest monthly LG Rent Up & Subscription deals in Malaysia. Free installation & CareShip included.",
        path: "/promotions/",
        canonical: "https://lgsubscribehub.com.my/promotions/",
      }
    }
    if (route.name === "care") {
      return { title: t("seo.careTitle"), description: t("seo.careDescription"), path: "/care/" }
    }
    if (route.name === "career") {
      return { title: t("seo.careerTitle"), description: t("seo.careerDescription"), path: "/career/" }
    }
    if (route.name === "shop-hub") {
      return {
        title: t("seo.categoryTitle", { name: t("groups.water-air.name") }),
        description: t("groups.water-air.blurb"),
        path: "/shop/water-air/",
        robots: "noindex, follow",
      }
    }
    if (route.name === "shop") {
      return {
        title: t("seo.categoryTitle", { name: t(`groups.${route.groupId}.name`) }),
        description: t("seo.categoryDescription", { blurb: t(`groups.${route.groupId}.blurb`) }),
        path: shopGroupPath(route.groupId),
      }
    }
    if (missing) {
      return { title: t("seo.notFoundTitle"), description: t("seo.notFoundDescription"), path: `/product/${route.id}/` }
    }
    if (product) {
      const price = dealForListing(product, product.specs).now
      const name = product.baseName || product.name
      return {
        title: price != null ? t("seo.productTitle", { name, price }) : t("seo.productTitlePlain", { name }),
        description: t("seo.productDescription", { name }),
        path: productPath(product.id),
        image: product.colors.find((color) => color.image)?.image || "",
      }
    }
    return { title: t("seo.title"), description: t("seo.description"), path: "/" }
  }, [missing, product, route, t])

  usePageSeo(seo)

  if (route.name === "promotions") {
    return (
      <Shell onHome={goHome}>
        <Promotions />
      </Shell>
    )
  }

  if (route.name === "career") {
    return (
      <Shell onHome={goHome}>
        <Career section={route.section} />
      </Shell>
    )
  }

  if (route.name === "care") {
    return (
      <Shell onHome={goHome}>
        <CareShip />
      </Shell>
    )
  }

  if (route.name === "shop-hub") {
    return (
      <Shell onHome={goHome}>
        <ShopHub />
      </Shell>
    )
  }

  if (missing) {
    return (
      <Shell onHome={goHome}>
        <NotFound />
      </Shell>
    )
  }

  if (product) {
    const { specId, colorId } = routeOptions(product, route.a, route.b)
    const lockSpec = Boolean(specId) && product.type !== "tv"
    return (
      <Shell onHome={goHome} jsonLd={<ProductJsonLd product={product} />}>
        <ProductDetail
          key={`${product.id}:${specId ?? ""}:${colorId ?? ""}`}
          product={product}
          initialSpecId={specId}
          initialColorId={colorId}
          lockSpec={lockSpec}
          onBack={goHome}
        />
      </Shell>
    )
  }

  return (
    <Shell onHome={goHome}>
      {route.name === "home" ? <PromoPdf /> : null}
      <Hero />
      <HomeChooser />
      <Catalog
        groupId={route.name === "shop" ? route.groupId : null}
        onGroup={(id) => navigate(id ? shopGroupPath(id) : "/#shop")}
      />
      <WhySubscribe />
      <Stores />
      <Reviews />
      <Faq />
    </Shell>
  )
}
