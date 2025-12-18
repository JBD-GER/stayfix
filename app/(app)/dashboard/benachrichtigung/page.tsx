// app/(app)/dashboard/benachrichtigungen/page.tsx
'use client'

import { useEffect, useMemo, useState, FormEvent } from 'react'

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

type NotificationRuleRow = {
  id: string
  user_id: string
  name: string
  description: string | null
  is_active: boolean
  created_at: string
}

type NotificationPhaseRow = {
  id: string
  user_id: string
  rule_id: string
  offset_days: number
  notify_employee: boolean
  notify_supervisor: boolean
  created_at: string
}

type NotificationRecipientRow = {
  id: string
  user_id: string
  phase_id: string
  org_unit_id: string
  sort_index: number
  created_at: string
}

type PhaseWithRecipients = NotificationPhaseRow & {
  recipients: NotificationRecipientRow[]
}

type RuleWithPhases = NotificationRuleRow & {
  phases: PhaseWithRecipients[]
}

type TimingType = 'before' | 'on' | 'after'

type UiPhase = {
  localId: string
  timingType: TimingType
  days: number | ''
  notifyEmployee: boolean
  notifySupervisor: boolean
  orgUnitIds: string[]
}

/* ---------- Helper ---------- */

function makeLocalId() {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID()
  }
  return Math.random().toString(36).slice(2)
}

function formatOffsetLabel(offsetDays: number): string {
  if (offsetDays === 0) return 'Am Tag des Ablaufs'
  if (offsetDays > 0) return `${offsetDays} Tage vor Ablauf`
  return `${Math.abs(offsetDays)} Tage nach Ablauf`
}

function formatTimingShort(offsetDays: number): string {
  if (offsetDays === 0) return 'Ablauf'
  if (offsetDays > 0) return `-${offsetDays} Tage`
  return `+${Math.abs(offsetDays)} Tage`
}

function offsetToTiming(offsetDays: number): { timingType: TimingType; days: number | '' } {
  if (offsetDays === 0) {
    return { timingType: 'on', days: '' }
  }
  if (offsetDays > 0) {
    return { timingType: 'before', days: offsetDays }
  }
  return { timingType: 'after', days: Math.abs(offsetDays) }
}

function createDefaultPhase(): UiPhase {
  return {
    localId: makeLocalId(),
    timingType: 'before',
    days: 30,
    notifyEmployee: true,
    notifySupervisor: false,
    orgUnitIds: [],
  }
}

/* ---------- Page ---------- */

