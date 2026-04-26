interface ClaimsBlockProps {
  claims: string[];
}

export function ClaimsBlock({ claims }: ClaimsBlockProps) {
  if (!claims?.length) return null;

  return (
    <section className="border border-border bg-surface p-6 md:p-8">
      <h3 className="font-mono text-xs uppercase tracking-widest text-accent mb-5">
        What This Investigation Argues
      </h3>
      <ul className="space-y-3">
        {claims.map((claim, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="font-mono text-xs text-accent mt-0.5 shrink-0">
              {String(i + 1).padStart(2, "0")}
            </span>
            <p className="text-paper leading-relaxed">{claim}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
