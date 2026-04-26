import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About / Method",
  description: "What Forgotten by Design investigates, how evidence is handled, and what distinguishes this brand from generic hidden-history content.",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <header className="mb-12 border-b border-border pb-8">
        <p className="font-mono text-xs uppercase tracking-widest text-accent mb-3">Method</p>
        <h1 className="font-serif text-4xl font-bold text-paper">About</h1>
      </header>

      <div className="prose prose-invert max-w-none space-y-8">

        <section>
          <h2 className="font-serif text-2xl font-bold text-paper mb-4">What this is</h2>
          <p className="text-mist leading-relaxed">
            Forgotten by Design is an evidence-led media brand investigating the hidden mechanisms
            behind history, institutions, religion, archaeology, cultural memory, and the systems
            through which narratives are simplified, erased, or renamed.
          </p>
          <p className="text-mist leading-relaxed mt-3">
            This is not a mystery-facts platform. It is an investigation-first archive — built to
            reward skepticism, pattern-recognition, and close reading.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl font-bold text-paper mb-4">Evidence hierarchy</h2>
          <div className="space-y-4">
            {[
              {
                level: "01",
                title: "Primary sources",
                desc: "Original documents, archival records, firsthand accounts, and institutional records directly relevant to the claim.",
              },
              {
                level: "02",
                title: "Supporting sources",
                desc: "Secondary analysis, scholarly synthesis, and documented investigative reporting that corroborates primary evidence.",
              },
              {
                level: "03",
                title: "Contextual sources",
                desc: "Background material that frames the claim but does not directly prove or disprove it.",
              },
            ].map((item) => (
              <div key={item.level} className="flex gap-4 border border-border p-5">
                <span className="font-mono text-xs text-accent mt-0.5 shrink-0">{item.level}</span>
                <div>
                  <p className="font-serif font-bold text-paper mb-1">{item.title}</p>
                  <p className="text-sm text-mist leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="font-serif text-2xl font-bold text-paper mb-4">Lacuna notes</h2>
          <p className="text-mist leading-relaxed">
            Every documentation package includes a lacuna note — a formal acknowledgment of what
            the investigation cannot prove, and why. This is not a weakness. It is the practice of
            epistemic honesty that distinguishes investigation from speculation.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl font-bold text-paper mb-4">Editorial standards</h2>
          <ul className="space-y-2 text-mist">
            {[
              "Claims are never stated as fact without documented support.",
              "Transcripts are script-first and human-reviewed before publication.",
              "Documentation packages are public by default — not gated behind subscriptions.",
              "The archive is structured to support future editorial expansion without redesign.",
            ].map((item, i) => (
              <li key={i} className="flex gap-3">
                <span className="text-accent mt-1 shrink-0">—</span>
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row gap-4">
        <Link
          href="/investigations"
          className="bg-accent text-paper font-mono text-xs uppercase tracking-widest px-6 py-3 hover:bg-accent/80 transition-colors text-center"
        >
          Browse Investigations
        </Link>
        <Link
          href="/documentation"
          className="border border-border text-paper font-mono text-xs uppercase tracking-widest px-6 py-3 hover:border-accent/50 hover:text-accent transition-colors text-center"
        >
          View Evidence Packages
        </Link>
      </div>
    </div>
  );
}
