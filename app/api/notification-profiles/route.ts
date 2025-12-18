// app/api/notification-profiles/route.ts
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'

type SupabaseCookie = {
  name: string
  value: string
  options: any
}

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
            // cookies may be read-only
          }
        },
      },
    }
  )
}

type NotificationProfileRow = {
  id: string
  user_id: string
  name: string
  description: string | null
  is_active: boolean
  created_at: string
}

/* -------------------- GET: alle Profile -------------------- */
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
    .from('notification_profiles')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: true })

  if (error) {
    console.error(error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json((data ?? []) as NotificationProfileRow[])
}

/* -------------------- POST: Profil anlegen -------------------- */
export async function POST(request: Request) {
  const supabase = await getSupabaseServerClient()

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const body = await request.json().catch(() => ({}))

  const name = String(body?.name ?? '').trim()
  const description =
    body?.description === undefined ? null : String(body.description || '').trim() || null
  const isActive = body?.isActive === false ? false : true

  if (!name) {
    return NextResponse.json({ error: 'Name ist erforderlich.' }, { status: 400 })
  }

  const { data, error } = await supabase
    .from('notification_profiles')
    .insert({
      user_id: user.id,
      name,
      description,
      is_active: isActive,
    })
    .select('*')
    .single()

  if (error) {
    console.error(error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data, { status: 201 })
}

/* -------------------- PATCH: Profil updaten -------------------- */
export async function PATCH(request: Request) {
  const supabase = await getSupabaseServerClient()

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const body = await request.json().catch(() => ({}))
  const id = String(body?.id ?? '').trim()

  if (!id) {
    return NextResponse.json({ error: 'ID ist erforderlich.' }, { status: 400 })
  }

  // Ownership check
  const { data: existing, error: exErr } = await supabase
    .from('notification_profiles')
    .select('id')
    .eq('id', id)
    .eq('user_id', user.id)
    .maybeSingle()

  if (exErr) {
    console.error(exErr)
    return NextResponse.json({ error: exErr.message }, { status: 500 })
  }
  if (!existing) {
    return NextResponse.json({ error: 'Profil nicht gefunden.' }, { status: 404 })
  }

  const updates: any = {}
  if (body?.name !== undefined) {
    const n = String(body.name ?? '').trim()
    if (!n) return NextResponse.json({ error: 'Name darf nicht leer sein.' }, { status: 400 })
    updates.name = n
  }
  if (body?.description !== undefined) {
    updates.description = String(body.description || '').trim() || null
  }
  if (body?.isActive !== undefined) {
    updates.is_active = Boolean(body.isActive)
  }

  const { data, error } = await supabase
    .from('notification_profiles')
    .update(updates)
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

/* -------------------- DELETE: Profil löschen -------------------- */
export async function DELETE(request: Request) {
  const supabase = await getSupabaseServerClient()

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const body = await request.json().catch(() => ({}))
  const id = String(body?.id ?? '').trim()

  if (!id) {
    return NextResponse.json({ error: 'ID ist erforderlich.' }, { status: 400 })
  }

  // Ownership check
  const { data: existing, error: exErr } = await supabase
    .from('notification_profiles')
    .select('id')
    .eq('id', id)
    .eq('user_id', user.id)
    .maybeSingle()

  if (exErr) {
    console.error(exErr)
    return NextResponse.json({ error: exErr.message }, { status: 500 })
  }
  if (!existing) {
    return NextResponse.json({ error: 'Profil nicht gefunden.' }, { status: 404 })
  }

  const { error } = await supabase
    .from('notification_profiles')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) {
    console.error(error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
