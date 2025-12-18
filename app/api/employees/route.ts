import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'

type SupabaseCookie = { name: string; value: string; options: any }

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

type EmployeeStatus = 'active' | 'inactive' | 'open'

export async function GET() {
  const supabase = await getSupabaseServerClient()
  const { data: { user }, error: userError } = await supabase.auth.getUser()

  if (userError || !user) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

  const { data, error } = await supabase
    .from('employees')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: true })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json(data ?? [])
}

export async function POST(request: Request) {
  const supabase = await getSupabaseServerClient()
  const { data: { user }, error: userError } = await supabase.auth.getUser()

  if (userError || !user) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

  const body = await request.json().catch(() => ({}))

  const {
    firstName,
    lastName,
    birthdate,
    street,
    houseNumber,
    postalCode,
    city,
    email,
    phone,
    employeeNumber,
    nationality,
    orgUnitId,
    residenceTitleId,
    notificationRuleId, // ✅ RULE
    status,
    permitNumber,
    validFrom,
    validUntil,
    issuingAuthority,
    restrictions,
    priorityCheck,
    priorityCode,
    employmentDetails,
    documentUrls,
    note,
  } = body as any

  if (!String(firstName ?? '').trim() || !String(lastName ?? '').trim() || !birthdate) {
    return NextResponse.json(
      { error: 'Vorname, Nachname und Geburtsdatum sind Pflichtfelder.' },
      { status: 400 }
    )
  }

  // Ownership check für Rule (wenn gesetzt)
  if (notificationRuleId) {
    const { data: rule, error: rErr } = await supabase
      .from('notification_rules')
      .select('id')
      .eq('id', notificationRuleId)
      .eq('user_id', user.id)
      .maybeSingle()

    if (rErr) return NextResponse.json({ error: rErr.message }, { status: 500 })
    if (!rule) {
      return NextResponse.json(
        { error: 'Benachrichtigungsregel nicht gefunden oder nicht erlaubt.' },
        { status: 400 }
      )
    }
  }

  let finalStatus: EmployeeStatus = (status as EmployeeStatus) ?? 'active'
  if (!residenceTitleId && finalStatus === 'active') finalStatus = 'open'

  const { data, error } = await supabase
    .from('employees')
    .insert({
      user_id: user.id,
      status: finalStatus,
      first_name: String(firstName).trim(),
      last_name: String(lastName).trim(),
      birthdate,

      street: String(street ?? '').trim() || null,
      house_number: String(houseNumber ?? '').trim() || null,
      postal_code: String(postalCode ?? '').trim() || null,
      city: String(city ?? '').trim() || null,

      email: String(email ?? '').trim() || null,
      phone: String(phone ?? '').trim() || null,
      employee_number: String(employeeNumber ?? '').trim() || null,
      nationality: String(nationality ?? '').trim() || null,

      org_unit_id: orgUnitId || null,
      residence_title_id: residenceTitleId || null,

      notification_rule_id: notificationRuleId || null, // ✅ RULE

      permit_number: String(permitNumber ?? '').trim() || null,
      valid_from: validFrom || null,
      valid_until: validUntil || null,
      issuing_authority: String(issuingAuthority ?? '').trim() || null,
      restrictions: String(restrictions ?? '').trim() || null,

      priority_check: typeof priorityCheck === 'boolean' ? priorityCheck : null,
      priority_code: String(priorityCode ?? '').trim() || null,
      employment_details: String(employmentDetails ?? '').trim() || null,

      document_urls: Array.isArray(documentUrls) ? documentUrls : undefined,
      note: String(note ?? '').trim() || null,
    })
    .select('*')
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json(data, { status: 201 })
}

