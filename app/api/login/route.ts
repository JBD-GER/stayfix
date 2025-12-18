// app/api/login/route.ts
import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: 'E-Mail und Passwort sind erforderlich.' },
        { status: 400 }
      )
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
      console.error('Supabase-ENV-Variablen fehlen')
      return NextResponse.json(
        { error: 'Server-Konfiguration unvollständig.' },
        { status: 500 }
      )
    }

    // Supabase-Client auf Server-Seite
    const supabase = createClient(supabaseUrl, supabaseAnonKey)

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error || !data?.session) {
      return NextResponse.json(
        { error: 'Anmeldung fehlgeschlagen. Bitte Zugangsdaten prüfen.' },
        { status: 401 }
      )
    }

    // Nur das Nötigste zurückgeben
    return NextResponse.json({
      user: {
        id: data.user?.id,
        email: data.user?.email,
      },
      access_token: data.session.access_token,
      refresh_token: data.session.refresh_token,
    })
  } catch (err) {
    console.error('[LOGIN_API_ERROR]', err)
    return NextResponse.json(
      { error: 'Unerwarteter Fehler bei der Anmeldung.' },
      { status: 500 }
    )
  }
}
