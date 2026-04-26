import { PortableText, type PortableTextBlock } from "@portabletext/react";

interface TranscriptBlockProps {
  content: PortableTextBlock[];
}

const components = {
  block: {
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2
        className="font-serif text-xl font-bold text-paper mt-8 mb-3 scroll-mt-24"
      >
        {children}
      </h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3
        className="font-serif text-base font-bold text-paper/90 mt-6 mb-2 scroll-mt-24"
      >
        {children}
      </h3>
    ),
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="text-mist leading-relaxed mb-4">{children}</p>
    ),
  },
};

export function TranscriptBlock({ content }: TranscriptBlockProps) {
  if (!content?.length) return null;

  return (
    <section className="mt-12 border-t border-border pt-10" id="transcript">
      <h2 className="font-mono text-xs uppercase tracking-widest text-mist mb-6">
        Full Transcript
      </h2>
      <div className="max-w-2xl">
        <PortableText value={content} components={components} />
      </div>
    </section>
  );
}
