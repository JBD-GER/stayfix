// app/layout.tsx
import './globals.css'
import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Inter } from 'next/font/google'

export const metadata: Metadata = {
  title: {
    default: 'Stayfix – Aufenthaltstitel einfach im Blick',
    template: '%s | Stayfix',
  },
  description:
    'Stayfix hilft Unternehmen, Aufenthaltstitel ihrer Mitarbeitenden zentral zu verwalten und rechtzeitig an Abläufe zu erinnern.',
}

// Inter global einbinden
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="de" className={inter.variable}>
      <body className="min-h-screen bg-white text-slate-900 antialiased font-sans">
        {children}
      </body>
    </html>
  )
}
