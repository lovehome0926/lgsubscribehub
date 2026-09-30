import { allListings, dealForListing, giftForProduct, promoForProduct, promoKind } from "../data/catalog"
import { whatsappHref } from "../config"
import { useLang } from "../i18n/LanguageProvider"

const SECTIONS = [
  { id: "water", categories: ["Water Purifiers"] },
  { id: "laundry", categories: ["Washers", "Washer Dryers", "Dryers"] },
  { id: "living", categories: ["Refrigerators", "Dishwashers", "TVs"] },
  { id: "air", categories: ["Air Conditioners", "Air Purifiers"] },
]

function isThisMonthSpecial(product) {
  const kind = promoKind(promoForProduct(product))
  return Boolean(kind) && kind !== "ohsem"
}

function tagIds(deal, product) {
  const ids = []
  if (Number(deal.introMonths) === 12) ids.push("half12")
  else ids.push("special")
  if (product.hasCare) ids.push("careship")
  if (giftForProduct(product)) ids.push("bundle")
  return ids
}

function PromoCard({ listing }) {
  const { t } = useLang()
  const { product, specs, colors, title, model } = listing
  const color = colors[0]
  const image = color?.image
  const deal = dealForListing(product, specs)
  const name = title || product.shortName || product.name
  if (deal.now == null) return null

  return (
    <article className="flex flex-col rounded-[28px] bg-white p-5 shadow-sm ring-1 ring-lg-line">
      <div className="flex flex-wrap gap-1.5">
        {tagIds(deal, product).map((id) => (
          <span key={id} className="rounded-full bg-[#111] px-2.5 py-1 text-[11px] font-bold text-[#FFD100]">
            {t(`promotions.tags.${id}`)}
          </span>
        ))}
      </div>
      <div className="flex h-40 items-center justify-center">
        {image ? (
          <img src={image} alt={name} className="max-h-36 object-contain" />
        ) : (
          <p className="text-xs text-lg-muted">{model}</p>
        )}
      </div>
      <p className="text-xs text-lg-muted">{product.category}</p>
      <h3 className="mt-1 text-[15px] font-semibold leading-6">{name}</h3>
      <p className="mt-1 text-xs text-lg-muted">{model}</p>
      <p className="mt-4 text-2xl font-semibold text-lg-red">
        RM {deal.now}
        <span className="text-sm font-medium text-lg-muted">{t("promotions.perMonth")}</span>
      </p>
      {deal.list != null && deal.list !== deal.now ? (
        <p className="mt-1 text-[11px] font-medium text-lg-muted">
          <span className="line-through">{t("promotions.was", { list: deal.list })}</span>
          {deal.introMonths ? ` · ${t("promotions.intro", { n: deal.introMonths })}` : ""}
        </p>
      ) : null}
      <a
        href={whatsappHref(t("promotions.wa", { name }))}
        target="_blank"
        rel="noreferrer"
        className="mt-4 rounded-full bg-lg-red py-2.5 text-center text-sm font-semibold text-white hover:bg-lg-red-dark"
      >
        {t("promotions.cta")}
      </a>
    </article>
  )
}

export default function Promotions() {
  const { t } = useLang()
  const listings = allListings()
  const faq = t("promotions.faq")

  return (
    <main className="bg-lg-cream pb-16">
      <section className="bg-[#111] text-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#FFD100]">{t("promotions.eyebrow")}</p>
          <h1 className="mt-3 max-w-3xl text-3xl font-semibold leading-tight sm:text-4xl">{t("promotions.title")}</h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/80 sm:text-base">{t("promotions.subtitle")}</p>
          <p className="mt-5 max-w-2xl rounded-2xl bg-white/10 px-4 py-3 text-sm leading-6 text-white">{t("promotions.upfront")}</p>
          <div className="mt-6 max-w-3xl rounded-[28px] bg-[#E10600] px-5 py-5 sm:px-6">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-white/80">{t("promotions.bundleEyebrow")}</p>
            <p className="mt-1 text-xl font-black leading-snug text-[#FFD100]">{t("promotions.bundleTitle")}</p>
            <p className="mt-2 text-sm leading-6 text-white">{t("promotions.bundleBody")}</p>
          </div>
        </div>
      </section>

      {SECTIONS.map((section) => {
        const cards = listings.filter(
          (item) => section.categories.includes(item.product.category) && isThisMonthSpecial(item.product),
        )
        if (!cards.length) return null
        return (
          <section key={section.id} className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
            <h2 className="text-2xl font-semibold">{t(`promotions.sections.${section.id}`)}</h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {cards.map((listing) => (
                <PromoCard key={listing.id} listing={listing} />
              ))}
            </div>
          </section>
        )
      })}

      <section className="mx-auto max-w-3xl px-4 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-lg-red">{t("promotions.faqEyebrow")}</p>
        <h2 className="mt-2 text-2xl font-semibold">{t("promotions.faqTitle")}</h2>
        <div className="mt-6 divide-y divide-lg-line rounded-[28px] bg-white px-5">
          {Array.isArray(faq)
            ? faq.map((item) => (
                <div key={item.q} className="py-5">
                  <h3 className="font-semibold">{item.q}</h3>
                  <p className="mt-2 text-sm leading-7 text-lg-muted">{item.a}</p>
                </div>
              ))
            : null}
        </div>
      </section>
    </main>
  )
}
