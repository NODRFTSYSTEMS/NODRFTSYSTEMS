import type { PropsWithChildren } from 'react'
import { Navigate } from 'react-router-dom'
import type { Role } from '@/types/auth'
import { usePermissionsStore } from '@/stores/permissions'

type RoleGuardProps = PropsWithChildren<{
  roles: readonly Role[]
}>

/**
 * Role gate for role-restricted routes.
 *
 * Sample-mode (current — pre-Supabase): reads `actingRole` from the permissions
 * store. The role-switcher in the Sidebar lets reviewers act as any role to
 * verify permission filtering. If the acting role is not in `roles`, redirect
 * to /unauthorized.
 *
 * Production (post-Slice 22+ auth): reads from session.user.app_metadata.role
 * (custom JWT claim). Same enforcement logic; different source of role.
 *
 * Note: this is the UI enforcement layer. RLS at the database and Edge
 * Function JWT verification are the actual security boundaries per ADR
 * Decision 7. UI route guarding is UX, not security.
 */
export function RoleGuard({ roles, children }: RoleGuardProps) {
  const actingRole = usePermissionsStore((s) => s.actingRole)
  if (!roles.includes(actingRole)) {
    return <Navigate to="/unauthorized" replace />
  }
  return <>{children}</>
}
