import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Role } from '@/types/auth'
import { ROUTE_PERMISSIONS, type RoutePermissionKey } from '@/config/route-permissions'

/**
 * Permissions store — sample-mode runtime overrides + acting-role demo switcher.
 *
 * Two purposes:
 * 1. **Acting role**: until Supabase Auth wires up (Slice 22+), the UI needs a way to
 *    "act as" a role so reviewers can verify permission filtering. The role-switcher in
 *    the Sidebar reads/writes `actingRole` here. Real session replaces this.
 * 2. **Runtime permission overrides**: admins can change the role-to-route matrix from
 *    the Permissions admin page. Until Supabase persists these to a `route_permissions`
 *    table, they're stored client-side via Zustand persist (localStorage) so they
 *    survive page refresh during evaluation. Real backend stores them.
 *
 * Authority: ADR Decision 7 (3-layer enforcement model — RLS + Edge Function + UI guard).
 * This store is the UI guard. RLS is the security boundary; this is UX + reviewer demo.
 */

type PermissionOverrides = Partial<Record<RoutePermissionKey, readonly Role[]>>

interface PermissionsState {
  /** Current "acting as" role for the sample-mode demo. Replaced by real session.user.role when auth wires. */
  actingRole: Role
  setActingRole: (role: Role) => void

  /** Per-route role overrides set by an admin via the Permissions page. */
  overrides: PermissionOverrides
  setOverride: (key: RoutePermissionKey, roles: readonly Role[]) => void
  resetOverride: (key: RoutePermissionKey) => void
  resetAll: () => void

  /** Effective roles for a route — overrides ?? static. */
  effectiveRoles: (key: RoutePermissionKey) => readonly Role[]

  /** True if `role` can access the route key under the current effective rules. */
  canRoleAccess: (role: Role, key: RoutePermissionKey) => boolean
}

export const usePermissionsStore = create<PermissionsState>()(
  persist(
    (set, get) => ({
      actingRole: 'admin',
      setActingRole: (role) => set({ actingRole: role }),

      overrides: {},
      setOverride: (key, roles) =>
        set((state) => ({ overrides: { ...state.overrides, [key]: roles } })),
      resetOverride: (key) =>
        set((state) => {
          const next = { ...state.overrides }
          delete next[key]
          return { overrides: next }
        }),
      resetAll: () => set({ overrides: {} }),

      effectiveRoles: (key) => {
        const override = get().overrides[key]
        if (override) return override
        return ROUTE_PERMISSIONS[key].roles
      },

      canRoleAccess: (role, key) => {
        return get().effectiveRoles(key).includes(role)
      },
    }),
    {
      name: 'pharmacyos-permissions',
      // Persist only the overrides + actingRole; not the function references (zustand handles this automatically)
      partialize: (state) => ({ actingRole: state.actingRole, overrides: state.overrides }),
    },
  ),
)
