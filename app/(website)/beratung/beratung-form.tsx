'use client'

import { useMemo, useState } from 'react'

type SubmitState = 'idle' | 'loading' | 'success' | 'error'

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ')
}

const inputCls =
  'w-full rounded-2xl border border-slate-900/10 bg-white/85 px-3 py-2.5 text-[13px] text-slate-900 shadow-sm outline-none transition ' +
  'placeholder:text-slate-400 focus:border-[#3B5BFF]/35 focus:ring-2 focus:ring-[#3B5BFF]/15'

export default function BeratungForm() {
  const [state, setState] = useState<SubmitState>('idle')
  const [error, setError] = useState<string | null>(null)

  const [company, setCompany] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [employees, setEmployees] = useState('')
  const [topic, setTopic] = useState('Aufenthaltstitel-Management')
  const [message, setMessage] = useState('')
  const [callback, setCallback] = useState('')
  const [privacy, setPrivacy] = useState(false)

  const [website, setWebsite] = useState('')

  const disabled = useMemo(() => {
    if (state === 'loading') return true
    if (!company.trim()) return true
    if (!name.trim()) return true
    if (!email.trim()) return true
    if (!privacy) return true
    return false
  }, [state, company, name, email, privacy])

  function resetForm() {
    setCompany('')
    setName('')
    setEmail('')
    setPhone('')
    setEmployees('')
    setTopic('Aufenthaltstitel-Management')
    setMessage('')
    setCallback('')
    setPrivacy(false)
    setWebsite('')
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    if (website.trim()) {
      setState('success')
      return
    }

    if (!privacy) {
      setError('Bitte bestaetigen Sie die Datenschutzhinweise.')
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
      <div className="rounded-2xl border border-emerald-500/20 bg-emerald-50/70 p-5 shadow-sm">
        <p className="text-[14px] font-semibold text-emerald-900">Danke! Anfrage erfolgreich gesendet.</p>
        <p className="mt-2 text-[13px] leading-relaxed text-emerald-900/80">
          Wir melden uns mit Terminvorschlaegen und den naechsten Schritten fuer Ihre Registrierung.
        </p>
        <button
          className="mt-4 inline-flex h-10 items-center justify-center rounded-xl border border-emerald-700/20 bg-white/80 px-4 text-[12px] font-semibold text-emerald-900 transition hover:bg-white"
          onClick={() => {
            resetForm()
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
      <input
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        name="website"
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />

      <div className="rounded-2xl border border-slate-900/10 bg-white/75 p-3 text-[12px] text-slate-700 shadow-sm">
        Die Registrierung erfolgt nach dem Termin per persoenlicher Einladung.
      </div>

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
            placeholder="+49 ..."
            type="tel"
          />
        </Field>

        <Field label="Mitarbeitende (optional)">
          <select value={employees} onChange={(e) => setEmployees(e.target.value)} className={inputCls}>
            <option value="">Bitte waehlen</option>
            <option value="1-10">1-10</option>
            <option value="11-50">11-50</option>
            <option value="51-200">51-200</option>
            <option value="200+">200+</option>
          </select>
        </Field>
      </div>

      <Field label="Thema">
        <select value={topic} onChange={(e) => setTopic(e.target.value)} className={inputCls}>
          <option>Aufenthaltstitel-Management</option>
          <option>Erinnerungen und Eskalationen</option>
          <option>Dokumente und Nachweise</option>
          <option>Rollen und Prozesse (HR/Lead/Mitarbeitende)</option>
          <option>Integrationen / Export</option>
        </select>
      </Field>

      <Field label="Nachricht (optional)">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={cn(inputCls, 'min-h-[110px] resize-y')}
          placeholder="Kurz beschreiben: aktueller Prozess, Anzahl Faelle, Ziel ..."
        />
      </Field>

      <Field label="Wunschtermin (optional)">
        <input
          value={callback}
          onChange={(e) => setCallback(e.target.value)}
          className={inputCls}
          placeholder="z. B. Dienstag 10-12 Uhr"
        />
      </Field>

      <label className="flex items-start gap-2 rounded-2xl border border-slate-900/10 bg-white/75 p-3 text-[12px] text-slate-700 shadow-sm">
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
          gelesen und stimme der Verarbeitung meiner Angaben zur Kontaktaufnahme zu. *
        </span>
      </label>

      {error ? (
        <div className="rounded-2xl border border-rose-500/20 bg-rose-50/70 p-3 text-[12px] text-rose-700 shadow-sm">
          {error}
        </div>
      ) : null}

      <button
        type="submit"
        disabled={disabled}
        className={cn(
          'inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl px-6 text-sm font-semibold transition',
          'bg-[#3B5BFF] text-white shadow-[0_16px_45px_rgba(59,91,255,0.34)] hover:-translate-y-[1px] hover:bg-[#3049D9]',
          'focus:outline-none focus:ring-2 focus:ring-[#3B5BFF]/30',
          disabled && 'cursor-not-allowed opacity-60 hover:translate-y-0'
        )}
      >
        {state === 'loading' ? <span className="h-3.5 w-3.5 animate-spin rounded-full border border-white/70 border-b-transparent" /> : null}
        {state === 'loading' ? 'Senden ...' : 'Beratung anfragen'}
      </button>

      <div className="text-[11px] text-slate-600">Antwortzeit: in der Regel innerhalb von 24h an Werktagen.</div>
    </form>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <div className="text-[11px] font-medium uppercase tracking-[0.12em] text-slate-600">{label}</div>
      {children}
    </div>
  )
}
