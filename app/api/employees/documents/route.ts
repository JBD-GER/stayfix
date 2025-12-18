// app/api/employees/documents/route.ts
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

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
            // read-only Umgebungen ignorieren
          }
        },
      },
    }
  )
}

type EmployeeDocument = {
  name: string
  path: string
}

function isFileLike(v: unknown): v is File {
  return !!v && typeof v === 'object' && typeof (v as any).arrayBuffer === 'function' && typeof (v as any).name === 'string'
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

  try {
    const formData = await request.formData()
    const employeeId = formData.get('employeeId')

    if (!employeeId || typeof employeeId !== 'string') {
      return NextResponse.json({ error: 'employeeId ist erforderlich.' }, { status: 400 })
    }

    // Ownership check Mitarbeitender
    const { data: existing, error: existingError } = await supabase
      .from('employees')
      .select('id, user_id, document_urls')
      .eq('id', employeeId)
      .eq('user_id', user.id)
      .maybeSingle()

    if (existingError) {
      console.error(existingError)
      return NextResponse.json({ error: existingError.message }, { status: 500 })
    }

    if (!existing) {
      return NextResponse.json({ error: 'Mitarbeitende/r nicht gefunden.' }, { status: 404 })
    }

    const currentDocs: EmployeeDocument[] = Array.isArray(existing.document_urls)
      ? (existing.document_urls as EmployeeDocument[])
      : []

    const filesRaw = formData.getAll('files')
    const files = filesRaw.filter(isFileLike)

    if (files.length === 0) {
      return NextResponse.json(
        { error: 'Keine Dateien übermittelt (files[]). Prüfe, ob FormData die Files unter "files" sendet.' },
        { status: 400 }
      )
    }

    const newDocs: EmployeeDocument[] = [...currentDocs]

    for (const file of files) {
      const safeName = String(file.name).replace(/[^a-zA-Z0-9.\-_]/g, '_')
      const path = `employees/${employeeId}/${Date.now()}-${safeName}`

      const { error: uploadError } = await supabase.storage
        .from('dokumente')
        .upload(path, file, {
          upsert: false,
          contentType: file.type || 'application/octet-stream',
        })

      if (uploadError) {
        console.error(uploadError)
        return NextResponse.json(
          { error: `Upload fehlgeschlagen: ${uploadError.message}` },
          { status: 500 }
        )
      }

      newDocs.push({ name: file.name, path })
    }

    const { data: updated, error: updateError } = await supabase
      .from('employees')
      .update({ document_urls: newDocs })
      .eq('id', employeeId)
      .eq('user_id', user.id)
      .select('id, document_urls')
      .single()

    if (updateError) {
      console.error(updateError)
      return NextResponse.json({ error: updateError.message }, { status: 500 })
    }

    return NextResponse.json(
      { success: true, documents: (updated?.document_urls as any) ?? [] },
      { status: 200 }
    )
  } catch (e: any) {
    console.error(e)
    return NextResponse.json(
      { error: e?.message || 'Unbekannter Fehler beim Dokument-Upload.' },
      { status: 500 }
    )
  }
}
