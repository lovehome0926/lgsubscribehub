import { Headset, MapPin, ShieldCheck, Star } from "lucide-react"
import { IMG } from "../data/catalog"

export default function Stories() {
  return (
    <section id="support" className="scroll-mt-24 bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-lg-red">Become an LG member</p>
            <h2 className="mt-2 text-3xl font-semibold">Welcome voucher, exclusive pricing, free delivery on eligible orders</h2>
            <p className="mt-3 text-sm leading-7 text-lg-muted">
              LG.com membership benefits may apply on eligible outright purchases. Subscribe plans remain subject to LG Subscribe contract terms. Sign in or join with your Malaysian mobile number.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {[
                { icon: ShieldCheck, title: "Welcome voucher", copy: "For new LG.com members" },
                { icon: Star, title: "Exclusive pricing", copy: "Member-only offers when available" },
                { icon: Headset, title: "Priority support", copy: "1800-18-7874 · WhatsApp advisor" },
              ].map((item) => (
                <article key={item.title} className="rounded-2xl bg-lg-cream p-4">
                  <item.icon className="h-5 w-5 text-lg-red" />
                  <h3 className="mt-3 font-semibold">{item.title}</h3>
                  <p className="mt-1 text-xs text-lg-muted">{item.copy}</p>
                </article>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-lg-red">Customer stories</p>
            <h2 className="mt-2 text-3xl font-semibold">Installations across Malaysia</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                { src: IMG.cardFamily, caption: "Bangsar — living room (placeholder)" },
                { src: IMG.cardHome, caption: "Penang — kitchen (placeholder)" },
                { src: IMG.cardAir, caption: "Johor Bahru — bedroom (placeholder)" },
                { src: IMG.waterLifestyle, caption: "Petaling Jaya — water point (placeholder)" },
              ].map((item) => (
                <figure key={item.caption} className="overflow-hidden rounded-2xl bg-lg-cream">
                  <img src={item.src} alt="" className="h-32 w-full object-cover" />
                  <figcaption className="flex items-center gap-1 px-3 py-2 text-[11px] text-lg-muted">
                    <MapPin className="h-3 w-3" />
                    {item.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
