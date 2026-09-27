import { useEffect, useMemo, useState } from "react"
import { Check, ChevronLeft, Droplets, Flame, LayoutPanelTop, ShieldCheck, Snowflake, Truck, Wifi, Zap } from "lucide-react"
import { SERVICES, careOptions, isMoney, planPrice, promoForProduct, tenurePriced } from "../data/catalog"
import { whatsappHref } from "../config"

const FEATURE_ICONS = {
  Hygienic: ShieldCheck,
  Convenient: Droplets,
  "Built-in": LayoutPanelTop,
  "LG ThinQ™": Wifi,
}

const CARE_ORDER = ["self", "combined", "visit"]
const TENURE_LABEL = { 36: "3 yr", 60: "5 yr", 84: "7 yr" }
const CARE_SHORT = { self: "Self-Service", combined: "Combined", visit: "Regular Visit", none: "Warranty" }
const CARE_BLURB = {
  self: "Filter delivered to you",
  combined: "Filter kit + 1 visit / year",
  visit: "Technician visit on a set interval",
  none: "Standard manufacturer warranty",
}
const VISIT_CYCLES = [
  { id: 6, label: "6 mo" },
  { id: 12, label: "12 mo" },
  { id: 24, label: "24 mo" },
]
const WATER_META = {
  Hot: { Icon: Flame, className: "text-[#c45c26]" },
  Ambient: { Icon: Droplets, className: "text-[#2b6cb0]" },
  Cold: { Icon: Snowflake, className: "text-[#2b9eb3]" },
}

function firstSpec(product) {
  return product.specs.find((item) => item.available) ?? product.specs[0]
}

function applyPromo(monthly, promo) {
  if (monthly == null) return { list: null, now: null }
  if (!promo) return { list: monthly, now: monthly }
  return { list: monthly, now: Math.max(monthly - (promo.extraOff || 0), 0) }
}

function displayName(product, color) {
  if (!product.baseName) return product.name
  if (product.colors.length < 2 || color.name === "Default") return product.baseName
  return `${product.baseName}, ${color.name}`
}

