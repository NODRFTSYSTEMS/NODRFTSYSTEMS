import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { sanityFetch } from "@/sanity/lib/fetch";
import { ALL_SERIES_QUERY } from "@/sanity/queries";
import { urlFor } from "@/sanity/lib/image";
import type { SeriesDoc } from "@/types";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Series",
  description: "Thematic investigation series — grouped by topic cluster.",
};

export default async function SeriesPage() {
  const series = await sanityFetch<SeriesDoc[]>({ query: ALL_SERIES_QUERY, defaultValue: [] });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
      <header className="mb-12 border-b border-border pb-8">
        <p className="font-mono text-xs uppercase tracking-widest text-accent mb-3">By Topic</p>
        <h1 className="font-serif text-4xl font-bold text-paper">Series</h1>
      </header>

      {series.length === 0 ? (
        <p className="text-mist font-mono text-sm">No series defined yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {series.map((s) => {
            const imgUrl = s.coverImage
              ? urlFor(s.coverImage).width(640).height(360).fit("crop").url()
              : null;
            return (
              <Link
                key={s._id}
                href={`/series/${s.slug.current}`}
                className="group block bg-surface border border-border hover:border-accent/40 transition-colors"
              >
                <div className="aspect-video bg-surface-2 relative overflow-hidden">
                  {imgUrl ? (
                    <Image
                      src={imgUrl}
                      alt={s.title}
                      fill
                      className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-mono text-xs text-mist">Series</span>
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h2 className="font-serif text-lg font-bold text-paper mb-2 group-hover:text-accent transition-colors">
                    {s.title}
                  </h2>
                  {s.description && (
                    <p className="text-sm text-mist leading-relaxed line-clamp-2 mb-3">{s.description}</p>
                  )}
                  {s.investigationCount != null && (
                    <p className="font-mono text-xs text-mist">
                      {s.investigationCount} investigation{s.investigationCount !== 1 ? "s" : ""}
                    </p>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
