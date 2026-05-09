import { useEffect, useState } from 'react'
import {
  Pill,
  Clipboard,
  Users,
  ShoppingCart,
  ChartBar,
  ShieldCheck,
  BookOpen,
  Flask,
  WarningOctagon,
  CheckCircle,
  ArrowRight,
  X,
} from '@phosphor-icons/react'
import { usePermissionsStore } from '@/stores/permissions'
import { useOnboardingStore } from '@/stores/onboarding'
import type { Role } from '@/types/auth'

/**
 * OnboardingOverlay — role-specific first-run walkthrough.
 *
 * Fires once per role per device (keyed by actingRole in the demo, by
 * session user.role in production once Supabase auth wires up).
 * Each role gets 3-4 steps tailored to their primary workflows.
 *
 * Mount alongside <CommandPalette /> in App.tsx — it is router-independent
 * and self-managing (reads actingRole, watches changes, auto-shows for
 * unseen roles).
 */

// ─── Step definitions ──────────────────────────────────────────────────────

type Step = {
  icon: React.ReactNode
  title: string
  body: string
}

const ROLE_STEPS: Record<Role, Step[]> = {
  pharmacist: [
    {
      icon: <Clipboard size={28} weight="duotone" className="text-primary" />,
      title: 'Rx Queue',
      body: 'Your primary workspace. Incoming, Verified, Filled, and Dispensed prescriptions are organised in a kanban view so you can see the full workflow at a glance.',
    },
    {
      icon: <Pill size={28} weight="duotone" className="text-primary" />,
      title: 'Prescription Detail',
      body: 'Click any Rx card to review patient info, drug allergy flags, OpenFDA interaction data, refill authorisations, and the workflow stage progression.',
    },
    {
      icon: <Flask size={28} weight="duotone" className="text-primary" />,
      title: 'Drug Interactions',
      body: 'When a prescription contains two or more drugs, PharmacyOS queries OpenFDA automatically. Interaction summaries appear on the detail page — backend integration will surface real-time CDSS alerts.',
    },
    {
      icon: <BookOpen size={28} weight="duotone" className="text-primary" />,
      title: 'Schedule Log',
      body: 'Log and track Schedule I–V controlled substance prescriptions. Five-year retention is required under the Pharmacy (Miscellaneous Provisions) Act 1996, Reg. 14.',
    },
  ],

  pharmacy_technician: [
    {
      icon: <Clipboard size={28} weight="duotone" className="text-primary" />,
      title: 'Rx Queue',
      body: 'Process prescriptions through Received → Verified → Filled. Each card shows the patient, drug, refill count, and schedule badge for controlled substances.',
    },
    {
      icon: <Users size={28} weight="duotone" className="text-primary" />,
      title: 'Patient Records',
      body: 'Search patient records, view allergy flags, JDPA consent status, and prescription history. Always verify allergies before advancing a prescription to Filled.',
    },
    {
      icon: <WarningOctagon size={28} weight="duotone" className="text-primary" />,
      title: 'Inventory Alerts',
      body: 'Check stock levels before filling. Low-stock and expiry alerts appear in the Stock Alerts section — flag any critical shortages to your pharmacist before they affect a fill.',
    },
  ],

  front_desk_cashier: [
    {
      icon: <ShoppingCart size={28} weight="duotone" className="text-primary" />,
      title: 'POS Terminal',
      body: 'Process retail and prescription sales from the POS screen. GCT (General Consumption Tax) at 15% is applied automatically to applicable items.',
    },
    {
      icon: <CheckCircle size={28} weight="duotone" className="text-primary" />,
      title: 'Loyalty Program',
      body: 'Enrol new customers, look up points balances, and redeem rewards during checkout. Access via POS → Loyalty or the Loyalty Dashboard.',
    },
    {
      icon: <ChartBar size={28} weight="duotone" className="text-primary" />,
      title: 'Sales Reports',
      body: 'View daily and period sales summaries from POS → Reports. Export to PDF or CSV once the Supabase backend is live.',
    },
  ],

  manager: [
    {
      icon: <ChartBar size={28} weight="duotone" className="text-primary" />,
      title: 'Dashboard',
      body: 'Live overview of the pharmacy: Rx Queue size, stock alerts, today\'s sales total, and patients served. Metric cards link directly to the relevant module.',
    },
    {
      icon: <WarningOctagon size={28} weight="duotone" className="text-primary" />,
      title: 'Stock Alerts',
      body: 'Review low-stock and expiry alerts before they affect dispensing. Alerts are surfaced on the Dashboard and the dedicated Inventory → Alerts page.',
    },
    {
      icon: <BookOpen size={28} weight="duotone" className="text-primary" />,
      title: 'Reports',
      body: 'Access inventory, dispensing, schedule-log, and revenue reports. All reports support PDF and CSV export — backend integration pending.',
    },
    {
      icon: <ShieldCheck size={28} weight="duotone" className="text-primary" />,
      title: 'Permissions',
      body: 'Adjust the RBAC access matrix for this pharmacy instance from Admin → Permissions. Overrides persist locally until Supabase wires.',
    },
  ],

  admin: [
    {
      icon: <ChartBar size={28} weight="duotone" className="text-primary" />,
      title: 'Dashboard',
      body: 'Full system view across all modules. Admin accounts have read access to every section and write access to configuration.',
    },
    {
      icon: <ShieldCheck size={28} weight="duotone" className="text-primary" />,
      title: 'Permissions',
      body: 'Configure the role-based access control matrix. You can override which roles can access any route — changes persist locally and will sync to Supabase when backend integration lands.',
    },
    {
      icon: <Users size={28} weight="duotone" className="text-primary" />,
      title: 'Users & Audit',
      body: 'Manage staff accounts from Admin → Users. Review all system activity in the Audit Log — every state change and login event is recorded.',
    },
    {
      icon: <CheckCircle size={28} weight="duotone" className="text-primary" />,
      title: 'Security',
      body: 'Configure 2FA enforcement policies and review active sessions from Admin → Security. Session timeout and forced re-authentication are configurable per role.',
    },
  ],
}

