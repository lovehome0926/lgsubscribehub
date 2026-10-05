import { groupById } from "./data/catalog"

const HOME_ANCHORS = new Set(["shop", "why", "stores", "reviews", "faq", "top"])

export function productPath(id, specId, colorId) {
  const parts = ["/product", encodeURIComponent(id)]
  if (specId) parts.push(encodeURIComponent(specId))
  if (colorId) parts.push(encodeURIComponent(colorId))
  return parts.join("/")
}

export function shopGroupPath(groupId) {
  return `/shop/${groupId}`
}

function partsOf(pathname) {
  return pathname
    .replace(/\/+$/, "")
    .split("/")
    .filter(Boolean)
    .map((part) => {
      try {
        return decodeURIComponent(part)
      } catch {
        return part
      }
    })
}

export function readRoute(loc = window.location) {
  const [page, id, a, b] = partsOf(loc.pathname || "/")
  if (!page) return { name: "home" }
  if (page === "career") return { name: "career", section: id || null }
  if (page === "care") return { name: "care" }
  if (page === "promotions") return { name: "promotions" }
  if (page === "product" && id) return { name: "product", id, a: a || null, b: b || null }
  if (page === "shop" && id && groupById(id)) return { name: "shop", groupId: id }
  return { name: "home" }
}

function legacyPath() {
  const hash = window.location.hash.replace(/^#\/?/, "")
  if (!hash || HOME_ANCHORS.has(hash)) return null
  const [page, id, a, b] = hash.split("/")
  if (page === "care") return "/care"
  if (page === "promotions") return "/promotions/"
  if (page === "career") return id ? `/career/${encodeURIComponent(id)}` : "/career"
  if (page === "product" && id) return productPath(id, a, b)
  if (page.startsWith("group-")) {
    const groupId = page.slice("group-".length)
    if (groupById(groupId)) return shopGroupPath(groupId)
  }
  return null
}

export function promoteLegacyHash() {
  const path = legacyPath()
  if (!path) return false
  const lang = new URLSearchParams(window.location.search).get("lang")
  const search = lang ? `?lang=${encodeURIComponent(lang)}` : ""
  window.history.replaceState(null, "", `${path}${search}`)
  return true
}

export function navigate(href, { replace = false } = {}) {
  const url = new URL(href, window.location.origin)
  const lang = new URLSearchParams(window.location.search).get("lang")
  if (lang && !url.searchParams.has("lang")) url.searchParams.set("lang", lang)
  const next = `${url.pathname}${url.search}${url.hash}`
  const current = `${window.location.pathname}${window.location.search}${window.location.hash}`
  if (next === current) return
  if (replace) window.history.replaceState(null, "", next)
  else window.history.pushState(null, "", next)
  window.dispatchEvent(new PopStateEvent("popstate"))
}

export function bindSpaLinks() {
  const onClick = (event) => {
    if (event.defaultPrevented || event.button !== 0) return
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    const anchor = event.target.closest?.("a")
    if (!anchor || anchor.target === "_blank" || anchor.hasAttribute("download")) return
    const href = anchor.getAttribute("href")
    if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return
    let url
    try {
      url = new URL(href, window.location.origin)
    } catch {
      return
    }
    if (url.origin !== window.location.origin) return
    if (url.pathname === window.location.pathname && url.hash && url.pathname === "/") return
    event.preventDefault()
    navigate(`${url.pathname}${url.search}${url.hash}`)
  }
  document.addEventListener("click", onClick)
  return () => document.removeEventListener("click", onClick)
}
