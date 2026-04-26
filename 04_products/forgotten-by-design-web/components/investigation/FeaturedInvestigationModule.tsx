import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { DocStatusBadge } from "@/components/shared/DocStatusBadge";
import type { InvestigationCard } from "@/types";

interface Props {
  investigation: InvestigationCard;
}

export function FeaturedInvestigationModule({ investigation }: Props) {
  const { title, abstract, thumbnail, publishedAt, runtime, evidenceStatus, slug, documentationSlug } =
    investigation;

  const href = `/investigations/${slug.current}`;
  const docHref = documentationSlug ? `/documentation/${documentationSlug}` : null;

  const date = new Date(publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const imgUrl = thumbnail
    ? urlFor(thumbnail).width(1200).height(675).fit("crop").url()
    : null;

  return (
    <div className="grid md:grid-cols-2 gap-0 bg-surface border border-border">
      {/* Image */}
      <div className="aspect-video md:aspect-auto relative bg-surface-2 overflow-hidden">
        {imgUrl ? (
          <Image
            src={imgUrl}
            alt={title.en}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-mono text-xs text-mist">Featured Investigation</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-8 md:p-10 flex flex-col justify-center">
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-xs uppercase tracking-widest text-accent">
            Featured Investigation
          </span>
          <DocStatusBadge status={evidenceStatus} />
        </div>

        <h2 className="font-serif text-2xl md:text-3xl font-bold text-paper leading-tight mb-4">
          {title.en}
        </h2>

        {abstract?.en && (
          <p className="text-mist leading-relaxed mb-6">{abstract.en}</p>
        )}

        {/* Meta */}
        <div className="flex items-center gap-3 mb-8 font-mono text-xs text-mist">
          <span>{date}</span>
          {runtime && <><span>·</span><span>{runtime}</span></>}
        </div>

        {/* CTAs */}
        <div className="flex items-center gap-4">
          <Link
            href={href}
            className="bg-accent text-paper font-mono text-xs uppercase tracking-widest px-6 py-3 hover:bg-accent/80 transition-colors"
          >
            Watch Investigation
          </Link>
          {docHref && (
            <Link
              href={docHref}
              className="border border-border text-paper font-mono text-xs uppercase tracking-widest px-6 py-3 hover:border-accent/50 hover:text-accent transition-colors"
            >
              Read Documentation
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
