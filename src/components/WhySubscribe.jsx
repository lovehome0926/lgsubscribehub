import { Gift, RefreshCcw, Wallet } from "lucide-react"
import { IMG } from "../data/catalog"

export default function WhySubscribe() {
  return (
    <section id="why" className="scroll-mt-24 bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-lg-red">What is LG Subscribe?</p>
        <h2 className="mt-2 max-w-3xl text-3xl font-semibold sm:text-4xl">
          Enjoy LG’s latest products without an ownership commitment
        </h2>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-lg-muted sm:text-base">
          LG Subscribe™ is a flexible rental solution for Malaysian households. Choose the appliance that fits your space and budget, pay a clear monthly fee, and keep CareShip™ hygiene and filter support on a schedule you can live with.
        </p>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            { icon: Wallet, title: "No large upfront cost", copy: "Start with a monthly plan instead of a full buyout. Ideal for condos, first homes and family upgrades." },
            { icon: RefreshCcw, title: "Always current technology", copy: "Use PuriCare™, DualCool™ AI and OLED evo now — upgrade or complete your contract as terms allow." },
            { icon: Gift, title: "Care built into the plan", copy: "Self-Service, Combined Maintenance or Regular Visit. Filters and technician visits follow official CareShip™ cycles." },
          ].map((item) => (
            <article key={item.title} className="rounded-[24px] bg-lg-cream p-6">
              <item.icon className="h-6 w-6 text-lg-red" />
              <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-lg-muted">{item.copy}</p>
            </article>
          ))}
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[IMG.cardFamily, IMG.cardHome, IMG.selfCare].map((src) => (
            <img key={src} src={src} alt="" className="h-44 w-full rounded-[20px] object-cover" />
          ))}
        </div>
      </div>
    </section>
  )
}
