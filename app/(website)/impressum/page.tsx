// src/app/impressum/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata: Metadata = {
  title: 'Impressum – Stayfix',
  description: 'Impressum der Novax Digital GmbH (Stayfix).',
  alternates: { canonical: '/impressum' },
  robots: { index: true, follow: true },
}

const COMPANY = {
  brand: 'Stayfix',
  legal: 'Novax Digital GmbH',
  street: 'Dammstr. 6G',
  zipCity: '30890 Barsinghausen',
  phone: '05035-876470-6',
  email: 'info@stayfix.io',
  managingDirectors: 'Philipp Polley, Christoph Pfad',
  registerCourt: 'Amtsgericht Hannover',
  hbr: 'HRB 220589',
  vatId: 'DE335613731',
} as const

const ADDRESS_ONE_LINE = `${COMPANY.legal}, ${COMPANY.street}, ${COMPANY.zipCity}`

const T = {
  badge: 'Rechtliches · Impressum',
  h1: 'Impressum',
  intro: (
    <>
      Angaben gemäß <span className="font-semibold text-slate-900">§ 5 TMG</span> und{' '}
      <span className="font-semibold text-slate-900">§ 18 Abs. 2 MStV</span> für{' '}
      <span className="font-semibold text-slate-900">{COMPANY.brand}</span> ({COMPANY.legal}).
    </>
  ),
  tocTitle: 'Inhalt',
  backHome: 'Zurück zur Startseite',
  contactTitle: 'Kontakt',
  toc: [
    { id: 'headnote', t: 'Pflichtangaben' },
    { id: 'anbieter', t: '1. Anbieter & Kontakt' },
    { id: 'vertretung', t: '2. Geschäftsführer' },
    { id: 'register', t: '3. Handelsregister & Umsatzsteuer' },
  ],
  s_headnote_title: 'Pflichtangaben',
  s_headnote_list: [
    { k: 'Anbieter', v: COMPANY.legal },
    { k: 'Marke', v: COMPANY.brand },
    { k: 'Anschrift', v: `${COMPANY.street}, ${COMPANY.zipCity}` },
    { k: 'Kontakt', v: `${COMPANY.email} · ${COMPANY.phone}` },
  ],
  s_provider_title: '1. Anbieter & Kontakt',
  s_rep_title: '2. Geschäftsführer',
  s_register_title: '3. Handelsregister & Umsatzsteuer',
  labels: {
    provider: 'Anbieter',
    brand: 'Marke',
    address: 'Anschrift',
    email: 'E-Mail',
    phone: 'Telefon',
    managingDirector: 'Geschäftsführer',
    registerCourt: 'Registergericht',
    commercialRegister: 'Handelsregister',
    vatId: 'USt-IdNr.',
  },
  footerLine: `${COMPANY.legal} · ${COMPANY.zipCity}`,
} as const

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24">
      <h2 className="text-[18px] font-semibold tracking-tight text-slate-900 sm:text-[20px]">{title}</h2>
      <div className="mt-3 space-y-3 text-[13px] leading-relaxed text-slate-700 sm:text-[14px]">{children}</div>
    </section>
  )
}

function InfoRow({ k, v }: { k: string; v: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1 rounded-2xl border border-slate-900/10 bg-white/70 p-4 shadow-sm backdrop-blur sm:flex-row sm:items-start sm:justify-between sm:gap-4">
      <div className="text-[11px] font-medium text-slate-600">{k}</div>
      <div className="text-[12px] font-semibold text-slate-900 sm:text-right">{v}</div>
    </div>
  )
}

