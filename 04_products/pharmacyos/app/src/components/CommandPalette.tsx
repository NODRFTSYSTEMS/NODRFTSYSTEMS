import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  MagnifyingGlass, Crosshair, UserCircle, Pill, Prescription,
  UsersThree, Robot,
} from '@phosphor-icons/react'
import { SAMPLE_PATIENTS, SAMPLE_STAFF } from '@/data/sample'
import { usePrescriptionStore } from '@/stores/prescriptions'
import { useInventoryStore } from '@/stores/inventory'

// ── Navigation commands ───────────────────────────────────────────────────────

interface NavItem {
  kind: 'nav'
  label: string
  path: string
  keywords: string
}

const NAV_COMMANDS: NavItem[] = [
  { kind: 'nav', label: 'Dashboard',                      path: '/dashboard',              keywords: 'dashboard home overview metrics' },
  { kind: 'nav', label: 'Rx Inventory — Stock',            path: '/inventory',              keywords: 'inventory stock drugs rx pharmacy' },
  { kind: 'nav', label: 'Rx Inventory — Catalog',          path: '/inventory/catalog',      keywords: 'catalog drugs din' },
  { kind: 'nav', label: 'Rx Inventory — Receive Stock',    path: '/inventory/receive',      keywords: 'receive stock incoming delivery' },
  { kind: 'nav', label: 'Rx Inventory — AI Scanner',       path: '/inventory/scanner',      keywords: 'ai scanner invoice ocr' },
  { kind: 'nav', label: 'Rx Inventory — Alerts',           path: '/inventory/alerts',       keywords: 'alerts low stock expiry' },
  { kind: 'nav', label: 'Rx Inventory — Suppliers',        path: '/inventory/suppliers',    keywords: 'rx suppliers vendors' },
  { kind: 'nav', label: 'Prescriptions — Queue',          path: '/prescriptions',          keywords: 'prescriptions queue rx kanban' },
  { kind: 'nav', label: 'Prescriptions — New',            path: '/prescriptions/new',      keywords: 'new prescription rx' },
  { kind: 'nav', label: 'Prescriptions — AI Scanner',     path: '/prescriptions/scanner',  keywords: 'ai scanner prescription ocr' },
  { kind: 'nav', label: 'Prescriptions — Schedule Log',   path: '/prescriptions/schedule-log', keywords: 'schedule log controlled substance regulatory' },
  { kind: 'nav', label: 'Patients',                       path: '/patients',               keywords: 'patients search records' },
  { kind: 'nav', label: 'Patients — New',                 path: '/patients/new',           keywords: 'new patient registration' },
  { kind: 'nav', label: 'POS Terminal',                   path: '/pos',                    keywords: 'pos terminal sale checkout' },
  { kind: 'nav', label: 'POS — Retail Products',          path: '/pos/products',           keywords: 'pos products retail' },
  { kind: 'nav', label: 'POS — Retail Inventory',         path: '/pos/inventory',          keywords: 'pos retail inventory stock otc' },
  { kind: 'nav', label: 'POS — Retail Suppliers',         path: '/pos/suppliers',          keywords: 'pos retail suppliers vendors' },
  { kind: 'nav', label: 'POS — Loyalty',                  path: '/pos/loyalty',            keywords: 'loyalty points customers' },
  { kind: 'nav', label: 'POS — Loyalty Dashboard',        path: '/pos/loyalty/dashboard',  keywords: 'loyalty dashboard' },
  { kind: 'nav', label: 'POS — Reports',                  path: '/pos/reports',            keywords: 'pos reports sales' },
  { kind: 'nav', label: 'Reports — Hub',                  path: '/reports',                keywords: 'reports hub analytics' },
  { kind: 'nav', label: 'Reports — Revenue',              path: '/reports/revenue',        keywords: 'reports revenue sales money' },
  { kind: 'nav', label: 'Reports — Inventory',            path: '/reports/inventory',      keywords: 'reports inventory stock' },
  { kind: 'nav', label: 'Reports — Dispensing',           path: '/reports/dispensing',     keywords: 'reports dispensing fills' },
  { kind: 'nav', label: 'Reports — Schedule Log',         path: '/reports/schedule-log',   keywords: 'reports schedule log regulatory' },
  { kind: 'nav', label: 'AI — Job Queue',                 path: '/ai/queue',               keywords: 'ai job queue extraction agent' },
  { kind: 'nav', label: 'Admin — Users',                  path: '/admin/users',            keywords: 'admin users staff accounts' },
  { kind: 'nav', label: 'Admin — Invite Staff',           path: '/admin/users/new',        keywords: 'admin new staff invite user' },
  { kind: 'nav', label: 'Admin — Permissions',            path: '/admin/permissions',      keywords: 'admin permissions roles access matrix rbac' },
  { kind: 'nav', label: 'Admin — Audit Log',              path: '/admin/audit',            keywords: 'admin audit log activity' },
  { kind: 'nav', label: 'Admin — Settings',               path: '/admin/settings',         keywords: 'admin settings configuration' },
  { kind: 'nav', label: 'Admin — Security',               path: '/admin/security',         keywords: 'admin security 2fa sessions' },
  { kind: 'nav', label: 'My Profile',                     path: '/profile',                keywords: 'profile account password 2fa' },
]

