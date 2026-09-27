export const CDN = "https://www.lg.com/content/dam"

export const WHATSAPP = {
  phone: "60123456789",
}

export const whatsappHref = (text) =>
  `https://wa.me/${WHATSAPP.phone}?text=${encodeURIComponent(text)}`
