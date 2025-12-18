// app/(app)/dashboard/organigram/page.tsx
'use client'

import {
  useEffect,
  useMemo,
  useState,
  FormEvent,
  useRef,
} from 'react'
import type React from 'react'

type OrgUnitRow = {
  id: string
  user_id: string
  parent_id: string | null
  name: string
  role: string | null
  supervisor_name: string | null
  supervisor_email: string | null
  supervisor_phone: string | null
  employee_count: number
  level: number | null
  sort_index: number
}

type OrgNode = {
  id: string
  name: string
  role: string | null
  employeeCount: number
  supervisorName?: string | null
  supervisorEmail?: string | null
  supervisorPhone?: string | null
  children: OrgNode[]
}

/* ---------- Hilfsfunktionen ---------- */

function buildTree(rows: OrgUnitRow[]): OrgNode[] {
  const map = new Map<string, OrgNode>()

  rows.forEach((row) => {
    map.set(row.id, {
      id: row.id,
      name: row.name,
      role: row.role,
      employeeCount: row.employee_count ?? 0,
      supervisorName: row.supervisor_name,
      supervisorEmail: row.supervisor_email,
      supervisorPhone: row.supervisor_phone,
      children: [],
    })
  })

  const roots: OrgNode[] = []

  rows.forEach((row) => {
    const node = map.get(row.id)!
    if (row.parent_id && map.has(row.parent_id)) {
      map.get(row.parent_id)!.children.push(node)
    } else {
      roots.push(node)
    }
  })

  return roots
}

/* ---------- Komponenten ---------- */

type OrgNodeCardProps = {
  node: OrgNode
  onEdit: (id: string) => void
  onDelete: (id: string) => void
  showTopConnector?: boolean
}

function OrgNodeCard({
  node,
  onEdit,
  onDelete,
  showTopConnector = true,
}: OrgNodeCardProps) {
  const hasSupervisor =
    node.supervisorName || node.supervisorEmail || node.supervisorPhone

  return (
    <div className="relative w-[300px] md:w-[360px] rounded-2xl border border-slate-200 bg-white px-4 py-3 text-left shadow-sm">
      {/* Verbindungslinie nach oben (für Untereinheiten, nur Desktop) */}
      {showTopConnector && (
        <div className="pointer-events-none absolute -top-4 left-1/2 hidden h-4 w-px -translate-x-1/2 bg-slate-200 md:block" />
      )}

      <div className="flex flex-col gap-2">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold text-slate-900">{node.name}</p>
            {node.role && (
              <p className="text-[11px] text-slate-500">{node.role}</p>
            )}
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="inline-flex items-center rounded-full bg-slate-50 px-2.5 py-1 text-[10px] font-medium text-slate-700">
              {node.employeeCount} Mitarbeitende
            </span>
            <div className="flex gap-1">
              <button
                type="button"
                onClick={() => onEdit(node.id)}
                className="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[10px] text-slate-600 hover:bg-slate-100"
              >
                Bearbeiten
              </button>
              <button
                type="button"
                onClick={() => onDelete(node.id)}
                className="rounded-full border border-rose-200 bg-rose-50 px-2 py-0.5 text-[10px] text-rose-600 hover:bg-rose-100"
              >
                Löschen
              </button>
            </div>
          </div>
        </div>

        {hasSupervisor && (
          <div className="rounded-xl bg-slate-50 px-3 py-2 text-[11px] text-slate-600">
            <p className="mb-0.5 font-medium text-slate-800">Vorgesetzte*r</p>
            {node.supervisorName && <p>{node.supervisorName}</p>}
            {node.supervisorEmail && <p>{node.supervisorEmail}</p>}
            {node.supervisorPhone && <p>Tel.: {node.supervisorPhone}</p>}
          </div>
        )}
      </div>
    </div>
  )
}

type OrgLevelProps = {
  nodes: OrgNode[]
  onEdit: (id: string) => void
  onDelete: (id: string) => void
  onReorder: (orderedIds: string[]) => void
  isRoot?: boolean
}

