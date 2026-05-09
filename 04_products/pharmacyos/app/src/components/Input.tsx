import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from 'react'

/**
 * FormField — wraps an input with label, helper text, and error state.
 * Authority: design handoff Section 4.7 + AAA audit C6 (aria-* linkage).
 *
 * The render-prop receives an object with `id`, `aria-required`,
 * `aria-invalid`, and `aria-describedby` already wired — spread it onto
 * the inner control:
 *
 *   <FormField label="Email" required error={err}>
 *     {(p) => <Input type="email" {...p} value={v} onChange={...} />}
 *   </FormField>
 */

export type FormFieldRenderProps = {
  id: string
  'aria-required'?: boolean
  'aria-invalid'?: boolean
  'aria-describedby'?: string
}

export type FormFieldProps = {
  label: string
  required?: boolean
  helper?: string
  error?: string
  children: (props: FormFieldRenderProps) => ReactNode
  className?: string
}

export function FormField({ label, required, helper, error, children, className = '' }: FormFieldProps) {
  const id = useId()
  const helperId = `${id}-helper`
  const errorId = `${id}-error`
  const ariaDescribedBy = error ? errorId : helper ? helperId : undefined
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label htmlFor={id} className="type-label text-text-primary">
        {label}
        {required && (
          <span className="text-error ml-0.5" aria-hidden="true">
            *
          </span>
        )}
      </label>
      {children({
        id,
        'aria-required': required || undefined,
        'aria-invalid': error ? true : undefined,
        'aria-describedby': ariaDescribedBy,
      })}
      {error ? (
        <p id={errorId} role="alert" className="text-xs text-error">
          {error}
        </p>
      ) : helper ? (
        <p id={helperId} className="text-xs text-text-secondary">
          {helper}
        </p>
      ) : null}
    </div>
  )
}

/**
 * Input — text/email/password/tel/number/search/date/time/datetime-local.
 * Pair with FormField for label + helper. Spreads aria-* automatically when
 * receiving FormField render-props.
 */
type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  invalid?: boolean
  mono?: boolean
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { invalid, mono, className = '', ...rest },
  ref,
) {
  // aria-invalid passed through rest takes precedence; derive from `invalid` prop only when not set
  const computedInvalid = rest['aria-invalid'] ?? invalid
  return (
    <input
      ref={ref}
      className={[
        'h-10 px-3 type-body-sm text-text-primary',
        'bg-bg-surface border rounded-control transition-shadow',
        'placeholder:text-text-disabled',
        'focus:outline-none focus:ring-[3px] focus:ring-primary/20',
        'disabled:bg-bg-subtle disabled:text-text-disabled disabled:cursor-not-allowed',
        computedInvalid
          ? 'border-error focus:border-error focus:ring-error/20'
          : 'border-border focus:border-primary',
        mono ? 'type-mono-input' : '',
        className,
      ].join(' ')}
      aria-invalid={computedInvalid || undefined}
      {...rest}
    />
  )
})