export default function NotificationsPage() {
  const [orgUnits, setOrgUnits] = useState<OrgUnitRow[]>([])
  const [rules, setRules] = useState<NotificationRuleRow[]>([])
  const [phases, setPhases] = useState<NotificationPhaseRow[]>([])
  const [recipients, setRecipients] = useState<NotificationRecipientRow[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Formular: Kopf der Benachrichtigungsregel
  const [editingRuleId, setEditingRuleId] = useState<string | null>(null)
  const [ruleName, setRuleName] = useState('')
  const [ruleDescription, setRuleDescription] = useState('')
  const [ruleActive, setRuleActive] = useState(true)

  // Phasen-UI (alle Zeitpunkte unter dieser Regel)
  const [uiPhases, setUiPhases] = useState<UiPhase[]>([createDefaultPhase()])

  // Akkordeon: welche Regel ist geöffnet?
  const [expandedRuleId, setExpandedRuleId] = useState<string | null>(null)

  async function loadAll() {
    setLoading(true)
    setError(null)
    try {
      const [orgRes, rulesRes] = await Promise.all([
        fetch('/api/org-units'),
        fetch('/api/notification-rules'),
      ])

      if (!orgRes.ok) {
        throw new Error('Fehler beim Laden der Organisationseinheiten.')
      }
      if (!rulesRes.ok) {
        throw new Error('Fehler beim Laden der Benachrichtigungsregeln.')
      }

      const orgData = await orgRes.json()
      const rulesData = await rulesRes.json()

      setOrgUnits(orgData ?? [])
      setRules(rulesData.rules ?? [])
      setPhases(rulesData.phases ?? [])
      setRecipients(rulesData.recipients ?? [])
    } catch (e: any) {
      console.error(e)
      setError(e.message ?? 'Unbekannter Fehler beim Laden der Daten.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadAll()
  }, [])

  const orgUnitMap = useMemo(() => {
    const m = new Map<string, OrgUnitRow>()
    orgUnits.forEach((u) => m.set(u.id, u))
    return m
  }, [orgUnits])

  const rulesWithPhases: RuleWithPhases[] = useMemo(() => {
    const recByPhase = new Map<string, NotificationRecipientRow[]>()
    recipients.forEach((r) => {
      const arr = recByPhase.get(r.phase_id) ?? []
      arr.push(r)
      recByPhase.set(r.phase_id, arr)
    })

    const phasesByRule = new Map<string, PhaseWithRecipients[]>()
    phases.forEach((p) => {
      const arr = phasesByRule.get(p.rule_id) ?? []
      arr.push({
        ...p,
        recipients: recByPhase.get(p.id) ?? [],
      })
      phasesByRule.set(p.rule_id, arr)
    })

    return rules
      .map((rule) => ({
        ...rule,
        phases: phasesByRule.get(rule.id) ?? [],
      }))
      .sort((a, b) => a.created_at.localeCompare(b.created_at))
  }, [rules, phases, recipients])

  /* ---------- Formular-Logik ---------- */

  function resetForm() {
    setEditingRuleId(null)
    setRuleName('')
    setRuleDescription('')
    setRuleActive(true)
    setUiPhases([createDefaultPhase()])
  }

  function startEdit(ruleId: string) {
    const rule = rulesWithPhases.find((r) => r.id === ruleId)
    if (!rule) return

    setEditingRuleId(rule.id)
    setRuleName(rule.name)
    setRuleDescription(rule.description ?? '')
    setRuleActive(rule.is_active)

    const mappedPhases: UiPhase[] =
      rule.phases.length > 0
        ? rule.phases
            .slice()
            .sort((a, b) => a.offset_days - b.offset_days)
            .map((phase) => {
              const { timingType, days } = offsetToTiming(phase.offset_days)
              const orgUnitIds = phase.recipients.map((r) => r.org_unit_id)
              return {
                localId: makeLocalId(),
                timingType,
                days,
                notifyEmployee: phase.notify_employee,
                notifySupervisor: phase.notify_supervisor,
                orgUnitIds,
              }
            })
        : [createDefaultPhase()]

    setUiPhases(mappedPhases)
    setExpandedRuleId(ruleId)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handlePhaseChange(localId: string, updater: (prev: UiPhase) => UiPhase) {
    setUiPhases((prev) => prev.map((p) => (p.localId === localId ? updater(p) : p)))
  }

  function handlePhaseDaysChange(localId: string, value: string) {
    setUiPhases((prev) =>
      prev.map((p) => {
        if (p.localId !== localId) return p
        if (value === '') return { ...p, days: '' }
        const parsed = parseInt(value, 10)
        if (Number.isNaN(parsed)) return p
        return { ...p, days: parsed }
      })
    )
  }

  function togglePhaseOrgUnit(localId: string, orgUnitId: string) {
    setUiPhases((prev) =>
      prev.map((p) => {
        if (p.localId !== localId) return p
        const already = p.orgUnitIds.includes(orgUnitId)
        return {
          ...p,
          orgUnitIds: already
            ? p.orgUnitIds.filter((id) => id !== orgUnitId)
            : [...p.orgUnitIds, orgUnitId],
        }
      })
    )
  }

  function addPhase(timingType: TimingType = 'before') {
    setUiPhases((prev) => [
      ...prev,
      {
        localId: makeLocalId(),
        timingType,
        days: timingType === 'on' ? '' : 30,
        notifyEmployee: true,
        notifySupervisor: false,
        orgUnitIds: [],
      },
    ])
  }

  function removePhase(localId: string) {
    setUiPhases((prev) => {
      if (prev.length <= 1) return prev // Mindestens eine Phase
      return prev.filter((p) => p.localId !== localId)
    })
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError(null)

    try {
      if (!ruleName.trim()) {
        throw new Error('Bitte einen Namen für die Benachrichtigungsregel angeben.')
      }

      if (uiPhases.length === 0) {
        throw new Error('Mindestens ein Zeitpunkt (Phase) ist erforderlich.')
      }

      for (const phase of uiPhases) {
        if (phase.timingType === 'on') continue
        if (phase.days === '' || typeof phase.days !== 'number' || phase.days <= 0) {
          throw new Error(
            'Für „Vor Ablauf“ und „Nach Ablauf“ muss eine positive Anzahl an Tagen angegeben werden.'
          )
        }
      }

      const payload = {
        id: editingRuleId ?? undefined,
        name: ruleName.trim(),
        description: ruleDescription || undefined,
        isActive: ruleActive,
        phases: uiPhases.map((phase) => ({
          timingType: phase.timingType,
          days: typeof phase.days === 'number' ? phase.days : undefined,
          notifyEmployee: phase.notifyEmployee,
          notifySupervisor: phase.notifySupervisor,
          orgUnitIds: phase.orgUnitIds,
        })),
      }

      const res = await fetch('/api/notification-rules', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data?.error || 'Fehler beim Speichern der Benachrichtigungsregel.')
      }

      await loadAll()
      resetForm()
    } catch (e: any) {
      console.error(e)
      setError(e.message ?? 'Unbekannter Fehler beim Speichern.')
    } finally {
      setSaving(false)
    }
  }

  async function handleDeleteRule(ruleId: string) {
    const rule = rules.find((r) => r.id === ruleId)
    const label = rule?.name ?? 'diese Benachrichtigungsregel'

    if (
      !window.confirm(
        `Möchten Sie "${label}" inklusive aller zugehörigen Zeitpunkte und Empfänger wirklich löschen?`
      )
    ) {
      return
    }

    setError(null)
    try {
      const res = await fetch('/api/notification-rules', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: ruleId }),
      })

      const data = await res.json()
      if (!res.ok) {
        throw new Error(data?.error || 'Fehler beim Löschen der Benachrichtigungsregel.')
      }

      await loadAll()
      if (editingRuleId === ruleId) resetForm()
      if (expandedRuleId === ruleId) setExpandedRuleId(null)
    } catch (e: any) {
      console.error(e)
      setError(e.message ?? 'Unbekannter Fehler beim Löschen.')
    }
  }

  /* ---------- Render ---------- */

  return (
    <main className="px-4 pb-16 pt-8 md:px-8 md:pt-10 lg:px-10 lg:pt-12">
      {/* Header */}
      <section className="mb-8 space-y-3">
        <div>
          <p className="mb-2 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-50 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-emerald-700">
            Benachrichtigungen · Fristen · E-Mail-Workflows
          </p>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            Benachrichtigungsregeln mit mehreren Zeitpunkten.
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
            Legen Sie eine Benachrichtigungsregel mit Namen und Beschreibung an und
            definieren Sie beliebig viele Zeitpunkte – z.&nbsp;B. 120, 90, 60 und 30 Tage vor
            Ablauf, am Tag des Ablaufs oder danach. Für jeden Zeitpunkt bestimmen Sie,
            wer informiert wird.
          </p>
        </div>

         {/* Info-Karte rechts – kompakt, ohne Organigramm-Funktion */}
        <div className="space-y-4">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4 text-[11px] text-slate-600 md:px-5 md:py-5">
            <p className="mb-1 text-xs font-semibold text-slate-800">
              Wie Benachrichtigungsregeln genutzt werden
            </p>
            <p>
              Jede Benachrichtigungsregel wird später einzelnen Aufenthaltstiteln oder
              Mitarbeitenden zugeordnet. Beim täglichen Check prüft Stayfix die Fristen
              und löst alle zugehörigen Zeitpunkte aus – inklusive aller Empfänger
              (Mitarbeitende, Vorgesetzte, Org-Einheiten).
            </p>
            <p className="mt-2">
              So können Sie z.&nbsp;B. einen Standard-Workflow mit 120 / 90 / 60 / 30 Tagen
              vor Ablauf und eine Eskalationsregel nach Ablauf definieren.
            </p>
          </div>
        </div>

        {error && (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 px-3 py-2 text-[11px] text-rose-700">
            {error}
          </div>
        )}
      </section>

      {/* Grid: Formular + Info */}
      <section className="mb-10 grid gap-6 ">
        {/* Formular */}
        <div className="rounded-3xl border border-slate-200 bg-white px-4 py-4 shadow-sm md:px-6 md:py-5">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="text-sm font-semibold text-slate-900">
                {editingRuleId
                  ? 'Benachrichtigungsregel bearbeiten'
                  : 'Neue Benachrichtigungsregel'}
              </p>
              <p className="text-[11px] text-slate-500">
                Beispiel: „Standard-Workflow Aufenthaltstitel“ oder „Eskalation
                Aufenthaltstitel für Geschäftsführung“.
              </p>
            </div>

            {editingRuleId && (
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
                Name der Benachrichtigungsregel*
              </label>
              <input
                className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 outline-none focus:border-[#3B5BFF] focus:ring-1 focus:ring-[#3B5BFF]/40"
                placeholder='z.B. "Standard-Workflow Aufenthaltstitel"'
                value={ruleName}
                onChange={(e) => setRuleName(e.target.value)}
                required
              />
            </div>

            {/* Beschreibung */}
            <div className="flex flex-col gap-1 md:col-span-2">
              <label className="text-[11px] font-medium text-slate-700">
                Beschreibung (optional)
              </label>
              <textarea
                className="min-h-[60px] rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 outline-none focus:border-[#3B5BFF] focus:ring-1 focus:ring-[#3B5BFF]/40"
                placeholder="Kurz beschreiben, wofür diese Benachrichtigungsregel genutzt wird (z.B. Standardprozess für EU-Aufenthaltstitel)."
                value={ruleDescription}
                onChange={(e) => setRuleDescription(e.target.value)}
              />
            </div>

            {/* Status der Regel */}
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-medium text-slate-700">
                Status der Benachrichtigungsregel
              </label>
              <button
                type="button"
                onClick={() => setRuleActive((v) => !v)}
                className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] ${
                  ruleActive
                    ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                    : 'border-slate-200 bg-slate-50 text-slate-600'
                }`}
              >
                <span
                  className={`h-2 w-2 rounded-full ${
                    ruleActive ? 'bg-emerald-500' : 'bg-slate-300'
                  }`}
                />
                {ruleActive ? 'Aktiv' : 'Deaktiviert'}
              </button>
            </div>

            {/* Platzhalter für sauberes Grid */}
            <div className="hidden md:block" />

            {/* Zeitpunkte (Phasen) */}
            <div className="mt-2 flex flex-col gap-2 md:col-span-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="text-[11px] font-medium text-slate-700">
                    Zeitpunkte &amp; Empfänger innerhalb dieser Regel
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Fügen Sie beliebig viele Zeitpunkte hinzu – z.&nbsp;B. 120 / 90 / 60 / 30 Tage
                    vor Ablauf, am Tag des Ablaufs und nach Ablauf.
                  </p>
                </div>
                <div className="flex flex-wrap gap-1">
                  <button
                    type="button"
                    onClick={() => addPhase('before')}
                    className="rounded-full border border-slate-200 bg-slate-50 px-2 py-1 text-[10px] text-slate-700 hover:bg-slate-100"
                  >
                    Zeitpunkt vor Ablauf
                  </button>
                  <button
                    type="button"
                    onClick={() => addPhase('on')}
                    className="rounded-full border border-slate-200 bg-slate-50 px-2 py-1 text-[10px] text-slate-700 hover:bg-slate-100"
                  >
                    Am Tag des Ablaufs
                  </button>
                  <button
                    type="button"
                    onClick={() => addPhase('after')}
                    className="rounded-full border border-slate-200 bg-slate-50 px-2 py-1 text-[10px] text-slate-700 hover:bg-slate-100"
                  >
                    Zeitpunkt nach Ablauf
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                {uiPhases.map((phase, index) => (
                  <div
                    key={phase.localId}
                    className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-[11px] text-slate-700"
                  >
                    <div className="mb-2 flex items-center justify-between gap-2">
                      <span className="text-[11px] font-semibold text-slate-800">
                        Zeitpunkt {index + 1}
                      </span>
                      {uiPhases.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removePhase(phase.localId)}
                          className="rounded-full border border-rose-200 bg-rose-50 px-2 py-0.5 text-[10px] text-rose-600 hover:bg-rose-100"
                        >
                          Entfernen
                        </button>
                      )}
                    </div>

                    {/* Zeitpunkt-Auswahl */}
                    <div className="mb-2 rounded-2xl border border-slate-200 bg-white px-2 py-2">
                      <div className="mb-1 flex flex-wrap gap-1">
                        <button
                          type="button"
                          onClick={() =>
                            handlePhaseChange(phase.localId, (p) => ({
                              ...p,
                              timingType: 'before',
                              days: typeof p.days === 'number' && p.days > 0 ? p.days : 30,
                            }))
                          }
                          className={`rounded-full px-2 py-0.5 ${
                            phase.timingType === 'before'
                              ? 'bg-[#3B5BFF] text-white'
                              : 'border border-slate-200 bg-white text-slate-700'
                          }`}
                        >
                          Vor Ablauf
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            handlePhaseChange(phase.localId, (p) => ({
                              ...p,
                              timingType: 'on',
                              days: '',
                            }))
                          }
                          className={`rounded-full px-2 py-0.5 ${
                            phase.timingType === 'on'
                              ? 'bg-[#3B5BFF] text-white'
                              : 'border border-slate-200 bg-white text-slate-700'
                          }`}
                        >
                          Am Tag des Ablaufs
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            handlePhaseChange(phase.localId, (p) => ({
                              ...p,
                              timingType: 'after',
                              days: typeof p.days === 'number' && p.days > 0 ? p.days : 1,
                            }))
                          }
                          className={`rounded-full px-2 py-0.5 ${
                            phase.timingType === 'after'
                              ? 'bg-[#3B5BFF] text-white'
                              : 'border border-slate-200 bg-white text-slate-700'
                          }`}
                        >
                          Nach Ablauf
                        </button>
                      </div>

                      {phase.timingType === 'on' ? (
                        <p className="text-[11px] text-slate-600">
                          Dieser Zeitpunkt wird genau am Tag des Ablaufs ausgelöst.
                        </p>
                      ) : (
                        <div className="mt-1 flex items-center gap-2">
                          <input
                            type="number"
                            min={1}
                            className="w-16 rounded-lg border border-slate-200 bg-slate-50 px-2 py-1 text-[11px] text-slate-900 outline-none focus:border-[#3B5BFF] focus:ring-1 focus:ring-[#3B5BFF]/40"
                            value={phase.days === '' ? '' : String(phase.days)}
                            onChange={(e) =>
                              handlePhaseDaysChange(phase.localId, e.target.value)
                            }
                          />
                          <span className="text-[11px] text-slate-600">
                            {phase.timingType === 'before'
                              ? 'Tage vor dem Ablaufdatum'
                              : 'Tage nach dem Ablaufdatum'}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Wen benachrichtigen */}
                    <div className="mb-2 rounded-2xl border border-slate-200 bg-white px-2 py-2">
                      <p className="mb-1 text-[11px] font-medium text-slate-700">
                        Wen soll Stayfix zu diesem Zeitpunkt benachrichtigen?
                      </p>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          className="h-3.5 w-3.5 rounded border-slate-300 text-[#3B5BFF] focus:ring-[#3B5BFF]"
                          checked={phase.notifyEmployee}
                          onChange={(e) =>
                            handlePhaseChange(phase.localId, (p) => ({
                              ...p,
                              notifyEmployee: e.target.checked,
                            }))
                          }
                        />
                        <span>Mitarbeitende mit dem betroffenen Aufenthaltstitel</span>
                      </label>
                      <label className="mt-1 flex items-center gap-2">
                        <input
                          type="checkbox"
                          className="h-3.5 w-3.5 rounded border-slate-300 text-[#3B5BFF] focus:ring-[#3B5BFF]"
                          checked={phase.notifySupervisor}
                          onChange={(e) =>
                            handlePhaseChange(phase.localId, (p) => ({
                              ...p,
                              notifySupervisor: e.target.checked,
                            }))
                          }
                        />
                        <span>Hinterlegte Vorgesetzte (aus Mitarbeiter-Stammdaten)</span>
                      </label>
                    </div>

                    {/* Org-Einheiten Auswahl */}
                    <div className="rounded-2xl border border-slate-200 bg-white px-2 py-2">
                      <div className="mb-2 flex flex-wrap items-center gap-2">
                        <span className="text-[11px] text-slate-600">
                          Organisationseinheiten, die zusätzlich per E-Mail informiert werden
                          sollen
                        </span>
                      </div>

                      <div className="max-h-32 space-y-1 overflow-auto rounded-xl border border-slate-200 bg-slate-50 px-2 py-2">
                        {orgUnits.length === 0 ? (
                          <p className="text-[11px] text-slate-500">
                            Noch keine Organisationseinheiten angelegt.
                          </p>
                        ) : (
                          orgUnits.map((unit) => {
                            const checked = phase.orgUnitIds.includes(unit.id)
                            return (
                              <label
                                key={unit.id}
                                className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1 text-[11px] hover:bg-white"
                              >
                                <input
                                  type="checkbox"
                                  className="h-3.5 w-3.5 rounded border-slate-300 text-[#3B5BFF] focus:ring-[#3B5BFF]"
                                  checked={checked}
                                  onChange={() =>
                                    togglePhaseOrgUnit(phase.localId, unit.id)
                                  }
                                />
                                <span className="font-medium text-slate-800">
                                  {unit.name}
                                </span>
                                {unit.role && (
                                  <span className="text-[10px] text-slate-500">
                                    · {unit.role}
                                  </span>
                                )}
                              </label>
                            )
                          })
                        )}
                      </div>
                    </div>
                  </div>
                ))}
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
                  : editingRuleId
                  ? 'Benachrichtigungsregel aktualisieren'
                  : 'Benachrichtigungsregel anlegen'}
              </button>
            </div>
          </form>
        </div>


      </section>


      {/* Akkordeon-Liste der Benachrichtigungsregeln */}
      <section className="space-y-4">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
            Übersicht Ihrer Benachrichtigungsregeln
          </p>
          <p className="mt-1 max-w-2xl text-xs text-slate-600">
            Klappen Sie eine Regel auf, um alle zugehörigen Zeitpunkte und Empfänger zu
            sehen. Über „Regel bearbeiten“ laden Sie die Daten oben in das Formular.
          </p>
        </div>

        {loading ? (
          <p className="text-xs text-slate-500">Benachrichtigungen werden geladen …</p>
        ) : rulesWithPhases.length === 0 ? (
          <p className="text-xs text-slate-500">
            Noch keine Benachrichtigungsregeln angelegt. Erstellen Sie oben Ihre erste
            Regel und fügen Sie mehrere Zeitpunkte hinzu.
          </p>
        ) : (
          <div className="space-y-3">
            {rulesWithPhases.map((rule) => (
              <RuleAccordionItem
                key={rule.id}
                rule={rule}
                orgUnitMap={orgUnitMap}
                onToggle={() =>
                  setExpandedRuleId((prev) => (prev === rule.id ? null : rule.id))
                }
                isExpanded={expandedRuleId === rule.id}
                onEdit={() => startEdit(rule.id)}
                onDelete={() => handleDeleteRule(rule.id)}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  )
}

/* ---------- Akkordeon-Item ---------- */

type RuleAccordionItemProps = {
  rule: RuleWithPhases
  orgUnitMap: Map<string, OrgUnitRow>
  isExpanded: boolean
  onToggle: () => void
  onEdit: () => void
  onDelete: () => void
}

function RuleAccordionItem({
  rule,
  orgUnitMap,
  isExpanded,
  onToggle,
  onEdit,
  onDelete,
}: RuleAccordionItemProps) {
  const sortedPhases = rule.phases
    .slice()
    .sort((a, b) => a.offset_days - b.offset_days)

  const countBefore = sortedPhases.filter((p) => p.offset_days > 0).length
  const countOn = sortedPhases.filter((p) => p.offset_days === 0).length
  const countAfter = sortedPhases.filter((p) => p.offset_days < 0).length

  return (
    <div className="rounded-2xl border border-slate-200 bg-white text-xs shadow-sm">
      {/* Header-Zeile */}
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
      >
        <div className="min-w-0 space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <p className="truncate text-sm font-semibold text-slate-900">
              {rule.name}
            </p>
            <span
              className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] ${
                rule.is_active
                  ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                  : 'border-slate-200 bg-slate-50 text-slate-600'
              }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  rule.is_active ? 'bg-emerald-500' : 'bg-slate-300'
                }`}
              />
              {rule.is_active ? 'Aktiv' : 'Inaktiv'}
            </span>
          </div>
          {rule.description && (
            <p className="line-clamp-2 text-[11px] text-slate-600">
              {rule.description}
            </p>
          )}
          <div className="flex flex-wrap items-center gap-2 text-[10px] text-slate-500">
            <span>
              {sortedPhases.length}{' '}
              {sortedPhases.length === 1 ? 'Zeitpunkt' : 'Zeitpunkte'}
            </span>
            {countBefore > 0 && <span>· {countBefore}× vor Ablauf</span>}
            {countOn > 0 && <span>· {countOn}× am Tag des Ablaufs</span>}
            {countAfter > 0 && <span>· {countAfter}× nach Ablauf</span>}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-slate-400">
            {isExpanded ? 'Zuklappen' : 'Aufklappen'}
          </span>
          <span
            className={`text-slate-400 transition-transform duration-150 ${
              isExpanded ? 'rotate-180' : 'rotate-0'
            }`}
          >
            ▾
          </span>
        </div>
      </button>

      {/* Inhalt */}
      {isExpanded && (
        <div className="border-t border-slate-100 px-4 py-3 text-[11px] text-slate-700">
          {sortedPhases.length === 0 ? (
            <p className="text-[11px] text-slate-500">
              Für diese Benachrichtigungsregel sind noch keine Zeitpunkte hinterlegt.
            </p>
          ) : (
            <div className="space-y-2">
              {sortedPhases.map((phase) => {
                const orgNames = phase.recipients
                  .map((r) => orgUnitMap.get(r.org_unit_id)?.name)
                  .filter(Boolean) as string[]

                const timingLabel = formatOffsetLabel(phase.offset_days)
                const timingShort = formatTimingShort(phase.offset_days)

                const isBefore = phase.offset_days > 0
                const isOn = phase.offset_days === 0
                const leftStripe =
                  isBefore ? 'bg-amber-400' : isOn ? 'bg-slate-700' : 'bg-rose-500'

                return (
                  <div
                    key={phase.id}
                    className="relative rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2"
                  >
                    <div className="pointer-events-none absolute inset-y-0 left-0 w-1 rounded-l-2xl bg-transparent">
                      <div className={`h-full w-full rounded-l-2xl ${leftStripe}`} />
                    </div>

                    <div className="ml-2 space-y-1">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div>
                          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                            {timingShort}
                          </p>
                          <p className="text-[11px] text-slate-700">{timingLabel}</p>
                        </div>
                      </div>

                      <div className="mt-1 flex flex-wrap items-center gap-2">
                        {phase.notify_employee && (
                          <span className="inline-flex items-center rounded-full bg-white px-2 py-0.5 text-[10px] text-slate-700">
                            Mitarbeitende
                          </span>
                        )}
                        {phase.notify_supervisor && (
                          <span className="inline-flex items-center rounded-full bg-white px-2 py-0.5 text-[10px] text-slate-700">
                            Vorgesetzte
                          </span>
                        )}
                        {orgNames.map((name) => (
                          <span
                            key={name}
                            className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-[10px] text-slate-700"
                          >
                            {name}
                          </span>
                        ))}
                        {!phase.notify_employee &&
                          !phase.notify_supervisor &&
                          orgNames.length === 0 && (
                            <span className="text-[10px] text-slate-500">
                              Hinweis: Aktuell keine konkreten Empfänger hinterlegt.
                            </span>
                          )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 pt-2 text-[10px] text-slate-500">
            <span>
              Regel-ID:{' '}
              <span className="font-mono text-[10px] text-slate-600">
                {rule.id.slice(0, 8)}…
              </span>
            </span>
            <div className="flex gap-1">
              <button
                type="button"
                onClick={onEdit}
                className="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[10px] text-slate-700 hover:bg-slate-100"
              >
                Regel bearbeiten
              </button>
              <button
                type="button"
                onClick={onDelete}
                className="rounded-full border border-rose-200 bg-rose-50 px-2 py-0.5 text-[10px] text-rose-600 hover:bg-rose-100"
              >
                Regel löschen
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
