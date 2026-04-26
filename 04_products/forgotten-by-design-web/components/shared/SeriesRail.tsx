import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { DocStatusBadge } from "./DocStatusBadge";
import type { InvestigationCard } from "@/types";

interface SeriesRailProps {
  title?: string;
  investigations: InvestigationCard[];
}

export function SeriesRail({ title = "Related Investigations", investigations }: SeriesRailProps) {
  if (!investigations?.length) return null;

  return (
    <section className="my-10">
      <h3 className="font-mono text-xs uppercase tracking-widest text-mist mb-5">{title}</h3>
      <div className="flex gap-4 overflow-x-auto pb-2 -mx-1 px-1">
        {investigations.map((inv) => {
          const imgUrl = inv.thumbnail
            ? urlFor(inv.thumbnail).width(320).height(180).fit("crop").url()
            : null;

          return (
            <Link
              key={inv._id}
              href={`/investigations/${inv.slug.current}`}
              className="shrink-0 w-56 group"
            >
              <div className="aspect-video bg-surface-2 overflow-hidden relative mb-2">
                {imgUrl ? (
                  <Image
                    src={imgUrl}
                    alt={inv.title.en}
                    fill
                    className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                    sizes="224px"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-mono text-xs text-mist">No image</span>
                  </div>
                )}
              </div>
              <h4 className="font-serif text-sm font-bold text-paper leading-snug line-clamp-2 mb-1 group-hover:text-accent transition-colors">
                {inv.title.en}
              </h4>
              <DocStatusBadge status={inv.evidenceStatus} />
            </Link>
          );
        })}
      </div>
    </section>
  );
}
