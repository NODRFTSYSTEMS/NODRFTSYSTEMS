import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import type { Locale } from "@/content/types";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { FadeUp } from "@/components/motion/FadeUp";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.inquiries" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `https://nodrftsystems.com/${locale}/inquiries`,
      languages: {
        en: "https://nodrftsystems.com/en/inquiries",
        es: "https://nodrftsystems.com/es/inquiries",
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: `https://nodrftsystems.com/${locale}/inquiries`,
      images: [`/api/og?title=${encodeURIComponent(t("title"))}&locale=${locale}`],
    },
  };
}

const COPY = {
  en: {
    label: "Open an Inquiry",
    heading: "Not ready to scope a project yet? Start here.",
    lead: "An inquiry is for early-stage conversations — you're not sure what you need, you want to understand the approach before committing, or you have a question that doesn't fit a project brief. We read every message and respond within 2 business days.",
    readyHeading: "Ready to submit a full project brief?",
    readyBody: "If scope is already clear and you know which package fits, skip the inquiry and submit a project brief directly.",
    readyCta: "Start an Engagement →",
  },
  es: {
    label: "Abrir una Consulta",
    heading: "¿Todavía no está listo para definir un proyecto? Comience aquí.",
    lead: "Una consulta es para conversaciones en etapa temprana — no está seguro de lo que necesita, quiere entender el enfoque antes de comprometerse, o tiene una pregunta que no encaja en un brief de proyecto. Leemos cada mensaje y respondemos en 2 días hábiles.",
    readyHeading: "¿Listo para enviar un brief de proyecto completo?",
    readyBody: "Si el alcance ya está claro y sabe qué paquete aplica, omita la consulta y envíe un brief directamente.",
    readyCta: "Iniciar un Proyecto →",
  },
};

export default async function InquiriesPage({ params }: Props) {
  const { locale } = await params;
  const loc = locale as Locale;
  const copy = COPY[loc];

  return (
    <>
      <section className="nd-section nd-geo-bg" aria-labelledby="inq-heading">
        <div className="nd-wrap-narrow">
          <FadeUp>
            <span className="nd-label" style={{ display: "block", marginBottom: "var(--space-4)" }}>
              {copy.label}
            </span>
            <h1 id="inq-heading" className="nd-h1" style={{ marginBottom: "var(--space-6)" }}>
              {copy.heading}
            </h1>
            <p className="nd-lead">{copy.lead}</p>
          </FadeUp>
        </div>
      </section>

      <section className="nd-section alt" aria-label="Inquiry form">
        <div className="nd-wrap-narrow">
          <FadeUp>
            <InquiryForm locale={loc} />
          </FadeUp>
        </div>
      </section>

      <section className="nd-section" aria-labelledby="inq-ready-heading">
        <div className="nd-wrap-narrow">
          <FadeUp>
            <h2 id="inq-ready-heading" className="nd-h3" style={{ marginBottom: "var(--space-3)" }}>
              {copy.readyHeading}
            </h2>
            <p className="nd-p-sm" style={{ marginBottom: "var(--space-4)" }}>{copy.readyBody}</p>
            <a href={`/${locale}/start`} className="nd-link-arrow">{copy.readyCta}</a>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
