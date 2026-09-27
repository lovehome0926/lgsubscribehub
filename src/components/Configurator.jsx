import { useEffect, useMemo, useState } from "react"
import { Check, ChevronDown, Info, MessageCircle, ShieldCheck, Sparkles } from "lucide-react"
import { PRODUCTS, SERVICES } from "../data/catalog"
import { whatsappHref } from "../config"

const TENURE_FACTOR = { 36: 1.28, 48: 1.12, 60: 1 }

function firstAvailable(list) {
  return list.find((item) => item.available)?.id ?? list[0].id
}

function roundRm(value) {
  return Math.round(value)
}

export default function Configurator({ productId, onProductChange }) {
  const product = PRODUCTS.find((item) => item.id === productId) ?? PRODUCTS[0]
  const [colorId, setColorId] = useState(product.colors[0].id)
  const [specId, setSpecId] = useState(firstAvailable(product.specs))
  const [serviceId, setServiceId] = useState(product.hasCare ? "self" : "none")
  const [tenure, setTenure] = useState(product.defaultTenure)
  const [hero, setHero] = useState(product.colors[0].image)
  const [showTotals, setShowTotals] = useState(false)

  useEffect(() => {
    setColorId(product.colors[0].id)
    setSpecId(firstAvailable(product.specs))
    setServiceId(product.hasCare ? "self" : "none")
    setTenure(product.defaultTenure)
    setHero(product.colors[0].image)
    setShowTotals(false)
  }, [product])

  const color = product.colors.find((item) => item.id === colorId) ?? product.colors[0]
  const spec = product.specs.find((item) => item.id === specId) ?? product.specs[0]
  const serviceKey = product.hasCare ? serviceId : "none"
  const service = SERVICES[serviceKey]
  const baseMonthly = spec.monthly[serviceKey] ?? Object.values(spec.monthly)[0]
  const monthly = roundRm(baseMonthly * (product.type === "tv" ? 1 : TENURE_FACTOR[tenure]))
  const months = product.type === "tv" ? 36 : tenure

  const quote = useMemo(() => {
    const yearOne = monthly * 11
    return {
      yearOne,
      saveYear1: Math.max(product.buyout - yearOne, 0),
      contract: monthly * months,
    }
  }, [monthly, months, product.buyout])

  const waText = `I would like to enquire about LG Subscribe Malaysia: ${product.name} (${product.model}), colour ${color.name}, ${spec.label}, ${service.name}, ${months} months. Estimated RM ${monthly}/month.`
  const thumbs = [color.image, ...product.gallery.filter((src) => src !== color.image)]

  return (
    <section id="plan" className="scroll-mt-24 bg-lg-cream py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-lg-red">Build your plan</p>
        <h2 className="mt-2 text-3xl font-semibold">Check your monthly rental</h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-lg-muted">
          Select colour, specification and CareShip™ package. Television plans automatically use Standard Warranty — visit care is not offered on TVs.
        </p>

        <div className="mt-6 flex gap-2 overflow-x-auto pb-2">
          {PRODUCTS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onProductChange(item.id)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium ${
                item.id === product.id ? "bg-lg-red text-white" : "bg-white text-lg-ink ring-1 ring-lg-line hover:ring-black/30"
              }`}
            >
              {item.category}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <div className="relative overflow-hidden rounded-[28px] bg-white ring-1 ring-lg-line">
              <div className="absolute left-4 top-4 z-10 flex flex-wrap gap-2">
                {product.promotions.map((promo) => (
                  <span key={promo} className="rounded-full bg-lg-red px-3 py-1 text-[11px] font-semibold uppercase text-white">
                    {promo}
                  </span>
                ))}
              </div>
              <img src={hero} alt={product.shortName} className="animate-float mx-auto h-[360px] object-contain p-10 sm:h-[420px]" />
            </div>
            <div className="mt-4 flex gap-3">
              {thumbs.map((src) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setHero(src)}
                  className={`h-[72px] w-[72px] overflow-hidden rounded-2xl bg-white ${
                    hero === src ? "ring-2 ring-lg-red" : "ring-1 ring-lg-line"
                  }`}
                >
                  <img src={src} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold">{product.shortName}</h3>
            <p className="text-sm text-lg-muted">{product.model}</p>
            <p className="mt-3 text-sm leading-6 text-lg-muted">{product.tagline}</p>

            <div className="mt-6">
              <div className="flex justify-between text-sm">
                <span className="font-medium">Colour</span>
                <span className="text-lg-muted">{color.name}</span>
              </div>
              <div className="mt-3 flex gap-3">
                {product.colors.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    aria-label={item.name}
                    onClick={() => {
                      setColorId(item.id)
                      setHero(item.image)
                    }}
                    className={`h-9 w-9 rounded-full border border-black/10 ${
                      colorId === item.id ? "ring-2 ring-lg-red ring-offset-2 ring-offset-lg-cream" : ""
                    }`}
                    style={{ background: item.hex }}
                  />
                ))}
              </div>
            </div>

            <div className="mt-6">
              <p className="text-sm font-medium">{product.specLabel}</p>
              <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {product.specs.map((item) => {
                  const disabled = !item.available
                  return (
                    <button
                      key={item.id}
                      type="button"
                      disabled={disabled}
                      onClick={() => !disabled && setSpecId(item.id)}
                      className={`rounded-2xl px-3 py-3 text-sm font-semibold ${
                        disabled
                          ? "cursor-not-allowed bg-white text-lg-muted/40 line-through"
                          : specId === item.id
                            ? "bg-white ring-2 ring-lg-red"
                            : "bg-white ring-1 ring-lg-line hover:ring-black/30"
                      }`}
                    >
                      {item.label}
                      {disabled ? <span className="mt-1 block text-[10px] font-normal no-underline">Unavailable</span> : null}
                    </button>
                  )
                })}
              </div>
            </div>

            {product.type !== "tv" ? (
              <div className="mt-6">
                <p className="text-sm font-medium">Contract period</p>
                <div className="mt-3 flex gap-2">
                  {[36, 48, 60].map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setTenure(item)}
                      className={`flex-1 rounded-full py-2.5 text-sm font-semibold ${
                        tenure === item ? "bg-lg-red text-white" : "bg-white ring-1 ring-lg-line"
                      }`}
                    >
                      {item} months
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <p className="mt-6 text-xs text-lg-muted">TV Subscribe plans are offered on a 36-month tenure.</p>
            )}

            <div className="mt-6">
              <p className="text-sm font-medium">CareShip™ package</p>
              {!product.hasCare ? (
                <div className="mt-3 rounded-2xl bg-white p-4 ring-2 ring-lg-red">
                  <p className="font-semibold">{SERVICES.none.name}</p>
                  <p className="mt-1 text-sm text-lg-muted">{SERVICES.none.blurb}</p>
                </div>
              ) : (
                <div className="mt-3 grid gap-2">
                  {["self", "combined", "visit"].map((id) => {
                    const option = SERVICES[id]
                    return (
                      <button
                        key={id}
                        type="button"
                        onClick={() => setServiceId(id)}
                        className={`flex items-start justify-between gap-3 rounded-2xl bg-white p-4 text-left ${
                          serviceId === id ? "ring-2 ring-lg-red" : "ring-1 ring-lg-line"
                        }`}
                      >
                        <span>
                          <span className="block font-semibold">{option.name}</span>
                          <span className="mt-1 block text-xs leading-5 text-lg-muted">{option.blurb}</span>
                        </span>
                        <span className="shrink-0 rounded-full bg-lg-cream px-2.5 py-1 text-[11px] font-semibold">
                          {option.frequency}
                        </span>
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-6 rounded-[28px] bg-white p-6 ring-1 ring-lg-line lg:grid-cols-[1.2fr_0.8fr] lg:p-10">
          <div>
            <p className="text-sm text-lg-muted">Estimated monthly rental</p>
            <p className="mt-1 text-6xl font-extrabold tracking-tight text-lg-red">
              RM {monthly}
              <span className="text-2xl font-semibold text-lg-muted"> /month</span>
            </p>
            <p className="mt-2 text-sm text-lg-muted">Includes CareShip™ on a {`${months}-month`} plan</p>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#eaf8ef] px-4 py-2 text-sm font-semibold text-[#1f7a43]">
              <Sparkles className="h-4 w-4" />
              Save up to RM {quote.saveYear1.toLocaleString()} upfront in Year 1 vs outright purchase
            </div>
            <p className="mt-4 flex items-center gap-2 text-sm">
              <ShieldCheck className="h-4 w-4 text-lg-red" />
              {product.hasCare
                ? "Includes LG CareShip™ factory maintenance in the selected package"
                : "Covered by LG standard manufacturer warranty"}
            </p>
            <button type="button" onClick={() => setShowTotals((open) => !open)} className="mt-5 flex items-center gap-2 text-xs text-lg-muted">
              <Info className="h-3.5 w-3.5" />
              Plan details
              <ChevronDown className={`h-3.5 w-3.5 ${showTotals ? "rotate-180" : ""}`} />
            </button>
            {showTotals ? (
              <dl className="mt-3 max-w-md space-y-2 text-xs text-lg-muted">
                <div className="flex justify-between"><dt>Total contract value</dt><dd>RM {quote.contract.toLocaleString()}</dd></div>
                <div className="flex justify-between"><dt>Outright purchase price</dt><dd>RM {product.buyout.toLocaleString()}</dd></div>
                <div className="flex justify-between"><dt>Year-1 payable (11 months)</dt><dd>RM {quote.yearOne.toLocaleString()}</dd></div>
              </dl>
            ) : null}
          </div>
          <div className="flex flex-col justify-between rounded-3xl bg-lg-cream p-6">
            <ul className="space-y-3 text-sm">
              {[`${color.name} · ${spec.label}`, service.name, `${months}-month Subscribe contract`, "Installation arranged after approval"].map((line) => (
                <li key={line} className="flex gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-lg-red" />
                  {line}
                </li>
              ))}
            </ul>
            <a
              href={whatsappHref(waText)}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-lg-red py-4 text-sm font-semibold text-white hover:bg-lg-red-dark"
            >
              <MessageCircle className="h-4 w-4" />
              Enquire via WhatsApp with This Plan
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
