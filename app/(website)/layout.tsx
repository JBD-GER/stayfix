// app/(website)/layout.tsx
import type { ReactNode } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'

export default function WebsiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-white text-slate-900">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
