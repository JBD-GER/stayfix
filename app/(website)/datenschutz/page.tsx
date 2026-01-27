// src/app/datenschutz/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const CANONICAL_PATH = '/datenschutz'

const COMPANY = {
  brand: 'Stayfix',
  legal: 'Novax Digital GmbH',
  managingDirectors: 'Philipp Polley, Christoph Pfad',
  street: 'Dammstr. 6G',
  zipCity: '30890 Barsinghausen',
  phone: '05035-876470-6',
  email: 'info@stayfix.io',
} as const

const ADDRESS_ONE_LINE = `${COMPANY.legal}, ${COMPANY.street}, ${COMPANY.zipCity}`

const T = {
  metaTitle: 'Datenschutz – Stayfix',
  metaDescription:
    'Datenschutzerklärung der Novax Digital GmbH (Stayfix) – Informationen zur Verarbeitung personenbezogener Daten.',

  badge: 'Datenschutz · Stand: 27.01.2026',
  h1: 'Datenschutzerklärung',
  intro: (
    <>
      Diese Datenschutzerklärung informiert Sie darüber, wie{' '}
      <span className="font-semibold text-slate-900">{COMPANY.brand}</span> ({COMPANY.legal}) personenbezogene Daten
      verarbeitet.
    </>
  ),

  tocTitle: 'Inhalt',
  contactBoxTitle: 'Kontakt',
  legalLinePrefix: 'Rechtliches:',
  imprint: 'Impressum',

  overview: 'Überblick',
  responsible: '1. Verantwortlicher',
  dataTypes: '2. Datenarten & Zwecke',
  legalBasis: '3. Rechtsgrundlagen',
  hosting: '4. Hosting & Server-Logs',
  app: '5. App-Dienste (falls genutzt)',
  contact: '6. Kontaktaufnahme',
  cookies: '7. Cookies & Einwilligung',
  analytics: '8. Analyse/Tracking (optional)',
  thirdCountry: '9. Drittlandübermittlung',
  retention: '10. Speicherdauer',
  rights: '11. Ihre Rechte',
  objection: '12. Widerspruch & Widerruf',
  updates: '13. Änderungen dieser Erklärung',

  // Overview grid labels
  kController: 'Verantwortlicher',
  kContact: 'Kontakt',
  kHosting: 'Hosting',
  kApp: 'App-Dienste',
  kTracking: 'Analyse',
  kConsent: 'Einwilligung',

  vHosting: 'Hosting-Anbieter / Auslieferung / Sicherheits-Logs',
  vApp: 'Optional: Authentifizierung, Datenbank oder Dateiablage (je nach Funktionsumfang)',
  vTracking: 'Optional: Reichweitenmessung / Conversion-Messung',
  vConsent: 'Analyse/Tracking i.d.R. nur nach Consent (wenn so konfiguriert)',

  importantTitle: 'Wichtig',
  importantText:
    'Wir konfigurieren Analyse/Tracking grundsätzlich so, dass es erst nach Ihrer Einwilligung aktiv wird (sofern technisch eingerichtet). Ohne Einwilligung erfolgt nur technisch notwendige Verarbeitung (z. B. Server-Logs).',

  controllerNote: 'Ein Datenschutzbeauftragter ist nicht bestellt, sofern dies nicht gesetzlich erforderlich ist.',

  dataTypesList: [
    {
      b: 'Nutzungs-/Logdaten',
      t: '(z. B. IP-Adresse, Zeitstempel, aufgerufene Seite) zur technischen Bereitstellung & Sicherheit.',
    },
    {
      b: 'Kontakt-/Kommunikationsdaten',
      t: '(z. B. Name, E-Mail, Nachricht) zur Bearbeitung von Anfragen.',
    },
    {
      b: 'Analyse-/Marketingdaten',
      t: '(z. B. Events/Conversions) zur Optimierung – i.d.R. nur nach Einwilligung.',
    },
    {
      b: 'App-Daten',
      t: '(bei Nutzung von App-Funktionen) abhängig von Ihrem Einsatz der Anwendung.',
    },
  ],

  legalBasisList: [
    { b: 'Art. 6 Abs. 1 lit. b DSGVO', t: 'Vertragsdurchführung/Anbahnung (z. B. Anfragen).' },
    { b: 'Art. 6 Abs. 1 lit. f DSGVO', t: 'berechtigtes Interesse (Sicherheit, Stabilität, Missbrauchsprävention).' },
    { b: 'Art. 6 Abs. 1 lit. a DSGVO', t: 'Einwilligung (z. B. Analyse/Marketing/Tracking).' },
  ],

  hostingP1:
    'Zur Auslieferung und Absicherung der Website werden ggf. technisch notwendige Daten verarbeitet (z. B. Server-Logs, IP-Adresse, User-Agent, Referrer, Zeitstempel).',
  hostingP2:
    'Zweck: Bereitstellung der Website, Fehleranalyse, Abwehr von Angriffen, Optimierung der Auslieferung. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO.',

  appP1:
    'Wenn Sie App-Funktionen nutzen (z. B. Accounts/Logins, Datenbankfunktionen, Datei-Uploads), können entsprechende Daten zur Bereitstellung dieser Funktionen verarbeitet werden.',
  appP2:
    'Zweck: Bereitstellung der App-Logik sowie sicherer Betrieb. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO und/oder Art. 6 Abs. 1 lit. f DSGVO.',

  contactP1:
    'Wenn Sie uns kontaktieren (z. B. per E-Mail, Telefon oder Kontaktformular), verarbeiten wir die von Ihnen übermittelten Daten zur Bearbeitung der Anfrage und für Rückfragen.',
  contactP2:
    'Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (vorvertraglich/vertraglich) oder Art. 6 Abs. 1 lit. f DSGVO (allgemeine Kommunikation/Organisation).',

  cookiesP1:
    'Wir verwenden – abhängig von Ihrer Auswahl im Consent-/Cookie-Banner – Cookies bzw. ähnliche Technologien. Technisch notwendige Cookies können ohne Einwilligung gesetzt werden. Analyse/Marketing erfolgt in der Regel nur nach Einwilligung.',

  analyticsP1:
    'Sofern Analyse-/Tracking-Tools eingesetzt werden, dienen diese typischerweise der Reichweitenmessung, Verbesserung der Website und Messung von Conversions. Diese Verarbeitung erfolgt in der Regel nur nach Einwilligung (je nach Konfiguration).',

  thirdCountryP1:
    'Bei der Nutzung von Drittanbieter-Diensten kann eine Verarbeitung von Daten in Drittländern (z. B. USA) nicht ausgeschlossen werden. Wir stützen die Übermittlung – soweit erforderlich – auf geeignete Garantien (z. B. Standardvertragsklauseln und/oder anwendbare Zertifizierungsmechanismen).',

  retentionP1:
    'Wir speichern personenbezogene Daten nur so lange, wie es für die jeweiligen Zwecke erforderlich ist oder gesetzliche Aufbewahrungspflichten bestehen.',

  rightsList: [
    'Auskunft (Art. 15 DSGVO)',
    'Berichtigung (Art. 16 DSGVO)',
    'Löschung (Art. 17 DSGVO)',
    'Einschränkung der Verarbeitung (Art. 18 DSGVO)',
    'Datenübertragbarkeit (Art. 20 DSGVO)',
    'Widerspruch (Art. 21 DSGVO)',
    'Beschwerde bei einer Aufsichtsbehörde (Art. 77 DSGVO)',
  ],

  objectionP1:
    'Sie können eine erteilte Einwilligung jederzeit mit Wirkung für die Zukunft widerrufen. Außerdem können Sie der Verarbeitung auf Grundlage berechtigter Interessen widersprechen, sofern Gründe aus Ihrer besonderen Situation vorliegen.',
  objectionP2Prefix: 'Schreiben Sie uns dazu an ',

  updatesP1:
    'Wir behalten uns vor, diese Datenschutzerklärung anzupassen, wenn sich Rechtslage, Dienste oder Datenverarbeitung ändern. Es gilt die jeweils aktuelle Fassung auf dieser Seite.',

  cta: 'Kontakt aufnehmen →',
} as const

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: T.metaTitle,
    description: T.metaDescription,
    alternates: { canonical: CANONICAL_PATH },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
    openGraph: {
      title: T.metaTitle,
      description: T.metaDescription,
      url: CANONICAL_PATH,
      type: 'website',
      siteName: COMPANY.brand,
      locale: 'de_DE',
    },
    twitter: {
      card: 'summary_large_image',
      title: T.metaTitle,
      description: T.metaDescription,
    },
  }
}

