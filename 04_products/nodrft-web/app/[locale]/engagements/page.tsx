import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import type { Locale } from "@/content/types";
import { engagements } from "@/content/engagements";
import { EngagementCard } from "@/components/sections/EngagementCard";
import { FadeUp } from "@/components/motion/FadeUp";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.engagements" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `https://nodrftsystems.com/${locale}/engagements`,
      languages: {
        en: "https://nodrftsystems.com/en/engagements",
        es: "https://nodrftsystems.com/es/engagements",
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: `https://nodrftsystems.com/${locale}/engagements`,
      images: [`/api/og?title=${encodeURIComponent(t("title"))}&locale=${locale}`],
    },
  };
}

const COPY = {
  en: {
    heading: "Selected Engagements",
    lead: "A selective record of completed engagements. Each entry describes the business problem, scope, constraints, what was delivered, and what it enabled. Client names are not disclosed.",
    disclaimer: "Engagements are described qualitatively. Client identities are not disclosed.",
    ctaHeading: "Ready to scope your engagement?",
    ctaBody: "If a scope class fits, submit your project brief. If the starting point is not yet clear, review the Website Packages page to find the right entry.",
    ctaPrimary: "Start an Engagement",
    ctaSecondary: "Compare Packages",
  },
  es: {
    heading: "Proyectos Seleccionados",
    lead: "Un registro selectivo de proyectos completados. Cada entrada describe el problema de negocio, el alcance, las restricciones, lo que se entregó y lo que habilitó. Los nombres de clientes no se revelan.",
    disclaimer: "Los proyectos se describen de forma cualitativa. Las identidades de los clientes no se revelan.",
    ctaHeading: "¿Listo para definir su proyecto?",
    ctaBody: "Si una clase de alcance encaja, envíe su brief. Si el punto de partida todavía no está claro, revise la página de Paquetes Web para encontrar la entrada correcta.",
    ctaPrimary: "Iniciar un Proyecto",
    ctaSecondary: "Comparar Paquetes",
  },
};

export default async function EngagementsPage({ params }: Props) {
  const { locale } = await params;
  const loc = locale as Locale;
  const copy = COPY[loc];

  return (
    <>
      <section className="nd-section nd-geo-bg" aria-labelledby="eng-heading">
        <div className="nd-wrap">
          <FadeUp>
            <h1 id="eng-heading" className="nd-h1" style={{ marginBottom: "var(--space-6)" }}>
              {copy.heading}
            </h1>
            <p className="nd-lead">{copy.lead}</p>
            <hr className="nd-rule" />
          </FadeUp>

          {engagements.map((record, i) => (
            <FadeUp key={record.id} delay={i * 0.08}>
              <EngagementCard record={record} locale={loc} />
            </FadeUp>
          ))}

          <FadeUp delay={0.3}>
            <p className="nd-p-xs nd-section-note" style={{ fontStyle: "italic" }}>
              {copy.disclaimer}
            </p>
          </FadeUp>
        </div>
      </section>

      <section className="nd-section alt" aria-labelledby="eng-cta-heading">
        <div className="nd-wrap">
          <FadeUp>
            <div className="nd-section-cta">
              <h2 id="eng-cta-heading" className="nd-h2" style={{ marginBottom: "var(--space-4)" }}>
                {copy.ctaHeading}
              </h2>
              <p className="nd-p nd-section-cta__body">{copy.ctaBody}</p>
              <div className="nd-cta-row" style={{ justifyContent: "center" }}>
                <a href={`/${locale}/start`} className="btn">{copy.ctaPrimary}</a>
                <a href={`/${locale}/capabilities`} className="btn--ghost">{copy.ctaSecondary}</a>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
