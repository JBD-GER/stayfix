import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Projektabschlussbericht - Stayfix',
  description:
    'Projektabschlussbericht fuer die Foerderung: umgesetzte Funktionen, technische Architektur und Nachhaltigkeitsaspekte von Stayfix.',
  alternates: { canonical: '/projektabschluss' },
  robots: { index: true, follow: true },
}

type FundingText = {
  id: string
  title: string
  limit: number
  text: string
}

type ModuleImage = {
  src: string
  title: string
  route: string
  detail: string
}

type RouteDetail = {
  route: string
  title: string
  fachlich: string
  technisch: string
}

const FUNDING_TEXTS: FundingText[] = [
  {
    id: 'content',
    title: '1) Umgesetzter Inhalt innerhalb des Projekts',
    limit: 1500,
    text:
      'Im Projekt Stayfix wurde ein webbasierter MVP zur Verwaltung von Aufenthaltstiteln von Mitarbeitenden umgesetzt. Die Anwendung deckt den gesamten Kernprozess ab: Mitarbeitendenprofile anlegen, Aufenthaltstitel erfassen und verwalten, Fristen beobachten, Dokumente strukturiert speichern und Status transparent darstellen. Erfasst werden Titeltyp, Nummer, Ausstellungs- und Ablaufdatum, Auflagen/Beschraenkungen, zustaendige Behoerde sowie optionale Felder wie Vorrangpruefung und Zustimmungscode. Im Dashboard sind Suche, Filter und Priorisierung integriert (z. B. gueltig, laeuft bald ab, abgelaufen). Detailansichten unterstuetzen die Fallbearbeitung mit nachvollziehbarem Status. Fuer Fristen wurden automatisierte Reminder mit Eskalationslogik umgesetzt, damit Mitarbeitende und Verantwortliche rechtzeitig informiert werden. Zusaetzlich wurden Datenschutz und Sicherheit von Anfang an beruecksichtigt: rollenbasierte Zugriffe, Ownership-Pruefungen pro Datensatz, datensparsame Felder, sichere Upload-Pfade und DSGVO-konforme Verarbeitung.',
  },
  {
    id: 'sustainability',
    title: '2) Realisierte Aspekte oekonomischer, sozialer oder oekologischer Nachhaltigkeit',
    limit: 500,
    text:
      'Green Coding wurde durchgaengig angewendet: schlanke Datenmodelle, effiziente Abfragen mit user_id-Filterung, gezielte Sortierung, minimale Payloads, Parallelisierung mit Promise.all und Vermeidung unnoetiger Dauerprozesse. Oekonomisch reduziert Stayfix manuellen Aufwand und Fristversaeumnisse durch Automatisierung. Sozial verbessert die Loesung die Zusammenarbeit zwischen HR, Fuehrung und Mitarbeitenden durch klare Verantwortlichkeiten und verlaessliche Erinnerungen.',
  },
  {
    id: 'effects',
    title: '3) Weitere realisierte positive Effekte des umgesetzten Projekts',
    limit: 500,
    text:
      'Stayfix senkt das Risiko von Arbeitsunterbrechungen und Bussgeldern durch fruehe Fristwarnungen. Die zentrale Datenstruktur erhoeht Transparenz und reduziert Abstimmungsaufwand zwischen Rollen. Durch dokumentierte Statuslogik, nachvollziehbare Aenderungen und zentrale Dokumentenablage steigt die Prozessqualitaet. Die Architektur ist skalierbar und bildet die Grundlage fuer weitere Module wie Reporting, erweiterte Rollenmodelle und feinere Benachrichtigungsregeln.',
  },
]

