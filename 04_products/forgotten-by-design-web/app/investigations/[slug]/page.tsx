import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { sanityFetch } from "@/sanity/lib/fetch";
import { INVESTIGATION_BY_SLUG_QUERY, INVESTIGATION_SLUGS_QUERY } from "@/sanity/queries";
import { urlFor } from "@/sanity/lib/image";
import { DocStatusBadge } from "@/components/shared/DocStatusBadge";
import { ClaimsBlock } from "@/components/investigation/ClaimsBlock";
import { EvidenceCallout } from "@/components/documentation/EvidenceCallout";
import { SeriesRail } from "@/components/shared/SeriesRail";
import { TranscriptBlock } from "@/components/ui/TranscriptBlock";
import { SubscribeModule } from "@/components/shared/SubscribeModule";
import type { PortableTextBlock } from "@portabletext/react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await sanityFetch<Array<{ slug: string }>>({
    query: INVESTIGATION_SLUGS_QUERY,
    revalidate: false,
    defaultValue: [],
  });
  return (slugs ?? []).map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const inv = await sanityFetch<Record<string, unknown> | null>({
    query: INVESTIGATION_BY_SLUG_QUERY,
    params: { slug },
  });
  if (!inv) return { title: "Investigation Not Found" };

  const title = (inv.seoTitle as string) ?? ((inv.title as Record<string, string>)?.en ?? "");
  const description = (inv.seoDescription as string) ?? ((inv.abstract as Record<string, string>)?.en ?? "");

  return {
    title,
    description,
    openGraph: { title, description, type: "article" },
  };
}

