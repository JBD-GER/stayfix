// app/(website)/components/Header.tsx
'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import Image from 'next/image'

const navItems = [
  { href: '/funktionen', label: 'Funktionen' },
  { href: '/ablauf', label: 'Ablauf' },
  { href: '/haeufige-fragen', label: 'Häufige Fragen' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const [authLoading, setAuthLoading] = useState(true)
  const [isAuthed, setIsAuthed] = useState(false)

  useEffect(() => {
    let alive = true

    async function load() {
      setAuthLoading(true)
      try {
        const r = await fetch('/api/me', { cache: 'no-store' })
        const j = await r.json()
        if (!alive) return
        setIsAuthed(!!j?.authed)
      } catch {
        if (!alive) return
        setIsAuthed(false)
      } finally {
        if (!alive) return
        setAuthLoading(false)
      }
    }

    load()
    return () => {
      alive = false
    }
  }, [])

  const loginHref = isAuthed ? '/dashboard' : '/login'
  const loginLabel = isAuthed ? 'Dashboard' : 'Login'

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur-2xl">
      <div className="px-4 py-3 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          {/* Logo + Brand (linkt auf die Startseite) */}
          <Link href="/" className="group flex items-center gap-2">
            <Image
              src="/stayfix.png"
              alt="Stayfix Logo"
              width={32}
              height={32}
              className="h-8 w-auto"
              priority
            />
            <div className="flex flex-col">
              <span className="text-sm font-semibold tracking-tight text-slate-900">
                Stayfix
              </span>
              <span className="text-[11px] leading-none text-slate-500">
                Aufenthaltstitel &amp; Arbeitserlaubnisse im Blick
              </span>
            </div>
          </Link>

          {/* Desktop-Navigation */}
          <nav className="hidden items-center gap-6 text-sm md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-slate-600 transition-colors hover:text-slate-900"
              >
                {item.label}
              </Link>
            ))}

            {/* ✅ Login/Dashboard Button */}
            <Link
              href={loginHref}
              className={[
                'inline-flex items-center justify-center rounded-full border px-4 py-1.5 text-xs font-medium transition-colors',
                'border-slate-200 bg-white text-slate-800 hover:bg-slate-50 hover:text-slate-900',
                authLoading ? 'pointer-events-none opacity-60' : '',
              ].join(' ')}
            >
              {authLoading ? '…' : loginLabel}
            </Link>

            <Link
              href="/beratung"
              className="inline-flex items-center justify-center rounded-full border border-[#3B5BFF] px-4 py-1.5 text-xs font-medium text-[#3B5BFF] transition-colors hover:bg-[#3B5BFF] hover:text-white"
            >
              Beratung buchen
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Navigation umschalten"
          >
            <div className="space-y-1.5">
              <span className="block h-0.5 w-4 rounded-full bg-slate-900" />
              <span className="block h-0.5 w-3 rounded-full bg-slate-500" />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {open && (
        <div className="border-t border-slate-200 bg-white/95 backdrop-blur-2xl md:hidden">
          <div className="px-4 pb-4 pt-3 sm:px-6 lg:px-8">
            <nav className="mx-auto flex max-w-6xl flex-col gap-2 text-sm text-slate-700">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-2 hover:bg-slate-50"
                >
                  {item.label}
                </Link>
              ))}

              <Link
                href={loginHref}
                onClick={() => setOpen(false)}
                className={[
                  'mt-1 inline-flex items-center justify-center rounded-full border px-4 py-2 text-xs font-medium transition-colors',
                  'border-slate-200 bg-white text-slate-800 hover:bg-slate-50 hover:text-slate-900',
                  authLoading ? 'pointer-events-none opacity-60' : '',
                ].join(' ')}
              >
                {authLoading ? '…' : loginLabel}
              </Link>

              <Link
                href="/beratung"
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex items-center justify-center rounded-full border border-[#3B5BFF] px-4 py-2 text-xs font-medium text-[#3B5BFF] hover:bg-[#3B5BFF] hover:text-white"
              >
                Beratung buchen
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
