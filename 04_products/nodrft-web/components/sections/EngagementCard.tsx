import type { EngagementRecord } from "@/content/engagements";
import type { Locale } from "@/content/types";
import { pick } from "@/content/types";

interface EngagementCardProps {
  record: EngagementRecord;
  locale: Locale;
}

export function EngagementCard({ record, locale }: EngagementCardProps) {
  return (
    <article
      className="nd-card nd-card-spaced"
      aria-labelledby={`eng-${record.id}`}
      style={{ position: "relative" }}
    >
      <span className="nd-card__corner" aria-hidden="true" />
      <span className="nd-label" style={{ display: "block", marginBottom: "var(--space-4)" }}>
        {pick(record.label, locale)}
      </span>
      <p className="nd-p">{pick(record.summary, locale)}</p>
      <div className="nd-eng-meta" role="list" aria-label={locale === "en" ? "Engagement details" : "Detalles del proyecto"}>
        {record.meta.map((item, i) => (
          <span key={i} style={{ display: "contents" }}>
            <span className="nd-eng-key" role="term">{pick(item.key, locale)}</span>
            <span className="nd-eng-val" role="definition">{pick(item.value, locale)}</span>
          </span>
        ))}
      </div>
    </article>
  );
}
