'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useEffect, useMemo, useState, type ReactNode } from 'react'

type NavItem = {
  href: string
  label: string
  icon: ReactNode
  desc?: string
}

function clsx(...s: Array<string | false | null | undefined>) {
  return s.filter(Boolean).join(' ')
}

function getPageTitle(pathname: string | null) {
  const p = pathname ?? ''
  if (p === '/dashboard') return 'Übersicht'
  if (p.startsWith('/dashboard/mitarbeitende')) return 'Mitarbeitende'
  if (p.startsWith('/dashboard/aufenthaltstitel')) return 'Aufenthaltstitel'
  if (p.startsWith('/dashboard/benachrichtigung')) return 'Benachrichtigungen'
  if (p.startsWith('/dashboard/organigramm')) return 'Organigramm'
  return 'Dashboard'
}

export default function DashboardShell({
  userEmail,
  children,
}: {
  userEmail: string
  children: ReactNode
}) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const nav: NavItem[] = useMemo(
    () => [
      {
        href: '/dashboard',
        label: 'Übersicht',
        desc: 'KPIs, Status & Überblick',
        icon: (
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M4 13h7V4H4v9zM13 20h7V11h-7v9zM13 4h7v5h-7V4zM4 20h7v-5H4v5z" />
          </svg>
        ),
      },
      {
        href: '/dashboard/mitarbeitende',
        label: 'Mitarbeitende',
        desc: 'Profile & Zuordnung',
        icon: (
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M16 11a4 4 0 1 0-8 0" />
            <path d="M12 15c-4.4 0-8 2-8 4.5V21h16v-1.5C20 17 16.4 15 12 15z" />
          </svg>
        ),
      },
      {
        href: '/dashboard/aufenthaltstitel',
        label: 'Aufenthaltstitel',
        desc: 'Titel, Ablauf, Uploads',
        icon: (
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M7 7h10M7 12h10M7 17h7" />
            <path d="M6 3h12a2 2 0 0 1 2 2v16l-4-2-4 2-4-2-4 2V5a2 2 0 0 1 2-2z" />
          </svg>
        ),
      },
      {
        href: '/dashboard/benachrichtigung',
        label: 'Benachrichtigungen',
        desc: 'Reminder & Regeln',
        icon: (
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 7h18s-3 0-3-7" />
            <path d="M13.7 21a2 2 0 0 1-3.4 0" />
          </svg>
        ),
      },
      {
        href: '/dashboard/organigramm',
        label: 'Organigramm',
        desc: 'Struktur & Rollen',
        icon: (
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M12 2v6" />
            <path d="M6 8h12" />
            <path d="M6 8v6" />
            <path d="M18 8v6" />
            <path d="M4 20h6v-4H4v4z" />
            <path d="M14 20h6v-4h-6v4z" />
            <path d="M9 14h6v-4H9v4z" />
          </svg>
        ),
      },
    ],
    []
  )

  const isActive = (href: string) =>
    href === '/dashboard' ? pathname === href : pathname?.startsWith(href)

  // Drawer bei Navigation schließen
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  // Scroll lock bei Drawer open
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  const Nav = ({ compact }: { compact?: boolean }) => (
    <nav className={clsx('space-y-1', compact ? 'text-sm' : 'text-xs')}>
      {nav.map((item) => {
        const active = isActive(item.href)
        return (
          <Link
            key={item.href}
            href={item.href}
            className={clsx(
              'group flex w-full items-center gap-3 rounded-2xl border px-3 py-2 transition',
              'border-slate-900/10 bg-white/70 shadow-sm backdrop-blur hover:bg-white',
              active && 'border-slate-900/15 bg-white text-slate-900',
              !active && 'text-slate-700'
            )}
            aria-current={active ? 'page' : undefined}
          >
            <span
              className={clsx(
                'grid h-9 w-9 place-items-center rounded-xl border transition',
                'border-slate-900/10 bg-white/60',
                active ? 'text-slate-900' : 'text-slate-700 group-hover:text-slate-900'
              )}
            >
              {item.icon}
            </span>

            <div className="min-w-0">
              <p className={clsx('truncate', active ? 'font-medium' : 'font-normal')}>
                {item.label}
              </p>
              {!compact && item.desc && (
                <p className="truncate text-[11px] text-slate-500">{item.desc}</p>
              )}
            </div>
          </Link>
        )
      })}
    </nav>
  )

  const title = getPageTitle(pathname)

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Topbar (Mobile + Tablet) */}
      <header className="sticky top-0 z-40 border-b border-slate-900/10 bg-white/70 backdrop-blur lg:hidden">
        <div
          className="flex items-center justify-between gap-3 px-4 py-3"
          style={{ paddingTop: 'calc(12px + env(safe-area-inset-top))' }}
        >
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex items-center justify-center rounded-2xl border border-slate-900/10 bg-white/70 px-3 py-2 text-sm text-slate-800 shadow-sm backdrop-blur hover:bg-white"
            aria-label="Menü öffnen"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-slate-900">{title}</p>
            <p className="truncate text-[11px] text-slate-600">{userEmail}</p>
          </div>
        </div>
      </header>

      {/* Drawer (Mobile + Tablet) */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true">
          <button
            className="absolute inset-0 bg-slate-900/25 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-label="Menü schließen"
          />
          <aside className="absolute left-0 top-0 h-full w-[86%] max-w-[360px] border-r border-slate-900/10 bg-white/85 p-4 shadow-xl backdrop-blur">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative h-10 w-10 overflow-hidden rounded-2xl border border-slate-900/10 bg-white/70 shadow-sm">
                  <Image src="/stayfix.png" alt="Stayfix" fill className="object-cover" priority />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900">Stayfix</p>
                  <p className="text-[11px] text-slate-600">Navigation</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-2xl border border-slate-900/10 bg-white/70 px-3 py-2 text-sm shadow-sm backdrop-blur hover:bg-white"
                aria-label="Schließen"
              >
                ✕
              </button>
            </div>

            <Nav compact />

            <div className="mt-6 rounded-2xl border border-slate-900/10 bg-white/70 p-3 text-[11px] text-slate-600 shadow-sm backdrop-blur">
              <p className="text-slate-500">Eingeloggt als</p>
              <p className="mt-1 truncate font-medium text-slate-900">{userEmail}</p>
            </div>
          </aside>
        </div>
      )}

      <div className="flex min-h-screen w-full">
        {/* Sidebar erst ab Desktop */}
        <aside className="sticky top-0 hidden h-screen w-[320px] shrink-0 border-r border-slate-900/10 bg-white/60 p-5 backdrop-blur lg:flex lg:flex-col">
          <div className="mb-5 flex items-center gap-3">
            <div className="relative h-10 w-10 overflow-hidden rounded-2xl border border-slate-900/10 bg-white/70 shadow-sm">
              <Image src="/stayfix.png" alt="Stayfix" fill className="object-cover" priority />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-900">Stayfix</p>
              <p className="text-[11px] text-slate-600">Dashboard</p>
            </div>
          </div>

          <Nav />

          <div className="mt-auto rounded-2xl border border-slate-900/10 bg-white/70 p-3 text-[11px] text-slate-600 shadow-sm backdrop-blur">
            <p className="text-slate-500">Eingeloggt als</p>
            <p className="mt-1 truncate font-medium text-slate-900">{userEmail}</p>
          </div>
        </aside>

        {/* Content: kein zusätzliches Padding (Pages haben schon Layout) */}
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  )
}
