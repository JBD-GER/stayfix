// app/(website)/haeufige-fragen/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Häufige Fragen – Stayfix',
  description:
    'Antworten auf die häufigsten Fragen zu Stayfix: Funktionsumfang, automatische E-Mail-Erinnerungen, Datenschutz, IT-Integration und Einführung im Unternehmen.',
}

export default function HaeufigeFragenPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 pb-16 pt-10 lg:px-6 lg:pt-16">
      {/* Hero / Intro */}
      <section className="space-y-4">
        <p className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-50 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-emerald-700">
          FAQ · Aufenthaltstitel · HR
        </p>
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
          Häufige Fragen zu Stayfix.
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-slate-600 md:text-base">
          Hier finden Sie Antworten auf typische Fragen rund um Stayfix – von der Funktionsweise
          über automatische Erinnerungen bis zu Datenschutz und Einführung im Unternehmen.
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-3 text-[11px] text-slate-500">
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-50 px-3 py-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span className="font-medium text-slate-900">Fokus: Aufenthaltstitel &amp; Fristen</span>
          </span>
          <span>Ideal für HR, Compliance und Geschäftsführung.</span>
        </div>
      </section>

      {/* Abschnitt: Allgemeines zu Stayfix */}
      <section className="mt-10 space-y-4">
        <h2 className="text-lg font-semibold tracking-tight text-slate-900">
          1. Allgemeines zu Stayfix
        </h2>
        <p className="max-w-2xl text-sm text-slate-600">
          Stayfix konzentriert sich bewusst auf ein kritisches, aber oft vernachlässigtes Thema:
          die strukturierte Verwaltung von Aufenthaltstiteln und Arbeitserlaubnissen inkl.
          Fristenüberwachung und Erinnerungen.
        </p>

        <div className="space-y-3 text-sm">
          <details className="group rounded-2xl border border-slate-200 bg-white px-4 py-3">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium text-slate-900">
              Was ist Stayfix genau?
              <span className="text-xs text-slate-500 group-open:hidden">+</span>
              <span className="hidden text-xs text-slate-500 group-open:inline">–</span>
            </summary>
            <p className="mt-2 text-xs text-slate-600">
              Stayfix ist eine spezialisierte HR-Lösung für Unternehmen mit internationalen
              Mitarbeitenden. Sie erfassen Aufenthaltstitel und Arbeitserlaubnisse zentral, legen
              Gültigkeitsfristen fest und Stayfix übernimmt die Überwachung sowie automatische
              Erinnerungen per E-Mail. Statt komplexem HR-System steht ein fokussiertes Tool für
              genau dieses Thema im Mittelpunkt.
            </p>
          </details>

          <details className="group rounded-2xl border border-slate-200 bg-white px-4 py-3">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium text-slate-900">
              Für welche Unternehmen eignet sich Stayfix?
              <span className="text-xs text-slate-500 group-open:hidden">+</span>
              <span className="hidden text-xs text-slate-500 group-open:inline">–</span>
            </summary>
            <p className="mt-2 text-xs text-slate-600">
              Stayfix eignet sich für alle Unternehmen, in denen Mitarbeitende mit
              Aufenthaltstiteln, Visa oder besonderen Arbeitserlaubnissen beschäftigt sind – vom
              mittelständischen Betrieb bis zum internationalen Unternehmen. Besonders relevant ist
              Stayfix für HR-Abteilungen, die bislang mit Excel-Listen, Kalendern oder
              Einzelnotizen arbeiten und mehr Sicherheit und Transparenz wünschen.
            </p>
          </details>

          <details className="group rounded-2xl border border-slate-200 bg-white px-4 py-3">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium text-slate-900">
              Worin unterscheidet sich Stayfix von einer Excel-Liste?
              <span className="text-xs text-slate-500 group-open:hidden">+</span>
              <span className="hidden text-xs text-slate-500 group-open:inline">–</span>
            </summary>
            <p className="mt-2 text-xs text-slate-600">
              Excel-Listen sind schnell erstellt, aber fehleranfällig: Fristen werden übersehen,
              Zuständigkeiten sind unklar, und es gibt keine automatischen Erinnerungen. Stayfix
              ist genau für diesen Anwendungsfall gebaut: klare Struktur, definierte Felder,
              automatische E-Mail-Benachrichtigungen und ein Dashboard, das kritische Fälle
              hervorhebt. So reduzieren Sie das Risiko von ablaufenden Aufenthaltstiteln deutlich.
            </p>
          </details>
        </div>
      </section>

      {/* Abschnitt: Funktionsweise & Erinnerungen */}
      <section className="mt-10 space-y-4">
        <h2 className="text-lg font-semibold tracking-tight text-slate-900">
          2. Funktionsweise &amp; Erinnerungen
        </h2>
        <p className="max-w-2xl text-sm text-slate-600">
          Stayfix arbeitet im Hintergrund für Sie und informiert die richtigen Personen
          rechtzeitig, bevor Fristen ablaufen.
        </p>

        <div className="space-y-3 text-sm">
          <details className="group rounded-2xl border border-slate-200 bg-white px-4 py-3">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium text-slate-900">
              Wer erhält die Erinnerungs-E-Mails, wenn ein Aufenthaltstitel abläuft?
              <span className="text-xs text-slate-500 group-open:hidden">+</span>
              <span className="hidden text-xs text-slate-500 group-open:inline">–</span>
            </summary>
            <p className="mt-2 text-xs text-slate-600">
              In Stayfix können Sie pro Mitarbeitender bzw. Mitarbeitendem hinterlegen, wer
              informiert werden soll. Standardmäßig erhalten sowohl die betroffene Person als auch
              die hinterlegte Führungskraft bzw. eine zentrale HR-Adresse die Erinnerung. So wird
              sichergestellt, dass die Information nicht nur an einer Stelle hängen bleibt.
            </p>
          </details>

          <details className="group rounded-2xl border border-slate-200 bg-white px-4 py-3">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium text-slate-900">
              Wie weit im Voraus verschickt Stayfix Erinnerungen?
              <span className="text-xs text-slate-500 group-open:hidden">+</span>
              <span className="hidden text-xs text-slate-500 group-open:inline">–</span>
            </summary>
            <p className="mt-2 text-xs text-slate-600">
              Die Erinnerungen orientieren sich an definierten Vorlaufzeiten, zum Beispiel
              mehrere Monate vor Ablauf eines Aufenthaltstitels. So bleibt ausreichend Zeit für
              interne Abstimmungen, Terminvereinbarungen mit den Behörden und ggf. das
              Zusammenstellen von Unterlagen. Im Beratungsgespräch besprechen wir gemeinsam,
              welche Vorlaufzeit für Ihr Unternehmen sinnvoll ist.
            </p>
          </details>

          <details className="group rounded-2xl border border-slate-200 bg-white px-4 py-3">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium text-slate-900">
              Muss ich die Fristen weiterhin zusätzlich im Kalender pflegen?
              <span className="text-xs text-slate-500 group-open:hidden">+</span>
              <span className="hidden text-xs text-slate-500 group-open:inline">–</span>
            </summary>
            <p className="mt-2 text-xs text-slate-600">
              Nein. Die Idee von Stayfix ist, dass Aufenthaltstitel und Arbeitserlaubnisse nicht
              mehr in unterschiedlichen Kalendern, Notizen oder Excel-Listen gepflegt werden
              müssen. Stayfix übernimmt die Fristenüberwachung zentral – Sie können zusätzliche
              Kalender-Einträge setzen, müssen es aber nicht mehr zwingend tun.
            </p>
          </details>
        </div>
      </section>

      {/* Abschnitt: Datenschutz & Sicherheit */}
      <section className="mt-10 space-y-4">
        <h2 className="text-lg font-semibold tracking-tight text-slate-900">
          3. Datenschutz &amp; Sicherheit
        </h2>
        <p className="max-w-2xl text-sm text-slate-600">
          Aufenthaltstitel sind sensible Daten. Entsprechend hoch ist der Anspruch an Datenschutz,
          Zugriffskonzepte und technische Sicherheit.
        </p>

        <div className="space-y-3 text-sm">
          <details className="group rounded-2xl border border-slate-200 bg-white px-4 py-3">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium text-slate-900">
              Sind die in Stayfix hinterlegten Daten DSGVO-konform?
              <span className="text-xs text-slate-500 group-open:hidden">+</span>
              <span className="hidden text-xs text-slate-500 group-open:inline">–</span>
            </summary>
            <p className="mt-2 text-xs text-slate-600">
              Stayfix wird mit einem klaren Datenschutz-Fokus entwickelt. Dazu gehören
              datensparsame Felder, rollenbasierte Zugriffe und eine technische Infrastruktur, die
              auf europäische Datenschutzstandards ausgerichtet ist. In einem gemeinsamen Gespräch
              klären wir, wie Stayfix in Ihre bestehende Datenschutz-Dokumentation (z. B.
              Verzeichnis von Verarbeitungstätigkeiten) eingebunden werden kann.
            </p>
          </details>

          <details className="group rounded-2xl border border-slate-200 bg-white px-4 py-3">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium text-slate-900">
              Wer hat Zugriff auf die Daten in Stayfix?
              <span className="text-xs text-slate-500 group-open:hidden">+</span>
              <span className="hidden text-xs text-slate-500 group-open:inline">–</span>
            </summary>
            <p className="mt-2 text-xs text-slate-600">
              Der Zugriff ist auf Nutzerinnen und Nutzer innerhalb Ihres Unternehmens begrenzt.
              Üblicherweise erhalten HR, Compliance und ausgewählte Teamleitungen Zugriff. Über
              Rollen und Rechte lässt sich steuern, wer Daten nur lesen und wer sie bearbeiten
              darf. Auf Wunsch können sensible Detailinformationen zusätzlich eingeschränkt werden.
            </p>
          </details>

          <details className="group rounded-2xl border border-slate-200 bg-white px-4 py-3">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium text-slate-900">
              Werden auch Dokumente (z. B. Scans der Aufenthaltstitel) in Stayfix gespeichert?
              <span className="text-xs text-slate-500 group-open:hidden">+</span>
              <span className="hidden text-xs text-slate-500 group-open:inline">–</span>
            </summary>
            <p className="mt-2 text-xs text-slate-600">
              Der Kern von Stayfix ist zunächst die strukturierte Erfassung von Informationen zu
              Aufenthaltstiteln und die Fristenüberwachung. Die Ablage von Dokumenten ist möglich
              bzw. vorgesehen, wird aber immer unter Berücksichtigung von Speicherort,
              Zugriffsbeschränkungen und Ihrer internen Datenschutzrichtlinien betrachtet.
            </p>
          </details>
        </div>
      </section>

      {/* Abschnitt: Einführung & Betrieb */}
      <section className="mt-10 space-y-4">
        <h2 className="text-lg font-semibold tracking-tight text-slate-900">
          4. Einführung &amp; Betrieb im Unternehmen
        </h2>
        <p className="max-w-2xl text-sm text-slate-600">
          Stayfix soll sich in Ihre bestehende HR-Landschaft einfügen – nicht alles von Grund auf
          verändern. Die Einführung ist bewusst schlank gehalten.
        </p>

        <div className="space-y-3 text-sm">
          <details className="group rounded-2xl border border-slate-200 bg-white px-4 py-3">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium text-slate-900">
              Wie läuft die Einführung von Stayfix typischerweise ab?
              <span className="text-xs text-slate-500 group-open:hidden">+</span>
              <span className="hidden text-xs text-slate-500 group-open:inline">–</span>
            </summary>
            <p className="mt-2 text-xs text-slate-600">
              In einem ersten Schritt klären wir gemeinsam, wie viele Mitarbeitende betroffen sind
              und wie Ihre aktuelle Arbeitsweise aussieht (Excel, Kalender, HR-Systeme). Anschließend
              werden Stammdaten und Aufenthaltstitel in Stayfix angelegt – entweder manuell oder
              über einen Import. Danach definieren wir die E-Mail-Empfänger und Fristenlogik und
              Sie können Stayfix im Alltag nutzen.
            </p>
          </details>

          <details className="group rounded-2xl border border-slate-200 bg-white px-4 py-3">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium text-slate-900">
              Benötigen wir dafür eine eigene IT-Abteilung?
              <span className="text-xs text-slate-500 group-open:hidden">+</span>
              <span className="hidden text-xs text-slate-500 group-open:inline">–</span>
            </summary>
            <p className="mt-2 text-xs text-slate-600">
              Nein. Stayfix wird als cloudbasierte Anwendung bereitgestellt. Für den Start reicht
              in der Regel eine verantwortliche Person aus HR oder Compliance, die die initialen
              Daten einpflegt. Technische Themen wie Updates oder Wartung werden zentral
              übernommen, ohne dass Ihre interne IT dauerhaft eingebunden sein muss.
            </p>
          </details>

          <details className="group rounded-2xl border border-slate-200 bg-white px-4 py-3">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium text-slate-900">
              Kann Stayfix mit bestehenden HR-Systemen zusammenarbeiten?
              <span className="text-xs text-slate-500 group-open:hidden">+</span>
              <span className="hidden text-xs text-slate-500 group-open:inline">–</span>
            </summary>
            <p className="mt-2 text-xs text-slate-600">
              Stayfix ist bewusst schlank konzipiert und kann parallel zu bestehenden HR-Systemen
              laufen. Für viele Unternehmen ist es zunächst ausreichend, relevante Daten aus dem
              HR-System in Stayfix zu übernehmen und dort gezielt das Thema Aufenthaltstitel zu
              steuern. Schnittstellen und Importe können je nach Bedarf gemeinsam geplant werden.
            </p>
          </details>
        </div>
      </section>

      {/* Abschluss-CTA */}
      <section className="mt-14 rounded-3xl border border-slate-200 bg-slate-50 px-5 py-6 sm:px-7 sm:py-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-base font-semibold tracking-tight text-slate-900">
              Noch Fragen offen oder direkt Interesse an einem Gespräch?
            </h2>
            <p className="mt-2 max-w-xl text-sm text-slate-600">
              In einem kurzen Beratungsgespräch klären wir, wie Stayfix zu Ihren HR-Prozessen
              passt und welche nächsten Schritte sinnvoll sind – von der ersten Pilotierung bis zum
              Rollout für alle relevanten Mitarbeitenden.
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
