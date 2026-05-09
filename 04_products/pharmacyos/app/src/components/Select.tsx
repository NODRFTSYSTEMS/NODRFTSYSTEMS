import { forwardRef, type SelectHTMLAttributes } from 'react'
import { CaretDown } from '@phosphor-icons/react'

/**
 * Select — design handoff Section 4.7.
 * Native <select> styled to match Input. Uses appearance:none + a custom caret.
 */
type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  invalid?: boolean
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { invalid, className = '', children, ...rest },
  ref,
) {
  const computedInvalid = rest['aria-invalid'] ?? invalid
  return (
    <div className="relative">
      <select
        ref={ref}
        className={[
          'h-10 pl-3 pr-9 type-body-sm text-text-primary w-full',
          'bg-bg-surface border rounded-control transition-shadow appearance-none',
          'focus:outline-none focus:ring-[3px] focus:ring-primary/20',
          'disabled:bg-bg-subtle disabled:text-text-disabled disabled:cursor-not-allowed',
          computedInvalid
            ? 'border-error focus:border-error focus:ring-error/20'
            : 'border-border focus:border-primary',
          className,
        ].join(' ')}
        aria-invalid={computedInvalid || undefined}
        {...rest}
      >
        {children}
      </select>
      <CaretDown
        size={14}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none"
        aria-hidden="true"
      />
    </div>
  )
})
