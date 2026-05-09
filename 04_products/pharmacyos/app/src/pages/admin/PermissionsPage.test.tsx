import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { PermissionsPage } from './PermissionsPage'
import { ToastProvider } from '@/components/Toast'
import { usePermissionsStore } from '@/stores/permissions'

beforeEach(() => {
  localStorage.clear()
  usePermissionsStore.setState({ actingRole: 'admin', overrides: {} })
})

afterEach(() => {
  localStorage.clear()
})

function renderPage() {
  return render(
    <ToastProvider>
      <MemoryRouter>
        <PermissionsPage />
      </MemoryRouter>
    </ToastProvider>,
  )
}

describe('PermissionsPage', () => {
  it('renders the matrix banner explaining UI guard vs RLS', () => {
    renderPage()
    expect(screen.getByText(/UI guards/i)).toBeInTheDocument()
    expect(screen.getByText(/Row-Level Security/i)).toBeInTheDocument()
  })

  it('renders all 8 route groups as collapsible sections', () => {
    renderPage()
    expect(screen.getByRole('heading', { name: /Inventory$/ })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Prescriptions/ })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Patients/ })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Reports$/ })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Retail POS/ })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Admin$/ })).toBeInTheDocument()
  })

  it('opens Inventory by default and shows a row per inventory route', () => {
    renderPage()
    // Inventory group is open by default; route paths visible as table cells
    expect(screen.getByText('/inventory')).toBeInTheDocument()
    expect(screen.getByText('/inventory/catalog')).toBeInTheDocument()
    expect(screen.getByText('/inventory/scanner')).toBeInTheDocument()
  })

  it('Save button is disabled when no changes are made', () => {
    renderPage()
    expect(screen.getByRole('button', { name: /no changes/i })).toBeDisabled()
  })

  it('toggling a checkbox marks the row dirty and enables Save', async () => {
    renderPage()
    // Find the Cashier checkbox for /inventory route — should be unchecked by default
    const cashierInventoryCheckbox = screen.getByRole('checkbox', {
      name: /Cashier access to \/inventory$/,
    })
    expect(cashierInventoryCheckbox).not.toBeChecked()

    await userEvent.click(cashierInventoryCheckbox)
    expect(cashierInventoryCheckbox).toBeChecked()

    // Save button now shows pending change count
    expect(screen.getByRole('button', { name: /Save 1 Change/i })).toBeEnabled()
  })

  it('Save commits the override to the store', async () => {
    renderPage()
    const cashierInventoryCheckbox = screen.getByRole('checkbox', {
      name: /Cashier access to \/inventory$/,
    })
    await userEvent.click(cashierInventoryCheckbox)
    await userEvent.click(screen.getByRole('button', { name: /Save 1 Change/i }))

    // Store now has the override
    const state = usePermissionsStore.getState()
    expect(state.canRoleAccess('front_desk_cashier', '/inventory')).toBe(true)
  })

  it('Reset All clears overrides and restores defaults', async () => {
    // Pre-populate an override
    usePermissionsStore.getState().setOverride('/inventory', ['front_desk_cashier'])
    renderPage()

    const resetBtn = screen.getByRole('button', { name: /reset all/i })
    expect(resetBtn).toBeEnabled()
    await userEvent.click(resetBtn)
    expect(Object.keys(usePermissionsStore.getState().overrides).length).toBe(0)
  })
})