export async function PATCH(request: Request) {
  const supabase = await getSupabaseServerClient()
  const { data: { user }, error: userError } = await supabase.auth.getUser()

  if (userError || !user) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

  const body = await request.json().catch(() => ({}))

  const {
    id,
    firstName,
    lastName,
    birthdate,
    street,
    houseNumber,
    postalCode,
    city,
    email,
    phone,
    employeeNumber,
    nationality,
    orgUnitId,
    residenceTitleId,
    notificationRuleId, // ✅ RULE
    status,
    permitNumber,
    validFrom,
    validUntil,
    issuingAuthority,
    restrictions,
    priorityCheck,
    priorityCode,
    employmentDetails,
    documentUrls,
    note,
  } = body as any

  if (!id) return NextResponse.json({ error: 'ID ist erforderlich.' }, { status: 400 })

  const { data: existing, error: existingError } = await supabase
    .from('employees')
    .select('id, status, residence_title_id, notification_rule_id')
    .eq('id', id)
    .eq('user_id', user.id)
    .maybeSingle()

  if (existingError) return NextResponse.json({ error: existingError.message }, { status: 500 })
  if (!existing) return NextResponse.json({ error: 'Mitarbeitende/r nicht gefunden.' }, { status: 404 })

  // Ownership check für Rule (wenn gesetzt/neu übergeben)
  if (notificationRuleId !== undefined && notificationRuleId) {
    const { data: rule, error: rErr } = await supabase
      .from('notification_rules')
      .select('id')
      .eq('id', notificationRuleId)
      .eq('user_id', user.id)
      .maybeSingle()

    if (rErr) return NextResponse.json({ error: rErr.message }, { status: 500 })
    if (!rule) {
      return NextResponse.json(
        { error: 'Benachrichtigungsregel nicht gefunden oder nicht erlaubt.' },
        { status: 400 }
      )
    }
  }

  const updatePayload: Record<string, any> = {}

  if (typeof firstName === 'string') updatePayload.first_name = firstName.trim()
  if (typeof lastName === 'string') updatePayload.last_name = lastName.trim()
  if (typeof birthdate === 'string') updatePayload.birthdate = birthdate

  if (street !== undefined) updatePayload.street = String(street ?? '').trim() || null
  if (houseNumber !== undefined) updatePayload.house_number = String(houseNumber ?? '').trim() || null
  if (postalCode !== undefined) updatePayload.postal_code = String(postalCode ?? '').trim() || null
  if (city !== undefined) updatePayload.city = String(city ?? '').trim() || null

  if (email !== undefined) updatePayload.email = String(email ?? '').trim() || null
  if (phone !== undefined) updatePayload.phone = String(phone ?? '').trim() || null
  if (employeeNumber !== undefined) updatePayload.employee_number = String(employeeNumber ?? '').trim() || null
  if (nationality !== undefined) updatePayload.nationality = String(nationality ?? '').trim() || null

  if (orgUnitId !== undefined) updatePayload.org_unit_id = orgUnitId || null
  if (residenceTitleId !== undefined) updatePayload.residence_title_id = residenceTitleId || null

  // ✅ RULE speichern/entfernen
  if (notificationRuleId !== undefined) {
    updatePayload.notification_rule_id = notificationRuleId || null
  }

  if (permitNumber !== undefined) updatePayload.permit_number = String(permitNumber ?? '').trim() || null
  if (validFrom !== undefined) updatePayload.valid_from = validFrom || null
  if (validUntil !== undefined) updatePayload.valid_until = validUntil || null
  if (issuingAuthority !== undefined) updatePayload.issuing_authority = String(issuingAuthority ?? '').trim() || null
  if (restrictions !== undefined) updatePayload.restrictions = String(restrictions ?? '').trim() || null
  if (priorityCheck !== undefined) updatePayload.priority_check = priorityCheck
  if (priorityCode !== undefined) updatePayload.priority_code = String(priorityCode ?? '').trim() || null
  if (employmentDetails !== undefined) updatePayload.employment_details = String(employmentDetails ?? '').trim() || null

  if (Array.isArray(documentUrls)) updatePayload.document_urls = documentUrls
  if (note !== undefined) updatePayload.note = String(note ?? '').trim() || null

  // Status-Logik
  if (status) {
    updatePayload.status = status
  } else if (residenceTitleId !== undefined) {
    const newResidenceTitleId = residenceTitleId
    const currentStatus = existing.status as EmployeeStatus

    if (!newResidenceTitleId && currentStatus !== 'inactive') updatePayload.status = 'open'
    else if (newResidenceTitleId && currentStatus === 'open') updatePayload.status = 'active'
  }

  if (Object.keys(updatePayload).length === 0) {
    return NextResponse.json({ success: true })
  }

  const { data, error } = await supabase
    .from('employees')
    .update(updatePayload)
    .eq('id', id)
    .eq('user_id', user.id)
    .select('*')
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json(data)
}

export async function DELETE(request: Request) {
  const supabase = await getSupabaseServerClient()
  const { data: { user }, error: userError } = await supabase.auth.getUser()

  if (userError || !user) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

  const body = await request.json().catch(() => ({}))
  const { id } = body as { id: string }

  if (!id) return NextResponse.json({ error: 'ID ist erforderlich.' }, { status: 400 })

  const { error } = await supabase.from('employees').delete().eq('id', id).eq('user_id', user.id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ success: true })
}
