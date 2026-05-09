import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Input, FormField } from './Input'

describe('FormField + Input', () => {
  it('associates label with input via htmlFor/id', () => {
    render(
      <FormField label="Email">
        {(p) => <Input {...p} type="email" />}
      </FormField>,
    )
    const input = screen.getByLabelText('Email')
    expect(input).toBeInTheDocument()
    expect(input.tagName).toBe('INPUT')
  })

  it('emits aria-required when required', () => {
    render(
      <FormField label="Email" required>
        {(p) => <Input {...p} />}
      </FormField>,
    )
    expect(screen.getByLabelText(/email/i)).toHaveAttribute('aria-required', 'true')
  })

  it('emits aria-invalid + aria-describedby + role=alert when error is set', () => {
    render(
      <FormField label="Email" error="Email is required">
        {(p) => <Input {...p} />}
      </FormField>,
    )
    const input = screen.getByLabelText('Email')
    expect(input).toHaveAttribute('aria-invalid', 'true')
    const errorId = input.getAttribute('aria-describedby')
    expect(errorId).toBeTruthy()
    const errorEl = document.getElementById(errorId!)
    expect(errorEl).toHaveAttribute('role', 'alert')
    expect(errorEl).toHaveTextContent('Email is required')
  })

  it('links helper text via aria-describedby when no error', () => {
    render(
      <FormField label="Phone" helper="Format: 876-555-0123">
        {(p) => <Input {...p} />}
      </FormField>,
    )
    const input = screen.getByLabelText('Phone')
    const helperId = input.getAttribute('aria-describedby')
    expect(helperId).toBeTruthy()
    expect(document.getElementById(helperId!)).toHaveTextContent('Format: 876-555-0123')
    expect(input).not.toHaveAttribute('aria-invalid')
  })

  it('marks the required asterisk as decorative (aria-hidden)', () => {
    const { container } = render(
      <FormField label="Name" required>
        {(p) => <Input {...p} />}
      </FormField>,
    )
    const asterisk = container.querySelector('label span[aria-hidden="true"]')
    expect(asterisk).toHaveTextContent('*')
  })
})
