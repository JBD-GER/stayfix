// app/(website)/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import type { SVGProps } from 'react'

const PRIMARY = '#3B5BFF'

export const metadata: Metadata = {
  title: 'Stayfix – Aufenthaltstitel & Arbeitserlaubnisse automatisiert im Blick',
  description:
    'Stayfix ist die spezialisierte HR-Lösung für Aufenthaltstitel & Arbeitserlaubnisse: Organigramm abbilden, Zuständigkeiten definieren, Reminder automatisieren – sauber, nachvollziehbar, audit-freundlich.',
  keywords: [
    'Aufenthaltstitel verwalten',
    'Arbeitserlaubnis verwalten',
    'Visa Management Unternehmen',
    'HR Software Aufenthaltstitel',
    'Aufenthaltstitel Reminder',
    'Fristenüberwachung Aufenthaltstitel',
    'Compliance Aufenthaltstitel',
    'Stayfix',
  ],
  alternates: { canonical: '/' },
}

function cn(...c: Array<string | false | null | undefined>) {
  return c.filter(Boolean).join(' ')
}

/* Icons */
function IconSpark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M12 2l1.4 6.2L20 12l-6.6 3.8L12 22l-1.4-6.2L4 12l6.6-3.8L12 2z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  )
}
function IconShield(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M12 2l8 4v7c0 5-3.4 9.1-8 10-4.6-.9-8-5-8-10V6l8-4z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path d="M8.5 12l2.2 2.2L15.8 9" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}
function IconBell(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M18 8a6 6 0 10-12 0c0 7-3 7-3 7h18s-3 0-3-7z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path d="M10 19a2 2 0 004 0" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}
function IconOrg(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M8 7a3 3 0 106 0 3 3 0 00-6 0z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path d="M5 22v-2a5 5 0 0110 0v2" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M17 10.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path d="M16 22v-2c0-1.6.7-3 1.8-4" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}
function IconBolt(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M13 2L4 14h7l-1 8 10-14h-7l0-6z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  )
}
function IconChecklist(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M9 6h12M9 12h12M9 18h12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M3.5 6l1.2 1.2L7.2 4.7M3.5 12l1.2 1.2L7.2 10.7M3.5 18l1.2 1.2L7.2 16.7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
function IconClock(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M12 22a10 10 0 110-20 10 10 0 010 20z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M12 6v6l4 2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
function IconLock(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M7 11V8a5 5 0 0110 0v3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M6.5 11h11A2.5 2.5 0 0120 13.5v5A3.5 3.5 0 0116.5 22h-9A3.5 3.5 0 014 18.5v-5A2.5 2.5 0 016.5 11z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path d="M12 16v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}
function IconArrow(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M5 12h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path
        d="M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

const ui = {
  // Page
  wrap: 'mx-auto max-w-6xl px-2 pb-16 pt-6 sm:px-6 sm:pt-10 lg:px-8 lg:pt-14',
  sectionTitle: 'text-xl font-semibold tracking-tight text-slate-900',
  sectionLead: 'mt-2 max-w-2xl text-sm leading-relaxed text-slate-600',

  // Glass
  card: 'rounded-3xl border border-white/60 bg-white/70 shadow-sm backdrop-blur-xl',
  cardStrong:
    'rounded-3xl border border-white/60 bg-white/80 shadow-[0_18px_55px_rgba(15,23,42,0.10)] backdrop-blur-xl',
  soft: 'rounded-2xl border border-slate-200/70 bg-white/60 shadow-sm backdrop-blur-xl',

  // Buttons
  ghostBtn:
    'inline-flex items-center justify-center gap-2 rounded-full border border-slate-200/80 bg-white/70 px-5 py-2.5 text-sm font-medium text-slate-900 ring-1 ring-inset ring-white/35 shadow-sm hover:bg-white/90 hover:border-slate-300 hover:shadow-md active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-slate-200',
  primaryBtn:
    'inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:opacity-95 active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-slate-200',

  // Pills
  pill:
    'inline-flex items-center gap-2 rounded-full border border-slate-200/70 bg-white/70 px-3 py-1 text-[11px] font-medium text-slate-700 ring-1 ring-inset ring-white/35 backdrop-blur-xl',

  // Small text
  micro: 'text-[11px] text-slate-500',
}

function StatCard(props: { label: string; value: string; sub: string }) {
  return (
    <div className="rounded-2xl border border-slate-200/70 bg-white/60 px-4 py-3 shadow-sm backdrop-blur-xl">
      <p className="text-[11px] font-medium text-slate-700">{props.label}</p>
      <p className="mt-1 text-2xl font-semibold text-slate-900">{props.value}</p>
      <p className="mt-1 text-[10px] text-slate-500">{props.sub}</p>
    </div>
  )
}

/**
 * ✅ Fix für "Cannot find namespace 'JSX'"
 * -> kein JSX.Element im Typ verwenden, sondern React.ReactNode
 * (und React import ist in Next App Router nicht nötig)
 */
function FeatureCard(props: {
  icon: (p: SVGProps<SVGSVGElement>) => React.ReactNode
  title: string
  text: string
}) {
  const Icon = props.icon
  return (
    <div className={cn(ui.card, 'p-5')}>
      <div className="flex items-center gap-3">
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200/70 bg-white/70 ring-1 ring-inset ring-white/35">
          <Icon className="h-5 w-5 text-slate-800" />
        </div>
        <h3 className="text-sm font-semibold text-slate-900">{props.title}</h3>
      </div>
      <p className="mt-3 text-xs leading-relaxed text-slate-600">{props.text}</p>
    </div>
  )
}

export default function WebsiteHomePage() {
  return (
    <main className={ui.wrap}>
      {/* subtle background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-24 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-slate-200/50 blur-3xl sm:-top-40 sm:h-[680px] sm:w-[680px]" />
        <div
          className="absolute -top-10 right-[-140px] h-[420px] w-[420px] rounded-full blur-3xl"
          style={{ backgroundColor: `${PRIMARY}20` }}
        />
      </div>

      {/* HERO */}
      <section className="grid gap-8 md:grid-cols-2 md:items-center md:gap-10">
        {/* Copy */}
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className={ui.pill}>
              <IconOrg className="h-4 w-4 text-slate-700" />
              Organigramm-Logik
            </span>
            <span className={ui.pill}>
              <IconBell className="h-4 w-4 text-slate-700" />
              E-Mail-Reminder
            </span>
            <span className={ui.pill}>
              <IconShield className="h-4 w-4 text-slate-700" />
              Audit-freundlich
            </span>
          </div>

          <h1 className="mt-5 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
            Aufenthaltstitel &amp; Arbeitserlaubnisse
            <br className="hidden sm:block" />
            zuverlässig im Blick – automatisch erinnert.
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-600 md:text-base">
            Stayfix macht Fristen, Zuständigkeiten und Eskalationen glasklar – ohne Excel-Chaos. Ein fokussiertes System,
            das im Hintergrund zuverlässig läuft.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <Link
              href="/beratung"
              className={cn(ui.primaryBtn, 'w-full sm:w-auto')}
              style={{ backgroundColor: PRIMARY }}
            >
              Beratungstermin buchen <IconArrow className="h-4 w-4" />
            </Link>
            <Link href="/kontakt" className={cn(ui.ghostBtn, 'w-full sm:w-auto')}>
              Kontakt
            </Link>
            <span className={ui.micro}>15–20 Minuten. Unverbindlich.</span>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-2 text-[11px] text-slate-600">
            <span className={ui.pill}>
              <IconSpark className="h-4 w-4 text-slate-700" />
              Fokus: HR, Compliance, Teamleads
            </span>
            <span className={ui.pill}>
              <IconLock className="h-4 w-4 text-slate-700" />
              DSGVO-freundliches Setup
            </span>
            <span className={ui.pill}>
              <IconClock className="h-4 w-4 text-slate-700" />
              Frühwarnung statt Stress
            </span>
          </div>

          {/* Trust mini */}
          <div className="mt-6">
            <div className={cn(ui.soft, 'p-4')}>
              <p className="text-xs font-semibold text-slate-900">Typisches Problem</p>
              <p className="mt-1 text-xs leading-relaxed text-slate-600">
                Fristen liegen in E-Mails, Kalendern und Excel-Listen – niemand weiß sicher, wer wann handeln muss.
                Stayfix bündelt alles in einer Logik:{' '}
                <span className="font-medium text-slate-900">
                  Person → Dokument → Regel → Verantwortliche → Eskalation.
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Visual (❗️mobil ausblenden, damit nix überlappt) */}
        <div className={cn('relative hidden overflow-hidden md:block', ui.cardStrong, 'h-[520px]')}>
          <div className="absolute inset-0">
            <Image
              src="/website_start.jpg"
              alt="Stayfix – HR-Workflow mit internationalen Mitarbeitenden"
              fill
              sizes="(min-width: 1024px) 28rem, (min-width: 768px) 22rem, 100vw"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/0 to-white/70" />
          </div>

          {/* Overlay mock */}
          <div className="absolute inset-x-6 bottom-6 grid gap-3">
            <div className={cn(ui.soft, 'px-4 py-3')}>
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <IconBolt className="h-4 w-4 text-slate-800" />
                    <div className="truncate text-xs font-medium text-slate-900">Täglicher Fristen-Check</div>
                  </div>
                  <p className="mt-1 text-[11px] text-slate-600">Reminder laufen nach Ihren Regeln – inkl. Eskalation.</p>
                </div>
                <span className="shrink-0 rounded-full bg-white/70 px-2.5 py-1 text-[11px] font-medium text-slate-700 ring-1 ring-inset ring-white/35">
                  automatisch
                </span>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <StatCard label="Bald fällig" value="9" sub="nächste 90 Tage" />
              <StatCard label="Kritisch" value="2" sub="sofort prüfen" />
              <StatCard label="Im Blick" value="128" sub="Dokumente gepflegt" />
            </div>

            <div className={cn(ui.soft, 'px-4 py-3')}>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-[11px] font-medium text-slate-700">Beispiel-Logik</p>
                <span className="rounded-full border border-slate-200/70 bg-white/70 px-2.5 py-1 text-[10px] font-medium text-slate-700 ring-1 ring-inset ring-white/35">
                  90 / 60 / 30 / 14 / 7 Tage
                </span>
              </div>
              <p className="mt-1 text-[11px] text-slate-600">Erst intern, dann Teamlead, dann HR – je nach Stufe &amp; Dokument.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Value bar */}
      <section className="mt-10">
        <div className={cn(ui.card, 'px-4 py-5 sm:px-7')}>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { icon: IconBolt, title: 'Weniger Risiko', text: 'Kritische Fälle werden früh sichtbar – bevor es brennt.' },
              { icon: IconChecklist, title: 'Nachvollziehbar', text: 'Wer wann informiert wurde, ist sauber dokumentiert.' },
              { icon: IconOrg, title: 'Klar verteilt', text: 'Zuständigkeiten folgen Ihrer Struktur – nicht dem Zufall.' },
            ].map((k) => (
              <div key={k.title} className="flex items-start gap-3">
                <div className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-2xl border border-slate-200/70 bg-white/70 ring-1 ring-inset ring-white/35">
                  <k.icon className="h-5 w-5 text-slate-800" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{k.title}</p>
                  <p className="mt-1 text-xs text-slate-600">{k.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ablauf */}
      <section id="ablauf" className="mt-16 space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className={ui.sectionTitle}>So läuft es in der Praxis</h2>
            <p className={ui.sectionLead}>
              Ein schlanker Ablauf, damit Sie schnell auf „sauber &amp; zuverlässig“ kommen.
            </p>
          </div>
          <Link
            href="/beratung"
            className="text-xs font-medium text-slate-700 underline underline-offset-4 hover:text-slate-900"
          >
            Termin buchen
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {[
            { step: '01', title: 'Struktur klären', text: 'Welche Rollen gibt es? Wer soll informiert werden – und wann eskaliert es?' },
            { step: '02', title: 'Daten minimal erfassen', text: 'Pro Person: Dokumenttyp, Nummer, Behörde, Ablaufdatum, Notizen. Mehr nicht.' },
            { step: '03', title: 'Reminder laufen lassen', text: 'Stayfix erinnert automatisch nach Ihren Regeln – mit sauberem Verlauf.' },
          ].map((s) => (
            <div key={s.step} className={cn(ui.cardStrong, 'p-6')}>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-slate-500">Schritt {s.step}</span>
                <span className="rounded-full px-2.5 py-1 text-[10px] font-medium text-white" style={{ backgroundColor: PRIMARY }}>
                  schlank
                </span>
              </div>
              <p className="mt-2 text-sm font-semibold text-slate-900">{s.title}</p>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Funktionen */}
      <section id="funktionen" className="mt-16 space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className={ui.sectionTitle}>Das deckt Stayfix ab</h2>
            <p className={ui.sectionLead}>Genau so viel wie nötig – ohne Suite-Ballast.</p>
          </div>
          <Link
            href="/funktionen"
            className="text-xs font-medium text-slate-700 underline underline-offset-4 hover:text-slate-900"
          >
            Alle Funktionen
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <FeatureCard
            icon={IconChecklist}
            title="Dokumente & Fristen"
            text="Ablaufdatum, Nummer, Behörde, Hinweise – sauber pro Person. Filter & Priorisierung inklusive."
          />
          <FeatureCard
            icon={IconBell}
            title="Reminder-Logik"
            text="Mehrstufige Benachrichtigungen inkl. Eskalation – nach Ihren Regeln (Zeitpunkte & Empfänger)."
          />
          <FeatureCard
            icon={IconOrg}
            title="Zuständigkeiten"
            text="Zuweisung folgt Ihrer Struktur: HR, Teamlead, Stellvertretung – jederzeit nachvollziehbar."
          />
          <FeatureCard
            icon={IconShield}
            title="Nachweis & Verlauf"
            text="Audit-freundlich: Ereignisse, Erinnerungen und Statusänderungen sind sauber dokumentiert."
          />
          <FeatureCard
            icon={IconClock}
            title="Frühwarnsystem"
            text="Kritisch wird zuerst sichtbar: „bald fällig“, „kritisch“, „überfällig“ – ohne Suchen."
          />
          <FeatureCard
            icon={IconLock}
            title="Sauberer Zugriff"
            text="Rollen & Sichtbarkeit: Nur wer muss, sieht was er braucht – passend für HR & Führung."
          />
        </div>
      </section>

      {/* Security / Compliance Teaser */}
      <section className="mt-16">
        <div className={cn(ui.card, 'p-6 sm:p-7')}>
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div className="max-w-2xl">
              <h2 className={ui.sectionTitle}>Compliance, ohne Overhead</h2>
              <p className={ui.sectionLead}>
                Stayfix ist bewusst fokussiert – damit Sie schneller sauber sind, statt eine Suite „einzuführen“.
              </p>

              {/* ✅ neu geschrieben + Duplikate entfernt */}
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {[
                  {
                    icon: IconShield,
                    title: 'Lückenloser Verlauf',
                    text: 'Änderungen, Erinnerungen und Statusupdates sind jederzeit nachvollziehbar.',
                  },
                  {
                    icon: IconLock,
                    title: 'Rollenbasierter Zugriff',
                    text: 'Nur die richtigen Personen sehen die Informationen, die sie brauchen.',
                  },
                  {
                    icon: IconChecklist,
                    title: 'Saubere Struktur',
                    text: 'Einheitlich aufgebaut: Person → Dokument → Regel → Status.',
                  },
                  {
                    icon: IconClock,
                    title: 'Automatische Eskalation',
                    text: 'Je näher die Frist rückt, desto höher wird automatisch eskaliert – nach Ihren Stufen.',
                  },
                ].map((i) => (
                  <div key={i.title} className={cn(ui.soft, 'p-4')}>
                    <div className="flex items-center gap-2">
                      <i.icon className="h-4 w-4 text-slate-800" />
                      <p className="text-xs font-semibold text-slate-900">{i.title}</p>
                    </div>
                    <p className="mt-1 text-xs text-slate-600">{i.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full md:w-[320px]">
              <div className={cn(ui.cardStrong, 'p-5')}>
                <p className="text-xs font-semibold text-slate-900">Schnellstart</p>
                <p className="mt-2 text-xs leading-relaxed text-slate-600">
                  Perfekt, wenn Sie heute bereits Mitarbeitende mit Aufenthaltstiteln betreuen – und weg von Excel wollen.
                </p>

                <div className="mt-4 space-y-2">
                  {['1–2 Verantwortliche definieren', 'Dokumenttypen & Reminder-Stufen festlegen', 'Erste Personen & Fristen importieren'].map(
                    (t) => (
                      <div key={t} className="flex items-start gap-2 text-xs text-slate-700">
                        <span
                          className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full text-white"
                          style={{ backgroundColor: PRIMARY }}
                        >
                          <span className="text-[11px] leading-none">✓</span>
                        </span>
                        <span>{t}</span>
                      </div>
                    )
                  )}
                </div>

                <div className="mt-5">
                  <Link href="/beratung" className={cn(ui.primaryBtn, 'w-full')} style={{ backgroundColor: PRIMARY }}>
                    Termin buchen <IconArrow className="h-4 w-4" />
                  </Link>
                  <p className="mt-2 text-[11px] text-slate-500">Unverbindlich. Kein Demo-Verkauf.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="mt-16">
        <div className={cn(ui.cardStrong, 'px-6 py-7 sm:px-8 sm:py-9')}>
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold tracking-tight text-slate-900">Lassen Sie uns Ihren Prozess kurz sauber ziehen.</h2>
              <p className="mt-2 max-w-2xl text-sm text-slate-600">
                Ein Gespräch, klare Empfehlung – und Sie wissen genau, wie Sie Fristen &amp; Zuständigkeiten zuverlässig abdecken.
              </p>
            </div>

            <div className="flex flex-col gap-2 sm:items-end">
              <Link href="/beratung" className={cn(ui.primaryBtn, 'w-full sm:w-auto')} style={{ backgroundColor: PRIMARY }}>
                Beratungstermin buchen <IconArrow className="h-4 w-4" />
              </Link>
              <span className={ui.micro}>Unverbindlich. Kein Demo-Verkauf.</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
    </main>
  )
}
