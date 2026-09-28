import { Briefcase, MapPin, ShieldCheck, ShoppingBag, Star } from "lucide-react"
import { useLang } from "../i18n/LanguageProvider"

const DOORS = [
  { href: "#shop", key: "shop", Icon: ShoppingBag },
  { href: "#stores", key: "stores", Icon: MapPin },
  { href: "#reviews", key: "reviews", Icon: Star },
  { href: "#care", key: "care", Icon: ShieldCheck },
]

export default function HomeChooser() {
  const { t } = useLang()
  return (
    <section className="bg-lg-cream py-6 sm:py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-lg-red">{t("chooser.eyebrow")}</p>
        <h2 className="mt-2 text-xl font-semibold sm:text-2xl">{t("chooser.title")}</h2>
        <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {DOORS.map(({ href, key, Icon }) => (
            <a
              key={key}
              href={href}
              className="rounded-[22px] bg-white p-4 ring-1 ring-lg-line hover:ring-lg-red"
            >
              <Icon className="h-5 w-5 text-lg-red" />
              <p className="mt-3 text-sm font-semibold">{t(`chooser.${key}.name`)}</p>
              <p className="mt-1 text-xs leading-5 text-lg-muted">{t(`chooser.${key}.blurb`)}</p>
            </a>
          ))}
        </div>
        <a
          href="#career"
          className="mt-3 flex items-center gap-4 rounded-[22px] bg-white p-4 pr-16 ring-1 ring-lg-red hover:bg-[#fff5f7] sm:pr-4"
        >
          <Briefcase className="h-5 w-5 shrink-0 text-lg-red" />
          <span>
            <span className="block text-sm font-semibold text-lg-red">{t("chooser.career.name")}</span>
            <span className="mt-1 block text-xs leading-5 text-lg-muted">{t("chooser.career.blurb")}</span>
          </span>
        </a>
      </div>
    </section>
  )
}