const MODULE_IMAGES: ModuleImage[] = [
  {
    src: '/dashboard.png',
    title: 'Dashboard Uebersicht',
    route: '/dashboard',
    detail: 'KPI-Board, Fristrisiken und priorisierte Handlungsfaelle fuer HR und Compliance.',
  },
  {
    src: '/mitarbeiter.png',
    title: 'Mitarbeitenden-Modul',
    route: '/dashboard/mitarbeitende',
    detail: 'Suche, Filter und Statusmanagement fuer alle Personen mit dokumentierten Aufenthaltstiteln.',
  },
  {
    src: '/mitarbeiteransicht.png',
    title: 'Mitarbeitenden-Detailansicht',
    route: '/dashboard/mitarbeitende/[id]/ansicht',
    detail: 'Serverseitige Einzelansicht mit Stammdaten, Titelbezug und nachvollziehbarer Fallstruktur.',
  },
  {
    src: '/aufenthaltstitel.png',
    title: 'Aufenthaltstitel-Konfiguration',
    route: '/dashboard/aufenthaltstitel',
    detail: 'Titeltypen inklusive Pflichtfeldlogik fuer Dokumentnummer, Fristen, Behoerden und Nachweise.',
  },
  {
    src: '/benachrichtigungsregel.png',
    title: 'Benachrichtigungsregeln',
    route: '/dashboard/benachrichtigung',
    detail: 'Mehrstufige Reminder-Phasen mit Offsets, Empfaengergruppen und Eskalationslogik.',
  },
  {
    src: '/organigramm.png',
    title: 'Organigramm',
    route: '/dashboard/organigramm',
    detail: 'Abbildung der Unternehmensstruktur mit Parent-Child-Logik und Sortierung pro Ebene.',
  },
  {
    src: '/backend.png',
    title: 'Backend-Struktur',
    route: '/api/*',
    detail: 'Route Handler in Next.js mit Validierung, Ownership-Pruefungen und API-Schnittstellen.',
  },
  {
    src: '/datenbank.png',
    title: 'Datenbankmodell',
    route: 'Supabase Postgres',
    detail: 'Relationale Tabellen fuer Mitarbeitende, Titel, Regeln, Phasen und Empfaenger.',
  },
]

const WEBSITE_ROUTES: RouteDetail[] = [
  {
    route: '/',
    title: 'Startseite',
    fachlich:
      'Positioniert Stayfix, erklaert Nutzen und fuehrt ueber klare CTA-Pfade zu Beratung und Erstgespraech.',
    technisch:
      'Serverseitig gerenderte Marketingseite mit modularem UI, SEO-Metadaten und optimierten Bild-Assets.',
  },
  {
    route: '/ablauf',
    title: 'Ablauf',
    fachlich:
      'Beschreibt Einfuehrung und Onboarding in klaren Schritten von Erstgespraech bis produktivem Einsatz.',
    technisch:
      'Strukturierte Informationsseite mit semantischen Sections und internem Linking auf Beratungs-CTA.',
  },
  {
    route: '/funktionen',
    title: 'Funktionen',
    fachlich:
      'Zeigt den konkreten Produktumfang fuer Titelverwaltung, Reminder und Compliance-Prozesse.',
    technisch:
      'Feature-basierte Inhaltsstruktur mit wiederverwendbaren UI-Bloecken und performantem Rendering.',
  },
  {
    route: '/haeufige-fragen',
    title: 'FAQ',
    fachlich:
      'Beantwortet wiederkehrende Fragen zu Einsatz, Datenschutz, Integrationen und Betrieb.',
    technisch:
      'Interaktive Accordion-Elemente ohne externe Abhaengigkeiten, barrierearm und leicht pflegbar.',
  },
  {
    route: '/beratung',
    title: 'Beratung und Registrierung',
    fachlich:
      'Einstieg fuer Registrierung per Einladung, Erfassung der Anfrage und Klarstellung des Onboarding-Prozesses.',
    technisch:
      'Clientseitiges Formular mit Pflichtfeldlogik, Spam-Honeypot und API-Submission fuer Lead-Erfassung.',
  },
  {
    route: '/login',
    title: 'Login',
    fachlich:
      'Zentraler Zugangspunkt fuer Bestandsnutzerinnen und -nutzer mit Verweis auf den Registrierungsweg.',
    technisch:
      'Auth-Formular mit Supabase Session-Cookies, Fehlerhandling und Redirect in das Dashboard.',
  },
  {
    route: '/datenschutz',
    title: 'Datenschutz',
    fachlich:
      'DSGVO-relevante Informationen zu Verarbeitung, Rechtsgrundlagen, Speicherfristen und Betroffenenrechten.',
    technisch:
      'Langform-Content mit Inhaltsverzeichnis, semantischen Anchor-Sections und dynamischer Metadatensteuerung.',
  },
  {
    route: '/impressum',
    title: 'Impressum',
    fachlich:
      'Rechtliche Pflichtangaben des Anbieters inklusive Handelsregister- und Kontaktinformationen.',
    technisch:
      'Klare Informationsarchitektur mit strukturierter Ausgabe und konsistentem UI zur Datenschutzseite.',
  },
  {
    route: '/projektabschluss',
    title: 'Projektabschlussbericht',
    fachlich:
      'Dokumentiert fuer die Foerderung den Ergebnisstand, die Wirkung und den technischen Umsetzungsrahmen.',
    technisch:
      'Neue Dokumentationsseite mit Bildbezug, Zeichenzahlkontrolle und detailierter Seiten-/Architekturaufbereitung.',
  },
]

