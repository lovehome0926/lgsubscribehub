export const CDN = "https://www.lg.com/content/dam"

export const SITE_ORIGIN = "https://lgsubscribehub.com.my"

export const COMPANY = {
  name: "DNC HOME APPLIANCES",
  ssm: "202403249616/JR0168103-P",
  advisor: "Cindy",
  phoneDisplay: "017-7473787",
  phoneTel: "+60177473787",
  email: "lgpuricare.cindy@gmail.com",
}

export const WHATSAPP = {
  phone: "60177473787",
}

export const JOE = {
  name: "Joe",
  phoneDisplay: "016-7483395",
  phoneTel: "+60167483395",
  whatsapp: "60167483395",
}

export const CAREER = {
  label: "Career",
  href: "#career",
}

export const INDEPENDENCE_NOTICE =
  "This website is independently managed by DNC HOME APPLIANCES and is not the official LG Malaysia website."

export const DISCLAIMER =
  "This website is managed by DNC HOME APPLIANCES (SSM: 202403249616/JR0168103-P). We operate physical store locations at Taman Flora Utama (Brandshop Batu Pahat) and Lotus's Parit Raja (Brandkiosk) for LG Subscribe product inquiries, package explanation, promotion information, registration guidance and application support. This is not the official LG Malaysia corporate website. We do not collect passwords, OTPs, bank card details or sensitive login information through this website."

export const WATERMARK = "Cindy 0177473787"

export const whatsappTo = (phone, text) =>
  `https://wa.me/${phone}?text=${encodeURIComponent(text)}`

export const whatsappHref = (text) => whatsappTo(WHATSAPP.phone, text)
