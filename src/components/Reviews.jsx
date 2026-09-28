import { useState } from "react"
import { ExternalLink, Star, X } from "lucide-react"
import { WATERMARK } from "../config"
import { CUSTOMER_GROUP_PHOTOS, GOOGLE_REVIEW_SUMMARY, GOOGLE_REVIEWS_URL, INSTALL_PHOTOS, REVIEWS, reviewStats } from "../data/reviews"
import { useLang } from "../i18n/LanguageProvider"
import WatermarkedPhoto from "./WatermarkedPhoto"

function Stars({ value, size = "h-4 w-4" }) {
  return (
    <span className="inline-flex items-center gap-0.5 text-[#F5A524]" aria-hidden="true">
      {Array.from({ length: 5 }, (_, index) => (
        <Star key={index} className={size} fill={index < value ? "currentColor" : "none"} />
      ))}
    </span>
  )
}

function PhotoGrid({ photos }) {
  const { t } = useLang()
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(null)
  const shown = open ? photos : photos.slice(0, 9)
  return (
    <>
      <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-3">
        {shown.map((photo) => (
          <WatermarkedPhoto
            key={photo.src}
            src={photo.src}
            alt={photo.caption}
            fit="contain"
            className="overflow-hidden rounded-2xl bg-white ring-1 ring-lg-line transition hover:ring-lg-red/40"
            onClick={() => setActive(photo)}
          />
        ))}
      </div>
      {photos.length > 9 ? (
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="mt-5 rounded-full border border-lg-line px-4 py-2 text-sm font-semibold hover:border-lg-red hover:text-lg-red"
        >
          {open ? t("reviews.fewer") : t("reviews.more", { n: photos.length })}
        </button>
      ) : null}
      {active ? (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 p-4"
          onClick={() => setActive(null)}
        >
          <button
            type="button"
            className="absolute right-5 top-5 rounded-full bg-white/15 p-2 text-white"
            onClick={() => setActive(null)}
            aria-label={t("reviews.close")}
          >
            <X className="h-5 w-5" />
          </button>
          <div className="relative max-h-[90vh] max-w-[92vw]" onClick={(event) => event.stopPropagation()}>
            <img src={active.src} alt={active.caption} className="max-h-[90vh] max-w-[92vw] object-contain" />
            <span className="pointer-events-none absolute bottom-3 right-3 rounded bg-black/45 px-2 py-1 text-[10px] font-medium text-white/90">
              {WATERMARK}
            </span>
          </div>
        </div>
      ) : null}
    </>
  )
}

export default function Reviews() {
  const { t } = useLang()
  const stats = reviewStats()
  const written = REVIEWS.filter((review) => review.quote)
  return (
    <section id="reviews" className="scroll-mt-28 bg-lg-cream py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-lg-red">{t("reviews.eyebrow")}</p>
            <h2 className="mt-2 text-3xl font-semibold">{t("reviews.title")}</h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-lg-muted">{t("reviews.lead")}</p>
          </div>
          <div className="rounded-2xl bg-white px-5 py-4 shadow-sm ring-1 ring-lg-line">
            <p className="text-xs uppercase tracking-wide text-lg-muted">{t("reviews.rating")}</p>
            <div className="mt-1 flex items-center gap-2">
              <span className="text-3xl font-semibold">{stats.average.toFixed(1)}</span>
              <Stars value={Math.round(stats.average)} size="h-5 w-5" />
            </div>
            <p className="mt-1 text-sm text-lg-muted">
              {t("reviews.counts", { google: GOOGLE_REVIEW_SUMMARY.count, written: stats.count })}
            </p>
            <a
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-lg-red"
            >
              {t("reviews.seeGoogle")}
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>

        {INSTALL_PHOTOS.length ? (
          <div className="mt-10">
            <h3 className="text-xl font-semibold">{t("reviews.installs")}</h3>
            <PhotoGrid photos={INSTALL_PHOTOS} />
          </div>
        ) : null}

        {CUSTOMER_GROUP_PHOTOS.length ? (
          <div className="mt-12">
            <h3 className="text-xl font-semibold">{t("reviews.group")}</h3>
            <PhotoGrid photos={CUSTOMER_GROUP_PHOTOS} />
          </div>
        ) : null}

        {written.length ? (
          <div className="mt-12">
            <h3 className="text-xl font-semibold">{t("reviews.quotes")}</h3>
            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {written.map((review) => (
                <article key={`${review.author}-${review.date}-${review.quote.slice(0, 24)}`} className="rounded-2xl bg-white p-5 ring-1 ring-lg-line">
                  <Stars value={review.rating} />
                  <p className="mt-3 text-sm font-semibold">{review.author}</p>
                  <p className="mt-1 text-xs text-lg-muted">
                    {[review.product, review.date].filter(Boolean).join(" · ")}
                    {review.source === "google" ? " · Google" : ""}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-lg-ink">{review.quote}</p>
                </article>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  )
}
