import { useEffect, useMemo, useState } from "react"
import { Check, ChevronLeft, Droplets, Flame, LayoutPanelTop, ShieldCheck, Snowflake, Truck, Wifi, Zap } from "lucide-react"
import { SERVICES, applyPromo, giftForProduct, groupOf, hasOutrightPrice, isMoney, planCareOptions, planPrice, pricedTenures, promoCopy, promoForProduct, promoForProductPlan, visitCycles } from "../data/catalog"
import { whatsappHref } from "../config"
import { localizePdp } from "../i18n/pdpFeatures"
import { useLang } from "../i18n/LanguageProvider"
import CroppedPhoto from "./CroppedPhoto"
import PromoBadge from "./PromoBadge"

const FEATURE_ICONS = {
  Hygienic: ShieldCheck,
  Convenient: Droplets,
  "Built-in": LayoutPanelTop,
  "LG ThinQ™": Wifi,
}

const WATER_META = {
  Hot: { Icon: Flame, className: "text-[#c45c26]" },
  Ambient: { Icon: Droplets, className: "text-[#2b6cb0]" },
  Cold: { Icon: Snowflake, className: "text-[#2b9eb3]" },
  Ice: { Icon: Snowflake, className: "text-[#4c8fd4]" },
}

function firstSpec(product) {
  return product.specs.find((item) => item.available) ?? product.specs[0]
}

function displayName(product, color) {
  if (!product.baseName) return product.name
  if (product.colors.length < 2 || color.name === "Default") return product.baseName
  return `${product.baseName}, ${color.name}`
}

