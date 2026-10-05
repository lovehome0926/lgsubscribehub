export const GOOGLE_ADS_ID = "AW-18495462623"
export const LEAD_CONVERSION = "AW-18495462623/AK5mCMOX7JEdEN-5qfNE"

export function trackLeadConversion() {
  window.gtag?.("event", "conversion", { send_to: LEAD_CONVERSION })
}

export function isWhatsAppLead(href) {
  try {
    const url = new URL(href, window.location.href)
    return url.hostname === "wa.me" || url.hostname === "api.whatsapp.com"
  } catch {
    return false
  }
}
