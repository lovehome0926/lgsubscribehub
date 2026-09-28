import { useState } from "react"
import { CalendarClock, Check, Package, Wrench } from "lucide-react"
import { COMPANY, whatsappHref } from "../config"
import { IMG, PRODUCTS } from "../data/catalog"
import {
  CARESHIP_CATEGORIES,
  PLAN_META,
  compactModel,
  matchCatalogProduct,
  planPrice,
  productsInCategory,
  yearsForPlan,
} from "../data/careship"
import { CARESHIP_PHOTOS } from "../data/photos"
import { useLang } from "../i18n/LanguageProvider"

const INTRO_ICONS = [Package, CalendarClock, Wrench]

function WhatsAppIcon({ className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
      <path d="M20.5 3.5A11 11 0 0 0 2.1 16.7L1 23l6.5-1.1A11 11 0 0 0 20.5 3.5Zm-8.5 17a9.1 9.1 0 0 1-4.6-1.3l-.3-.2-3.9.7.7-3.8-.2-.3A9.1 9.1 0 1 1 12 20.5Zm5-6.8c-.3-.1-1.6-.8-1.9-.9s-.4-.1-.6.1-.7.9-.8 1-.3.2-.6.1a7.4 7.4 0 0 1-2.2-1.4 8.2 8.2 0 0 1-1.5-1.9c-.2-.3 0-.4.1-.6l.4-.5.1-.3c0-.1 0-.3-.1-.4s-.6-1.4-.8-1.9-.4-.4-.6-.4h-.5c-.2 0-.4.1-.6.3s-.8.8-.8 1.9.8 2.2.9 2.3c.1.2 1.6 2.5 3.8 3.5 1.4.6 1.9.7 2.6.6.4-.1 1.6-.6 1.8-1.3s.2-1.1.2-1.2 0-.2-.2-.3Z" />
    </svg>
  )
}

function StepLabel({ n, children }) {
  return (
    <p className="text-xs font-bold tracking-tight text-lg-ink">
      <span className="mr-1.5 text-[10px] font-semibold tracking-[0.18em] text-lg-muted">{n}.</span>
      {children}
    </p>
  )
}

const PLAN_ORDER = { self: 0, combine: 1, visit: 2, "visit-6": 2, "visit-q": 2 }

function orderedPlans(plans = []) {
  return [...plans].sort((a, b) => (PLAN_ORDER[a.kind] ?? 9) - (PLAN_ORDER[b.kind] ?? 9))
}

function firstYear(plan) {
  return yearsForPlan(plan)[0] ?? 2
}

function fallbackImage(category) {
  if (category.includes("Air") || category.includes("Dehumid")) return IMG.cardAir
  if (category.includes("Styler")) return IMG.cardHome
  return IMG.waterLifestyle
}

function localCareshipImage(product) {
  return CARESHIP_PHOTOS.find((photo) =>
    product.models.some((model) => photo.key.includes(compactModel(model))),
  )?.src
}

function productImage(product) {
  return localCareshipImage(product) || matchCatalogProduct(product, PRODUCTS)?.colors?.[0]?.image || fallbackImage(product.category)
}