function TitleBlock({ product, color, tagline }) {
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-lg-red">LG Subscribe™</p>
      <h1 className="mt-2 text-[26px] font-semibold leading-[1.25] tracking-tight md:text-[30px]">
        {displayName(product, color)}
      </h1>
      <p className="mt-1.5 text-sm text-lg-muted">{color.model ?? product.model}</p>
      <p className="mt-3 max-w-xl text-sm leading-6 text-lg-ink/75">{tagline}</p>
      {product.waters?.length ? (
        <div className="mt-3 flex flex-wrap gap-2 text-xs font-medium">
          {product.waters.map((item) => {
            const meta = WATER_META[item] ?? WATER_META.Ambient
            const Icon = meta.Icon
            return (
              <span key={item} className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 ring-1 ring-lg-line">
                <Icon className={`h-3.5 w-3.5 ${meta.className}`} />
                {item}
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
  const perks = [
    { Icon: Truck, label: "Free Delivery & Installation" },
    { Icon: ShieldCheck, label: "Zero Deposit" },
    { Icon: Zap, label: "5-Year Warranty" },
  ]
  const services = product.hasCare ? careOptions(spec) : []
  const outrightReady = isMoney(spec.pricing.outright)

  function serviceAmount(id) {
    if (payMode !== "subscribe") return null
    if (id !== "visit") return planPrice(spec, { payMode, tenure, care: id, cycle: visitCycle })
    if (care === "visit") return planPrice(spec, { payMode, tenure, care: "visit", cycle: visitCycle })
    const row = spec.pricing.subscribe?.[tenure]?.visit || {}
    const values = VISIT_CYCLES.map((cycle) => row[cycle.id]).filter(isMoney)
    return values.length ? Math.min(...values) : null
  }

  return (
    <div className="space-y-6">
      <div>
        <StepLabel n="1">Purchase Option</StepLabel>
        <div className="mt-3 grid grid-cols-2 gap-2.5">
          {[
            { id: "subscribe", label: "Subscription" },
            { id: "outright", label: "Outright" },
          ].map((mode) => {
            const selected = payMode === mode.id
            const ready = mode.id === "subscribe" || outrightReady
            return (
              <button
                key={mode.id}
                type="button"
                disabled={!ready}
                onClick={() => ready && setPayMode(mode.id)}
                className={`${tileBase} ${ready ? tileState(selected) : "cursor-not-allowed border-gray-100 text-gray-300"}`}
              >
                {selected && ready ? <SelectedMark /> : null}
                <span className="block">{mode.label}</span>
                {mode.id === "outright" && !ready ? <span className="mt-0.5 block text-[10px] font-medium tracking-normal text-gray-300">TBC</span> : null}
              </button>
            )
          })}
        </div>
      </div>

      <div>
        <StepLabel n="2">Rental Tenure</StepLabel>
        {payMode === "subscribe" ? (
          <div className="mt-3 grid grid-cols-2 gap-2.5 pt-2">
            {subscribeYears.map((item) => {
              const selected = tenure === item
              const ready = tenurePriced(spec, item)
              const popular = item === 84 && ready
              return (
                <button
                  key={item}
                  type="button"
                  disabled={!ready}
                  onClick={() => ready && setTenure(item)}
                  className={`${tileBase} ${ready ? tileState(selected) : "cursor-not-allowed border-gray-100 text-gray-300"}`}
                >
                  {popular ? <MicroBadge shift={selected}>🔥 Popular</MicroBadge> : null}
                  {selected && ready ? <SelectedMark /> : null}
                  <span className="block">{TENURE_LABEL[item]}</span>
                  {!ready ? <span className="mt-0.5 block text-[10px] font-medium tracking-normal text-gray-300">TBC</span> : null}
                </button>
              )
            })}
          </div>
        ) : (
          <p className="mt-3 text-xs leading-5 text-gray-500">1-year CareShip™ package with the appliance.</p>
        )}
      </div>

      <div>
        <StepLabel n="3">Service Plan</StepLabel>
        {services.length ? (
          <div className="mt-3 space-y-3 pt-2">
            {services.map((id) => {
              const amount = serviceAmount(id)
              const ready = payMode === "outright" || amount != null
              const selected = care === id
              const priced = applyPromo(amount, promo).now
              return (
                <button
                  key={id}
                  type="button"
                  disabled={!ready}
                  onClick={() => ready && setCare(id)}
                  className={`relative flex w-full items-center gap-3 rounded-xl border px-3.5 py-3.5 text-left transition-all duration-200 ease-in-out ${
                    !ready
                      ? "cursor-not-allowed border-gray-100 bg-white"
                      : selected
                        ? "border-transparent bg-rose-50/50 shadow-sm ring-1 ring-[#A50034]"
                        : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  {id === services[0] && ready ? <MicroBadge>Recommended</MicroBadge> : null}
                  <span
                    className={`flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border-[1.5px] transition-all duration-200 ease-in-out ${
                      selected && ready ? "border-[#A50034] bg-[#A50034]" : "border-gray-300 bg-white"
                    }`}
                    aria-hidden="true"
                  >
                    <span className={`h-1.5 w-1.5 rounded-full bg-white transition-transform duration-200 ease-in-out ${selected && ready ? "scale-100" : "scale-0"}`} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className={`block text-sm font-bold tracking-tight ${selected && ready ? "text-gray-900" : "text-gray-500"}`}>
                      {CARE_SHORT[id]}
                    </span>
                    <span className="mt-0.5 block text-xs text-gray-400">{CARE_BLURB[id]}</span>
                  </span>
                  {payMode === "subscribe" ? (
                    <span className={`shrink-0 text-sm font-bold tracking-tight ${priced != null && selected ? "text-[#A50034]" : "text-gray-400"}`}>
                      {priced == null ? "TBC" : `RM ${priced}`}
                      {priced != null ? <span className="ml-0.5 text-[11px] font-medium text-gray-400">/mth</span> : null}
                    </span>
                  ) : null}
                </button>
              )
            })}
          </div>
        ) : (
          <p className="mt-3 text-xs leading-5 text-gray-500">{SERVICES.none.name}</p>
        )}
        {payMode === "subscribe" && care === "visit" ? (
          <div className="mt-3 grid grid-cols-3 gap-2.5">
            {VISIT_CYCLES.map((cycle) => {
              const amount = planPrice(spec, { payMode: "subscribe", tenure, care: "visit", cycle: cycle.id })
              const ready = amount != null
              const selected = visitCycle === cycle.id
              return (
                <button
                  key={cycle.id}
                  type="button"
                  disabled={!ready}
                  onClick={() => ready && setVisitCycle(cycle.id)}
                  className={`${tileBase} ${ready ? tileState(selected) : "cursor-not-allowed border-gray-100 text-gray-300"}`}
                >
                  {selected && ready ? <SelectedMark /> : null}
                  <span className="block">{cycle.label}</span>
                  <span className={`mt-0.5 block text-[10px] font-medium tracking-normal ${ready ? "text-gray-400" : "text-gray-300"}`}>
                    {ready ? `RM ${applyPromo(amount, promo).now}` : "TBC"}
                  </span>
                </button>
              )
            })}
          </div>
        ) : null}
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-lg">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-400">Your plan</p>
        {price.kind === "subscribe" && price.now != null ? (
          <p className="mt-2 text-[42px] font-bold leading-none tracking-tight text-[#A50034]">
            RM {price.now}
            <span className="ml-1 text-base font-medium tracking-normal text-gray-400">/mth</span>
          </p>
        ) : price.kind === "outright" && price.amount != null ? (
          <p className="mt-2 text-[42px] font-bold leading-none tracking-tight text-[#A50034]">RM {price.amount.toLocaleString()}</p>
        ) : (
          <p className="mt-2 text-2xl font-bold tracking-tight text-gray-400">Price to be confirmed</p>
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
          Enquire via WhatsApp
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
        const Icon = featureIcon(item.title)
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

export default function ProductDetail({ product, onBack }) {
  const promo = promoForProduct(product)
  const openingSpec = firstSpec(product)
  const openingYears = Object.keys(openingSpec.pricing.subscribe).map(Number).sort((a, b) => b - a)
  const openingTenure = openingYears.find((year) => tenurePriced(openingSpec, year)) ?? openingYears[0]
  const [colorId, setColorId] = useState(product.colors[0].id)
  const [specId, setSpecId] = useState(openingSpec.id)
  const [payMode, setPayMode] = useState("subscribe")
  const spec = product.specs.find((item) => item.id === specId) ?? openingSpec
  const subscribeYears = Object.keys(spec.pricing.subscribe).map(Number).sort((a, b) => b - a)
  const [tenure, setTenure] = useState(openingTenure)
  const [care, setCare] = useState(careOptions(openingSpec)[0] ?? "none")
  const [visitCycle, setVisitCycle] = useState(6)
  const color = product.colors.find((item) => item.id === colorId) ?? product.colors[0]
  const variant = color.variants?.[spec.id]
  const shot = variant?.image || color.image
  const thumbs = (variant?.gallery?.length ? variant.gallery : color.gallery?.length ? color.gallery : [shot]).slice(0, 5)
  const modelCode = variant?.model || color.model || product.model
  const viewColor = { ...color, model: modelCode, image: shot }
  const detail = variant?.detail?.quickFeatures?.length || variant?.detail?.stories?.length ? variant.detail : null
  const quickFeatures = detail?.quickFeatures?.length ? detail.quickFeatures : product.quickFeatures
  const stories = detail?.stories?.length ? detail.stories : product.stories
  const facts = detail?.facts?.length ? detail.facts : product.facts
  const tagline = detail?.tagline || product.tagline
  const [hero, setHero] = useState(shot)

  useEffect(() => {
    const years = Object.keys(spec.pricing.subscribe).map(Number).filter((year) => tenurePriced(spec, year))
    if (years.length && !years.includes(tenure)) setTenure(years[0])
  }, [spec, tenure])

  useEffect(() => {
    const options = careOptions(spec)
    if (options.length && !options.includes(care)) setCare(options[0])
  }, [spec, care])

  useEffect(() => {
    if (payMode === "outright" && !isMoney(spec.pricing.outright)) setPayMode("subscribe")
  }, [spec, payMode])

  useEffect(() => {
    setHero(shot)
  }, [shot])

  const careKey = product.hasCare ? care : "none"

  const price = useMemo(() => {
    const amount = planPrice(spec, { payMode, tenure, care: careKey, cycle: visitCycle })
    if (payMode === "outright") return { kind: "outright", amount }
    return { kind: "subscribe", ...applyPromo(amount, promo), months: tenure }
  }, [payMode, spec, careKey, tenure, visitCycle, promo])

  const waText = `LG Subscribe enquiry — ${modelCode}, ${viewColor.name === "Default" ? product.shortName : viewColor.name}, ${spec.label}, ${
    payMode === "outright"
      ? `Outright RM ${price.amount ?? "TBC"}`
      : `${TENURE_LABEL[tenure] ?? tenure} ${CARE_SHORT[careKey]}${careKey === "visit" ? ` every ${visitCycle} months` : ""} RM ${price.now ?? "TBC"}${price.now != null ? "/month" : ""}`
  }${promo ? ` (${promo.title})` : ""}.`

  function selectColor(id) {
    const next = product.colors.find((item) => item.id === id)
    setColorId(id)
    if (next?.specIds?.length && !next.specIds.includes(spec.id)) setSpecId(next.specIds[0])
  }

  function selectSpec(id) {
    setSpecId(id)
    if (color.specIds?.length && !color.specIds.includes(id)) {
      const match = product.colors.find((item) => item.specIds?.includes(id))
      if (match) setColorId(match.id)
    }
  }

  return (
    <main className="bg-lg-cream pb-20">
      <div className="border-b border-lg-line bg-white">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-5 py-4 text-xs text-lg-muted sm:px-8">
          <button type="button" onClick={onBack} className="inline-flex items-center gap-1 font-medium text-lg-ink hover:text-lg-red">
            <ChevronLeft className="h-3.5 w-3.5" />
            Shop
          </button>
          <span>/</span>
          <span>{product.category}</span>
          <span>/</span>
          <span className="text-lg-ink">{modelCode}</span>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 md:py-12">
        <div className="md:hidden">
          <TitleBlock product={product} color={viewColor} tagline={tagline} />
        </div>

        <div className="mt-8 grid items-start gap-10 md:mt-0 md:grid-cols-2 md:gap-14">
          <div>
            <div className="overflow-hidden rounded-[28px] bg-white shadow-[0_18px_50px_rgba(17,17,17,0.05)]">
              <img src={hero} alt={displayName(product, viewColor)} className="mx-auto h-[360px] w-full object-contain p-8 md:h-[460px] md:p-10" />
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
                    <img src={src} alt="" className="h-full w-full object-contain p-1" />
                  </button>
                ))}
              </div>
            ) : null}
            <FeatureGrid items={quickFeatures} className="mt-5 hidden md:grid" />
          </div>

          <div>
            <div className="hidden md:block">
              <TitleBlock product={product} color={viewColor} tagline={tagline} />
            </div>

            {product.colors.length > 1 ? (
              <div className="mt-5">
                <div className="flex items-end justify-between text-sm">
                  <span className="font-bold tracking-tight text-gray-900">Colour</span>
                  <span className="text-lg-muted">{viewColor.name}</span>
                </div>
                <div className="mt-2 flex gap-3">
                  {product.colors.map((item) => (
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

            {product.specs.length > 1 ? (
              <div className="mt-6">
                <p className="text-xs font-bold tracking-tight text-gray-900">{product.specLabel}</p>
                <div className="mt-3 grid grid-cols-2 gap-2.5">
                  {product.specs.map((item) => {
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

            {promo ? (
              <p className="mt-4 text-xs font-medium text-lg-red">
                {promo.title}
                {promo.extended ? " · Extended" : ""}
              </p>
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
              <div className="min-h-[260px] bg-[#111]">
                {story.video ? (
                  <video className="h-full w-full object-cover" autoPlay muted loop playsInline poster={story.poster}>
                    <source src={story.video} type="video/mp4" />
                  </video>
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
            <h2 className="text-2xl font-semibold tracking-tight">Specifications</h2>
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
