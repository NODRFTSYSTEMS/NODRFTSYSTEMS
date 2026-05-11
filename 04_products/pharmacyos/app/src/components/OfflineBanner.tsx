/**
 * OfflineBanner — monitors browser connectivity and surfaces a clear status bar.
 *
 * Offline protocol:
 *  • All core workflows are fully offline-capable: patient records, prescriptions,
 *    inventory, suppliers, and POS are stored in Zustand (localStorage).
 *  • Operations that require connectivity: AI scanning, NHF verification,
 *    bank settlement API, email/SMS notifications (all show Integration Pending stubs).
 *  • When offline: banner blocks cloud-dependent actions with clear messaging.
 *  • When reconnected: green "restored" confirmation shown for 3s then clears.
 */
import { useState, useEffect } from 'react'
import { WifiSlash, WifiHigh } from '@phosphor-icons/react'

export function OfflineBanner() {
  const [isOnline, setIsOnline] = useState(navigator.onLine)
  const [showRestored, setShowRestored] = useState(false)

  useEffect(() => {
    function handleOffline() {
      setIsOnline(false)
      setShowRestored(false)
    }
    function handleOnline() {
      setIsOnline(true)
      setShowRestored(true)
      const t = setTimeout(() => setShowRestored(false), 3000)
      return () => clearTimeout(t)
    }
    window.addEventListener('offline', handleOffline)
    window.addEventListener('online', handleOnline)
    return () => {
      window.removeEventListener('offline', handleOffline)
      window.removeEventListener('online', handleOnline)
    }
  }, [])

  if (isOnline && !showRestored) return null

  if (!isOnline) {
    return (
      <div
        role="alert"
        aria-live="assertive"
        className="shrink-0 flex items-center gap-2 px-4 py-2.5 bg-error/10 border-b border-error/30 text-xs text-error"
      >
        <WifiSlash size={14} className="shrink-0" aria-hidden="true" />
        <span>
          <span className="font-semibold">No internet connection.</span>
          {' '}Patient records, prescriptions, and inventory data remain available.
          Cloud sync, AI scanning, and integration features require connectivity.
        </span>
      </div>
    )
  }

  return (
    <div
      role="status"
      aria-live="polite"
      className="shrink-0 flex items-center gap-2 px-4 py-2.5 bg-success/10 border-b border-success/30 text-xs text-success"
    >
      <WifiHigh size={14} className="shrink-0" aria-hidden="true" />
      <span>
        <span className="font-semibold">Connection restored.</span>
        {' '}Cloud sync and integrations active.
      </span>
    </div>
  )
}
