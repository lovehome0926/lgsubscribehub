import { useState } from "react"
import { ChevronDown } from "lucide-react"

const FAQS = [
  {
    q: "Is LG Subscribe a rental or a purchase?",
    a: "During the contract, ownership remains with LG. You pay a monthly Subscribe fee for use of the appliance and the CareShip™ package you selected. Options at the end of the contract follow the official LG Subscribe terms for that product.",
  },
  {
    q: "Do Malaysian home customers need a large deposit?",
    a: "Standard 2C Subscribe applications typically do not require a large deposit. Approval depends on LG’s assessment. A site survey may be needed for water purifiers (water pressure) and air conditioners (piping).",
  },
  {
    q: "Which areas can be installed?",
    a: "Installation is arranged after approval, with coverage focused on major cities in Peninsular Malaysia (including Klang Valley, Penang and Johor Bahru). Remote locations may require additional lead time or charges.",
  },
  {
    q: "Can I end the contract early?",
    a: "Early termination may incur fees based on remaining tenure and product type. Ask an advisor to calculate this against your model before you sign.",
  },
  {
    q: "Why don’t TVs have Regular Visit?",
    a: "Display products are sold/subscribed with standard manufacturer warranty only. CareShip™ hygiene and filter programmes apply to PuriCare™ water and air purifiers (and selected HA), not to TVs.",
  },
]

export default function Faq() {
  const [open, setOpen] = useState(0)
  return (
    <section id="faq" className="scroll-mt-24 bg-lg-cream py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-lg-red">Need help?</p>
        <h2 className="mt-2 text-center text-3xl font-semibold">Frequently asked questions</h2>
        <div className="mt-8 divide-y divide-lg-line rounded-[28px] bg-white">
          {FAQS.map((item, index) => {
            const active = open === index
            return (
              <div key={item.q} className="px-5">
                <button type="button" className="flex w-full items-center justify-between gap-4 py-5 text-left" onClick={() => setOpen(active ? -1 : index)}>
                  <span className="font-semibold">{item.q}</span>
                  <ChevronDown className={`h-4 w-4 text-lg-red ${active ? "rotate-180" : ""}`} />
                </button>
                {active ? <p className="pb-5 text-sm leading-7 text-lg-muted">{item.a}</p> : null}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
