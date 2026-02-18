import type { Metadata } from 'next'
import BeratungForm from './beratung-form'

export const metadata: Metadata = {
  title: 'Beratung und Registrierung - Stayfix',
  description:
    'Kostenlose Erstberatung zu Stayfix inklusive Registrierung per Einladung: Prozesse, Fristen und Verantwortlichkeiten sauber aufsetzen.',
  alternates: { canonical: '/beratung' },
  robots: { index: true, follow: true },
}

const TALK_POINTS = [
  'Transparente Uebersicht je Mitarbeitenden: Titel, Fristen, Auflagen, Dokumentstatus',
  'Automatische Erinnerungen mit Eskalation an Mitarbeitende, Teamlead und HR',
  'Nachweise fuer Compliance: Wer wurde informiert, was wurde hochgeladen?',
  'Rollenlogik fuer HR, Fuehrung und Mitarbeitende',
  'Optional: Datenuebernahme, Export und interne Prozessanbindung',
]

const REGISTRATION_STEPS = [
  {
    title: 'Kurztermin',
    text: 'Wir klaeren Ihre aktuelle Situation in 15 bis 20 Minuten.',
  },
  {
    title: 'Einladung',
    text: 'Sie erhalten danach den persoenlichen Zugang fuer Ihr Team.',
  },
  {
    title: 'Onboarding',
    text: 'Gemeinsam starten wir mit den ersten Mitarbeitenden und Titeln.',
  },
]

