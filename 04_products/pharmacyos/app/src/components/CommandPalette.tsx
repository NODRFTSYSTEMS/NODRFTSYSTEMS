import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { MagnifyingGlass, Crosshair } from '@phosphor-icons/react'

interface CommandItem {
  label: string
  path: string
  keywords: string
}

const COMMANDS: CommandItem[] = [
  { label: 'Dashboard', path: '/dashboard', keywords: 'dashboard home overview metrics' },
  { label: 'Inventory — Stock', path: '/inventory', keywords: 'inventory stock drugs' },
  { label: 'Inventory — Catalog', path: '/inventory/catalog', keywords: 'catalog drugs din' },
  { label: 'Inventory — Receive', path: '/inventory/receive', keywords: 'receive stock incoming delivery' },
  { label: 'Inventory — AI Scanner', path: '/inventory/scanner', keywords: 'ai scanner invoice ocr' },
  { label: 'Inventory — Alerts', path: '/inventory/alerts', keywords: 'alerts low stock expiry' },
  { label: 'Inventory — Suppliers', path: '/inventory/suppliers', keywords: 'suppliers vendors contacts' },
  { label: 'Prescriptions — Queue', path: '/prescriptions', keywords: 'prescriptions queue rx kanban' },
  { label: 'Prescriptions — New', path: '/prescriptions/new', keywords: 'new prescription rx' },
  { label: 'Prescriptions — AI Scanner', path: '/prescriptions/scanner', keywords: 'ai scanner prescription ocr' },
  { label: 'Prescriptions — Schedule Log', path: '/prescriptions/schedule-log', keywords: 'schedule log controlled substance regulatory' },
  { label: 'Patients', path: '/patients', keywords: 'patients search records' },
  { label: 'Patients — New', path: '/patients/new', keywords: 'new patient registration' },
  { label: 'POS Terminal', path: '/pos', keywords: 'pos terminal sale checkout' },
  { label: 'POS — Products', path: '/pos/products', keywords: 'pos products retail' },
  { label: 'POS — Inventory', path: '/pos/inventory', keywords: 'pos inventory stock' },
  { label: 'POS — Suppliers', path: '/pos/suppliers', keywords: 'pos suppliers vendors' },
  { label: 'POS — Reports', path: '/pos/reports', keywords: 'pos reports sales' },
  { label: 'POS — Loyalty', path: '/pos/loyalty', keywords: 'loyalty points customers' },
  { label: 'POS — Loyalty Dashboard', path: '/pos/loyalty/dashboard', keywords: 'loyalty dashboard metrics' },
  { label: 'Reports — Hub', path: '/reports', keywords: 'reports hub analytics' },
  { label: 'Reports — Inventory', path: '/reports/inventory', keywords: 'reports inventory stock' },
  { label: 'Reports — Dispensing', path: '/reports/dispensing', keywords: 'reports dispensing fills' },
  { label: 'Reports — Schedule Log', path: '/reports/schedule-log', keywords: 'reports schedule log regulatory' },
  { label: 'Reports — Revenue', path: '/reports/revenue', keywords: 'reports revenue sales money' },
  { label: 'AI — Job Queue', path: '/ai/queue', keywords: 'ai job queue extraction' },
  { label: 'Admin — Users', path: '/admin/users', keywords: 'admin users staff accounts' },
  { label: 'Admin — Permissions', path: '/admin/permissions', keywords: 'admin permissions roles access matrix rbac' },
  { label: 'Admin — Audit Log', path: '/admin/audit', keywords: 'admin audit log activity' },
  { label: 'Admin — Settings', path: '/admin/settings', keywords: 'admin settings configuration' },
  { label: 'Admin — Security', path: '/admin/security', keywords: 'admin security 2fa sessions' },
  { label: 'My Profile', path: '/profile', keywords: 'profile account password 2fa' },
]

