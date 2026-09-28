import { MessageCircle } from "lucide-react"
import { whatsappHref } from "../config"
import { useLang } from "../i18n/LanguageProvider"

export default function WhatsAppFab() {
  const { t } = useLang()
  return (
    <a
      href={whatsappHref(t("wa.fab"))}
      target="_blank"
      rel="noreferrer"
      aria-label={t("wa.fabAria")}
      className="fixed right-5 bottom-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/15 hover:scale-105"
    >
      <MessageCircle className="h-7 w-7" fill="currentColor" />
    </a>
  )
}
