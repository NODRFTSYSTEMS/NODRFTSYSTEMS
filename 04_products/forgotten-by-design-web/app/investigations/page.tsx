import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/fetch";
import { LATEST_INVESTIGATIONS_QUERY } from "@/sanity/queries";
import { InvestigationCard } from "@/components/investigation/InvestigationCard";
import type { InvestigationCard as InvestigationCardType } from "@/types";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Investigations",
  description: "Long-form investigations into hidden history, institutional contradictions, and erased narratives.",
};

export default async function InvestigationsPage() {
  const investigations = await sanityFetch<InvestigationCardType[]>({
    query: LATEST_INVESTIGATIONS_QUERY,
    defaultValue: [],
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
      <header className="mb-12 border-b border-border pb-8">
        <p className="font-mono text-xs uppercase tracking-widest text-accent mb-3">Archive</p>
        <h1 className="font-serif text-4xl font-bold text-paper">Investigations</h1>
        <p className="text-mist mt-3 max-w-xl">
          Long-form investigations into the mechanisms behind history, institutions, and cultural memory.
        </p>
      </header>

      {investigations.length === 0 ? (
        <p className="text-mist font-mono text-sm">No investigations published yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {investigations.map((inv) => (
            <InvestigationCard key={inv._id} investigation={inv} />
          ))}
        </div>
      )}
    </div>
  );
}
