// app/(website)/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Stayfix – Aufenthaltstitel & Arbeitserlaubnisse einfach verwalten',
  description:
    'Stayfix ist die spezialisierte HR-Lösung, um Aufenthaltstitel und Arbeitserlaubnisse von Mitarbeitenden zentral zu verwalten und automatisch vor Ablauf per E-Mail zu erinnern.',
  keywords: [
    'Aufenthaltstitel verwalten',
    'Arbeitserlaubnis verwalten',
    'HR Software Aufenthaltstitel',
    'Mitarbeiter Aufenthaltstitel Ablauf',
    'Visa Management Unternehmen',
    'Aufenthaltstitel Reminder',
    'Compliance Aufenthaltstitel',
    'Aufenthaltstitel Fristenüberwachung',
    'Stayfix',
  ],
}

export default function WebsiteHomePage() {
  return (
    <main className="mx-auto max-w-6xl px-4 pb-16 pt-10 lg:px-6 lg:pt-16">
      {/* HERO */}
      <section className="grid gap-10 md:grid-cols-2 md:items-center">
        {/* Linke Spalte – Text */}
        <div>
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-50 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-emerald-700">
            HR · Aufenthaltstitel · Compliance
          </p>

          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
            Aufenthaltstitel zentral verwalten.
            <br className="hidden sm:block" />
            Mitarbeitende automatisch erinnern.
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-600 md:text-base">
            Stayfix ist die fokussierte Lösung für Unternehmen, die Aufenthaltstitel und
            Arbeitserlaubnisse ihrer Mitarbeitenden rechtssicher im Blick behalten möchten.
            Statt Excel-Listen und Kalendereinträgen übernimmt Stayfix die Fristenüberwachung
            und erinnert Mitarbeitende sowie Vorgesetzte automatisch per E-Mail.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              href="/beratung"
              className="rounded-full bg-[#3B5BFF] px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-[#3049D9]"
            >
              Beratung buchen
            </Link>
            <Link
              href="/dashboard"
              className="rounded-full border border-[#3B5BFF]/40 px-5 py-2.5 text-sm font-medium text-slate-800 hover:border-[#3B5BFF] hover:text-slate-900"
            >
              Demo-Dashboard öffnen
            </Link>
          </div>

          {/* Review-Teaser */}
          <div className="mt-4 flex flex-wrap items-center gap-3 text-[11px] text-slate-500">
            <div className="inline-flex items-center gap-2 rounded-full bg-slate-50 px-3 py-1">
              <span className="text-amber-400">★</span>
              <span className="font-medium text-slate-900">4,8 / 5</span>
              <span>Bewertung der ersten Pilotkunden</span>
            </div>
            <span>Besonders geschätzt von HR, Compliance &amp; Geschäftsführung.</span>
          </div>
        </div>

        {/* Rechte Spalte – großes Bild über volle Hero-Höhe */}
        <div className="relative h-64 rounded-3xl border border-slate-200 bg-white shadow-[0_18px_40px_rgba(15,23,42,0.12)] overflow-hidden sm:h-72 md:h-80 lg:h-96">
          <Image
            src="/website_start.jpg"
            alt="Team mit internationalen Mitarbeitenden – Symbolbild für Stayfix."
            fill
            sizes="(min-width: 1024px) 28rem, (min-width: 768px) 22rem, 100vw"
            className="object-cover"
            priority
          />
        </div>
      </section>

      {/* kurzer Dashboard-Teaser */}
      <section className="mt-14">
        <div className="rounded-3xl border border-slate-200 bg-white/80 p-4 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
          <div className="mb-3 flex items-center justify-between gap-2 text-xs">
            <div className="font-medium text-slate-900">Ein Blick ins Stayfix-Dashboard</div>
            <div className="rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-medium text-emerald-700">
              Beispielansicht
            </div>
          </div>

          <div className="mb-4 grid gap-3 text-[11px] sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2">
              <p className="text-[11px] font-medium text-slate-700">Mitarbeitende</p>
              <p className="mt-1 text-lg font-semibold text-slate-900">128</p>
              <p className="mt-1 text-[10px] text-slate-500">
                Mitarbeitende mit hinterlegten Aufenthaltstiteln.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2">
              <p className="text-[11px] font-medium text-slate-700">Laufen bald ab</p>
              <p className="mt-1 text-lg font-semibold text-amber-600">9</p>
              <p className="mt-1 text-[10px] text-slate-500">
                Aufenthaltstitel mit Frist innerhalb der nächsten 90 Tage.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2">
              <p className="text-[11px] font-medium text-slate-700">Abgelaufen</p>
              <p className="mt-1 text-lg font-semibold text-rose-600">2</p>
              <p className="mt-1 text-[10px] text-slate-500">
                Dokumente, bei denen sofortiger Handlungsbedarf besteht.
              </p>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2">
              <div>
                <p className="font-medium text-slate-900">Ali Hassan</p>
                <p className="text-[11px] text-slate-500">
                  Aufenthaltstitel · gültig bis 15.03.2026
                </p>
              </div>
              <span className="rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-medium text-amber-700">
                60 Tage
              </span>
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2">
              <div>
                <p className="font-medium text-slate-900">Marta Kowalska</p>
                <p className="text-[11px] text-slate-500">
                  Arbeitserlaubnis · gültig bis 01.02.2026
                </p>
              </div>
              <span className="rounded-full bg-rose-50 px-2.5 py-1 text-[11px] font-medium text-rose-700">
                Abgelaufen
              </span>
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2">
              <div>
                <p className="font-medium text-slate-900">Igor Petrov</p>
                <p className="text-[11px] text-slate-500">Blue Card EU · gültig bis 30.09.2026</p>
              </div>
              <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-medium text-emerald-700">
                OK
              </span>
            </div>
          </div>

          <p className="mt-3 text-[11px] text-slate-500">
            Beispielhafte Darstellung – in der Live-Version sehen Sie hier Ihre eigenen Daten,
            gefiltert nach kritischen Fristen und Zuständigkeiten.
          </p>
        </div>
      </section>

      {/* Funktionen – 3 Hauptfunktionen */}
      <section id="funktionen" className="mt-16 space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold tracking-tight">Die drei wichtigsten Funktionen</h2>
            <p className="mt-2 max-w-xl text-sm text-slate-600">
              Stayfix konzentriert sich bewusst auf das Wesentliche: Aufenthaltstitel und
              Arbeitserlaubnisse strukturiert erfassen, Fristen überwachen und die richtigen
              Personen automatisch informieren.
            </p>
          </div>
          <Link
            href="/funktionen"
            className="text-xs font-medium text-slate-700 underline underline-offset-4 hover:text-slate-900"
          >
            Alle Funktionen im Detail
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-4">
            <h3 className="text-sm font-semibold text-slate-900">
              1. Mitarbeitende &amp; Aufenthaltstitel strukturieren
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-slate-600">
              Lege Mitarbeitende an, hinterlege Aufenthaltstitel und Arbeitserlaubnisse mit
              Gültigkeitsdatum, Behörde, Dokumenten-Nummer und optionalen Hinweisen für HR.
            </p>
            <p className="mt-3 text-[11px] text-slate-500">
              Mehrere Dokumente pro Person – z. B. Aufenthaltstitel, Arbeitserlaubnis und Blue
              Card.
            </p>
          </div>

          <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-4">
            <h3 className="text-sm font-semibold text-slate-900">
              2. Automatische E-Mail-Erinnerungen
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-slate-600">
              Stayfix prüft täglich, welche Dokumente demnächst ablaufen, und informiert
              Mitarbeitende sowie Vorgesetzte automatisch per E-Mail – rechtzeitig und
              nachvollziehbar.
            </p>
            <p className="mt-3 text-[11px] text-slate-500">
              Keine manuell gepflegten Kalender-Einträge mehr, keine vergessenen Fristen.
            </p>
          </div>

          <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-4">
            <h3 className="text-sm font-semibold text-slate-900">
              3. Dashboard für kritische Fälle
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-slate-600">
              Im Dashboard siehst du sofort, welche Aufenthaltstitel bald auslaufen oder
              bereits abgelaufen sind – inklusive zugehöriger Mitarbeitender und Vorgesetzten.
            </p>
            <p className="mt-3 text-[11px] text-slate-500">
              Ideal für HR, Compliance und Teamleitungen, um den Überblick zu behalten.
            </p>
          </div>
        </div>
      </section>

      {/* So funktioniert's */}
      <section id="how-it-works" className="mt-16 space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold tracking-tight">So funktioniert Stayfix im Alltag</h2>
            <p className="mt-2 max-w-xl text-sm text-slate-600">
              Die Idee ist bewusst einfach: Einmal sauber aufsetzen – und danach laufen
              Erinnerungen und Fristenüberwachung automatisiert im Hintergrund.
            </p>
          </div>
        </div>

        <ol className="grid gap-4 text-sm text-slate-700 sm:grid-cols-3">
          <li className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white p-4">
            <div className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-300 text-[11px] font-medium">
              1
            </div>
            <p className="font-semibold">Mitarbeitende anlegen</p>
            <p className="text-xs text-slate-600">
              Erfasse Stammdaten, hinterlege E-Mail-Adressen von Mitarbeitenden und deren
              direkten Vorgesetzten.
            </p>
          </li>
          <li className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white p-4">
            <div className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-300 text-[11px] font-medium">
              2
            </div>
            <p className="font-semibold">Aufenthaltstitel &amp; Fristen eintragen</p>
            <p className="text-xs text-slate-600">
              Trage Gültigkeitsdaten ein und ordne jedem Dokument zu, wer informiert werden
              soll, wenn eine Frist näherrückt.
            </p>
          </li>
          <li className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white p-4">
            <div className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-300 text-[11px] font-medium">
              3
            </div>
            <p className="font-semibold">Automatische Erinnerungen erhalten</p>
            <p className="text-xs text-slate-600">
              Stayfix verschickt rechtzeitig Erinnerungs-E-Mails – an Mitarbeitende und
              Vorgesetzte. Im Dashboard siehst du jederzeit den aktuellen Stand.
            </p>
          </li>
        </ol>
      </section>

      {/* FAQ – Teaser */}
      <section id="faq" className="mt-16 space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold tracking-tight">
              Häufige Fragen zu Stayfix &amp; Aufenthaltstiteln
            </h2>
            <p className="mt-2 max-w-xl text-sm text-slate-600">
              Viele HR-Abteilungen stehen vor ähnlichen Fragen, wenn es um Aufenthaltstitel,
              Arbeitserlaubnisse und Fristen geht. Einige davon beantworten wir direkt hier.
            </p>
          </div>
          <Link
            href="/haeufige-fragen"
            className="text-xs font-medium text-slate-700 underline underline-offset-4 hover:text-slate-900"
          >
            Alle FAQs ansehen
          </Link>
        </div>

        <div className="space-y-3 text-sm">
          <details className="group rounded-2xl border border-slate-200 bg-white px-4 py-3">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium text-slate-900">
              Warum reicht eine Excel-Liste für Aufenthaltstitel oft nicht aus?
              <span className="text-xs text-slate-500 group-open:hidden">+</span>
              <span className="hidden text-xs text-slate-500 group-open:inline">–</span>
            </summary>
            <p className="mt-2 text-xs text-slate-600">
              Excel-Listen sind schnell gebaut, aber fehleranfällig: Fristen werden übersehen,
              Zuständigkeiten sind unklar und es gibt selten automatische Erinnerungen. Stayfix
              ist darauf ausgelegt, genau diese Lücke zu schließen – mit klaren Zuständigkeiten
              und automatisierten E-Mail-Benachrichtigungen.
            </p>
          </details>

          <details className="group rounded-2xl border border-slate-200 bg-white px-4 py-3">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium text-slate-900">
              Wer erhält die Erinnerungs-E-Mails, wenn ein Aufenthaltstitel abläuft?
              <span className="text-xs text-slate-500 group-open:hidden">+</span>
              <span className="hidden text-xs text-slate-500 group-open:inline">–</span>
            </summary>
            <p className="mt-2 text-xs text-slate-600">
              Standardmäßig sowohl die betroffene Person als auch die hinterlegte Führungskraft
              bzw. HR. So ist sichergestellt, dass niemand von ablaufenden Dokumenten überrascht
              wird.
            </p>
          </details>

          <details className="group rounded-2xl border border-slate-200 bg-white px-4 py-3">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium text-slate-900">
              Ist Stayfix eine vollständige HR-Software?
              <span className="text-xs text-slate-500 group-open:hidden">+</span>
              <span className="hidden text-xs text-slate-500 group-open:inline">–</span>
            </summary>
            <p className="mt-2 text-xs text-slate-600">
              Nein – und genau das ist der Vorteil. Stayfix konzentriert sich auf das Thema
              Aufenthaltstitel und Arbeitserlaubnisse. Die Lösung bleibt dadurch schlank,
              verständlich und schnell implementierbar und ergänzt bestehende HR-Systeme, statt
              sie zu ersetzen.
            </p>
          </details>
        </div>
      </section>

      {/* Abschluss-CTA */}
      <section className="mt-16 rounded-3xl border border-slate-200 bg-slate-50 px-5 py-6 sm:px-7 sm:py-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-base font-semibold tracking-tight text-slate-900">
              Interesse an einem strukturierten Aufenthaltstitel-Management?
            </h2>
            <p className="mt-2 max-w-xl text-sm text-slate-600">
              In einem kurzen Beratungsgespräch klären wir, wie Stayfix in euren HR-Alltag
              passt und welche Prozesse wir bereits heute abbilden können.
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:items-end">
            <Link
              href="/beratung"
              className="inline-flex items-center justify-center rounded-full bg-[#3B5BFF] px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-[#3049D9]"
            >
              Beratung buchen
            </Link>
            <span className="text-[11px] text-slate-500">
              Unverbindlich &amp; kostenfrei – ideal für HR, Compliance und Geschäftsführung.
            </span>
          </div>
        </div>
      </section>
    </main>
  )
}