const DASHBOARD_ROUTES: RouteDetail[] = [
  {
    route: '/dashboard',
    title: 'Dashboard Uebersicht',
    fachlich:
      'Zentraler Arbeitsstart mit KPIs, Fristenfenstern, kritischen Faellen und Datenqualitaetsindikatoren.',
    technisch:
      'Breites KPI-Layout als skalierbares Fundament fuer echte Live-Metriken aus Datenbank und Reminder-Engine.',
  },
  {
    route: '/dashboard/mitarbeitende',
    title: 'Mitarbeitenden-Liste',
    fachlich:
      'Operative Hauptseite zur Verwaltung, Suche und Filterung aller Mitarbeitendenfaelle.',
    technisch:
      'Paralleles Laden mehrerer API-Ressourcen, clientseitige Filterlogik und Statusklassifizierung.',
  },
  {
    route: '/dashboard/mitarbeitende/neu',
    title: 'Mitarbeitende neu',
    fachlich:
      'Anlage neuer Profile inklusive Titelbezug, Pflichtdaten und Dokumentstrukturen.',
    technisch:
      'Wiederverwendung eines gemeinsamen Form-Components im Create-Modus fuer konsistente Datenqualitaet.',
  },
  {
    route: '/dashboard/mitarbeitende/[id]',
    title: 'Mitarbeitende bearbeiten',
    fachlich:
      'Aktualisierung bestehender Faelle und Nachpflege von Fristen, Status und Organisationszuordnung.',
    technisch:
      'Selber Form-Component im Edit-Modus mit ID-basierter Datenbindung und sicherem Update-Flow.',
  },
  {
    route: '/dashboard/mitarbeitende/[id]/ansicht',
    title: 'Mitarbeitenden-Ansicht',
    fachlich:
      'Lesende Fallansicht fuer schnelle Pruefung einzelner Datensaetze und Dokumentenstaende.',
    technisch:
      'Serverseitige Datenabfrage mit Auth-Check und Redirect, dadurch weniger clientseitige Angriffsoberflaeche.',
  },
  {
    route: '/dashboard/aufenthaltstitel',
    title: 'Aufenthaltstitel',
    fachlich:
      'Konfiguriert Titeltypen und Pflichtfelder, damit Datenerfassung je Rechtsgrundlage sauber bleibt.',
    technisch:
      'CRUD-UI auf `residence_titles` mit Feld-Metalogik, Aktiv-Flags und Sortierreihenfolge.',
  },
  {
    route: '/dashboard/benachrichtigung',
    title: 'Benachrichtigungen',
    fachlich:
      'Definiert Reminder-Regeln inkl. Zeitpunkten, Eskalationen und empfaengerbezogener Steuerung.',
    technisch:
      'Mehrtabellen-Workflow (`rules`, `phases`, `recipients`) mit Offset-Berechnung und Ownership-Validierung.',
  },
  {
    route: '/dashboard/organigramm',
    title: 'Organigramm',
    fachlich:
      'Bildet Verantwortlichkeiten im Unternehmen ab und verknuepft sie mit Benachrichtigungswegen.',
    technisch:
      'Tree-Building aus flachen Relationen, Parent-Level-Logik und Reorder-API fuer stabile Hierarchie.',
  },
]

const API_MODULES = [
  '/api/login',
  '/api/me',
  '/api/employees',
  '/api/employees/documents',
  '/api/residence-titles',
  '/api/org-units (+ /reorder)',
  '/api/notification-rules + /api/notification-profiles',
]

const DATA_MODEL = [
  'employees',
  'residence_titles',
  'org_units',
  'notification_rules',
  'notification_rule_phases',
  'notification_rule_recipients',
  'notification_profiles',
]

function charsMeta(text: string, limit: number) {
  const used = text.length
  const left = limit - used
  return { used, left, ok: left >= 0 }
}

