// app/(website)/components/Footer.tsx
import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-5 text-xs text-slate-500 md:flex-row md:items-center md:justify-between lg:px-6">
        {/* Logo + Text */}
        <div className="flex items-center gap-3">
          <Image
            src="/stayfix.png"
            alt="Stayfix Logo"
            width={26}
            height={26}
            className="h-7 w-auto"
          />
          <div className="flex flex-col">
            <p className="text-[13px] font-medium text-slate-700">
              Stayfix – Aufenthaltstitel &amp; Arbeitserlaubnisse im Blick
            </p>
            <p className="mt-1 text-[11px]">
              © {year} Stayfix. Fokus auf Fristen, Transparenz und HR-Compliance.
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex flex-wrap gap-3 md:justify-end text-[11px]">
          <Link href="/funktionen" className="hover:text-slate-800">
            Funktionen
          </Link>
          <Link href="/haeufige-fragen" className="hover:text-slate-800">
            Häufige Fragen
          </Link>
          <Link href="/beratung" className="hover:text-slate-800">
            Beratung
          </Link>
          <Link href="/impressum" className="hover:text-slate-800">
            Impressum
          </Link>
          <Link href="/datenschutz" className="hover:text-slate-800">
            Datenschutz
          </Link>
        </div>
      </div>
    </footer>
  )
}
