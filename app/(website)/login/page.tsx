import type { Metadata } from 'next'
import Link from 'next/link'
import LoginForm from './LoginForm'

export const metadata: Metadata = {
  title: 'Login - Stayfix',
  description:
    'Melden Sie sich bei Stayfix an, um Aufenthaltstitel, Fristen und Verantwortlichkeiten zentral zu steuern.',
}

const BENEFITS = [
  {
    title: 'Fristen aktiv steuern',
    text: 'Ablaufdaten, Status und kritische Faelle sind sofort sichtbar.',
  },
  {
    title: 'Erinnerungen automatisieren',
    text: 'Mitarbeitende, Teamleads und HR werden regelbasiert informiert.',
  },
  {
    title: 'Nachweise behalten',
    text: 'Aenderungen und Benachrichtigungen bleiben nachvollziehbar dokumentiert.',
  },
]

export default function LoginPage() {
  return (
    <main className="relative overflow-hidden bg-white">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-slate-900/8 blur-3xl md:h-[760px] md:w-[760px]" />
        <div className="absolute -right-28 top-8 h-[420px] w-[420px] rounded-full bg-[#3B5BFF]/12 blur-3xl" />
        <div className="absolute -left-16 bottom-0 h-[320px] w-[320px] rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute inset-0 [background-image:linear-gradient(to_right,rgba(15,23,42,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.05)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_38%,transparent_72%)]" />
      </div>

      <div className="relative mx-auto flex max-w-6xl flex-col items-center px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
        <section className="w-full max-w-5xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-900/10 bg-white/75 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-slate-700 shadow-sm backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-[#3B5BFF]" />
            Login
          </span>

          <h1 className="mx-auto mt-4 max-w-2xl text-[30px] font-semibold leading-[1.08] tracking-tight text-slate-900 sm:text-[38px] md:text-[44px]">
            Zugang zum Stayfix Dashboard fuer Ihr Team.
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-[14px] leading-relaxed text-slate-700 sm:text-[15px]">
            Melden Sie sich mit Ihrem Konto an, verwalten Sie Aufenthaltstitel zentral und halten Sie Fristen, Rollen
            und Nachweise dauerhaft im Griff.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {BENEFITS.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-slate-900/10 bg-white/75 p-4 text-left shadow-sm backdrop-blur"
              >
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#3B5BFF]/12">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#3B5BFF]" />
                  </span>
                  <h2 className="text-[12px] font-semibold text-slate-900">{item.title}</h2>
                </div>
                <p className="mt-2 text-[12px] leading-relaxed text-slate-600">{item.text}</p>
              </article>
            ))}
          </div>

          <div className="mx-auto mt-5 max-w-5xl rounded-2xl border border-slate-900/10 bg-white/80 p-4 text-left shadow-sm backdrop-blur">
            <p className="text-[12px] font-semibold text-slate-900">Noch kein Zugang?</p>
            <p className="mt-1 text-[12px] leading-relaxed text-slate-600">
              Die Registrierung laeuft bei Stayfix per persoenlicher Einladung nach einem kurzen Beratungsgespraech.
            </p>
            <Link
              href="/beratung"
              className="mt-3 inline-flex items-center rounded-full border border-[#3B5BFF]/25 bg-[#3B5BFF]/10 px-3 py-1.5 text-[11px] font-medium text-[#2F49CC] transition hover:bg-[#3B5BFF]/15"
            >
              Registrierung starten
            </Link>
          </div>
        </section>

        <section className="relative mt-8 w-full max-w-md">
          <div className="pointer-events-none absolute -inset-3 rounded-[30px] bg-gradient-to-br from-[#3B5BFF]/18 via-white/30 to-emerald-400/12 blur-xl" />
          <div className="relative">
            <LoginForm />
          </div>
        </section>
      </div>
    </main>
  )
}
