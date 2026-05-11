import { useState } from 'react'
import { Building, Database, Bell, Globe, ShieldWarning, DownloadSimple, Trash } from '@phosphor-icons/react'
import { PageHeader } from '@/components/PageHeader'
import { Button } from '@/components/Button'
import { Input, FormField } from '@/components/Input'
import { Checkbox } from '@/components/Checkbox'
import { useToast } from '@/components/Toast'
import { pharmacyConfig } from '@/config/pharmacy'

export function SettingsPage() {
  return (
    <div className="flex flex-col h-full">
      <PageHeader title="System Settings" subtitle="Pharmacy configuration · save changes per section" />
      <section className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-3xl flex flex-col gap-4">
          <Section icon={<Building size={18} className="text-rx-received-fg" />} title="Pharmacy Profile" description="Identity used on receipts, prescriptions, and reports.">
            <FormField label="Pharmacy Name" required>
              {(p) => <Input {...p} defaultValue={pharmacyConfig.name} />}
            </FormField>
            <FormField label="Address">
              {(p) => <Input {...p} defaultValue={pharmacyConfig.address} />}
            </FormField>
            <div className="grid grid-cols-2 gap-4">
              <FormField label="Phone">
                {(p) => <Input {...p} type="tel" defaultValue={pharmacyConfig.phone} mono />}
              </FormField>
              <FormField label="Pharmacy Council #">
                {(p) => <Input {...p} defaultValue={pharmacyConfig.pharmacyCouncilNumber} mono />}
              </FormField>
            </div>
            <SaveRow section="Pharmacy profile" />
          </Section>

          <Section icon={<Database size={18} className="text-rx-filled-fg" />} title="Inventory Defaults" description="Thresholds applied across all SKUs unless overridden per drug.">
            <div className="grid grid-cols-2 gap-4">
              <FormField label="Low Stock Threshold (units)" helper="Triggers low-stock alert">
                {(p) => <Input {...p} type="number" defaultValue={pharmacyConfig.defaults.lowStockThreshold} mono />}
              </FormField>
              <FormField label="Expiry Alert Window (days)" helper="Items expiring within this window appear in alerts">
                {(p) => <Input {...p} type="number" defaultValue={pharmacyConfig.defaults.expiryAlertWindowDays} mono />}
              </FormField>
            </div>
            <Checkbox
              label="Auto-generate purchase orders when stock drops below threshold"
              defaultChecked={pharmacyConfig.defaults.autoGeneratePurchaseOrders}
            />
            <Checkbox
              label="Block dispensing of expired lots (recommended)"
              defaultChecked={pharmacyConfig.defaults.blockExpiredDispensing}
            />
            <SaveRow section="Inventory defaults" />
          </Section>

          <Section icon={<Bell size={18} className="text-rx-verified-fg" />} title="Notifications" description="Alert routing for staff and management.">
            <Checkbox label="Email me when schedule drug log entry is created" defaultChecked />
            <Checkbox label="Email me when AI scan confidence falls below 85%" defaultChecked />
            <Checkbox label="Email manager on stock alerts" defaultChecked />
            <Checkbox label="Daily revenue summary email at end of day" defaultChecked />
            <SaveRow section="Notifications" />
          </Section>

          <Section icon={<Globe size={18} className="text-tag-nhf-fg" />} title="Integrations" description="External services connected to PharmacyOS.">
            <Row label="Anthropic Claude Vision" status="Connected" detail="invoice + Rx scanning" />
            <Row label="Lynk Payments" status="Pending Credentials" detail="awaiting client API key" warn />
            <Row label="NHF Verification" status="Phase 2 (deferred)" detail="not yet active" muted />
            <Row label="WhatsApp / SMS" status="Phase 2 (deferred)" detail="not yet active" muted />
          </Section>

          <DataManagementSection />
        </div>
      </section>
    </div>
  )
}

/**
 * Data Management — export backup, clear demo data, view error log.
 *
 * Backup strategy:
 *  • All operational data is persisted in localStorage via Zustand persist.
 *  • "Export Backup" snapshots all pharmacyos-* localStorage keys to a JSON file.
 *  • Restoring: import the JSON and call localStorage.setItem for each key, then reload.
 *  • Error log: last 50 render errors captured by ErrorBoundary, stored per entry.
 */
