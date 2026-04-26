import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import type { SanityImage } from "@/types";

interface EvidenceCalloutProps {
  type: "image" | "quote";
  image?: SanityImage;
  quote?: string;
  sourceLabel?: string;
}

export function EvidenceCallout({ type, image, quote, sourceLabel }: EvidenceCalloutProps) {
  return (
    <div className="border-l-2 border-accent bg-surface p-5 my-4">
      {type === "quote" && quote && (
        <blockquote>
          <p className="text-paper italic leading-relaxed mb-3">&ldquo;{quote}&rdquo;</p>
          {sourceLabel && (
            <footer className="font-mono text-xs text-mist">— {sourceLabel}</footer>
          )}
        </blockquote>
      )}

      {type === "image" && image && (
        <figure>
          <div className="relative w-full max-h-80 overflow-hidden mb-3">
            <Image
              src={urlFor(image).width(800).url()}
              alt={sourceLabel ?? "Evidence screenshot"}
              width={800}
              height={450}
              className="object-contain w-full"
            />
          </div>
          {sourceLabel && (
            <figcaption className="font-mono text-xs text-mist">{sourceLabel}</figcaption>
          )}
        </figure>
      )}
    </div>
  );
}
