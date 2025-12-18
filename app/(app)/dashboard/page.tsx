// app/(app)/dashboard/page.tsx
export default function DashboardHomePage() {
  // Später kannst du hier echte Zahlen aus der DB reinziehen
  const stats = {
    totalEmployees: 0,
    withPermits: 0,
    expiring90Days: 0,
    expiring30Days: 0,
    expired: 0,
    remindersToday: 0,
    remindersThisWeek: 0,
    employeesWithoutPermit: 0,
  }

  const criticalDocs = [
    {
      name: 'Ali Hassan',
      type: 'Aufenthaltstitel',
      validUntil: '15.03.2026',
      remaining: '60 Tage',
      status: 'bald_ab',
    },
    {
      name: 'Marta Kowalska',
      type: 'Arbeitserlaubnis',
      validUntil: '01.02.2026',
      remaining: 'Abgelaufen',
      status: 'abgelaufen',
    },
    {
      name: 'Igor Petrov',
      type: 'Blue Card EU',
      validUntil: '30.09.2026',
      remaining: 'OK',
      status: 'ok',
    },
  ]

  const nextExpiries = [
    { label: 'Innerhalb der nächsten 30 Tage', count: 0 },
    { label: 'In 31–60 Tagen', count: 0 },
    { label: 'In 61–90 Tagen', count: 0 },
  ]

  return (
    // KEIN max-w, KEIN mx-auto -> volle Breite
    <main className="px-4 pb-16 pt-8 md:px-8 md:pt-10 lg:px-10 lg:pt-12">
      {/* Kopfbereich */}
      <section className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="mb-2 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-50 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-emerald-700">
            Dashboard · Aufenthaltstitel · Compliance
          </p>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl md:text-[32px]">
            Überblick über Aufenthaltstitel &amp; Arbeitserlaubnisse.
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600">
            Hier sehen Sie auf einen Blick, wie viele Mitarbeitende erfasst sind, welche
            Aufenthaltstitel bald ablaufen und wo akuter Handlungsbedarf besteht. Ideal für HR,
            Compliance &amp; Geschäftsführung.
          </p>
        </div>
        <div className="mt-1 flex flex-col items-start gap-1 text-[11px] text-slate-500 sm:items-end">
          <span>Letztes Update: gerade eben</span>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-medium text-slate-700">
            Live-Daten aus Stayfix (sobald angebunden)
          </span>
        </div>
      </section>

      {/* Top-KPIs – nutzt jetzt mehr Breite */}
      <section className="mt-8 grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
        {/* Mitarbeitende gesamt */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-[11px] font-medium text-slate-600">Mitarbeitende gesamt</p>
          <p className="mt-2 text-2xl font-semibold text-slate-900">{stats.totalEmployees}</p>
          <p className="mt-1 text-[11px] text-slate-500">
            Alle im System erfassten Mitarbeitenden.
          </p>
        </div>

        {/* Mitarbeitende mit Aufenthaltstitel */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-[11px] font-medium text-slate-600">
            Mitarbeitende mit Aufenthaltstitel
          </p>
          <p className="mt-2 text-2xl font-semibold text-slate-900">
            {stats.withPermits}/{stats.totalEmployees}
          </p>
          <p className="mt-1 text-[11px] text-slate-500">
            Davon mit hinterlegten Aufenthaltstiteln &amp; Arbeitserlaubnissen.
          </p>
        </div>

        {/* Laufen in ≤ 90 Tagen ab */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-[11px] font-medium text-slate-600">
            Aufenthaltstitel laufen in ≤ 90 Tagen ab
          </p>
          <p className="mt-2 text-2xl font-semibold text-amber-600">
            {stats.expiring90Days}
          </p>
          <p className="mt-1 text-[11px] text-slate-500">
            Inklusive aller Dokumente mit kritischer Frist.
          </p>
        </div>

        {/* Abgelaufen */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-[11px] font-medium text-slate-600">Abgelaufene Dokumente</p>
          <p className="mt-2 text-2xl font-semibold text-rose-600">{stats.expired}</p>
          <p className="mt-1 text-[11px] text-slate-500">
            Dokumente, bei denen sofortiger Handlungsbedarf besteht.
          </p>
        </div>
      </section>

      {/* Kritische Fälle + Fristenübersicht – gespannter auf Breite */}
      <section className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1.6fr),minmax(0,1fr)]">
        {/* Kritische Fälle */}
        <div className="rounded-3xl border border-slate-200 bg-white/80 p-4 shadow-[0_18px_40px_rgba(15,23,42,0.06)]">
          <div className="mb-3 flex items-center justify-between gap-2 text-xs">
            <div className="font-medium text-slate-900">Kritische Fälle &amp; nächste Abläufe</div>
            <div className="rounded-full bg-rose-50 px-3 py-1 text-[11px] font-medium text-rose-700">
              Fokus: abgelaufen &amp; ≤ 30 Tage
            </div>
          </div>

          <div className="space-y-2 text-xs">
            {criticalDocs.map((doc) => (
              <div
                key={`${doc.name}-${doc.type}`}
                className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2"
              >
                <div>
                  <p className="text-sm font-medium text-slate-900">{doc.name}</p>
                  <p className="text-[11px] text-slate-500">
                    {doc.type} · gültig bis {doc.validUntil}
                  </p>
                </div>

                {doc.status === 'abgelaufen' && (
                  <span className="rounded-full bg-rose-50 px-2.5 py-1 text-[11px] font-medium text-rose-700">
                    Abgelaufen
                  </span>
                )}
                {doc.status === 'bald_ab' && (
                  <span className="rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-medium text-amber-700">
                    {doc.remaining}
                  </span>
                )}
                {doc.status === 'ok' && (
                  <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-medium text-emerald-700">
                    OK
                  </span>
                )}
              </div>
            ))}
          </div>

          <p className="mt-3 text-[11px] text-slate-500">
            In der Live-Version erscheinen hier automatisch alle Personen, deren Dokumente in den
            nächsten 90 Tagen ablaufen oder bereits abgelaufen sind – sortiert nach Dringlichkeit.
          </p>
        </div>

        {/* Fristenübersicht / Timeline */}
        <div className="rounded-3xl border border-slate-200 bg-slate-50/80 p-4 shadow-sm">
          <div className="mb-3 flex items-center justify-between gap-2 text-xs">
            <div className="font-medium text-slate-900">Fristen nach Zeitraum</div>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] text-slate-600">
              Nächste 90 Tage
            </span>
          </div>

          <div className="space-y-3 text-xs">
            {nextExpiries.map((entry) => (
              <div
                key={entry.label}
                className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-3 py-2"
              >
                <div>
                  <p className="font-medium text-slate-900">{entry.label}</p>
                  <p className="text-[11px] text-slate-500">
                    Anzahl Aufenthaltstitel mit Frist in diesem Zeitraum.
                  </p>
                </div>
                <p className="text-lg font-semibold text-slate-900">{entry.count}</p>
              </div>
            ))}
          </div>

          <p className="mt-3 text-[11px] text-slate-500">
            Damit sehen Sie sofort, wie sich Ihre Fristen über die nächsten 3 Monate verteilen.
          </p>
        </div>
      </section>

      {/* Aktivität & Qualität der Daten */}
      <section className="mt-10 grid gap-6 lg:grid-cols-2">
        {/* E-Mail-Aktivität */}
        <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="mb-3 flex items-center justify-between gap-2 text-xs">
            <div className="font-medium text-slate-900">E-Mail-Erinnerungen</div>
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-medium text-emerald-700">
              Automatisiert durch Stayfix
            </span>
          </div>

          <div className="grid gap-3 text-xs sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2">
              <p className="text-[11px] font-medium text-slate-700">Heute versendet</p>
              <p className="mt-1 text-lg font-semibold text-slate-900">
                {stats.remindersToday}
              </p>
              <p className="mt-1 text-[10px] text-slate-500">
                Erinnerungs-E-Mails an Mitarbeitende &amp; Vorgesetzte.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2">
              <p className="text-[11px] font-medium text-slate-700">Diese Woche</p>
              <p className="mt-1 text-lg font-semibold text-slate-900">
                {stats.remindersThisWeek}
              </p>
              <p className="mt-1 text-[10px] text-slate-500">
                Summe aller versendeten Erinnerungen der laufenden Kalenderwoche.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2">
              <p className="text-[11px] font-medium text-slate-700">Mitarbeitende ohne E-Mail</p>
              <p className="mt-1 text-lg font-semibold text-amber-600">0</p>
              <p className="mt-1 text-[10px] text-slate-500">
                Für diese Personen können keine Erinnerungen verschickt werden.
              </p>
            </div>
          </div>

          <p className="mt-3 text-[11px] text-slate-500">
            Sobald die E-Mail-Logik angebunden ist, sehen Sie hier in Echtzeit, wie aktiv das
            System arbeitet – inklusive Historie und Nachvollziehbarkeit.
          </p>
        </div>

        {/* Datenqualität */}
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 shadow-sm">
          <div className="mb-3 flex items-center justify-between gap-2 text-xs">
            <div className="font-medium text-slate-900">Datenqualität im Blick</div>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] text-slate-600">
              Wichtig für Compliance &amp; Revision
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-3 py-2">
              <div>
                <p className="font-medium text-slate-900">
                  Mitarbeitende ohne Aufenthaltstitel im System
                </p>
                <p className="text-[11px] text-slate-500">
                  Personen mit Stammdaten, aber ohne hinterlegtes Dokument.
                </p>
              </div>
              <p className="text-lg font-semibold text-amber-600">
                {stats.employeesWithoutPermit}
              </p>
            </div>

            <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-3 py-2">
              <div>
                <p className="font-medium text-slate-900">Dokumente ohne Gültigkeitsdatum</p>
                <p className="text-[11px] text-slate-500">
                  Hier fehlen Fristen – Erinnerungen sind so nicht möglich.
                </p>
              </div>
              <p className="text-lg font-semibold text-slate-900">0</p>
            </div>

            <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-3 py-2">
              <div>
                <p className="font-medium text-slate-900">Dokumente ohne hinterlegte Behörde</p>
                <p className="text-[11px] text-slate-500">
                  Optional, aber hilfreich bei Rückfragen und Prüfungen.
                </p>
              </div>
              <p className="text-lg font-semibold text-slate-900">0</p>
            </div>
          </div>

          <p className="mt-3 text-[11px] text-slate-500">
            Ziel ist, dass Stayfix nicht nur Fristen überwacht, sondern auch die Datenqualität
            rund um Aufenthaltstitel dauerhaft hoch hält.
          </p>
        </div>
      </section>
    </main>
  )
}
