import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact / Press",
  description: "Press inquiries, collaboration, and media kit information for Forgotten by Design.",
};

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16">
      <header className="mb-12 border-b border-border pb-8">
        <p className="font-mono text-xs uppercase tracking-widest text-accent mb-3">Press & Collaboration</p>
        <h1 className="font-serif text-4xl font-bold text-paper">Contact</h1>
      </header>

      <div className="space-y-10">
        <section>
          <h2 className="font-serif text-xl font-bold text-paper mb-3">Press inquiries</h2>
          <p className="text-mist leading-relaxed mb-4">
            For press inquiries, interview requests, or media coverage, reach out with your
            outlet, the nature of the request, and your deadline.
          </p>
          <a
            href="mailto:press@forgottenbydesign.com"
            className="font-mono text-sm text-accent hover:text-paper transition-colors"
          >
            press@forgottenbydesign.com
          </a>
        </section>

        <section>
          <h2 className="font-serif text-xl font-bold text-paper mb-3">Collaboration</h2>
          <p className="text-mist leading-relaxed mb-3">
            Collaboration requests are reviewed individually. We work with researchers, archivists,
            and journalists whose work aligns with evidence-first methodology.
          </p>
          <p className="text-mist leading-relaxed">
            We do not accept paid content, sponsorships that influence editorial framing, or
            partnerships with parties who have institutional conflicts of interest with the
            investigations we publish.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl font-bold text-paper mb-3">Media kit</h2>
          <p className="text-mist leading-relaxed">
            A media kit with brand assets, audience data, and editorial overview is available
            on request via the press email above.
          </p>
        </section>

        <section className="border-t border-border pt-8">
          <p className="font-mono text-xs text-mist">
            Response time varies. Complex requests may take longer.
          </p>
        </section>
      </div>
    </div>
  );
}
