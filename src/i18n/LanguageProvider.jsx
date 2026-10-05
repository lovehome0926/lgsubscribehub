import { createContext, useContext, useEffect, useMemo, useState } from "react"
import { SITE_ORIGIN } from "../config"
import bm from "./bm"
import cn from "./cn"
import en from "./en"

export const LANGS = [
  { id: "en", label: "EN", html: "en-MY", og: "en_MY" },
  { id: "bm", label: "BM", html: "ms-MY", og: "ms_MY" },
  { id: "cn", label: "CN", html: "zh-CN", og: "zh_CN" },
]

const MESSAGES = { en, bm, cn }
const LANG_IDS = LANGS.map((item) => item.id)
const LanguageContext = createContext(null)

function lookup(source, path) {
  return path.split(".").reduce((value, key) => (value == null ? value : value[key]), source)
}

function interpolate(value, vars) {
  if (typeof value !== "string" || !vars) return value
  return value.replace(/\{(\w+)\}/g, (_, key) => (vars[key] == null ? "" : String(vars[key])))
}

function detectBrowserLang() {
  const list = [...(navigator.languages || []), navigator.language || ""]
  for (const raw of list) {
    const code = String(raw).toLowerCase()
    if (code.startsWith("zh")) return "cn"
    if (code.startsWith("ms") || code === "id" || code.startsWith("id-")) return "bm"
    if (code.startsWith("en")) return "en"
  }
  return "en"
}

function initialLang() {
  const fromUrl = new URLSearchParams(window.location.search).get("lang")
  if (LANG_IDS.includes(fromUrl)) return fromUrl
  try {
    const saved = localStorage.getItem("lg-lang")
    if (LANG_IDS.includes(saved)) return saved
  } catch {
    /* ignore */
  }
  return detectBrowserLang()
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(initialLang)

  const setLang = (next) => {
    if (!LANG_IDS.includes(next)) return
    setLangState(next)
    try {
      localStorage.setItem("lg-lang", next)
    } catch {
      /* ignore */
    }
    const url = new URL(window.location.href)
    url.searchParams.set("lang", next)
    window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`)
  }

  useEffect(() => {
    const meta = LANGS.find((item) => item.id === lang)
    document.documentElement.lang = meta?.html || "en-MY"
    document.querySelector('meta[property="og:locale"]')?.setAttribute("content", meta?.og || "en_MY")
  }, [lang])

  const value = useMemo(() => {
    const t = (path, vars) => {
      const found = lookup(MESSAGES[lang], path)
      if (found == null) return interpolate(lookup(MESSAGES.en, path) ?? path, vars)
      return interpolate(found, vars)
    }
    return { lang, setLang, t, messages: MESSAGES[lang] }
  }, [lang])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLang() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error("useLang must be used inside LanguageProvider")
  return ctx
}

const DEFAULT_OG =
  "https://www.lg.com/content/dam/channel/wcms/my/lg-subscribe/images/LG-Subscribe-Online-Store-Launch-Microsite-Hero-Banner-D.jpg"

function pageUrl(path, lang) {
  const clean = !path || path === "/" ? "/" : path
  return lang ? `${SITE_ORIGIN}${clean}?lang=${lang}` : `${SITE_ORIGIN}${clean}`
}

export function usePageSeo({ title, description, path = "/", image = "", ogTitle, ogDescription, canonical, robots: robotsContent = "index, follow" }) {
  const { lang } = useLang()
  useEffect(() => {
    const meta = LANGS.find((item) => item.id === lang)
    const canonicalHref = canonical || pageUrl(path, lang)
    document.title = title
    let robots = document.querySelector('meta[name="robots"]')
    if (!robots) {
      robots = document.createElement("meta")
      robots.setAttribute("name", "robots")
      document.head.appendChild(robots)
    }
    robots.setAttribute("content", robotsContent)
    document.querySelector('meta[name="description"]')?.setAttribute("content", description)
    document.querySelector('meta[property="og:title"]')?.setAttribute("content", ogTitle || title)
    document.querySelector('meta[property="og:description"]')?.setAttribute("content", ogDescription || description)
    document.querySelector('meta[property="og:url"]')?.setAttribute("content", canonicalHref)
    document.querySelector('meta[property="og:locale"]')?.setAttribute("content", meta?.og || "en_MY")
    document.querySelector('link[rel="canonical"]')?.setAttribute("href", canonicalHref)
    const picture = image || DEFAULT_OG
    document.querySelector('meta[property="og:image"]')?.setAttribute("content", picture)
    document.querySelector('meta[name="twitter:image"]')?.setAttribute("content", picture)
    for (const item of LANGS) {
      document.querySelector(`link[rel="alternate"][hreflang="${item.html}"]`)?.setAttribute("href", pageUrl(path, item.id))
    }
    document.querySelector('link[rel="alternate"][hreflang="x-default"]')?.setAttribute("href", pageUrl(path, ""))
  }, [canonical, description, image, lang, ogDescription, ogTitle, path, robotsContent, title])
}
