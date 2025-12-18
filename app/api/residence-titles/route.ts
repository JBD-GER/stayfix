// app/api/residence-titles/route.ts
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

// GET: Alle Aufenthaltstitel des eingeloggten Users
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
    .from('residence_titles')
    .select('*')
    .eq('user_id', user.id)
    .order('sort_index', { ascending: true })
    .order('name', { ascending: true })

  if (error) {
    console.error(error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data ?? [])
}

// POST: Neuen Aufenthaltstitel anlegen
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
    code,
    category,
    country,
    description,
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
    sortIndex,
  } = body as {
    name: string
    code?: string
    category?: string
    country?: string
    description?: string
    isActive?: boolean
    requirePermitNumber?: boolean
    requireValidFrom?: boolean
    requireValidUntil?: boolean
    requireIssuingAuthority?: boolean
    requireRestrictions?: boolean
    requirePriorityCheck?: boolean
    requirePriorityCode?: boolean
    requireEmploymentDetails?: boolean
    requireDocumentUpload?: boolean
    sortIndex?: number
  }

  if (!name || !name.trim()) {
    return NextResponse.json(
      { error: 'Name des Aufenthaltstitels ist erforderlich.' },
      { status: 400 }
    )
  }

  const { data, error } = await supabase
    .from('residence_titles')
    .insert({
      user_id: user.id,
      name: name.trim(),
      code: code?.trim() || null,
      category: category?.trim() || null,
      country: country?.trim() || null,
      description: description?.trim() || null,
      require_permit_number: requirePermitNumber ?? true,
      require_valid_from: requireValidFrom ?? true,
      require_valid_until: requireValidUntil ?? true,
      require_issuing_authority: requireIssuingAuthority ?? false,
      require_restrictions: requireRestrictions ?? false,
      require_priority_check: requirePriorityCheck ?? false,
      require_priority_code: requirePriorityCode ?? false,
      require_employment_details: requireEmploymentDetails ?? false,
      require_document_upload: requireDocumentUpload ?? true,
      is_active: isActive ?? true,
      sort_index: typeof sortIndex === 'number' ? sortIndex : 0,
    })
    .select('*')
    .single()

  if (error) {
    console.error(error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data, { status: 201 })
}

// PATCH: Aufenthaltstitel aktualisieren
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
    code,
    category,
    country,
    description,
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
    sortIndex,
  } = body as {
    id: string
    name?: string
    code?: string
    category?: string
    country?: string
    description?: string
    isActive?: boolean
    requirePermitNumber?: boolean
    requireValidFrom?: boolean
    requireValidUntil?: boolean
    requireIssuingAuthority?: boolean
    requireRestrictions?: boolean
    requirePriorityCheck?: boolean
    requirePriorityCode?: boolean
    requireEmploymentDetails?: boolean
    requireDocumentUpload?: boolean
    sortIndex?: number
  }

  if (!id) {
    return NextResponse.json({ error: 'ID ist erforderlich.' }, { status: 400 })
  }

  // Ownership prüfen
  const { data: existing, error: existingError } = await supabase
    .from('residence_titles')
    .select('id')
    .eq('id', id)
    .eq('user_id', user.id)
    .maybeSingle()

  if (existingError) {
    console.error(existingError)
    return NextResponse.json({ error: existingError.message }, { status: 500 })
  }

  if (!existing) {
    return NextResponse.json({ error: 'Aufenthaltstitel nicht gefunden.' }, { status: 404 })
  }

  const updatePayload: Record<string, any> = {}

  if (typeof name === 'string') updatePayload.name = name.trim()
  if (code !== undefined) updatePayload.code = code?.trim() || null
  if (category !== undefined) updatePayload.category = category?.trim() || null
  if (country !== undefined) updatePayload.country = country?.trim() || null
  if (description !== undefined)
    updatePayload.description = description?.trim() || null
  if (typeof isActive === 'boolean') updatePayload.is_active = isActive

  if (typeof requirePermitNumber === 'boolean')
    updatePayload.require_permit_number = requirePermitNumber
  if (typeof requireValidFrom === 'boolean')
    updatePayload.require_valid_from = requireValidFrom
  if (typeof requireValidUntil === 'boolean')
    updatePayload.require_valid_until = requireValidUntil
  if (typeof requireIssuingAuthority === 'boolean')
    updatePayload.require_issuing_authority = requireIssuingAuthority
  if (typeof requireRestrictions === 'boolean')
    updatePayload.require_restrictions = requireRestrictions
  if (typeof requirePriorityCheck === 'boolean')
    updatePayload.require_priority_check = requirePriorityCheck
  if (typeof requirePriorityCode === 'boolean')
    updatePayload.require_priority_code = requirePriorityCode
  if (typeof requireEmploymentDetails === 'boolean')
    updatePayload.require_employment_details = requireEmploymentDetails
  if (typeof requireDocumentUpload === 'boolean')
    updatePayload.require_document_upload = requireDocumentUpload

  if (typeof sortIndex === 'number') updatePayload.sort_index = sortIndex

  if (Object.keys(updatePayload).length === 0) {
    return NextResponse.json({ success: true }) // nichts zu updaten
  }

  const { data, error } = await supabase
    .from('residence_titles')
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

// DELETE: Aufenthaltstitel löschen
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
    .from('residence_titles')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) {
    console.error(error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
