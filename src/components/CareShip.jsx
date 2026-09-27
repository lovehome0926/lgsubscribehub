import { CalendarClock, Package, Wrench } from "lucide-react"
import { IMG } from "../data/catalog"

export default function CareShip() {
  return (
    <section id="care" className="scroll-mt-24 bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-lg-red">CareShip™</p>
        <h2 className="mt-2 text-3xl font-semibold">Keep PuriCare™ performing like day one</h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-lg-muted">
          CareShip™ is LG’s scheduled maintenance programme for subscribed water and air purifiers in Malaysia. Choose how hands-on you want to be — we still use genuine LG filters and authorised technicians.
        </p>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {[
            { icon: Package, name: "Self-Service", cadence: "Filter delivery every 6 months", copy: "A new filter kit is shipped to your address. Follow in-product guidance (or ThinQ™) to replace and reset." },
            { icon: CalendarClock, name: "Combined Maintenance", cadence: "Delivery + 1 visit / year", copy: "You handle one filter change; an LG-authorised technician completes hygiene care on a 12-month cycle." },
            { icon: Wrench, name: "Regular Visit", cadence: "Technician visit every 6 months", copy: "Full CareShip™ visit: inspection, sterilisation where applicable, genuine filter replacement." },
          ].map((item) => (
            <article key={item.name} className="rounded-[24px] bg-lg-cream p-6">
              <item.icon className="h-6 w-6 text-lg-red" />
              <h3 className="mt-4 text-lg font-semibold">{item.name}</h3>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-lg-red">{item.cadence}</p>
              <p className="mt-3 text-sm leading-6 text-lg-muted">{item.copy}</p>
            </article>
          ))}
        </div>
        <div className="mt-8 overflow-hidden rounded-[24px]">
          <video className="h-64 w-full object-cover md:h-80" autoPlay muted loop playsInline poster={IMG.hygienePoster}>
            <source src={IMG.hygiene} type="video/mp4" />
          </video>
        </div>
        <p className="mt-3 text-xs text-lg-muted">TVs are excluded from CareShip™ visit packages and remain on standard product warranty.</p>
      </div>
    </section>
  )
}
