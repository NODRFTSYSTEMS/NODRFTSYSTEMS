/**
 * Theme store — persists dark/light mode preference.
 * Applies `dark` class to `<html>` so CSS token overrides take effect.
 * Initialize: call `initTheme()` once on app boot (before first render if possible).
 */
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Theme = 'light' | 'dark'

interface ThemeStore {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggle: () => void
}

function applyTheme(theme: Theme) {
  if (theme === 'dark') {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

/** Call on app mount to re-apply persisted theme before paint. */
export function initTheme() {
  try {
    const stored = JSON.parse(localStorage.getItem('pharmacyos-theme') ?? '{}')
    applyTheme((stored?.state?.theme as Theme) ?? 'light')
  } catch {
    // ignore parse errors — default light
  }
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      theme: 'light',
      setTheme: (theme) => {
        set({ theme })
        applyTheme(theme)
      },
      toggle: () => {
        const next: Theme = get().theme === 'light' ? 'dark' : 'light'
        set({ theme: next })
        applyTheme(next)
      },
    }),
    { name: 'pharmacyos-theme' },
  ),
)