const TOC = [
  { id: 'ueberblick', t: 'Überblick' },
  { id: 'verantwortlicher', t: '1. Verantwortlicher' },
  { id: 'datenarten', t: '2. Datenarten & Zwecke' },
  { id: 'rechtsgrundlagen', t: '3. Rechtsgrundlagen' },
  { id: 'hosting', t: '4. Hosting & Server-Logs' },
  { id: 'app', t: '5. App-Dienste (falls genutzt)' },
  { id: 'kontakt', t: '6. Kontaktaufnahme' },
  { id: 'cookies', t: '7. Cookies & Einwilligung' },
  { id: 'analytics', t: '8. Analyse/Tracking (optional)' },
  { id: 'drittland', t: '9. Drittlandübermittlung' },
  { id: 'speicher', t: '10. Speicherdauer' },
  { id: 'rechte', t: '11. Ihre Rechte' },
  { id: 'widerspruch', t: '12. Widerspruch & Widerruf' },
  { id: 'updates', t: '13. Änderungen dieser Erklärung' },
] as const

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24">
      <h2 className="text-[18px] font-semibold tracking-tight text-slate-900 sm:text-[20px]">{title}</h2>
      <div className="mt-3 space-y-3 text-[13px] leading-relaxed text-slate-700 sm:text-[14px]">{children}</div>
    </section>
  )
}

