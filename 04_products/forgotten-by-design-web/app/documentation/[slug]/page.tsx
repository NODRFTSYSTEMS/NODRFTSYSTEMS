import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { PortableText, type PortableTextBlock } from "@portabletext/react";
import { sanityFetch } from "@/sanity/lib/fetch";
import { DOC_BY_SLUG_QUERY, DOC_SLUGS_QUERY } from "@/sanity/queries";
import { urlFor } from "@/sanity/lib/image";
import { SourceTable } from "@/components/documentation/SourceTable";
import { LacunaNote } from "@/components/documentation/LacunaNote";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await sanityFetch<Array<{ slug: string }>>({
    query: DOC_SLUGS_QUERY,
    revalidate: false,
    defaultValue: [],
  });
  return (slugs ?? []).map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const doc = await sanityFetch<Record<string, unknown> | null>({
    query: DOC_BY_SLUG_QUERY,
    params: { slug },
  });
  if (!doc) return { title: "Documentation Not Found" };
  const title = (doc.seoTitle as string) ?? ((doc.title as Record<string, string>)?.en ?? "");
  const description = doc.seoDescription as string;
  return { title, description };
}

export default async function DocumentationPackagePage({ params }: Props) {
  const { slug } = await params;
  const doc = await sanityFetch<Record<string, unknown> | null>({
    query: DOC_BY_SLUG_QUERY,
    params: { slug },
    tags: [`doc:${slug}`],
  });

  if (!doc) notFound();

  const title = (doc.title as Record<string, string>)?.en ?? "";
  const publishedAt = doc.publishedAt as string;
  const claims = doc.claims as Array<{ claim: string; sourceType: "primary" | "supporting" | "contextual"; reference: string; notes?: string }> | undefined;
  const screenshots = doc.screenshots as Array<Record<string, unknown>> | undefined;
  const lacunaNote = ((doc.lacunaNote as Record<string, unknown>)?.en as PortableTextBlock[] | undefined);
  const primarySources = doc.primarySources as Array<Record<string, string>> | undefined;
  const supportingSources = doc.supportingSources as Array<Record<string, string>> | undefined;
  const contextualSources = doc.contextualSources as Array<Record<string, string>> | undefined;
  const parentInvestigation = doc.parentInvestigation as { _id: string; title: { en: string }; slug: { current: string }; thumbnail?: unknown } | null;

  const date = publishedAt
    ? new Date(publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
    : "";

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 print-friendly">

      {/* Breadcrumb */}
      <nav className="font-mono text-xs text-mist mb-8 flex items-center gap-2 no-print">
        <Link href="/" className="hover:text-paper transition-colors">Home</Link>
        <span>/</span>
        <Link href="/documentation" className="hover:text-paper transition-colors">Documentation</Link>
        <span>/</span>
        <span className="text-paper truncate max-w-xs">{title}</span>
      </nav>

      {/* Header */}
      <header className="mb-10 border-b border-border pb-8">
        <p className="font-mono text-xs uppercase tracking-widest text-accent mb-3">
          Evidence Package
        </p>
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-paper mb-4">{title}</h1>
        <div className="flex items-center gap-4 font-mono text-xs text-mist flex-wrap">
          {date && <span>{date}</span>}
          {parentInvestigation && (
            <Link
              href={`/investigations/${parentInvestigation.slug.current}`}
              className="hover:text-paper transition-colors"
            >
              ← {parentInvestigation.title.en}
            </Link>
          )}
        </div>
      </header>

      {/* Claims-to-evidence table */}
      {claims?.length && <SourceTable claims={claims} />}

      {/* Lacuna note */}
      {lacunaNote?.length && <LacunaNote content={lacunaNote} />}

      {/* Source screenshots */}
      {screenshots?.length && (
        <section className="my-10">
          <h3 className="font-mono text-xs uppercase tracking-widest text-mist mb-6">Primary Source Screenshots</h3>
          <div className="space-y-8">
            {screenshots.map((s, i) => {
              const img = s.image as Parameters<typeof urlFor>[0] | undefined;
              return (
                <div key={i} className="border border-border">
                  {img && (
                    <div className="relative w-full max-h-96 overflow-hidden bg-surface-2">
                      <Image
                        src={urlFor(img).width(900).url()}
                        alt={(s.archiveId as string) ?? `Source ${i + 1}`}
                        width={900}
                        height={500}
                        className="object-contain w-full"
                      />
                    </div>
                  )}
                  <div className="p-3 border-t border-border">
                    <p className="font-mono text-xs text-mist">
                      {(s.archiveId as string) ?? "Archive reference pending"}
                    </p>
                    {typeof s.caption === "string" && s.caption && (
                      <p className="text-sm text-mist/70 mt-1">{s.caption}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Reference groupings */}
      {(primarySources?.length || supportingSources?.length || contextualSources?.length) && (
        <section className="my-10">
          <h3 className="font-mono text-xs uppercase tracking-widest text-mist mb-6">References</h3>
          <div className="space-y-8">
            {[
              { label: "Primary Sources", items: primarySources },
              { label: "Supporting Sources", items: supportingSources },
              { label: "Contextual Sources", items: contextualSources },
            ].map(({ label, items }) =>
              items?.length ? (
                <div key={label}>
                  <h4 className="font-mono text-xs uppercase tracking-wider text-accent mb-3">{label}</h4>
                  <ul className="space-y-2">
                    {items.map((ref, i) => (
                      <li key={i} className="text-sm">
                        {ref.url ? (
                          <a
                            href={ref.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-paper hover:text-accent transition-colors"
                          >
                            {ref.title || ref.url} ↗
                          </a>
                        ) : (
                          <span className="text-mist">{ref.title}</span>
                        )}
                        {ref.notes && (
                          <p className="text-mist text-xs mt-0.5 ml-3">{ref.notes}</p>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null
            )}
          </div>
        </section>
      )}

      {/* Print button */}
      <div className="mt-12 pt-8 border-t border-border no-print">
        <button
          onClick={() => window.print()}
          className="font-mono text-xs uppercase tracking-widest text-mist hover:text-paper border border-border px-4 py-2 transition-colors"
        >
          Print / Save as PDF
        </button>
      </div>
    </div>
  );
}
