'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'

type EmployeeStatus = 'active' | 'inactive' | 'open'
type EmployeeDocument = { name: string; path: string }

type EmployeeRow = {
  id: string
  status: EmployeeStatus
  first_name: string
  last_name: string
  birthdate: string
  org_unit_id: string | null
  residence_title_id: string | null
  valid_until: string | null
  document_urls: EmployeeDocument[] | null
}

type OrgUnitRow = { id: string; name: string; role: string | null }
type ResidenceTitleRow = { id: string; name: string; code: string | null; is_active: boolean }

const STATUS_LABEL: Record<EmployeeStatus, string> = {
  active: 'Aktiv',
  inactive: 'Deaktiviert',
  open: 'Offen',
}

const STATUS_BADGE_CLASS: Record<EmployeeStatus, string> = {
  active: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  inactive: 'border-slate-200 bg-slate-50 text-slate-600',
  open: 'border-amber-200 bg-amber-50 text-amber-700',
}

function Step({
  done,
  title,
  desc,
  href,
  cta,
}: {
  done: boolean
  title: string
  desc: string
  href: string
  cta: string
}) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4">
      <span
        className={`mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full border text-[11px] ${
          done ? 'border-emerald-200 bg-emerald-50 text-emerald-700' : 'border-slate-200 bg-slate-50 text-slate-600'
        }`}
      >
        {done ? '✓' : '→'}
      </span>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-slate-900">{title}</p>
        <p className="mt-1 text-[12px] leading-relaxed text-slate-600">{desc}</p>

        <div className="mt-3">
          <Link
            href={href}
            className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[12px] font-medium text-slate-700 shadow-sm hover:bg-slate-50"
          >
            {cta}
          </Link>
        </div>
      </div>
    </div>
  )
}

function daysUntil(dateStr: string) {
  // dateStr: YYYY-MM-DD
  const today = new Date()
  const d = new Date(dateStr + 'T00:00:00')
  const t0 = new Date(today.getFullYear(), today.getMonth(), today.getDate())
  const diff = d.getTime() - t0.getTime()
  return Math.floor(diff / (1000 * 60 * 60 * 24))
}

