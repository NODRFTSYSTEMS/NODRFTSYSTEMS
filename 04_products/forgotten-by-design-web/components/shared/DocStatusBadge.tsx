import type { EvidenceStatus } from "@/types";

interface DocStatusBadgeProps {
  status: EvidenceStatus;
  className?: string;
}

const config: Record<EvidenceStatus, { label: string; classes: string }> = {
  documented: {
    label: "Documented",
    classes: "bg-green-900/30 text-green-400 border-green-800/50",
  },
  inProgress: {
    label: "In Progress",
    classes: "bg-yellow-900/20 text-yellow-500 border-yellow-800/40",
  },
  supplemental: {
    label: "Supplemental",
    classes: "bg-surface-2 text-mist border-border",
  },
};

export function DocStatusBadge({ status, className = "" }: DocStatusBadgeProps) {
  const { label, classes } = config[status] ?? config.supplemental;
  return (
    <span
      className={`inline-flex items-center font-mono text-xs uppercase tracking-wider px-2 py-0.5 border ${classes} ${className}`}
    >
      {label}
    </span>
  );
}
