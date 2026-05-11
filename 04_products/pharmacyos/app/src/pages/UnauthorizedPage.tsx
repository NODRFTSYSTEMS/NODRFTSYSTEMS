import { Link, useLocation } from 'react-router-dom'
import { ShieldWarning, ArrowLeft } from '@phosphor-icons/react'
import { Button } from '@/components/Button'

const ROLE_LABELS: Record<string, string> = {
  pharmacist: 'Pharmacist',
  pharmacy_technician: 'Pharmacy Technician',
  front_desk_cashier: 'Front Desk / Cashier',
  manager: 'Manager',
  admin: 'Admin',
}

/**
 * Unauthorized (403) page — branded with PharmacyOS identity.
 * Receives location.state from RoleGuard with: { from, role, requiredRoles }.
 * Shows the user what role is needed and what role they currently have.
 * Access denial is logged by RoleGuard before redirect.
 */
export function UnauthorizedPage() {
  const location = useLocation()
  const state = location.state as { from?: string; role?: string; requiredRoles?: string[] } | null

  const currentRole = state?.role ? ROLE_LABELS[state.role] ?? state.role : null
  const neededRoles = state?.requiredRoles?.map((r) => ROLE_LABELS[r] ?? r)
  const attemptedPath = state?.from

  return (
    <div className="flex flex-1 items-center justify-center bg-bg-base p-6">
      <div className="text-center max-w-md">
        {/* PharmacyOS branding */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="flex items-center justify-center w-8 h-8 rounded bg-primary/20 text-primary font-bold text-sm">
            ℞
          </div>
          <p className="type-card-title text-text-primary">PharmacyOS</p>
        </div>

        <div className="w-16 h-16 rounded-pill bg-error/10 text-error flex items-center justify-center mx-auto mb-4">
          <ShieldWarning size={32} weight="duotone" />
        </div>

        <h1 className="type-page-title text-text-primary mb-2">Access Denied</h1>
        <p className="text-text-secondary mb-4">
          Your current role does not have permission to access this page.
        </p>

        {/* Contextual info — what role they have vs. what's needed */}
        {(currentRole || neededRoles) && (
          <div className="bg-bg-surface border border-border rounded-card p-4 mb-6 text-left">
            {currentRole && (
              <div className="flex items-center justify-between py-1.5">
                <span className="type-label text-text-secondary">Your role</span>
                <span className="type-body-sm font-medium text-text-primary">{currentRole}</span>
              </div>
            )}
            {attemptedPath && (
              <div className="flex items-center justify-between py-1.5 border-t border-border-subtle">
                <span className="type-label text-text-secondary">Route</span>
                <code className="type-mono-data text-text-secondary">{attemptedPath}</code>
              </div>
            )}
            {neededRoles && neededRoles.length > 0 && (
              <div className="flex items-center justify-between py-1.5 border-t border-border-subtle">
                <span className="type-label text-text-secondary">Required</span>
                <span className="type-body-xs text-text-primary">{neededRoles.join(', ')}</span>
              </div>
            )}
          </div>
        )}

        <p className="type-label text-text-disabled mb-6">
          Contact your administrator to request access or switch to an authorized role.
        </p>

        <Link to="/dashboard">
          <Button variant="primary">
            <ArrowLeft size={16} weight="bold" />
            Back to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default UnauthorizedPage
