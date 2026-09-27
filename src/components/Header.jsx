import { ChevronDown, MessageCircle, Phone } from "lucide-react"
import { CATEGORY_GROUPS, LOGO, SUB_LOGO } from "../data/catalog"
import { whatsappHref } from "../config"

export default function Header({ onHome }) {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-lg-line">
      <div className="bg-lg-red py-1.5 text-center text-[11px] font-semibold tracking-wide text-white">
        LG Subscribe™ Malaysia · Flexible monthly plans from RM 40 · CareShip™ included · T&amp;Cs apply
      </div>
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6">
        <button type="button" onClick={onHome} className="flex items-center gap-3">
          <img src={LOGO} alt="LG" className="h-7" />
          <span className="hidden h-5 w-px bg-lg-line sm:block" />
          <img src={SUB_LOGO} alt="LG Subscribe" className="hidden h-6 sm:block" />
        </button>
        <nav className="hidden items-center gap-5 text-sm font-medium text-lg-ink md:flex">
          <div className="group relative">
            <a href="#shop" className="inline-flex items-center gap-1 hover:text-lg-red">
              Shop
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
                    <span className="block text-sm font-semibold">{group.name}</span>
                    <span className="mt-0.5 block text-xs leading-5 text-lg-muted">{group.blurb}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
          <a href="#why" className="hover:text-lg-red">Why Subscribe</a>
          <a href="#care" className="hover:text-lg-red">CareShip</a>
          <a href="#support" className="hover:text-lg-red">Support</a>
        </nav>
        <div className="flex items-center gap-2">
          <a href="tel:1800187874" className="hidden items-center gap-1 text-xs text-lg-muted md:flex">
            <Phone className="h-3.5 w-3.5" />
            1800-18-7874
          </a>
          <a
            href={whatsappHref("Hi, I would like to enquire about LG Subscribe Malaysia.")}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-lg-red px-4 py-2 text-sm font-semibold text-white hover:bg-lg-red-dark"
          >
            <MessageCircle className="h-4 w-4" />
            Enquire
          </a>
        </div>
      </div>
    </header>
  )
}
