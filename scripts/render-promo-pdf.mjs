import { createCanvas } from "@napi-rs/canvas"
import { existsSync, mkdirSync, readFileSync, rmSync, statSync, writeFileSync } from "fs"
import path from "path"
import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs"

const PDF_PATH = "public/promo-this-month.pdf"
const OUT_DIR = "public/promo-pages"

export async function renderPromoPdf() {
  if (!existsSync(PDF_PATH)) {
    if (existsSync(OUT_DIR)) rmSync(OUT_DIR, { recursive: true, force: true })
    return
  }

  const manifestPath = path.join(OUT_DIR, "manifest.json")
  if (existsSync(manifestPath) && statSync(manifestPath).mtimeMs >= statSync(PDF_PATH).mtimeMs) return

  const data = new Uint8Array(readFileSync(PDF_PATH))
  const pdf = await getDocument({ data, disableWorker: true }).promise
  rmSync(OUT_DIR, { recursive: true, force: true })
  mkdirSync(OUT_DIR, { recursive: true })

  const pages = []
  for (let number = 1; number <= pdf.numPages; number += 1) {
    const page = await pdf.getPage(number)
    const viewport = page.getViewport({ scale: 2 })
    const canvas = createCanvas(Math.ceil(viewport.width), Math.ceil(viewport.height))
    await page.render({ canvasContext: canvas.getContext("2d"), viewport }).promise
    const name = `${String(number).padStart(2, "0")}.jpg`
    writeFileSync(path.join(OUT_DIR, name), canvas.toBuffer("image/jpeg", 90))
    pages.push(name)
  }

  writeFileSync(manifestPath, JSON.stringify({ pages }))
}

if (process.argv[1] && process.argv[1].endsWith("render-promo-pdf.mjs")) {
  await renderPromoPdf()
}
