import { WATERMARK } from "../config"

export default function WatermarkedPhoto({
  src,
  alt,
  caption,
  className = "",
  imgClassName,
  fit = "cover",
  onClick,
}) {
  const contain = fit === "contain"
  const imageClass =
    imgClassName ||
    (contain ? "max-h-full max-w-full object-contain" : "h-full w-full object-cover")

  const frame = (
    <div className={`relative ${contain ? "flex aspect-[4/3] items-center justify-center bg-[#f6f5f2]" : "overflow-hidden"}`}>
      <img src={src} alt={alt} className={imageClass} />
      <span className="pointer-events-none absolute bottom-2 right-2 rounded bg-black/45 px-1.5 py-0.5 text-[9px] font-medium tracking-wide text-white/90">
        {WATERMARK}
      </span>
    </div>
  )

  return (
    <figure className={className}>
      {onClick ? (
        <button type="button" onClick={onClick} className="block w-full text-left">
          {frame}
        </button>
      ) : (
        frame
      )}
      {caption ? <figcaption className="px-3 py-2 text-[11px] text-lg-muted">{caption}</figcaption> : null}
    </figure>
  )
}
