import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Warning, Calendar, Robot, ArrowSquareOut } from '@phosphor-icons/react'
import { PageHeader } from '@/components/PageHeader'
import { Button } from '@/components/Button'
import { StatusPill } from '@/components/StatusPill'
import { AgentResultCard } from '@/components/AgentResultCard'
import { IntegrationPendingBadge } from '@/components/IntegrationPendingBadge'
import { useToast } from '@/components/Toast'
import { SAMPLE_AI_JOBS } from '@/data/sample'
import { useInventoryStore } from '@/stores/inventory'

function daysUntil(date: string) {
  const diff = new Date(date).getTime() - Date.now()
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
}

// Latest inventory-intel job from sample data
const latestIntelJob = SAMPLE_AI_JOBS
  .filter((j) => j.type === 'inventory-intel')
  .sort((a, b) => b.createdAt.localeCompare(a.createdAt))[0]

export function AlertsPage() {
  const navigate = useNavigate()
  const toast = useToast()
  const { stock } = useInventoryStore()
  const lowStock = stock.filter((s) => s.qtyOnHand <= s.reorderPoint)
  const expiryAlerts = stock.filter((s) => daysUntil(s.expiryDate) <= 90)
  const [showIntelCard, setShowIntelCard] = useState(false)
  const [runningAnalysis, setRunningAnalysis] = useState(false)

  function handleRunAnalysis() {
    setRunningAnalysis(true)
    toast.show('Inventory Intelligence agent queued — results ready.', { variant: 'info' })
    setTimeout(() => {
      setRunningAnalysis(false)
      setShowIntelCard(true)
    }, 800)
  }

  function handleReorder(drugId: string) {
    navigate('/inventory/receive', { state: { drugId } })
  }

  return (
    <div className="flex flex-col h-full">
      <PageHeader
        title="Inventory Alerts"
        subtitle={`${lowStock.length} low stock · ${expiryAlerts.length} expiring`}
        cta={
          <Button
            variant="secondary"
            size="md"
            onClick={handleRunAnalysis}
            disabled={runningAnalysis}
          >
            <Robot size={16} />
            {runningAnalysis ? 'Running...' : 'Run Inventory Analysis'}
          </Button>
        }
      />

      <section className="flex-1 p-6 overflow-y-auto space-y-6">
        {/* Inventory Intelligence result card */}
        {showIntelCard && latestIntelJob && (
          <AgentResultCard
            job={latestIntelJob}
            onDismiss={() => setShowIntelCard(false)}
            onAction={() => navigate('/ai/queue')}
            actionLabel="View in AI Queue"
          />
        )}

        {/* Supplier PO stub */}
        <div className="flex items-center justify-between">
          <p className="type-label text-text-secondary">
            Use Reorder buttons below to pre-fill a receive record.
          </p>
          <IntegrationPendingBadge service="Supplier PO API" description="Automated purchase order" />
        </div>

        {/* Low Stock */}
        <section className="bg-bg-surface rounded-card shadow-card border border-border">
          <div className="px-5 py-4 border-b border-border flex items-center gap-2">
            <Warning size={18} className="text-warning" />
            <h2 className="type-card-title text-text-primary">Low Stock</h2>
            <span className="type-body-xs text-text-secondary ml-2">{lowStock.length} items below reorder point</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <caption className="sr-only">Low stock alerts — items below reorder point</caption>
              <thead>
                <tr className="sticky top-0 z-10 bg-bg-subtle border-b border-border">
                  <th className="px-4 py-2 text-left type-caption text-text-secondary">Drug</th>
                  <th className="px-4 py-2 text-left type-caption text-text-secondary">DIN</th>
                  <th className="px-4 py-2 text-right type-caption text-text-secondary">On Hand</th>
                  <th className="px-4 py-2 text-right type-caption text-text-secondary">Reorder</th>
                  <th className="px-4 py-2 text-left type-caption text-text-secondary">Supplier</th>
                  <th className="px-4 py-2 text-left type-caption text-text-secondary">Status</th>
                  <th className="px-4 py-2 text-left type-caption text-text-secondary">Action</th>
                </tr>
              </thead>
              <tbody>
                {lowStock.map((item) => (
                  <tr key={item.id} className="border-b border-border-subtle hover:bg-bg-subtle">
                    <td className="px-4 py-2 type-body-sm font-medium text-text-primary">{item.drug}</td>
                    <td className="px-4 py-2 type-mono-data text-text-secondary">{item.din}</td>
                    <td className="px-4 py-2 type-mono-data text-right text-tag-schedule-fg font-medium">{item.qtyOnHand}</td>
                    <td className="px-4 py-2 type-mono-data text-right text-text-secondary">{item.reorderPoint}</td>
                    <td className="px-4 py-2 type-body-xs text-text-secondary">{item.supplier}</td>
                    <td className="px-4 py-2">
                      <StatusPill variant="warning">Low</StatusPill>
                    </td>
                    <td className="px-4 py-2">
                      <button
                        type="button"
                        onClick={() => handleReorder(item.id)}
                        className="inline-flex items-center gap-1 type-tiny text-primary hover:underline font-medium"
                        title={`Pre-fill receive record for ${item.drug}`}
                      >
                        <ArrowSquareOut size={12} aria-hidden="true" />
                        Reorder
                      </button>
                    </td>
                  </tr>
                ))}
                {lowStock.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-text-secondary type-body-xs">
                      All stock levels healthy
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Expiry Alerts */}
        <section className="bg-bg-surface rounded-card shadow-card border border-border">
          <div className="px-5 py-4 border-b border-border flex items-center gap-2">
            <Calendar size={18} className="text-error" />
            <h2 className="type-card-title text-text-primary">Expiry Alerts</h2>
            <span className="type-body-xs text-text-secondary ml-2">{expiryAlerts.length} items expiring within 90 days</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <caption className="sr-only">Expiry alerts — items expiring within 90 days</caption>
              <thead>
                <tr className="sticky top-0 z-10 bg-bg-subtle border-b border-border">
                  <th className="px-4 py-2 text-left type-caption text-text-secondary">Drug</th>
                  <th className="px-4 py-2 text-left type-caption text-text-secondary">Lot #</th>
                  <th className="px-4 py-2 text-right type-caption text-text-secondary">Qty</th>
                  <th className="px-4 py-2 text-left type-caption text-text-secondary">Expiry</th>
                  <th className="px-4 py-2 text-left type-caption text-text-secondary">Days Left</th>
                  <th className="px-4 py-2 text-left type-caption text-text-secondary">Status</th>
                </tr>
              </thead>
              <tbody>
                {expiryAlerts.map((item) => {
                  const days = daysUntil(item.expiryDate)
                  return (
                    <tr key={item.id} className="border-b border-border-subtle hover:bg-bg-subtle">
                      <td className="px-4 py-2 type-body-sm font-medium text-text-primary">{item.drug}</td>
                      <td className="px-4 py-2 type-mono-data text-text-secondary">{item.lot}</td>
                      <td className="px-4 py-2 type-mono-data text-right text-text-primary">{item.qtyOnHand}</td>
                      <td className="px-4 py-2 type-mono-data text-text-secondary">{item.expiryDate}</td>
                      <td className="px-4 py-2 type-mono-data text-text-primary">{days}</td>
                      <td className="px-4 py-2">
                        <StatusPill variant={days < 30 ? 'error' : 'warning'}>
                          {days < 0 ? 'Expired' : days < 30 ? '< 30 days' : '< 90 days'}
                        </StatusPill>
                      </td>
                    </tr>
                  )
                })}
                {expiryAlerts.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-text-secondary type-body-xs">
                      No expiry alerts
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </section>
    </div>
  )
}

export default AlertsPage
