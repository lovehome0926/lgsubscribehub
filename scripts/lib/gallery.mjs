const SIZE_DIR = /\/(?:1600x1062|2010x1334|1044x1334|450x450|350x350|180x180|basic|thumbnail)\//i

function abs(src) {
  if (!src) return null
  const pathName = String(src).split("?")[0].split(" ")[0].replace(/\/jcr:content\/renditions\/.*$/i, "")
  if (pathName.startsWith("http")) return pathName
  if (pathName.startsWith("/")) return `https://www.lg.com${pathName}`
  return null
}

function useful(src) {
  const url = abs(src)
  if (!url) return null
  if (!/\.(jpg|jpeg|png|webp)$/i.test(url)) return null
  if (/gnb-banner|logo-lg|plp-b2c|rent-up-button|membership|instalment|subscribe-2025-banner|\/Dim\.jpg|\/icon|-icon-|sprite|favicon|mqdefault|hqdefault|ytimg|korea-tech|koreatech|korea_tech/i.test(url)) {
    return null
  }
  return url
}

function isGalleryPath(url) {
  return /gallery/i.test(url)
}

function sizeRank(url) {
  const file = url.split("/").pop()
  if (/\/(?:1600x1062|2010x1334|1044x1334|1600)\//i.test(url)) return 100
  if (/\/gallery\/gallery\//i.test(url)) return 92
  if (/[-_]2010\.(jpg|jpeg|png|webp)$/i.test(file)) return 90
  if (/large0?\d+/i.test(file)) return 88
  if (/^D-?\d+/i.test(file)) return 80
  if (/^DZ-?\d+/i.test(file)) return 70
  if (/\/gallery\/zoom\//i.test(url) && !/-m\./i.test(file)) return 60
  if (/\/basic\//i.test(url) && /large/i.test(url)) return 35
  if (/450x450|350x350|180x180|\/gallery\/180\/|thumbnail|small\d+|\/medium|basic-medium/i.test(url)) return 8
  if (/^S-?\d+/i.test(file)) return 12
  return 50
}

function shotIndex(url) {
  const file = url.split("/").pop()
  if (/[-_](?:2010|1600|1334|1062|450|350|180)\.(?:jpg|jpeg|png|webp)$/i.test(file)) {
    // size token, not a shot number
  } else {
    const trailing = file.match(/[-_](\d{1,2})\.(?:jpg|jpeg|png|webp)$/i)
    if (trailing) return Number(trailing[1])
  }
  const matches = [
    file.match(/^(?:D|DZ|S)-?0?(\d{1,2})\./i),
    file.match(/^(?:large|small|medium)0?(\d{1,2})\./i),
    file.match(/gallery-(?:gallery-)?(?:2010-)?(\d{2})/i),
    file.match(/gallery-(\d{2})[-_.]/i),
    file.match(/^0?(\d{2})[-_]/),
  ]
  for (const match of matches) {
    if (match) return Number(match[1])
  }
  return 999
}

function familyKey(url) {
  return url
    .replace(/^https:\/\/www\.lg\.com/i, "")
    .replace(SIZE_DIR, "/gallery/")
    .replace(/\/[^/]+$/, "/")
    .toLowerCase()
}

function upgradeGuess(url) {
  return url
    .replace("/gallery/350x350/", "/gallery/2010x1334/")
    .replace("/gallery/450x450/", "/gallery/2010x1334/")
    .replace("/gallery/180/", "/gallery/1600/")
    .replace("/gallery/thumbnail/", "/gallery/")
    .replace(/-350x350-/gi, "-2010x1334-")
    .replace(/-450x450-/gi, "-2010x1334-")
    .replace(/-180X180/gi, "-1600X1062")
    .replace(/-thumbnail-/gi, "-")
    .replace(/-2010\.jpg$/i, "-2010.jpg")
}

function massageLarge(url) {
  const match = url.match(/^(https:\/\/www\.lg\.com\/content\/dam\/.+\/gallery\/)(?:thumbnail\/)?(.+)-thumbnail-(.+)\.(jpg|jpeg|png|webp)$/i)
  if (!match) return null
  return `${match[1]}${match[2]}-${match[3]}-2010.${match[4]}`
}

function collectGalleryUrls(html) {
  const found = new Set()
  const guessed = new Set()
  for (const match of String(html || "").matchAll(/(?:https:\/\/www\.lg\.com)?(\/content\/dam\/[^"'\\\s>]+\.(?:jpg|jpeg|png|webp))/gi)) {
    const url = useful(`https://www.lg.com${match[1]}`)
    if (!url || !isGalleryPath(url)) continue
    found.add(url)
    const upgraded = useful(upgradeGuess(url))
    if (upgraded && upgraded !== url) guessed.add(upgraded)
    const large = useful(massageLarge(url))
    if (large) guessed.add(large)
  }
  return { found: [...found], guessed: [...guessed] }
}

function pickFamily(urls) {
  const groups = new Map()
  for (const url of urls) {
    const key = familyKey(url)
    if (!groups.has(key)) groups.set(key, [])
    groups.get(key).push(url)
  }
  let best = []
  let bestScore = -1
  for (const list of groups.values()) {
    const numbered = list.filter((url) => shotIndex(url) <= 12)
    const rank = Math.max(...list.map(sizeRank))
    const score = numbered.length * 10 + rank + list.length
    if (score > bestScore) {
      bestScore = score
      best = list
    }
  }
  return best
}

function shotKey(url) {
  const index = shotIndex(url)
  if (index >= 1 && index <= 12) return `n:${index}`
  return `f:${url
    .split("/")
    .pop()
    .replace(/-(?:450x450|1600x1062|2010x1334|180x180|thumbnail|2010|large|medium|zoom).*$/i, "")
    .toLowerCase()}`
}

function bestPerShot(urls) {
  const byKey = new Map()
  const order = []
  for (const url of urls) {
    const key = shotKey(url)
    const current = byKey.get(key)
    if (!current) {
      byKey.set(key, url)
      order.push(key)
    } else if (sizeRank(url) > sizeRank(current)) {
      byKey.set(key, url)
    }
  }
  const numbered = order.filter((key) => key.startsWith("n:")).sort((a, b) => Number(a.slice(2)) - Number(b.slice(2)))
  const leftover = order.filter((key) => key.startsWith("f:"))
  const keys = numbered.length >= 3 ? numbered : [...numbered, ...leftover]
  return keys.map((key) => byKey.get(key))
}

export function galleryShots(html, { limit = 8 } = {}) {
  const { found, guessed } = collectGalleryUrls(html)
  if (!found.length && !guessed.length) return []
  const htmlOnly = bestPerShot(pickFamily(found))
  if (htmlOnly.length >= 5) return htmlOnly.slice(0, limit)
  return bestPerShot(pickFamily([...found, ...guessed])).slice(0, limit)
}

export async function keepLive(urls) {
  const live = []
  for (const url of urls) {
    try {
      const response = await fetch(url, { method: "HEAD", redirect: "follow", headers: { "User-Agent": "Mozilla/5.0" } })
      if (response.ok) live.push(url)
    } catch {
      // skip dead guesses
    }
  }
  return live
}

export function sequenceGuesses(first) {
  if (!first) return []
  const guesses = []
  for (let index = 2; index <= 8; index += 1) {
    guesses.push(
      first.replace(/(\/)(?:D|DZ|S)-?0?1(\.(?:jpg|jpeg|png|webp))$/i, (_, slash, ext) => `${slash}D-${String(index).padStart(2, "0")}${ext}`),
      first.replace(/(\/)(?:D|DZ|S)-?0?1(\.(?:jpg|jpeg|png|webp))$/i, (_, slash, ext) => `${slash}D${index}${ext}`),
      first.replace(/(\/)large0?1(\.(?:jpg|jpeg|png|webp))$/i, (_, slash, ext) => `${slash}large${String(index).padStart(2, "0")}${ext}`),
      first.replace(/[-_]0?1(\.(?:jpg|jpeg|png|webp))$/i, `-${index}$1`),
    )
  }
  return [...new Set(guesses.filter((url) => url && url !== first))]
}

export function preferRicherGallery(current = [], next = []) {
  if ((next?.length || 0) > (current?.length || 0)) return next
  return current?.length ? current : next || []
}