export default function MitarbeitendeOverviewPage() {
  const router = useRouter()

  const [employees, setEmployees] = useState<EmployeeRow[]>([])
  const [orgUnits, setOrgUnits] = useState<OrgUnitRow[]>([])
  const [residenceTitles, setResidenceTitles] = useState<ResidenceTitleRow[]>([])
  const [hasNotifications, setHasNotifications] = useState(false)

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Suche / Filter
  const [q, setQ] = useState('')
  const [orgFilter, setOrgFilter] = useState('') // org_unit_id
  const [titleFilter, setTitleFilter] = useState('') // residence_title_id
  const [statusFilter, setStatusFilter] = useState<'all' | EmployeeStatus>('all') // fix
  const [validityFilter, setValidityFilter] = useState<'all' | 'expired' | 'expiring30' | 'none'>('all') // fix

  async function loadAll() {
    setLoading(true)
    setError(null)
    try {
      const [empRes, orgRes, titleRes, rulesRes, profilesRes] = await Promise.all([
        fetch('/api/employees'),
        fetch('/api/org-units'),
        fetch('/api/residence-titles'),
        fetch('/api/notification-rules'),
        fetch('/api/notification-profiles'),
      ])

      const empData = empRes.ok ? await empRes.json() : null
      const orgData = orgRes.ok ? await orgRes.json() : null
      const titleData = titleRes.ok ? await titleRes.json() : null

      // notifications: reicht wenn rules ODER profiles existieren
      let notifOk = false
      if (rulesRes.ok) {
        const d = await rulesRes.json()
        notifOk = Boolean((d?.rules ?? []).length)
      }
      if (!notifOk && profilesRes.ok) {
        const d = await profilesRes.json()
        notifOk = Boolean((d ?? []).length)
      }

      if (!empRes.ok) throw new Error(empData?.error || 'Fehler beim Laden der Mitarbeitenden.')
      if (!orgRes.ok) throw new Error(orgData?.error || 'Fehler beim Laden der Organisationseinheiten.')
      if (!titleRes.ok) throw new Error(titleData?.error || 'Fehler beim Laden der Aufenthaltstitel.')

      setEmployees((empData ?? []).map((e: any) => ({ ...e, document_urls: (e.document_urls as any) ?? [] })))
      setOrgUnits(orgData ?? [])
      setResidenceTitles(titleData ?? [])
      setHasNotifications(notifOk)
    } catch (e: any) {
      console.error(e)
      setError(e.message ?? 'Unbekannter Fehler.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadAll()
  }, [])

  const orgUnitMap = useMemo(() => new Map(orgUnits.map((u) => [u.id, u])), [orgUnits])
  const titleMap = useMemo(() => new Map(residenceTitles.map((t) => [t.id, t])), [residenceTitles])

  function getOrgUnitLabel(emp: EmployeeRow) {
    if (!emp.org_unit_id) return 'Keine Org-Einheit'
    const u = orgUnitMap.get(emp.org_unit_id)
    if (!u) return 'Org-Einheit (gelöscht)'
    return u.role ? `${u.name} · ${u.role}` : u.name
  }

  function getResidenceTitleLabel(emp: EmployeeRow) {
    if (!emp.residence_title_id) return 'Kein Aufenthaltstitel'
    const t = titleMap.get(emp.residence_title_id)
    if (!t) return 'Aufenthaltstitel (gelöscht)'
    return t.code ? `${t.code} · ${t.name}` : t.name
  }

  async function handleDelete(id: string) {
    const emp = employees.find((e) => e.id === id)
    const label = emp ? `${emp.first_name} ${emp.last_name}` : 'diesen Mitarbeitenden'
    if (!window.confirm(`Möchten Sie "${label}" wirklich löschen?`)) return

    setError(null)
    try {
      const res = await fetch('/api/employees', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })
      const data = await res.json().catch(() => null)
      if (!res.ok) throw new Error(data?.error || 'Fehler beim Löschen.')
      await loadAll()
    } catch (e: any) {
      console.error(e)
      setError(e.message ?? 'Unbekannter Fehler beim Löschen.')
    }
  }

  async function toggleEmployeeStatus(emp: EmployeeRow) {
    const next: EmployeeStatus = emp.status === 'inactive' ? 'active' : 'inactive'
    setError(null)
    try {
      const res = await fetch('/api/employees', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: emp.id, status: next }),
      })
      const data = await res.json().catch(() => null)
      if (!res.ok) throw new Error(data?.error || 'Fehler beim Aktualisieren des Status.')
      await loadAll()
    } catch (e: any) {
      console.error(e)
      setError(e.message ?? 'Unbekannter Fehler beim Statuswechsel.')
    }
  }

  const doneOrg = orgUnits.length > 0
  const doneNotif = hasNotifications
  const doneTitle = residenceTitles.filter((t) => t.is_active).length > 0

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase()
    const today = new Date()
    const t0 = new Date(today.getFullYear(), today.getMonth(), today.getDate())

    return employees.filter((e) => {
      // Suche: Name + Geburtsdatum
      if (query) {
        const name = `${e.first_name} ${e.last_name}`.toLowerCase()
        const bd = (e.birthdate ?? '').toLowerCase()
        if (!name.includes(query) && !bd.includes(query)) return false
      }

      // Org dynamisch
      if (orgFilter && e.org_unit_id !== orgFilter) return false

      // Aufenthaltstitel dynamisch
      if (titleFilter && e.residence_title_id !== titleFilter) return false

      // Status fix
      if (statusFilter !== 'all' && e.status !== statusFilter) return false

      // Gültig bis fix
      if (validityFilter !== 'all') {
        if (validityFilter === 'none') {
          if (e.valid_until) return false
        } else {
          if (!e.valid_until) return false
          const d = new Date(e.valid_until + 'T00:00:00')
          const diffDays = Math.floor((d.getTime() - t0.getTime()) / (1000 * 60 * 60 * 24))

          if (validityFilter === 'expired' && diffDays >= 0) return false
          if (validityFilter === 'expiring30' && !(diffDays >= 0 && diffDays <= 30)) return false
        }
      }

      return true
    })
  }, [employees, q, orgFilter, titleFilter, statusFilter, validityFilter])

  return (
    <main className="px-4 pb-16 pt-8 md:px-8 md:pt-10 lg:px-10 lg:pt-12">
      <section className="mb-6 flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="mb-2 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-50 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-emerald-700">
            Mitarbeitende · Übersicht
          </p>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">Mitarbeitende</h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
            Überblick über alle Mitarbeitenden inkl. Status, Organisation und Aufenthaltstitel.
          </p>
        </div>

        <Link
          href="/dashboard/mitarbeitende/neu"
          className="inline-flex items-center justify-center rounded-full bg-[#3B5BFF] px-4 py-2 text-xs font-medium text-white shadow-sm hover:bg-[#3049D9]"
        >
          + Mitarbeitende/n hinzufügen
        </Link>
      </section>

      {error && (
        <div className="mb-6 rounded-2xl border border-rose-200 bg-rose-50 px-3 py-2 text-[11px] text-rose-700">
          {error}
        </div>
      )}

      {loading ? (
        <p className="text-sm text-slate-600">Lade Mitarbeitende …</p>
      ) : employees.length === 0 ? (
        <section className="space-y-4">
          <div className="rounded-3xl border border-slate-200 bg-white p-5">
            <p className="text-sm font-semibold text-slate-900">Noch keine Mitarbeitenden vorhanden.</p>
            <p className="mt-2 text-[12px] leading-relaxed text-slate-600">
              Empfohlener Setup-Flow, damit Stayfix sauber läuft:
            </p>

            <div className="mt-4 grid gap-3 lg:grid-cols-2">
              <Step
                done={doneOrg}
                title="1) Organigramm anlegen"
                desc="Organisationseinheiten + Verantwortliche hinterlegen, damit Benachrichtigungen später korrekt zugestellt werden."
                href="/dashboard/organigramm"
                cta="Organigramm öffnen"
              />
              <Step
                done={doneNotif}
                title="2) Benachrichtigungen anlegen"
                desc="Regeln/Phasen definieren oder Profile anlegen, damit Reminder automatisch geplant werden können."
                href="/dashboard/benachrichtigung"
                cta="Benachrichtigungen öffnen"
              />
              <Step
                done={doneTitle}
                title="3) Aufenthaltstitel hinterlegen"
                desc="Titel-Templates und Pflichtfelder definieren (Nummer, gültig bis, Behörde etc.)."
                href="/dashboard/aufenthaltstitel"
                cta="Aufenthaltstitel öffnen"
              />
              <Step
                done={false}
                title="4) Mitarbeitende hinzufügen"
                desc="Jetzt können Sie Mitarbeitende anlegen und Organigramm / Titel / Profile zuordnen."
                href="/dashboard/mitarbeitende/neu"
                cta="Mitarbeitende/n hinzufügen"
              />
            </div>
          </div>
        </section>
      ) : (
        <section className="space-y-4">
          {/* Suche + Filter */}
          <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="grid gap-3 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,0.8fr)_minmax(0,0.8fr)]">
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-medium text-slate-700">Suche (Name / Geburtsdatum)</label>
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="z.B. Christoph oder 1990-12-16"
                  className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none focus:border-[#3B5BFF] focus:ring-1 focus:ring-[#3B5BFF]/40"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-medium text-slate-700">Organisation</label>
                <select
                  value={orgFilter}
                  onChange={(e) => setOrgFilter(e.target.value)}
                  className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none focus:border-[#3B5BFF] focus:ring-1 focus:ring-[#3B5BFF]/40"
                >
                  <option value="">Alle</option>
                  {orgUnits.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.role ? `${u.name} · ${u.role}` : u.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-medium text-slate-700">Aufenthaltstitel</label>
                <select
                  value={titleFilter}
                  onChange={(e) => setTitleFilter(e.target.value)}
                  className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none focus:border-[#3B5BFF] focus:ring-1 focus:ring-[#3B5BFF]/40"
                >
                  <option value="">Alle</option>
                  {residenceTitles.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.code ? `${t.code} · ${t.name}` : t.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-medium text-slate-700">Status</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as any)}
                  className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none focus:border-[#3B5BFF] focus:ring-1 focus:ring-[#3B5BFF]/40"
                >
                  <option value="all">Alle</option>
                  <option value="active">Aktiv</option>
                  <option value="open">Offen</option>
                  <option value="inactive">Deaktiviert</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-medium text-slate-700">Gültig bis</label>
                <select
                  value={validityFilter}
                  onChange={(e) => setValidityFilter(e.target.value as any)}
                  className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none focus:border-[#3B5BFF] focus:ring-1 focus:ring-[#3B5BFF]/40"
                >
                  <option value="all">Alle</option>
                  <option value="expiring30">Läuft in 30 Tagen ab</option>
                  <option value="expired">Abgelaufen</option>
                  <option value="none">Kein Datum</option>
                </select>
              </div>
            </div>

            <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-[12px] text-slate-600">
              <p>
                Treffer: <span className="font-medium text-slate-900">{filtered.length}</span> / {employees.length}
              </p>
              <button
                type="button"
                onClick={() => {
                  setQ('')
                  setOrgFilter('')
                  setTitleFilter('')
                  setStatusFilter('all')
                  setValidityFilter('all')
                }}
                className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[12px] font-medium text-slate-700 shadow-sm hover:bg-slate-50"
              >
                Filter zurücksetzen
              </button>
            </div>
          </div>

          {/* Liste */}
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            {/* Desktop Kopfzeile */}
            <div className="hidden bg-slate-50/80 px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-slate-500 md:block">
              <div className="grid grid-cols-[minmax(0,1.6fr)_minmax(0,1.2fr)_minmax(0,1.4fr)_minmax(0,0.7fr)_minmax(0,0.6fr)_minmax(0,1fr)] items-center gap-3">
                <div>Mitarbeitende/r</div>
                <div>Organisation</div>
                <div>Aufenthaltstitel</div>
                <div>Gültig bis</div>
                <div>Status</div>
                <div className="text-right">Aktionen</div>
              </div>
            </div>

            {/* Rows */}
            <div className="divide-y divide-slate-100">
              {filtered.map((emp) => {
                const viewHref = `/dashboard/mitarbeitende/${emp.id}/ansicht`

                return (
                  <div
                    key={emp.id}
                    role="link"
                    tabIndex={0}
                    onClick={() => router.push(viewHref)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') router.push(viewHref)
                    }}
                    className="group cursor-pointer border-y-2 border-slate-100 px-4 py-3 hover:bg-slate-50/60 focus:outline-none focus:ring-2 focus:ring-[#3B5BFF]/20"
                  >
                    {/* Desktop row */}
                    <div className="hidden grid-cols-[minmax(0,1.6fr)_minmax(0,1.2fr)_minmax(0,1.4fr)_minmax(0,0.7fr)_minmax(0,0.6fr)_minmax(0,1fr)] items-center gap-3 md:grid">
                      {/* Mitarbeiter */}
                      <div className="min-w-0">
                        <div className="font-medium text-slate-900">
                          {emp.first_name} {emp.last_name}
                        </div>
                        <div className="text-[10px] text-slate-500">Geb.: {emp.birthdate}</div>
                      </div>

                      {/* Org */}
                      <div className="min-w-0 text-[12px] text-slate-700">{getOrgUnitLabel(emp)}</div>

                      {/* Titel */}
                      <div className="min-w-0 text-[12px] text-slate-700">{getResidenceTitleLabel(emp)}</div>

                      {/* gültig bis */}
                      <div className="text-[12px] text-slate-700">
                        {emp.valid_until || '—'}
                        {emp.valid_until ? (
                          <span className="ml-2 text-[10px] text-slate-500">
                            ({(() => {
                              const d = daysUntil(emp.valid_until!)
                              if (d < 0) return `${Math.abs(d)} Tage drüber`
                              if (d === 0) return `heute`
                              return `in ${d} Tagen`
                            })()})
                          </span>
                        ) : null}
                      </div>

                      {/* Status */}
                      <div className="flex items-center">
                        <span
                          className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] ${STATUS_BADGE_CLASS[emp.status]}`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              emp.status === 'active'
                                ? 'bg-emerald-500'
                                : emp.status === 'open'
                                ? 'bg-amber-400'
                                : 'bg-slate-400'
                            }`}
                          />
                          {STATUS_LABEL[emp.status]}
                        </span>
                      </div>

                      {/* Aktionen */}
                      <div className="flex items-center justify-end gap-1 text-[10px]">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            router.push(`/dashboard/mitarbeitende/${emp.id}`)
                          }}
                          className="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-slate-700 hover:bg-slate-100"
                        >
                          Bearbeiten
                        </button>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            toggleEmployeeStatus(emp)
                          }}
                          className="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-slate-700 hover:bg-slate-100"
                        >
                          {emp.status === 'inactive' ? 'Reaktivieren' : 'Deaktivieren'}
                        </button>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            handleDelete(emp.id)
                          }}
                          className="rounded-full border border-rose-200 bg-rose-50 px-2 py-0.5 text-rose-600 hover:bg-rose-100"
                        >
                          Löschen
                        </button>
                      </div>
                    </div>

                    {/* Mobile card */}
                    <div className="md:hidden">
                      <div className="flex items-center justify-between gap-2">
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-slate-900">
                            {emp.first_name} {emp.last_name}
                          </p>
                          <p className="text-[10px] text-slate-500">Geb.: {emp.birthdate}</p>
                        </div>
                        <span
                          className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] ${STATUS_BADGE_CLASS[emp.status]}`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              emp.status === 'active'
                                ? 'bg-emerald-500'
                                : emp.status === 'open'
                                ? 'bg-amber-400'
                                : 'bg-slate-400'
                            }`}
                          />
                          {STATUS_LABEL[emp.status]}
                        </span>
                      </div>

                      <div className="mt-2 space-y-1 text-[12px] text-slate-700">
                        <p>
                          <span className="font-medium">Organisation:</span> {getOrgUnitLabel(emp)}
                        </p>
                        <p>
                          <span className="font-medium">Aufenthaltstitel:</span> {getResidenceTitleLabel(emp)}
                        </p>
                        <p>
                          <span className="font-medium">Gültig bis:</span> {emp.valid_until || '—'}
                        </p>
                      </div>

                      <div className="mt-3 flex flex-wrap gap-1 text-[10px]">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            router.push(`/dashboard/mitarbeitende/${emp.id}`)
                          }}
                          className="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-slate-700 hover:bg-slate-100"
                        >
                          Bearbeiten
                        </button>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            toggleEmployeeStatus(emp)
                          }}
                          className="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-slate-700 hover:bg-slate-100"
                        >
                          {emp.status === 'inactive' ? 'Reaktivieren' : 'Deaktivieren'}
                        </button>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            handleDelete(emp.id)
                          }}
                          className="rounded-full border border-rose-200 bg-rose-50 px-2 py-0.5 text-rose-600 hover:bg-rose-100"
                        >
                          Löschen
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}
    </main>
  )
}
