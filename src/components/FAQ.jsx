import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { useLang } from "../i18n/LanguageProvider"

export default function Faq() {
  const { t } = useLang()
  const faqs = t("faq.items")
  const [open, setOpen] = useState(0)
  return (
    <section id="faq" className="scroll-mt-24 bg-lg-cream py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-lg-red">{t("faq.eyebrow")}</p>
        <h2 className="mt-2 text-center text-3xl font-semibold">{t("faq.title")}</h2>
        <div className="mt-8 divide-y divide-lg-line rounded-[28px] bg-white">
          {faqs.map((item, index) => {
            const active = open === index
            return (
              <div key={item.q} className="px-5">
                <button type="button" className="flex w-full items-center justify-between gap-4 py-5 text-left" onClick={() => setOpen(active ? -1 : index)}>
                  <span className="font-semibold">{item.q}</span>
                  <ChevronDown className={`h-4 w-4 text-lg-red ${active ? "rotate-180" : ""}`} />
                </button>
                {active ? (
                  <p className="pb-5 text-sm leading-7 text-lg-muted">
                    {item.a}
                    {item.career ? (
                      <>
                        {" "}
                        <a href="/career" className="font-semibold text-lg-red hover:text-lg-red-dark">
                          {t("faq.openCareer")}
                        </a>
                      </>
                    ) : null}
                    {item.careship ? (
                      <>
                        {" "}
                        <a href="/care" className="font-semibold text-lg-red hover:text-lg-red-dark">
                          {t("nav.care")}
                        </a>
                      </>
                    ) : null}
                  </p>
                ) : null}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