// ── Entity result types ───────────────────────────────────────────────────────

interface StaffResult  { kind: 'staff';  id: string; name: string; role: string; status: string; path: string }
interface PatientResult{ kind: 'patient';id: string; name: string; phone: string; path: string }
interface RxResult     { kind: 'rx';     id: string; rxNumber: string; patient: string; status: string; path: string }
interface DrugResult   { kind: 'drug';   id: string; name: string; qty: string; path: string }

type ResultItem = NavItem | StaffResult | PatientResult | RxResult | DrugResult

interface Group {
  label: string
  items: ResultItem[]
}

const GROUP_ICONS: Record<ResultItem['kind'], React.ReactNode> = {
  nav:     <Crosshair size={14} className="text-text-secondary" />,
  staff:   <UsersThree size={14} className="text-text-secondary" />,
  patient: <UserCircle size={14} className="text-text-secondary" />,
  rx:      <Prescription size={14} className="text-text-secondary" />,
  drug:    <Pill size={14} className="text-text-secondary" />,
}

function itemLabel(item: ResultItem): string {
  switch (item.kind) {
    case 'nav':     return item.label
    case 'staff':   return `${item.name} · ${item.role} · ${item.status}`
    case 'patient': return `${item.name} · ${item.id} · ${item.phone}`
    case 'rx':      return `${item.rxNumber} · ${item.patient} · ${item.status}`
    case 'drug':    return `${item.name} · ${item.qty} in stock`
  }
}

// ── Component ─────────────────────────────────────────────────────────────────

