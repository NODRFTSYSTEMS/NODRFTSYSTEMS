/**
 * Inventory store — stock items and supplier roster for PharmacyOS.
 *
 * Initialized from SAMPLE_STOCK and SAMPLE_SUPPLIERS.
 * In production (G2): replace initializers with Supabase queries.
 * The store interface is unchanged — swap the data source, not the contract.
 *
 * Persistence: localStorage key 'pharmacyos-inventory'.
 * Clears on reset().
 */
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { SAMPLE_STOCK, SAMPLE_SUPPLIERS, type StockItem, type Supplier } from '@/data/sample'

// ─── Receive record ───────────────────────────────────────────────────────────

export interface ReceiveEntry {
  drugId: string
  /** Quantity received (added to existing qtyOnHand). */
  qtyReceived: number
  /** New lot number from supplier. */
  lot: string
  /** New expiry date ISO string (YYYY-MM-DD). */
  expiry: string
  /** New unit cost in JMD. */
  costJmd: number
  /** Supplier name. */
  supplier: string
  /** Free-text notes from the receiving staff. */
  notes?: string
}

// ─── Store interface ──────────────────────────────────────────────────────────

export interface InventoryStore {
  stock: StockItem[]
  suppliers: Supplier[]

  /** Look up a stock item by id. */
  getStockById: (id: string) => StockItem | undefined

  /**
   * Receive a delivery for an existing drug SKU.
   * - Increments qtyOnHand by entry.qtyReceived
   * - Updates lot, expiryDate, unitCostJmd, and supplier to new values
   *
   * Note: adds qty to current on-hand (does not replace).
   * When the same drug has multiple active lots, a full lot-tracking system
   * is needed (post-G2 Supabase migration). For the demo, the latest receive
   * overwrites lot/expiry metadata.
   */
  receiveStock: (entry: ReceiveEntry) => void

  /** Add a new supplier to the roster. */
  addSupplier: (supplier: Supplier) => void

  /** Merge partial fields into an existing supplier by id. */
  updateSupplier: (id: string, patch: Partial<Supplier>) => void

  /** Look up a supplier by id. */
  getSupplierById: (id: string) => Supplier | undefined

  /** Returns the next available supplier ID (SUP-NNN). */
  nextSupplierId: () => string

  /** Reset both arrays to initial sample data. Used in tests and demo reset. */
  reset: () => void
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const INITIAL_STOCK = (): StockItem[] => structuredClone(SAMPLE_STOCK) as StockItem[]
const INITIAL_SUPPLIERS = (): Supplier[] => structuredClone(SAMPLE_SUPPLIERS) as Supplier[]

function today(): string {
  return new Date().toISOString().slice(0, 10)
}

// ─── Store ────────────────────────────────────────────────────────────────────

export const useInventoryStore = create<InventoryStore>()(
  persist(
    (set, get) => ({
      stock: INITIAL_STOCK(),
      suppliers: INITIAL_SUPPLIERS(),

      getStockById(id) {
        return get().stock.find((s) => s.id === id)
      },

      receiveStock(entry) {
        set((state) => {
          const idx = state.stock.findIndex((s) => s.id === entry.drugId)
          if (idx === -1) return state

          const item = state.stock[idx]
          const updated: StockItem = {
            ...item,
            qtyOnHand: item.qtyOnHand + entry.qtyReceived,
            lot: entry.lot,
            expiryDate: entry.expiry,
            unitCostJmd: entry.costJmd,
            supplier: entry.supplier,
          }

          const stock = [...state.stock]
          stock[idx] = updated
          return { stock }
        })
      },

      addSupplier(supplier) {
        set((state) => ({ suppliers: [...state.suppliers, supplier] }))
      },

      updateSupplier(id, patch) {
        set((state) => ({
          suppliers: state.suppliers.map((s) => (s.id === id ? { ...s, ...patch } : s)),
        }))
      },

      getSupplierById(id) {
        return get().suppliers.find((s) => s.id === id)
      },

      nextSupplierId() {
        const existing = get().suppliers.map((s) => {
          const n = parseInt(s.id.replace(/\D/g, ''), 10)
          return isNaN(n) ? 0 : n
        })
        const max = existing.length > 0 ? Math.max(...existing) : 0
        return `SUP${String(max + 1).padStart(2, '0')}`
      },

      reset() {
        set({ stock: INITIAL_STOCK(), suppliers: INITIAL_SUPPLIERS() })
      },
    }),
    {
      name: 'pharmacyos-inventory',
    },
  ),
)

// ─── Utility: today's date for lastOrder default ──────────────────────────────
export { today as inventoryToday }