function TitleBlock({ product, color, spec, tagline }) {
  const { t } = useLang()
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-lg-red">LG Subscribe™</p>
      <h1 className="mt-2 text-[26px] font-semibold leading-[1.25] tracking-tight md:text-[30px]">
        {displayName(product, color)}
      </h1>
      <p className="mt-1.5 text-sm text-lg-muted">
        {color.model ?? product.model}
        {spec && (product.specs.length > 1 || /hp|kg|\dL\b|"|inch/i.test(spec.label)) ? ` · ${spec.label}` : ""}
      </p>
      <p className="mt-3 max-w-xl text-sm leading-6 text-lg-ink/75">{tagline}</p>
      {product.waters?.length ? (
        <div className="mt-3 flex flex-wrap gap-2 text-xs font-medium">
          {product.waters.map((item) => {
            const meta = WATER_META[item] ?? WATER_META.Ambient
            const Icon = meta.Icon
            return (
              <span key={item} className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 ring-1 ring-lg-line">
                <Icon className={`h-3.5 w-3.5 ${meta.className}`} />
                {t(`waters.${item}`)}
              </span>
            )
          })}
        </div>
      ) : null}
    </div>
  )
}

function WhatsAppIcon({ className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
      <path d="M20.5 3.5A11 11 0 0 0 2.1 16.7L1 23l6.5-1.1A11 11 0 0 0 20.5 3.5Zm-8.5 17a9.1 9.1 0 0 1-4.6-1.3l-.3-.2-3.9.7.7-3.8-.2-.3A9.1 9.1 0 1 1 12 20.5Zm5-6.8c-.3-.1-1.6-.8-1.9-.9s-.4-.1-.6.1-.7.9-.8 1-.3.2-.6.1a7.4 7.4 0 0 1-2.2-1.4 8.2 8.2 0 0 1-1.5-1.9c-.2-.3 0-.4.1-.6l.4-.5.1-.3c0-.1 0-.3-.1-.4s-.6-1.4-.8-1.9-.4-.4-.6-.4h-.5c-.2 0-.4.1-.6.3s-.8.8-.8 1.9.8 2.2.9 2.3c.1.2 1.6 2.5 3.8 3.5 1.4.6 1.9.7 2.6.6.4-.1 1.6-.6 1.8-1.3s.2-1.1.2-1.2 0-.2-.2-.3Z" />
    </svg>
  )
}

function StepLabel({ n, children }) {
  return (
    <p className="text-xs font-bold tracking-tight text-gray-900">
      <span className="mr-1.5 text-[10px] font-semibold tracking-[0.18em] text-gray-400">{n}.</span>
      {children}
    </p>
  )
}

function MicroBadge({ children, shift = false }) {
  return (
    <span
      className={`absolute -top-2.5 z-10 rounded-full bg-[#A50034] px-2 py-0.5 text-[10px] font-medium text-white ${
        shift ? "right-7" : "right-2.5"
      }`}
    >
      {children}
    </span>
  )
}

function SelectedMark() {
  return (
    <span className="pointer-events-none absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#A50034] text-white">
      <Check className="h-2.5 w-2.5" strokeWidth={3} aria-hidden="true" />
    </span>
  )
}

const tileBase =
  "relative rounded-xl border-[1.5px] bg-white px-6 py-3.5 text-center text-sm transition-all duration-200 ease-in-out"

function tileState(selected) {
  return selected
    ? "border-[#A50034] bg-rose-50/50 font-bold tracking-tight text-gray-900 shadow-[0_8px_24px_rgba(165,0,52,0.06)]"
    : "border-gray-200 font-medium text-gray-400 hover:border-gray-300 hover:text-gray-500"
}

function PlanConfigurator({ product, spec, payMode, setPayMode, subscribeYears, tenure, setTenure, care, setCare, visitCycle, setVisitCycle, promo, price, waText }) {
  const { t } = useLang()
  const activePromo = price.planPromo ?? promo
  const theme = promoCopy(activePromo, t)
  const waterOutright = payMode === "outright" && product.type === "water"
  const perks = waterOutright
    ? [
        { Icon: Truck, label: t("pdp.perks.delivery") },
        { Icon: ShieldCheck, label: t("pdp.perks.warranty1") },
        { Icon: Zap, label: t("pdp.perks.careship1") },
      ]
    : payMode === "outright"
      ? [
          { Icon: Truck, label: t("pdp.perks.delivery") },
          { Icon: ShieldCheck, label: t("pdp.perks.mfrWarranty") },
        ]
      : [
          { Icon: Truck, label: t("pdp.perks.delivery") },
          { Icon: ShieldCheck, label: t("pdp.perks.zeroDeposit") },
          { Icon: Zap, label: t("pdp.perks.warranty5") },
        ]
  const gift = giftForProduct(product)
  const services = planCareOptions(product, spec, { payMode, tenure })
  const cycles = payMode === "subscribe" ? visitCycles(spec, tenure) : []
  const outrightReady = hasOutrightPrice(spec)
  const showPayModes = outrightReady
  const showTenure = payMode === "subscribe" && subscribeYears.length > 0
  const showService = services.length > 0 || payMode === "subscribe"
  let step = 0

  function serviceAmount(id) {
    if (payMode === "outright") return planPrice(spec, { payMode, tenure, care: id, cycle: visitCycle })
    if (payMode !== "subscribe") return null
    if (id !== "visit") return planPrice(spec, { payMode, tenure, care: id, cycle: visitCycle })
    if (care === "visit") return planPrice(spec, { payMode, tenure, care: "visit", cycle: visitCycle })
    const values = cycles.map((cycle) => spec.pricing.subscribe?.[tenure]?.visit?.[cycle]).filter(isMoney)
    return values.length ? Math.min(...values) : null
  }

  function visitBlurb() {
    if (cycles.length === 1) return t("pdp.careBlurb.visitEvery", { n: cycles[0] })
    return t("pdp.careBlurb.visit")
  }

  return (
    <div className="space-y-6">
      {gift && payMode === "subscribe" ? (
        <div className="rounded-2xl bg-[#111] px-4 py-3 text-white ring-1 ring-[#E10600]">
          <p className="text-sm font-black text-[#FFD100]">{t("pdp.giftBanner")}</p>
          <p className="mt-1 text-xs leading-5 text-white/70">{t("pdp.giftBannerLead")}</p>
        </div>
      ) : null}
      {showPayModes ? (
        <div>
          <StepLabel n={++step}>{t("pdp.purchase")}</StepLabel>
          <div className="mt-3 grid grid-cols-2 gap-2.5">
            {[
              { id: "subscribe", label: t("pdp.subscription") },
              { id: "outright", label: t("pdp.outright") },
            ].map((mode) => {
              const selected = payMode === mode.id
              return (
                <button
                  key={mode.id}
                  type="button"
                  onClick={() => setPayMode(mode.id)}
                  className={`${tileBase} ${tileState(selected)}`}
                >
                  {selected ? <SelectedMark /> : null}
                  <span className="block">{mode.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      ) : null}

      {showTenure ? (
        <div>
          <StepLabel n={++step}>{t("pdp.tenure")}</StepLabel>
          {subscribeYears.length > 1 ? (
            <div className="mt-3 grid grid-cols-2 gap-2.5 pt-2">
              {subscribeYears.map((item) => {
                const selected = tenure === item
                const popular = item === 84
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setTenure(item)}
                    className={`${tileBase} ${tileState(selected)}`}
                  >
                    {popular ? <MicroBadge shift={selected}>🔥 {t("pdp.popular")}</MicroBadge> : null}
                    {selected ? <SelectedMark /> : null}
                    <span className="block">{t(`pdp.tenureLabel.${item}`)}</span>
                  </button>
                )
              })}
            </div>
          ) : (
            <p className="mt-3 text-sm font-semibold text-gray-900">{t(`pdp.tenureLabel.${subscribeYears[0]}`) || `${subscribeYears[0]} mo`}</p>
          )}
        </div>
      ) : payMode === "outright" ? (
        <p className="text-xs leading-5 text-gray-500">
          {waterOutright ? t("pdp.outrightWater") : t("pdp.outrightOther")}
        </p>
      ) : null}

      {showService ? (
      <div>
        <StepLabel n={++step}>{t("pdp.service")}</StepLabel>
        {services.length ? (
          <div className="mt-3 space-y-3 pt-2">
            {services.map((id) => {
              const amount = serviceAmount(id)
              const selected = care === id
              const priced = applyPromo(amount, promoForProductPlan(product, { tenure, care: id }), { tenure, care: id }).now
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setCare(id)}
                  className={`relative flex w-full items-center gap-3 rounded-xl border px-3.5 py-3.5 text-left transition-all duration-200 ease-in-out ${
                    selected
                      ? "border-transparent bg-rose-50/50 shadow-sm ring-1 ring-[#A50034]"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  {id === services[0] ? <MicroBadge>{t("pdp.recommended")}</MicroBadge> : null}
                  <span
                    className={`flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border-[1.5px] transition-all duration-200 ease-in-out ${
                      selected ? "border-[#A50034] bg-[#A50034]" : "border-gray-300 bg-white"
                    }`}
                    aria-hidden="true"
                  >
                    <span className={`h-1.5 w-1.5 rounded-full bg-white transition-transform duration-200 ease-in-out ${selected ? "scale-100" : "scale-0"}`} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className={`block text-sm font-bold tracking-tight ${selected ? "text-gray-900" : "text-gray-500"}`}>
                      {t(`pdp.care.${id}`)}
                    </span>
                    <span className="mt-0.5 block text-xs text-gray-400">
                      {waterOutright
                        ? t("pdp.careBlurb.waterYear")
                        : id === "visit"
                          ? visitBlurb()
                          : t(`pdp.careBlurb.${id}`)}
                    </span>
                  </span>
                  {waterOutright && amount != null ? (
                    <span className={`shrink-0 text-sm font-bold tracking-tight ${selected ? "text-[#A50034]" : "text-gray-400"}`}>
                      RM {amount.toLocaleString()}
                    </span>
                  ) : payMode === "subscribe" && priced != null ? (
                    <span className={`shrink-0 text-sm font-bold tracking-tight ${selected ? "text-[#A50034]" : "text-gray-400"}`}>
                      RM {priced}
                      <span className="ml-0.5 text-[11px] font-medium text-gray-400">/mth</span>
                    </span>
                  ) : null}
                </button>
              )
            })}
          </div>
        ) : (
          <p className="mt-3 text-xs leading-5 text-gray-500">{SERVICES.none.name}</p>
        )}
        {payMode === "subscribe" && care === "visit" && cycles.length > 1 ? (
          <div className="mt-3 grid grid-cols-3 gap-2.5">
            {cycles.map((cycle) => {
              const amount = planPrice(spec, { payMode: "subscribe", tenure, care: "visit", cycle })
              const selected = visitCycle === cycle
              return (
                <button
                  key={cycle}
                  type="button"
                  onClick={() => setVisitCycle(cycle)}
                  className={`${tileBase} ${tileState(selected)}`}
                >
                  {selected ? <SelectedMark /> : null}
                  <span className="block">{t(`pdp.visitLabel.${cycle}`)}</span>
                  <span className="mt-0.5 block text-[10px] font-medium tracking-normal text-gray-400">
                    RM {applyPromo(amount, promoForProductPlan(product, { tenure, care: "visit" }), { tenure, care: "visit" }).now}
                  </span>
                </button>
              )
            })}
          </div>
        ) : null}
      </div>
      ) : null}

      <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-lg">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400">{t("pdp.yourPlan")}</p>
        {price.kind === "subscribe" && price.now != null ? (
          <div className="mt-2">
            <p className="text-[42px] font-bold leading-none tracking-tight text-[#A50034]">
              RM {price.now}
              <span className="ml-1 text-base font-medium tracking-normal text-gray-400">/mth</span>
            </p>
            {price.introMonths ? (
              <p className="mt-1 text-sm font-semibold text-gray-700">{t("pdp.firstMonths", { n: price.introMonths })}</p>
            ) : null}
            {price.list != null && price.list !== price.now ? (
              <p className="mt-2 text-xs leading-5 text-gray-500">
                <span className="mr-1 line-through">{t("pdp.was", { n: price.list })}</span>
                {price.introMonths
                  ? t("pdp.after", { n: price.after ?? price.list, from: price.introMonths + 1 })
                  : ` · ${theme?.line || activePromo?.title || t("pdp.tnc")}. ${t("pdp.tnc")}`}
              </p>
            ) : activePromo ? (
              <p className="mt-2 text-xs leading-5 text-gray-500">{theme?.detail || t("pdp.tnc")}</p>
            ) : null}
          </div>
        ) : price.kind === "outright" && price.amount != null ? (
          <div className="mt-2">
            <p className="text-[42px] font-bold leading-none tracking-tight text-[#A50034]">RM {price.amount.toLocaleString()}</p>
            {waterOutright ? (
              <p className="mt-2 text-xs leading-5 text-gray-500">
                {t("pdp.includesWater", { plan: t(`pdp.care.${care}`) })}
              </p>
            ) : null}
          </div>
        ) : (
          <p className="mt-2 text-2xl font-bold tracking-tight text-gray-400">{t("pdp.tbc")}</p>
        )}
        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-gray-100 pt-4 text-[11px] font-medium text-gray-600">
          {perks.map(({ Icon, label }) => (
            <span key={label} className="inline-flex items-center gap-1.5">
              <Icon className="h-3.5 w-3.5 shrink-0 text-[#A50034]" />
              {label}
            </span>
          ))}
        </div>
        <a
          href={whatsappHref(waText)}
          target="_blank"
          rel="noreferrer"
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#A50034] py-3.5 text-sm font-semibold text-white shadow-md transition-all duration-200 ease-in-out hover:bg-[#88002b]"
        >
          <WhatsAppIcon className="h-4 w-4" />
          {t("pdp.enquire")}
        </a>
      </div>
    </div>
  )
}

function featureIcon(title) {
  if (FEATURE_ICONS[title]) return FEATURE_ICONS[title]
  const text = title.toLowerCase()
  if (/hygien|steril|purif|filter|fresh|clean|uv/.test(text)) return ShieldCheck
  if (/convenien|water|effort|easy|dispense/.test(text)) return Droplets
  if (/thinq|wi-fi|wifi|smart|app|connect/.test(text)) return Wifi
  if (/design|built|slim|install|space|fit|style/.test(text)) return LayoutPanelTop
  if (/energy|power|save|inverter|ai/.test(text)) return Zap
  if (/cool|air|climate|temp/.test(text)) return Snowflake
  return ShieldCheck
}

function FeatureGrid({ items, className = "" }) {
  if (!items?.length) return null
  return (
    <div className={`grid grid-cols-2 gap-3 ${className}`}>
      {items.map((item) => {
        const Icon = featureIcon(item.iconTitle || item.title)
        return (
          <article key={item.title} className="rounded-[22px] bg-white p-5 shadow-[0_10px_40px_rgba(17,17,17,0.04)] ring-1 ring-lg-line">
            <Icon className="h-5 w-5 text-lg-red" />
            <h3 className="mt-3 text-[15px] font-semibold">{item.title}</h3>
            <p className="mt-2 text-sm leading-6 text-lg-muted">{item.copy}</p>
          </article>
        )
      })}
    </div>
  )
}

export default function ProductDetail({ product, onBack, initialSpecId, initialColorId, lockSpec }) {
  const { t, lang } = useLang()
  const promo = promoForProduct(product)
  const openingSpec = product.specs.find((item) => item.id === initialSpecId) ?? firstSpec(product)
  const visibleSpecs = lockSpec ? [openingSpec] : product.specs
  const visibleColors = product.colors.filter((color) => {
    if (!lockSpec) return true
    return color.specIds?.includes(openingSpec.id) || color.variants?.[openingSpec.id]
  })
  const palette = visibleColors.length ? visibleColors : product.colors
  const openingColor = palette.find((item) => item.id === initialColorId) ?? palette[0]
  const openingYears = pricedTenures(openingSpec)
  const openingTenure = promo?.tenure && openingYears.includes(Number(promo.tenure)) ? Number(promo.tenure) : openingYears[0]
  const [colorId, setColorId] = useState(openingColor.id)
  const [specId, setSpecId] = useState(openingSpec.id)
  const [payMode, setPayMode] = useState("subscribe")
  const spec = visibleSpecs.find((item) => item.id === specId) ?? openingSpec
  const subscribeYears = pricedTenures(spec)
  const [tenure, setTenure] = useState(openingTenure)
  const [care, setCare] = useState(() => {
    const options = planCareOptions(product, openingSpec, { payMode: "subscribe", tenure: openingTenure })
    if (promo?.care && options.includes(promo.care)) return promo.care
    return options[0] ?? "none"
  })
  const [visitCycle, setVisitCycle] = useState(() => visitCycles(openingSpec, openingTenure)[0] ?? 6)
  const color = palette.find((item) => item.id === colorId) ?? palette[0]
  const variant = color.variants?.[spec.id]
  const shot = variant?.image || color.image
  const waitingPhoto = !shot || /lg-subscribe-2025-banner/i.test(shot)
  const thumbs = waitingPhoto
    ? []
    : (variant?.gallery?.length ? variant.gallery : color.gallery?.length ? color.gallery : [shot]).filter((src) => src && !/lg-subscribe-2025-banner/i.test(src)).slice(0, 5)
  const modelCode = variant?.model || color.model || product.model
  const viewColor = { ...color, model: modelCode, image: shot }
  const detail = variant?.detail?.quickFeatures?.length || variant?.detail?.stories?.length ? variant.detail : null
  const facts = detail?.facts?.length ? detail.facts : product.facts
  const localized = localizePdp(lang, product.id, {
    tagline: detail?.tagline || product.tagline,
    quickFeatures: detail?.quickFeatures?.length ? detail.quickFeatures : product.quickFeatures,
    stories: detail?.stories?.length ? detail.stories : product.stories,
  })
  const { tagline, quickFeatures, stories } = localized
  const [hero, setHero] = useState(shot)

  useEffect(() => {
    const years = pricedTenures(spec)
    if (years.length && !years.includes(tenure)) setTenure(years[0])
  }, [spec, tenure])

  useEffect(() => {
    const options = planCareOptions(product, spec, { payMode, tenure })
    if (options.length && !options.includes(care)) setCare(options[0])
  }, [product, spec, tenure, care, payMode])

  useEffect(() => {
    const cycles = visitCycles(spec, tenure)
    if (cycles.length && !cycles.includes(visitCycle)) setVisitCycle(cycles[0])
  }, [spec, tenure, visitCycle])

  useEffect(() => {
    if (payMode === "outright" && !hasOutrightPrice(spec)) setPayMode("subscribe")
  }, [spec, payMode])

  useEffect(() => {
    setHero(shot)
  }, [shot])

  const careKey = payMode === "outright" ? (product.type === "water" ? care : "none") : product.hasCare ? care : "none"

  const price = useMemo(() => {
    const amount = planPrice(spec, { payMode, tenure, care: careKey, cycle: visitCycle })
    if (payMode === "outright") return { kind: "outright", amount }
    const planPromo = promoForProductPlan(product, { tenure, care: careKey })
    return { kind: "subscribe", ...applyPromo(amount, planPromo, { tenure, care: careKey }), months: tenure, planPromo }
  }, [payMode, spec, careKey, tenure, visitCycle, promo])

  const activePromo = price.planPromo ?? promo
  const colorLabel = viewColor.name === "Default" ? product.shortName : viewColor.name
  const giftNote = giftForProduct(product) && payMode === "subscribe" ? t("pdp.waBundleNote") : ""
  const waText =
    activePromo && payMode === "subscribe" && price.now != null
      ? `${t("pdp.waPromo", { name: product.name, model: modelCode, price: price.now })}${giftNote}`
      : payMode === "outright"
        ? t("pdp.waOutright", {
            model: modelCode,
            color: colorLabel,
            spec: spec.label,
            price: price.amount ?? "TBC",
            care: product.type === "water" ? t("pdp.waterCareNote", { plan: t(`pdp.care.${careKey}`) }) : "",
          })
        : `${t("pdp.waSubscribe", {
            model: modelCode,
            color: colorLabel,
            spec: spec.label,
            tenure: t(`pdp.tenureLabel.${tenure}`) || tenure,
            care: t(`pdp.care.${careKey}`),
            visit: careKey === "visit" ? t("pdp.visitSuffix", { n: visitCycle }) : "",
            price: price.now ?? "TBC",
            promo: activePromo ? ` (${activePromo.title})` : "",
          })}${giftNote}`

  function selectColor(id) {
    const next = palette.find((item) => item.id === id)
    setColorId(id)
    if (next?.specIds?.length && !next.specIds.includes(spec.id)) {
      const allowed = next.specIds.find((item) => visibleSpecs.some((row) => row.id === item))
      if (allowed) setSpecId(allowed)
    }
  }

  function selectSpec(id) {
    setSpecId(id)
    if (color.specIds?.length && !color.specIds.includes(id)) {
      const match = palette.find((item) => item.specIds?.includes(id))
      if (match) setColorId(match.id)
    }
  }

  return (
    <main className="bg-lg-cream pb-20">
      <div className="border-b border-lg-line bg-white">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-5 py-4 text-xs text-lg-muted sm:px-8">
          <button type="button" onClick={onBack} className="inline-flex items-center gap-1 font-medium text-lg-ink hover:text-lg-red">
            <ChevronLeft className="h-3.5 w-3.5" />
            {t("pdp.shop")}
          </button>
          <span>/</span>
          {groupOf(product) ? (
            <a href={`#group-${groupOf(product).id}`} className="font-medium hover:text-lg-red">
              {product.category}
            </a>
          ) : (
            <span>{product.category}</span>
          )}
          <span>/</span>
          <span className="text-lg-ink">{modelCode}</span>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 md:py-12">
        <div className="md:hidden">
          <TitleBlock product={product} color={viewColor} spec={spec} tagline={tagline} />
        </div>

        <div className="mt-8 grid items-start gap-10 md:mt-0 md:grid-cols-2 md:gap-14">
          <div>
            <div className="overflow-hidden rounded-[28px] bg-white shadow-[0_18px_50px_rgba(17,17,17,0.05)]">
              {waitingPhoto ? (
                <div className="flex h-[360px] flex-col items-center justify-center gap-2 text-center md:h-[460px]">
                  <p className="text-sm font-medium text-lg-ink">{t("pdp.photoComing")}</p>
                  <p className="max-w-xs text-xs leading-5 text-lg-muted">{`Drop the main photo into public/products/${modelCode}.jpg`}</p>
                </div>
              ) : product.type === "water" ? (
                <CroppedPhoto
                  src={hero}
                  alt={displayName(product, viewColor)}
                  className="mx-auto h-[360px] w-full md:h-[460px]"
                  fallbackClass="object-contain p-8 md:p-10"
                />
              ) : (
                <img src={hero} alt={displayName(product, viewColor)} className="mx-auto h-[360px] w-full object-contain p-8 md:h-[460px] md:p-10" />
              )}
            </div>
            {thumbs.length > 1 ? (
              <div className="mt-5 grid grid-cols-5 gap-3">
                {thumbs.map((src) => (
                  <button
                    key={src}
                    type="button"
                    onClick={() => setHero(src)}
                    className={`aspect-square overflow-hidden rounded-2xl bg-white ${hero === src ? "ring-2 ring-lg-red ring-offset-2 ring-offset-lg-cream" : "ring-1 ring-lg-line"}`}
                  >
                    {product.type === "water" ? (
                      <CroppedPhoto src={src} alt="" className="h-full w-full" fallbackClass="object-contain p-1" />
                    ) : (
                      <img src={src} alt="" className="h-full w-full object-contain p-1" />
                    )}
                  </button>
                ))}
              </div>
            ) : null}
            <FeatureGrid items={quickFeatures} className="mt-5 hidden md:grid" />
          </div>

          <div>
            <div className="hidden md:block">
              <TitleBlock product={product} color={viewColor} spec={spec} tagline={tagline} />
            </div>

            {palette.length > 1 && palette.some((item) => item.name !== "Default") ? (
              <div className="mt-5">
                <div className="flex items-end justify-between text-sm">
                  <span className="font-bold tracking-tight text-gray-900">{t("pdp.colour")}</span>
                  <span className="text-lg-muted">{viewColor.name}</span>
                </div>
                <div className="mt-2 flex gap-3">
                  {palette.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      aria-label={item.name}
                      onClick={() => selectColor(item.id)}
                      className={`h-9 w-9 rounded-full border border-black/10 ${colorId === item.id ? "ring-2 ring-lg-red ring-offset-2 ring-offset-lg-cream" : ""}`}
                      style={{ background: item.hex }}
                    />
                  ))}
                </div>
              </div>
            ) : null}

            {visibleSpecs.length > 1 ? (
              <div className="mt-6">
                <p className="text-xs font-bold tracking-tight text-gray-900">{product.specLabel}</p>
                <div className="mt-3 grid grid-cols-2 gap-2.5">
                  {visibleSpecs.map((item) => {
                    const selected = specId === item.id
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => selectSpec(item.id)}
                        className={`${tileBase} ${tileState(selected)}`}
                      >
                        {selected ? <SelectedMark /> : null}
                        <span className="block">{item.label}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            ) : null}

            {payMode === "subscribe" && activePromo ? (
              <div className="mt-4">
                <PromoBadge promo={activePromo} />
              </div>
            ) : null}

            <div className="mt-4">
              <PlanConfigurator
                product={product}
                spec={spec}
                payMode={payMode}
                setPayMode={setPayMode}
                subscribeYears={subscribeYears}
                tenure={tenure}
                setTenure={setTenure}
                care={care}
                setCare={setCare}
                visitCycle={visitCycle}
                setVisitCycle={setVisitCycle}
                promo={promo}
                price={price}
                waText={waText}
              />
            </div>
          </div>
        </div>

        <FeatureGrid items={quickFeatures} className="mt-10 md:hidden" />

        <div className="mt-14 space-y-10">
          {(stories ?? []).map((story, index) => (
            <article
              key={story.title}
              className={`grid overflow-hidden rounded-[28px] bg-white shadow-[0_18px_50px_rgba(17,17,17,0.04)] md:grid-cols-2 ${index % 2 ? "md:[&>div:first-child]:order-2" : ""}`}
            >
              <div className="min-h-[260px] overflow-hidden bg-[#111]">
                {story.video ? (
                  <video className="h-full w-full object-cover" autoPlay muted loop playsInline poster={story.poster}>
                    <source src={story.video} type="video/mp4" />
                  </video>
                ) : product.type === "water" ? (
                  <CroppedPhoto src={story.poster} alt="" className="h-full w-full min-h-[260px]" fallbackClass="object-cover" />
                ) : (
                  <img src={story.poster} alt="" className="h-full w-full object-cover" />
                )}
              </div>
              <div className="flex flex-col justify-center p-8 lg:p-14">
                <h2 className="text-[26px] font-semibold leading-snug tracking-tight">{story.title}</h2>
                <p className="mt-4 text-[15px] leading-8 text-lg-muted">{story.copy}</p>
              </div>
            </article>
          ))}
        </div>

        {facts?.length ? (
          <section className="mt-14 rounded-[28px] bg-white p-7 sm:p-10">
            <h2 className="text-2xl font-semibold tracking-tight">{t("pdp.specs")}</h2>
            <dl className="mt-6 grid gap-x-10 sm:grid-cols-2">
              {facts.map((item) => (
                <div key={item.label} className="flex justify-between gap-4 border-b border-lg-line py-4 text-sm">
                  <dt className="text-lg-muted">{item.label}</dt>
                  <dd className="text-right font-medium">{item.value}</dd>
                </div>
              ))}
            </dl>
          </section>
        ) : null}
      </div>
    </main>
  )
}
