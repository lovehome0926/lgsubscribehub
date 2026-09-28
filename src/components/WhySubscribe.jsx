import { Gift, RefreshCcw, Wallet } from "lucide-react"
import { IMG } from "../data/catalog"
import { useLang } from "../i18n/LanguageProvider"

const ICONS = [Wallet, RefreshCcw, Gift]

export default function WhySubscribe() {
  const { t } = useLang()
  const items = t("why.items")
  return (
    <section id="why" className="scroll-mt-24 bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-lg-red">{t("why.eyebrow")}</p>
        <h2 className="mt-2 max-w-3xl text-3xl font-semibold sm:text-4xl">{t("why.title")}</h2>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-lg-muted sm:text-base">{t("why.lead")}</p>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {items.map((item, index) => {
            const Icon = ICONS[index]
            return (
              <article key={item.title} className="rounded-[24px] bg-lg-cream p-6">
                <Icon className="h-6 w-6 text-lg-red" />
                <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-lg-muted">{item.copy}</p>
              </article>
            )
          })}
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[IMG.cardFamily, IMG.cardHome, IMG.selfCare].map((src) => (
            <img key={src} src={src} alt="" className="h-44 w-full rounded-[20px] object-cover" />
          ))}
        </div>
      </div>
    </section>
  )
}
