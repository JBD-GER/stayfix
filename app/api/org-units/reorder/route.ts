// app/api/org-units/reorder/route.ts
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'

type SupabaseCookie = {
  name: string
  value: string
  options: any
}

// Gleiches Pattern wie in app/api/org-units/route.ts
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
            // in manchen Umgebungen sind Cookies read-only – dann einfach ignorieren
          }
        },
      },
    }
  )
}

export async function POST(request: Request) {
  const supabase = await getSupabaseServerClient()

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  // JSON sicher parsen, sonst 400 zurückgeben
  const body = (await request.json().catch(() => null)) as
    | { orderedIds?: string[] }
    | null

  if (!body || !Array.isArray(body.orderedIds) || body.orderedIds.length === 0) {
    return NextResponse.json(
      { error: 'orderedIds muss ein Array mit mindestens einem Eintrag sein.' },
      { status: 400 }
    )
  }

  const { orderedIds } = body

  // Sicherstellen, dass alle Einheiten dem User gehören und die gleiche parent_id haben
  const { data: rows, error } = await supabase
    .from('org_units')
    .select('id, parent_id')
    .in('id', orderedIds)
    .eq('user_id', user.id)

  if (error) {
    console.error(error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  if (!rows || rows.length !== orderedIds.length) {
    return NextResponse.json(
      {
        error:
          'Einige Einheiten wurden nicht gefunden oder gehören nicht zu diesem Benutzer.',
      },
      { status: 400 }
    )
  }

  const firstParent = rows[0].parent_id
  const sameParent = rows.every((r) => r.parent_id === firstParent)

  if (!sameParent) {
    return NextResponse.json(
      { error: 'Reihenfolge-Update ist nur innerhalb einer Ebene erlaubt.' },
      { status: 400 }
    )
  }

  // sort_index pro Eintrag updaten – KEIN upsert (sonst Not-Null-Fehler bei name)
  for (let index = 0; index < orderedIds.length; index++) {
    const id = orderedIds[index]

    const { error: updError } = await supabase
      .from('org_units')
      .update({ sort_index: index })
      .eq('id', id)
      .eq('user_id', user.id)

    if (updError) {
      console.error(updError)
      return NextResponse.json({ error: updError.message }, { status: 500 })
    }
  }

  return NextResponse.json({ success: true })
}
