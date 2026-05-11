import { useState } from 'react'
import { Plus, Phone, Envelope, X, Check } from '@phosphor-icons/react'
import { PageHeader } from '@/components/PageHeader'
import { Button } from '@/components/Button'
import { StatusPill } from '@/components/StatusPill'
import { FormField } from '@/components/Input'
import { Input } from '@/components/Input'
import { Select } from '@/components/Select'
import { useToast } from '@/components/Toast'
import { useInventoryStore } from '@/stores/inventory'

/**
 * Suppliers page — reads from the inventory store (Zustand persist).
 * Add Supplier form is inline (no new route — same UX as filtering+adding in-place).
 */
export function SuppliersPage() {
  const toast = useToast()
  const { suppliers, addSupplier, updateSupplier, nextSupplierId } = useInventoryStore()

  const [formOpen, setFormOpen] = useState(false)
  const [submitAttempted, setSubmitAttempted] = useState(false)
  const [saving, setSaving] = useState(false)

  // Form state
  const [name, setName] = useState('')
  const [contact, setContact] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [location, setLocation] = useState('')
  const [status, setStatus] = useState<'Active' | 'Inactive'>('Active')

  const active = suppliers.filter((s) => s.status === 'Active').length

  const errFor = (value: string) =>
    submitAttempted && !value.trim() ? 'Required' : undefined

  function resetForm() {
    setName(''); setContact(''); setPhone(''); setEmail(''); setLocation('')
    setStatus('Active'); setSubmitAttempted(false)
  }

  function openForm() {
    resetForm()
    setFormOpen(true)
  }

  function handleCancel() {
    resetForm()
    setFormOpen(false)
  }

  function handleSave() {
    if (!name.trim() || !contact.trim() || !phone.trim() || !email.trim() || !location.trim()) {
      setSubmitAttempted(true)
      toast.show('Fill all required fields', { variant: 'error' })
      return
    }
    setSaving(true)
    const today = new Date().toISOString().slice(0, 10)
    addSupplier({
      id: nextSupplierId(),
      name: name.trim(),
      contact: contact.trim(),
      phone: phone.trim(),
      email: email.trim().toLowerCase(),
      location: location.trim(),
      lastOrder: 'N/A',
      status,
    })
    setTimeout(() => {
      toast.show(`${name.trim()} added to supplier directory`, { variant: 'success' })
      setSaving(false)
      resetForm()
      setFormOpen(false)
    }, 300)
  }

  function toggleStatus(id: string, current: 'Active' | 'Inactive') {
    const next = current === 'Active' ? 'Inactive' : 'Active'
    updateSupplier(id, { status: next })
    toast.show(`Supplier status updated to ${next}`, { variant: 'success' })
  }

  return (
    <div className="flex flex-col h-full">
      <PageHeader
        title="Rx Suppliers"
        subtitle={`${suppliers.length} on file · ${active} active`}
        cta={
          !formOpen ? (
            <Button variant="primary" size="md" onClick={openForm}>
              <Plus size={16} weight="bold" />
              Add Supplier
            </Button>
          ) : (
            <Button variant="secondary" size="md" onClick={handleCancel}>
              <X size={16} weight="bold" />
              Cancel
            </Button>
          )
        }
      />

      <section className="flex-1 p-6 overflow-y-auto space-y-4">

        {/* ── Inline Add Supplier form ──────────────────────────────────────── */}
        {formOpen && (
          <div className="bg-bg-surface rounded-card shadow-card border border-primary/30 p-6 space-y-5 animate-in slide-in-from-top-2 duration-150">
            <div className="flex items-center justify-between">
              <h2 className="type-card-title text-text-primary">New Supplier</h2>
              <button
                type="button"
                onClick={handleCancel}
                aria-label="Cancel add supplier"
                className="w-7 h-7 rounded-control flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-bg-subtle transition-colors"
              >
                <X size={14} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField label="Company name" required error={errFor(name)}>
                {(p) => (
                  <Input
                    {...p}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Caribbean Drug Supply"
                  />
                )}
              </FormField>
              <FormField label="Contact name" required error={errFor(contact)}>
                {(p) => (
                  <Input
                    {...p}
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder="e.g. Dianne Foster"
                  />
                )}
              </FormField>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField label="Phone" required error={errFor(phone)}>
                {(p) => (
                  <Input
                    {...p}
                    type="tel"
                    inputMode="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="876-XXX-XXXX"
                    className="type-mono-input"
                  />
                )}
              </FormField>
              <FormField label="Email" required error={errFor(email)}>
                {(p) => (
                  <Input
                    {...p}
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="orders@supplier.com"
                  />
                )}
              </FormField>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField label="Location" required error={errFor(location)}>
                {(p) => (
                  <Input
                    {...p}
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Kingston, JA"
                  />
                )}
              </FormField>
              <FormField label="Status">
                {(p) => (
                  <Select
                    {...p}
                    value={status}
                    onChange={(e) => setStatus(e.target.value as 'Active' | 'Inactive')}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </Select>
                )}
              </FormField>
            </div>

            <div className="flex items-center justify-end gap-3 pt-1">
              <Button variant="secondary" size="md" onClick={handleCancel} disabled={saving}>
                Cancel
              </Button>
              <Button variant="primary" size="md" onClick={handleSave} loading={saving}>
                <Check size={16} weight="bold" />
                {saving ? 'Saving…' : 'Add Supplier'}
              </Button>
            </div>
          </div>
        )}

        {/* ── Supplier table ────────────────────────────────────────────────── */}
        <div className="bg-bg-surface rounded-card shadow-card overflow-hidden">
          {suppliers.length === 0 ? (
            <div className="py-12 text-center">
              <p className="type-body-sm text-text-secondary">No suppliers on file</p>
              <p className="type-label text-text-disabled mt-1">Add your first supplier above</p>
            </div>
          ) : (
            <table className="w-full">
              <caption className="sr-only">Pharmacy supplier directory</caption>
              <thead>
                <tr className="sticky top-0 z-10 bg-bg-subtle border-b border-border">
                  <th scope="col" className="h-9 px-4 text-left type-caption text-text-secondary">Supplier</th>
                  <th scope="col" className="h-9 px-4 text-left type-caption text-text-secondary">Contact</th>
                  <th scope="col" className="h-9 px-4 text-left type-caption text-text-secondary">Phone</th>
                  <th scope="col" className="h-9 px-4 text-left type-caption text-text-secondary">Email</th>
                  <th scope="col" className="h-9 px-4 text-left type-caption text-text-secondary">Location</th>
                  <th scope="col" className="h-9 px-4 text-left type-caption text-text-secondary">Last Order</th>
                  <th scope="col" className="h-9 px-4 text-left type-caption text-text-secondary">Status</th>
                </tr>
              </thead>
              <tbody>
                {suppliers.map((s) => (
                  <tr key={s.id} className="h-11 border-b border-border-subtle hover:bg-bg-subtle transition-colors">
                    <td className="px-4 type-body-sm font-medium text-text-primary">{s.name}</td>
                    <td className="px-4 type-body-sm text-text-primary">{s.contact}</td>
                    <td className="px-4">
                      <span className="inline-flex items-center gap-1.5 type-mono-data text-text-secondary">
                        <Phone size={12} aria-hidden="true" />
                        {s.phone}
                      </span>
                    </td>
                    <td className="px-4">
                      <span className="inline-flex items-center gap-1.5 type-body-xs text-text-secondary">
                        <Envelope size={12} aria-hidden="true" />
                        {s.email}
                      </span>
                    </td>
                    <td className="px-4 type-body-xs text-text-secondary">{s.location}</td>
                    <td className="px-4 type-mono-data text-text-secondary">{s.lastOrder}</td>
                    <td className="px-4">
                      <button
                        type="button"
                        onClick={() => toggleStatus(s.id, s.status)}
                        title={`Click to mark ${s.status === 'Active' ? 'inactive' : 'active'}`}
                        className="focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded"
                      >
                        <StatusPill variant={s.status === 'Active' ? 'success' : 'neutral'}>
                          {s.status}
                        </StatusPill>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>
    </div>
  )
}

export default SuppliersPage
