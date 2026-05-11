import { Link, useLocation } from 'react-router-dom'
import { MagnifyingGlass, ArrowLeft, House } from '@phosphor-icons/react'
import { Button } from '@/components/Button'

/**
 * 404 page — branded with PharmacyOS identity.
 * Shows the attempted URL and suggests common destinations.
 */
export function NotFoundPage() {
  const location = useLocation()

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

        <div className="w-16 h-16 rounded-pill bg-bg-subtle text-text-disabled flex items-center justify-center mx-auto mb-4">
          <MagnifyingGlass size={32} weight="duotone" />
        </div>

        <h1 className="type-page-title text-text-primary mb-2">Page Not Found</h1>
        <p className="text-text-secondary mb-2">
          The page you are looking for does not exist or has been moved.
        </p>
        {location.pathname !== '/' && (
          <p className="type-mono-data text-text-disabled mb-6">{location.pathname}</p>
        )}

        {/* Quick navigation suggestions */}
        <div className="bg-bg-surface border border-border rounded-card p-4 mb-6">
          <p className="type-label text-text-secondary mb-3">Common destinations</p>
          <div className="flex flex-col gap-1">
            {[
              { label: 'Dashboard', path: '/dashboard', icon: House },
              { label: 'Rx Queue', path: '/prescriptions', icon: MagnifyingGlass },
              { label: 'Rx Inventory', path: '/inventory', icon: MagnifyingGlass },
              { label: 'Patients', path: '/patients', icon: MagnifyingGlass },
            ].map(({ label, path }) => (
              <Link
                key={path}
                to={path}
                className="flex items-center justify-between px-3 py-2 rounded-control text-left hover:bg-bg-subtle transition-colors group"
              >
                <span className="type-body-sm text-text-primary group-hover:text-primary">{label}</span>
                <code className="type-mono-data text-text-disabled">{path}</code>
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center gap-3">
          <Button variant="secondary" onClick={() => window.history.back()}>
            <ArrowLeft size={16} />
            Go Back
          </Button>
          <Link to="/dashboard">
            <Button variant="primary">Dashboard</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage
