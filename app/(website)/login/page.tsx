// app/(website)/login/page.tsx
import type { Metadata } from 'next'
import LoginForm from './LoginForm'

export const metadata: Metadata = {
  title: 'Login – Stayfix',
  description:
    'Melden Sie sich bei Stayfix an, um Aufenthaltstitel und Arbeitserlaubnisse zu verwalten.',
}

export default function LoginPage() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-6xl items-center justify-center px-4 py-12 lg:px-6">
      <div className="grid w-full gap-10 md:grid-cols-[1.1fr,1fr] md:items-center">
        {/* Linke Seite: Intro */}
        <div>
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-50 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-emerald-700">
            Login · Stayfix
          </p>
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
            Anmelden und Aufenthaltstitel im Blick behalten.
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-600 md:text-base">
            Melden Sie sich mit Ihrem Stayfix-Konto an, um Mitarbeitende zu verwalten,
            Aufenthaltstitel zu hinterlegen und automatische E-Mail-Erinnerungen zu nutzen.
          </p>
          <p className="mt-3 text-xs text-slate-500">
            Sie haben noch keinen Zugang?{' '}
            <span className="font-medium text-slate-800">
              Buchen Sie zunächst ein Beratungsgespräch – danach erhalten Sie Ihre persönliche
              Einladung.
            </span>
          </p>
        </div>

        {/* Rechte Seite: Auth UI */}
        <LoginForm />
      </div>
    </main>
  )
}
