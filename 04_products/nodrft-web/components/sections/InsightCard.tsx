import type { Locale } from "@/content/types";

interface InsightCardProps {
  locale: Locale;
  type: string;
  heading: string;
  body: string;
  bullets: string[];
  chips: string[];
  linkHref: string;
  linkLabel: string;
}

export function InsightCard({
  type,
  heading,
  body,
  bullets,
  chips,
  linkHref,
  linkLabel,
}: InsightCardProps) {
  return (
    <article className="nd-card nd-insight-card" style={{ position: "relative" }}>
      <span className="nd-card__corner" aria-hidden="true" />
      <p className="nd-label">{type}</p>
      <h3 className="nd-insight-heading">{heading}</h3>
      <p className="nd-p-sm">{body}</p>
      <ul className="nd-insight-list" aria-label="Key points">
        {bullets.map((b, i) => (
          <li key={i}>{b}</li>
        ))}
      </ul>
      <div className="nd-chip-row" aria-label="Topics">
        {chips.map((c, i) => (
          <span key={i} className="nd-chip">{c}</span>
        ))}
      </div>
      <p className="nd-p-xs" style={{ marginTop: "12px" }}>
        <a href={linkHref}>{linkLabel}</a>
      </p>
    </article>
  );
}
