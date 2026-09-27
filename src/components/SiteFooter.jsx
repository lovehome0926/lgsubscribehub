import { LOGO, SUB_LOGO } from "../data/catalog"

export default function SiteFooter() {
  return (
    <footer className="border-t border-lg-line bg-lg-cream py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-wrap items-start justify-between gap-8">
          <div className="flex items-center gap-3">
            <img src={LOGO} alt="LG" className="h-7" />
            <img src={SUB_LOGO} alt="LG Subscribe" className="h-6" />
          </div>
          <div className="grid max-w-3xl gap-6 text-xs leading-5 text-lg-muted sm:grid-cols-3">
            <p>
              <strong className="block text-lg-ink">Shop</strong>
              Water Purifiers · Air Purifiers · Air Conditioners · TVs
            </p>
            <p>
              <strong className="block text-lg-ink">Support</strong>
              Hotline 1800-18-7874 · Product registration · Repair request
            </p>
            <p>
              <strong className="block text-lg-ink">Legal</strong>
              Subscription fees, periods and CareShip™ content vary by product and contract. This portal is a 2C campaign experience and is not the LG Electronics corporate site.
            </p>
          </div>
        </div>
        <p className="mt-8 text-xs text-lg-muted">© {new Date().getFullYear()} LG Subscribe Malaysia. Images courtesy of LG official CDN.</p>
      </div>
    </footer>
  )
}
