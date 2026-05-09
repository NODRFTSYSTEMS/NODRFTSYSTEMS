import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { QueuePage } from './QueuePage'
import { ToastProvider } from '@/components/Toast'

function renderPage() {
  return render(
    <ToastProvider>
      <MemoryRouter>
        <QueuePage />
      </MemoryRouter>
    </ToastProvider>,
  )
}

describe('QueuePage', () => {
  it('renders all four kanban column headings', () => {
    renderPage()
    expect(screen.getByText(/Received \(\d+\)/i)).toBeInTheDocument()
    expect(screen.getByText(/Verified \(\d+\)/i)).toBeInTheDocument()
    expect(screen.getByText(/Filled \(\d+\)/i)).toBeInTheDocument()
    expect(screen.getByText(/Dispensed \(\d+\)/i)).toBeInTheDocument()
  })

  it('prescription cards are navigable links', () => {
    renderPage()
    const cards = screen.getAllByRole('link').filter((l) =>
      l.getAttribute('href')?.startsWith('/prescriptions/RX'),
    )
    expect(cards.length).toBeGreaterThan(0)
  })

  it('renders refill count on prescription cards that have refills set', () => {
    renderPage()
    // Sample data includes prescriptions with refills — "X refills" text appears
    const refillLabels = screen.getAllByText(/\d+ refill/i)
    expect(refillLabels.length).toBeGreaterThan(0)
  })

  it('renders "0 refills" in warning colour for zero-refill cards', () => {
    renderPage()
    // Use exact boundary — /\b0 refills\b/ avoids matching "10 refills"
    const zeroRefill = screen.getAllByText(/^0 refills$/)
    expect(zeroRefill.length).toBeGreaterThan(0)
    // At least one zero-refill element should carry text-warning
    const hasWarning = zeroRefill.some((el) => el.className.includes('text-warning'))
    expect(hasWarning).toBe(true)
  })

  it('renders schedule badge for scheduled drugs', () => {
    renderPage()
    const schedBadges = screen.getAllByText('SCHED')
    expect(schedBadges.length).toBeGreaterThan(0)
  })

  it('New Rx button is present', () => {
    renderPage()
    expect(screen.getByRole('button', { name: /New Rx/i })).toBeInTheDocument()
  })
})
