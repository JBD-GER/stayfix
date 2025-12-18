// app/(app)/dashboard/aufenthaltstitel/page.tsx
'use client'

import { FormEvent, useEffect, useState } from 'react'

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
  is_template: boolean
  is_active: boolean
  sort_index: number
  created_at: string
}

type ResidenceTitleTemplate = {
  name: string
  code?: string
  category?: string
  country?: string
  description?: string
  require_permit_number?: boolean
  require_valid_from?: boolean
  require_valid_until?: boolean
  require_issuing_authority?: boolean
  require_restrictions?: boolean
  require_priority_check?: boolean
  require_priority_code?: boolean
  require_employment_details?: boolean
  require_document_upload?: boolean
}

/* ---------- 10 Vorlagen (statisch im Frontend) ---------- */

const RESIDENCE_TITLE_TEMPLATES: ResidenceTitleTemplate[] = [
  {
    name: '§ 18a Fachkräfte mit Berufsausbildung',
    code: '§ 18a',
    category: 'Fachkraft',
    country: 'Drittstaat',
    description:
      'Aufenthaltserlaubnis für Fachkräfte mit anerkannter Berufsausbildung nach § 18a AufenthG.',
    require_permit_number: true,
    require_valid_from: true,
    require_valid_until: true,
    require_issuing_authority: true,
    require_restrictions: true,
    require_priority_check: true,
    require_priority_code: true,
    require_employment_details: true,
    require_document_upload: true,
  },
  {
    name: '§ 18b Fachkräfte mit akademischer Ausbildung',
    code: '§ 18b',
    category: 'Fachkraft',
    country: 'Drittstaat',
    description:
      'Aufenthaltserlaubnis für Fachkräfte mit akademischer Ausbildung nach § 18b AufenthG.',
    require_permit_number: true,
    require_valid_from: true,
    require_valid_until: true,
    require_issuing_authority: true,
    require_restrictions: true,
    require_priority_check: true,
    require_priority_code: true,
    require_employment_details: true,
    require_document_upload: true,
  },
  {
    name: '§ 18g Blaue Karte EU',
    code: '§ 18g',
    category: 'Blue Card EU',
    country: 'Drittstaat',
    description:
      'Blaue Karte EU für hochqualifizierte Beschäftigte mit Mindestgehaltsschwelle.',
    require_permit_number: true,
    require_valid_from: true,
    require_valid_until: true,
    require_issuing_authority: true,
    require_restrictions: true,
    require_priority_check: false,
    require_priority_code: false,
    require_employment_details: true,
    require_document_upload: true,
  },
  {
    name: '§ 19c Sonstige Beschäftigung',
    code: '§ 19c',
    category: 'Beschäftigung',
    country: 'Drittstaat',
    description:
      'Aufenthaltserlaubnis für sonstige Beschäftigung nach § 19c AufenthG, z.B. Sondertatbestände.',
    require_permit_number: true,
    require_valid_from: true,
    require_valid_until: true,
    require_issuing_authority: true,
    require_restrictions: true,
    require_priority_check: true,
    require_priority_code: true,
    require_employment_details: true,
    require_document_upload: true,
  },
  {
    name: '§ 16b Studium',
    code: '§ 16b',
    category: 'Studium',
    country: 'Drittstaat',
    description:
      'Aufenthaltserlaubnis für Studienzwecke nach § 16b AufenthG (z.B. Immatrikulation erforderlich).',
    require_permit_number: true,
    require_valid_from: true,
    require_valid_until: true,
    require_issuing_authority: true,
    require_restrictions: false,
    require_priority_check: false,
    require_priority_code: false,
    require_employment_details: false,
    require_document_upload: true,
  },
  {
    name: '§ 16d Betriebliche Weiterbildung',
    code: '§ 16d',
    category: 'Weiterbildung',
    country: 'Drittstaat',
    description:
      'Aufenthaltserlaubnis zur Teilnahme an betrieblicher Weiterbildung nach § 16d AufenthG.',
    require_permit_number: true,
    require_valid_from: true,
    require_valid_until: true,
    require_issuing_authority: true,
    require_restrictions: true,
    require_priority_check: false,
    require_priority_code: false,
    require_employment_details: true,
    require_document_upload: true,
  },
  {
    name: '§ 24 Vorübergehender Schutz',
    code: '§ 24',
    category: 'Schutz',
    country: 'Drittstaat',
    description:
      'Aufenthaltserlaubnis zum vorübergehenden Schutz nach § 24 AufenthG (z.B. bei Kriegssituationen).',
    require_permit_number: true,
    require_valid_from: true,
    require_valid_until: true,
    require_issuing_authority: true,
    require_restrictions: true,
    require_priority_check: false,
    require_priority_code: false,
    require_employment_details: false,
    require_document_upload: true,
  },
  {
    name: '§ 21 Selbständige Tätigkeit',
    code: '§ 21',
    category: 'Selbständigkeit',
    country: 'Drittstaat',
    description:
      'Aufenthaltserlaubnis für selbständige Tätigkeit nach § 21 AufenthG.',
    require_permit_number: true,
    require_valid_from: true,
    require_valid_until: true,
    require_issuing_authority: true,
    require_restrictions: true,
    require_priority_check: true,
    require_priority_code: true,
    require_employment_details: false,
    require_document_upload: true,
  },
  {
    name: 'Daueraufenthalt-EU',
    code: 'DA-EU',
    category: 'Daueraufenthalt',
    country: 'EU',
    description:
      'Erlaubnis zum Daueraufenthalt-EU für langfristig Aufenthaltsberechtigte.',
    require_permit_number: true,
    require_valid_from: true,
    require_valid_until: true,
    require_issuing_authority: true,
    require_restrictions: true,
    require_priority_check: false,
    require_priority_code: false,
    require_employment_details: false,
    require_document_upload: true,
  },
  {
    name: 'Kurzaufenthalt – Visum C (Schengen)',
    code: 'Visum C',
    category: 'Kurzaufenthalt',
    country: 'Drittstaat',
    description:
      'Kurzaufenthalt für bis zu 90 Tage innerhalb von 180 Tagen im Schengen-Raum.',
    require_permit_number: true,
    require_valid_from: true,
    require_valid_until: true,
    require_issuing_authority: true,
    require_restrictions: true,
    require_priority_check: false,
    require_priority_code: false,
    require_employment_details: false,
    require_document_upload: true,
  },
]

