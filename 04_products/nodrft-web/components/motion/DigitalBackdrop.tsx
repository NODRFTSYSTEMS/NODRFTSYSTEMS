"use client";

/**
 * DigitalBackdrop — fixed-layer animated grid + scan effect
 * Renders behind all page content (z-index 0).
 * The scan animation pulses accent-colored light across the grid.
 * Respects prefers-reduced-motion: scan is disabled when reduced.
 */
export function DigitalBackdrop() {
  return (
    <div className="nd-dbg" aria-hidden="true" role="presentation">
      <div className="nd-dbg__grid" />
      <div className="nd-dbg__dots" />
      <div className="nd-dbg__scan" />
      <div className="nd-dbg__noise" />
    </div>
  );
}
