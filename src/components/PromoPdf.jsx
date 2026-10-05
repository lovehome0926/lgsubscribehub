import { useEffect, useState } from "react"
import { Download, X } from "lucide-react"
import { useLang } from "../i18n/LanguageProvider"

const PDF_URL = "/promo-this-month.pdf"
const MANIFEST_URL = "/promo-pages/manifest.json"
const STORAGE_KEY = "lg-promo-pdf-dismissed"

async function loadPages() {
  try {
    const res = await fetch(MANIFEST_URL, { cache: "no-store" })
    if (!res.ok) return []
    const type = (res.headers.get("content-type") || "").toLowerCase()
    if (type.includes("text/html")) return []
    const data = await res.json()
    if (!Array.isArray(data.pages) || !data.pages.length) return []
    return data.pages.map((name) => `/promo-pages/${name}`)
  } catch {
    return []
  }
}

export default function PromoPdf() {
  const { t } = useLang()
  const [open, setOpen] = useState(false)
  const [pages, setPages] = useState([])

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY)) return undefined
    let cancel = false
    loadPages().then((next) => {
      if (cancel || !next.length) return
      setPages(next)
      setOpen(true)
    })
    return () => {
      cancel = true
    }
  }, [])

  useEffect(() => {
    if (!open) return undefined
    const onKey = (event) => {
      if (event.key !== "Escape") return
      sessionStorage.setItem(STORAGE_KEY, "1")
      setOpen(false)
    }
    window.addEventListener("keydown", onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = prev
    }
  }, [open])

  const close = () => {
    sessionStorage.setItem(STORAGE_KEY, "1")
    setOpen(false)
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/75 p-3 sm:p-6" role="presentation" onClick={close}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="promo-pdf-title"
        className="relative flex max-h-[94vh] w-full max-w-[440px] flex-col overflow-hidden rounded-2xl bg-black shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 id="promo-pdf-title" className="sr-only">
          {t("promoPdf.title")}
        </h2>
        <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-end gap-2 bg-gradient-to-b from-black/70 to-transparent p-3">
          <a
            href={PDF_URL}
            download
            className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-lg-ink shadow hover:bg-lg-cream"
          >
            <Download className="size-3.5" aria-hidden="true" />
            {t("promoPdf.download")}
          </a>
          <button
            type="button"
            onClick={close}
            aria-label={t("promoPdf.close")}
            className="inline-flex size-8 items-center justify-center rounded-full bg-white text-lg-ink shadow hover:bg-lg-cream"
          >
            <X className="size-4" aria-hidden="true" />
          </button>
        </div>
        <div className="overflow-y-auto">
          {pages.map((src, index) => (
            <img key={src} src={src} alt={index === 0 ? t("promoPdf.title") : ""} className="block w-full" decoding="async" />
          ))}
        </div>
      </div>
    </div>
  )
}
