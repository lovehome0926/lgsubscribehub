import { useEffect, useState } from "react"
import { Armchair, Droplets, Refrigerator, Shirt, Snowflake, Tv, UtensilsCrossed, WashingMachine, Wind } from "lucide-react"
import { CATEGORY_GROUPS, allListings, applyPromo, groupById, groupedCatalog, lowestMonthlyFor, promoForProduct } from "../data/catalog"

const ICONS = {
  water: Droplets,
  air: Wind,
  ac: Snowflake,
  tv: Tv,
  washer: WashingMachine,
  dryer: WashingMachine,
  fridge: Refrigerator,
  dish: UtensilsCrossed,
  styler: Shirt,
  massage: Armchair,
}

const ALL = "all"

function groupFromHash() {
  const hash = window.location.hash.replace(/^#\/?/, "")
  if (!hash.startsWith("group-")) return null
  const id = hash.slice("group-".length)
  return groupById(id) ? id : null
}

function choosableColors(colors) {
  return colors.filter((color) => color.name && color.name !== "Default")
}

function ProductCard({ listing, onSelect }) {
  const { product, specs, colors, title } = listing
  const [colorId, setColorId] = useState(colors[0].id)
  const [specId, setSpecId] = useState(specs[0].id)
  const color = colors.find((item) => item.id === colorId) ?? colors[0]
  const spec = specs.find((item) => item.id === specId) ?? specs[0]
  const variant = color.variants?.[spec.id]
  const image = variant?.image || color.image
  const waitingPhoto = !image || /lg-subscribe-2025-banner/i.test(image)
  const model = variant?.model || color.model || product.model
  const from = lowestMonthlyFor([spec])
  const promo = promoForProduct(product)
  const deal = applyPromo(from, promo)
  const Icon = ICONS[product.type] ?? Droplets
  const palette = choosableColors(colors)
  const showColors = palette.length > 1
  const showSpecs = specs.length > 1

  function pickColor(id) {
    const next = colors.find((item) => item.id === id)
    setColorId(id)
    if (next?.specIds?.length && !next.specIds.includes(spec.id)) {
      setSpecId(next.specIds.find((item) => specs.some((row) => row.id === item)) ?? next.specIds[0])
    }
  }

  function pickSpec(id) {
    setSpecId(id)
    if (color.specIds?.length && !color.specIds.includes(id)) {
      const match = colors.find((item) => item.specIds?.includes(id))
      if (match) setColorId(match.id)
    }
  }

  return (
    <article className="flex flex-col rounded-[28px] bg-white p-5 shadow-sm ring-1 ring-lg-line">
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-lg-red px-3 py-1 text-[11px] font-semibold text-white">
          {promo?.badge ?? "Subscribe"}
        </span>
        <Icon className="h-4 w-4 text-lg-muted" />
      </div>
      <div className="flex h-44 items-center justify-center">
        {waitingPhoto ? (
          <div className="flex flex-col items-center gap-2 text-center">
            <Icon className="h-8 w-8 text-lg-muted/70" />
            <p className="text-[11px] text-lg-muted">Photo coming</p>
          </div>
        ) : (
          <img src={image} alt={title} className="max-h-40 object-contain" />
        )}
      </div>
      {showColors ? (
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5" role="group" aria-label="Available colours">
            {palette.map((item) => {
              const selected = colorId === item.id
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-label={item.name}
                  title={item.name}
                  onClick={() => pickColor(item.id)}
                  className={`h-5 w-5 rounded-full border border-black/15 ${
                    selected ? "ring-2 ring-lg-red ring-offset-2 ring-offset-white" : ""
                  }`}
                  style={{ background: item.hex }}
                />
              )
            })}
          </div>
          <span className="text-[11px] text-lg-muted">{color.name}</span>
        </div>
      ) : null}
      {showSpecs ? (
        <div className={`${showColors ? "mt-3" : ""} flex flex-wrap gap-1.5`} role="group" aria-label={product.specLabel}>
          {specs.map((item) => {
            const selected = specId === item.id
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => pickSpec(item.id)}
                className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                  selected ? "bg-lg-red text-white" : "bg-lg-cream text-lg-ink ring-1 ring-lg-line"
                }`}
              >
                {item.label}
              </button>
            )
          })}
        </div>
      ) : null}
      <p className={`text-xs text-lg-muted ${showColors || showSpecs ? "mt-3" : ""}`}>{product.category}</p>
      <h3 className="mt-1 text-[15px] font-semibold leading-6">{title}</h3>
      <p className="mt-1 text-xs text-lg-muted">{model}</p>
      <p className="mt-4 text-xs text-lg-muted">Subscription</p>
      {from != null ? (
        <div>
          <p className="text-2xl font-semibold text-lg-red">
            RM {deal.now}
            <span className="text-sm font-medium text-lg-muted"> /month</span>
          </p>
          {deal.list !== deal.now ? (
            <p className="mt-1 text-[11px] text-lg-muted">
              <span className="line-through">RM {from}</span>
              {deal.introMonths ? ` first ${deal.introMonths} months` : ""}
            </p>
          ) : null}
        </div>
      ) : (
        <p className="text-lg font-semibold text-gray-400">Price to be confirmed</p>
      )}
      <button
        type="button"
        onClick={() => onSelect(product.id, spec.id, color.id)}
        className="mt-4 rounded-full bg-lg-red py-2.5 text-sm font-semibold text-white hover:bg-lg-red-dark"
      >
        Subscribe Now
      </button>
    </article>
  )
}

export default function Catalog({ onSelect }) {
  const [active, setActive] = useState(() => groupFromHash() ?? ALL)

  useEffect(() => {
    const onHash = () => {
      const id = groupFromHash()
      if (id) setActive(id)
    }
    window.addEventListener("hashchange", onHash)
    return () => window.removeEventListener("hashchange", onHash)
  }, [])

  const sections = groupedCatalog()
  const listings = allListings()
  const visible = active === ALL ? sections : sections.filter((entry) => entry.group.id === active)

  const tabs = [
    { id: ALL, name: "All products", count: listings.length },
    ...CATEGORY_GROUPS.map((group) => ({
      id: group.id,
      name: group.name,
      count: sections.find((entry) => entry.group.id === group.id)?.listings.length ?? 0,
    })).filter((tab) => tab.count > 0),
  ]

  return (
    <section id="shop" className="scroll-mt-24 bg-lg-cream py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-lg-red">Shop LG Subscribe</p>
            <h2 className="mt-2 text-3xl font-semibold">Browse by category</h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-lg-muted">
            Colour circles and size or horsepower chips mean you can choose on the card. Different prices and models
            get their own card so the monthly fee you see is the fee you pay.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-2" role="tablist" aria-label="Product categories">
          {tabs.map((tab) => {
            const selected = tab.id === active
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setActive(tab.id)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  selected
                    ? "bg-lg-red text-white"
                    : "bg-white text-lg-ink ring-1 ring-lg-line hover:ring-lg-red"
                }`}
              >
                {tab.name}
                <span className={`ml-2 text-xs font-medium ${selected ? "text-white/70" : "text-lg-muted"}`}>
                  {tab.count}
                </span>
              </button>
            )
          })}
        </div>

        {visible.map(({ group, listings: cards }) => (
          <div key={group.id} id={`group-${group.id}`} className="scroll-mt-40 mt-12">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 border-b border-lg-line pb-3">
              <h3 className="text-xl font-semibold">{group.name}</h3>
              <p className="text-sm text-lg-muted">{group.blurb}</p>
            </div>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {cards.map((listing) => (
                <ProductCard key={listing.id} listing={listing} onSelect={onSelect} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
