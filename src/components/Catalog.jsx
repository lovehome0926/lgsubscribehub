import { useEffect, useState } from "react"
import { Armchair, Droplets, Refrigerator, Shirt, Snowflake, Tv, UtensilsCrossed, WashingMachine, Wind } from "lucide-react"
import { CATEGORY_GROUPS, PRODUCTS, groupById, groupedCatalog, promoForProduct, startingMonthly } from "../data/catalog"

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

function ProductCard({ product, onSelect }) {
  const Icon = ICONS[product.type] ?? Droplets
  const from = startingMonthly(product)
  const promo = promoForProduct(product)
  return (
    <article className="flex flex-col rounded-[28px] bg-white p-5 shadow-sm ring-1 ring-lg-line">
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-lg-red px-3 py-1 text-[11px] font-semibold text-white">
          {promo?.badge ?? "Subscribe"}
        </span>
        <Icon className="h-4 w-4 text-lg-muted" />
      </div>
      <div className="flex h-44 items-center justify-center">
        <img src={product.colors[0].image} alt={product.shortName} className="max-h-40 object-contain" />
      </div>
      <p className="text-xs text-lg-muted">{product.category}</p>
      <h3 className="mt-1 text-[15px] font-semibold leading-6">{product.shortName}</h3>
      <p className="mt-1 text-xs text-lg-muted">{product.model}</p>
      <p className="mt-4 text-xs text-lg-muted">Subscription from</p>
      {from != null ? (
        <p className="text-2xl font-semibold text-lg-red">
          RM {from}
          <span className="text-sm font-medium text-lg-muted"> /month</span>
        </p>
      ) : (
        <p className="text-lg font-semibold text-gray-400">Price to be confirmed</p>
      )}
      <button
        type="button"
        onClick={() => onSelect(product.id)}
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
  const visible = active === ALL ? sections : sections.filter((entry) => entry.group.id === active)

  const tabs = [
    { id: ALL, name: "All products", count: PRODUCTS.length },
    ...CATEGORY_GROUPS.map((group) => ({
      id: group.id,
      name: group.name,
      count: sections.find((entry) => entry.group.id === group.id)?.products.length ?? 0,
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
            Pick a category to narrow things down. Switch colour on the product page to change the photo. Prices still
            being confirmed show as TBC.
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

        {visible.map(({ group, products }) => (
          <div key={group.id} id={`group-${group.id}`} className="scroll-mt-40 mt-12">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 border-b border-lg-line pb-3">
              <h3 className="text-xl font-semibold">{group.name}</h3>
              <p className="text-sm text-lg-muted">{group.blurb}</p>
            </div>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} onSelect={onSelect} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
