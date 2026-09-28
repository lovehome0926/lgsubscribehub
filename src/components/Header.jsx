import { useEffect, useState } from "react"
import { ChevronDown, Menu, MessageCircle, Phone, X } from "lucide-react"
import { CAMPAIGN, campaignActive } from "../data/campaign"
import { CATEGORY_GROUPS, LOGO, SUB_LOGO } from "../data/catalog"
import { CAREER, COMPANY, whatsappHref } from "../config"
import { LANGS, useLang } from "../i18n/LanguageProvider"

function LangSwitch({ onPick, tone = "default" }) {
  const { lang, setLang } = useLang()
  const onRed = tone === "onRed"
  return (
    <div className={`inline-flex shrink-0 items-center font-semibold ${onRed ? "text-[11px]" : "text-xs"}`}>
      {LANGS.map((item, index) => (
        <span key={item.id} className="inline-flex items-center">
          {index > 0 ? <span className={`mx-1 ${onRed ? "text-white/40" : "text-lg-muted"}`}>|</span> : null}
          <button
            type="button"
            onClick={() => {
              setLang(item.id)
              onPick?.()
            }}
            className={
              lang === item.id
                ? onRed
                  ? "text-white"
                  : "text-lg-red"
                : onRed
                  ? "text-white/70 hover:text-white"
                  : "text-lg-muted hover:text-lg-ink"
            }
          >
            {item.label}
          </button>
        </span>
      ))}
    </div>
  )
}

const LINKS = [
  { href: "#shop", key: "shop" },
  { href: "#why", key: "why" },
  { href: "#care", key: "care" },
  { href: "#stores", key: "stores" },
  { href: "#reviews", key: "reviews" },
]

export default function Header({ onHome }) {
  const live = campaignActive()
  const { t } = useLang()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const close = () => setOpen(false)
    window.addEventListener("hashchange", close)
    return () => window.removeEventListener("hashchange", close)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  const promo = live ? CAMPAIGN.banner : t("nav.idleBanner", { phone: COMPANY.phoneDisplay })

  return (
    <>
    <header className="sticky top-0 z-[60] bg-white/95 backdrop-blur border-b border-lg-line">
      <div className="hidden bg-[#111] px-3 py-1 text-center text-[10px] leading-4 text-white/90 lg:block sm:text-[11px]">
        {t("notice")}
      </div>
      <div className="bg-lg-red px-3 py-1 text-[11px] font-semibold tracking-wide text-white">
        <div className="flex items-center gap-2 lg:block lg:text-center">
          <div className="lg:hidden">
            <LangSwitch tone="onRed" />
          </div>
          <span className="min-w-0 flex-1 truncate lg:block">{promo}</span>
        </div>
      </div>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:h-[72px]">
        <button type="button" onClick={onHome} className="flex min-w-0 items-center gap-2 sm:gap-3">
          <img src={LOGO} alt="LG" className="h-7 shrink-0" />
          <span className="h-5 w-px shrink-0 bg-lg-line" />
          <img src={SUB_LOGO} alt="LG Subscribe" className="h-6 shrink-0" />
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
        <div className="flex shrink-0 items-center gap-2">
          <div className="hidden lg:block">
            <LangSwitch />
          </div>
          <a href={`tel:${COMPANY.phoneTel}`} className="hidden items-center gap-1 text-xs text-lg-muted xl:flex">
            <Phone className="h-3.5 w-3.5" />
            {COMPANY.advisor} {COMPANY.phoneDisplay}
          </a>
          <a
            href={whatsappHref(t("wa.header"))}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-lg-red px-3 py-2 text-sm font-semibold text-white hover:bg-lg-red-dark sm:gap-2 sm:px-4"
          >
            <MessageCircle className="h-4 w-4" />
            {t("nav.enquire")}
          </a>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full ring-1 ring-lg-line lg:hidden"
            aria-label={open ? t("nav.close") : t("nav.menu")}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
    </header>
      {open ? (
        <div className="fixed inset-x-0 bottom-0 top-[88px] z-[55] overflow-y-auto bg-white lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-5">
            <div className="mb-3 px-1">
              <LangSwitch onPick={() => setOpen(false)} />
            </div>
            {LINKS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-2xl px-4 py-3 text-base font-semibold text-lg-ink"
              >
                {t(`nav.${item.key}`)}
              </a>
            ))}
            <a
              href={CAREER.href}
              onClick={() => setOpen(false)}
              className="mt-1 inline-flex w-fit items-center rounded-full border border-lg-red px-4 py-2 text-sm font-semibold text-lg-red"
            >
              {t("nav.career")}
            </a>
            <div className="mt-4 grid gap-2">
              {CATEGORY_GROUPS.map((group) => (
                <a
                  key={group.id}
                  href={`#group-${group.id}`}
                  onClick={() => setOpen(false)}
                  className="rounded-2xl bg-lg-cream px-4 py-3"
                >
                  <span className="block text-sm font-semibold">{t(`groups.${group.id}.name`)}</span>
                  <span className="mt-0.5 block text-xs leading-5 text-lg-muted">{t(`groups.${group.id}.blurb`)}</span>
                </a>
              ))}
            </div>
          </nav>
        </div>
      ) : null}
    </>
  )
}
