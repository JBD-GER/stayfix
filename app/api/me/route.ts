// app/api/me/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function GET(req: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

  const res = NextResponse.json({ ok: true, authed: false, user: null })

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return req.cookies.getAll()
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          res.cookies.set(name, value, options)
        })
      },
    },
  })

  const { data, error } = await supabase.auth.getUser()

  if (error || !data.user) {
    return res
  }

  return NextResponse.json({
    ok: true,
    authed: true,
    user: { id: data.user.id, email: data.user.email },
  })
}
