import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { DocStatusBadge } from "@/components/shared/DocStatusBadge";
import type { InvestigationCard as InvestigationCardType } from "@/types";

interface Props {
  investigation: InvestigationCardType;
}

export function InvestigationCard({ investigation }: Props) {
  const {
    title,
    abstract,
    thumbnail,
    publishedAt,
    runtime,
    evidenceStatus,
    slug,
    topics,
  } = investigation;

  const href = `/investigations/${slug.current}`;
  const date = new Date(publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const imgUrl = thumbnail
    ? urlFor(thumbnail).width(640).height(360).fit("crop").url()
    : null;

  return (
    <article className="group bg-surface border border-border hover:border-accent/40 transition-colors">
      <Link href={href} className="block">
        {/* Thumbnail */}
        <div className="aspect-video bg-surface-2 overflow-hidden relative">
          {imgUrl ? (
            <Image
              src={imgUrl}
              alt={title.en}
              fill
              className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-mono text-xs text-mist">No image</span>
            </div>
          )}
          {/* Evidence status badge overlay */}
          <div className="absolute top-2 left-2">
            <DocStatusBadge status={evidenceStatus} />
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-serif text-lg font-bold text-paper leading-snug mb-2 group-hover:text-accent transition-colors line-clamp-2">
            {title.en}
          </h3>

          {abstract?.en && (
            <p className="text-sm text-mist leading-relaxed mb-3 line-clamp-2">
              {abstract.en}
            </p>
          )}

          {/* Meta row */}
          <div className="flex items-center gap-3 flex-wrap">
            <span className="font-mono text-xs text-mist">{date}</span>
            {runtime && (
              <span className="font-mono text-xs text-mist">{runtime}</span>
            )}
            {topics?.slice(0, 2).map((topic) => (
              <span
                key={topic._id}
                className="font-mono text-xs text-mist/60 border border-border px-1.5 py-0.5"
              >
                {topic.title.en}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </article>
  );
}
