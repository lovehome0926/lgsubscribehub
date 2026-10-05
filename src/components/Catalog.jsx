import { useState } from "react"
import { Armchair, ChevronDown, Droplets, Refrigerator, Shirt, Snowflake, Tv, UtensilsCrossed, WashingMachine, Wind } from "lucide-react"
import {
  CATEGORY_GROUPS,
  allListings,
  dealForListing,
  giftForProduct,
  groupedCatalog,
  livePromoTabs,
  promoCopy,
  promoForProduct,
  promoKind,
  promoTheme,
} from "../data/catalog"
import { campaignActive } from "../data/campaign"
import { useLang } from "../i18n/LanguageProvider"
import { productPath } from "../router"
import PromoBadge from "./PromoBadge"

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

function choosableColors(colors) {
  return colors.filter((color) => color.name && color.name !== "Default")
}

function ProductCard({ listing }) {
  const { t } = useLang()
  const { product, specs, colors, title } = listing
  const [colorId, setColorId] = useState(colors[0].id)
  const [specId, setSpecId] = useState(specs[0].id)
  const color = colors.find((item) => item.id === colorId) ?? colors[0]
  const spec = specs.find((item) => item.id === specId) ?? specs[0]
  const variant = color.variants?.[spec.id]
  const image = variant?.image || color.image
  const waitingPhoto = !image || /lg-subscribe-2025-banner/i.test(image)
  const model = variant?.model || color.model || product.model
  const promo = promoForProduct(product)
  const gift = giftForProduct(product)
  const deal = dealForListing(product, [spec])
  const theme = promoCopy(promo, t)
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
    <article className="relative flex flex-col rounded-[28px] bg-white p-5 shadow-sm ring-1 ring-lg-line">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          {promo ? (
            <PromoBadge promo={promo} size="chip" />
          ) : gift ? (
            <span className="inline-flex rounded-md bg-[#111] px-2 py-0.5 text-[11px] font-bold text-[#FFD100]">{t("pdp.giftBanner")}</span>
          ) : (
            <span className="text-[11px] font-semibold text-lg-muted">{t("catalog.subscribe")}</span>
          )}
        </div>
        <Icon className="h-4 w-4 shrink-0 text-lg-muted" />
      </div>
      <div className="flex h-44 items-center justify-center">
        {waitingPhoto ? (
          <div className="flex flex-col items-center gap-2 text-center">
            <Icon className="h-8 w-8 text-lg-muted/70" />
            <p className="text-[11px] text-lg-muted">{t("catalog.photoComing")}</p>
          </div>
        ) : (
          <img src={image} alt={title} className="max-h-40 object-contain" />
        )}
      </div>
      {showColors ? (
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5" role="group" aria-label={t("catalog.colours")}>
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
      <p className="mt-1 text-xs text-lg-muted">{product.combo ? product.comboModels?.join(" + ") : model}</p>
      <p className="mt-4 text-xs text-lg-muted">{t("catalog.subscription")}</p>
      {deal.now != null ? (
        <div>
          <p className={`text-2xl font-semibold ${theme?.price || "text-lg-red"}`}>
            RM {deal.now}
            <span className="text-sm font-medium text-lg-muted"> {t("catalog.perMonth")}</span>
          </p>
          {deal.list != null && deal.list !== deal.now ? (
            <p className="mt-1 text-[11px] font-medium text-lg-muted">
              <span className="line-through">RM {deal.list}</span>
              {deal.introMonths ? t("catalog.firstMonths", { n: deal.introMonths }) : theme?.line ? ` · ${theme.line.toLowerCase()}` : ""}
            </p>
          ) : null}
        </div>
      ) : (
        <p className="text-lg font-semibold text-gray-400">{t("catalog.tbc")}</p>
      )}
      <a
        href={productPath(product.id, spec.id, color.id)}
        className="mt-4 rounded-full bg-lg-red py-2.5 text-center text-sm font-semibold text-white hover:bg-lg-red-dark"
      >
        {t("catalog.cta")}
      </a>
    </article>
  )
}

export default function Catalog({ groupId = null, onGroup }) {
  const { t } = useLang()
  const active = groupId || ALL
  const [deal, setDeal] = useState("all")
  const [openPanel, setOpenPanel] = useState(null)

  const sections = groupedCatalog()
  const listings = allListings()
  const live = campaignActive()
  const dealTabs = livePromoTabs()
  const visible = (active === ALL ? sections : sections.filter((entry) => entry.group.id === active))
    .map((entry) => ({
      ...entry,
      listings: deal === "all" ? entry.listings : entry.listings.filter((item) => promoKind(promoForProduct(item.product)) === deal),
    }))
    .filter((entry) => entry.listings.length > 0)

  const tabs = [
    { id: ALL, name: t("catalog.all"), count: listings.length },
    ...CATEGORY_GROUPS.map((group) => ({
      id: group.id,
      name: t(`groups.${group.id}.name`),
      count: sections.find((entry) => entry.group.id === group.id)?.listings.length ?? 0,
    })).filter((tab) => tab.count > 0),
  ]

  return (
    <section id="shop" className="scroll-mt-28 bg-lg-cream py-10 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-lg-red">{t("catalog.eyebrow")}</p>
            <h2 className="mt-2 text-3xl font-semibold">{t("catalog.title")}</h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-lg-muted">{t("catalog.lead")}</p>
        </div>

        {live ? (
          <div className="mt-8 overflow-hidden rounded-[22px] bg-[#111] text-white shadow-[0_16px_40px_rgba(17,17,17,0.28)] ring-2 ring-[#E10600]">
            <div className="bg-[#E10600] px-5 py-3 sm:px-6">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-white/80">{t("campaign.tag")}</p>
              <p className="mt-1 text-lg font-black leading-snug text-[#FFD100] sm:text-xl">{t("campaign.banner")}</p>
            </div>
            <div className="px-5 py-4 sm:px-6">
              <div className="rounded-2xl bg-white/5 px-4 py-3 ring-1 ring-white/10">
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#FFD100]">{t("campaign.gift2")}</p>
                <p className="mt-1 text-sm font-black">{t("campaign.gift2Prize")}</p>
              </div>
              <a href="/promotions/" className="mt-3 block rounded-2xl bg-white/5 px-4 py-3 ring-1 ring-white/10 hover:bg-white/10">
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#FFD100]">{t("promotions.combo.kicker")}</p>
                <p className="mt-1 text-sm font-black">{t("campaign.airCombo")}</p>
                <p className="mt-1 text-xs font-semibold text-[#FFD100]">{t("campaign.airComboCta")}</p>
              </a>
            </div>
            <p className="border-t border-white/10 px-5 py-3 text-xs leading-5 text-white/70 sm:px-6">
              <span className="font-bold text-white">{t("campaign.giftTitle")}. </span>
              {t("campaign.giftLead")}
            </p>
          </div>
        ) : null}

        <div className="mt-6 grid grid-cols-2 gap-2 md:hidden">
          <button
            type="button"
            onClick={() => setOpenPanel(openPanel === "cat" ? null : "cat")}
            className="flex items-center justify-between rounded-2xl bg-white px-3 py-3 text-left ring-1 ring-lg-line"
          >
            <span>
              <span className="block text-[10px] font-bold uppercase tracking-[0.14em] text-lg-muted">{t("catalog.filterCategory")}</span>
              <span className="mt-0.5 block text-sm font-semibold">{tabs.find((tab) => tab.id === active)?.name}</span>
            </span>
            <ChevronDown className={`h-4 w-4 shrink-0 ${openPanel === "cat" ? "rotate-180" : ""}`} />
          </button>
          {dealTabs.length ? (
            <button
              type="button"
              onClick={() => setOpenPanel(openPanel === "offers" ? null : "offers")}
              className="flex items-center justify-between rounded-2xl bg-white px-3 py-3 text-left ring-1 ring-lg-line"
            >
              <span>
                <span className="block text-[10px] font-bold uppercase tracking-[0.14em] text-lg-muted">{t("catalog.filterOffers")}</span>
                <span className="mt-0.5 block text-sm font-semibold">
                  {deal === "all" ? t("catalog.allDeals") : t(`promo.tabs.${deal}`)}
                </span>
              </span>
              <ChevronDown className={`h-4 w-4 shrink-0 ${openPanel === "offers" ? "rotate-180" : ""}`} />
            </button>
          ) : null}
        </div>

        <div className={`${openPanel === "cat" ? "mt-3 flex" : "hidden"} flex-wrap gap-2 md:mt-8 md:flex`} role="tablist" aria-label={t("catalog.categories")}>
          {tabs.map((tab) => {
            const selected = tab.id === active
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => {
                  setOpenPanel(null)
                  onGroup?.(tab.id === ALL ? null : tab.id)
                }}
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

        {dealTabs.length ? (
          <div className={`${openPanel === "offers" ? "mt-3 flex" : "hidden"} flex-wrap items-center gap-2 md:mt-4 md:flex`} role="tablist" aria-label={t("catalog.offers")}>
            <span className="mr-1 hidden text-[11px] font-bold uppercase tracking-[0.16em] text-lg-muted md:inline">{t("catalog.offersLabel")}</span>
            <button
              type="button"
              role="tab"
              aria-selected={deal === "all"}
              onClick={() => {
                setDeal("all")
                setOpenPanel(null)
              }}
              className={`rounded-full px-3.5 py-1.5 text-sm font-semibold ${
                deal === "all" ? "bg-lg-ink text-white" : "bg-white text-lg-ink ring-1 ring-lg-line"
              }`}
            >
              {t("catalog.allDeals")}
            </button>
            {dealTabs.map((tab) => {
              const selected = deal === tab.id
              const sample = listings.find((item) => promoKind(promoForProduct(item.product)) === tab.id)
              const theme = promoTheme(promoForProduct(sample?.product))
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => {
                    setDeal(tab.id)
                    setOpenPanel(null)
                  }}
                  className={`rounded-full px-3.5 py-1.5 text-sm font-black tracking-wide ring-1 ${
                    selected ? theme?.tab || "bg-lg-red text-white" : "bg-white text-lg-ink ring-lg-line"
                  }`}
                >
                  {t(`promo.tabs.${tab.id}`)}
                  <span className={`ml-2 text-xs font-semibold ${selected ? "opacity-80" : "text-lg-muted"}`}>{tab.count}</span>
                </button>
              )
            })}
          </div>
        ) : null}

        {visible.map(({ group, listings: cards }) => (
          <div key={group.id} id={`group-${group.id}`} className="scroll-mt-28 mt-12">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 border-b border-lg-line pb-3">
              <h3 className="text-xl font-semibold">{t(`groups.${group.id}.name`)}</h3>
              <p className="text-sm text-lg-muted">{t(`groups.${group.id}.blurb`)}</p>
            </div>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {cards.map((listing) => (
                <ProductCard key={listing.id} listing={listing} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