/**
 * Eine Ebene (alle Einheiten mit gleichem Parent) + verschachtelte Unterboxen.
 * Drag & Drop verändert die horizontale Anordnung innerhalb dieser Ebene (sort_index).
 */
function OrgLevel({
  nodes,
  onEdit,
  onDelete,
  onReorder,
  isRoot = false,
}: OrgLevelProps) {
  const [draggedId, setDraggedId] = useState<string | null>(null)

  function handleDragStart(id: string) {
    setDraggedId(id)
  }

  function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault()
  }

  function handleDrop(targetId: string) {
    if (!draggedId || draggedId === targetId) return

    const ids = nodes.map((n) => n.id)
    const fromIndex = ids.indexOf(draggedId)
    const toIndex = ids.indexOf(targetId)

    if (fromIndex === -1 || toIndex === -1) return

    ids.splice(fromIndex, 1)
    ids.splice(toIndex, 0, draggedId)

    onReorder(ids)
    setDraggedId(null)
  }

  function handleDragEnd() {
    setDraggedId(null)
  }

  return (
    <div className="flex flex-row flex-nowrap items-start justify-center gap-8">
      {nodes.map((node) => {
        const isDragging = draggedId === node.id

        return (
          <div
            key={node.id}
            className={`flex flex-col items-center ${
              isDragging ? 'rounded-2xl bg-slate-100/60' : ''
            }`}
            draggable
            onDragStart={() => handleDragStart(node.id)}
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(node.id)}
            onDragEnd={handleDragEnd}
            data-node-card="true"
          >
            <OrgNodeCard
              node={node}
              onEdit={onEdit}
              onDelete={onDelete}
              showTopConnector={!isRoot}
            />

            {node.children && node.children.length > 0 && (
              <div className="mt-4 w-full">
                {/* Vertikale Verbindungslinie zur Box der Unterordnungen */}
                <div className="relative mb-4 hidden h-4 md:block">
                  <div className="absolute left-1/2 h-full w-px -translate-x-1/2 bg-slate-200" />
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
                  <div className="mb-2 text-center text-[11px] font-semibold text-slate-700">
                    Unterordnungen von: {node.name}
                  </div>
                  <OrgLevel
                    nodes={node.children}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onReorder={onReorder}
                  />
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

/* ---------- Seite ---------- */

export default function OrganigramPage() {
  const [rows, setRows] = useState<OrgUnitRow[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Zoom & Pan
  const [zoom, setZoom] = useState(1)
  const [isDragging, setIsDragging] = useState(false)
  const viewportRef = useRef<HTMLDivElement | null>(null)
  const contentRef = useRef<HTMLDivElement | null>(null)
  const dragStateRef = useRef<{
    startX: number
    startY: number
    scrollLeft: number
    scrollTop: number
    pointerId: number | null
  } | null>(null)
  const autoZoomInitialized = useRef(false)

  // Form-State
  const [editingId, setEditingId] = useState<string | null>(null)
  const [name, setName] = useState('')
  const [role, setRole] = useState('')
  const [supervisorName, setSupervisorName] = useState('')
  const [supervisorEmail, setSupervisorEmail] = useState('')
  const [supervisorPhone, setSupervisorPhone] = useState('')
  const [parentId, setParentId] = useState<string | ''>('')

  /* ---------- Daten laden ---------- */

  async function reload() {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/org-units')
      if (!res.ok) {
        throw new Error('Fehler beim Laden des Organigramms.')
      }
      const data = await res.json()
      setRows(data)
    } catch (e: any) {
      console.error(e)
      setError(e.message ?? 'Unbekannter Fehler.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    reload()
  }, [])

  // Wichtig: nach level + sort_index sortieren, damit Drag & Drop sichtbar wird
  const tree = useMemo(() => {
    const sorted = [...rows].sort((a, b) => {
      const levelA = a.level ?? 0
      const levelB = b.level ?? 0
      if (levelA !== levelB) return levelA - levelB
      return (a.sort_index ?? 0) - (b.sort_index ?? 0)
    })
    return buildTree(sorted)
  }, [rows])

  /* ---------- Auto-Zoom (einmalig) ---------- */

  useEffect(() => {
    if (autoZoomInitialized.current) return
    if (!viewportRef.current || !contentRef.current) return

    const viewportWidth = viewportRef.current.clientWidth
    const contentWidth = contentRef.current.scrollWidth

    if (viewportWidth <= 0 || contentWidth <= 0) return

    const ratio = viewportWidth / contentWidth
    const nextZoom = Math.min(1, Math.max(0.4, ratio))
    setZoom(nextZoom)
    autoZoomInitialized.current = true
  }, [rows])

  /* ---------- Edit / Delete ---------- */

  function startEdit(id: string) {
    const row = rows.find((r) => r.id === id)
    if (!row) return
    setEditingId(id)
    setName(row.name)
    setRole(row.role ?? '')
    setSupervisorName(row.supervisor_name ?? '')
    setSupervisorEmail(row.supervisor_email ?? '')
    setSupervisorPhone(row.supervisor_phone ?? '')
    setParentId(row.parent_id ?? '')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function resetForm() {
    setEditingId(null)
    setName('')
    setRole('')
    setSupervisorName('')
    setSupervisorEmail('')
    setSupervisorPhone('')
    setParentId('')
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setSaving(true)

    const payload = {
      id: editingId ?? undefined,
      name,
      role: role || undefined,
      supervisorName: supervisorName || undefined,
      supervisorEmail: supervisorEmail || undefined,
      supervisorPhone: supervisorPhone || undefined,
      parentId: parentId || null,
    }

    try {
      const res = await fetch('/api/org-units', {
        method: editingId ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      let data: any = null
      try {
        data = await res.json()
      } catch {
        // falls mal kein JSON kommt
      }

      if (!res.ok) {
        throw new Error(data?.error || 'Fehler beim Speichern.')
      }

      await reload()
      resetForm()
    } catch (e: any) {
      console.error(e)
      setError(e.message ?? 'Unbekannter Fehler beim Speichern.')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id: string) {
    const row = rows.find((r) => r.id === id)
    const unitName = row?.name ?? 'diese Einheit'

    if (!window.confirm(`Möchten Sie ${unitName} wirklich löschen?`)) return

    setError(null)
    try {
      const res = await fetch('/api/org-units', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })

      let data: any = null
      try {
        data = await res.json()
      } catch {
        // ignore
      }

      if (!res.ok) {
        throw new Error(data?.error || 'Fehler beim Löschen.')
      }

      await reload()

      if (editingId === id) {
        resetForm()
      }
    } catch (e: any) {
      console.error(e)
      setError(e.message ?? 'Unbekannter Fehler beim Löschen.')
    }
  }

  /* ---------- Reihenfolge speichern (Drag & Drop) ---------- */

  async function handleReorder(orderedIds: string[]) {
    // Optimistisch sort_index lokal anpassen
    setRows((prev) => {
      const indexMap = new Map<string, number>()
      orderedIds.forEach((id, idx) => indexMap.set(id, idx))

      const updated = prev.map((row) =>
        indexMap.has(row.id)
          ? { ...row, sort_index: indexMap.get(row.id)! }
          : row
      )

      return updated
    })

    try {
      const res = await fetch('/api/org-units/reorder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderedIds }),
      })

      let data: any = null
      try {
        data = await res.json()
      } catch {
        // wenn kein/leer JSON kommt -> kein Problem
      }

      if (!res.ok) {
        throw new Error(data?.error || 'Fehler beim Aktualisieren der Reihenfolge.')
      }
    } catch (e: any) {
      console.error(e)
      setError(e.message ?? 'Unbekannter Fehler bei der Reihenfolgeaktualisierung.')
      await reload()
    }
  }

  /* ---------- Zoom & Drag-Pan ---------- */

  function zoomOut() {
    setZoom((z) => Math.max(0.4, Math.round((z - 0.1) * 10) / 10))
  }

  function zoomIn() {
    setZoom((z) => Math.min(1.4, Math.round((z + 0.1) * 10) / 10))
  }

  function resetZoom() {
    setZoom(1)
  }

  function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
    if (!viewportRef.current) return
    if (e.pointerType === 'mouse' && e.button !== 0) return

    const target = e.target as HTMLElement

    if (target.closest('[data-node-card="true"]')) return
    if (target.closest('button, a, input, textarea, select, label')) return

    viewportRef.current.setPointerCapture(e.pointerId)
    dragStateRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      scrollLeft: viewportRef.current.scrollLeft,
      scrollTop: viewportRef.current.scrollTop,
      pointerId: e.pointerId,
    }
    setIsDragging(true)
  }

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!viewportRef.current) return
    const state = dragStateRef.current
    if (!state) return

    const dx = e.clientX - state.startX
    const dy = e.clientY - state.startY

    viewportRef.current.scrollLeft = state.scrollLeft - dx
    viewportRef.current.scrollTop = state.scrollTop - dy
  }

  function endDrag(e: React.PointerEvent<HTMLDivElement>) {
    if (!viewportRef.current) return
    const state = dragStateRef.current
    if (state && state.pointerId != null) {
      try {
        viewportRef.current.releasePointerCapture(state.pointerId)
      } catch {
        // ignore
      }
    }
    dragStateRef.current = null
    setIsDragging(false)
  }

  /* ---------- Render ---------- */

  return (
    <main className="px-4 pb-16 pt-8 md:px-8 md:pt-10 lg:px-10 lg:pt-12">
      {/* Header */}
      <section className="mb-8 space-y-3">
        <div>
          <p className="mb-2 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-50 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-emerald-700">
            Organisation · Strukturen · Teams
          </p>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            Organigramm Ihres Unternehmens.
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
            Bilden Sie Abteilungen, Teams und Vorgesetzte flexibel ab – vom schlanken Setup bis
            zum Konzern. Untereinheiten wie „Zustellung“ hängen sauber unter ihrer übergeordneten
            Einheit (z.&nbsp;B. „Outbound“). Die horizontale Anordnung innerhalb einer Ebene können
            Sie per Drag &amp; Drop frei anpassen.
          </p>
        </div>

        {error && (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 px-3 py-2 text-[11px] text-rose-700">
            {error}
          </div>
        )}
      </section>

      {/* Formular */}
      <section className="mb-10 rounded-3xl border border-slate-200 bg-white px-4 py-4 md:px-6 md:py-5">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <div>
            <p className="text-sm font-semibold text-slate-900">
              {editingId ? 'Organisationseinheit bearbeiten' : 'Neue Organisationseinheit'}
            </p>
            <p className="text-[11px] text-slate-500">
              Legen Sie eine Ebene an – z.&nbsp;B. Geschäftsführung, Bereich, Abteilung oder Team.
              Über die übergeordnete Einheit steuern Sie die Unterordnung im Organigramm.
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

        <form onSubmit={handleSubmit} className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-medium text-slate-700">Name*</label>
            <input
              className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 outline-none focus:border-[#3B5BFF] focus:ring-1 focus:ring-[#3B5BFF]/40"
              placeholder="z.B. HR & People"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-medium text-slate-700">Rolle / Funktion</label>
            <input
              className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 outline-none focus:border-[#3B5BFF] focus:ring-1 focus:ring-[#3B5BFF]/40"
              placeholder="z.B. Leitung HR"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-medium text-slate-700">
              Übergeordnete Einheit (optional)
            </label>
            <select
              className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 outline-none focus:border-[#3B5BFF] focus:ring-1 focus:ring-[#3B5BFF]/40"
              value={parentId}
              onChange={(e) => setParentId(e.target.value)}
            >
              <option value="">Keine (oberste Ebene)</option>
              {rows.map((unit) => (
                <option key={unit.id} value={unit.id}>
                  {unit.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-medium text-slate-700">
              Vorgesetzte*r – Name
            </label>
            <input
              className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 outline-none focus:border-[#3B5BFF] focus:ring-1 focus:ring-[#3B5BFF]/40"
              placeholder="z.B. Max Mustermann"
              value={supervisorName}
              onChange={(e) => setSupervisorName(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-medium text-slate-700">
              Vorgesetzte*r – E-Mail
            </label>
            <input
              className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 outline-none focus:border-[#3B5BFF] focus:ring-1 focus:ring-[#3B5BFF]/40"
              placeholder="z.B. max.mustermann@unternehmen.de"
              type="email"
              value={supervisorEmail}
              onChange={(e) => setSupervisorEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-medium text-slate-700">
              Vorgesetzte*r – Telefon
            </label>
            <input
              className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 outline-none focus:border-[#3B5BFF] focus:ring-1 focus:ring-[#3B5BFF]/40"
              placeholder="z.B. +49 30 123456"
              value={supervisorPhone}
              onChange={(e) => setSupervisorPhone(e.target.value)}
            />
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex w-full items-center justify-center rounded-full bg-[#3B5BFF] px-4 py-2 text-xs font-medium text-white shadow-sm hover:bg-[#3049D9] disabled:cursor-not-allowed disabled:opacity-60 md:w-auto"
            >
              {saving
                ? 'Speichern…'
                : editingId
                ? 'Änderungen speichern'
                : 'Einheit anlegen'}
            </button>
          </div>
        </form>
      </section>

      {/* Organigramm – mit Zoom & Drag-Pan */}
      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
              Visualisierung
            </span>
            <p className="text-xs text-slate-500">
              Zoomen Sie in das Organigramm und verschieben Sie den Ausschnitt mit gedrückter
              linker Maustaste oder per Fingerbewegung in alle Richtungen. Boxen selbst können
              per Drag &amp; Drop innerhalb ihrer Ebene horizontal umsortiert werden.
            </p>
          </div>
          <div className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-2 py-1 text-[11px] text-slate-600">
            <button
              type="button"
              onClick={zoomOut}
              className="rounded-full px-2 py-0.5 hover:bg-slate-100"
            >
              –
            </button>
            <span className="min-w-[52px] text-center">
              {Math.round(zoom * 100)}%
            </span>
            <button
              type="button"
              onClick={zoomIn}
              className="rounded-full px-2 py-0.5 hover:bg-slate-100"
            >
              +
            </button>
            <button
              type="button"
              onClick={resetZoom}
              className="ml-1 rounded-full px-2 py-0.5 text-[10px] hover:bg-slate-100"
            >
              100%
            </button>
          </div>
        </div>

        {loading ? (
          <p className="text-xs text-slate-500">Organigramm wird geladen …</p>
        ) : tree.length === 0 ? (
          <p className="text-xs text-slate-500">
            Noch keine Organisationseinheiten angelegt. Starten Sie mit der Geschäftsführung oder
            einer ersten Abteilung.
          </p>
        ) : (
          <div
            ref={viewportRef}
            className={`relative max-h-[70vh] w-full overflow-auto rounded-3xl border border-slate-200 bg-slate-50/70 px-2 py-4 md:px-4 md:py-6 ${
              isDragging ? 'cursor-grabbing' : 'cursor-grab'
            }`}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            onPointerLeave={(e) => {
              if (dragStateRef.current) {
                endDrag(e)
              }
            }}
          >
            <div
              ref={contentRef}
              className="flex min-w-full flex-col items-center gap-10"
              style={{
                transform: `scale(${zoom})`,
                transformOrigin: 'top center',
              }}
            >
              {/* Root-Ebene */}
              <div className="flex flex-col items-center gap-4">
                <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
                  Ebene 1 · Unternehmensspitze / Root-Einheiten
                </span>
                <OrgLevel
                  nodes={tree}
                  onEdit={startEdit}
                  onDelete={handleDelete}
                  onReorder={handleReorder}
                  isRoot
                />
              </div>

              {/* Info für Unterebenen */}
              {tree.some((root) => root.children.length > 0) && (
                <div className="flex flex-col items-center gap-2">
                  <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
                    Untergeordnete Ebenen · Bereiche, Abteilungen &amp; Teams
                  </span>
                  <p className="max-w-3xl text-center text-xs text-slate-600">
                    Jede Karte steht für eine Organisationseinheit. Unterordnungen hängen direkt
                    unter ihrer übergeordneten Einheit. Durch Drag &amp; Drop passen Sie die
                    horizontale Reihenfolge innerhalb jeder Ebene an.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </section>
    </main>
  )
}
