import { forwardRef, type TextareaHTMLAttributes } from 'react'

/**
 * Textarea — design handoff Section 4.7. Multi-line free-text input.
 * Pairs with FormField for label + helper. Default height ~5 rows; resize: vertical.
 */
type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  invalid?: boolean
  mono?: boolean
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { invalid, mono, rows = 4, className = '', ...rest },
  ref,
) {
  const computedInvalid = rest['aria-invalid'] ?? invalid
  return (
    <textarea
      ref={ref}
      rows={rows}
      className={[
        'px-3 py-2 type-body-sm text-text-primary w-full',
        'bg-bg-surface border rounded-control transition-shadow',
        'placeholder:text-text-disabled resize-y',
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
