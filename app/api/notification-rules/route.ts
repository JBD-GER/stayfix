// app/api/notification-rules/route.ts
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'

type SupabaseCookie = {
  name: string
  value: string
  options: any
}

// Gleicher Cookie-Ansatz wie bei org-units
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
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options)
            })
          } catch {
            // In manchen Umgebungen sind Cookies read-only – dann ignorieren
          }
        },
      },
    }
  )
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

/* -------------------- GET: Regeln + Phasen + Empfänger -------------------- */

export async function GET() {
  const supabase = await getSupabaseServerClient()

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const { data: rules, error: rulesError } = await supabase
    .from('notification_rules')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: true })

  if (rulesError) {
    console.error(rulesError)
    return NextResponse.json({ error: rulesError.message }, { status: 500 })
  }

  const ruleIds = (rules ?? []).map((r) => r.id)
  let phases: NotificationPhaseRow[] = []
  let recipients: NotificationRecipientRow[] = []

  if (ruleIds.length > 0) {
    const { data: phaseData, error: phaseError } = await supabase
      .from('notification_rule_phases')
      .select('*')
      .eq('user_id', user.id)
      .in('rule_id', ruleIds)
      .order('offset_days', { ascending: true })

    if (phaseError) {
      console.error(phaseError)
      return NextResponse.json({ error: phaseError.message }, { status: 500 })
    }

    phases = phaseData ?? []

    const phaseIds = phases.map((p) => p.id)
    if (phaseIds.length > 0) {
      const { data: recData, error: recError } = await supabase
        .from('notification_rule_recipients')
        .select('*')
        .eq('user_id', user.id)
        .in('phase_id', phaseIds)
        .order('sort_index', { ascending: true })

      if (recError) {
        console.error(recError)
        return NextResponse.json({ error: recError.message }, { status: 500 })
      }

      recipients = recData ?? []
    }
  }

  return NextResponse.json({
    rules: rules ?? [],
    phases,
    recipients,
  })
}

/* -------------------- Helper: offset aus timingType -------------------- */

function computeOffsetDays(
  timingType: 'before' | 'on' | 'after',
  days?: number
): number | string {
  if (timingType === 'on') return 0
  const d = typeof days === 'number' ? days : NaN
  if (!Number.isFinite(d) || d <= 0) {
    return 'Bitte eine positive Anzahl an Tagen angeben.'
  }
  return timingType === 'before' ? d : -d
}

/* -------------------- POST: Regel + Phasen speichern (Create/Update) -------------------- */

