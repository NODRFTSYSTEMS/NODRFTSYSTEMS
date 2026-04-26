import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { sanityFetch } from "@/sanity/lib/fetch";
import { SERIES_BY_SLUG_QUERY, ALL_SERIES_QUERY } from "@/sanity/queries";
import { InvestigationCard } from "@/components/investigation/InvestigationCard";
import type { InvestigationCard as InvestigationCardType, SeriesDoc } from "@/types";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const series = await sanityFetch<SeriesDoc[]>({ query: ALL_SERIES_QUERY, revalidate: false, defaultValue: [] });
  return (series ?? []).map((s) => ({ slug: s.slug.current }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const series = await sanityFetch<Record<string, unknown> | null>({
    query: SERIES_BY_SLUG_QUERY,
    params: { slug },
  });
  if (!series) return { title: "Series Not Found" };
  return {
    title: series.title as string,
    description: series.description as string,
  };
}

export default async function SeriesDetailPage({ params }: Props) {
  const { slug } = await params;
  const series = await sanityFetch<Record<string, unknown> | null>({
    query: SERIES_BY_SLUG_QUERY,
    params: { slug },
  });

  if (!series) notFound();

  const investigations = series.investigations as InvestigationCardType[] | undefined;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
      <header className="mb-12 border-b border-border pb-8">
        <p className="font-mono text-xs uppercase tracking-widest text-accent mb-3">Series</p>
        <h1 className="font-serif text-4xl font-bold text-paper mb-3">{String(series.title ?? "")}</h1>
        {typeof series.description === "string" && series.description && (
          <p className="text-mist max-w-xl">{series.description}</p>
        )}
      </header>

      {!investigations?.length ? (
        <p className="text-mist font-mono text-sm">No investigations in this series yet.</p>
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
