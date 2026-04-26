"use client";

// Archive is client-rendered for instant search/filter UX
import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { ArchiveFilterBar, type ArchiveFilters } from "@/components/archive/ArchiveFilterBar";
import { InvestigationCard } from "@/components/investigation/InvestigationCard";
import { DocStatusBadge } from "@/components/shared/DocStatusBadge";
import type { InvestigationCard as InvestigationCardType, ClipCard, DocCard } from "@/types";

interface ArchiveData {
  investigations: InvestigationCardType[];
  clips: ClipCard[];
  docs: DocCard[];
  topics: Array<{ _id: string; title: { en: string }; slug: { current: string } }>;
}

const FORMATS = ["Investigations", "Clips", "Documentation"];

export default function ArchivePage() {
  const [data, setData] = useState<ArchiveData | null>(null);
  const [filters, setFilters] = useState<ArchiveFilters>({ search: "", topics: [], format: "" });

  useEffect(() => {
    fetch("/api/archive")
      .then((r) => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const filtered = useMemo(() => {
    if (!data) return { investigations: [], clips: [], docs: [] };

    const s = filters.search.toLowerCase();
    const showInv = !filters.format || filters.format === "Investigations";
    const showClips = !filters.format || filters.format === "Clips";
    const showDocs = !filters.format || filters.format === "Documentation";

    const matchesSearch = (text: string) => !s || text.toLowerCase().includes(s);
    const matchesTopic = (topics: Array<{ slug: { current: string } }> | undefined) =>
      !filters.topics.length || topics?.some((t) => filters.topics.includes(t.slug.current));

    return {
      investigations: showInv
        ? data.investigations.filter(
            (inv) => matchesSearch(inv.title.en) && matchesTopic(inv.topics)
          )
        : [],
      clips: showClips
        ? data.clips.filter((c) => matchesSearch(c.title.en) && matchesTopic(c.topics))
        : [],
      docs: showDocs
        ? data.docs.filter((d) => matchesSearch(d.title.en))
        : [],
    };
  }, [data, filters]);

  const totalResults =
    (filtered.investigations?.length ?? 0) +
    (filtered.clips?.length ?? 0) +
    (filtered.docs?.length ?? 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
      <header className="mb-10 border-b border-border pb-8">
        <p className="font-mono text-xs uppercase tracking-widest text-accent mb-3">Search</p>
        <h1 className="font-serif text-4xl font-bold text-paper">Archive</h1>
        <p className="text-mist mt-3">
          All investigations, clips, and documentation packages in one searchable system.
        </p>
      </header>

      <ArchiveFilterBar
        topics={data?.topics ?? []}
        formats={FORMATS}
        onFilter={setFilters}
      />

      {!data && (
        <p className="text-mist font-mono text-sm">Loading archive...</p>
      )}

      {data && (
        <>
          <p className="font-mono text-xs text-mist mb-8">
            {totalResults} result{totalResults !== 1 ? "s" : ""}
          </p>

          {/* Investigations */}
          {filtered.investigations.length > 0 && (
            <section className="mb-12">
              <h2 className="font-mono text-xs uppercase tracking-widest text-mist mb-5">Investigations</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.investigations.map((inv) => (
                  <InvestigationCard key={inv._id} investigation={inv} />
                ))}
              </div>
            </section>
          )}

          {/* Clips */}
          {filtered.clips.length > 0 && (
            <section className="mb-12">
              <h2 className="font-mono text-xs uppercase tracking-widest text-mist mb-5">Clips</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.clips.map((clip) => (
                  <Link
                    key={clip._id}
                    href={clip.parentSlug ? `/investigations/${clip.parentSlug}` : "/investigations"}
                    className="group block bg-surface border border-border hover:border-accent/40 transition-colors p-4"
                  >
                    <p className="font-mono text-xs uppercase tracking-wider text-accent mb-2">Clip</p>
                    <h3 className="font-serif text-sm font-bold text-paper line-clamp-2 group-hover:text-accent transition-colors mb-1">
                      {clip.title.en}
                    </h3>
                    {clip.parentTitle && (
                      <p className="font-mono text-xs text-mist">← {clip.parentTitle}</p>
                    )}
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Documentation */}
          {filtered.docs.length > 0 && (
            <section className="mb-12">
              <h2 className="font-mono text-xs uppercase tracking-widest text-mist mb-5">Documentation</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.docs.map((doc) => (
                  <Link
                    key={doc._id}
                    href={`/documentation/${doc.slug.current}`}
                    className="group block bg-surface border border-border hover:border-accent/40 transition-colors p-4"
                  >
                    <p className="font-mono text-xs uppercase tracking-wider text-accent mb-2">Evidence Package</p>
                    <h3 className="font-serif text-sm font-bold text-paper line-clamp-2 group-hover:text-accent transition-colors">
                      {doc.title.en}
                    </h3>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {totalResults === 0 && (
            <p className="text-mist font-mono text-sm">No results match your filters.</p>
          )}
        </>
      )}
    </div>
  );
}
