'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { readConsent, writeConsent, type ConsentState } from '@/lib/consent'

type Mode = 'banner' | 'settings'

const DEFAULTS: ConsentState = {
  analytics: false,
  marketing: false,
}

type LocalConsent = ConsentState

function getStoredConsent(): LocalConsent | null {
  const c = readConsent()
  if (!c) return null
  return {
    analytics: !!c.analytics,
    marketing: !!c.marketing,
  }
}

function gtagConsentUpdate(consent: LocalConsent) {
  if (typeof window === 'undefined') return
  const gtag = (window as any).gtag
  if (typeof gtag !== 'function') return

  const analytics_storage = consent.analytics ? 'granted' : 'denied'
  const marketingGranted = consent.marketing ? 'granted' : 'denied'

  gtag('consent', 'update', {
    analytics_storage,
    ad_storage: marketingGranted,
    ad_user_data: marketingGranted,
    ad_personalization: marketingGranted,
    functionality_storage: 'granted',
    security_storage: 'granted',
  })
}

export default function ConsentBannerV2() {
  const [open, setOpen] = useState<boolean>(false)
  const [mode, setMode] = useState<Mode>('banner')

  const [analytics, setAnalytics] = useState<boolean>(DEFAULTS.analytics)
  const [marketing, setMarketing] = useState<boolean>(DEFAULTS.marketing)

  // Beim Start: wenn Consent vorhanden -> anwenden & Banner nicht zeigen
  // Wenn nicht vorhanden -> Banner zeigen (Default denied macht ConsentModeDefault)
  useEffect(() => {
    const current = getStoredConsent()

    if (current) {
      setAnalytics(current.analytics)
      setMarketing(current.marketing)
      gtagConsentUpdate(current)
      setOpen(false)
      return
    }

    setAnalytics(DEFAULTS.analytics)
    setMarketing(DEFAULTS.marketing)
    setMode('banner')
    setOpen(true)
  }, [])

  // Öffnen via global event (Footer Link etc.)
  useEffect(() => {
    const onOpen = () => {
      const current = getStoredConsent()
      setAnalytics(current?.analytics ?? DEFAULTS.analytics)
      setMarketing(current?.marketing ?? DEFAULTS.marketing)
      setMode('settings')
      setOpen(true)
    }
    window.addEventListener('stayfix:open-consent', onOpen)
    return () => window.removeEventListener('stayfix:open-consent', onOpen)
  }, [])

  const summary = useMemo(() => {
    const parts: string[] = ['Notwendig']
    if (analytics) parts.push('Statistik')
    if (marketing) parts.push('Marketing')
    return parts.join(' · ')
  }, [analytics, marketing])

  // ❌ Kein Close durch Nutzeraktionen (Backdrop/ESC)
  function closeAfterChoice() {
    setOpen(false)
    setMode('banner')
  }

  function applyAndClose(next: LocalConsent) {
    writeConsent(next)
    gtagConsentUpdate(next)
    closeAfterChoice()
  }

  function acceptAll() {
    applyAndClose({ analytics: true, marketing: true })
  }

  function rejectAll() {
    applyAndClose({ analytics: false, marketing: false })
  }

  function saveSelection() {
    applyAndClose({ analytics, marketing })
  }

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[80] flex items-end justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Cookie-Einwilligung"
    >
      {/* Backdrop: blockiert Klick/Scroll – aber NICHT schließbar */}
      <div
        aria-hidden
        onWheel={(e) => e.preventDefault()}
        onTouchMove={(e) => e.preventDefault()}
        className="absolute inset-0 bg-slate-900/25 backdrop-blur-[2px] [touch-action:none]"
      />

      <div className="relative w-full max-w-[920px]">
        <div className="relative overflow-hidden rounded-[1.6rem] border border-slate-900/10 bg-white/85 shadow-[0_20px_70px_rgba(15,23,42,0.12)] backdrop-blur-xl">
          {/* sheen */}
          <div className="pointer-events-none absolute inset-0 opacity-50">
            <div className="stayfix-consent-sheen absolute -left-1/2 top-0 h-full w-[200%]" />
          </div>

          <div className="relative p-4 sm:p-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-900/10 bg-white/75 px-3 py-1 text-[11px] font-medium text-slate-700 shadow-sm backdrop-blur">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500/70" />
              Cookie-Einwilligung (Consent Mode v2)
            </div>

            <div className="mt-3">
              <div className="text-[18px] font-semibold tracking-tight text-slate-900 sm:text-[20px]">
                Wir verwenden Cookies &amp; ähnliche Technologien
              </div>

              <p className="mt-2 max-w-[980px] text-[12px] leading-relaxed text-slate-700 sm:text-[13px]">
                Notwendige Cookies sind für den Betrieb der Website erforderlich. Optional nutzen wir Statistik (z. B.
                Google Analytics) und ggf. Marketing, um Reichweite und Conversions zu messen. Bitte treffen Sie eine
                Auswahl, um fortzufahren.
              </p>

              <div className="mt-2 text-[11px] text-slate-600">
                Aktuell: <span className="font-medium text-slate-900">{summary}</span> ·{' '}
                <Link href="/datenschutz" className="font-medium text-slate-900 underline underline-offset-2">
                  Datenschutz
                </Link>
              </div>
            </div>

            {mode === 'banner' ? (
              <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-start">
                <button
                  onClick={acceptAll}
                  className={[
                    'inline-flex h-11 w-full items-center justify-center rounded-2xl px-4 text-[12px] font-semibold transition sm:w-auto',
                    'border border-slate-900/15 bg-white/85 text-slate-900 shadow-[0_18px_55px_rgba(15,23,42,0.12)] backdrop-blur',
                    'hover:bg-white hover:translate-y-[-1px] focus:outline-none focus:ring-2 focus:ring-slate-900/10',
                  ].join(' ')}
                >
                  Alle akzeptieren
                </button>

                <button
                  onClick={rejectAll}
                  className="inline-flex h-11 w-full items-center justify-center rounded-2xl border border-slate-900/10 bg-white/75 px-4 text-[12px] font-semibold text-slate-900 shadow-sm backdrop-blur transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10 sm:w-auto"
                >
                  Ablehnen
                </button>

                <button
                  onClick={() => setMode('settings')}
                  className="inline-flex h-11 w-full items-center justify-center rounded-2xl border border-slate-900/10 bg-white/75 px-4 text-[12px] font-semibold text-slate-900 shadow-sm backdrop-blur transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10 sm:w-auto"
                >
                  Einstellungen
                </button>
              </div>
            ) : (
              <>
                <div className="mt-4 grid gap-2 sm:grid-cols-3">
                  <ToggleRow title="Notwendig" description="Betrieb & Sicherheit." enabled locked />
                  <ToggleRow
                    title="Statistik"
                    description="Nutzung messen (analytics_storage)."
                    enabled={analytics}
                    onChange={setAnalytics}
                  />
                  <ToggleRow
                    title="Marketing"
                    description="Kampagnen/Conversions messen (ad_storage, ad_user_data, ad_personalization)."
                    enabled={marketing}
                    onChange={setMarketing}
                  />
                </div>

                <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-start">
                  <button
                    onClick={saveSelection}
                    className={[
                      'inline-flex h-11 w-full items-center justify-center rounded-2xl px-4 text-[12px] font-semibold transition sm:w-auto',
                      'border border-slate-900/15 bg-white/85 text-slate-900 shadow-[0_18px_55px_rgba(15,23,42,0.12)] backdrop-blur',
                      'hover:bg-white hover:translate-y-[-1px] focus:outline-none focus:ring-2 focus:ring-slate-900/10',
                    ].join(' ')}
                  >
                    Auswahl speichern
                  </button>

                  <button
                    onClick={() => setMode('banner')}
                    className="inline-flex h-11 w-full items-center justify-center rounded-2xl border border-slate-900/10 bg-white/75 px-4 text-[12px] font-semibold text-slate-900 shadow-sm backdrop-blur transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10 sm:w-auto"
                  >
                    Zurück
                  </button>
                </div>
              </>
            )}

            <div className="mt-3 text-[11px] text-slate-600">
              Kein Spam · unverbindlich · <span className="font-medium text-slate-900">Made in Germany</span>
            </div>
          </div>

          <div className="pointer-events-none absolute inset-0 rounded-[1.6rem] ring-1 ring-inset ring-white/50" />
        </div>
      </div>

      <style>{`
        .stayfix-consent-sheen{
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(15,23,42,0.05) 35%,
            rgba(15,23,42,0.10) 50%,
            rgba(15,23,42,0.05) 65%,
            transparent 100%
          );
          transform: translateX(-35%);
          animation: consentSheen 9s ease-in-out infinite;
          filter: blur(0.5px);
          will-change: transform, opacity;
          opacity: .55;
        }
        @keyframes consentSheen{
          0%{ transform: translateX(-35%); opacity:0.18; }
          50%{ transform: translateX(0%); opacity:0.42; }
          100%{ transform: translateX(35%); opacity:0.18; }
        }
        @media (prefers-reduced-motion: reduce){
          .stayfix-consent-sheen{ animation:none !important; transform:none !important; }
        }
      `}</style>
    </div>
  )
}

