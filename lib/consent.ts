export type ConsentState = {
  analytics: boolean
  marketing: boolean
}

const KEY = 'stayfix_consent_v1'

export function readConsent(): ConsentState | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem(KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as Partial<ConsentState>
    return {
      analytics: !!parsed.analytics,
      marketing: !!parsed.marketing,
    }
  } catch {
    return null
  }
}

export function writeConsent(state: ConsentState) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(KEY, JSON.stringify(state))

  // Optional: Cookie setzen, falls du serverseitig was brauchst
  // document.cookie = `${KEY}=${encodeURIComponent(JSON.stringify(state))}; Path=/; Max-Age=31536000; SameSite=Lax`
}
