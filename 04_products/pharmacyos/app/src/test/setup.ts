import '@testing-library/jest-dom/vitest'
import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'

afterEach(() => {
  cleanup()
})

// jsdom doesn't implement scrollIntoView; stub it so components that call it during effects don't crash.
if (!Element.prototype.scrollIntoView) {
  Element.prototype.scrollIntoView = function () {}
}

// jsdom may not provide a complete localStorage implementation (missing .clear, .key, etc.).
// Provide a full in-memory Storage mock so persist-middleware tests and direct localStorage calls work.
;(() => {
  const _store: Record<string, string> = {}
  const mock: Storage = {
    getItem: (key: string) => _store[key] ?? null,
    setItem: (key: string, value: string) => {
      _store[key] = String(value)
    },
    removeItem: (key: string) => {
      delete _store[key]
    },
    clear: () => {
      for (const k of Object.keys(_store)) delete _store[k]
    },
    get length() {
      return Object.keys(_store).length
    },
    key: (index: number) => Object.keys(_store)[index] ?? null,
  }
  Object.defineProperty(globalThis, 'localStorage', {
    value: mock,
    writable: true,
    configurable: true,
  })
})()
