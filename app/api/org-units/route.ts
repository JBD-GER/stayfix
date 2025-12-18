// app/api/org-units/route.ts
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'

type SupabaseCookie = {
  name: string
  value: string
  options: any
}

// WICHTIG: async + await cookies()
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

// GET: Alle Einheiten des Users
export async function GET() {
  const supabase = await getSupabaseServerClient()

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const { data, error } = await supabase
    .from('org_units')
    .select('*')
    .eq('user_id', user.id)
    .order('level', { nullsFirst: true })
    .order('sort_index', { ascending: true })

  if (error) {
    console.error(error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data ?? [])
}

// POST: Neue Einheit (ohne E-Mail-Feld)
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
    name,
    role,
    supervisorName,
    supervisorEmail,
    supervisorPhone,
    parentId,
  } = body as {
    name: string
    role?: string
    supervisorName?: string
    supervisorEmail?: string
    supervisorPhone?: string
    parentId?: string | null
  }

  if (!name) {
    return NextResponse.json({ error: 'Name ist erforderlich.' }, { status: 400 })
  }

  // Level ableiten
  let level: number | null = 1
  if (parentId) {
    const { data: parent } = await supabase
      .from('org_units')
      .select('level')
      .eq('id', parentId)
      .eq('user_id', user.id)
      .maybeSingle()

    level = parent?.level != null ? parent.level + 1 : 2
  }

  const { data, error } = await supabase
    .from('org_units')
    .insert({
      user_id: user.id,
      parent_id: parentId ?? null,
      name,
      role: role ?? null,
      supervisor_name: supervisorName ?? null,
      supervisor_email: supervisorEmail ?? null,
      supervisor_phone: supervisorPhone ?? null,
      level,
    })
    .select('*')
    .single()

  if (error) {
    console.error(error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data, { status: 201 })
}

// PATCH: Einheit aktualisieren
export async function PATCH(request: Request) {
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
    role,
    supervisorName,
    supervisorEmail,
    supervisorPhone,
    parentId,
  } = body as {
    id: string
    name?: string
    role?: string
    supervisorName?: string
    supervisorEmail?: string
    supervisorPhone?: string
    parentId?: string | null
  }

  if (!id) {
    return NextResponse.json({ error: 'ID ist erforderlich.' }, { status: 400 })
  }

  const { data: existing, error: existingError } = await supabase
    .from('org_units')
    .select('parent_id, level')
    .eq('id', id)
    .eq('user_id', user.id)
    .maybeSingle()

  if (existingError) {
    console.error(existingError)
    return NextResponse.json({ error: existingError.message }, { status: 500 })
  }

  if (!existing) {
    return NextResponse.json({ error: 'Einheit nicht gefunden.' }, { status: 404 })
  }

  // Parent + Level bestimmen
  let newParentId = parentId === undefined ? existing.parent_id : parentId
  let newLevel = existing.level

  const parentChanged = parentId !== undefined && parentId !== existing.parent_id

  if (parentChanged) {
    if (!newParentId) {
      newLevel = 1
    } else {
      const { data: parent } = await supabase
        .from('org_units')
        .select('level')
        .eq('id', newParentId)
        .eq('user_id', user.id)
        .maybeSingle()

      newLevel = parent?.level != null ? parent.level + 1 : 2
    }
  }

  const updatePayload: any = {
    parent_id: newParentId ?? null,
    level: newLevel,
  }

  if (typeof name === 'string') updatePayload.name = name
  if (role !== undefined) updatePayload.role = role ?? null
  if (supervisorName !== undefined) updatePayload.supervisor_name = supervisorName ?? null
  if (supervisorEmail !== undefined) updatePayload.supervisor_email = supervisorEmail ?? null
  if (supervisorPhone !== undefined) updatePayload.supervisor_phone = supervisorPhone ?? null

  const { data, error } = await supabase
    .from('org_units')
    .update(updatePayload)
    .eq('id', id)
    .eq('user_id', user.id)
    .select('*')
    .single()

  if (error) {
    console.error(error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}

// DELETE: Einheit löschen
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

  const { error } = await supabase
    .from('org_units')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) {
    console.error(error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
