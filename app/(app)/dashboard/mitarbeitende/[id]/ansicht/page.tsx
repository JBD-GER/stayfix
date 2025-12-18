import Link from 'next/link'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createServerClient } from '@supabase/ssr'

type SupabaseCookie = { name: string; value: string; options: any }

type EmployeeStatus = 'active' | 'inactive' | 'open'

type EmployeeRow = {
  id: string
  user_id: string
  status: EmployeeStatus
  first_name: string
  last_name: string
  birthdate: string
  email: string | null
  phone: string | null
  org_unit_id: string | null
  residence_title_id: string | null
  valid_until: string | null
  note: string | null
}

type OrgUnitRow = { id: string; name: string; role: string | null }
type ResidenceTitleRow = { id: string; name: string; code: string | null; is_active: boolean }

async function getSupabaseServerClient() {
  const cookieStore = await cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet: SupabaseCookie[]) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // read-only Umgebungen ignorieren
          }
        },
      },
    }
  )
}

const STATUS_LABEL: Record<EmployeeStatus, string> = {
  active: 'Aktiv',
  inactive: 'Deaktiviert',
  open: 'Offen',
}

const STATUS_BADGE: Record<EmployeeStatus, string> = {
  active: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  inactive: 'border-slate-200 bg-slate-50 text-slate-600',
  open: 'border-amber-200 bg-amber-50 text-amber-700',
}

