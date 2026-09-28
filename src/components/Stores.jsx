import { MapPin, Navigation } from "lucide-react"
import { COMPANY } from "../config"
import { STORES } from "../data/stores"
import { useLang } from "../i18n/LanguageProvider"
import WatermarkedPhoto from "./WatermarkedPhoto"

export default function Stores() {
  const { t } = useLang()
  return (
    <section id="stores" className="scroll-mt-40 bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-lg-red">{t("stores.eyebrow")}</p>
        <h2 className="mt-2 text-3xl font-semibold">{t("stores.title")}</h2>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-lg-muted">
          {t("stores.lead", { advisor: COMPANY.advisor })}{" "}
          <a href={`tel:${COMPANY.phoneTel}`} className="font-semibold text-lg-ink hover:text-lg-red">
            {COMPANY.phoneDisplay}
          </a>
          .
        </p>
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {STORES.map((store) => (
            <article key={store.id} className="overflow-hidden rounded-[28px] bg-lg-cream">
              <a href={store.maps} target="_blank" rel="noreferrer" className="block">
                <WatermarkedPhoto src={store.photo} alt={store.photoAlt} imgClassName="h-64 w-full object-cover" />
              </a>
              <div className="p-6">
                <a href={store.maps} target="_blank" rel="noreferrer" className="hover:text-lg-red">
                  <h3 className="text-xl font-semibold">{store.name}</h3>
                </a>
                <a
                  href={store.maps}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 flex items-start gap-2 text-sm leading-6 text-lg-muted hover:text-lg-red"
                >
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-lg-red" />
                  {store.address}
                </a>
                <p className="mt-2 text-sm leading-6 text-lg-muted">{store.hours}</p>
                <a
                  href={store.maps}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex items-center gap-2 rounded-full bg-lg-red px-4 py-2 text-sm font-semibold text-white hover:bg-lg-red-dark"
                >
                  <Navigation className="h-4 w-4" />
                  {t("stores.maps")}
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
