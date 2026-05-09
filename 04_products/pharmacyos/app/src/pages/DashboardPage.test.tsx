import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { DashboardPage } from './DashboardPage'
import { ToastProvider } from '@/components/Toast'

function renderPage() {
  return render(
    <ToastProvider>
      <MemoryRouter>
        <DashboardPage />
      </MemoryRouter>
    </ToastProvider>,
  )
}

describe('DashboardPage', () => {
  it('renders the page heading', () => {
    renderPage()
    expect(screen.getByRole('heading', { name: /Dashboard/i })).toBeInTheDocument()
  })

  it('renders all four metric card labels', () => {
    renderPage()
    // Some labels appear more than once (e.g. "Stock Alerts" is both a metric card
    // and a section heading) — use getAllByText and assert at least one exists.
    expect(screen.getAllByText('Rx Queue').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Stock Alerts').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Sales Today').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Patients Served').length).toBeGreaterThan(0)
  })

  it('metric cards are <a> links with correct hrefs', () => {
    renderPage()
    const rxLink = screen.getByRole('link', { name: /Rx Queue/i })
    expect(rxLink).toHaveAttribute('href', '/prescriptions')

    const alertsLink = screen.getByRole('link', { name: /Stock Alerts/i })
    expect(alertsLink).toHaveAttribute('href', '/inventory/alerts')

    const salesLink = screen.getByRole('link', { name: /Sales Today/i })
    expect(salesLink).toHaveAttribute('href', '/pos/reports')

    const patientsLink = screen.getByRole('link', { name: /Patients Served/i })
    expect(patientsLink).toHaveAttribute('href', '/patients')
  })

  it('renders the Prescription Board section', () => {
    renderPage()
    expect(screen.getByRole('region', { name: /Prescription Board/i })).toBeInTheDocument()
  })

  it('prescription kanban cards are links to /prescriptions/:id', () => {
    renderPage()
    // At least one active prescription exists in sample data
    const rxLinks = screen.getAllByRole('link').filter((l) =>
      l.getAttribute('href')?.startsWith('/prescriptions/RX'),
    )
    expect(rxLinks.length).toBeGreaterThan(0)
    rxLinks.forEach((link) => {
      expect(link.getAttribute('href')).toMatch(/^\/prescriptions\/RX\d+$/)
    })
  })

  it('renders the Stock Alerts section', () => {
    renderPage()
    expect(screen.getByRole('region', { name: /Stock Alerts/i })).toBeInTheDocument()
  })

  it('renders the Recent Activity table', () => {
    renderPage()
    expect(screen.getByRole('table')).toBeInTheDocument()
  })
})
