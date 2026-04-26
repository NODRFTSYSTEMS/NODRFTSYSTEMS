import Link from "next/link";
import { sanityFetch } from "@/sanity/lib/fetch";
import {
  FEATURED_INVESTIGATION_QUERY,
  LATEST_INVESTIGATIONS_QUERY,
  RECENT_CLIPS_QUERY,
  FEATURED_DOCS_QUERY,
} from "@/sanity/queries";
import { FeaturedInvestigationModule } from "@/components/investigation/FeaturedInvestigationModule";
import { InvestigationCard } from "@/components/investigation/InvestigationCard";
import { SubscribeModule } from "@/components/shared/SubscribeModule";
import type { InvestigationCard as InvestigationCardType, ClipCard, DocCard } from "@/types";

export const revalidate = 60;

export default async function HomePage() {
  const [featured, investigations, clips, docs] = await Promise.all([
    sanityFetch<InvestigationCardType | null>({ query: FEATURED_INVESTIGATION_QUERY, defaultValue: null }),
    sanityFetch<InvestigationCardType[]>({ query: LATEST_INVESTIGATIONS_QUERY, defaultValue: [] }),
    sanityFetch<ClipCard[]>({ query: RECENT_CLIPS_QUERY, defaultValue: [] }),
    sanityFetch<DocCard[]>({ query: FEATURED_DOCS_QUERY, defaultValue: [] }),
  ]);

  return (
    <>
      {/* Hero */}
      <section className="bg-ink border-b border-border py-16 md:py-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-accent mb-4">
            Evidence-Led Investigations
          </p>
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-paper leading-tight mb-6">
            Hidden history.<br />
            Documented mechanisms.<br />
            <span className="text-accent">Forgotten by design.</span>
          </h1>
          <p className="text-mist text-lg md:text-xl max-w-2xl mx-auto mb-10">
            Archive-driven investigations into the stories institutions simplified, erased, or renamed.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/investigations"
              className="bg-accent text-paper font-mono text-xs uppercase tracking-widest px-8 py-3 hover:bg-accent/80 transition-colors"
            >
              Browse Investigations
            </Link>
            <Link
              href="/documentation"
              className="border border-border text-paper font-mono text-xs uppercase tracking-widest px-8 py-3 hover:border-accent/50 hover:text-accent transition-colors"
            >
              View Documentation
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Featured Investigation */}
        {featured && (
          <section className="py-16 border-b border-border">
            <p className="font-mono text-xs uppercase tracking-widest text-mist mb-6">
              Featured
            </p>
            <FeaturedInvestigationModule investigation={featured} />
          </section>
        )}

        {/* Latest Investigations */}
        {investigations.length > 0 && (
          <section className="py-16 border-b border-border">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-serif text-2xl font-bold text-paper">Investigations</h2>
              <Link
                href="/investigations"
                className="font-mono text-xs uppercase tracking-widest text-mist hover:text-accent transition-colors"
              >
                All investigations →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {investigations.slice(0, 3).map((inv) => (
                <InvestigationCard key={inv._id} investigation={inv} />
              ))}
            </div>
          </section>
        )}

        {/* Recent Clips */}
        {clips.length > 0 && (
          <section className="py-16 border-b border-border">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-serif text-2xl font-bold text-paper">Recent Clips</h2>
              <Link
                href="/archive"
                className="font-mono text-xs uppercase tracking-widest text-mist hover:text-accent transition-colors"
              >
                Browse archive →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {clips.slice(0, 3).map((clip) => (
                <Link
                  key={clip._id}
                  href={clip.parentSlug ? `/investigations/${clip.parentSlug}` : `/investigations`}
                  className="group block bg-surface border border-border hover:border-accent/40 transition-colors p-4"
                >
                  <p className="font-mono text-xs uppercase tracking-wider text-accent mb-2">
                    Clip
                  </p>
                  <h3 className="font-serif text-base font-bold text-paper mb-2 line-clamp-2 group-hover:text-accent transition-colors">
                    {clip.title.en}
                  </h3>
                  {clip.abstract?.en && (
                    <p className="text-xs text-mist line-clamp-2">{clip.abstract.en}</p>
                  )}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Documentation Packages */}
        {docs.length > 0 && (
          <section className="py-16 border-b border-border">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="font-serif text-2xl font-bold text-paper">Documentation</h2>
                <p className="text-mist text-sm mt-1">Public evidence packages — inspectable by anyone.</p>
              </div>
              <Link
                href="/documentation"
                className="font-mono text-xs uppercase tracking-widest text-mist hover:text-accent transition-colors"
              >
                All packages →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {docs.map((doc) => (
                <Link
                  key={doc._id}
                  href={`/documentation/${doc.slug.current}`}
                  className="group block border border-border bg-surface hover:border-accent/40 transition-colors p-5"
                >
                  <p className="font-mono text-xs uppercase tracking-wider text-accent mb-3">
                    Evidence Package
                  </p>
                  <h3 className="font-serif text-base font-bold text-paper mb-2 line-clamp-2 group-hover:text-accent transition-colors">
                    {doc.title.en}
                  </h3>
                  {doc.parentTitle && (
                    <p className="font-mono text-xs text-mist">
                      ← {doc.parentTitle}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Browse Archive */}
        <section className="py-16 border-b border-border">
          <h2 className="font-serif text-2xl font-bold text-paper mb-3">Browse the Archive</h2>
          <p className="text-mist mb-8">
            Search across investigations, clips, documentation packages, and sources.
          </p>
          <Link
            href="/archive"
            className="inline-flex items-center gap-2 border border-border text-paper font-mono text-xs uppercase tracking-widest px-6 py-3 hover:border-accent/50 hover:text-accent transition-colors"
          >
            Open Archive →
          </Link>
        </section>

        {/* About the Method */}
        <section className="py-16 border-b border-border">
          <div className="max-w-2xl">
            <p className="font-mono text-xs uppercase tracking-widest text-accent mb-3">
              The Method
            </p>
            <h2 className="font-serif text-2xl font-bold text-paper mb-4">
              Evidence first. Framing second.
            </h2>
            <p className="text-mist leading-relaxed mb-6">
              Every investigation begins with primary sources, archival material, and documented
              contradictions. Claims are mapped to evidence. What cannot be proven is acknowledged
              explicitly — not buried.
            </p>
            <Link
              href="/about"
              className="font-mono text-xs uppercase tracking-widest text-accent hover:text-paper transition-colors"
            >
              Read about our methodology →
            </Link>
          </div>
        </section>

        {/* Subscribe */}
        <section className="py-16">
          <SubscribeModule variant="full" />
        </section>

      </div>
    </>
  );
}
