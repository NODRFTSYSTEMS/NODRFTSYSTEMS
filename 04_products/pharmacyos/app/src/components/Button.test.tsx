import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from './Button'

describe('Button', () => {
  it('renders children and is interactive by default', async () => {
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Save Changes</Button>)
    const btn = screen.getByRole('button', { name: /save changes/i })
    expect(btn).toBeInTheDocument()
    expect(btn).toHaveAttribute('type', 'button')
    await userEvent.click(btn)
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('shows a spinner and is disabled when loading=true', () => {
    render(<Button loading>Saving</Button>)
    const btn = screen.getByRole('button')
    expect(btn).toBeDisabled()
    expect(btn).toHaveAttribute('aria-busy', 'true')
  })

  it('honors disabled prop independently of loading', () => {
    render(<Button disabled>Disabled</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('renders all four variants without crashing', () => {
    const variants = ['primary', 'secondary', 'tertiary', 'destructive'] as const
    for (const v of variants) {
      const { unmount } = render(<Button variant={v}>{v}</Button>)
      expect(screen.getByRole('button', { name: v })).toBeInTheDocument()
      unmount()
    }
  })

  it('respects fullWidth prop', () => {
    render(<Button fullWidth>Wide</Button>)
    expect(screen.getByRole('button')).toHaveClass('w-full')
  })
})