export default async function InvestigationDetailPage({ params }: Props) {
  const { slug } = await params;
  const inv = await sanityFetch<Record<string, unknown> | null>({
    query: INVESTIGATION_BY_SLUG_QUERY,
    params: { slug },
    tags: [`investigation:${slug}`],
  });

  if (!inv) notFound();

  const title = (inv.title as Record<string, string>)?.en ?? "";
  const abstract = (inv.abstract as Record<string, string>)?.en;
  const transcript = ((inv.transcript as Record<string, unknown>)?.en as PortableTextBlock[] | undefined);
  const thumbnail = inv.thumbnail as Record<string, unknown> | null;
  const youtubeUrl = inv.youtubeUrl as string | undefined;
  const claims = inv.claims as string[] | undefined;
  const evidenceStatus = inv.evidenceStatus as "documented" | "inProgress" | "supplemental";
  const topics = inv.topics as Array<{ _id: string; title: { en: string }; slug: { current: string } }> | undefined;
  const series = inv.series as Array<{ _id: string; title: string; slug: { current: string } }> | undefined;
  const evidencePreview = inv.evidencePreview as Array<Record<string, unknown>> | undefined;
  const documentationPage = inv.documentationPage as { _id: string; slug: { current: string }; title: { en: string } } | null;
  const relatedInvestigations = inv.relatedInvestigations as Array<Record<string, unknown>> | undefined;
  const runtime = inv.runtime as string | undefined;
  const publishedAt = inv.publishedAt as string;

  const date = publishedAt
    ? new Date(publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
    : "";

  // Extract YouTube video ID for embed
  const videoId = youtubeUrl?.match(/(?:v=|\/embed\/|youtu\.be\/)([^?&/]+)/)?.[1];
  const embedUrl = videoId ? `https://www.youtube-nocookie.com/embed/${videoId}` : null;

  const imgUrl = thumbnail ? urlFor(thumbnail as Parameters<typeof urlFor>[0]).width(1200).height(675).url() : null;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">

      {/* Breadcrumb */}
      <nav className="font-mono text-xs text-mist mb-8 flex items-center gap-2">
        <Link href="/" className="hover:text-paper transition-colors">Home</Link>
        <span>/</span>
        <Link href="/investigations" className="hover:text-paper transition-colors">Investigations</Link>
        <span>/</span>
        <span className="text-paper truncate max-w-xs">{title}</span>
      </nav>

      {/* Title */}
      <header className="mb-8">
        <h1 className="font-serif text-3xl md:text-5xl font-bold text-paper leading-tight mb-4">
          {title}
        </h1>
        {abstract && (
          <p className="text-mist text-lg leading-relaxed mb-5">{abstract}</p>
        )}

        {/* Quick facts strip */}
        <div className="flex items-center gap-4 flex-wrap font-mono text-xs text-mist border-t border-border pt-4">
          {date && <span>{date}</span>}
          {runtime && <><span>·</span><span>{runtime}</span></>}
          <DocStatusBadge status={evidenceStatus} />
          {series?.map((s) => (
            <Link key={s._id} href={`/series/${s.slug.current}`} className="border border-border px-2 py-0.5 hover:border-accent/40 hover:text-accent transition-colors">
              {s.title}
            </Link>
          ))}
          {topics?.map((t) => (
            <span key={t._id} className="text-mist/60">{t.title.en}</span>
          ))}
        </div>
      </header>

      {/* Documentation CTA — above fold */}
      {documentationPage && (
        <div className="bg-surface border border-accent/30 p-4 mb-8 flex items-center justify-between gap-4">
          <p className="font-mono text-xs text-mist">
            This investigation has a public evidence package.
          </p>
          <Link
            href={`/documentation/${documentationPage.slug.current}`}
            className="shrink-0 bg-accent text-paper font-mono text-xs uppercase tracking-widest px-4 py-2 hover:bg-accent/80 transition-colors"
          >
            Read Documentation
          </Link>
        </div>
      )}

      {/* Video embed */}
      {embedUrl && (
        <div className="aspect-video mb-10">
          <iframe
            src={embedUrl}
            title={title}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}

      {/* Fallback thumbnail */}
      {!embedUrl && imgUrl && (
        <div className="aspect-video relative mb-10 overflow-hidden">
          <Image src={imgUrl} alt={title} fill className="object-cover" />
        </div>
      )}

      {/* Claims block */}
      {claims?.length && <div className="mb-8"><ClaimsBlock claims={claims} /></div>}

      {/* Evidence preview */}
      {evidencePreview?.length && (
        <section className="mb-8">
          <h3 className="font-mono text-xs uppercase tracking-widest text-mist mb-4">Evidence Preview</h3>
          {evidencePreview.map((item, i) => (
            <EvidenceCallout
              key={i}
              type={item.type as "image" | "quote"}
              image={item.image as Parameters<typeof EvidenceCallout>[0]["image"]}
              quote={item.quote as string}
              sourceLabel={item.sourceLabel as string}
            />
          ))}
        </section>
      )}

      {/* Documentation CTA — lower */}
      {documentationPage && (
        <div className="border border-border p-5 mb-10 flex items-center justify-between gap-4">
          <div>
            <p className="font-serif text-base font-bold text-paper mb-1">View the evidence package</p>
            <p className="font-mono text-xs text-mist">Claims mapped to sources. What can&apos;t be proven, stated explicitly.</p>
          </div>
          <Link
            href={`/documentation/${documentationPage.slug.current}`}
            className="shrink-0 border border-accent text-accent font-mono text-xs uppercase tracking-widest px-4 py-2 hover:bg-accent hover:text-paper transition-colors"
          >
            Documentation →
          </Link>
        </div>
      )}

      {/* Related investigations */}
      {relatedInvestigations?.length && (
        <SeriesRail
          title="Related Investigations"
          investigations={relatedInvestigations as unknown as Parameters<typeof SeriesRail>[0]["investigations"]}
        />
      )}

      {/* Transcript */}
      {transcript?.length && <TranscriptBlock content={transcript} />}

      {/* Subscribe */}
      <div className="mt-16">
        <SubscribeModule />
      </div>
    </div>
  );
}
