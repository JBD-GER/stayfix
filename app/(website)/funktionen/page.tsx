// app/(website)/funktionen/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Funktionen – Stayfix',
  description:
    'Alle Funktionen von Stayfix im Überblick: Mitarbeitende anlegen, Aufenthaltstitel verwalten, automatische E-Mail-Erinnerungen, Dashboards, Filter und Compliance-Übersichten.',
}

export default function FunktionenPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 pb-16 pt-10 lg:px-6 lg:pt-16">
      {/* Hero / Intro */}
      <section className="space-y-4">
        <p className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-50 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-emerald-700">
          Funktionen · Aufenthaltstitel · HR-Compliance
        </p>
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
          Alle Funktionen von Stayfix im Überblick.
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-slate-600 md:text-base">
          Stayfix bündelt alles, was Sie für ein professionelles Aufenthaltstitel-Management
          benötigen: strukturierte Mitarbeitenden-Stammdaten, sauber hinterlegte
          Aufenthaltstitel und Arbeitserlaubnisse, automatische E-Mail-Erinnerungen sowie
          ein klares Dashboard für HR und Führungskräfte.
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-3 text-[11px] text-slate-500">
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-50 px-3 py-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span className="font-medium text-slate-900">Einsatzbereit</span>
            <span>für Unternehmen mit internationalen Mitarbeitenden</span>
          </span>
          <span>Skalierbar von kleineren Teams bis zu größeren Organisationen.</span>
        </div>
      </section>

      {/* Kernfunktionen */}
      <section className="mt-12 space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold tracking-tight">Kernfunktionen von Stayfix</h2>
            <p className="mt-2 max-w-2xl text-sm text-slate-600">
              Mit diesen Modulen bildet Stayfix den kompletten Prozess ab – von der
              Stammdatenpflege über die Erfassung von Aufenthaltstiteln bis hin zu
              automatischen Erinnerungen und einer klaren Übersicht für kritische Fälle.
            </p>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {/* Modul 1 */}
          <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-4">
            <div className="mb-2 inline-flex items-center gap-2 text-[11px] text-slate-500">
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.16em] text-slate-600">
                Modul
              </span>
              <span>Mitarbeitende &amp; Organisation</span>
            </div>
            <h3 className="text-sm font-semibold text-slate-900">
              Stammdaten der Mitarbeitenden im Griff
            </h3>
            <ul className="mt-3 space-y-1.5 text-xs text-slate-600">
              <li>• Anlage von Mitarbeitenden mit E-Mail, Position und Abteilung</li>
              <li>• Zuordnung der verantwortlichen Führungskraft für Reminder-E-Mails</li>
              <li>• Optional: Standort / Gesellschaft für Auswertungen nach Einheiten</li>
              <li>• Übersicht aller Mitarbeitenden mit Such- und Filtermöglichkeiten</li>
            </ul>
          </div>

          {/* Modul 2 */}
          <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-4">
            <div className="mb-2 inline-flex items-center gap-2 text-[11px] text-slate-500">
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.16em] text-slate-600">
                Modul
              </span>
              <span>Aufenthaltstitel &amp; Dokumente</span>
            </div>
            <h3 className="text-sm font-semibold text-slate-900">
              Aufenthaltstitel strukturiert hinterlegen
            </h3>
            <ul className="mt-3 space-y-1.5 text-xs text-slate-600">
              <li>• Pro Mitarbeitendem mehrere Aufenthaltstitel / Arbeitserlaubnisse</li>
              <li>• Felder für Art des Titels, Behörde, Gültig von / bis, Nummer</li>
              <li>• Optionale Hinweise, z. B. Nebenbestimmungen oder Einschränkungen</li>
              <li>• Status-Anzeige (&quot;aktiv&quot;, &quot;läuft bald ab&quot;, &quot;abgelaufen&quot;)</li>
            </ul>
          </div>

          {/* Modul 3 */}
          <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-4">
            <div className="mb-2 inline-flex items-center gap-2 text-[11px] text-slate-500">
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.16em] text-slate-600">
                Modul
              </span>
              <span>Reminder &amp; Dashboard</span>
            </div>
            <h3 className="text-sm font-semibold text-slate-900">
              Automatische E-Mail-Erinnerungen &amp; Übersicht
            </h3>
            <ul className="mt-3 space-y-1.5 text-xs text-slate-600">
              <li>• Tägliche Prüfung aller Fristen im Hintergrund</li>
              <li>• Erinnerungen per E-Mail an Mitarbeitende &amp; Führungskraft</li>
              <li>• Ampellogik im Dashboard: grün, gelb, rot je nach Restlaufzeit</li>
              <li>• Fokus-Ansicht für kritisch auslaufende Aufenthaltstitel</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Detaillierte Funktionsübersicht */}
      <section className="mt-12 space-y-6">
        <h2 className="text-lg font-semibold tracking-tight">
          Funktionen im Detail
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Mitarbeitende & Organisation */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <h3 className="text-sm font-semibold text-slate-900">
              1. Mitarbeitende &amp; Organisation
            </h3>
            <p className="mt-2 text-xs text-slate-600">
              Die Basis von Stayfix ist eine saubere Mitarbeitenden-Stammdatenbank, die genau
              auf Aufenthaltstitel-Themen ausgerichtet ist.
            </p>
            <ul className="mt-3 space-y-1.5 text-xs text-slate-600">
              <li>• Erfassung von Namen, E-Mail, Rolle / Position und Abteilung</li>
              <li>• Zuordnung einer verantwortlichen Führungskraft pro Person</li>
              <li>• Kennzeichnung aktiver / inaktiver Mitarbeitender</li>
              <li>• Such- und Filteroptionen (z. B. nach Abteilung oder Standort)</li>
            </ul>
          </div>

          {/* Aufenthaltstitel & Dokumente */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <h3 className="text-sm font-semibold text-slate-900">
              2. Aufenthaltstitel &amp; Arbeitserlaubnisse
            </h3>
            <p className="mt-2 text-xs text-slate-600">
              Alle relevanten Dokumente werden als eigene Einträge geführt – mit den Angaben,
              die HR, Fachbereiche und Geschäftsführung benötigen.
            </p>
            <ul className="mt-3 space-y-1.5 text-xs text-slate-600">
              <li>• Dokumenttyp (z. B. Aufenthaltstitel, Blue Card, Arbeitserlaubnis)</li>
              <li>• Gültigkeitszeitraum mit &quot;gültig von&quot; und &quot;gültig bis&quot;</li>
              <li>• Behörde / ausstellende Stelle und Dokumentennummer</li>
              <li>• Freifeld für Hinweise (z. B. Nebenbestimmungen, Verlängerungshinweise)</li>
              <li>• Status-Feld mit klarer farblicher Kennzeichnung im System</li>
            </ul>
          </div>

          {/* Erinnerungen & Kommunikation */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <h3 className="text-sm font-semibold text-slate-900">
              3. Erinnerungen &amp; E-Mail-Benachrichtigungen
            </h3>
            <p className="mt-2 text-xs text-slate-600">
              Stayfix übernimmt die Fristenüberwachung und verschickt Erinnerungen
              automatisch – damit keine Termine mehr in Excel-Listen oder Kalendern
              untergehen.
            </p>
            <ul className="mt-3 space-y-1.5 text-xs text-slate-600">
              <li>• Täglicher Hintergrund-Check aller Gültigkeitsdaten</li>
              <li>• Konfigurierbare Vorlaufzeiten (z. B. 180 / 90 / 60 / 30 Tage vor Ablauf)</li>
              <li>• Erinnerungen an Mitarbeitende und deren Führungskraft</li>
              <li>• Klar strukturierte E-Mail-Texte für schnelle Einordnung</li>
              <li>• Direkte Verlinkung zum entsprechenden Datensatz im Dashboard (optional)</li>
            </ul>
          </div>

          {/* Dashboard & Reporting */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="mb-1 flex items-center gap-2">
              <h3 className="text-sm font-semibold text-slate-900">
                4. Dashboard, Filter &amp; Reporting
              </h3>
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.16em] text-slate-500">
                Übersicht
              </span>
            </div>
            <p className="mt-2 text-xs text-slate-600">
              Das Dashboard liefert eine klare, verdichtete Sicht auf alle
              Aufenthaltstitel-Informationen – ideal für HR-Teams und Entscheider.
            </p>
            <ul className="mt-3 space-y-1.5 text-xs text-slate-600">
              <li>• Kennzahlen: Gesamtanzahl, bald ablaufend, abgelaufen</li>
              <li>• Liste kritischer Fälle mit Restlaufzeit und zuständigen Personen</li>
              <li>• Filter nach Abteilung, Standort oder Dokumenttyp</li>
              <li>• Export nach Excel / CSV für interne Dokumentation und Audits</li>
            </ul>
          </div>

          {/* Rollen & Sicherheit */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <h3 className="text-sm font-semibold text-slate-900">
              5. Rollen, Zugriffsrechte &amp; Sicherheit
            </h3>
            <p className="mt-2 text-xs text-slate-600">
              Aufenthaltstitel sind sensible personenbezogene Daten. Stayfix wird mit einem
              klaren Sicherheits- und Berechtigungskonzept betrieben.
            </p>
            <ul className="mt-3 space-y-1.5 text-xs text-slate-600">
              <li>• Zugriff nur für autorisierte Nutzerinnen und Nutzer Ihres Unternehmens</li>
              <li>• Trennung von Stammdaten und sensiblen Dokumentinformationen</li>
              <li>• Rollenkonzept für HR / Admin und Fachbereiche</li>
              <li>• Geplante Protokollierung von Änderungen (Änderungshistorie)</li>
            </ul>
          </div>

          {/* Weiterentwicklung / Ausblick */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <h3 className="text-sm font-semibold text-slate-900">
              6. Kontinuierliche Weiterentwicklung
            </h3>
            <p className="mt-2 text-xs text-slate-600">
              Stayfix wird laufend weiterentwickelt. Ziel ist es, administrativen Aufwand
              zu reduzieren und gleichzeitig Transparenz und Compliance weiter zu erhöhen.
            </p>
            <ul className="mt-3 space-y-1.5 text-xs text-slate-600">
              <li>• Upload von Dokumenten (eingescannte Aufenthaltstitel, Bescheide)</li>
              <li>• Erweiterte Rollen- und Rechte-Modelle für größere Organisationen</li>
              <li>• Erweiterte Reporting-Funktionen nach Standorten / Gesellschaften</li>
              <li>• API-Schnittstellen zu bestehenden HR-Systemen</li>
              <li>• Mehrsprachige Oberflächen für internationale Teams</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Abschluss-CTA */}
      <section className="mt-14 rounded-3xl border border-slate-200 bg-slate-50 px-5 py-6 sm:px-7 sm:py-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-base font-semibold tracking-tight text-slate-900">
              Passt Stayfix zu euren HR-Prozessen?
            </h2>
            <p className="mt-2 max-w-xl text-sm text-slate-600">
              In einer kurzen Beratungssession besprechen wir, wie Stayfix in Ihre bestehende
              HR-Landschaft passt und welche Module für Ihr Unternehmen besonders relevant sind.
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