export async function POST(request: Request) {
  const supabase = await getSupabaseServerClient()

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const body = await request.json()

  const {
    id,
    name,
    description,
    isActive,
    phases,
  } = body as {
    id?: string
    name: string
    description?: string
    isActive?: boolean
    phases: {
      timingType: 'before' | 'on' | 'after'
      days?: number
      notifyEmployee?: boolean
      notifySupervisor?: boolean
      orgUnitIds?: string[]
    }[]
  }

  if (!name) {
    return NextResponse.json(
      { error: 'Name der Benachrichtigungsregel ist erforderlich.' },
      { status: 400 }
    )
  }

  if (!Array.isArray(phases) || phases.length === 0) {
    return NextResponse.json(
      { error: 'Mindestens ein Zeitpunkt (Phase) ist erforderlich.' },
      { status: 400 }
    )
  }

  // Offsets prüfen
  const computedOffsets: number[] = []
  for (const phase of phases) {
    const result = computeOffsetDays(phase.timingType, phase.days)
    if (typeof result === 'string') {
      return NextResponse.json({ error: result }, { status: 400 })
    }
    computedOffsets.push(result)
  }

  // Regelkopf anlegen / aktualisieren
  let ruleId = id ?? null

  if (ruleId) {
    // Ownership check
    const { data: existing, error: existingError } = await supabase
      .from('notification_rules')
      .select('id')
      .eq('id', ruleId)
      .eq('user_id', user.id)
      .maybeSingle()

    if (existingError) {
      console.error(existingError)
      return NextResponse.json({ error: existingError.message }, { status: 500 })
    }

    if (!existing) {
      return NextResponse.json({ error: 'Regel nicht gefunden.' }, { status: 404 })
    }

    const { error: updError } = await supabase
      .from('notification_rules')
      .update({
        name,
        description: description ?? null,
        is_active: isActive ?? true,
      })
      .eq('id', ruleId)
      .eq('user_id', user.id)

    if (updError) {
      console.error(updError)
      return NextResponse.json({ error: updError.message }, { status: 500 })
    }

    // Alte Phasen + Empfänger löschen
    const { data: oldPhases, error: phaseFetchError } = await supabase
      .from('notification_rule_phases')
      .select('id')
      .eq('user_id', user.id)
      .eq('rule_id', ruleId)

    if (phaseFetchError) {
      console.error(phaseFetchError)
      return NextResponse.json({ error: phaseFetchError.message }, { status: 500 })
    }

    const oldPhaseIds = (oldPhases ?? []).map((p) => p.id)

    if (oldPhaseIds.length > 0) {
      const { error: delRecError } = await supabase
        .from('notification_rule_recipients')
        .delete()
        .eq('user_id', user.id)
        .in('phase_id', oldPhaseIds)

      if (delRecError) {
        console.error(delRecError)
        return NextResponse.json({ error: delRecError.message }, { status: 500 })
      }

      const { error: delPhaseError } = await supabase
        .from('notification_rule_phases')
        .delete()
        .eq('user_id', user.id)
        .eq('rule_id', ruleId)

      if (delPhaseError) {
        console.error(delPhaseError)
        return NextResponse.json({ error: delPhaseError.message }, { status: 500 })
      }
    }
  } else {
    const { data: rule, error: ruleError } = await supabase
      .from('notification_rules')
      .insert({
        user_id: user.id,
        name,
        description: description ?? null,
        is_active: isActive ?? true,
      })
      .select('id')
      .single()

    if (ruleError) {
      console.error(ruleError)
      return NextResponse.json({ error: ruleError.message }, { status: 500 })
    }

    ruleId = rule.id
  }

  // Neue Phasen + Empfänger anlegen
  for (let i = 0; i < phases.length; i++) {
    const phase = phases[i]
    const offsetDays = computedOffsets[i]

    const { data: insertedPhase, error: insPhaseError } = await supabase
      .from('notification_rule_phases')
      .insert({
        user_id: user.id,
        rule_id: ruleId,
        offset_days: offsetDays,
        notify_employee: !!phase.notifyEmployee,
        notify_supervisor: !!phase.notifySupervisor,
      })
      .select('id')
      .single()

    if (insPhaseError) {
      console.error(insPhaseError)
      return NextResponse.json({ error: insPhaseError.message }, { status: 500 })
    }

    const phaseId = insertedPhase.id

    if (Array.isArray(phase.orgUnitIds) && phase.orgUnitIds.length > 0) {
      const rows = phase.orgUnitIds.map((orgUnitId, index) => ({
        user_id: user.id,
        phase_id: phaseId,
        org_unit_id: orgUnitId,
        sort_index: index,
      }))

      const { error: recError } = await supabase
        .from('notification_rule_recipients')
        .insert(rows)

      if (recError) {
        console.error(recError)
        return NextResponse.json({ error: recError.message }, { status: 500 })
      }
    }
  }

  return NextResponse.json({ success: true, id: ruleId }, { status: id ? 200 : 201 })
}

/* -------------------- DELETE: komplette Regel löschen -------------------- */

export async function DELETE(request: Request) {
  const supabase = await getSupabaseServerClient()

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const body = await request.json()
  const { id } = body as { id: string }

  if (!id) {
    return NextResponse.json({ error: 'ID ist erforderlich.' }, { status: 400 })
  }

  // Ownership check
  const { data: existing, error: existingError } = await supabase
    .from('notification_rules')
    .select('id')
    .eq('id', id)
    .eq('user_id', user.id)
    .maybeSingle()

  if (existingError) {
    console.error(existingError)
    return NextResponse.json({ error: existingError.message }, { status: 500 })
  }

  if (!existing) {
    return NextResponse.json({ error: 'Regel nicht gefunden.' }, { status: 404 })
  }

  // Phasen holen
  const { data: phases, error: phaseError } = await supabase
    .from('notification_rule_phases')
    .select('id')
    .eq('user_id', user.id)
    .eq('rule_id', id)

  if (phaseError) {
    console.error(phaseError)
    return NextResponse.json({ error: phaseError.message }, { status: 500 })
  }

  const phaseIds = (phases ?? []).map((p) => p.id)

  if (phaseIds.length > 0) {
    const { error: delRecError } = await supabase
      .from('notification_rule_recipients')
      .delete()
      .eq('user_id', user.id)
      .in('phase_id', phaseIds)

    if (delRecError) {
      console.error(delRecError)
      return NextResponse.json({ error: delRecError.message }, { status: 500 })
    }

    const { error: delPhaseError } = await supabase
      .from('notification_rule_phases')
      .delete()
      .eq('user_id', user.id)
      .eq('rule_id', id)

    if (delPhaseError) {
      console.error(delPhaseError)
      return NextResponse.json({ error: delPhaseError.message }, { status: 500 })
    }
  }

  const { error: delRuleError } = await supabase
    .from('notification_rules')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id)

  if (delRuleError) {
    console.error(delRuleError)
    return NextResponse.json({ error: delRuleError.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