export function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const navigate = useNavigate()
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return COMMANDS
    return COMMANDS.filter(
      (c) =>
        c.label.toLowerCase().includes(q) || c.keywords.toLowerCase().includes(q),
    )
  }, [query])

  useEffect(() => {
    setSelectedIndex(0)
  }, [query])

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setOpen((prev) => !prev)
      }
      if (e.key === 'Escape' && open) {
        e.preventDefault()
        setOpen(false)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open])

  useEffect(() => {
    if (open) {
      setQuery('')
      setSelectedIndex(0)
      setTimeout(() => inputRef.current?.focus(), 10)
    }
  }, [open])

  // Focus trap
  useEffect(() => {
    if (!open) return
    function onFocusIn(e: FocusEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        inputRef.current?.focus()
      }
    }
    document.addEventListener('focusin', onFocusIn)
    return () => document.removeEventListener('focusin', onFocusIn)
  }, [open])

  const execute = useCallback(
    (path: string) => {
      navigate(path)
      setOpen(false)
    },
    [navigate],
  )

  function handleKeyDown(e: React.KeyboardEvent) {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedIndex((i) => (i + 1) % filtered.length)
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedIndex((i) => (i - 1 + filtered.length) % filtered.length)
        break
      case 'Enter':
        e.preventDefault()
        if (filtered[selectedIndex]) {
          execute(filtered[selectedIndex].path)
        }
        break
    }
  }

  useEffect(() => {
    const el = listRef.current?.children[selectedIndex] as HTMLElement | undefined
    el?.scrollIntoView({ block: 'nearest' })
  }, [selectedIndex])

  if (!open) return null

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]"
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={() => setOpen(false)}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-bg-surface rounded-card shadow-modal overflow-hidden mx-4">
        {/* Search bar */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
          <MagnifyingGlass size={20} className="text-text-secondary shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search commands…"
            aria-label="Search commands"
            className="flex-1 type-body-sm text-text-primary bg-transparent focus:outline-none placeholder:text-text-disabled"
          />
          <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded bg-bg-subtle border border-border type-tiny text-text-secondary">
            ESC
          </kbd>
        </div>

        {/* Results */}
        {filtered.length > 0 ? (
          <ul
            ref={listRef}
            className="max-h-[50vh] overflow-y-auto py-2"
            role="listbox"
            aria-label="Commands"
          >
            {filtered.map((item, i) => {
              const active = i === selectedIndex
              return (
                <li key={item.path} role="option" aria-selected={active}>
                  <button
                    type="button"
                    onClick={() => execute(item.path)}
                    onMouseEnter={() => setSelectedIndex(i)}
                    className={[
                      'w-full text-left px-4 py-2.5 flex items-center gap-3 transition-colors',
                      active ? 'bg-primary-50 text-primary' : 'text-text-primary hover:bg-bg-subtle',
                    ].join(' ')}
                  >
                    <Crosshair size={16} className={active ? 'text-primary' : 'text-text-secondary'} />
                    <span className="type-body-sm">{item.label}</span>
                    {active && (
                      <kbd className="ml-auto hidden sm:inline-flex items-center px-1.5 py-0.5 rounded bg-bg-subtle border border-border type-tiny text-text-secondary">
                        ↵
                      </kbd>
                    )}
                  </button>
                </li>
              )
            })}
          </ul>
        ) : (
          <div className="px-4 py-8 text-center text-text-secondary type-body-sm">
            No commands match "{query}"
          </div>
        )}

        {/* Footer */}
        <div className="px-4 py-2 border-t border-border flex items-center justify-between type-tiny text-text-secondary">
          <span>{filtered.length} command{filtered.length !== 1 ? 's' : ''}</span>
          <span className="hidden sm:inline">
            <kbd className="px-1 rounded bg-bg-subtle border border-border">↑</kbd>{' '}
            <kbd className="px-1 rounded bg-bg-subtle border border-border">↓</kbd> to navigate ·{' '}
            <kbd className="px-1 rounded bg-bg-subtle border border-border">↵</kbd> to select
          </span>
        </div>
      </div>
    </div>
  )
}

export default CommandPalette
