import { photoCrop } from "../data/photoCrop"

export default function CroppedPhoto({ src, alt = "", className = "", fallbackClass = "", fit = "cover" }) {
  const crop = photoCrop(src)
  const usable = crop && crop.side !== "none" && crop.ratio >= 0.12
  if (!usable) {
    return <img src={src} alt={alt} className={`${className} ${fallbackClass}`.trim()} />
  }
  const scale = Math.min(1.8, 1 / Math.max(0.45, 1 - crop.ratio))
  const toward = crop.side === "right" ? "left" : "right"
  return (
    <img
      src={src}
      alt={alt}
      className={`${className} object-cover`}
      style={{
        objectFit: fit,
        objectPosition: `${toward} center`,
        transform: `scale(${scale})`,
        transformOrigin: `${toward} center`,
      }}
    />
  )
}
