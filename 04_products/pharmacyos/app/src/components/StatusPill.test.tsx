import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { StatusPill } from './StatusPill'

describe('StatusPill', () => {
  it('renders the children text', () => {
    render(<StatusPill variant="success">Active</StatusPill>)
    expect(screen.getByText('Active')).toBeInTheDocument()
  })

  it('renders all 11 variants without crashing', () => {
    const variants = [
      'received', 'verified', 'filled', 'dispensed',
      'success', 'warning', 'error', 'info', 'neutral',
      'schedule', 'nhf',
    ] as const
    for (const v of variants) {
      const { unmount } = render(<StatusPill variant={v}>{v}</StatusPill>)
      expect(screen.getByText(v)).toBeInTheDocument()
      unmount()
    }
  })

  it('passes through className', () => {
    render(<StatusPill variant="success" className="custom-class">x</StatusPill>)
    expect(screen.getByText('x')).toHaveClass('custom-class')
  })
})