export default async function ImpressumPage() {
  return (
    <main className="relative overflow-hidden bg-white">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-slate-900/10 blur-3xl md:h-[720px] md:w-[720px]" />
        <div className="absolute -top-16 right-[-120px] h-[420px] w-[420px] rounded-full bg-slate-900/8 blur-3xl md:h-[560px] md:w-[560px]" />
        <div className="absolute inset-0 [background-image:linear-gradient(to_right,rgba(15,23,42,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.05)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_72%)]" />
      </div>

      {/* Header */}
      <header className="relative mx-auto w-full max-w-[1200px] px-4 pt-10 sm:px-6 sm:pt-12">
        <div className="inline-flex items-center gap-2 rounded-full border border-slate-900/10 bg-white/70 px-3 py-1 text-[11px] font-medium text-slate-700 shadow-sm backdrop-blur">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500/70" />
          {T.badge}
        </div>

        <h1 className="mt-4 text-[30px] font-semibold leading-[1.06] tracking-tight text-slate-900 sm:text-[40px] md:text-[46px]">
          {T.h1}
        </h1>

        <p className="mt-3 max-w-[980px] text-[14px] leading-relaxed text-slate-700 sm:text-[15px]">{T.intro}</p>
      </header>

      <div className="relative mx-auto w-full max-w-[1200px] px-4 pb-16 pt-8 sm:px-6 sm:pb-20 sm:pt-10">
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
          {/* TOC */}
          <div className="lg:col-span-4">
            <div className="sticky top-6">
              <div className="relative overflow-hidden rounded-[1.6rem] border border-slate-900/10 bg-white/70 p-5 shadow-sm backdrop-blur-xl">
                <div className="text-[12px] font-semibold text-slate-900">{T.tocTitle}</div>

                <nav className="mt-3 space-y-1.5">
                  {T.toc.map((x) => (
                    <a
                      key={x.id}
                      href={`#${x.id}`}
                      className="block rounded-xl border border-transparent px-3 py-2 text-[12px] text-slate-700 transition hover:border-slate-900/10 hover:bg-white/70"
                    >
                      {x.t}
                    </a>
                  ))}
                </nav>

                <div className="mt-4 rounded-2xl border border-slate-900/10 bg-white/70 p-4 text-[11px] leading-relaxed text-slate-700 shadow-sm">
                  <div className="font-semibold text-slate-900">{T.contactTitle}</div>
                  <div className="mt-2 space-y-1.5">
                    <div>
                      {T.labels.email}:{' '}
                      <a className="font-medium text-slate-900 underline underline-offset-2" href={`mailto:${COMPANY.email}`}>
                        {COMPANY.email}
                      </a>
                    </div>
                    <div>
                      {T.labels.phone}:{' '}
                      <a
                        className="font-medium text-slate-900 underline underline-offset-2"
                        href={`tel:${COMPANY.phone.replace(/\s/g, '')}`}
                      >
                        {COMPANY.phone}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="mt-4 text-[11px] text-slate-600">
                  {T.backHome}{' '}
                  <Link href="/" className="font-medium text-slate-900 underline underline-offset-2">
                    Startseite
                  </Link>
                </div>

                <div className="pointer-events-none absolute inset-0 rounded-[1.6rem] ring-1 ring-inset ring-white/50" />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-8">
            <div className="space-y-6">
              <div className="relative overflow-hidden rounded-[1.8rem] border border-slate-900/10 bg-white/70 p-6 shadow-[0_22px_80px_rgba(15,23,42,0.12)] backdrop-blur-xl sm:p-8">
                <div className="relative space-y-10">
                  <Section id="headnote" title={T.s_headnote_title}>
                    <div className="rounded-2xl border border-slate-900/10 bg-white/70 p-4 text-[12px] leading-relaxed text-slate-700 shadow-sm">
                      <ul className="space-y-1.5">
                        {T.s_headnote_list.map((x) => (
                          <li key={x.k}>
                            • {x.k}: <span className="font-medium text-slate-900">{x.v}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Section>

                  <Section id="anbieter" title={T.s_provider_title}>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <InfoRow k={T.labels.provider} v={COMPANY.legal} />
                      <InfoRow k={T.labels.brand} v={COMPANY.brand} />
                      <InfoRow k={T.labels.address} v={`${COMPANY.street}, ${COMPANY.zipCity}`} />
                      <InfoRow
                        k={T.labels.email}
                        v={
                          <a className="underline underline-offset-2" href={`mailto:${COMPANY.email}`}>
                            {COMPANY.email}
                          </a>
                        }
                      />
                      <InfoRow
                        k={T.labels.phone}
                        v={
                          <a className="underline underline-offset-2" href={`tel:${COMPANY.phone.replace(/\s/g, '')}`}>
                            {COMPANY.phone}
                          </a>
                        }
                      />
                    </div>
                  </Section>

                  <Section id="vertretung" title={T.s_rep_title}>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <InfoRow k={T.labels.managingDirector} v={COMPANY.managingDirectors} />
                    </div>
                  </Section>

                  <Section id="register" title={T.s_register_title}>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <InfoRow k={T.labels.registerCourt} v={COMPANY.registerCourt} />
                      <InfoRow k={T.labels.commercialRegister} v={COMPANY.hbr} />
                      <InfoRow k={T.labels.vatId} v={COMPANY.vatId} />
                    </div>
                  </Section>

                  <div className="pt-2 text-[11px] text-slate-600">{ADDRESS_ONE_LINE}</div>
                </div>

                <div className="pointer-events-none absolute inset-0 rounded-[1.8rem] ring-1 ring-inset ring-white/50" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
