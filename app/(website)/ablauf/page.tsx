// app/(website)/ablauf/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Ablauf – So startet ihr mit Stayfix',
  description:
    'So läuft die Einführung von Stayfix ab: Vom Erstgespräch über die Einladung bis zur Konfiguration für eure HR-Prozesse – Schritt für Schritt erklärt.',
}

export default function AblaufPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 pb-16 pt-10 lg:px-6 lg:pt-16">
      {/* HERO / INTRO */}
      <section className="space-y-4">
        <p className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-50 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-emerald-700">
          Ablauf · Einführung · Onboarding
        </p>

        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
          So läuft die Einführung von Stayfix ab.
        </h1>

        <p className="max-w-2xl text-sm leading-relaxed text-slate-600 md:text-base">
          Stayfix soll euren HR-Alltag vereinfachen – nicht verkomplizieren. Deswegen ist der
          Ablauf klar strukturiert: Erst ein persönliches Gespräch, dann erhaltet ihr eure
          Einladung, richtet euer Konto ein und konfiguriert Stayfix genau so, dass es zu euren
          bestehenden HR-Prozessen passt.
        </p>
      </section>

      {/* REGISTRIERUNGS-ABLauf */}
      <section className="mt-12 space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold tracking-tight">
              Registrierung &amp; Zugang – in drei Schritten
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-slate-600">
              Kein anonymer Self-Service, sondern ein klarer Einstieg mit Kontaktperson:
              Gemeinsam klären wir im Gespräch, ob Stayfix zu euch passt – und wie ihr am
              schnellsten starten könnt.
            </p>
          </div>
        </div>

        <ol className="grid gap-4 text-sm text-slate-700 md:grid-cols-3">
          {/* Schritt 1 */}
          <li className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4">
            <div className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-300 text-[11px] font-medium">
              1
            </div>
            <p className="text-sm font-semibold">Demo-Gespräch vereinbaren</p>
            <p className="text-xs text-slate-600">
              Über die Website buchst du ein kurzes, unverbindliches Gespräch. Wir schauen
              gemeinsam auf eure aktuelle Situation, Anzahl internationaler Mitarbeitender und
              bestehende HR-Systeme.
            </p>
            <p className="text-[11px] text-slate-500">
              Ziel: Klarheit, ob Stayfix fachlich &amp; organisatorisch zu euch passt.
            </p>
          </li>

          {/* Schritt 2 */}
          <li className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4">
            <div className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-300 text-[11px] font-medium">
              2
            </div>
            <p className="text-sm font-semibold">Einladung &amp; Konto-Erstellung</p>
            <p className="text-xs text-slate-600">
              Nach dem Gespräch erhaltet ihr eine persönliche Einladung per E-Mail. Darüber
              legst du dein Stayfix-Konto an, definierst die erste Organisation und
              hinterlegst zentrale Einstellungen wie Sprache und Unternehmensdaten.
            </p>
            <p className="text-[11px] text-slate-500">
              Auf Wunsch können direkt weitere Admin-Accounts für HR oder Compliance angelegt
              werden.
            </p>
          </li>

          {/* Schritt 3 */}
          <li className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4">
            <div className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-300 text-[11px] font-medium">
              3
            </div>
            <p className="text-sm font-semibold">Erste Mitarbeitende &amp; Titel anlegen</p>
            <p className="text-xs text-slate-600">
              Im nächsten Schritt werden die ersten Mitarbeitenden hinzugefügt und
              Aufenthaltstitel hinterlegt. So entsteht schnell ein valides Bild darüber, wie
              Stayfix im Alltag wirkt und welche Konfiguration für euch sinnvoll ist.
            </p>
            <p className="text-[11px] text-slate-500">
              Ideal ist ein kurzer Pilot mit einer überschaubaren Anzahl internationaler
              Mitarbeitender.
            </p>
          </li>
        </ol>

        <div className="mt-4 text-[11px] text-slate-500">
          <span className="font-medium text-slate-700">Gut zu wissen:</span> Für den Start
          benötigt ihr kein neues HR-System – Stayfix läuft zunächst als eigenständige
          Anwendung und kann später an bestehende Tools angebunden werden.
        </div>
      </section>

      {/* KONFIGURATION & EINRICHTUNG */}
      <section className="mt-14 space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold tracking-tight">
              Stayfix für eure HR-Prozesse konfigurieren
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-slate-600">
              Damit Stayfix wirklich entlastet, wird die Lösung einmal sauber auf eure Struktur
              angepasst: Organisation, Dokumenttypen, Fristen und Benachrichtigungen. Danach
              läuft die Fristenüberwachung weitgehend im Hintergrund.
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* 1: Grundstruktur */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <h3 className="text-sm font-semibold text-slate-900">
              1. Organisation, Standorte &amp; Verantwortlichkeiten festlegen
            </h3>
            <p className="mt-2 text-xs text-slate-600">
              Zuerst definierst du, wie eure Organisation in Stayfix abgebildet werden soll –
              so wenig oder so detailliert wie nötig.
            </p>
            <ul className="mt-3 space-y-1.5 text-xs text-slate-600">
              <li>• Anlage von Standorten, Gesellschaften oder Business Units</li>
              <li>• Zuordnung von HR-Admins und verantwortlichen Führungskräften</li>
              <li>• Optionale Zuordnung von Abteilungen für spätere Filter &amp; Reports</li>
            </ul>
          </div>

          {/* 2: Dokumenttypen */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <h3 className="text-sm font-semibold text-slate-900">
              2. Aufenthaltstitel-Typen &amp; Felder konfigurieren
            </h3>
            <p className="mt-2 text-xs text-slate-600">
              Anschließend werden die Dokumenttypen so eingestellt, dass sie zu euren
              Mitarbeitenden-Strukturen passen.
            </p>
            <ul className="mt-3 space-y-1.5 text-xs text-slate-600">
              <li>• Definition der wichtigsten Dokumenttypen (z. B. Aufenthaltstitel, Blue Card, Arbeitserlaubnis)</li>
              <li>• Pflichtfelder wie Gültig-von / Gültig-bis, Behörde, Dokumentennummer</li>
              <li>• Freitextfelder für Nebenbestimmungen, Hinweise oder interne Notizen</li>
            </ul>
          </div>

          {/* 3: Reminder-Logik */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <h3 className="text-sm font-semibold text-slate-900">
              3. E-Mail-Erinnerungen &amp; Vorlaufzeiten definieren
            </h3>
            <p className="mt-2 text-xs text-slate-600">
              Die Reminder-Logik sorgt dafür, dass keine Frist mehr untergeht – und die
              richtigen Personen zur richtigen Zeit informiert werden.
            </p>
            <ul className="mt-3 space-y-1.5 text-xs text-slate-600">
              <li>• Festlegung von Vorlaufzeiten (z. B. 180 / 90 / 60 / 30 Tage vor Ablauf)</li>
              <li>• Auswahl der Empfänger: Mitarbeitende, Führungskraft, HR oder Kombination</li>
              <li>• Anpassbare Betreffzeilen &amp; E-Mail-Texte im Unternehmens-Tonfall</li>
            </ul>
          </div>

          {/* 4: Datenübernahme & Integration */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <h3 className="text-sm font-semibold text-slate-900">
              4. Datenübernahme &amp; Anbindung an bestehende HR-Systeme
            </h3>
            <p className="mt-2 text-xs text-slate-600">
              Zum Start werden Mitarbeitende und erste Aufenthaltstitel-Daten übernommen –
              zunächst pragmatisch, später auf Wunsch automatisiert.
            </p>
            <ul className="mt-3 space-y-1.5 text-xs text-slate-600">
              <li>• Manuelle Erfassung oder Import per CSV-Export aus eurer HR-Software</li>
              <li>• Abgleich &amp; Bereinigung von Dubletten und veralteten Einträgen</li>
              <li>• Geplante API-Anbindung, um Stayfix langfristig mit HR-Systemen zu synchronisieren</li>
            </ul>
          </div>

          {/* 5: Testphase */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <h3 className="text-sm font-semibold text-slate-900">
              5. Testlauf mit Pilotgruppe &amp; Feinschliff
            </h3>
            <p className="mt-2 text-xs text-slate-600">
              Bevor Stayfix für alle ausgerollt wird, starten viele Unternehmen mit einer
              überschaubaren Pilotgruppe.
            </p>
            <ul className="mt-3 space-y-1.5 text-xs text-slate-600">
              <li>• Auswahl einer Pilotgruppe mit internationalen Mitarbeitenden</li>
              <li>• Überprüfung, ob Reminder-Zeitpunkte und Texte praxisnah sind</li>
              <li>• Feinanpassungen an Dokumenttypen, Rollen und Filtern</li>
            </ul>
          </div>

          {/* 6: Rollout */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <h3 className="text-sm font-semibold text-slate-900">
              6. Rollout &amp; laufender Betrieb
            </h3>
            <p className="mt-2 text-xs text-slate-600">
              Wenn die Konfiguration sitzt, wird Stayfix für alle relevanten Bereiche
              freigeschaltet – ab dann läuft die Fristenüberwachung automatisch im Hintergrund.
            </p>
            <ul className="mt-3 space-y-1.5 text-xs text-slate-600">
              <li>• Rollout-Kommunikation an Führungskräfte und beteiligte Teams</li>
              <li>• Kurze Einweisung für Admins &amp; HR-Mitarbeitende</li>
              <li>• Regelmäßige Auswertung der Dashboards für HR &amp; Compliance</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="mt-14 rounded-3xl border border-slate-200 bg-slate-50 px-5 py-6 sm:px-7 sm:py-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-base font-semibold tracking-tight text-slate-900">
              Möchtet ihr den Ablauf einmal im Detail durchgehen?
            </h2>
            <p className="mt-2 max-w-xl text-sm text-slate-600">
              In einem kurzen Gespräch zeigen wir euch live, wie der Einstieg mit Stayfix
              aussieht, welche Konfigurationsschritte für euch sinnvoll sind und wie sich
              Stayfix in eure bestehende HR-Landschaft einfügt.
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:items-end">
            <Link
              href="/beratung"
              className="inline-flex items-center justify-center rounded-full bg-[#3B5BFF] px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-[#3049D9]"
            >
              Beratungstermin buchen
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
