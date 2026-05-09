import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { List } from '@phosphor-icons/react'
import { Sidebar } from '@/components/Sidebar'
import { SkipLink } from '@/components/SkipLink'

/**
 * Admin portal layout — sidebar (240px) + main content area.
 * Authority: design handoff Section 3.1.
 * On desktop (≥768px): Sidebar is sticky in the flex row.
 * On mobile (<768px): Sidebar slides in as a fixed overlay with a backdrop.
 */
export function AdminPortalLayout() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="flex h-screen w-full overflow-hidden bg-bg-base">
      <SkipLink />

      {/* Mobile backdrop — tap to close sidebar */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      <Sidebar mobileOpen={mobileOpen} onMobileClose={() => setMobileOpen(false)} />

      <main id="main-content" className="flex-1 flex flex-col overflow-y-auto min-w-0">
        {/* Mobile top bar — hamburger + logo mark */}
        <div className="md:hidden sticky top-0 z-30 flex items-center gap-3 h-14 px-4 bg-bg-sidebar border-b border-white/10 shrink-0">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation menu"
            className="flex items-center justify-center w-9 h-9 rounded-control text-white hover:bg-white/10 transition-colors"
          >
            <List size={20} aria-hidden="true" />
          </button>
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-7 h-7 rounded bg-primary/20 text-primary font-bold text-xs">
              ℞
            </div>
            <p className="type-card-title text-white leading-tight">PharmacyOS</p>
          </div>
        </div>

        <Outlet />
      </main>
    </div>
  )
}
