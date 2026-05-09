import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { PrescriptionDetailPage } from './PrescriptionDetailPage'
import { ToastProvider } from '@/components/Toast'

// Suppress OpenFDA network calls in tests
beforeEach(() => {
  vi.spyOn(globalThis, 'fetch').mockResolvedValue({
    ok: true,
    json: async () => ({ results: [] }),
  } as Response)
})

afterEach(() => {
  vi.restoreAllMocks()
})

function renderForRx(rxId: string) {
  return render(
    <ToastProvider>
      <MemoryRouter initialEntries={[`/prescriptions/${rxId}`]}>
        <Routes>
          <Route path="/prescriptions/:id" element={<PrescriptionDetailPage />} />
        </Routes>
      </MemoryRouter>
    </ToastProvider>,
  )
}

describe('PrescriptionDetailPage', () => {
  it('renders not-found placeholder for an unknown prescription', () => {
    renderForRx('RX-INVALID')
    expect(screen.getByText(/not found/i)).toBeInTheDocument()
  })

  it('renders the Rx number as the page title (RX001)', () => {
    renderForRx('RX001')
    expect(screen.getByText('RX-2026-0847')).toBeInTheDocument()
  })

  it('shows the backend integration pending banner', () => {
    renderForRx('RX001')
    expect(screen.getByText(/Backend integration in progress/i)).toBeInTheDocument()
    expect(screen.getByText(/G2/i)).toBeInTheDocument()
  })

  it('renders the workflow stage progression', () => {
    renderForRx('RX001')
    // Stage labels appear in the workflow card — use getAllByText since the
    // current status ('Received') also appears in the page subtitle.
    expect(screen.getAllByText('Received').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Verified').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Filled').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Dispensed').length).toBeGreaterThan(0)
  })

  it('renders the Refills card with authorised and remaining counts', () => {
    // RX004 — Marcia Brown — 11 refills authorised, 11 remaining
    renderForRx('RX004')
    expect(screen.getByText(/11 of 11 remaining/i)).toBeInTheDocument()
  })

  it('shows "No refills left" warning for a 0-refill prescription', () => {
    // RX003 — Devon Williams — Amoxicillin, 0 refills
    renderForRx('RX003')
    expect(screen.getByText(/No refills left/i)).toBeInTheDocument()
  })

  it('action button is disabled for an active (non-dispensed) prescription', () => {
    renderForRx('RX001')
    const verifyBtn = screen.getByRole('button', { name: /Verify/i })
    expect(verifyBtn).toBeDisabled()
  })

  it('shows Completed status pill for a dispensed prescription instead of action button', () => {
    // RX007 — Rohan Stewart — Dispensed
    renderForRx('RX007')
    expect(screen.getByText('Completed')).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /Verify|Fill|Dispense/i })).not.toBeInTheDocument()
  })

  it('renders drug interactions section', () => {
    renderForRx('RX004') // multi-drug — triggers OpenFDA section
    expect(screen.getByText(/Drug Interactions/i)).toBeInTheDocument()
  })

  it('renders Back to queue link', () => {
    renderForRx('RX001')
    expect(screen.getByRole('link', { name: /back to queue/i })).toHaveAttribute('href', '/prescriptions')
  })

  it('links to patient record when patient exists', () => {
    renderForRx('RX001') // Marcus Reid — P001
    const patientLink = screen.getByRole('link', { name: /Marcus Reid/i })
    expect(patientLink).toHaveAttribute('href', '/patients/P001')
  })
})