export function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const navigate = useNavigate()
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const prescriptions = usePrescriptionStore((s) => s.prescriptions)
  // Live Rx stock — drug search reflects newly received items immediately
  const rxStock = useInventoryStore((s) => s.stock)

  const groups = useMemo((): Group[] => {
    const q = query.trim().toLowerCase()

    // Navigation
    const navItems: NavItem[] = q
      ? NAV_COMMANDS.filter((c) => c.label.toLowerCase().includes(q) || c.keywords.toLowerCase().includes(q))
      : NAV_COMMANDS

    if (!q) {
      // No query — show navigation only
      return [{ label: 'Navigation', items: navItems.slice(0, 10) }]
    }

    // Entity search — only when query is present
    const staffItems: StaffResult[] = SAMPLE_STAFF
      .filter((s) =>
        s.name.toLowerCase().includes(q) ||
        s.email.toLowerCase().includes(q) ||
        s.role.toLowerCase().includes(q) ||
        (s.employeeNumber ?? '').toLowerCase().includes(q) ||
        (s.department ?? '').toLowerCase().includes(q),
      )
      .slice(0, 5)
      .map((s) => ({
        kind: 'staff' as const,
        id: s.id,
        name: s.name,
        role: s.role,
        status: s.status,
        path: `/admin/users/${s.id}`,
      }))

    const patientItems: PatientResult[] = SAMPLE_PATIENTS
      .filter((p) =>
        p.name.toLowerCase().includes(q) ||
        p.id.toLowerCase().includes(q) ||
        p.phone.toLowerCase().includes(q) ||
        p.nhfNumber.toLowerCase().includes(q),
      )
      .slice(0, 5)
      .map((p) => ({
        kind: 'patient' as const,
        id: p.id,
        name: p.name,
        phone: p.phone,
        path: `/patients/${p.id}`,
      }))

    const rxItems: RxResult[] = prescriptions
      .filter((rx) =>
        rx.rxNumber.toLowerCase().includes(q) ||
        rx.patient.toLowerCase().includes(q) ||
        rx.id.toLowerCase().includes(q) ||
        rx.drugs.some((d) => d.toLowerCase().includes(q)),
      )
      .slice(0, 5)
      .map((rx) => ({
        kind: 'rx' as const,
        id: rx.id,
        rxNumber: rx.rxNumber,
        patient: rx.patient,
        status: rx.status,
        path: `/prescriptions/${rx.id}`,
      }))

    const drugItems: DrugResult[] = rxStock
      .filter((s) =>
        s.drug.toLowerCase().includes(q) ||
        s.din.toLowerCase().includes(q) ||
        s.id.toLowerCase().includes(q),
      )
      .slice(0, 5)
      .map((s) => ({
        kind: 'drug' as const,
        id: s.id,
        name: s.drug,
        qty: String(s.qtyOnHand),
        path: `/inventory/catalog/${s.id}`,
      }))

    const result: Group[] = []
    if (navItems.length > 0) result.push({ label: 'Navigation', items: navItems.slice(0, 5) })
    if (staffItems.length > 0) result.push({ label: 'Staff', items: staffItems })
    if (patientItems.length > 0) result.push({ label: 'Patients', items: patientItems })
    if (rxItems.length > 0) result.push({ label: 'Prescriptions', items: rxItems })
    if (drugItems.length > 0) result.push({ label: 'Drugs', items: drugItems })
    return result
  }, [query, prescriptions, rxStock])

  // Flat list for keyboard navigation
  const flatItems = useMemo(
    () => groups.flatMap((g) => g.items),
    [groups],
  )

  const totalCount = flatItems.length

  useEffect(() => { setSelectedIndex(0) }, [query])

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
        setSelectedIndex((i) => (i + 1) % totalCount)
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedIndex((i) => (i - 1 + totalCount) % totalCount)
        break
      case 'Enter':
        e.preventDefault()
        if (flatItems[selectedIndex]) {
          execute(flatItems[selectedIndex].path)
        }
        break
    }
  }

  // Scroll selected item into view
  useEffect(() => {
    if (!listRef.current) return
    const el = listRef.current.querySelector(`[data-index="${selectedIndex}"]`) as HTMLElement | null
    el?.scrollIntoView({ block: 'nearest' })
  }, [selectedIndex])

  if (!open) return null

  // Compute running index across all groups for selection tracking
  let runningIdx = 0

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]"
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setOpen(false)} />

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
            placeholder="Search navigation, staff, patients, Rx, drugs..."
            aria-label="Search commands and entities"
            className="flex-1 type-body-sm text-text-primary bg-transparent focus:outline-none placeholder:text-text-disabled"
          />
          <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded bg-bg-subtle border border-border type-tiny text-text-secondary">ESC</kbd>
        </div>

        {/* Grouped results */}
        <div ref={listRef} className="max-h-[50vh] overflow-y-auto py-2">
          {groups.length === 0 ? (
            <div className="px-4 py-8 text-center text-text-secondary type-body-sm">
              No results for "{query}"
            </div>
          ) : (
            groups.map((group) => (
              <div key={group.label}>
                {/* Group header */}
                <div className="px-4 py-1.5 flex items-center gap-1.5">
                  {group.label === 'Staff' && <UsersThree size={11} className="text-text-disabled" />}
                  {group.label === 'Patients' && <UserCircle size={11} className="text-text-disabled" />}
                  {group.label === 'Prescriptions' && <Prescription size={11} className="text-text-disabled" />}
                  {group.label === 'Drugs' && <Pill size={11} className="text-text-disabled" />}
                  {group.label === 'Navigation' && <Crosshair size={11} className="text-text-disabled" />}
                  <span className="type-tiny text-text-disabled uppercase tracking-wider">{group.label}</span>
                </div>
                <ul role="listbox" aria-label={group.label}>
                  {group.items.map((item) => {
                    const idx = runningIdx++
                    const active = idx === selectedIndex
                    return (
                      <li key={`${item.kind}-${item.path}`} role="option" aria-selected={active}>
                        <button
                          type="button"
                          data-index={idx}
                          onClick={() => execute(item.path)}
                          onMouseEnter={() => setSelectedIndex(idx)}
                          className={[
                            'w-full text-left px-4 py-2 flex items-center gap-3 transition-colors',
                            active ? 'bg-primary/10 text-primary' : 'text-text-primary hover:bg-bg-subtle',
                          ].join(' ')}
                        >
                          <span className="shrink-0">{GROUP_ICONS[item.kind]}</span>
                          <span className="type-body-sm truncate">{itemLabel(item)}</span>
                          {active && (
                            <kbd className="ml-auto hidden sm:inline-flex items-center px-1.5 py-0.5 rounded bg-bg-subtle border border-border type-tiny text-text-secondary shrink-0">↵</kbd>
                          )}
                        </button>
                      </li>
                    )
                  })}
                </ul>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2 border-t border-border flex items-center justify-between type-tiny text-text-secondary">
          <span>{totalCount} result{totalCount !== 1 ? 's' : ''}</span>
          <span className="hidden sm:inline">
            <kbd className="px-1 rounded bg-bg-subtle border border-border">↑</kbd>{' '}
            <kbd className="px-1 rounded bg-bg-subtle border border-border">↓</kbd> navigate ·{' '}
            <kbd className="px-1 rounded bg-bg-subtle border border-border">↵</kbd> select
          </span>
        </div>
      </div>
    </div>
  )
}

export default CommandPalette