export default function CareShip() {
  const { t } = useLang()
  const [category, setCategory] = useState(CARESHIP_CATEGORIES[0].id)
  const products = productsInCategory(category)
  const [productId, setProductId] = useState(products[0]?.id)
  const product = products.find((item) => item.id === productId) ?? products[0]
  const plans = orderedPlans(product?.plans)
  const [planKind, setPlanKind] = useState(plans[0]?.kind)
  const plan = plans.find((item) => item.kind === planKind) ?? plans[0]
  const [years, setYears] = useState(plan ? firstYear(plan) : 1)
  const [color, setColor] = useState(product?.colors[0] || "")

  if (!product || !plan) return null

  const availableYears = yearsForPlan(plan)
  const selectedYears = availableYears.includes(years) ? years : availableYears[0]
  const price = planPrice(plan, selectedYears)
  const twoYearSave = plan.year1 && plan.year2 ? plan.year1 * 2 - plan.year2 : 0
  const image = productImage(product)
  const meta = PLAN_META[plan.kind] ?? PLAN_META.visit

  const selectCategory = (id) => {
    const nextProducts = productsInCategory(id)
    const next = nextProducts[0]
    setCategory(id)
    if (!next) return
    setProductId(next.id)
    const nextPlans = orderedPlans(next.plans)
    setPlanKind(nextPlans[0].kind)
    setYears(firstYear(nextPlans[0]))
    setColor(next.colors[0] || "")
  }

  const selectProduct = (next) => {
    setProductId(next.id)
    const nextPlans = orderedPlans(next.plans)
    setPlanKind(nextPlans[0].kind)
    setYears(firstYear(nextPlans[0]))
    setColor(next.colors[0] || "")
  }

  const selectPlan = (next) => {
    const nextYears = yearsForPlan(next)
    setPlanKind(next.kind)
    setYears(nextYears.includes(selectedYears) ? selectedYears : nextYears[0])
  }

  const waText = [
    t("careship.wa.intro", { advisor: COMPANY.advisor }),
    t("careship.wa.category", { value: t(`careship.categoryNames.${product.category}`) || product.category }),
    t("careship.wa.model", { value: product.models.join(" / ") }),
    t("careship.wa.product", { value: product.name }),
    color ? t("careship.wa.colour", { value: color }) : "",
    t("careship.wa.plan", { label: plan.label, years: selectedYears, plural: selectedYears > 1 ? "s" : "" }),
    price != null ? t("careship.wa.price", { value: price }) : "",
    plan.details ? t("careship.wa.details", { value: plan.details }) : "",
  ]
    .filter(Boolean)
    .join("\n")

  return (
    <section id="care" className="scroll-mt-40 bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-lg-red">{t("careship.eyebrow")}</p>
        <h2 className="mt-2 max-w-3xl text-3xl font-semibold">{t("careship.title")}</h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-lg-muted">
          {t("careship.lead", { advisor: COMPANY.advisor })}
        </p>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {t("careship.intro").map((item, index) => {
            const Icon = INTRO_ICONS[index]
            return (
              <article key={item.name} className="rounded-[24px] bg-lg-cream p-6">
                <Icon className="h-6 w-6 text-lg-red" />
                <h3 className="mt-4 text-lg font-semibold">{item.name}</h3>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-lg-red">{item.cadence}</p>
                <p className="mt-3 text-sm leading-6 text-lg-muted">{item.copy}</p>
              </article>
            )
          })}
        </div>

        <div className="mt-8 overflow-hidden rounded-[24px]">
          <video className="h-64 w-full object-cover md:h-80" autoPlay muted loop playsInline poster={IMG.hygienePoster}>
            <source src={IMG.hygiene} type="video/mp4" />
          </video>
        </div>

        <div id="careship-plan" className="mt-12 scroll-mt-40 rounded-[28px] bg-lg-cream p-5 sm:p-8 lg:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-lg-red">{t("careship.configEyebrow")}</p>
          <h3 className="mt-2 text-2xl font-semibold">{t("careship.configTitle")}</h3>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-lg-muted">{t("careship.configLead")}</p>

          <div className="mt-8">
            <StepLabel n="01">{t("careship.stepCategory")}</StepLabel>
            <div className="mt-3 flex flex-wrap gap-2">
              {CARESHIP_CATEGORIES.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => selectCategory(item.id)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold ${
                    category === item.id ? "bg-lg-red text-white" : "bg-white text-lg-ink ring-1 ring-lg-line hover:ring-black/30"
                  }`}
                >
                  {t(`careship.categoryNames.${item.id}`) || item.name}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <StepLabel n="02">{t("careship.stepModel")}</StepLabel>
            <div className="mt-3 grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
              {products.map((item) => {
                const selected = item.id === product.id
                const thumb = productImage(item)
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => selectProduct(item)}
                    className={`flex items-center gap-3 rounded-2xl bg-white p-3 text-left ${
                      selected ? "ring-2 ring-lg-red" : "ring-1 ring-lg-line hover:ring-black/30"
                    }`}
                  >
                    <span className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-white ring-1 ring-lg-line">
                      <img src={thumb} alt="" className="absolute inset-0 h-full w-full object-contain object-center p-1" />
                    </span>
                    <span>
                      <span className="block text-[11px] font-semibold uppercase tracking-wide text-lg-muted">
                        {item.models.join(" · ")}
                      </span>
                      <span className="mt-1 block text-sm font-semibold leading-5">{item.name}</span>
                      {item.colors.length ? (
                        <span className="mt-1 block text-xs text-lg-muted">{item.colors.join(" · ")}</span>
                      ) : null}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {product.colors.length > 1 ? (
            <div className="mt-8">
              <StepLabel n="03">{t("careship.stepColour")}</StepLabel>
              <div className="mt-3 flex flex-wrap gap-2">
                {product.colors.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setColor(item)}
                    className={`rounded-full px-3 py-1.5 text-sm ${
                      color === item ? "bg-lg-ink text-white" : "bg-white text-lg-ink ring-1 ring-lg-line"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          <div className="mt-8">
            <StepLabel n={product.colors.length > 1 ? "04" : "03"}>{t("careship.stepPlan")}</StepLabel>
            <div className="mt-3 grid gap-2 md:grid-cols-3">
              {plans.map((item) => {
                const selected = item.kind === plan.kind
                const hint = t(`careship.planHints.${item.kind}`) || PLAN_META[item.kind]?.hint
                return (
                  <button
                    key={item.kind}
                    type="button"
                    onClick={() => selectPlan(item)}
                    className={`rounded-2xl bg-white p-4 text-left ${
                      selected ? "ring-2 ring-lg-red" : "ring-1 ring-lg-line hover:ring-black/30"
                    }`}
                  >
                    <span className="block font-semibold">{item.label}</span>
                    {hint ? <span className="mt-1 block text-xs text-lg-muted">{hint}</span> : null}
                    <span className="mt-2 block text-xs leading-5 text-lg-muted">{item.details}</span>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="mt-8">
            <StepLabel n={product.colors.length > 1 ? "05" : "04"}>{t("careship.stepDuration")}</StepLabel>
            <div className="mt-3 flex flex-wrap gap-2">
              {[1, 2].map((item) => {
                const amount = item === 1 ? plan.year1 : plan.year2
                const disabled = amount == null
                return (
                  <button
                    key={item}
                    type="button"
                    disabled={disabled}
                    onClick={() => !disabled && setYears(item)}
                    className={`min-w-[140px] rounded-2xl px-4 py-3 text-left ${
                      disabled
                        ? "cursor-not-allowed bg-white/60 text-lg-muted/40 ring-1 ring-lg-line"
                        : selectedYears === item
                          ? "bg-white ring-2 ring-lg-red"
                          : "bg-white ring-1 ring-lg-line hover:ring-black/30"
                    }`}
                  >
                    <span className="block text-sm font-semibold">{item === 1 ? t("careship.year1") : t("careship.year2")}</span>
                    <span className="mt-1 block text-xs text-lg-muted">{disabled ? t("careship.notOffered") : `RM ${amount}`}</span>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="mt-10 grid gap-6 rounded-[24px] bg-white p-5 ring-1 ring-lg-line lg:grid-cols-[0.9fr_1.1fr] lg:p-8">
            <div className="mx-auto aspect-[4/3] w-full max-w-sm overflow-hidden rounded-[20px] bg-white ring-1 ring-lg-line">
              <img src={image} alt={product.name} className="h-full w-full object-contain object-center p-3" />
            </div>
            <div className="flex flex-col justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-lg-muted">{t("careship.quoted")}</p>
                <p className="mt-2 text-xl font-semibold leading-7">
                  {`${product.name}${color ? `, ${color}` : ""}`}
                </p>
                <p className="mt-1 text-sm text-lg-muted">{product.models.join(" / ")}</p>
                <p className="mt-4 text-4xl font-extrabold tracking-tight text-lg-red">
                  {price != null ? `RM ${price}` : t("careship.askCindy")}
                  <span className="ml-2 text-base font-semibold text-lg-muted">/ {selectedYears} yr</span>
                </p>
                {twoYearSave > 0 && selectedYears === 2 ? (
                  <p className="mt-2 text-sm font-semibold text-[#1f7a43]">{t("careship.save", { n: twoYearSave })}</p>
                ) : null}
                <ul className="mt-4 space-y-2 text-sm">
                  {[plan.label, t(`careship.planHints.${plan.kind}`) || meta.hint, plan.details, t("careship.genuine")].filter(Boolean).map((line) => (
                    <li key={line} className="flex gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-lg-red" />
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
              <a
                href={whatsappHref(waText)}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-lg-red py-4 text-sm font-semibold text-white hover:bg-lg-red-dark"
              >
                <WhatsAppIcon />
                {t("careship.cta")}
              </a>
            </div>
          </div>
        </div>

        <p className="mt-4 text-xs text-lg-muted">{t("careship.note")}</p>
      </div>
    </section>
  )
}
