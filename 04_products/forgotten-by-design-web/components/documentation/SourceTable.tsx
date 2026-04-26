interface ClaimEntry {
  claim: string;
  sourceType: "primary" | "supporting" | "contextual";
  reference: string;
  notes?: string;
}

interface SourceTableProps {
  claims: ClaimEntry[];
}

const sourceTypeLabel: Record<string, string> = {
  primary: "Primary",
  supporting: "Supporting",
  contextual: "Contextual",
};

const sourceTypeColor: Record<string, string> = {
  primary: "text-accent",
  supporting: "text-yellow-500",
  contextual: "text-mist",
};

export function SourceTable({ claims }: SourceTableProps) {
  if (!claims?.length) return null;

  return (
    <section className="my-8">
      <h3 className="font-mono text-xs uppercase tracking-widest text-mist mb-4">
        Claims → Evidence
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse font-mono text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left text-xs uppercase tracking-wider text-mist py-2 pr-4 w-5/12">Claim</th>
              <th className="text-left text-xs uppercase tracking-wider text-mist py-2 pr-4 w-1/12">Type</th>
              <th className="text-left text-xs uppercase tracking-wider text-mist py-2 pr-4 w-3/12">Reference</th>
              <th className="text-left text-xs uppercase tracking-wider text-mist py-2 w-3/12">Notes</th>
            </tr>
          </thead>
          <tbody>
            {claims.map((entry, i) => (
              <tr
                key={i}
                className="border-b border-border/50 hover:bg-surface/50 transition-colors"
              >
                <td className="py-3 pr-4 text-paper text-xs leading-relaxed align-top">
                  {entry.claim}
                </td>
                <td className={`py-3 pr-4 text-xs uppercase tracking-wider align-top ${sourceTypeColor[entry.sourceType] ?? "text-mist"}`}>
                  {sourceTypeLabel[entry.sourceType] ?? entry.sourceType}
                </td>
                <td className="py-3 pr-4 text-mist text-xs align-top leading-relaxed">
                  {entry.reference}
                </td>
                <td className="py-3 text-mist text-xs align-top leading-relaxed">
                  {entry.notes ?? "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
