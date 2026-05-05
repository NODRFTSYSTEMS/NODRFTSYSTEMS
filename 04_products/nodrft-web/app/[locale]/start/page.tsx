import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import type { Locale } from "@/content/types";
import { EngagementForm } from "@/components/forms/EngagementForm";
import { FadeUp } from "@/components/motion/FadeUp";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.start" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `https://nodrftsystems.com/${locale}/start`,
      languages: {
        en: "https://nodrftsystems.com/en/start",
        es: "https://nodrftsystems.com/es/start",
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: `https://nodrftsystems.com/${locale}/start`,
      images: [`/api/og?title=${encodeURIComponent(t("title"))}&locale=${locale}`],
    },
  };
}

const COPY = {
  en: {
    label: "Start an Engagement",
    heading: "Submit a project brief.",
    who: "We build for local and regional businesses that need a serious digital presence — without enterprise overhead.",
    lead: "Describe the problem, the scope class you believe fits, and your timeline. We review every submission and respond within 2 business days with an assessment of fit and the recommended starting point.",
    conditions: [
      "Submissions are evaluated — not auto-responded.",
      "Scope determines price. No pricing is discussed until scope is clear.",
      "If scope isn't defined yet, a Discovery Sprint is usually the right first step.",
      "Not every project is accepted. Evaluation criteria: scope clarity, budget reality, decision-making authority, and communication fit.",
    ],
    conditionsLabel: "Before you submit",
    notReadyHeading: "Scope not clear yet?",
    notReadyBody: "Open an inquiry instead. We can help assess fit and recommend whether a Discovery Sprint or a direct package engagement makes more sense for where you are.",
    notReadyCta: "Open an Inquiry →",
  },
  es: {
    label: "Iniciar un Proyecto",
    heading: "Envíe un brief de proyecto.",
    who: "Trabajamos con negocios locales y regionales que necesitan una presencia digital seria — sin la escala de una empresa corporativa.",
    lead: "Describa el problema, la clase de alcance que cree que aplica y su cronograma. Revisamos cada envío y respondemos en 2 días hábiles con una evaluación del ajuste y el punto de partida recomendado.",
    conditions: [
      "Los envíos son evaluados — no se responden automáticamente.",
      "El alcance determina el precio. No se discute precio hasta que el alcance esté claro.",
      "Si el alcance aún no está definido, un Discovery Sprint suele ser el primer paso correcto.",
      "No todos los proyectos son aceptados. Criterios de evaluación: claridad de alcance, realidad presupuestaria, autoridad de decisión y ajuste de comunicación.",
    ],
    conditionsLabel: "Antes de enviar",
    notReadyHeading: "¿El alcance aún no está claro?",
    notReadyBody: "Abra una consulta. Podemos ayudar a evaluar el ajuste y recomendar si un Discovery Sprint o un paquete directo es más adecuado para su situación.",
    notReadyCta: "Abrir una Consulta →",
  },
};

export default async function StartPage({ params }: Props) {
  const { locale } = await params;
  const loc = locale as Locale;
  const copy = COPY[loc];

  return (
    <>
      <section className="nd-section nd-geo-bg" aria-labelledby="start-heading">
        <div className="nd-wrap-narrow">
          <FadeUp>
            <span className="nd-label" style={{ display: "block", marginBottom: "var(--space-4)" }}>
              {copy.label}
            </span>
            <h1 id="start-heading" className="nd-h1" style={{ marginBottom: "var(--space-4)" }}>
              {copy.heading}
            </h1>
            <p className="nd-p-sm nd-start-who">{copy.who}</p>
            <p className="nd-lead">{copy.lead}</p>
          </FadeUp>
        </div>
      </section>

      <section className="nd-section alt" aria-label={copy.conditionsLabel}>
        <div className="nd-wrap-narrow">
          <FadeUp>
            <span className="nd-label" style={{ display: "block", marginBottom: "var(--space-4)" }}>
              {copy.conditionsLabel}
            </span>
            <ul className="nd-conditions-list">
              {copy.conditions.map((c, i) => (
                <li key={i} className="nd-p-sm nd-condition-item">{c}</li>
              ))}
            </ul>
          </FadeUp>
        </div>
      </section>

      <section className="nd-section" aria-label="Engagement form">
        <div className="nd-wrap-narrow">
          <FadeUp>
            <EngagementForm locale={loc} />
          </FadeUp>
        </div>
      </section>

      <section className="nd-section alt" aria-labelledby="not-ready-heading">
        <div className="nd-wrap-narrow">
          <FadeUp>
            <h2 id="not-ready-heading" className="nd-h3" style={{ marginBottom: "var(--space-3)" }}>
              {copy.notReadyHeading}
            </h2>
            <p className="nd-p-sm" style={{ marginBottom: "var(--space-4)" }}>{copy.notReadyBody}</p>
            <a href={`/${locale}/inquiries`} className="nd-link-arrow">{copy.notReadyCta}</a>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
