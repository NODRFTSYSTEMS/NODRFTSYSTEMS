import type { Metadata } from "next";
import Link from "next/link";
import { sanityFetch } from "@/sanity/lib/fetch";
import { FEATURED_DOCS_QUERY } from "@/sanity/queries";
import type { DocCard } from "@/types";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Documentation",
  description: "Public evidence packages — claims mapped to sources, methodology explained, what cannot be proven stated explicitly.",
};

export default async function DocumentationPage() {
  const docs = await sanityFetch<DocCard[]>({ query: FEATURED_DOCS_QUERY, defaultValue: [] });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
      <header className="mb-12 border-b border-border pb-8">
        <p className="font-mono text-xs uppercase tracking-widest text-accent mb-3">Public Evidence</p>
        <h1 className="font-serif text-4xl font-bold text-paper">Documentation Packages</h1>
        <p className="text-mist mt-3 max-w-xl">
          Claims mapped to sources. Screenshots with archive identifiers. What cannot be proven, stated explicitly. Public by default.
        </p>
      </header>

      {docs.length === 0 ? (
        <p className="text-mist font-mono text-sm">No documentation packages published yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {docs.map((doc) => (
            <Link
              key={doc._id}
              href={`/documentation/${doc.slug.current}`}
              className="group block border border-border bg-surface hover:border-accent/40 transition-colors p-6"
            >
              <p className="font-mono text-xs uppercase tracking-wider text-accent mb-3">Evidence Package</p>
              <h2 className="font-serif text-lg font-bold text-paper mb-3 line-clamp-2 group-hover:text-accent transition-colors">
                {doc.title.en}
              </h2>
              {doc.parentTitle && (
                <p className="font-mono text-xs text-mist">← {doc.parentTitle}</p>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