function ToggleRow({
  title,
  description,
  enabled,
  locked,
  onChange,
}: {
  title: string
  description: string
  enabled: boolean
  locked?: boolean
  onChange?: (v: boolean) => void
}) {
  return (
    <div className="rounded-2xl border border-slate-900/10 bg-white/75 p-3 shadow-sm backdrop-blur">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-[12px] font-semibold text-slate-900">{title}</div>
          <div className="mt-1 text-[11px] leading-relaxed text-slate-600">{description}</div>
        </div>

        <button
          type="button"
          disabled={locked}
          onClick={() => onChange?.(!enabled)}
          className={[
            'relative inline-flex h-7 w-12 shrink-0 items-center rounded-full border transition',
            locked ? 'cursor-not-allowed opacity-70' : 'cursor-pointer',
            enabled ? 'border-slate-900/10 bg-emerald-500/60' : 'border-slate-900/10 bg-white/70',
          ].join(' ')}
          aria-pressed={enabled}
          aria-label={`${title} ${enabled ? 'aktiv' : 'inaktiv'}`}
        >
          <span
            className={[
              'inline-block h-6 w-6 translate-x-0.5 rounded-full bg-white shadow-sm transition',
              enabled ? 'translate-x-[1.35rem]' : 'translate-x-0.5',
            ].join(' ')}
          />
        </button>
      </div>
    </div>
  )
}
