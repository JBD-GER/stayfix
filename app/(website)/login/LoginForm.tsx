'use client'

import { useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import {
  EnvelopeIcon,
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
} from '@heroicons/react/24/outline'

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
        setError(
          data?.error ??
            'Anmeldung fehlgeschlagen. Bitte Zugangsdaten prüfen.'
        )
        setLoading(false)
        return
      }

      // Erfolg -> Dashboard
      router.refresh()
router.push('/dashboard')
    } catch (err) {
      console.error(err)
      setError(
        'Es ist ein technischer Fehler aufgetreten. Bitte versuchen Sie es erneut.'
      )
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md rounded-3xl border border-slate-200/80 bg-white/80 p-6 shadow-[0_18px_45px_rgba(15,23,42,0.16)] backdrop-blur-xl sm:p-7">
      {/* Mini-Header im Formular */}
      <div className="mb-5 space-y-2">
        <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-emerald-700">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Login · Stayfix
        </span>
        <p className="text-sm font-semibold text-slate-900">
          In Stayfix anmelden und Aufenthaltstitel im Blick behalten.
        </p>
        <p className="text-xs text-slate-500">
          Nutzen Sie Ihre persönliche Einladung, um Mitarbeitende und Aufenthaltstitel zu
          verwalten.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* E-Mail */}
        <div className="space-y-1.5">
          <label
            htmlFor="email"
            className="text-xs font-medium uppercase tracking-[0.16em] text-slate-600"
          >
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
              className="w-full rounded-full border border-slate-200 bg-white px-9 py-2.5 text-sm text-slate-900 shadow-sm outline-none placeholder:text-slate-400 focus:border-[#3B5BFF] focus:ring-2 focus:ring-[#3B5BFF]/20"
              placeholder="Ihre E-Mail-Adresse"
            />
          </div>
        </div>

        {/* Passwort */}
        <div className="space-y-1.5">
          <label
            htmlFor="password"
            className="text-xs font-medium uppercase tracking-[0.16em] text-slate-600"
          >
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
              className="w-full rounded-full border border-slate-200 bg-white px-9 pr-11 py-2.5 text-sm text-slate-900 shadow-sm outline-none placeholder:text-slate-400 focus:border-[#3B5BFF] focus:ring-2 focus:ring-[#3B5BFF]/20"
              placeholder="Ihr Passwort"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute inset-y-0 right-3 flex items-center text-slate-400 hover:text-slate-600"
              aria-label={showPassword ? 'Passwort verbergen' : 'Passwort anzeigen'}
            >
              {showPassword ? (
                <EyeSlashIcon className="h-4 w-4" />
              ) : (
                <EyeIcon className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        {/* Fehlerhinweis */}
        {error && (
          <div className="flex items-center gap-2 rounded-2xl border border-rose-200 bg-rose-50 px-3 py-2">
            <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
            <p className="text-[11px] text-rose-700">{error}</p>
          </div>
        )}

        {/* Button & Links */}
        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-[#3B5BFF] px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-[#3049D9] hover:shadow-md disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading && (
            <span className="h-3 w-3 animate-spin rounded-full border border-white/70 border-b-transparent" />
          )}
          {loading ? 'Anmeldung läuft …' : 'Anmelden'}
        </button>

        <div className="mt-1 flex items-center justify-between text-[11px] text-slate-500">
          <a
            href="/passwort-zuruecksetzen"
            className="font-medium text-[#3B5BFF] hover:text-[#3049D9]"
          >
            Passwort vergessen?
          </a>
          <span>
            Kein Zugang?{' '}
            <a
              href="/beratung"
              className="font-medium text-[#3B5BFF] hover:text-[#3049D9]"
            >
              Beratung buchen
            </a>
          </span>
        </div>
      </form>

      <p className="mt-4 text-[11px] text-slate-500">
        Mit der Anmeldung akzeptieren Sie die in Stayfix hinterlegten Datenschutz- und
        Nutzungsbedingungen.
      </p>
    </div>
  )
}
