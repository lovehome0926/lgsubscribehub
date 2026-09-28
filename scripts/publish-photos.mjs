import fs from "fs"
import path from "path"
import { root } from "./lib/build-products.mjs"

const FOLDERS = [
  { dir: "INSTALL_PHOTOS", dest: "installs", kind: "install", caption: "Customer installation" },
  { dir: "GROUP_PHOTOS", dest: "groups", kind: "customers", caption: "With our customers" },
]
const CARESHIP_DIR = "CARESHIP_PHOTOS"
const OUT = path.join(root, "src", "data", "photos.js")
const EXTS = new Set([".jpg", ".jpeg", ".jfif", ".png", ".webp", ".avif"])

function listImages(dir) {
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter((name) => EXTS.has(path.extname(name).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
}

function destExt(ext) {
  const clean = ext.toLowerCase()
  if (clean === ".jpeg" || clean === ".jfif") return ".jpg"
  return clean
}

function destName(index, ext) {
  return `${String(index + 1).padStart(2, "0")}${destExt(ext)}`
}

function compactModel(value) {
  return String(value || "")
    .toUpperCase()
    .replace(/O/g, "0")
    .replace(/[^A-Z0-9]/g, "")
}

function slugFile(name, ext) {
  const base = compactModel(name.replace(/\.[^.]+$/, "")).toLowerCase() || "photo"
  return `${base}${destExt(ext)}`
}

function publishCareshipPhotos() {
  const source = path.join(root, CARESHIP_DIR)
  const dest = path.join(root, "public", "careship")
  fs.mkdirSync(source, { recursive: true })
  fs.mkdirSync(dest, { recursive: true })
  for (const leftover of fs.readdirSync(dest)) {
    fs.rmSync(path.join(dest, leftover), { force: true })
  }
  const files = listImages(source)
  const photos = files.map((file) => {
    const name = slugFile(file, path.extname(file))
    fs.copyFileSync(path.join(source, file), path.join(dest, name))
    return {
      src: `/careship/${name}`,
      key: compactModel(file),
      file,
    }
  })
  console.log(`Published ${photos.length} photos from ${CARESHIP_DIR}`)
  return photos
}

export function publishPhotos() {
  const photos = []
  for (const folder of FOLDERS) {
    const source = path.join(root, folder.dir)
    const dest = path.join(root, "public", folder.dest)
    fs.mkdirSync(source, { recursive: true })
    fs.mkdirSync(dest, { recursive: true })
    for (const leftover of fs.readdirSync(dest)) {
      fs.rmSync(path.join(dest, leftover), { force: true })
    }
    const files = listImages(source)
    files.forEach((file, index) => {
      const name = destName(index, path.extname(file))
      fs.copyFileSync(path.join(source, file), path.join(dest, name))
      photos.push({
        src: `/${folder.dest}/${name}`,
        kind: folder.kind,
        caption: folder.caption,
      })
    })
    console.log(`Published ${files.length} photos from ${folder.dir}`)
  }

  const careship = publishCareshipPhotos()
  fs.writeFileSync(
    OUT,
    `// Generated from INSTALL_PHOTOS, GROUP_PHOTOS and CARESHIP_PHOTOS.
// Drop new images there, then run npm run import:xlsx or npm run photos
export const CUSTOMER_PHOTOS = ${JSON.stringify(photos, null, 2)}

export const CARESHIP_PHOTOS = ${JSON.stringify(careship, null, 2)}
`,
  )
  return photos
}

if (process.argv[1] && path.resolve(process.argv[1]).endsWith("publish-photos.mjs")) {
  publishPhotos()
}
