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
    const title = lookup(MESSAGES[lang], "seo.title") || lookup(MESSAGES.en, "seo.title")
    const description = lookup(MESSAGES[lang], "seo.description") || lookup(MESSAGES.en, "seo.description")
    const pageUrl = `${SITE_ORIGIN}/?lang=${lang}`
    document.documentElement.lang = meta?.html || "en-MY"
    document.title = title
    document.querySelector('meta[name="description"]')?.setAttribute("content", description)
    document.querySelector('meta[property="og:title"]')?.setAttribute("content", title)
    document.querySelector('meta[property="og:description"]')?.setAttribute("content", description)
    document.querySelector('meta[property="og:url"]')?.setAttribute("content", pageUrl)
    document.querySelector('meta[property="og:locale"]')?.setAttribute("content", meta?.og || "en_MY")
    document.querySelector('link[rel="canonical"]')?.setAttribute("href", pageUrl)
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
