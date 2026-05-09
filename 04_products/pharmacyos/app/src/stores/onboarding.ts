import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Role } from '@/types/auth'

/**
 * Onboarding store — tracks which roles have completed (or skipped) the
 * first-run role-specific walkthrough.
 *
 * Persisted per-device in localStorage so the overlay never fires twice
 * for the same role on the same machine. In production this would sync to
 * the user's profile via Supabase (Slice 22+); for now it's local-only.
 */

interface OnboardingState {
  /** Set of role keys whose onboarding tour has been dismissed. */
  completedRoles: Role[]

  /** Returns true if this role's tour has already been shown and dismissed. */
  isCompleted: (role: Role) => boolean

  /** Mark a role's tour as done (called on "Done" or "Skip"). */
  markCompleted: (role: Role) => void

  /** Reset a specific role (dev/testing only). */
  resetRole: (role: Role) => void

  /** Reset all completed roles (dev/testing only). */
  resetAll: () => void
}

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set, get) => ({
      completedRoles: [],

      isCompleted: (role) => get().completedRoles.includes(role),

      markCompleted: (role) =>
        set((state) => ({
          completedRoles: state.completedRoles.includes(role)
            ? state.completedRoles
            : [...state.completedRoles, role],
        })),

      resetRole: (role) =>
        set((state) => ({
          completedRoles: state.completedRoles.filter((r) => r !== role),
        })),

      resetAll: () => set({ completedRoles: [] }),
    }),
    {
      name: 'pharmacyos-onboarding',
    },
  ),
)