export default function BeratungPage() {
  return (
    <main className="relative overflow-hidden bg-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-44 left-1/2 h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-slate-900/10 blur-3xl md:h-[760px] md:w-[760px]" />
        <div className="absolute -top-20 right-[-120px] h-[420px] w-[420px] rounded-full bg-[#3B5BFF]/10 blur-3xl md:h-[560px] md:w-[560px]" />
        <div className="absolute -bottom-24 left-[-90px] h-[360px] w-[360px] rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute inset-0 [background-image:linear-gradient(to_right,rgba(15,23,42,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.05)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_74%)]" />
        <div className="absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_72%)]">
          <div className="stayfix-beratung-sheen absolute -left-1/2 top-0 h-full w-[200%]" />
        </div>
      </div>

      <header className="relative mx-auto w-full max-w-[1200px] px-4 pt-10 sm:px-6 sm:pt-12">
        <div className="inline-flex items-center gap-2 rounded-full border border-slate-900/10 bg-white/75 px-3 py-1 text-[11px] font-medium text-slate-700 shadow-sm backdrop-blur">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500/70" />
          Kostenlose Erstberatung
        </div>

        <h1 className="mt-4 max-w-[980px] text-[30px] font-semibold leading-[1.06] tracking-tight text-slate-900 sm:text-[40px] md:text-[46px]">
          Beratung und Registrierung fuer Unternehmen
        </h1>

        <p className="mt-3 max-w-[980px] text-[14px] leading-relaxed text-slate-700 sm:text-[15px]">
          Wir zeigen in einem kurzen Termin, wie Sie Aufenthaltstitel strukturiert verwalten und Fristen verlässlich
          absichern. Danach erhalten Sie die persoenliche Einladung fuer Ihren Stayfix-Zugang.
        </p>
      </header>

      <div className="relative mx-auto w-full max-w-[1200px] px-4 pb-16 pt-8 sm:px-6 sm:pb-20 sm:pt-10">
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6">
            <div className="relative overflow-hidden rounded-[1.8rem] border border-slate-900/10 bg-white/75 p-6 shadow-[0_22px_80px_rgba(15,23,42,0.12)] backdrop-blur-xl sm:p-8">
              <div className="pointer-events-none absolute inset-0 opacity-55">
                <div className="stayfix-beratung-card-sheen absolute -left-1/2 top-0 h-full w-[200%]" />
              </div>

              <div className="relative space-y-6">
                <section>
                  <h2 className="text-[18px] font-semibold tracking-tight text-slate-900 sm:text-[20px]">
                    Das besprechen wir
                  </h2>
                  <ul className="mt-3 space-y-2 text-[13px] leading-relaxed text-slate-700 sm:text-[14px]">
                    {TALK_POINTS.map((point) => (
                      <li key={point} className="flex items-start gap-2">
                        <span className="mt-1.5 inline-block h-1.5 w-1.5 rounded-full bg-[#3B5BFF]" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                <section className="grid gap-3 sm:grid-cols-2">
                  <InfoCard title="Dauer" value="15 bis 20 Minuten" />
                  <InfoCard title="Kosten" value="0 EUR, unverbindlich" />
                  <InfoCard title="Ergebnis" value="Konkreter Setup-Plan" />
                  <InfoCard title="Start" value="Einladung + Onboarding" />
                </section>

                <section className="rounded-2xl border border-slate-900/10 bg-white/75 p-4 shadow-sm">
                  <p className="text-[12px] font-semibold text-slate-900">So laeuft die Registrierung</p>
                  <div className="mt-3 grid gap-2">
                    {REGISTRATION_STEPS.map((step, index) => (
                      <div key={step.title} className="rounded-xl border border-slate-900/10 bg-white/80 p-3">
                        <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
                          Schritt {index + 1}
                        </p>
                        <p className="mt-1 text-[13px] font-semibold text-slate-900">{step.title}</p>
                        <p className="mt-1 text-[12px] leading-relaxed text-slate-600">{step.text}</p>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="rounded-2xl border border-slate-900/10 bg-white/75 p-4 text-[12px] leading-relaxed text-slate-700 shadow-sm">
                  <p className="font-semibold text-slate-900">Hinweis</p>
                  Wir melden uns in der Regel am selben oder naechsten Werktag mit Terminvorschlaegen.
                </section>
              </div>

              <div className="pointer-events-none absolute inset-0 rounded-[1.8rem] ring-1 ring-inset ring-white/50" />
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative overflow-hidden rounded-[1.8rem] border border-slate-900/10 bg-white/75 p-6 shadow-[0_22px_80px_rgba(15,23,42,0.12)] backdrop-blur-xl sm:p-8">
              <div className="pointer-events-none absolute inset-0 opacity-55">
                <div className="stayfix-beratung-card-sheen absolute -left-1/2 top-0 h-full w-[200%]" />
              </div>

              <div className="relative">
                <h2 className="text-[18px] font-semibold tracking-tight text-slate-900 sm:text-[20px]">
                  Anfrage senden
                </h2>
                <p className="mt-2 text-[13px] leading-relaxed text-slate-700 sm:text-[14px]">
                  Tragen Sie die wichtigsten Infos ein. Wir melden uns mit passenden Terminen und den naechsten
                  Schritten zur Registrierung.
                </p>

                <div className="mt-5">
                  <BeratungForm />
                </div>

                <div className="mt-4 text-[11px] text-slate-600">
                  Mit dem Absenden akzeptieren Sie unsere{' '}
                  <a className="font-medium text-slate-900 underline underline-offset-2" href="/datenschutz">
                    Datenschutzhinweise
                  </a>
                  .
                </div>
              </div>

              <div className="pointer-events-none absolute inset-0 rounded-[1.8rem] ring-1 ring-inset ring-white/50" />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .stayfix-beratung-sheen{
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(15,23,42,0.04) 35%,
            rgba(15,23,42,0.10) 50%,
            rgba(15,23,42,0.04) 65%,
            transparent 100%
          );
          transform: translateX(-35%);
          animation: beratungSheen 10s ease-in-out infinite;
          filter: blur(0.5px);
          will-change: transform, opacity;
          opacity: .44;
        }
        @keyframes beratungSheen{
          0%{ transform: translateX(-35%); opacity:0.2; }
          50%{ transform: translateX(0%); opacity:0.55; }
          100%{ transform: translateX(35%); opacity:0.2; }
        }

        .stayfix-beratung-card-sheen{
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(15,23,42,0.05) 35%,
            rgba(15,23,42,0.10) 50%,
            rgba(15,23,42,0.05) 65%,
            transparent 100%
          );
          transform: translateX(-35%);
          animation: beratungCardSheen 9s ease-in-out infinite;
          filter: blur(0.5px);
          will-change: transform, opacity;
          opacity: .34;
        }
        @keyframes beratungCardSheen{
          0%{ transform: translateX(-35%); opacity:0.15; }
          50%{ transform: translateX(0%); opacity:0.4; }
          100%{ transform: translateX(35%); opacity:0.15; }
        }

        @media (prefers-reduced-motion: reduce){
          .stayfix-beratung-sheen,
          .stayfix-beratung-card-sheen{
            animation: none !important;
            transform: none !important;
          }
        }
      `}</style>
    </main>
  )
}

function InfoCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-900/10 bg-white/75 p-4 shadow-sm backdrop-blur">
      <div className="text-[11px] font-medium text-slate-600">{title}</div>
      <div className="mt-1 text-[13px] font-semibold text-slate-900">{value}</div>
    </div>
  )
}
