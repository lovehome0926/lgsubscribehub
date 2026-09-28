import { promoTheme } from "../data/catalog"

export default function PromoBadge({ promo, size = "card" }) {
  const theme = promoTheme(promo)
  if (!theme) return null

  if (size === "chip") {
    const merdeka = theme.kind === "merdeka" || theme.kind === "deep" || theme.kind === "cash"
    return (
      <span
        className={
          merdeka
            ? "inline-flex rounded-md bg-[#A50034] px-2 py-0.5 text-[11px] font-bold text-white"
            : `inline-flex rounded-md px-2 py-0.5 text-[11px] font-bold ${theme.soft}`
        }
      >
        {theme.badge}
      </span>
    )
  }

  if (size === "tab") {
    return (
      <span className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-black tracking-wide ${theme.className}`}>
        {theme.badge}
      </span>
    )
  }

  if (size === "banner") {
    return (
      <div className={`flex flex-wrap items-center justify-between gap-3 rounded-[22px] px-5 py-4 ${theme.className}`}>
        <div>
          <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] opacity-80">{theme.kicker}</p>
          <p className="mt-1 text-xl font-black leading-none tracking-tight">{theme.badge}</p>
        </div>
        <p className="text-sm font-semibold">{theme.line}</p>
      </div>
    )
  }

  return (
    <div className={`flex min-h-[58px] items-center justify-between gap-3 rounded-2xl px-3 py-2 ${theme.className}`}>
      <div>
        <p className="text-[9px] font-extrabold uppercase tracking-[0.18em] opacity-80">{theme.kicker}</p>
        <p className="mt-0.5 text-[15px] font-black leading-none tracking-tight">{theme.badge}</p>
      </div>
      <p className="max-w-[46%] text-right text-[11px] font-bold leading-tight">{theme.line}</p>
    </div>
  )
}
