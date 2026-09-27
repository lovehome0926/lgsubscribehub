import { IMG } from "../data/catalog"

export default function Hero() {
  return (
    <section id="top" className="bg-black">
      <div className="relative min-h-[420px] overflow-hidden lg:min-h-[540px]">
        <img src={IMG.heroOnline} alt="LG Subscribe now available online" className="h-full w-full object-cover opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent" />
        <div className="absolute inset-0 mx-auto flex max-w-7xl flex-col justify-center px-4 sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/70">LG Subscribe™ · Malaysia</p>
          <h1 className="mt-3 max-w-xl text-4xl font-semibold leading-tight text-white sm:text-5xl">
            Latest LG home appliances. Flexible monthly plans.
          </h1>
          <p className="mt-4 max-w-lg text-sm leading-7 text-white/80 sm:text-base">
            Enjoy PuriCare™, DualCool™ and OLED without a large upfront outlay. Choose Self-Service, Combined Maintenance or Regular Visit to match your household.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#shop" className="rounded-full bg-lg-red px-6 py-3 text-sm font-semibold text-white hover:bg-lg-red-dark">
              Subscribe Now
            </a>
            <a href="#shop" className="rounded-full border border-white/50 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10">
              Shop products
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
