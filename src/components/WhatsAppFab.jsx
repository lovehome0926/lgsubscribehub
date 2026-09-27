import { MessageCircle } from "lucide-react"
import { whatsappHref } from "../config"

export default function WhatsAppFab() {
  return (
    <a
      href={whatsappHref("Hi, I would like to enquire about LG Subscribe Malaysia for my home.")}
      target="_blank"
      rel="noreferrer"
      aria-label="WhatsApp enquiry"
      className="fixed right-5 bottom-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/15 hover:scale-105"
    >
      <MessageCircle className="h-7 w-7" fill="currentColor" />
    </a>
  )
}
