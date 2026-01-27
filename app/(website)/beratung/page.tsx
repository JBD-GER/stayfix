// app/beratung/page.tsx
import type { Metadata } from 'next'
import BeratungForm from './beratung-form'

export const metadata: Metadata = {
  title: 'Beratung – Stayfix',
  description:
    'Kostenlose Erstberatung zu Stayfix: Aufenthaltstitel-Management, Erinnerungen, Prozesse und Compliance – jetzt Anfrage senden.',
  alternates: { canonical: '/beratung' },
  robots: { index: true, follow: true },
}

export default function BeratungPage() {
  return (
    <main className="relative overflow-hidden bg-white">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-slate-900/10 blur-3xl md:h-[720px] md:w-[720px]" />
        <div className="absolute -top-16 right-[-120px] h-[420px] w-[420px] rounded-full bg-slate-900/8 blur-3xl md:h-[560px] md:w-[560px]" />
        <div className="absolute inset-0 [background-image:linear-gradient(to_right,rgba(15,23,42,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.05)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_72%)]" />
        <div className="absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_70%)]">
          <div className="stayfix-beratung-sheen absolute -left-1/2 top-0 h-full w-[200%]" />
        </div>
      </div>

      <header className="relative mx-auto w-full max-w-[1200px] px-4 pt-10 sm:px-6 sm:pt-12">
        <div className="inline-flex items-center gap-2 rounded-full border border-slate-900/10 bg-white/70 px-3 py-1 text-[11px] font-medium text-slate-700 shadow-sm backdrop-blur">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500/70" />
          Kostenlose Erstberatung
        </div>

        <h1 className="mt-4 text-[30px] font-semibold leading-[1.06] tracking-tight text-slate-900 sm:text-[40px] md:text-[46px]">
          Stayfix-Beratung für Unternehmen
        </h1>

        <p className="mt-3 max-w-[980px] text-[14px] leading-relaxed text-slate-700 sm:text-[15px]">
          Gemeinsam klären wir in 15–20 Minuten, wie Sie Aufenthaltstitel sauber verwalten, Abläufe automatisieren und
          Fristen zuverlässig einhalten – ohne Excel-Chaos.
        </p>
      </header>

      <div className="relative mx-auto w-full max-w-[1200px] px-4 pb-16 pt-8 sm:px-6 sm:pb-20 sm:pt-10">
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
          {/* Left content */}
          <div className="lg:col-span-6">
            <div className="relative overflow-hidden rounded-[1.8rem] border border-slate-900/10 bg-white/70 p-6 shadow-[0_22px_80px_rgba(15,23,42,0.12)] backdrop-blur-xl sm:p-8">
              <div className="pointer-events-none absolute inset-0 opacity-55">
                <div className="stayfix-beratung-card-sheen absolute -left-1/2 top-0 h-full w-[200%]" />
              </div>

              <div className="relative space-y-6">
                <section>
                  <h2 className="text-[18px] font-semibold tracking-tight text-slate-900 sm:text-[20px]">
                    Das besprechen wir
                  </h2>
                  <ul className="mt-3 space-y-2 text-[13px] leading-relaxed text-slate-700 sm:text-[14px]">
                    <li>• Status- & Dokumentenübersicht je Mitarbeitenden (Titel, Ablauf, Auflagen)</li>
                    <li>• Automatische Erinnerungen an Mitarbeitende & Vorgesetzte</li>
                    <li>• Audit-/Nachweisfähigkeit: Wer wurde wann erinnert? Was wurde hochgeladen?</li>
                    <li>• Rollen & Verantwortlichkeiten: HR, Teamlead, Mitarbeitende</li>
                    <li>• Optional: Integrationen / Export / interne Prozesse</li>
                  </ul>
                </section>

                <section className="grid gap-3 sm:grid-cols-2">
                  <InfoCard title="Dauer" value="15–20 Minuten" />
                  <InfoCard title="Kosten" value="0 € (unverbindlich)" />
                  <InfoCard title="Ergebnis" value="Konkrete Empfehlung" />
                  <InfoCard title="Nächster Schritt" value="Demo & Setup-Plan" />
                </section>

                <section className="rounded-2xl border border-slate-900/10 bg-white/70 p-4 text-[12px] leading-relaxed text-slate-700 shadow-sm">
                  <div className="font-semibold text-slate-900">Hinweis</div>
                  Wir melden uns in der Regel am selben oder nächsten Werktag. Falls es dringend ist, schreiben Sie das
                  bitte in die Nachricht.
                </section>
              </div>

              <div className="pointer-events-none absolute inset-0 rounded-[1.8rem] ring-1 ring-inset ring-white/50" />
            </div>
          </div>

          {/* Right form */}
          <div className="lg:col-span-6">
            <div className="relative overflow-hidden rounded-[1.8rem] border border-slate-900/10 bg-white/70 p-6 shadow-[0_22px_80px_rgba(15,23,42,0.12)] backdrop-blur-xl sm:p-8">
              <div className="pointer-events-none absolute inset-0 opacity-55">
                <div className="stayfix-beratung-card-sheen absolute -left-1/2 top-0 h-full w-[200%]" />
              </div>

              <div className="relative">
                <h2 className="text-[18px] font-semibold tracking-tight text-slate-900 sm:text-[20px]">
                  Anfrage senden
                </h2>
                <p className="mt-2 text-[13px] leading-relaxed text-slate-700 sm:text-[14px]">
                  Tragen Sie kurz die wichtigsten Infos ein – wir melden uns mit Terminvorschlägen.
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
            rgba(15,23,42,0.05) 35%,
            rgba(15,23,42,0.10) 50%,
            rgba(15,23,42,0.05) 65%,
            transparent 100%
          );
          transform: translateX(-35%);
          animation: beratungSheen 10s ease-in-out infinite;
          filter: blur(0.5px);
          will-change: transform, opacity;
          opacity: .45;
        }
        @keyframes beratungSheen{
          0%{ transform: translateX(-35%); opacity:0.22; }
          50%{ transform: translateX(0%); opacity:0.55; }
          100%{ transform: translateX(35%); opacity:0.22; }
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
          opacity: .35;
        }
        @keyframes beratungCardSheen{
          0%{ transform: translateX(-35%); opacity:0.16; }
          50%{ transform: translateX(0%); opacity:0.40; }
          100%{ transform: translateX(35%); opacity:0.16; }
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
    <div className="rounded-2xl border border-slate-900/10 bg-white/70 p-4 shadow-sm backdrop-blur">
      <div className="text-[11px] font-medium text-slate-600">{title}</div>
      <div className="mt-1 text-[13px] font-semibold text-slate-900">{value}</div>
    </div>
  )
}
