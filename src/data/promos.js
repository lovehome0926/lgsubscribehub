// Generated from the "Promos" tab of LG_Subscribe_Products_2026.xlsx.
// Re-run scripts/sync-sheet.mjs or npm run import:xlsx after a memo update.
//
// scope: usually a model code (WU525BS, WD518AN). "all" is the fallback.
// The most specific match wins. Month 0 / "default" applies when that month
// has no memo for the model.
// Offer examples: 前12m 77% off / 前7m 77% off / 前9m半价 / Merdeka RM20 off / RM10 off
export const PROMOS = [
  {
    "month": 0,
    "scope": "all",
    "offer": "前9m半价",
    "badge": "9M HALF",
    "title": "First 9 months half price",
    "detail": "When the month has no special memo, every Subscribe plan is half price for the first 9 months.",
    "type": "intro_percent",
    "introMonths": 9,
    "percentOff": 50,
    "extraOff": 0,
    "merdeka": false,
    "start": null,
    "end": null
  }
]
