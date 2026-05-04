import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import type { Locale } from "@/content/types";
import { FadeUp } from "@/components/motion/FadeUp";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.privacy" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `https://nodrftsystems.com/${locale}/privacy`,
      languages: {
        en: "https://nodrftsystems.com/en/privacy",
        es: "https://nodrftsystems.com/es/privacy",
      },
    },
  };
}

const COPY = {
  en: {
    label: "Legal",
    heading: "Privacy Policy",
    updated: "Last updated: May 2025",
    sections: [
      {
        heading: "What we collect",
        body: "When you submit a form on this website — an engagement brief, an inquiry, or a specialist application — we collect the information you provide: name, email, organization, and message content. We do not collect data through cookies, tracking pixels, or third-party analytics beyond aggregate Vercel Analytics (page views only, no individual tracking).",
      },
      {
        heading: "How we use it",
        body: "Form submissions are used solely to evaluate and respond to your request. We do not sell, share, or license your personal information to third parties. We do not add you to marketing lists without your explicit consent.",
      },
      {
        heading: "Data storage",
        body: "Form submissions are forwarded to an internal inbox at sales@nodrftsystems.com. We do not maintain a persistent database of form submissions beyond operational email records. Project records for active engagements are retained per our standard engagement terms and destroyed after project close-out.",
      },
      {
        heading: "Third-party services",
        body: "This site is hosted on Vercel. Vercel may collect anonymized request logs as part of standard infrastructure operation. No other third-party services receive your personal data from this website.",
      },
      {
        heading: "Your rights",
        body: "You may request deletion of any personal information we hold about you by emailing sales@nodrftsystems.com. We will respond within 10 business days. If you are located in the EU/EEA, you have additional rights under GDPR — contact us to exercise them.",
      },
      {
        heading: "Contact",
        body: "For privacy questions or requests: sales@nodrftsystems.com",
      },
    ],
  },
  es: {
    label: "Legal",
    heading: "Política de Privacidad",
    updated: "Última actualización: mayo de 2025",
    sections: [
      {
        heading: "Qué recopilamos",
        body: "Cuando envía un formulario en este sitio — un brief de proyecto, una consulta o una aplicación de especialista — recopilamos la información que proporciona: nombre, correo electrónico, organización y contenido del mensaje. No recopilamos datos a través de cookies, píxeles de seguimiento ni analítica de terceros más allá de Vercel Analytics agregado (solo vistas de página, sin seguimiento individual).",
      },
      {
        heading: "Cómo lo usamos",
        body: "Los envíos de formularios se utilizan únicamente para evaluar y responder a su solicitud. No vendemos, compartimos ni licenciamos su información personal a terceros. No lo agregamos a listas de marketing sin su consentimiento explícito.",
      },
      {
        heading: "Almacenamiento de datos",
        body: "Los envíos de formularios se reenvían a una bandeja de entrada interna en sales@nodrftsystems.com. No mantenemos una base de datos persistente de envíos de formularios más allá de los registros operativos de correo electrónico. Los registros de proyectos para compromisos activos se conservan según nuestros términos de compromiso estándar y se eliminan después del cierre del proyecto.",
      },
      {
        heading: "Servicios de terceros",
        body: "Este sitio está alojado en Vercel. Vercel puede recopilar registros de solicitudes anonimizados como parte de la operación estándar de infraestructura. Ningún otro servicio de terceros recibe sus datos personales de este sitio web.",
      },
      {
        heading: "Sus derechos",
        body: "Puede solicitar la eliminación de cualquier información personal que tengamos sobre usted enviando un correo electrónico a sales@nodrftsystems.com. Responderemos en 10 días hábiles. Si se encuentra en la UE/EEE, tiene derechos adicionales bajo el RGPD — contáctenos para ejercerlos.",
      },
      {
        heading: "Contacto",
        body: "Para preguntas o solicitudes de privacidad: sales@nodrftsystems.com",
      },
    ],
  },
};

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  const loc = locale as Locale;
  const copy = COPY[loc];

  return (
    <section className="nd-section nd-geo-bg" aria-labelledby="privacy-heading">
      <div className="nd-wrap-narrow">
        <FadeUp>
          <span className="nd-label" style={{ display: "block", marginBottom: "var(--space-4)" }}>
            {copy.label}
          </span>
          <h1 id="privacy-heading" className="nd-h1" style={{ marginBottom: "var(--space-3)" }}>
            {copy.heading}
          </h1>
          <p className="nd-p-xs nd-pkg-subtext" style={{ marginBottom: "var(--space-8)" }}>
            {copy.updated}
          </p>
        </FadeUp>
        <div className="nd-legal">
          {copy.sections.map((section, i) => (
            <FadeUp key={i} delay={i * 0.05}>
              <div className="nd-legal-section">
                <h2 className="nd-h3 nd-legal-heading">{section.heading}</h2>
                <p className="nd-p nd-legal-body">{section.body}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
