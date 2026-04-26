import { PortableText, type PortableTextBlock } from "@portabletext/react";

interface LacunaNoteProps {
  content: PortableTextBlock[];
}

export function LacunaNote({ content }: LacunaNoteProps) {
  if (!content?.length) return null;

  return (
    <section className="border border-yellow-800/40 bg-yellow-900/10 p-6 my-8">
      <h3 className="font-mono text-xs uppercase tracking-widest text-yellow-500 mb-3 flex items-center gap-2">
        <span>⚠</span>
        <span>Lacuna Note</span>
      </h3>
      <p className="font-mono text-xs text-yellow-600/70 mb-4">
        What this investigation cannot prove, and why.
      </p>
      <div className="prose prose-sm prose-invert max-w-none text-mist leading-relaxed">
        <PortableText value={content} />
      </div>
    </section>
  );
}
