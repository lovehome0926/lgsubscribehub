import { campaignActive } from "../data/campaign"
import { IMG } from "../data/catalog"
import { useLang } from "../i18n/LanguageProvider"

export default function Hero() {
  const live = campaignActive()
  const { t } = useLang()
  return (
    <section id="top" className="bg-black">
      <div className="relative min-h-[280px] overflow-hidden sm:min-h-[380px] lg:min-h-[540px]">
        <img src={IMG.heroOnline} alt="LG Subscribe now available online" className="absolute inset-0 h-full w-full object-cover opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent" />
        <div className="relative z-10 mx-auto flex min-h-[280px] max-w-7xl flex-col justify-center px-4 py-8 sm:min-h-[380px] sm:px-6 lg:min-h-[540px]">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/70 sm:text-xs">
            {live ? t("campaign.name") : t("hero.kicker")}
          </p>
          <h1 className="mt-2 max-w-xl text-2xl font-semibold leading-tight text-white sm:mt-3 sm:text-4xl lg:text-5xl">
            {live ? t("hero.promoTitle") : t("hero.title")}
          </h1>
          <p className="mt-3 max-w-lg text-sm leading-6 text-white/80 sm:mt-4 sm:text-base sm:leading-7">
            {live ? t("hero.promoCopy") : t("hero.copy")}
          </p>
          <div className="mt-5 flex flex-wrap gap-3 sm:mt-8">
            <a href="/#shop" className="rounded-full bg-lg-red px-5 py-2.5 text-sm font-semibold text-white hover:bg-lg-red-dark sm:px-6 sm:py-3">
              {t("hero.cta")}
            </a>
            <a href="/#shop" className="rounded-full bg-[#FFB800] px-5 py-2.5 text-sm font-black tracking-wide text-[#111] hover:bg-[#F0A500] sm:px-6 sm:py-3">
              {live ? t("hero.promoBadge") : t("hero.idleBadge")}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
