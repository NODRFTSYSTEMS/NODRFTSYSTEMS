import { describe, expect, it } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ToastProvider, useToast } from './Toast'

function TriggerButton({ message, variant }: { message: string; variant?: 'success' | 'error' | 'info' }) {
  const toast = useToast()
  return <button onClick={() => toast.show(message, { variant, durationMs: 1000 })}>Trigger</button>
}

describe('Toast', () => {
  it('shows a toast on demand and dismisses on close button click', async () => {
    render(
      <ToastProvider>
        <TriggerButton message="Settings saved" />
      </ToastProvider>,
    )

    expect(screen.queryByText('Settings saved')).not.toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: /trigger/i }))
    expect(screen.getByText('Settings saved')).toBeInTheDocument()

    const dismiss = screen.getByRole('button', { name: /dismiss/i })
    await userEvent.click(dismiss)
    expect(screen.queryByText('Settings saved')).not.toBeInTheDocument()
  })

  it('renders inside a notifications region with aria-live=polite', async () => {
    render(
      <ToastProvider>
        <TriggerButton message="hello" />
      </ToastProvider>,
    )
    await userEvent.click(screen.getByRole('button', { name: /trigger/i }))
    const region = screen.getByRole('region', { name: /notifications/i })
    expect(region).toHaveAttribute('aria-live', 'polite')
  })

  it('throws if useToast is used outside ToastProvider', () => {
    const consoleError = console.error
    console.error = () => {} // silence React's expected error log
    expect(() => {
      function Naked() {
        useToast()
        return null
      }
      render(<Naked />)
    }).toThrow(/within <ToastProvider>/)
    console.error = consoleError
  })

  // Exhaust the unused-import warning so the file still works if act becomes needed later.
  it('act import is reserved for future timer tests', () => {
    expect(typeof act).toBe('function')
  })
})