export default async function EmployeeViewPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const supabase = await getSupabaseServerClient()

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) redirect('/')

  // ✅ Next 15: params ist Promise -> await
  const { id: employeeId } = await params

  const [
    { data: emp, error: empError },
    { data: orgUnits },
    { data: titles },
  ] = await Promise.all([
    supabase
      .from('employees')
      .select('*')
      .eq('id', employeeId)
      .eq('user_id', user.id)
      .maybeSingle<EmployeeRow>(),
    supabase
      .from('org_units')
      .select('id,name,role')
      .eq('user_id', user.id)
      .order('sort_index', { ascending: true }),
    supabase
      .from('residence_titles')
      .select('id,name,code,is_active')
      .eq('user_id', user.id)
      .order('created_at', { ascending: true }),
  ])

  if (empError) {
    return (
      <main className="px-4 pb-16 pt-8 md:px-8 md:pt-10 lg:px-10 lg:pt-12">
        <div className="rounded-3xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
          Fehler beim Laden: {empError.message}
        </div>
      </main>
    )
  }

  if (!emp) {
    return (
      <main className="px-4 pb-16 pt-8 md:px-8 md:pt-10 lg:px-10 lg:pt-12">
        <div className="rounded-3xl border border-slate-200 bg-white p-5">
          <p className="text-sm font-semibold text-slate-900">Mitarbeitende/r nicht gefunden.</p>
          <p className="mt-2 text-[12px] text-slate-600">Vielleicht wurde der Datensatz gelöscht.</p>
          <div className="mt-4">
            <Link
              href="/dashboard/mitarbeitende"
              className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[12px] font-medium text-slate-700 shadow-sm hover:bg-slate-50"
            >
              Zurück zur Übersicht
            </Link>
          </div>
        </div>
      </main>
    )
  }

  const orgMap = new Map((orgUnits ?? []).map((o: any) => [o.id, o as OrgUnitRow]))
  const titleMap = new Map((titles ?? []).map((t: any) => [t.id, t as ResidenceTitleRow]))

  const orgLabel = emp.org_unit_id
    ? (() => {
        const o = orgMap.get(emp.org_unit_id)
        if (!o) return 'Org-Einheit (gelöscht)'
        return o.role ? `${o.name} · ${o.role}` : o.name
      })()
    : 'Keine Org-Einheit'

  const titleLabel = emp.residence_title_id
    ? (() => {
        const t = titleMap.get(emp.residence_title_id)
        if (!t) return 'Aufenthaltstitel (gelöscht)'
        return t.code ? `${t.code} · ${t.name}` : t.name
      })()
    : 'Kein Aufenthaltstitel'

  return (
    <main className="px-4 pb-16 pt-8 md:px-8 md:pt-10 lg:px-10 lg:pt-12">
      {/* Top */}
      <section className="mb-6 flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <Link
            href="/dashboard/mitarbeitende"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[12px] font-medium text-slate-700 shadow-sm hover:bg-slate-50"
          >
            ← Zurück
          </Link>

          <h1 className="mt-4 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            {emp.first_name} {emp.last_name}
          </h1>

          <div className="mt-2 flex flex-wrap items-center gap-2 text-[12px] text-slate-600">
            <span>Geb.: {emp.birthdate}</span>
            <span className="text-slate-300">•</span>
            <span>{orgLabel}</span>
            <span className="text-slate-300">•</span>
            <span>{titleLabel}</span>
            <span className="text-slate-300">•</span>
            <span>Gültig bis: {emp.valid_until || '—'}</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-[11px] ${STATUS_BADGE[emp.status]}`}
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

          <Link
            href={`/dashboard/mitarbeitende/${emp.id}`}
            className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[12px] font-medium text-slate-700 shadow-sm hover:bg-slate-50"
          >
            Bearbeiten
          </Link>
        </div>
      </section>

      {/* Details + Placeholder Notifications */}
      <section className="grid gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
        <div className="space-y-6">
          {/* Stammdaten */}
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold text-slate-900">Stammdaten</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                <p className="text-[11px] uppercase tracking-[0.14em] text-slate-500">E-Mail</p>
                <p className="mt-1 text-sm font-medium text-slate-900">{emp.email || '—'}</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                <p className="text-[11px] uppercase tracking-[0.14em] text-slate-500">Telefon</p>
                <p className="mt-1 text-sm font-medium text-slate-900">{emp.phone || '—'}</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3 sm:col-span-2">
                <p className="text-[11px] uppercase tracking-[0.14em] text-slate-500">Interne Notiz</p>
                <p className="mt-1 text-[13px] text-slate-700">{emp.note || '—'}</p>
              </div>
            </div>
          </div>

          {/* Benachrichtigungen (PLATZHALTER) */}
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-slate-900">Benachrichtigungen</p>
                <p className="mt-1 text-[12px] text-slate-600">
                  Platzhalter: Hier zeigen wir später, welche Reminder das System wann erzeugt hat.
                </p>
              </div>
              <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] text-slate-600">
                Preview
              </span>
            </div>

            <div className="mt-4 space-y-2">
              {[
                { when: '2025-12-01 · 09:00', who: 'HR-Leitung', subj: 'Reminder: Aufenthaltstitel läuft in 14 Tagen ab' },
                { when: '2025-12-08 · 09:00', who: 'Mitarbeitende/r', subj: 'Bitte Dokumente prüfen / erneuern' },
                { when: '2025-12-15 · 09:00', who: 'HR-Leitung', subj: 'Ablauf heute: Sofort prüfen' },
              ].map((n, idx) => (
                <div key={idx} className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-[12px] font-medium text-slate-900">{n.subj}</p>
                    <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10px] text-emerald-700">
                      Geplant
                    </span>
                  </div>
                  <p className="mt-1 text-[11px] text-slate-600">
                    <span className="font-medium">Zeitpunkt:</span> {n.when} ·{' '}
                    <span className="font-medium">Empfänger:</span> {n.who} ·{' '}
                    <span className="font-medium">Kanal:</span> E-Mail
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* E-Mail Vorschau (PLATZHALTER) */}
        <aside className="space-y-4">
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold text-slate-900">E-Mail Vorschau</p>
            <p className="mt-1 text-[12px] text-slate-600">
              Platzhalter: später rendern wir hier die echte Template-Vorschau.
            </p>

            <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-[12px] text-slate-700">
              <p className="text-[11px] text-slate-500">Betreff</p>
              <p className="mt-1 font-medium text-slate-900">Reminder: Aufenthaltstitel läuft bald ab</p>

              <div className="mt-3 grid gap-2 text-[11px] text-slate-600">
                <p>
                  <span className="font-medium">An:</span> hr@example.com
                </p>
                <p>
                  <span className="font-medium">Von:</span> noreply@stayfix.de
                </p>
              </div>

              <div className="mt-4 rounded-xl border border-slate-200 bg-white p-3 text-[12px] leading-relaxed text-slate-700">
                Hallo,<br />
                der Aufenthaltstitel von{' '}
                <span className="font-medium">
                  {emp.first_name} {emp.last_name}
                </span>{' '}
                läuft bald ab. Bitte prüfen Sie die nächsten Schritte.
                <br />
                <br />
                Viele Grüße
                <br />
                Stayfix
              </div>
            </div>
          </div>
        </aside>
      </section>
    </main>
  )
}