function InfoRow({ k, v }: { k: string; v: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1 rounded-2xl border border-slate-900/10 bg-white/70 p-4 shadow-sm backdrop-blur sm:flex-row sm:items-start sm:justify-between sm:gap-4">
      <div className="text-[11px] font-medium text-slate-600">{k}</div>
      <div className="text-[12px] font-semibold text-slate-900 sm:text-right">{v}</div>
    </div>
  )
}

export default async function DatenschutzPage() {
  const telHref = `tel:${COMPANY.phone.replace(/\s/g, '')}`
  const mailHref = `mailto:${COMPANY.email}`

  return (
    <main className="relative overflow-hidden bg-white">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-slate-900/10 blur-3xl md:h-[720px] md:w-[720px]" />
        <div className="absolute -top-16 right-[-120px] h-[420px] w-[420px] rounded-full bg-slate-900/8 blur-3xl md:h-[560px] md:w-[560px]" />
        <div className="absolute inset-0 [background-image:linear-gradient(to_right,rgba(15,23,42,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.05)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_72%)]" />
        <div className="absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_70%)]">
          <div className="stayfix-ds-sheen absolute -left-1/2 top-0 h-full w-[200%]" />
        </div>
      </div>

      {/* Header */}
      <header className="relative mx-auto w-full max-w-[1200px] px-4 pt-10 sm:px-6 sm:pt-12">
        <div className="inline-flex items-center gap-2 rounded-full border border-slate-900/10 bg-white/70 px-3 py-1 text-[11px] font-medium text-slate-700 shadow-sm backdrop-blur">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500/70" />
          {T.badge}
        </div>

        <h1 className="mt-4 text-[30px] font-semibold leading-[1.06] tracking-tight text-slate-900 sm:text-[40px] md:text-[46px]">
          {T.h1}
        </h1>

        <p className="mt-3 max-w-[980px] text-[14px] leading-relaxed text-slate-700 sm:text-[15px]">{T.intro}</p>
      </header>

      <div className="relative mx-auto w-full max-w-[1200px] px-4 pb-16 pt-8 sm:px-6 sm:pb-20 sm:pt-10">
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
          {/* TOC */}
          <div className="lg:col-span-4">
            <div className="sticky top-6">
              <div className="relative overflow-hidden rounded-[1.6rem] border border-slate-900/10 bg-white/70 p-5 shadow-sm backdrop-blur-xl">
                <div className="text-[12px] font-semibold text-slate-900">{T.tocTitle}</div>

                <nav className="mt-3 space-y-1.5">
                  {TOC.map((x) => (
                    <a
                      key={x.id}
                      href={`#${x.id}`}
                      className="block rounded-xl border border-transparent px-3 py-2 text-[12px] text-slate-700 transition hover:border-slate-900/10 hover:bg-white/70"
                    >
                      {x.t}
                    </a>
                  ))}
                </nav>

                <div className="mt-4 rounded-2xl border border-slate-900/10 bg-white/70 p-4 text-[11px] leading-relaxed text-slate-700 shadow-sm">
                  <div className="font-semibold text-slate-900">{T.contactBoxTitle}</div>
                  <div className="mt-2 space-y-1.5">
                    <div>
                      E-Mail:{' '}
                      <a className="font-medium text-slate-900 underline underline-offset-2" href={mailHref}>
                        {COMPANY.email}
                      </a>
                    </div>
                    <div>
                      Telefon:{' '}
                      <a className="font-medium text-slate-900 underline underline-offset-2" href={telHref}>
                        {COMPANY.phone}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="mt-4 text-[11px] text-slate-600">
                  {T.legalLinePrefix}{' '}
                  <Link className="font-medium text-slate-900 underline underline-offset-2" href="/impressum">
                    {T.imprint}
                  </Link>
                </div>

                <div className="pointer-events-none absolute inset-0 rounded-[1.6rem] ring-1 ring-inset ring-white/50" />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-8">
            <div className="space-y-6">
              <div className="relative overflow-hidden rounded-[1.8rem] border border-slate-900/10 bg-white/70 p-6 shadow-[0_22px_80px_rgba(15,23,42,0.12)] backdrop-blur-xl sm:p-8">
                <div className="pointer-events-none absolute inset-0 opacity-60">
                  <div className="stayfix-ds-card-sheen absolute -left-1/2 top-0 h-full w-[200%]" />
                </div>

                <div className="relative space-y-10">
                  <Section id="ueberblick" title={T.overview}>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <InfoRow k={T.kController} v={<span>{COMPANY.legal}</span>} />
                      <InfoRow
                        k={T.kContact}
                        v={
                          <span>
                            <a className="underline underline-offset-2" href={mailHref}>
                              {COMPANY.email}
                            </a>{' '}
                            ·{' '}
                            <a className="underline underline-offset-2" href={telHref}>
                              {COMPANY.phone}
                            </a>
                          </span>
                        }
                      />
                      <InfoRow k={T.kHosting} v={<span>{T.vHosting}</span>} />
                      <InfoRow k={T.kApp} v={<span>{T.vApp}</span>} />
                      <InfoRow k={T.kTracking} v={<span>{T.vTracking}</span>} />
                      <InfoRow k={T.kConsent} v={<span>{T.vConsent}</span>} />
                    </div>

                    <div className="mt-4 rounded-2xl border border-slate-900/10 bg-white/70 p-4 text-[12px] leading-relaxed text-slate-700 shadow-sm">
                      <div className="font-semibold text-slate-900">{T.importantTitle}</div>
                      {T.importantText}
                    </div>
                  </Section>

                  <Section id="verantwortlicher" title={T.responsible}>
                    <div className="rounded-2xl border border-slate-900/10 bg-white/70 p-4 shadow-sm">
                      <div className="text-[12px] font-semibold text-slate-900">{COMPANY.legal}</div>
                      <div className="mt-1 text-[12px] text-slate-700">
                        {COMPANY.street}, {COMPANY.zipCity}
                      </div>
                      <div className="mt-2 grid gap-2 text-[12px] text-slate-700 sm:grid-cols-2">
                        <div>
                          Geschäftsführer:{' '}
                          <span className="font-medium text-slate-900">{COMPANY.managingDirectors}</span>
                        </div>
                        <div>
                          E-Mail:{' '}
                          <a className="font-medium text-slate-900 underline underline-offset-2" href={mailHref}>
                            {COMPANY.email}
                          </a>
                        </div>
                      </div>
                    </div>
                    <p>{T.controllerNote}</p>
                  </Section>

                  <Section id="datenarten" title={T.dataTypes}>
                    <ul className="space-y-2">
                      {T.dataTypesList.map((x) => (
                        <li key={x.b}>
                          • <span className="font-semibold text-slate-900">{x.b}</span> {x.t}
                        </li>
                      ))}
                    </ul>
                  </Section>

                  <Section id="rechtsgrundlagen" title={T.legalBasis}>
                    <ul className="space-y-2">
                      {T.legalBasisList.map((x) => (
                        <li key={x.b}>
                          • <span className="font-semibold text-slate-900">{x.b}</span> – {x.t}
                        </li>
                      ))}
                    </ul>
                  </Section>

                  <Section id="hosting" title={T.hosting}>
                    <p>{T.hostingP1}</p>
                    <p>{T.hostingP2}</p>
                  </Section>

                  <Section id="app" title={T.app}>
                    <p>{T.appP1}</p>
                    <p>{T.appP2}</p>
                  </Section>

                  <Section id="kontakt" title={T.contact}>
                    <p>{T.contactP1}</p>
                    <p>{T.contactP2}</p>
                  </Section>

                  <Section id="cookies" title={T.cookies}>
                    <p>{T.cookiesP1}</p>
                  </Section>

                  <Section id="analytics" title={T.analytics}>
                    <p>{T.analyticsP1}</p>
                  </Section>

                  <Section id="drittland" title={T.thirdCountry}>
                    <p>{T.thirdCountryP1}</p>
                  </Section>

                  <Section id="speicher" title={T.retention}>
                    <p>{T.retentionP1}</p>
                  </Section>

                  <Section id="rechte" title={T.rights}>
                    <ul className="space-y-2">
                      {T.rightsList.map((x) => (
                        <li key={x}>• {x}</li>
                      ))}
                    </ul>
                  </Section>

                  <Section id="widerspruch" title={T.objection}>
                    <p>{T.objectionP1}</p>
                    <p>
                      {T.objectionP2Prefix}
                      <a className="font-medium text-slate-900 underline underline-offset-2" href={mailHref}>
                        {COMPANY.email}
                      </a>
                      .
                    </p>
                  </Section>

                  <Section id="updates" title={T.updates}>
                    <p>{T.updatesP1}</p>
                  </Section>

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <Link
                      href="/kontakt"
                      className="inline-flex h-12 w-full items-center justify-center rounded-2xl bg-slate-900 px-6 text-sm font-semibold text-white shadow-[0_18px_55px_rgba(15,23,42,0.22)] transition hover:translate-y-[-1px] hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900/20"
                    >
                      {T.cta}
                    </Link>

                    <div className="text-center text-[11px] text-slate-600 sm:text-right">{ADDRESS_ONE_LINE}</div>
                  </div>
                </div>

                <div className="pointer-events-none absolute inset-0 rounded-[1.8rem] ring-1 ring-inset ring-white/50" />
              </div>

              {/* Bottom Fade */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-28 sm:h-32">
                <div className="absolute inset-0 stayfix-ds-bottom-fade" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .stayfix-ds-bottom-fade{
          background: linear-gradient(
            to top,
            #ffffff 0%,
            rgba(255,255,255,0.92) 55%,
            rgba(255,255,255,0.0) 100%
          );
        }

        .stayfix-ds-sheen{
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(15,23,42,0.05) 35%,
            rgba(15,23,42,0.10) 50%,
            rgba(15,23,42,0.05) 65%,
            transparent 100%
          );
          transform: translateX(-35%);
          animation: dsSheen 10s ease-in-out infinite;
          filter: blur(0.5px);
          will-change: transform, opacity;
        }
        @keyframes dsSheen{
          0%{ transform: translateX(-35%); opacity:0.30; }
          50%{ transform: translateX(0%); opacity:0.60; }
          100%{ transform: translateX(35%); opacity:0.30; }
        }

        .stayfix-ds-card-sheen{
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(15,23,42,0.05) 35%,
            rgba(15,23,42,0.10) 50%,
            rgba(15,23,42,0.05) 65%,
            transparent 100%
          );
          transform: translateX(-35%);
          animation: dsCardSheen 9s ease-in-out infinite;
          filter: blur(0.5px);
          will-change: transform, opacity;
        }
        @keyframes dsCardSheen{
          0%{ transform: translateX(-35%); opacity:0.22; }
          50%{ transform: translateX(0%); opacity:0.48; }
          100%{ transform: translateX(35%); opacity:0.22; }
        }

        @media (prefers-reduced-motion: reduce){
          .stayfix-ds-sheen,
          .stayfix-ds-card-sheen{
            animation: none !important;
            transform: none !important;
          }
        }
      `}</style>
    </main>
  )
}
