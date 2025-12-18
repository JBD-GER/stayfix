'use client'

import { FormEvent, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'

type EmployeeStatus = 'active' | 'inactive' | 'open'

type OrgUnitRow = {
  id: string
  user_id: string
  parent_id: string | null
  name: string
  email: string
  role: string | null
  supervisor_name: string | null
  supervisor_email: string | null
  supervisor_phone: string | null
  employee_count: number
  level: number | null
  sort_index: number
}

type ResidenceTitleRow = {
  id: string
  user_id: string
  name: string
  code: string | null
  category: string | null
  country: string | null
  description: string | null
  require_permit_number: boolean
  require_valid_from: boolean
  require_valid_until: boolean
  require_issuing_authority: boolean
  require_restrictions: boolean
  require_priority_check: boolean
  require_priority_code: boolean
  require_employment_details: boolean
  require_document_upload: boolean
  is_active: boolean
  created_at: string
}

type NotificationRuleRow = {
  id: string
  user_id: string
  name: string
  description: string | null
  is_active: boolean
  created_at: string
}

type EmployeeDocument = {
  name: string
  path: string
}

type EmployeeRow = {
  id: string
  user_id: string
  status: EmployeeStatus
  first_name: string
  last_name: string
  birthdate: string
  street: string | null
  house_number: string | null
  postal_code: string | null
  city: string | null
  email: string | null
  phone: string | null
  employee_number: string | null
  nationality: string | null
  org_unit_id: string | null
  residence_title_id: string | null
  notification_rule_id: string | null
  permit_number: string | null
  valid_from: string | null
  valid_until: string | null
  issuing_authority: string | null
  restrictions: string | null
  priority_check: boolean | null
  priority_code: string | null
  employment_details: string | null
  document_urls: EmployeeDocument[] | null
  note: string | null
  created_at: string
}

export default function EmployeeForm({
  mode,
  employeeId,
}: {
  mode: 'create' | 'edit'
  employeeId?: string
}) {
  const router = useRouter()

  const [orgUnits, setOrgUnits] = useState<OrgUnitRow[]>([])
  const [residenceTitles, setResidenceTitles] = useState<ResidenceTitleRow[]>([])
  const [notificationRules, setNotificationRules] = useState<NotificationRuleRow[]>([])

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploadingDocs, setUploadingDocs] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [editingId, setEditingId] = useState<string | null>(
    mode === 'edit' ? (employeeId ?? null) : null
  )

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [birthdate, setBirthdate] = useState('')

  const [street, setStreet] = useState('')
  const [houseNumber, setHouseNumber] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [city, setCity] = useState('')

  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [employeeNumber, setEmployeeNumber] = useState('')
  const [nationality, setNationality] = useState('')

  const [orgUnitId, setOrgUnitId] = useState<string>('')
  const [notificationRuleId, setNotificationRuleId] = useState<string>('') // ✅ Rule statt Profile
  const [residenceTitleId, setResidenceTitleId] = useState<string>('')

  const [status, setStatus] = useState<EmployeeStatus>('active')

  const [permitNumber, setPermitNumber] = useState('')
  const [validFrom, setValidFrom] = useState('')
  const [validUntil, setValidUntil] = useState('')
  const [issuingAuthority, setIssuingAuthority] = useState('')
  const [restrictions, setRestrictions] = useState('')
  const [priorityCheck, setPriorityCheck] = useState<boolean>(false)
  const [priorityCode, setPriorityCode] = useState('')
  const [employmentDetails, setEmploymentDetails] = useState('')
  const [note, setNote] = useState('')

  const [documents, setDocuments] = useState<EmployeeDocument[]>([])

  const residenceTitleMap = useMemo(() => {
    const m = new Map<string, ResidenceTitleRow>()
    residenceTitles.forEach((t) => m.set(t.id, t))
    return m
  }, [residenceTitles])

  const currentTitle = residenceTitleId ? residenceTitleMap.get(residenceTitleId) : undefined

  async function loadMeta() {
    const [orgRes, titleRes, rulesRes] = await Promise.all([
      fetch('/api/org-units'),
      fetch('/api/residence-titles'),
      fetch('/api/notification-rules'),
    ])

    if (!orgRes.ok) {
      const d = await orgRes.json().catch(() => null)
      throw new Error(d?.error || 'Fehler beim Laden der Organisationseinheiten.')
    }
    if (!titleRes.ok) {
      const d = await titleRes.json().catch(() => null)
      throw new Error(d?.error || 'Fehler beim Laden der Aufenthaltstitel.')
    }
    if (!rulesRes.ok) {
      const d = await rulesRes.json().catch(() => null)
      throw new Error(d?.error || 'Fehler beim Laden der Benachrichtigungsregeln.')
    }

    setOrgUnits((await orgRes.json()) ?? [])
    setResidenceTitles((await titleRes.json()) ?? [])

    const rulesPayload = (await rulesRes.json().catch(() => null)) as any
    setNotificationRules(((rulesPayload?.rules ?? []) as NotificationRuleRow[]).filter(Boolean))
  }

  async function loadEmployeeIfEdit() {
    if (mode !== 'edit' || !employeeId) return

    const empRes = await fetch('/api/employees')
    if (!empRes.ok) {
      const d = await empRes.json().catch(() => null)
      throw new Error(d?.error || 'Fehler beim Laden der Mitarbeitenden.')
    }

    const all = ((await empRes.json()) ?? []) as EmployeeRow[]
    const emp = all.find((e) => e.id === employeeId)
    if (!emp) throw new Error('Mitarbeitende/r nicht gefunden.')

    setEditingId(emp.id)
    setFirstName(emp.first_name ?? '')
    setLastName(emp.last_name ?? '')
    setBirthdate(emp.birthdate ?? '')

    setStreet(emp.street ?? '')
    setHouseNumber(emp.house_number ?? '')
    setPostalCode(emp.postal_code ?? '')
    setCity(emp.city ?? '')

    setEmail(emp.email ?? '')
    setPhone(emp.phone ?? '')
    setEmployeeNumber(emp.employee_number ?? '')
    setNationality(emp.nationality ?? '')

    setOrgUnitId(emp.org_unit_id ?? '')
    setResidenceTitleId(emp.residence_title_id ?? '')
    setNotificationRuleId(emp.notification_rule_id ?? '')
    setStatus(emp.status)

    setPermitNumber(emp.permit_number ?? '')
    setValidFrom(emp.valid_from ?? '')
    setValidUntil(emp.valid_until ?? '')
    setIssuingAuthority(emp.issuing_authority ?? '')
    setRestrictions(emp.restrictions ?? '')
    setPriorityCheck(Boolean(emp.priority_check))
    setPriorityCode(emp.priority_code ?? '')
    setEmploymentDetails(emp.employment_details ?? '')
    setNote(emp.note ?? '')

    setDocuments(((emp.document_urls as any) ?? []) as EmployeeDocument[])
  }

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      setError(null)
      try {
        await loadMeta()
        await loadEmployeeIfEdit()
      } catch (e: any) {
        console.error(e)
        setError(e.message ?? 'Unbekannter Fehler beim Laden.')
      } finally {
        setLoading(false)
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, employeeId])

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError(null)

    try {
      if (!firstName.trim() || !lastName.trim() || !birthdate) {
        throw new Error('Bitte Vorname, Nachname und Geburtsdatum ausfüllen.')
      }

      let finalStatus: EmployeeStatus = status
      if (!residenceTitleId && finalStatus === 'active') {
        finalStatus = 'open'
      }

      const payload: any = {
        id: editingId ?? undefined,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        birthdate,

        street: street || undefined,
        houseNumber: houseNumber || undefined,
        postalCode: postalCode || undefined,
        city: city || undefined,

        email: email || undefined,
        phone: phone || undefined,
        employeeNumber: employeeNumber || undefined,
        nationality: nationality || undefined,

        orgUnitId: orgUnitId || null,
        residenceTitleId: residenceTitleId || null,

        notificationRuleId: notificationRuleId || null, // ✅ Rule

        status: finalStatus,

        permitNumber: permitNumber || undefined,
        validFrom: validFrom || null,
        validUntil: validUntil || null,
        issuingAuthority: issuingAuthority || undefined,
        restrictions: restrictions || undefined,
        priorityCheck,
        priorityCode: priorityCode || undefined,
        employmentDetails: employmentDetails || undefined,

        note: note || undefined,
        documentUrls: documents,
      }

      const res = await fetch('/api/employees', {
        method: editingId ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await res.json().catch(() => null)
      if (!res.ok) throw new Error(data?.error || 'Fehler beim Speichern des Mitarbeitenden.')

      router.push('/dashboard/mitarbeitende')
      router.refresh()
    } catch (e: any) {
      console.error(e)
      setError(e.message ?? 'Unbekannter Fehler beim Speichern.')
    } finally {
      setSaving(false)
    }
  }

  async function handleUploadDocuments(files: FileList | null) {
    if (!files || !editingId) return
    setUploadingDocs(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('employeeId', editingId)
      Array.from(files).forEach((file) => formData.append('files', file))

      const res = await fetch('/api/employees/documents', { method: 'POST', body: formData })
      const data = await res.json().catch(() => null)
      if (!res.ok) throw new Error(data?.error || 'Fehler beim Dokument-Upload.')

      const docs = (data?.documents ?? []) as EmployeeDocument[]
      setDocuments(docs)
    } catch (e: any) {
      console.error(e)
      setError(e.message ?? 'Unbekannter Fehler beim Dokument-Upload.')
    } finally {
      setUploadingDocs(false)
    }
  }

  if (loading) {
    return (
      <main className="px-4 pb-16 pt-8 md:px-8 md:pt-10 lg:px-10 lg:pt-12">
        <p className="text-sm text-slate-600">Lade Formular …</p>
      </main>
    )
  }

  return (
    <main className="px-4 pb-16 pt-8 md:px-8 md:pt-10 lg:px-10 lg:pt-12">
      {/* Header */}
      <section className="mb-8 space-y-3">
        <div>
          <p className="mb-2 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-50 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-emerald-700">
            Mitarbeitende · Stammdaten
          </p>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            {mode === 'edit' ? 'Mitarbeitende/n bearbeiten' : 'Mitarbeitende/n hinzufügen'}
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
            Vorname, Nachname und Geburtsdatum sind Pflichtfelder. Ohne Aufenthaltstitel wird die Person automatisch als{' '}
            <span className="font-medium">„Offen“</span> markiert.
          </p>
        </div>

        {error && (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 px-3 py-2 text-[11px] text-rose-700">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4 text-[11px] text-slate-600 md:px-5 md:py-5">
            <p className="mb-1 text-xs font-semibold text-slate-800">Hinweis</p>
            <ul className="space-y-1">
              <li>
                <span className="font-medium">Offen:</span> Kein Aufenthaltstitel hinterlegt.
              </li>
              <li>
                <span className="font-medium">Dokumente:</span> Upload ist im Bearbeiten-Modus möglich (nach dem Speichern).
              </li>
              <li>
                <span className="font-medium">Benachrichtigungsregel:</span> Optional – steuert später Reminder-Logik.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="grid w-full gap-6">
        <div className="rounded-3xl border border-slate-200 bg-white px-4 py-4 shadow-sm md:px-6 md:py-5">
          <form onSubmit={handleSubmit} className="grid gap-3 md:grid-cols-2">
            {/* Name + Geburtsdatum */}
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-medium text-slate-700">Vorname*</label>
              <input
                className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 outline-none focus:border-[#3B5BFF] focus:ring-1 focus:ring-[#3B5BFF]/40"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-medium text-slate-700">Nachname*</label>
              <input
                className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 outline-none focus:border-[#3B5BFF] focus:ring-1 focus:ring-[#3B5BFF]/40"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-medium text-slate-700">Geburtsdatum*</label>
              <input
                type="date"
                className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 outline-none focus:border-[#3B5BFF] focus:ring-1 focus:ring-[#3B5BFF]/40"
                value={birthdate}
                onChange={(e) => setBirthdate(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-medium text-slate-700">Mitarbeitenden-Nr. (optional)</label>
              <input
                className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 outline-none focus:border-[#3B5BFF] focus:ring-1 focus:ring-[#3B5BFF]/40"
                value={employeeNumber}
                onChange={(e) => setEmployeeNumber(e.target.value)}
              />
            </div>

            {/* Adresse */}
            <div className="flex flex-col gap-1 md:col-span-2">
              <label className="text-[11px] font-medium text-slate-700">Privatadresse</label>
              <div className="grid gap-2 sm:grid-cols-[minmax(0,2.2fr)_minmax(0,0.8fr)]">
                <input
                  className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 outline-none focus:border-[#3B5BFF] focus:ring-1 focus:ring-[#3B5BFF]/40"
                  placeholder="Straße"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                />
                <input
                  className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 outline-none focus:border-[#3B5BFF] focus:ring-1 focus:ring-[#3B5BFF]/40"
                  placeholder="Nr."
                  value={houseNumber}
                  onChange={(e) => setHouseNumber(e.target.value)}
                />
              </div>
              <div className="mt-1 grid gap-2 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,2.1fr)]">
                <input
                  className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 outline-none focus:border-[#3B5BFF] focus:ring-1 focus:ring-[#3B5BFF]/40"
                  placeholder="PLZ"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                />
                <input
                  className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 outline-none focus:border-[#3B5BFF] focus:ring-1 focus:ring-[#3B5BFF]/40"
                  placeholder="Ort"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
            </div>

            {/* Kontakt */}
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-medium text-slate-700">E-Mail</label>
              <input
                type="email"
                className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 outline-none focus:border-[#3B5BFF] focus:ring-1 focus:ring-[#3B5BFF]/40"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-medium text-slate-700">Telefonnummer</label>
              <input
                className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 outline-none focus:border-[#3B5BFF] focus:ring-1 focus:ring-[#3B5BFF]/40"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            {/* Nationalität & Org */}
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-medium text-slate-700">Nationalität (optional)</label>
              <input
                className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 outline-none focus:border-[#3B5BFF] focus:ring-1 focus:ring-[#3B5BFF]/40"
                value={nationality}
                onChange={(e) => setNationality(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-medium text-slate-700">Organisationseinheit</label>
              <select
                className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 outline-none focus:border-[#3B5BFF] focus:ring-1 focus:ring-[#3B5BFF]/40"
                value={orgUnitId}
                onChange={(e) => setOrgUnitId(e.target.value)}
              >
                <option value="">Keine Org-Einheit</option>
                {orgUnits.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name}
                    {u.role ? ` · ${u.role}` : ''}
                  </option>
                ))}
              </select>
            </div>

            {/* ✅ RULE SELECT */}
            <div className="flex flex-col gap-1 md:col-span-2">
              <label className="text-[11px] font-medium text-slate-700">Benachrichtigungsregel</label>
              <select
                className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 outline-none focus:border-[#3B5BFF] focus:ring-1 focus:ring-[#3B5BFF]/40"
                value={notificationRuleId}
                onChange={(e) => setNotificationRuleId(e.target.value)}
              >
                <option value="">Standard (keine Regel)</option>
                {notificationRules
                  .filter((r) => r.is_active)
                  .map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.name}
                    </option>
                  ))}
              </select>
              <p className="mt-1 text-[11px] text-slate-500">
                Optional: Regel steuert später, welche Reminder-Phasen für diese Person gelten.
              </p>
            </div>

            {/* Aufenthaltstitel */}
            <div className="flex flex-col gap-1 md:col-span-2">
              <label className="text-[11px] font-medium text-slate-700">Aufenthaltstitel (optional)</label>
              <select
                className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 outline-none focus:border-[#3B5BFF] focus:ring-1 focus:ring-[#3B5BFF]/40"
                value={residenceTitleId}
                onChange={(e) => setResidenceTitleId(e.target.value)}
              >
                <option value="">Kein Aufenthaltstitel (Status: Offen)</option>
                {residenceTitles
                  .filter((t) => t.is_active)
                  .map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.code ? `${t.code} · ${t.name}` : t.name}
                    </option>
                  ))}
              </select>
              {currentTitle && (
                <p className="mt-1 text-[11px] text-slate-500">
                  {currentTitle.description || 'Für diesen Aufenthaltstitel gelten unten die markierten Pflichtfelder.'}
                </p>
              )}
            </div>

            {/* Status */}
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-medium text-slate-700">Mitarbeitenden-Status</label>
              <div className="inline-flex rounded-full border border-slate-200 bg-slate-50 p-0.5 text-[11px]">
                <button
                  type="button"
                  onClick={() => setStatus('active')}
                  className={`flex-1 rounded-full px-3 py-1 ${
                    status === 'active' ? 'bg-emerald-500 text-white' : 'text-slate-700'
                  }`}
                >
                  Aktiv
                </button>
                <button
                  type="button"
                  onClick={() => setStatus('inactive')}
                  className={`flex-1 rounded-full px-3 py-1 ${
                    status === 'inactive' ? 'bg-slate-800 text-white' : 'text-slate-700'
                  }`}
                >
                  Deaktiviert
                </button>
              </div>
              <p className="mt-1 text-[10px] text-slate-500">
                Hinweis: Ohne Aufenthaltstitel wird „Aktiv“ automatisch als <span className="font-medium">Offen</span> geführt.
              </p>
            </div>

            {/* Titel-spezifische Felder */}
            {currentTitle && (
              <div className="mt-2 space-y-2 md:col-span-2">
                <p className="text-[11px] font-medium text-slate-700">Angaben zum Aufenthaltstitel</p>

                <div className="grid gap-2 md:grid-cols-2">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-[11px]">
                    <p className="mb-1 text-[11px] font-medium text-slate-800">Grunddaten</p>

                    {currentTitle.require_permit_number && (
                      <div className="mb-1">
                        <label className="mb-0.5 block text-[10px] text-slate-600">Nummer des Aufenthaltstitels</label>
                        <input
                          className="w-full rounded-lg border border-slate-200 bg-white px-2 py-1 text-[11px] text-slate-900 outline-none focus:border-[#3B5BFF] focus:ring-1 focus:ring-[#3B5BFF]/40"
                          value={permitNumber}
                          onChange={(e) => setPermitNumber(e.target.value)}
                        />
                      </div>
                    )}

                    {currentTitle.require_valid_from && (
                      <div className="mb-1">
                        <label className="mb-0.5 block text-[10px] text-slate-600">Gültig ab</label>
                        <input
                          type="date"
                          className="w-full rounded-lg border border-slate-200 bg-white px-2 py-1 text-[11px] text-slate-900 outline-none focus:border-[#3B5BFF] focus:ring-1 focus:ring-[#3B5BFF]/40"
                          value={validFrom}
                          onChange={(e) => setValidFrom(e.target.value)}
                        />
                      </div>
                    )}

                    {currentTitle.require_valid_until && (
                      <div>
                        <label className="mb-0.5 block text-[10px] text-slate-600">Gültig bis</label>
                        <input
                          type="date"
                          className="w-full rounded-lg border border-slate-200 bg-white px-2 py-1 text-[11px] text-slate-900 outline-none focus:border-[#3B5BFF] focus:ring-1 focus:ring-[#3B5BFF]/40"
                          value={validUntil}
                          onChange={(e) => setValidUntil(e.target.value)}
                        />
                      </div>
                    )}
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-[11px]">
                    <p className="mb-1 text-[11px] font-medium text-slate-800">Behörde & Nebenbestimmungen</p>

                    {currentTitle.require_issuing_authority && (
                      <div className="mb-1">
                        <label className="mb-0.5 block text-[10px] text-slate-600">Ausstellende Behörde</label>
                        <input
                          className="w-full rounded-lg border border-slate-200 bg-white px-2 py-1 text-[11px] text-slate-900 outline-none focus:border-[#3B5BFF] focus:ring-1 focus:ring-[#3B5BFF]/40"
                          value={issuingAuthority}
                          onChange={(e) => setIssuingAuthority(e.target.value)}
                        />
                      </div>
                    )}

                    {currentTitle.require_restrictions && (
                      <div>
                        <label className="mb-0.5 block text-[10px] text-slate-600">Beschränkungen / Nebenbestimmungen</label>
                        <textarea
                          className="w-full rounded-lg border border-slate-200 bg-white px-2 py-1 text-[11px] text-slate-900 outline-none focus:border-[#3B5BFF] focus:ring-1 focus:ring-[#3B5BFF]/40"
                          value={restrictions}
                          onChange={(e) => setRestrictions(e.target.value)}
                        />
                      </div>
                    )}
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-[11px]">
                    <p className="mb-1 text-[11px] font-medium text-slate-800">Vorrangprüfung & Zustimmung</p>

                    {currentTitle.require_priority_check && (
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          className="h-3.5 w-3.5 rounded border-slate-300 text-[#3B5BFF] focus:ring-[#3B5BFF]"
                          checked={priorityCheck}
                          onChange={(e) => setPriorityCheck(e.target.checked)}
                        />
                        <span>Vorrangprüfung durchgeführt / erforderlich</span>
                      </label>
                    )}

                    {currentTitle.require_priority_code && (
                      <div className="mt-1">
                        <label className="mb-0.5 block text-[10px] text-slate-600">Zustimmungscode / Geschäftszeichen</label>
                        <input
                          className="w-full rounded-lg border border-slate-200 bg-white px-2 py-1 text-[11px] text-slate-900 outline-none focus:border-[#3B5BFF] focus:ring-1 focus:ring-[#3B5BFF]/40"
                          value={priorityCode}
                          onChange={(e) => setPriorityCode(e.target.value)}
                        />
                      </div>
                    )}
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-[11px]">
                    <p className="mb-1 text-[11px] font-medium text-slate-800">Beschäftigung & Dokumente</p>

                    {currentTitle.require_employment_details && (
                      <div className="mb-1">
                        <label className="mb-0.5 block text-[10px] text-slate-600">Beschäftigungsdetails</label>
                        <textarea
                          className="w-full rounded-lg border border-slate-200 bg-white px-2 py-1 text-[11px] text-slate-900 outline-none focus:border-[#3B5BFF] focus:ring-1 focus:ring-[#3B5BFF]/40"
                          value={employmentDetails}
                          onChange={(e) => setEmploymentDetails(e.target.value)}
                        />
                      </div>
                    )}

                    {currentTitle.require_document_upload && (
                      <p className="text-[10px] text-slate-500">Upload erfolgt nach dem Speichern (im Bearbeiten-Modus).</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Notiz */}
            <div className="mt-2 flex flex-col gap-1 md:col-span-2">
              <label className="text-[11px] font-medium text-slate-700">Interne Notiz (optional)</label>
              <textarea
                className="min-h-[60px] rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 outline-none focus:border-[#3B5BFF] focus:ring-1 focus:ring-[#3B5BFF]/40"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </div>

            {/* Dokumente */}
            <div className="mt-2 flex flex-col gap-1 md:col-span-2">
              <p className="text-[11px] font-medium text-slate-700">Dokumente / Anhänge</p>

              {!editingId ? (
                <p className="text-[11px] text-slate-500">Dokumente können hochgeladen werden, sobald der Mitarbeitende gespeichert ist.</p>
              ) : (
                <div className="space-y-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-[11px] text-slate-700">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span>Dokumente im Bucket „dokumente“</span>
                    <label className="inline-flex cursor-pointer items-center rounded-full border border-slate-300 bg-white px-3 py-1 text-[11px] text-slate-700 hover:bg-slate-100">
                      <input type="file" multiple className="hidden" onChange={(e) => handleUploadDocuments(e.target.files)} />
                      {uploadingDocs ? 'Hochladen…' : 'Dateien auswählen'}
                    </label>
                  </div>

                  {documents.length === 0 ? (
                    <p className="text-[11px] text-slate-500">Noch keine Dokumente hinterlegt.</p>
                  ) : (
                    <ul className="space-y-0.5">
                      {documents.map((doc, idx) => (
                        <li
                          key={`${doc.path}-${idx}`}
                          className="flex items-center justify-between gap-2 text-[11px] text-slate-700"
                        >
                          <span className="truncate">{doc.name}</span>
                          <span className="text-[10px] text-slate-400">{doc.path}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="mt-4 flex flex-col gap-2 md:col-span-2 md:flex-row md:items-center md:justify-end">
              <button
                type="button"
                onClick={() => router.push('/dashboard/mitarbeitende')}
                className="inline-flex w-full items-center justify-center rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-50 md:w-auto"
              >
                Abbrechen
              </button>

              <button
                type="submit"
                disabled={saving}
                className="inline-flex w-full items-center justify-center rounded-full bg-[#3B5BFF] px-4 py-2 text-xs font-medium text-white shadow-sm hover:bg-[#3049D9] disabled:cursor-not-allowed disabled:opacity-60 md:w-auto"
              >
                {saving ? 'Speichern…' : mode === 'edit' ? 'Aktualisieren' : 'Anlegen'}
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  )
}
