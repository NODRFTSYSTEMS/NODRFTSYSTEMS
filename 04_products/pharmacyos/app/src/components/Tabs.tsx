import { useState, useCallback, type ReactNode, type KeyboardEvent } from 'react'

/**
 * Tabs — design handoff Section 4.16.
 * Underline-indicator pattern with WAI-ARIA tab navigation.
 *
 * Keyboard: Left/Right arrows rotate focus within tablist.
 * Home jumps to first tab, End jumps to last.
 */
export type TabDef = {
  value: string
  label: string
  content: ReactNode
}

export function Tabs({
  tabs,
  defaultValue,
  className = '',
}: {
  tabs: readonly TabDef[]
  defaultValue?: string
  className?: string
}) {
  const [active, setActive] = useState(() => defaultValue ?? tabs[0]?.value ?? '')
  const activeTab = tabs.find((t) => t.value === active)

  const focusTab = useCallback(
    (index: number) => {
      const tab = tabs[index]
      if (tab) setActive(tab.value)
    },
    [tabs],
  )

  function handleKeyDown(e: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (tabs.length === 0) return
    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault()
        focusTab((index - 1 + tabs.length) % tabs.length)
        break
      case 'ArrowRight':
        e.preventDefault()
        focusTab((index + 1) % tabs.length)
        break
      case 'Home':
        e.preventDefault()
        focusTab(0)
        break
      case 'End':
        e.preventDefault()
        focusTab(tabs.length - 1)
        break
    }
  }

  return (
    <div className={`flex flex-col ${className}`}>
      <div role="tablist" aria-label="Tabs" className="flex border-b border-border">
        {tabs.map((t, i) => {
          const isActive = active === t.value
          return (
            <button
              key={t.value}
              type="button"
              role="tab"
              id={`tab-${t.value}`}
              aria-selected={isActive}
              aria-controls={`panel-${t.value}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActive(t.value)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              className={[
                'h-10 px-4 type-body-sm font-medium transition-colors -mb-px border-b-2',
                isActive
                  ? 'text-primary border-primary'
                  : 'text-text-secondary border-transparent hover:text-text-primary',
              ].join(' ')}
            >
              {t.label}
            </button>
          )
        })}
      </div>
      {activeTab && (
        <div
          role="tabpanel"
          id={`panel-${activeTab.value}`}
          aria-labelledby={`tab-${activeTab.value}`}
          className="flex-1 min-h-0 pt-6"
        >
          {activeTab.content}
        </div>
      )}
    </div>
  )
}

export default Tabs