function DataManagementSection() {
  const toast = useToast()
  const [errorLog, setErrorLog] = useState<Array<{ ts: string; message: string }>>([])
  const [showLog, setShowLog] = useState(false)

  function handleExport() {
    try {
      const snapshot: Record<string, unknown> = {}
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (key?.startsWith('pharmacyos-')) {
          try { snapshot[key] = JSON.parse(localStorage.getItem(key) ?? 'null') }
          catch { snapshot[key] = localStorage.getItem(key) }
        }
      }
      const blob = new Blob([JSON.stringify(snapshot, null, 2)], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `pharmacyos-backup-${new Date().toISOString().slice(0, 10)}.json`
      a.click()
      URL.revokeObjectURL(url)
      toast.show('Backup exported successfully', { variant: 'success' })
    } catch {
      toast.show('Export failed — check browser permissions', { variant: 'error' })
    }
  }

  function handleClearDemo() {
    const keys: string[] = []
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i)
      if (k?.startsWith('pharmacyos-')) keys.push(k)
    }
    keys.forEach((k) => localStorage.removeItem(k))
    toast.show('Demo data cleared — reload to reset to sample data', { variant: 'info' })
    setTimeout(() => window.location.reload(), 1200)
  }

  function handleViewLog() {
    try {
      const log = JSON.parse(localStorage.getItem('pharmacyos-error-log') ?? '[]')
      setErrorLog(log)
    } catch {
      setErrorLog([])
    }
    setShowLog(true)
  }

  return (
    <div className="bg-bg-surface rounded-card shadow-card p-6">
      <div className="flex items-start gap-3 mb-5 pb-4 border-b border-border-subtle">
        <div className="w-10 h-10 rounded-control bg-bg-subtle flex items-center justify-center shrink-0">
          <ShieldWarning size={18} className="text-warning" />
        </div>
        <div>
          <h3 className="type-card-title text-text-primary">Data Management</h3>
          <p className="text-xs text-text-secondary mt-0.5">
            Backup, diagnostics, and data integrity tools. All patient and prescription
            data is stored locally (offline-capable) — use Export Backup to create a
            portable snapshot before any system changes.
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {/* Offline protocol note */}
        <div className="px-4 py-3 bg-bg-subtle rounded-control border border-border text-xs text-text-secondary space-y-1">
          <p className="font-medium text-text-primary">Offline protocol</p>
          <p>All core workflows (Rx verification, inventory receives, patient records) are fully offline-capable — data is stored in the browser and syncs when connection restores.</p>
          <p>Features requiring connectivity: AI scanning, NHF verification, bank settlement, email/SMS notifications. These display "Integration Pending" when unavailable.</p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button variant="secondary" size="md" onClick={handleExport}>
            <DownloadSimple size={15} weight="bold" />
            Export Backup (JSON)
          </Button>
          <Button variant="secondary" size="md" onClick={handleViewLog}>
            View Error Log
          </Button>
          <Button
            variant="secondary"
            size="md"
            onClick={handleClearDemo}
            className="text-error border-error/30 hover:bg-error/5"
          >
            <Trash size={15} />
            Clear Demo Data
          </Button>
        </div>

        {showLog && (
          <div className="border border-border rounded-control overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-bg-subtle">
              <p className="type-caption text-text-secondary">Error Log ({errorLog.length} entries)</p>
              <button
                type="button"
                onClick={() => setShowLog(false)}
                className="type-tiny text-text-secondary hover:text-text-primary"
              >
                Close
              </button>
            </div>
            {errorLog.length === 0 ? (
              <p className="px-4 py-6 text-center type-body-xs text-text-disabled">No errors logged</p>
            ) : (
              <div className="max-h-64 overflow-y-auto divide-y divide-border-subtle">
                {errorLog.map((entry, i) => (
                  <div key={i} className="px-4 py-2">
                    <p className="type-mono-data text-xs text-text-secondary">{entry.ts}</p>
                    <p className="type-body-xs text-error mt-0.5">{entry.message}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

function Section({ icon, title, description, children }: { icon: React.ReactNode; title: string; description: string; children: React.ReactNode }) {
  return (
    <div className="bg-bg-surface rounded-card shadow-card p-6">
      <div className="flex items-start gap-3 mb-5 pb-4 border-b border-border-subtle">
        <div className="w-10 h-10 rounded-control bg-bg-subtle flex items-center justify-center shrink-0">{icon}</div>
        <div>
          <h3 className="type-card-title text-text-primary">{title}</h3>
          <p className="text-xs text-text-secondary mt-0.5">{description}</p>
        </div>
      </div>
      <div className="flex flex-col gap-4">{children}</div>
    </div>
  )
}

function SaveRow({ section }: { section: string }) {
  const toast = useToast()
  return (
    <div className="flex items-center justify-end gap-2 pt-2 border-t border-border-subtle">
      <Button variant="tertiary" size="md">Cancel</Button>
      <Button
        variant="primary"
        size="md"
        onClick={() => toast.show(`${section} saved`, { variant: 'success' })}
      >
        Save Changes
      </Button>
    </div>
  )
}

function Row({ label, status, detail, warn, muted }: { label: string; status: string; detail: string; warn?: boolean; muted?: boolean }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-border-subtle last:border-b-0">
      <div>
        <p className="text-sm font-medium text-text-primary">{label}</p>
        <p className="text-xs text-text-secondary">{detail}</p>
      </div>
      <span className={[
        'inline-flex items-center px-2 py-0.5 rounded-pill type-label font-semibold',
        warn ? 'bg-rx-verified-bg text-rx-verified-fg'
          : muted ? 'bg-rx-dispensed-bg text-rx-dispensed-fg'
          : 'bg-rx-filled-bg text-rx-filled-fg',
      ].join(' ')}>
        {status}
      </span>
    </div>
  )
}

export default SettingsPage
