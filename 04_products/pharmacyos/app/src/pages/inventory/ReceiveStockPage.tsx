import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { PageHeader } from '@/components/PageHeader'
import { FormField } from '@/components/Input'
import { Input } from '@/components/Input'
import { Select } from '@/components/Select'
import { Textarea } from '@/components/Textarea'
import { Button } from '@/components/Button'
import { StatusPill } from '@/components/StatusPill'
import { useToast } from '@/components/Toast'
import { useInventoryStore } from '@/stores/inventory'

/**
 * Receive Stock — log an incoming delivery against an existing SKU.
 *
 * Writes to the inventory store (qtyOnHand += received, lot/expiry/cost updated).
 * Pre-fill: navigate here from AlertsPage with `state.drugId` to pre-select a drug.
 *
 * New drug SKUs must be added to the catalog first (Inventory → Catalog).
 */
export function ReceiveStockPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const toast = useToast()
  const { stock, suppliers, receiveStock } = useInventoryStore()

  // Support pre-fill from AlertsPage reorder quick-action
  const prefillDrugId = (location.state as { drugId?: string } | null)?.drugId ?? ''

  const [drugId, setDrugId] = useState(prefillDrugId)
  const [supplier, setSupplier] = useState('')
  const [qty, setQty] = useState('')
  const [lot, setLot] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cost, setCost] = useState('')
  const [notes, setNotes] = useState('')
  const [submitAttempted, setSubmitAttempted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  // When a drug is selected, pre-fill supplier + cost from current record
  const selectedDrug = stock.find((s) => s.id === drugId)
  useEffect(() => {
    if (!selectedDrug) return
    // Pre-fill supplier if it matches an active supplier
    const matchedSupplier = suppliers.find(
      (s) => s.name === selectedDrug.supplier && s.status === 'Active',
    )
    if (matchedSupplier) setSupplier(matchedSupplier.name)
    // Pre-fill last known cost
    setCost(String(selectedDrug.unitCostJmd))
  }, [drugId]) // eslint-disable-line react-hooks/exhaustive-deps

  const errFor = (value: string) => (submitAttempted && !value ? 'Required' : undefined)
  const canSubmit = drugId && supplier && qty && lot && expiry && cost
  const activeSuppliers = suppliers.filter((s) => s.status === 'Active')

  function handleSave() {
    if (!canSubmit) {
      setSubmitAttempted(true)
      toast.show('Fill all required fields before receiving stock', { variant: 'error' })
      return
    }
    const qtyNum = parseInt(qty, 10)
    const costNum = parseFloat(cost)
    if (isNaN(qtyNum) || qtyNum <= 0) {
      toast.show('Quantity must be a positive number', { variant: 'error' })
      return
    }
    if (isNaN(costNum) || costNum <= 0) {
      toast.show('Unit cost must be a positive number', { variant: 'error' })
      return
    }

    setSubmitting(true)

    receiveStock({
      drugId,
      qtyReceived: qtyNum,
      lot: lot.trim(),
      expiry,
      costJmd: costNum,
      supplier,
      notes: notes.trim() || undefined,
    })

    setTimeout(() => {
      toast.show(
        `Received ${qtyNum} × ${selectedDrug?.drug ?? drugId} — stock updated`,
        { variant: 'success' },
      )
      setSubmitting(false)
      navigate('/inventory')
    }, 300)
  }

  return (
    <div className="flex-1 p-6 space-y-6 max-w-2xl">
      <PageHeader
        title="Receive Stock"
        breadcrumb={[{ label: 'Inventory', to: '/inventory' }, { label: 'Receive' }]}
      />

      {/* Current qty preview — shown once drug is selected */}
      {selectedDrug && (
        <div className="flex items-center gap-4 px-4 py-3 bg-bg-subtle rounded-card border border-border">
          <div className="flex-1">
            <p className="type-body-sm font-medium text-text-primary">{selectedDrug.drug}</p>
            <p className="type-label text-text-secondary mt-0.5">
              DIN {selectedDrug.din} · Lot {selectedDrug.lot} · Expires {selectedDrug.expiryDate}
            </p>
          </div>
          <div className="text-right shrink-0">
            <p className="type-mono-data text-text-primary font-semibold">{selectedDrug.qtyOnHand}</p>
            <p className="type-label text-text-secondary">current on-hand</p>
          </div>
          {selectedDrug.isSchedule && (
            <StatusPill variant="schedule">
              {selectedDrug.scheduleClass ? `Sch ${selectedDrug.scheduleClass}` : 'SCHED'}
            </StatusPill>
          )}
        </div>
      )}

      <div className="bg-bg-surface rounded-card shadow-card border border-border p-6 space-y-5">
        <h2 className="type-card-title text-text-primary">Delivery Details</h2>

        <FormField label="Drug" required error={errFor(drugId)}>
          {(p) => (
            <Select {...p} value={drugId} onChange={(e) => setDrugId(e.target.value)}>
              <option value="">Select drug…</option>
              {stock.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.drug}{s.isSchedule ? ` (Schedule ${s.scheduleClass ?? ''})` : ''}
                </option>
              ))}
            </Select>
          )}
        </FormField>

        <FormField label="Supplier" required error={errFor(supplier)}>
          {(p) => (
            <Select {...p} value={supplier} onChange={(e) => setSupplier(e.target.value)}>
              <option value="">Select supplier…</option>
              {activeSuppliers.map((s) => (
                <option key={s.id} value={s.name}>{s.name}</option>
              ))}
            </Select>
          )}
        </FormField>

        <div className="grid grid-cols-2 gap-4">
          <FormField label="Quantity received" required error={errFor(qty)}>
            {(p) => (
              <Input
                {...p}
                type="number"
                inputMode="numeric"
                min="1"
                value={qty}
                onChange={(e) => setQty(e.target.value)}
                className="type-mono-input"
                placeholder="e.g. 250"
              />
            )}
          </FormField>
          <FormField label="Lot #" required error={errFor(lot)}>
            {(p) => (
              <Input
                {...p}
                value={lot}
                onChange={(e) => setLot(e.target.value)}
                className="type-mono-input"
                placeholder="LOT-26-XXXX"
              />
            )}
          </FormField>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField label="Expiry date" required error={errFor(expiry)}>
            {(p) => (
              <Input
                {...p}
                type="date"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
              />
            )}
          </FormField>
          <FormField label="Unit cost (JMD)" required error={errFor(cost)}>
            {(p) => (
              <Input
                {...p}
                type="number"
                inputMode="decimal"
                step="0.01"
                min="0"
                value={cost}
                onChange={(e) => setCost(e.target.value)}
                className="type-mono-input"
                placeholder="e.g. 2100"
              />
            )}
          </FormField>
        </div>

        <FormField label="Notes">
          {(p) => (
            <Textarea
              {...p}
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Invoice reference, delivery condition, discrepancy notes…"
            />
          )}
        </FormField>

        {/* Preview: what qty will look like after receive */}
        {selectedDrug && qty && !isNaN(parseInt(qty, 10)) && parseInt(qty, 10) > 0 && (
          <div className="flex items-center gap-2 px-3 py-2 bg-success/10 rounded-control border border-success/20 text-xs text-text-secondary">
            <span>After receive:</span>
            <span className="font-semibold text-text-primary type-mono-data">
              {selectedDrug.qtyOnHand} + {parseInt(qty, 10)} = {selectedDrug.qtyOnHand + parseInt(qty, 10)} units
            </span>
          </div>
        )}

        <div className="flex gap-3 pt-2">
          <Button variant="secondary" onClick={() => navigate('/inventory')} disabled={submitting}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave} loading={submitting}>
            {submitting ? 'Receiving…' : 'Submit & Receive'}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ReceiveStockPage