function CharacterBox({ item }: { item: FundingText }) {
  const meta = charsMeta(item.text, item.limit)

  return (
    <article className="rounded-3xl border border-slate-900/10 bg-white/80 p-5 shadow-sm backdrop-blur sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-[16px] font-semibold tracking-tight text-slate-900 sm:text-[18px]">{item.title}</h2>
        <span
          className={[
            'inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-medium',
            meta.ok ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700',
          ].join(' ')}
        >
          {meta.used} / {item.limit} Zeichen
        </span>
      </div>
      <p className="mt-3 text-[13px] leading-relaxed text-slate-700 sm:text-[14px]">{item.text}</p>
    </article>
  )
}

function RouteCard({ item }: { item: RouteDetail }) {
  return (
    <article className="rounded-2xl border border-slate-900/10 bg-white/75 p-4 shadow-sm backdrop-blur">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-[13px] font-semibold text-slate-900">{item.title}</h3>
        <code className="rounded-full border border-slate-900/10 bg-white px-2 py-0.5 text-[10px] text-slate-600">
          {item.route}
        </code>
      </div>
      <p className="mt-2 text-[12px] leading-relaxed text-slate-700">
        <span className="font-medium text-slate-900">Fachlich:</span> {item.fachlich}
      </p>
      <p className="mt-1 text-[12px] leading-relaxed text-slate-700">
        <span className="font-medium text-slate-900">Technisch:</span> {item.technisch}
      </p>
    </article>
  )
}

