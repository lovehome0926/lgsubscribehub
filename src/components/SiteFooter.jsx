import { ExternalLink } from "lucide-react"
import { CAREER, COMPANY } from "../config"
import { SUB_LOGO } from "../data/catalog"
import { STORES } from "../data/stores"
import { useLang } from "../i18n/LanguageProvider"

export default function SiteFooter() {
  const { t } = useLang()
  return (
    <footer className="border-t border-lg-line bg-lg-cream py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-wrap items-start justify-between gap-8">
          <div>
            <div className="flex items-center">
              <img src={SUB_LOGO} alt="LG Subscribe" className="h-8" />
            </div>
            <p className="mt-3 text-sm font-semibold text-lg-ink">{COMPANY.name}</p>
            <p className="mt-1 text-xs text-lg-muted">SSM: {COMPANY.ssm}</p>
          </div>
          <div className="grid max-w-4xl gap-6 text-xs leading-5 text-lg-muted sm:grid-cols-3">
            <p>
              <strong className="block text-lg-ink">{t("footer.contact")}</strong>
              {t("footer.whatsappCall")}{" "}
              <a href={`tel:${COMPANY.phoneTel}`} className="font-semibold text-lg-ink hover:text-lg-red">
                {COMPANY.phoneDisplay}
              </a>
              <br />
              <a href={`mailto:${COMPANY.email}`} className="hover:text-lg-red">
                {COMPANY.email}
              </a>
            </p>
            <div>
              <strong className="block text-lg-ink">{t("footer.stores")}</strong>
              <div className="mt-1 flex flex-col items-start gap-1">
                {STORES.map((store) => (
                  <a
                    key={store.id}
                    href={store.maps}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 font-medium text-lg-ink hover:text-lg-red"
                  >
                    {store.shortName}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                ))}
              </div>
              <a href="#care" className="mt-2 inline-flex font-semibold text-lg-red hover:text-lg-red-dark">
                {t("nav.care")}
              </a>
            </div>
            <p>
              <strong className="block text-lg-ink">{t("footer.career")}</strong>
              {t("footer.careerCopy")}
              <a href={CAREER.href} className="mt-2 inline-flex font-semibold text-lg-red hover:text-lg-red-dark">
                {t("footer.careerCta")}
              </a>
            </p>
          </div>
        </div>
        <div className="mt-8 rounded-2xl bg-white p-5 text-xs leading-6 text-lg-muted ring-1 ring-lg-line">
          <p className="font-semibold uppercase tracking-[0.14em] text-lg-ink">{t("footer.disclaimer")}</p>
          <p className="mt-2">{t("footer.legal")}</p>
        </div>
        <p className="mt-6 text-xs text-lg-muted">
          © {new Date().getFullYear()} {COMPANY.name}. {t("footer.copyright")}
        </p>
      </div>
    </footer>
  )
}
