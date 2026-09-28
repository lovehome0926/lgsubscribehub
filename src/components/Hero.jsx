import { CAMPAIGN, campaignActive } from "../data/campaign"
import { IMG } from "../data/catalog"
import { useLang } from "../i18n/LanguageProvider"

export default function Hero() {
  const live = campaignActive()
  const { t } = useLang()
  return (
    <section id="top" className="bg-black">
      <div className="relative min-h-[420px] overflow-hidden lg:min-h-[540px]">
        <img src={IMG.heroOnline} alt="LG Subscribe now available online" className="h-full w-full object-cover opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent" />
        <div className="absolute inset-0 mx-auto flex max-w-7xl flex-col justify-center px-4 sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/70">
            {live ? CAMPAIGN.name : t("hero.kicker")}
          </p>
          <h1 className="mt-3 max-w-xl text-4xl font-semibold leading-tight text-white sm:text-5xl">
            {live ? t("hero.promoTitle") : t("hero.title")}
          </h1>
          <p className="mt-4 max-w-lg text-sm leading-7 text-white/80 sm:text-base">
            {live ? t("hero.promoCopy") : t("hero.copy")}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#shop" className="rounded-full bg-lg-red px-6 py-3 text-sm font-semibold text-white hover:bg-lg-red-dark">
              {t("hero.cta")}
            </a>
            <a href="#shop" className="rounded-full bg-[#FFB800] px-6 py-3 text-sm font-black tracking-wide text-[#111] hover:bg-[#F0A500]">
              {live ? t("hero.promoBadge") : t("hero.idleBadge")}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
