'use client'

import { useMemo, useState } from 'react'

type SubmitState = 'idle' | 'loading' | 'success' | 'error'

function cn(...c: Array<string | false | null | undefined>) {
  return c.filter(Boolean).join(' ')
}

export default function BeratungForm() {
  const [state, setState] = useState<SubmitState>('idle')
  const [error, setError] = useState<string | null>(null)

  const [company, setCompany] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [employees, setEmployees] = useState('') // z.B. "1-10"
  const [topic, setTopic] = useState('Aufenthaltstitel-Management')
  const [message, setMessage] = useState('')
  const [callback, setCallback] = useState('') // Terminwunsch
  const [privacy, setPrivacy] = useState(false)

  // Honeypot (Spam)
  const [website, setWebsite] = useState('')

  const disabled = useMemo(() => {
    if (state === 'loading') return true
    if (!company.trim()) return true
    if (!name.trim()) return true
    if (!email.trim()) return true
    if (!privacy) return true
    return false
  }, [state, company, name, email, privacy])

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    if (website.trim()) {
      // Honeypot gefüllt => still "success"
      setState('success')
      return
    }

    if (!privacy) {
      setError('Bitte bestätigen Sie die Datenschutzhinweise.')
      return
    }

    setState('loading')

    try {
      const res = await fetch('/api/beratung', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          company,
          name,
          email,
          phone,
          employees,
          topic,
          message,
          callback,
        }),
      })

      const json = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(json?.error || 'Senden fehlgeschlagen.')

      setState('success')
    } catch (err: any) {
      setState('error')
      setError(err?.message || 'Senden fehlgeschlagen.')
    }
  }

  if (state === 'success') {
    return (
      <div className="rounded-2xl border border-slate-900/10 bg-white/70 p-5 text-[13px] text-slate-700 shadow-sm backdrop-blur">
        <div className="text-[14px] font-semibold text-slate-900">Danke! ✅</div>
        <p className="mt-2 leading-relaxed">
          Ihre Anfrage ist bei uns eingegangen. Wir melden uns mit Terminvorschlägen.
        </p>
        <button
          className="mt-4 inline-flex h-11 items-center justify-center rounded-2xl border border-slate-900/10 bg-white/75 px-4 text-[12px] font-semibold text-slate-900 shadow-sm backdrop-blur transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10"
          onClick={() => {
            // reset
            setState('idle')
            setError(null)
          }}
        >
          Weitere Anfrage senden
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      {/* Honeypot */}
      <input
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        name="website"
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />

      <Field label="Unternehmen *">
        <input
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className={inputCls}
          placeholder="z. B. Muster GmbH"
          required
        />
      </Field>

      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Ansprechperson *">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputCls}
            placeholder="Vor- und Nachname"
            required
          />
        </Field>

        <Field label="E-Mail *">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputCls}
            placeholder="name@firma.de"
            type="email"
            required
          />
        </Field>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Telefon (optional)">
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={inputCls}
            placeholder="+49 …"
          />
        </Field>

        <Field label="Mitarbeitende (optional)">
          <select value={employees} onChange={(e) => setEmployees(e.target.value)} className={inputCls}>
            <option value="">Bitte wählen</option>
            <option value="1-10">1–10</option>
            <option value="11-50">11–50</option>
            <option value="51-200">51–200</option>
            <option value="200+">200+</option>
          </select>
        </Field>
      </div>

      <Field label="Thema">
        <select value={topic} onChange={(e) => setTopic(e.target.value)} className={inputCls}>
          <option>Aufenthaltstitel-Management</option>
          <option>Erinnerungen & Eskalationen</option>
          <option>Dokumente & Nachweise</option>
          <option>Rollen & Prozesse (HR/Lead/Mitarbeitende)</option>
          <option>Integrationen / Export</option>
        </select>
      </Field>

      <Field label="Nachricht (optional)">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={cn(inputCls, 'min-h-[110px] resize-y')}
          placeholder="Kurz beschreiben: aktueller Prozess, Anzahl Fälle, Ziel …"
        />
      </Field>

      <Field label="Wunschtermin (optional)">
        <input
          value={callback}
          onChange={(e) => setCallback(e.target.value)}
          className={inputCls}
          placeholder="z. B. Dienstag 10–12 Uhr oder „rückruf ab 15 Uhr“"
        />
      </Field>

      <label className="flex items-start gap-2 rounded-2xl border border-slate-900/10 bg-white/70 p-3 text-[12px] text-slate-700 shadow-sm backdrop-blur">
        <input
          type="checkbox"
          checked={privacy}
          onChange={(e) => setPrivacy(e.target.checked)}
          className="mt-0.5 h-4 w-4 rounded border-slate-900/20"
          required
        />
        <span>
          Ich habe die{' '}
          <a className="font-medium text-slate-900 underline underline-offset-2" href="/datenschutz" target="_blank">
            Datenschutzhinweise
          </a>{' '}
          gelesen und bin mit der Verarbeitung meiner Angaben zur Kontaktaufnahme einverstanden. *
        </span>
      </label>

      {error ? (
        <div className="rounded-2xl border border-rose-500/20 bg-white/70 p-3 text-[12px] text-rose-700 shadow-sm backdrop-blur">
          {error}
        </div>
      ) : null}

      <button
        type="submit"
        disabled={disabled}
        className={cn(
          'inline-flex h-12 w-full items-center justify-center rounded-2xl px-6 text-sm font-semibold transition',
          'bg-slate-900 text-white shadow-[0_18px_55px_rgba(15,23,42,0.22)] hover:translate-y-[-1px] hover:bg-slate-800',
          'focus:outline-none focus:ring-2 focus:ring-slate-900/20',
          disabled && 'cursor-not-allowed opacity-60 hover:translate-y-0'
        )}
      >
        {state === 'loading' ? 'Senden…' : 'Beratung anfragen'}
      </button>

      <div className="text-[11px] text-slate-600">
        Antwortzeit: in der Regel innerhalb von 24h an Werktagen.
      </div>
    </form>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <div className="text-[11px] font-medium text-slate-600">{label}</div>
      {children}
    </div>
  )
}

const inputCls =
  'w-full rounded-2xl border border-slate-900/10 bg-white/80 px-3 py-2.5 text-[13px] text-slate-900 shadow-sm backdrop-blur outline-none transition ' +
  'placeholder:text-slate-400 focus:border-slate-900/20 focus:ring-2 focus:ring-slate-900/10'
