'use client'

import Link from 'next/link'
import { useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { EnvelopeIcon, EyeIcon, EyeSlashIcon, LockClosedIcon } from '@heroicons/react/24/outline'

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ')
}

export default function LoginForm() {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setError(data?.error ?? 'Anmeldung fehlgeschlagen. Bitte Zugangsdaten pruefen.')
        setLoading(false)
        return
      }

      router.refresh()
      router.push('/dashboard')
    } catch (err) {
      console.error(err)
      setError('Es ist ein technischer Fehler aufgetreten. Bitte versuchen Sie es erneut.')
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md rounded-[1.7rem] border border-slate-900/10 bg-white/80 p-6 shadow-[0_22px_70px_rgba(15,23,42,0.16)] backdrop-blur-xl sm:p-7">
      <div className="mb-6 space-y-3">
        <div className="flex items-center justify-between gap-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-900/10 bg-white/75 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-slate-700">
            <span className="h-1.5 w-1.5 rounded-full bg-[#3B5BFF]" />
            Stayfix Login
          </span>
          <span className="rounded-full border border-emerald-500/20 bg-emerald-50 px-2.5 py-1 text-[10px] font-medium text-emerald-700">
            Sicherer Zugang
          </span>
        </div>

        <div>
          <h2 className="text-[22px] font-semibold tracking-tight text-slate-900">Anmelden</h2>
          <p className="mt-1 text-[13px] leading-relaxed text-slate-600">
            Nutzen Sie Ihre Einladung, um Fristen, Dokumente und Verantwortlichkeiten zentral zu steuern.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label htmlFor="email" className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-600">
            E-Mail-Adresse
          </label>
          <div className="relative">
            <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
              <EnvelopeIcon className="h-4 w-4 text-slate-400" />
            </span>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-2xl border border-slate-200/90 bg-white px-10 py-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-[#3B5BFF] focus:ring-2 focus:ring-[#3B5BFF]/20"
              placeholder="name@unternehmen.de"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="password" className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-600">
            Passwort
          </label>
          <div className="relative">
            <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
              <LockClosedIcon className="h-4 w-4 text-slate-400" />
            </span>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-2xl border border-slate-200/90 bg-white px-10 py-3 pr-11 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-[#3B5BFF] focus:ring-2 focus:ring-[#3B5BFF]/20"
              placeholder="Ihr Passwort"
            />
            <button
              type="button"
              onClick={() => setShowPassword((value) => !value)}
              className="absolute inset-y-0 right-3 flex items-center text-slate-400 transition hover:text-slate-600"
              aria-label={showPassword ? 'Passwort verbergen' : 'Passwort anzeigen'}
            >
              {showPassword ? <EyeSlashIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
            </button>
          </div>
          <p className="text-[11px] text-slate-500">Passwoerter werden nicht im Browser gespeichert.</p>
        </div>

        {error && (
          <div className="rounded-2xl border border-rose-200 bg-rose-50/90 px-3 py-2.5">
            <p className="text-[12px] leading-relaxed text-rose-700">{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className={cn(
            'flex h-11 w-full items-center justify-center gap-2 rounded-2xl bg-[#3B5BFF] px-4 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(59,91,255,0.36)] transition',
            'hover:-translate-y-[1px] hover:bg-[#3049D9] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0'
          )}
        >
          {loading ? <span className="h-3.5 w-3.5 animate-spin rounded-full border border-white/70 border-b-transparent" /> : null}
          {loading ? 'Anmeldung laeuft ...' : 'Jetzt anmelden'}
        </button>

        <div className="grid gap-2 sm:grid-cols-2">
          <Link
            href="/passwort-zuruecksetzen"
            className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-3 py-2 text-[11px] font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
          >
            Passwort vergessen?
          </Link>
          <Link
            href="/beratung"
            className="inline-flex items-center justify-center rounded-xl border border-[#3B5BFF]/25 bg-[#3B5BFF]/10 px-3 py-2 text-[11px] font-medium text-[#2F49CC] transition hover:bg-[#3B5BFF]/15"
          >
            Registrierung starten
          </Link>
        </div>
      </form>

      <p className="mt-4 text-[11px] leading-relaxed text-slate-500">
        Mit der Anmeldung akzeptieren Sie die in Stayfix hinterlegten Datenschutz- und Nutzungsbedingungen.
      </p>
    </div>
  )
}