const ROLE_LABELS: Record<Role, string> = {
  pharmacist: 'Pharmacist',
  pharmacy_technician: 'Pharmacy Technician',
  front_desk_cashier: 'Front Desk / Cashier',
  manager: 'Manager',
  admin: 'Administrator',
}

// ─── Component ─────────────────────────────────────────────────────────────

export function OnboardingOverlay() {
  const actingRole = usePermissionsStore((s) => s.actingRole)
  const { isCompleted, markCompleted } = useOnboardingStore()

  const [visible, setVisible] = useState(false)
  const [stepIndex, setStepIndex] = useState(0)

  // Show overlay whenever the active role hasn't been onboarded yet.
  useEffect(() => {
    if (!isCompleted(actingRole)) {
      setStepIndex(0)
      setVisible(true)
    } else {
      setVisible(false)
    }
  }, [actingRole, isCompleted])

  if (!visible) return null

  const steps = ROLE_STEPS[actingRole]
  const currentStep = steps[stepIndex]
  const isLastStep = stepIndex === steps.length - 1

  function handleNext() {
    if (isLastStep) {
      dismiss()
    } else {
      setStepIndex((i) => i + 1)
    }
  }

  function dismiss() {
    markCompleted(actingRole)
    setVisible(false)
  }

  return (
    /* Backdrop */
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`PharmacyOS onboarding — ${ROLE_LABELS[actingRole]}`}
      className="fixed inset-0 z-[55] flex items-center justify-center bg-bg-canvas/80 backdrop-blur-sm px-4"
    >
      {/* Card */}
      <div className="relative w-full max-w-lg bg-bg-surface rounded-card shadow-modal border border-bg-subtle p-8 flex flex-col gap-6">

        {/* Dismiss X */}
        <button
          type="button"
          onClick={dismiss}
          aria-label="Skip tour"
          className="absolute top-4 right-4 w-8 h-8 rounded-control flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-bg-subtle transition-colors"
        >
          <X size={16} />
        </button>

        {/* Header */}
        <div className="flex flex-col gap-1">
          <span className="inline-flex items-center self-start px-2 py-0.5 rounded-full bg-primary/10 text-primary type-tiny font-medium uppercase tracking-wide">
            {ROLE_LABELS[actingRole]}
          </span>
          <h2 className="type-heading-lg text-text-primary mt-1">
            Welcome to PharmacyOS
          </h2>
          <p className="type-body text-text-secondary">
            A quick tour of the features you'll use most. You can skip this at any time.
          </p>
        </div>

        {/* Step content */}
        <div className="flex flex-col gap-4 min-h-[120px]">
          <div className="flex items-start gap-4">
            <div className="shrink-0 w-12 h-12 rounded-card bg-primary/10 flex items-center justify-center">
              {currentStep.icon}
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="type-label-strong text-text-primary">{currentStep.title}</h3>
              <p className="type-body text-text-secondary leading-relaxed">{currentStep.body}</p>
            </div>
          </div>
        </div>

        {/* Step dots */}
        <div className="flex items-center gap-1.5" aria-label={`Step ${stepIndex + 1} of ${steps.length}`}>
          {steps.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to step ${i + 1}`}
              onClick={() => setStepIndex(i)}
              className={[
                'h-1.5 rounded-full transition-all',
                i === stepIndex
                  ? 'w-6 bg-primary'
                  : 'w-1.5 bg-bg-subtle hover:bg-text-disabled',
              ].join(' ')}
            />
          ))}
          <span className="ml-auto type-tiny text-text-disabled">
            {stepIndex + 1} / {steps.length}
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-1">
          <button
            type="button"
            onClick={dismiss}
            className="type-label text-text-secondary hover:text-text-primary transition-colors underline underline-offset-2"
          >
            Skip tour
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-control bg-primary text-white type-label-strong hover:bg-primary/90 transition-colors"
          >
            {isLastStep ? (
              <>
                <CheckCircle size={16} weight="bold" />
                Done
              </>
            ) : (
              <>
                Next
                <ArrowRight size={16} weight="bold" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
