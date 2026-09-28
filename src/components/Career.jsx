import { useEffect, useState } from "react"
import { CalendarClock, Check, ChevronDown, MapPin } from "lucide-react"
import { JOE, WHATSAPP, whatsappTo } from "../config"
import { IMG } from "../data/catalog"
import { CAREER_MEDIA, CAREER_QUIZ, scoreCareerQuiz } from "../data/career"
import { STORES } from "../data/stores"
import { useLang } from "../i18n/LanguageProvider"

function WhatsAppIcon({ className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
      <path d="M20.5 3.5A11 11 0 0 0 2.1 16.7L1 23l6.5-1.1A11 11 0 0 0 20.5 3.5Zm-8.5 17a9.1 9.1 0 0 1-4.6-1.3l-.3-.2-3.9.7.7-3.8-.2-.3A9.1 9.1 0 1 1 12 20.5Zm5-6.8c-.3-.1-1.6-.8-1.9-.9s-.4-.1-.6.1-.7.9-.8 1-.3.2-.6.1a7.4 7.4 0 0 1-2.2-1.4 8.2 8.2 0 0 1-1.5-1.9c-.2-.3 0-.4.1-.6l.4-.5.1-.3c0-.1 0-.3-.1-.4s-.6-1.4-.8-1.9-.4-.4-.6-.4h-.5c-.2 0-.4.1-.6.3s-.8.8-.8 1.9.8 2.2.9 2.3c.1.2 1.6 2.5 3.8 3.5 1.4.6 1.9.7 2.6.6.4-.1 1.6-.6 1.8-1.3s.2-1.1.2-1.2 0-.2-.2-.3Z" />
    </svg>
  )
}

function Quiz() {
  const { t } = useLang()
  const quiz = t("career.quiz")
  const [step, setStep] = useState(0)
  const [choices, setChoices] = useState(Array(CAREER_QUIZ.length).fill(null))
  const [done, setDone] = useState(false)
  const question = quiz[step]
  const resultKey = done ? scoreCareerQuiz(choices) : null
  const result = resultKey ? t(`career.results.${resultKey}`) : null

  const restart = () => {
    setStep(0)
    setChoices(Array(CAREER_QUIZ.length).fill(null))
    setDone(false)
  }

  if (result) {
    return (
      <div className="rounded-[24px] bg-white p-6 ring-1 ring-lg-line">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-lg-red">{result.tag}</p>
        <h3 className="mt-2 text-2xl font-semibold">{result.title}</h3>
        <p className="mt-3 text-sm leading-7 text-lg-muted">{result.text}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={whatsappTo(WHATSAPP.phone, t("career.wa.quizCindy", { title: result.title }))}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-lg-red px-5 py-3 text-sm font-semibold text-white hover:bg-lg-red-dark"
          >
            <WhatsAppIcon />
            {t("career.waCindy")}
          </a>
          <a
            href={whatsappTo(JOE.whatsapp, t("career.wa.quizJoe", { title: result.title }))}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-lg-line px-5 py-3 text-sm font-semibold hover:border-lg-red hover:text-lg-red"
          >
            {t("career.waJoe")}
          </a>
          <button type="button" onClick={restart} className="text-sm font-semibold text-lg-muted hover:text-lg-ink">
            {t("career.retake")}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-[24px] bg-white p-6 ring-1 ring-lg-line">
      <div className="flex items-center justify-between text-xs font-semibold text-lg-muted">
        <span>{t("career.questionN", { n: step + 1, total: quiz.length })}</span>
        <span className="h-1.5 w-32 overflow-hidden rounded-full bg-lg-cream">
          <span className="block h-full bg-lg-red" style={{ width: `${((step + 1) / quiz.length) * 100}%` }} />
        </span>
      </div>
      <h3 className="mt-4 text-xl font-semibold leading-7">{question.q}</h3>
      <div className="mt-5 grid gap-2">
        {question.a.map((option, index) => (
          <button
            key={option}
            type="button"
            onClick={() => setChoices((current) => current.map((value, i) => (i === step ? index : value)))}
            className={`rounded-2xl px-4 py-3 text-left text-sm ${
              choices[step] === index ? "bg-rose-50 font-semibold ring-2 ring-lg-red" : "bg-lg-cream ring-1 ring-lg-line"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
      <div className="mt-5 flex gap-3">
        <button
          type="button"
          disabled={step === 0}
          onClick={() => setStep((value) => value - 1)}
          className="rounded-full px-4 py-2 text-sm font-semibold text-lg-muted disabled:opacity-40"
        >
          {t("career.back")}
        </button>
        <button
          type="button"
          disabled={choices[step] == null}
          onClick={() => {
            if (step === quiz.length - 1) setDone(true)
            else setStep((value) => value + 1)
          }}
          className="rounded-full bg-lg-red px-5 py-2 text-sm font-semibold text-white disabled:opacity-40"
        >
          {step === quiz.length - 1 ? t("career.seeResult") : t("career.next")}
        </button>
      </div>
    </div>
  )
}

export default function Career({ section }) {
  const { t } = useLang()
  const [openFaq, setOpenFaq] = useState(0)
  const brandshop = STORES[0]
  const copy = t("career")

  useEffect(() => {
    if (!section) {
      window.scrollTo(0, 0)
      return
    }
    requestAnimationFrame(() => {
      document.getElementById(section)?.scrollIntoView({ behavior: "smooth", block: "start" })
    })
  }, [section])

  return (
    <main>
      <section className="relative overflow-hidden bg-black">
        <img src={CAREER_MEDIA.team} alt={copy.heroAlt} className="absolute inset-0 h-full w-full object-cover opacity-55" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/25" />
        <div className="relative mx-auto flex min-h-[460px] max-w-7xl flex-col justify-end px-4 py-8 sm:px-6 sm:py-12 lg:min-h-[540px] lg:justify-center lg:py-16">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/70 sm:text-xs sm:tracking-[0.22em]">{copy.eyebrow}</p>
          <h1 className="mt-2 max-w-2xl text-[28px] font-semibold leading-tight text-white sm:mt-3 sm:text-4xl lg:text-5xl">{copy.title}</h1>
          <p className="mt-3 max-w-xl text-sm leading-6 text-white/80 sm:mt-4 sm:text-base sm:leading-7">{copy.lead}</p>
          <div className="mt-5 flex flex-wrap gap-2 sm:mt-6">
            {copy.chips.map((chip) => (
              <span key={chip} className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-medium text-white">
                {chip}
              </span>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3 sm:mt-8">
            <a href="#career/quiz" className="rounded-full bg-lg-red px-5 py-2.5 text-sm font-semibold text-white hover:bg-lg-red-dark sm:px-6 sm:py-3">
              {copy.startQuiz}
            </a>
            <a href="#career/briefing" className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-lg-ink hover:bg-lg-cream sm:px-6 sm:py-3">
              {copy.bookBriefing}
            </a>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-lg-red">{copy.storyEyebrow}</p>
            <h2 className="mt-2 text-3xl font-semibold">{copy.storyTitle}</h2>
            <p className="mt-4 text-sm leading-7 text-lg-muted">{copy.storyLead}</p>
            <p className="mt-3 text-sm font-semibold leading-7">{copy.storyNote}</p>
            <div className="mt-8 grid gap-4">
              {copy.pains.map((item) => (
                <article key={item.n} className="rounded-2xl bg-lg-cream p-5">
                  <p className="text-[11px] font-semibold tracking-[0.16em] text-lg-red">{item.n}</p>
                  <h3 className="mt-1 text-lg font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-lg-muted">{item.copy}</p>
                </article>
              ))}
            </div>
            <p className="mt-6 text-sm leading-7 text-lg-muted">{copy.promise}</p>
          </div>
          <img src={CAREER_MEDIA.store} alt={brandshop.photoAlt} className="h-full max-h-[560px] w-full rounded-[28px] object-cover" />
        </div>
      </section>

      <section id="routes" className="scroll-mt-40 bg-lg-cream py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-lg-red">{copy.routesEyebrow}</p>
          <h2 className="mt-2 max-w-3xl text-3xl font-semibold">{copy.tracksTitle}</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-lg-muted">{copy.tracksLead}</p>
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {copy.tracks.map((track) => (
              <article key={track.id} className="rounded-[24px] bg-white p-6">
                <p className="text-[11px] font-semibold tracking-[0.16em] text-lg-red">{track.tag}</p>
                <h3 className="mt-2 text-xl font-semibold">{track.title}</h3>
                <p className="mt-3 text-sm leading-6 text-lg-muted">{track.copy}</p>
                <ul className="mt-4 space-y-2 text-sm">
                  {track.points.map((point) => (
                    <li key={point} className="flex gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-lg-red" />
                      {point}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm font-semibold">{track.edge}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="quiz" className="scroll-mt-40 bg-white py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-lg-red">{copy.quizEyebrow}</p>
            <h2 className="mt-2 text-3xl font-semibold">{copy.quizTitle}</h2>
            <p className="mt-3 text-sm leading-7 text-lg-muted">{copy.quizLead}</p>
          </div>
          <Quiz />
        </div>
      </section>

      <section id="briefing" className="scroll-mt-40 bg-lg-cream py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-lg-red">{copy.briefingEyebrow}</p>
          <h2 className="mt-2 text-3xl font-semibold">{copy.briefingTitle}</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-lg-muted">{copy.briefingLead}</p>
          <div className="mt-8 grid gap-6 rounded-[28px] bg-white p-6 lg:grid-cols-[1fr_1fr]">
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                [copy.labels.time, copy.briefing.time],
                [copy.labels.format, copy.briefing.format],
                [copy.labels.place, copy.briefing.place],
                [copy.labels.fee, copy.briefing.fee],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl bg-lg-cream p-4">
                  <p className="text-xs text-lg-muted">{label}</p>
                  <p className="mt-1 font-semibold">{value}</p>
                </div>
              ))}
            </div>
            <div>
              <p className="flex items-start gap-2 text-sm leading-6 text-lg-muted">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-lg-red" />
                {copy.briefing.address}
              </p>
              <p className="mt-3 flex items-center gap-2 text-sm">
                <CalendarClock className="h-4 w-4 text-lg-red" />
                Joe：{JOE.phoneDisplay}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={whatsappTo(WHATSAPP.phone, copy.wa.briefingCindy)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-lg-red px-5 py-3 text-sm font-semibold text-white hover:bg-lg-red-dark"
                >
                  <WhatsAppIcon />
                  {copy.bookCindy}
                </a>
                <a
                  href={whatsappTo(JOE.whatsapp, copy.wa.briefingJoe)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-lg-line px-5 py-3 text-sm font-semibold hover:border-lg-red hover:text-lg-red"
                >
                  {copy.bookJoe}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="text-3xl font-semibold">{copy.journeyTitle}</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-lg-muted">{copy.journeyLead}</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {copy.journey.map((item) => (
              <article key={item.n} className="rounded-2xl bg-lg-cream p-5">
                <p className="text-[11px] font-semibold tracking-[0.16em] text-lg-red">STEP {item.n}</p>
                <h3 className="mt-2 font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-lg-muted">{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-lg-cream py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="text-3xl font-semibold">{copy.productsTitle}</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-lg-muted">{copy.productsLead}</p>
          <div className="mt-8 overflow-hidden rounded-[24px]">
            <img src={IMG.cardFamily} alt="" className="h-56 w-full object-cover" />
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {copy.products.map((item) => (
              <span key={item} className="rounded-full bg-white px-3 py-1.5 text-sm ring-1 ring-lg-line">
                {item}
              </span>
            ))}
          </div>
          <p className="mt-4 text-xs leading-6 text-lg-muted">{copy.productsNote}</p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="text-3xl font-semibold">{copy.incentivesTitle}</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-lg-muted">{copy.incentivesLead}</p>
          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            {copy.incentives.map((item) => (
              <article key={item.title} className="rounded-[24px] bg-lg-cream p-6">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-3xl font-extrabold text-lg-red">{item.amount}</p>
                <p className="mt-3 text-sm leading-6 text-lg-muted">{item.copy}</p>
                <p className="mt-3 text-xs leading-6 text-lg-muted">* {item.note}</p>
              </article>
            ))}
          </div>
          <p className="mt-4 text-xs leading-6 text-lg-muted">{copy.incentiveFoot}</p>
        </div>
      </section>

      <section id="career-faq" className="scroll-mt-40 bg-lg-cream py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-lg-red">{copy.faqEyebrow}</p>
          <h2 className="mt-2 text-center text-3xl font-semibold">{copy.faqTitle}</h2>
          <div className="mt-8 divide-y divide-lg-line rounded-[28px] bg-white">
            {copy.faqs.map((item, index) => {
              const active = openFaq === index
              return (
                <div key={item.q} className="px-5">
                  <button type="button" className="flex w-full items-center justify-between gap-4 py-5 text-left" onClick={() => setOpenFaq(active ? -1 : index)}>
                    <span className="font-semibold">{item.q}</span>
                    <ChevronDown className={`h-4 w-4 shrink-0 text-lg-red ${active ? "rotate-180" : ""}`} />
                  </button>
                  {active ? <p className="pb-5 text-sm leading-7 text-lg-muted">{item.a}</p> : null}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="rounded-[28px] bg-lg-cream p-8 lg:p-10">
            <h2 className="max-w-3xl text-3xl font-semibold">{copy.ctaTitle}</h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-lg-muted">{copy.ctaLead}</p>
            <p className="mt-2 text-sm font-semibold">{copy.ctaNext}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={whatsappTo(WHATSAPP.phone, copy.wa.enquireCindy)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-lg-red px-6 py-3 text-sm font-semibold text-white hover:bg-lg-red-dark"
              >
                <WhatsAppIcon />
                {copy.waCindy}
              </a>
              <a
                href={whatsappTo(JOE.whatsapp, copy.wa.enquireJoe)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-lg-line bg-white px-6 py-3 text-sm font-semibold hover:border-lg-red hover:text-lg-red"
              >
                {copy.waJoe} · {JOE.phoneDisplay}
              </a>
              <a href="#career/quiz" className="inline-flex items-center rounded-full px-6 py-3 text-sm font-semibold text-lg-ink hover:text-lg-red">
                {copy.startQuiz}
              </a>
            </div>
          </div>
          <p className="mt-6 text-xs leading-6 text-lg-muted">{copy.legal}</p>
        </div>
      </section>
    </main>
  )
}
