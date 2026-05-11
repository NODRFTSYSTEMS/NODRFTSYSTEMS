import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { ShieldCheck, Lightning } from '@phosphor-icons/react'
import { Button } from '@/components/Button'
import { Input, FormField } from '@/components/Input'
import { Checkbox } from '@/components/Checkbox'
import { usePermissionsStore } from '@/stores/permissions'
import { type Role } from '@/types/auth'

const IS_DEMO_MODE = import.meta.env.VITE_DEMO_MODE === 'true'

interface DemoRoleCard {
  role: Role
  label: string
  description: string
  accent: string
}

const DEMO_ROLE_CARDS: DemoRoleCard[] = [
  {
    role: 'admin',
    label: 'Admin',
    description: 'Full system — users, audit, settings, all modules',
    accent: 'border-primary/40 hover:border-primary',
  },
  {
    role: 'manager',
    label: 'Manager',
    description: 'KPIs, staff overview, compliance flags, all reports',
    accent: 'border-amber-500/40 hover:border-amber-400',
  },
  {
    role: 'pharmacist',
    label: 'Pharmacist',
    description: 'Verify Rx, drug interactions, patients, schedule log',
    accent: 'border-emerald-500/40 hover:border-emerald-400',
  },
  {
    role: 'pharmacy_technician',
    label: 'Technician',
    description: 'Fill queue, receive stock, inventory alerts',
    accent: 'border-sky-500/40 hover:border-sky-400',
  },
  {
    role: 'front_desk_cashier',
    label: 'Cashier',
    description: 'POS terminal, loyalty, patient check-in',
    accent: 'border-violet-500/40 hover:border-violet-400',
  },
]

/**
 * Login — design handoff Section 4.13.
 * UI-only at the scaffold milestone; submitting routes to /login/2fa.
 * Real authentication wires up after Supabase login + DB password (G2).
 *
 * Demo mode (VITE_DEMO_MODE=true): shows role quick-access cards that
 * bypass the credential form and navigate directly to /dashboard.
 * This lets reviewers test every role without re-entering credentials.
 */
export function LoginPage() {
  const navigate = useNavigate()
  const setActingRole = usePermissionsStore((s) => s.setActingRole)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [loadingRole, setLoadingRole] = useState<Role | null>(null)
  const [error, setError] = useState<string | null>(null)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    if (!email || !password) {
      setError('Email and password are required.')
      return
    }
    setSubmitting(true)
    // Demo flow — real auth lands when Supabase wires up.
    setTimeout(() => {
      setSubmitting(false)
      navigate('/login/2fa')
    }, 600)
  }

  function handleDemoLogin(role: Role) {
    setLoadingRole(role)
    setActingRole(role)
    setTimeout(() => {
      setLoadingRole(null)
      navigate('/dashboard')
    }, 400)
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Standard credentials form */}
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <header className="flex flex-col gap-1">
          <h2 className="type-section text-text-primary">Sign in</h2>
          <p className="text-xs text-text-secondary">Use your pharmacy staff credentials</p>
        </header>

        {error && (
          <div role="alert" className="rounded-control border border-error bg-tag-schedule-bg/60 px-3 py-2 text-xs text-tag-schedule-fg">
            {error}
          </div>
        )}

        <FormField label="Email" required>
          {(p) => (
            <Input
              {...p}
              type="email"
              autoComplete="email"
              placeholder="you@winchester.com.jm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={submitting}
            />
          )}
        </FormField>

        <FormField label="Password" required>
          {(p) => (
            <Input
              {...p}
              type="password"
              autoComplete="current-password"
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={submitting}
            />
          )}
        </FormField>

        <div className="flex items-center justify-between">
          <Checkbox label="Keep me signed in" disabled={submitting} />
          <a href="#" className="text-xs text-primary hover:text-primary-hover" tabIndex={submitting ? -1 : 0}>
            Forgot password?
          </a>
        </div>

        <Button type="submit" variant="primary" size="lg" fullWidth loading={submitting}>
          {submitting ? 'Signing in…' : 'Sign in'}
        </Button>

        <p className="flex items-center justify-center gap-1.5 type-label text-text-disabled">
          <ShieldCheck size={12} />
          Two-factor authentication required after sign in
        </p>
      </form>

      {/* Demo mode quick-access panel */}
      {IS_DEMO_MODE && (
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <div className="h-px flex-1 bg-border" />
            <span className="flex items-center gap-1 type-tiny text-text-disabled uppercase tracking-wider">
              <Lightning size={10} weight="fill" className="text-primary" />
              Demo Quick Access
            </span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <div className="flex flex-col gap-2">
            {DEMO_ROLE_CARDS.map(({ role, label, description, accent }) => (
              <button
                key={role}
                type="button"
                onClick={() => handleDemoLogin(role)}
                disabled={loadingRole !== null}
                className={[
                  'w-full text-left px-3 py-2.5 rounded-control border bg-bg-surface',
                  'transition-all duration-150',
                  'disabled:opacity-50 disabled:cursor-not-allowed',
                  accent,
                  loadingRole === role ? 'opacity-70' : '',
                ].join(' ')}
              >
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <p className="type-body-sm font-medium text-text-primary">{label}</p>
                    <p className="type-label text-text-secondary mt-0.5">{description}</p>
                  </div>
                  <span className="type-tiny text-text-disabled shrink-0">
                    {loadingRole === role ? 'Loading…' : 'Enter →'}
                  </span>
                </div>
              </button>
            ))}
          </div>

          <p className="type-label text-text-disabled text-center">
            Demo data only — backend connections pending
          </p>
        </div>
      )}
    </div>
  )
}

export default LoginPage
