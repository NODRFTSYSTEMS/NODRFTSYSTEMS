import { notFound } from "next/navigation";
import type { Metadata } from "next";

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  return {
    title: `Insights — NoDrftSystems`,
    alternates: {
      canonical: `https://nodrftsystems.com/${locale}/insights/${slug}`,
    },
  };
}

// Phase 4 will populate this with MDX content
export default async function InsightPage({ params }: Props) {
  const { locale, slug } = await params;
  if (!slug) notFound();

  return (
    <article className="nd-section">
      <div className="nd-wrap-narrow">
        <span className="nd-label" style={{ display: "block", marginBottom: "var(--space-4)" }}>
          {locale === "es" ? "Perspectivas" : "Insights"}
        </span>
        <h1 className="nd-h1">{slug}</h1>
      </div>
    </article>
  );
}
