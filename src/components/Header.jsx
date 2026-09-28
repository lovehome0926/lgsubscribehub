import { ChevronDown, MessageCircle, Phone } from "lucide-react"
import { CAMPAIGN, campaignActive } from "../data/campaign"
import { CATEGORY_GROUPS, LOGO, SUB_LOGO } from "../data/catalog"
import { CAREER, COMPANY, whatsappHref } from "../config"
import { LANGS, useLang } from "../i18n/LanguageProvider"

function LangSwitch() {
  const { lang, setLang } = useLang()
  return (
    <div className="inline-flex items-center text-xs font-semibold">
      {LANGS.map((item, index) => (
        <span key={item.id} className="inline-flex items-center">
          {index > 0 ? <span className="mx-1 text-lg-muted">|</span> : null}
          <button
            type="button"
            onClick={() => setLang(item.id)}
            className={lang === item.id ? "text-lg-red" : "text-lg-muted hover:text-lg-ink"}
          >
            {item.label}
          </button>
        </span>
      ))}
    </div>
  )
}

export default function Header({ onHome }) {
  const live = campaignActive()
  const { t } = useLang()
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-lg-line">
      <div className="bg-[#111] px-3 py-1 text-center text-[10px] leading-4 text-white/90 sm:text-[11px]">
        {t("notice")}
      </div>
      <div className="bg-lg-red px-3 py-1.5 text-center text-[11px] font-semibold tracking-wide text-white">
        {live ? (
          <>
            <span className="mr-2">{CAMPAIGN.banner}</span>
            <span className="ml-1 inline-flex rounded-full bg-white/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide">
              {CAMPAIGN.tag}
            </span>
          </>
        ) : (
          t("nav.idleBanner", { phone: COMPANY.phoneDisplay })
        )}
      </div>
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6">
        <button type="button" onClick={onHome} className="flex items-center gap-3">
          <img src={LOGO} alt="LG" className="h-7" />
          <span className="hidden h-5 w-px bg-lg-line sm:block" />
          <img src={SUB_LOGO} alt="LG Subscribe" className="hidden h-6 sm:block" />
        </button>
        <nav className="hidden items-center gap-5 text-sm font-medium text-lg-ink lg:flex">
          <div className="group relative">
            <a href="#shop" className="inline-flex items-center gap-1 hover:text-lg-red">
              {t("nav.shop")}
              <ChevronDown className="h-3.5 w-3.5 transition group-hover:rotate-180" />
            </a>
            <div className="invisible absolute left-1/2 top-full z-50 w-72 -translate-x-1/2 pt-3 opacity-0 transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
              <div className="rounded-2xl bg-white p-2 shadow-xl ring-1 ring-lg-line">
                {CATEGORY_GROUPS.map((group) => (
                  <a
                    key={group.id}
                    href={`#group-${group.id}`}
                    className="block rounded-xl px-3 py-2 hover:bg-lg-cream"
                  >
                    <span className="block text-sm font-semibold">{t(`groups.${group.id}.name`)}</span>
                    <span className="mt-0.5 block text-xs leading-5 text-lg-muted">{t(`groups.${group.id}.blurb`)}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
          <a href="#why" className="hover:text-lg-red">{t("nav.why")}</a>
          <a href="#care" className="hover:text-lg-red">{t("nav.care")}</a>
          <a href="#stores" className="hover:text-lg-red">{t("nav.stores")}</a>
          <a href="#reviews" className="hover:text-lg-red">{t("nav.reviews")}</a>
          <a
            href={CAREER.href}
            className="inline-flex items-center rounded-full border border-lg-red px-3 py-1 text-sm font-semibold text-lg-red hover:bg-lg-red hover:text-white"
          >
            {t("nav.career")}
          </a>
        </nav>
        <div className="flex items-center gap-2">
          <LangSwitch />
          <a href={`tel:${COMPANY.phoneTel}`} className="hidden items-center gap-1 text-xs text-lg-muted xl:flex">
            <Phone className="h-3.5 w-3.5" />
            {COMPANY.advisor} {COMPANY.phoneDisplay}
          </a>
          <a
            href={CAREER.href}
            className="inline-flex items-center rounded-full border border-lg-line px-3 py-2 text-sm font-semibold text-lg-ink hover:border-lg-red hover:text-lg-red lg:hidden"
          >
            {t("nav.career")}
          </a>
          <a
            href={whatsappHref(t("wa.header"))}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-lg-red px-4 py-2 text-sm font-semibold text-white hover:bg-lg-red-dark"
          >
            <MessageCircle className="h-4 w-4" />
            {t("nav.enquire")}
          </a>
        </div>
      </div>
    </header>
  )
}
