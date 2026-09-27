// Shared transform for the "Promos" tab of the product sheet.
// Offer column accepts the memo wording the team already uses.
import fs from "fs"
import path from "path"
import { root } from "./build-products.mjs"

export const promosOutPath = path.join(root, "src", "data", "promos.js")

export const PROMO_COLUMNS = [
  { key: "A", header: "Month" },
  { key: "B", header: "Model" },
  { key: "C", header: "Offer" },
  { key: "D", header: "Badge" },
  { key: "E", header: "Title" },
  { key: "F", header: "Detail" },
  { key: "G", header: "Start" },
  { key: "H", header: "End" },
]

function truthy(value) {
  return /^(y|yes|true|1)$/i.test(String(value ?? "").trim())
}

function isoDate(value) {
  const text = String(value ?? "").trim()
  if (!text) return null
  const date = new Date(text)
  if (Number.isNaN(date.getTime())) return null
  return date.toISOString().slice(0, 10)
}

function moneyOff(text) {
  const match = String(text || "").replace(/,/g, "").match(/rm\s*(\d+(?:\.\d+)?)/i)
  return match ? Number(match[1]) : null
}

export function parseOffer(raw) {
  const text = String(raw || "").trim()
  if (!text) return null

  const merdeka = /merdeka/i.test(text)
  const monthsMatch = text.match(/(?:前)?\s*(\d+)\s*m(?:onths?|th)?/i)
  const introMonths = monthsMatch ? Number(monthsMatch[1]) : null
  const percentMatch = text.match(/(\d+(?:\.\d+)?)\s*%/)
  const percentOff = percentMatch ? Number(percentMatch[1]) : /半价|half/i.test(text) ? 50 : null
  const extraOff = moneyOff(text)

  if (percentOff != null) {
    return {
      type: "intro_percent",
      introMonths: introMonths || 9,
      percentOff,
      extraOff: 0,
      merdeka,
    }
  }
  if (extraOff != null) {
    return {
      type: "amount_off",
      introMonths: null,
      percentOff: 0,
      extraOff,
      merdeka,
    }
  }
  return null
}

function defaultCopy(parsed, scope) {
  if (!parsed) return { badge: "SUBSCRIBE", title: "Subscribe offer", detail: "" }
  if (parsed.type === "intro_percent") {
    const half = parsed.percentOff === 50
    return {
      badge: parsed.merdeka ? "MERDEKA" : half ? "9M HALF" : `${parsed.introMonths}M ${parsed.percentOff}%`,
      title: half
        ? `First ${parsed.introMonths} months half price`
        : `First ${parsed.introMonths} months ${parsed.percentOff}% off`,
      detail: half
        ? `Pay half the monthly fee for the first ${parsed.introMonths} months. Standard fee from month ${parsed.introMonths + 1}.`
        : `${parsed.percentOff}% off the monthly fee for the first ${parsed.introMonths} months. Standard fee from month ${parsed.introMonths + 1}.`,
    }
  }
  return {
    badge: parsed.merdeka ? "MERDEKA" : `RM${parsed.extraOff} OFF`,
    title: parsed.merdeka ? `Merdeka RM${parsed.extraOff} off` : `RM${parsed.extraOff} off monthly`,
    detail: parsed.merdeka
      ? `Merdeka incentive: RM${parsed.extraOff} off the monthly Subscribe fee${scope && scope !== "all" ? ` on ${scope}` : ""}.`
      : `RM${parsed.extraOff} off the monthly Subscribe fee.`,
  }
}

function monthValue(raw) {
  const text = String(raw ?? "").trim().toLowerCase()
  if (!text || text === "default" || text === "all" || text === "0") return 0
  const month = Number(text)
  if (!Number.isInteger(month) || month < 0 || month > 12) return null
  return month
}

export function buildPromos(rows) {
  const promos = []
  const seen = new Set()
  for (const row of rows) {
    const month = monthValue(row.A)
    if (month == null) continue
    const offer = String(row.C ?? row.D ?? "").trim()
    const parsed = parseOffer(offer) || (offer ? null : parseOffer("前9m半价"))
    if (!parsed && !String(row.E ?? "").trim()) continue
    const scope = String(row.B ?? "").trim() || "all"
    const key = `${month}::${scope.toLowerCase()}::${offer.toLowerCase()}`
    if (seen.has(key)) {
      console.warn(`Skipping duplicate promo for month ${month} model "${scope}"`)
      continue
    }
    seen.add(key)
    const copy = defaultCopy(parsed, scope)
    promos.push({
      month,
      scope,
      offer,
      badge: String(row.D ?? "").trim() || copy.badge,
      title: String(row.E ?? "").trim() || copy.title,
      detail: String(row.F ?? "").trim() || copy.detail,
      type: parsed?.type || "message",
      introMonths: parsed?.introMonths ?? null,
      percentOff: parsed?.percentOff ?? 0,
      extraOff: parsed?.extraOff ?? 0,
      merdeka: Boolean(parsed?.merdeka),
      start: isoDate(row.G),
      end: isoDate(row.H),
    })
  }
  return promos.sort((a, b) => a.month - b.month || a.scope.localeCompare(b.scope))
}

export function promosToRows(promos) {
  return promos.map((promo) => [
    promo.month === 0 ? "default" : promo.month,
    promo.scope,
    promo.offer || "",
    promo.badge,
    promo.title,
    promo.detail,
    promo.start ?? "",
    promo.end ?? "",
  ])
}

export const DEFAULT_PROMOS = [
  {
    month: 0,
    scope: "all",
    offer: "前9m半价",
    badge: "9M HALF",
    title: "First 9 months half price",
    detail: "When the month has no special memo, every Subscribe plan is half price for the first 9 months.",
    type: "intro_percent",
    introMonths: 9,
    percentOff: 50,
    extraOff: 0,
    merdeka: false,
    start: null,
    end: null,
  },
]

export function writePromos(promos, { source }) {
  const list = promos.length ? promos : DEFAULT_PROMOS
  const banner = `// Generated from the "Promos" tab of ${source}.
// Re-run scripts/sync-sheet.mjs or npm run import:xlsx after a memo update.
//
// scope: usually a model code (WU525BS, WD518AN). "all" is the fallback.
// The most specific match wins. Month 0 / "default" applies when that month
// has no memo for the model.
// Offer examples: 前12m 77% off / 前7m 77% off / 前9m半价 / Merdeka RM20 off / RM10 off
export const PROMOS = ${JSON.stringify(list, null, 2)}
`
  fs.writeFileSync(promosOutPath, banner)
  console.log(`Wrote ${list.length} promos to ${promosOutPath}`)
}