/* ---------- Page ---------- */

export default function ResidenceTitlesPage() {
  const [titles, setTitles] = useState<ResidenceTitleRow[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Formular-State
  const [editingId, setEditingId] = useState<string | null>(null)
  const [name, setName] = useState('')
  const [code, setCode] = useState('')
  const [category, setCategory] = useState('')
  const [country, setCountry] = useState('Deutschland')
  const [description, setDescription] = useState('')
  const [isActive, setIsActive] = useState(true)

  // Pflichtfeld-Konfiguration
  const [requirePermitNumber, setRequirePermitNumber] = useState(true)
  const [requireValidFrom, setRequireValidFrom] = useState(true)
  const [requireValidUntil, setRequireValidUntil] = useState(true)
  const [requireIssuingAuthority, setRequireIssuingAuthority] = useState(false)
  const [requireRestrictions, setRequireRestrictions] = useState(false)
  const [requirePriorityCheck, setRequirePriorityCheck] = useState(false)
  const [requirePriorityCode, setRequirePriorityCode] = useState(false)
  const [requireEmploymentDetails, setRequireEmploymentDetails] = useState(false)
  const [requireDocumentUpload, setRequireDocumentUpload] = useState(true)

  async function loadTitles() {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/residence-titles')
      if (!res.ok) {
        const data = await res.json().catch(() => null)
        throw new Error(
          data?.error || 'Fehler beim Laden der Aufenthaltstitel.'
        )
      }
      const data = (await res.json()) as ResidenceTitleRow[]
      setTitles(data ?? [])
    } catch (e: any) {
      console.error(e)
      setError(e.message ?? 'Unbekannter Fehler beim Laden der Daten.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadTitles()
  }, [])

  function resetForm() {
    setEditingId(null)
    setName('')
    setCode('')
    setCategory('')
    setCountry('Deutschland')
    setDescription('')
    setIsActive(true)

    setRequirePermitNumber(true)
    setRequireValidFrom(true)
    setRequireValidUntil(true)
    setRequireIssuingAuthority(false)
    setRequireRestrictions(false)
    setRequirePriorityCheck(false)
    setRequirePriorityCode(false)
    setRequireEmploymentDetails(false)
    setRequireDocumentUpload(true)
  }

  function startEdit(title: ResidenceTitleRow) {
    setEditingId(title.id)
    setName(title.name)
    setCode(title.code ?? '')
    setCategory(title.category ?? '')
    setCountry(title.country ?? '')
    setDescription(title.description ?? '')
    setIsActive(title.is_active)

    setRequirePermitNumber(title.require_permit_number)
    setRequireValidFrom(title.require_valid_from)
    setRequireValidUntil(title.require_valid_until)
    setRequireIssuingAuthority(title.require_issuing_authority)
    setRequireRestrictions(title.require_restrictions)
    setRequirePriorityCheck(title.require_priority_check)
    setRequirePriorityCode(title.require_priority_code)
    setRequireEmploymentDetails(title.require_employment_details)
    setRequireDocumentUpload(title.require_document_upload)
  }

  function applyTemplate(tpl: ResidenceTitleTemplate) {
    setEditingId(null) // neue Konfiguration, kein Edit
    setName(tpl.name)
    setCode(tpl.code ?? '')
    setCategory(tpl.category ?? '')
    setCountry(tpl.country ?? 'Deutschland')
    setDescription(tpl.description ?? '')
    setIsActive(true)

    setRequirePermitNumber(tpl.require_permit_number ?? true)
    setRequireValidFrom(tpl.require_valid_from ?? true)
    setRequireValidUntil(tpl.require_valid_until ?? true)
    setRequireIssuingAuthority(tpl.require_issuing_authority ?? false)
    setRequireRestrictions(tpl.require_restrictions ?? false)
    setRequirePriorityCheck(tpl.require_priority_check ?? false)
    setRequirePriorityCode(tpl.require_priority_code ?? false)
    setRequireEmploymentDetails(tpl.require_employment_details ?? false)
    setRequireDocumentUpload(tpl.require_document_upload ?? true)
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError(null)

    try {
      if (!name.trim()) {
        throw new Error('Bitte einen Namen für den Aufenthaltstitel angeben.')
      }

      const payload = {
        id: editingId ?? undefined,
        name: name.trim(),
        code: code.trim() || undefined,
        category: category.trim() || undefined,
        country: country.trim() || undefined,
        description: description.trim() || undefined,
        isActive,
        requirePermitNumber,
        requireValidFrom,
        requireValidUntil,
        requireIssuingAuthority,
        requireRestrictions,
        requirePriorityCheck,
        requirePriorityCode,
        requireEmploymentDetails,
        requireDocumentUpload,
      }

      const res = await fetch('/api/residence-titles', {
        method: editingId ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(
          data?.error ||
            'Fehler beim Speichern des Aufenthaltstitels.'
        )
      }

      await loadTitles()
      resetForm()
    } catch (e: any) {
      console.error(e)
      setError(e.message ?? 'Unbekannter Fehler beim Speichern.')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id: string) {
    const title = titles.find((t) => t.id === id)
    const label = title?.name ?? 'diesen Aufenthaltstitel'

    if (
      !window.confirm(
        `Möchten Sie "${label}" wirklich löschen? Bereits zugeordnete Mitarbeitenden-Datensätze müssen ggf. angepasst werden.`
      )
    ) {
      return
    }

    setError(null)
    try {
      const res = await fetch('/api/residence-titles', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })

      const data = await res.json()
      if (!res.ok) {
        throw new Error(
          data?.error || 'Fehler beim Löschen des Aufenthaltstitels.'
        )
      }

      await loadTitles()
      if (editingId === id) resetForm()
    } catch (e: any) {
      console.error(e)
      setError(e.message ?? 'Unbekannter Fehler beim Löschen.')
    }
  }

  async function toggleActive(title: ResidenceTitleRow) {
    setError(null)
    try {
      const res = await fetch('/api/residence-titles', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: title.id, isActive: !title.is_active }),
      })

      const data = await res.json()
      if (!res.ok) {
        throw new Error(
          data?.error ||
            'Fehler beim Aktualisieren des Status.'
        )
      }

      await loadTitles()
    } catch (e: any) {
      console.error(e)
      setError(e.message ?? 'Unbekannter Fehler beim Aktualisieren des Status.')
    }
  }

  return (
    <main className="px-4 pb-16 pt-8 md:px-8 md:pt-10 lg:px-10 lg:pt-12">
      {/* Header */}
      <section className="mb-8 space-y-3">
        <div>
          <p className="mb-2 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-50 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-emerald-700">
            Aufenthaltstitel · Konfiguration
          </p>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            Aufenthaltstitel flexibel definieren.
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
            Legen Sie eigene Aufenthaltstitel an oder nutzen Sie Vorlagen. Für jeden
            Titel definieren Sie, welche Felder bei Mitarbeitenden erfasst werden
            müssen – z.&nbsp;B. Nummer, Gültigkeit, Behörde, Vorrangprüfung,
            Zustimmungscode und Dokument-Upload.
          </p>
        </div>

        {error && (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 px-3 py-2 text-[11px] text-rose-700">
            {error}
          </div>
        )}
      </section>

      {/* Grid: Formular + Vorlagen */}
      <section className="mb-10 grid gap-6 lg:grid-cols-[minmax(0,2.1fr)_minmax(0,1.4fr)]">
        {/* Formular */}
        <div className="rounded-3xl border border-slate-200 bg-white px-4 py-4 shadow-sm md:px-6 md:py-5">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="text-sm font-semibold text-slate-900">
                {editingId
                  ? 'Aufenthaltstitel bearbeiten'
                  : 'Neuen Aufenthaltstitel anlegen'}
              </p>
              <p className="text-[11px] text-slate-500">
                Beispiel: „§ 18a Fachkraft mit Berufsausbildung“ oder „Blue Card EU“.
              </p>
            </div>

            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] text-slate-600 hover:bg-slate-100"
              >
                Bearbeitung abbrechen
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="grid gap-3 md:grid-cols-2">
            {/* Name */}
            <div className="flex flex-col gap-1 md:col-span-2">
              <label className="text-[11px] font-medium text-slate-700">
                Bezeichnung des Aufenthaltstitels*
              </label>
              <input
                className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 outline-none focus:border-[#3B5BFF] focus:ring-1 focus:ring-[#3B5BFF]/40"
                placeholder='z.B. "§ 18a Fachkräfte mit Berufsausbildung"'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            {/* Code */}
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-medium text-slate-700">
                Gesetzescode / Kurzbezeichnung
              </label>
              <input
                className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 outline-none focus:border-[#3B5BFF] focus:ring-1 focus:ring-[#3B5BFF]/40"
                placeholder='z.B. "§ 18a", "Blue Card EU"'
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </div>

            {/* Kategorie */}
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-medium text-slate-700">
                Kategorie
              </label>
              <input
                className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 outline-none focus:border-[#3B5BFF] focus:ring-1 focus:ring-[#3B5BFF]/40"
                placeholder='z.B. "Fachkraft", "Studium", "Schutz", "Kurzaufenthalt"'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>

            {/* Land / Region */}
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-medium text-slate-700">
                Geltungsbereich / Herkunftsregion
              </label>
              <input
                className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 outline-none focus:border-[#3B5BFF] focus:ring-1 focus:ring-[#3B5BFF]/40"
                placeholder='z.B. "Deutschland", "EU", "Drittstaat"'
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </div>

            {/* Status */}
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-medium text-slate-700">
                Status
              </label>
              <button
                type="button"
                onClick={() => setIsActive((v) => !v)}
                className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] ${
                  isActive
                    ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                    : 'border-slate-200 bg-slate-50 text-slate-600'
                }`}
              >
                <span
                  className={`h-2 w-2 rounded-full ${
                    isActive ? 'bg-emerald-500' : 'bg-slate-300'
                  }`}
                />
                {isActive ? 'Aktiv (für Auswahl verfügbar)' : 'Deaktiviert'}
              </button>
            </div>

            {/* Beschreibung */}
            <div className="flex flex-col gap-1 md:col-span-2">
              <label className="text-[11px] font-medium text-slate-700">
                Beschreibung / interne Hinweise (optional)
              </label>
              <textarea
                className="min-h-[70px] rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 outline-none focus:border-[#3B5BFF] focus:ring-1 focus:ring-[#3B5BFF]/40"
                placeholder="Optional: Welche Besonderheiten gelten für diesen Aufenthaltstitel? Welche Nachweise werden typischerweise benötigt?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/* Pflichtfelder: Kopfzeile */}
            <div className="mt-2 flex flex-col gap-1 md:col-span-2">
              <p className="text-[11px] font-medium text-slate-700">
                Welche Felder müssen bei Mitarbeitenden für diesen Aufenthaltstitel ausgefüllt werden?
              </p>
              <p className="text-[11px] text-slate-500">
                Diese Konfiguration steuert später die Maske beim einzelnen Mitarbeitenden
                (z.&nbsp;B. ob eine Nummer, Behörde, Vorrangprüfung oder ein Dokument-Upload
                erforderlich ist).
              </p>
            </div>

            {/* Pflichtfelder: Grid */}
            <div className="md:col-span-2 grid gap-2 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-[11px] text-slate-700">
                <p className="mb-1 text-[11px] font-medium text-slate-800">
                  Grunddaten
                </p>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="h-3.5 w-3.5 rounded border-slate-300 text-[#3B5BFF] focus:ring-[#3B5BFF]"
                    checked={requirePermitNumber}
                    onChange={(e) =>
                      setRequirePermitNumber(e.target.checked)
                    }
                  />
                  <span>Nummer des Aufenthaltstitels</span>
                </label>
                <label className="mt-1 flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="h-3.5 w-3.5 rounded border-slate-300 text-[#3B5BFF] focus:ring-[#3B5BFF]"
                    checked={requireValidFrom}
                    onChange={(e) =>
                      setRequireValidFrom(e.target.checked)
                    }
                  />
                  <span>Gültig ab (von)</span>
                </label>
                <label className="mt-1 flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="h-3.5 w-3.5 rounded border-slate-300 text-[#3B5BFF] focus:ring-[#3B5BFF]"
                    checked={requireValidUntil}
                    onChange={(e) =>
                      setRequireValidUntil(e.target.checked)
                    }
                  />
                  <span>Gültig bis</span>
                </label>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-[11px] text-slate-700">
                <p className="mb-1 text-[11px] font-medium text-slate-800">
                  Behörde & Nebenbestimmungen
                </p>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="h-3.5 w-3.5 rounded border-slate-300 text-[#3B5BFF] focus:ring-[#3B5BFF]"
                    checked={requireIssuingAuthority}
                    onChange={(e) =>
                      setRequireIssuingAuthority(e.target.checked)
                    }
                  />
                  <span>Ausstellende Behörde</span>
                </label>
                <label className="mt-1 flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="h-3.5 w-3.5 rounded border-slate-300 text-[#3B5BFF] focus:ring-[#3B5BFF]"
                    checked={requireRestrictions}
                    onChange={(e) =>
                      setRequireRestrictions(e.target.checked)
                    }
                  />
                  <span>Beschränkungen / Nebenbestimmungen</span>
                </label>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-[11px] text-slate-700">
                <p className="mb-1 text-[11px] font-medium text-slate-800">
                  Vorrangprüfung & Zustimmung
                </p>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="h-3.5 w-3.5 rounded border-slate-300 text-[#3B5BFF] focus:ring-[#3B5BFF]"
                    checked={requirePriorityCheck}
                    onChange={(e) =>
                      setRequirePriorityCheck(e.target.checked)
                    }
                  />
                  <span>Vorrangprüfung erforderlich?</span>
                </label>
                <label className="mt-1 flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="h-3.5 w-3.5 rounded border-slate-300 text-[#3B5BFF] focus:ring-[#3B5BFF]"
                    checked={requirePriorityCode}
                    onChange={(e) =>
                      setRequirePriorityCode(e.target.checked)
                    }
                  />
                  <span>Zustimmungscode / Geschäftszeichen (z.B. BA)</span>
                </label>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-[11px] text-slate-700">
                <p className="mb-1 text-[11px] font-medium text-slate-800">
                  Beschäftigung & Dokumente
                </p>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="h-3.5 w-3.5 rounded border-slate-300 text-[#3B5BFF] focus:ring-[#3B5BFF]"
                    checked={requireEmploymentDetails}
                    onChange={(e) =>
                      setRequireEmploymentDetails(e.target.checked)
                    }
                  />
                  <span>Beschäftigungsdetails (z.B. Std./Woche, Position)</span>
                </label>
                <label className="mt-1 flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="h-3.5 w-3.5 rounded border-slate-300 text-[#3B5BFF] focus:ring-[#3B5BFF]"
                    checked={requireDocumentUpload}
                    onChange={(e) =>
                      setRequireDocumentUpload(e.target.checked)
                    }
                  />
                  <span>Dokument-Upload (Scan des Aufenthaltstitels)</span>
                </label>
              </div>
            </div>

            {/* Speichern */}
            <div className="mt-3 flex items-end md:col-span-2 md:justify-end">
              <button
                type="submit"
                disabled={saving}
                className="inline-flex w-full items-center justify-center rounded-full bg-[#3B5BFF] px-4 py-2 text-xs font-medium text-white shadow-sm hover:bg-[#3049D9] disabled:cursor-not-allowed disabled:opacity-60 md:w-auto"
              >
                {saving
                  ? 'Speichern…'
                  : editingId
                  ? 'Aufenthaltstitel aktualisieren'
                  : 'Aufenthaltstitel anlegen'}
              </button>
            </div>
          </form>
        </div>

        {/* Vorlagen */}
        <div className="space-y-4">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4 text-[11px] text-slate-600 md:px-5 md:py-5">
            <p className="mb-1 text-xs font-semibold text-slate-800">
              Vorlagen für typische Aufenthaltstitel
            </p>
            <p>
              Nutzen Sie die Vorlagen als Startpunkt. Beim Klick auf eine Vorlage wird
              das Formular links mit passenden Einstellungen vorausgefüllt. Sie können
              danach alles anpassen und speichern.
            </p>

            <div className="mt-3 grid gap-1">
              {RESIDENCE_TITLE_TEMPLATES.map((tpl) => (
                <button
                  key={tpl.name}
                  type="button"
                  onClick={() => applyTemplate(tpl)}
                  className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-3 py-2 text-left text-[11px] hover:bg-slate-50"
                >
                  <div className="min-w-0">
                    <p className="truncate text-[11px] font-medium text-slate-900">
                      {tpl.name}
                    </p>
                    {tpl.code && (
                      <p className="text-[10px] text-slate-500">
                        {tpl.code} · {tpl.category ?? 'ohne Kategorie'}
                      </p>
                    )}
                  </div>
                  <span className="ml-2 text-[10px] text-slate-400">
                    Übernehmen
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Liste der angelegten Aufenthaltstitel */}
      <section className="space-y-4">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
            Übersicht Ihrer Aufenthaltstitel
          </p>
          <p className="mt-1 max-w-2xl text-xs text-slate-600">
            Hier sehen Sie alle konfigurierten Aufenthaltstitel. Über „Bearbeiten“
            laden Sie die Konfiguration in das Formular. Über „Löschen“ wird der Titel
            entfernt (Zuordnungen bei Mitarbeitenden müssen ggf. angepasst werden).
          </p>
        </div>

        {loading ? (
          <p className="text-xs text-slate-500">
            Aufenthaltstitel werden geladen …
          </p>
        ) : titles.length === 0 ? (
          <p className="text-xs text-slate-500">
            Noch keine Aufenthaltstitel angelegt. Nutzen Sie oben das Formular oder die
            Vorlagen, um zu starten.
          </p>
        ) : (
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {titles.map((title) => (
              <ResidenceTitleCard
                key={title.id}
                title={title}
                onEdit={() => startEdit(title)}
                onDelete={() => handleDelete(title.id)}
                onToggleActive={() => toggleActive(title)}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  )
}

/* ---------- Card-Komponente ---------- */

type CardProps = {
  title: ResidenceTitleRow
  onEdit: () => void
  onDelete: () => void
  onToggleActive: () => void
}

function ResidenceTitleCard({
  title,
  onEdit,
  onDelete,
  onToggleActive,
}: CardProps) {
  const badges: string[] = []

  if (title.require_permit_number) badges.push('Nr.')
  if (title.require_valid_from) badges.push('Von')
  if (title.require_valid_until) badges.push('Bis')
  if (title.require_issuing_authority) badges.push('Behörde')
  if (title.require_restrictions) badges.push('Beschränkungen')
  if (title.require_priority_check) badges.push('Vorrangprüfung')
  if (title.require_priority_code) badges.push('Zustimmungscode')
  if (title.require_employment_details) badges.push('Beschäftigung')
  if (title.require_document_upload) badges.push('Dok-Upload')

  return (
    <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white px-4 py-3 text-xs shadow-sm">
      <div className="mb-2 flex items-start justify-between gap-3">
        <div className="min-w-0 space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <p className="truncate text-sm font-semibold text-slate-900">
              {title.name}
            </p>
            <button
              type="button"
              onClick={onToggleActive}
              className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] ${
                title.is_active
                  ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                  : 'border-slate-200 bg-slate-50 text-slate-600'
              }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  title.is_active ? 'bg-emerald-500' : 'bg-slate-300'
                }`}
              />
              {title.is_active ? 'Aktiv' : 'Inaktiv'}
            </button>
          </div>
          <p className="text-[10px] text-slate-500">
            {title.code ? `${title.code} · ` : ''}
            {title.category ?? 'ohne Kategorie'}
            {title.country ? ` · ${title.country}` : ''}
          </p>
          {title.description && (
            <p className="line-clamp-2 text-[11px] text-slate-600">
              {title.description}
            </p>
          )}
        </div>
      </div>

      <div className="mt-1 flex flex-wrap gap-1">
        {badges.length > 0 ? (
          badges.map((b) => (
            <span
              key={b}
              className="inline-flex items-center rounded-full bg-slate-50 px-2 py-0.5 text-[10px] text-slate-700"
            >
              {b}
            </span>
          ))
        ) : (
          <span className="text-[10px] text-slate-500">
            Keine Pflichtfelder definiert.
          </span>
        )}
      </div>

      <div className="mt-3 flex items-center justify-between gap-2 pt-2 text-[10px] text-slate-500">
        <span>
          ID:{' '}
          <span className="font-mono text-[10px] text-slate-600">
            {title.id.slice(0, 8)}…
          </span>
        </span>
        <div className="flex gap-1">
          <button
            type="button"
            onClick={onEdit}
            className="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[10px] text-slate-700 hover:bg-slate-100"
          >
            Bearbeiten
          </button>
          <button
            type="button"
            onClick={onDelete}
            className="rounded-full border border-rose-200 bg-rose-50 px-2 py-0.5 text-[10px] text-rose-600 hover:bg-rose-100"
          >
            Löschen
          </button>
        </div>
      </div>
    </div>
  )
}