export default function ProjektabschlussPage() {
  const totalPages = WEBSITE_ROUTES.length + DASHBOARD_ROUTES.length
  const totalImages = MODULE_IMAGES.length + 1
  const totalApiModules = API_MODULES.length

  return (
    <main className="relative overflow-hidden bg-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-36 left-1/2 h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-slate-900/10 blur-3xl md:h-[760px] md:w-[760px]" />
        <div className="absolute right-[-120px] top-24 h-[420px] w-[420px] rounded-full bg-[#3B5BFF]/12 blur-3xl" />
        <div className="absolute left-[-120px] top-[45%] h-[360px] w-[360px] rounded-full bg-emerald-500/12 blur-3xl" />
        <div className="absolute inset-0 [background-image:linear-gradient(to_right,rgba(15,23,42,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.05)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_38%,transparent_72%)]" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-4 pb-16 pt-10 sm:px-6 sm:pt-12 lg:px-8">
        <section className="relative overflow-hidden rounded-[2rem] border border-slate-900/10 bg-white/75 p-6 shadow-[0_24px_90px_rgba(15,23,42,0.14)] backdrop-blur-xl sm:p-8">
          <div className="absolute inset-0">
            <Image
              src="/website_start.jpg"
              alt="Stayfix Projektabschluss"
              fill
              priority
              className="object-cover opacity-16"
              sizes="(min-width: 1024px) 1024px, 100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-white/85 via-white/80 to-white/92" />
          </div>

          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-900/10 bg-white/85 px-3 py-1 text-[11px] font-medium text-slate-700 shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-[#3B5BFF]" />
              Projektabschlussbericht - Foerderprojekt Stayfix
            </span>

            <h1 className="mt-4 max-w-4xl text-[30px] font-semibold leading-[1.07] tracking-tight text-slate-900 sm:text-[40px] md:text-[46px]">
              Ergebnisbericht: Funktionsumfang, technische Umsetzung und Nachhaltigkeit
            </h1>

            <p className="mt-3 max-w-3xl text-[14px] leading-relaxed text-slate-700 sm:text-[15px]">
              Die Software wurde vollstaendig intern umgesetzt. Hosting erfolgt ueber Vercel, Datenbank, Authentifizierung
              und Kernlogik ueber Supabase. Serverstandort ist Frankfurt am Main, ebenso die Supabase-Region.
            </p>

            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <Metric title="Dokumentierte Seiten" value={String(totalPages)} sub="Website + Dashboard-Routen" />
              <Metric title="Backend-Module" value={String(totalApiModules)} sub="Auth, CRUD, Reminder, Upload" />
              <Metric title="Projektbilder" value={String(totalImages)} sub="Aus `public/` eingebunden" />
              <Metric title="Standort" value="Frankfurt" sub="Vercel + Supabase Region FRA" />
            </div>
          </div>
        </section>

        <section className="mt-8 space-y-4">
          {FUNDING_TEXTS.map((item) => (
            <CharacterBox key={item.id} item={item} />
          ))}
        </section>

        <section className="mt-10 rounded-3xl border border-slate-900/10 bg-white/80 p-5 shadow-sm backdrop-blur sm:p-6">
          <h2 className="text-[18px] font-semibold tracking-tight text-slate-900 sm:text-[20px]">
            Technische Architektur im Detail
          </h2>
          <p className="mt-2 text-[13px] leading-relaxed text-slate-700 sm:text-[14px]">
            Stayfix basiert auf Next.js (App Router) mit serverseitigen Route-Handlern, Supabase-Authentifizierung mit
            Cookie-Session, relationalem Postgres-Datenmodell und strukturiertem Storage fuer Dokumente.
          </p>

          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            <div className="rounded-2xl border border-slate-900/10 bg-white/75 p-4">
              <Image
                src="/backend.png"
                alt="Backend Uebersicht"
                width={1200}
                height={720}
                className="h-auto w-full rounded-xl border border-slate-900/10"
              />
              <div className="mt-3 space-y-2 text-[12px] text-slate-700">
                <p>
                  <span className="font-semibold text-slate-900">Hosting:</span> Vercel in Frankfurt fuer Deployment,
                  Build und Runtime.
                </p>
                <p>
                  <span className="font-semibold text-slate-900">API-Schicht:</span> Next.js Route Handler unter
                  <code className="ml-1 rounded bg-slate-100 px-1 py-0.5 text-[11px]">app/api</code> mit
                  serverseitiger Validierung.
                </p>
                <p>
                  <span className="font-semibold text-slate-900">Auth:</span> Supabase Auth (Frankfurt) mit
                  Session-Cookies und geschuetzten Dashboard-Routen.
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-900/10 bg-white/75 p-4">
              <Image
                src="/datenbank.png"
                alt="Datenbank Uebersicht"
                width={1200}
                height={720}
                className="h-auto w-full rounded-xl border border-slate-900/10"
              />
              <div className="mt-3 space-y-2 text-[12px] text-slate-700">
                <p>
                  <span className="font-semibold text-slate-900">Datenhaltung:</span> Supabase Postgres in Frankfurt,
                  inkl. klarer Tabellenbeziehungen.
                </p>
                <p>
                  <span className="font-semibold text-slate-900">Sicherheit:</span> Ownership-Pruefung je Datensatz
                  (u. a. Filter ueber <code className="rounded bg-slate-100 px-1 py-0.5 text-[11px]">user_id</code>).
                </p>
                <p>
                  <span className="font-semibold text-slate-900">Storage:</span> Dokument-Uploads im Bucket
                  <code className="ml-1 rounded bg-slate-100 px-1 py-0.5 text-[11px]">dokumente</code> mit
                  strukturierten Pfaden pro Mitarbeitendenfall.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <InfoBlock title="Datenmodell">
              {DATA_MODEL.map((table) => (
                <code key={table} className="inline-flex rounded-full border border-slate-900/10 bg-white px-2 py-1 text-[10px] text-slate-700">
                  {table}
                </code>
              ))}
            </InfoBlock>

            <InfoBlock title="API-Module">
              {API_MODULES.map((entry) => (
                <code key={entry} className="inline-flex rounded-full border border-slate-900/10 bg-white px-2 py-1 text-[10px] text-slate-700">
                  {entry}
                </code>
              ))}
            </InfoBlock>
          </div>

          <div className="mt-4 rounded-2xl border border-slate-900/10 bg-emerald-50/70 p-4 text-[12px] leading-relaxed text-emerald-900">
            <p className="font-semibold">Green Coding konkret umgesetzt</p>
            <p className="mt-1">
              Schlanke Datenstrukturen, zielgenaue Queries, reduzierte Payloads, Parallelisierung von Requests,
              datensparsame Felder, strukturierte Caching-Strategien und Verzicht auf unnoetige Hintergrundlast.
            </p>
          </div>
        </section>

        <section className="mt-10 rounded-3xl border border-slate-900/10 bg-white/80 p-5 shadow-sm backdrop-blur sm:p-6">
          <h2 className="text-[18px] font-semibold tracking-tight text-slate-900 sm:text-[20px]">
            Umgesetzte Module mit Projektscreenshots
          </h2>
          <p className="mt-2 text-[13px] leading-relaxed text-slate-700 sm:text-[14px]">
            Die folgenden Bilder stammen direkt aus dem Ordner <code className="rounded bg-slate-100 px-1 py-0.5 text-[11px]">public/</code>.
          </p>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {MODULE_IMAGES.map((item) => (
              <article key={item.src} className="overflow-hidden rounded-2xl border border-slate-900/10 bg-white/80">
                <Image
                  src={item.src}
                  alt={item.title}
                  width={1200}
                  height={720}
                  className="h-auto w-full border-b border-slate-900/10 object-cover"
                />
                <div className="p-4">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-[13px] font-semibold text-slate-900">{item.title}</h3>
                    <code className="rounded-full border border-slate-900/10 bg-white px-2 py-0.5 text-[10px] text-slate-600">
                      {item.route}
                    </code>
                  </div>
                  <p className="mt-2 text-[12px] leading-relaxed text-slate-700">{item.detail}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-10 grid gap-5 lg:grid-cols-2">
          <div className="rounded-3xl border border-slate-900/10 bg-white/80 p-5 shadow-sm backdrop-blur sm:p-6">
            <h2 className="text-[18px] font-semibold tracking-tight text-slate-900">Seiten im Website-Bereich</h2>
            <p className="mt-2 text-[13px] leading-relaxed text-slate-700">
              Jede oeffentliche Route wurde fachlich und technisch klar getrennt ausgearbeitet.
            </p>
            <div className="mt-4 space-y-3">
              {WEBSITE_ROUTES.map((item) => (
                <RouteCard key={item.route} item={item} />
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-900/10 bg-white/80 p-5 shadow-sm backdrop-blur sm:p-6">
            <h2 className="text-[18px] font-semibold tracking-tight text-slate-900">Seiten im App-/Dashboard-Bereich</h2>
            <p className="mt-2 text-[13px] leading-relaxed text-slate-700">
              Die interne Anwendung wurde modular fuer operative Fallbearbeitung und Compliance-Transparenz aufgebaut.
            </p>
            <div className="mt-4 space-y-3">
              {DASHBOARD_ROUTES.map((item) => (
                <RouteCard key={item.route} item={item} />
              ))}
            </div>
          </div>
        </section>

        <section className="mt-10 rounded-3xl border border-slate-900/10 bg-slate-900 p-6 text-slate-100 shadow-[0_24px_60px_rgba(15,23,42,0.35)] sm:p-7">
          <h2 className="text-[18px] font-semibold tracking-tight text-white sm:text-[20px]">
            Umsetzungsform und Projektorganisation
          </h2>
          <p className="mt-2 max-w-4xl text-[13px] leading-relaxed text-slate-200 sm:text-[14px]">
            Stayfix wurde vollstaendig intern umgesetzt. Durch die Entwicklung und Optimierung des Quellcodes mit
            ChatGPT Codex waren keine Freelancer oder sonstige Dritte erforderlich. Dadurch konnten Aufwand, Abstimmung
            und Time-to-Market deutlich reduziert werden.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-3 text-[11px]">
            <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1">Intern entwickelt</span>
            <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1">Keine externen Dienstleister</span>
            <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1">Technische Steuerung in-house</span>
          </div>
          <div className="mt-5">
            <Link
              href="/beratung"
              className="inline-flex items-center rounded-full border border-white/30 bg-white/10 px-4 py-2 text-[12px] font-medium text-white transition hover:bg-white/20"
            >
              Zurueck zur Projektseite
            </Link>
          </div>
        </section>
      </div>
    </main>
  )
}

function Metric({ title, value, sub }: { title: string; value: string; sub: string }) {
  return (
    <div className="rounded-2xl border border-slate-900/10 bg-white/80 p-3 shadow-sm">
      <p className="text-[11px] font-medium text-slate-600">{title}</p>
      <p className="mt-1 text-[24px] font-semibold leading-none text-slate-900">{value}</p>
      <p className="mt-1 text-[11px] text-slate-500">{sub}</p>
    </div>
  )
}

function InfoBlock({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-slate-900/10 bg-white/75 p-4">
      <p className="text-[12px] font-semibold text-slate-900">{title}</p>
      <div className="mt-2 flex flex-wrap gap-2">{children}</div>
    </div>
  )
}
