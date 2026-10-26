import { useLang } from "../i18n/LanguageProvider"

export default function CategoryIntro({ groupId }) {
  const { t } = useLang()
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
        <h1 className="max-w-3xl text-3xl font-semibold leading-tight text-lg-ink sm:text-4xl">
          {t(`shopPages.${groupId}.heading`)}
        </h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-lg-muted sm:text-base">{t(`shopPages.${groupId}.intro`)}</p>
      </div>
    </section>
  )
}
