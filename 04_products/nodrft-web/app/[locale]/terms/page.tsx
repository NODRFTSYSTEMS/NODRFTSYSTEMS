import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import type { Locale } from "@/content/types";
import { FadeUp } from "@/components/motion/FadeUp";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.terms" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `https://nodrftsystems.com/${locale}/terms`,
      languages: {
        en: "https://nodrftsystems.com/en/terms",
        es: "https://nodrftsystems.com/es/terms",
      },
    },
  };
}

const COPY = {
  en: {
    label: "Legal",
    heading: "Terms of Service",
    updated: "Last updated: May 2025",
    notice: "These terms apply to use of the nodrftsystems.com website. Project engagements are governed by a separate Master Service Agreement (MSA) and Statement of Work (SOW) signed between NoDrftSystems and the client. In the event of conflict between these terms and a signed MSA/SOW, the MSA/SOW governs.",
    sections: [
      {
        heading: "Use of this website",
        body: "This website is operated by NoDrftSystems. By using it, you agree to these terms. The content on this site is for informational purposes. Nothing on this site constitutes a binding proposal, legal advice, or guaranteed availability of services.",
      },
      {
        heading: "No public pricing commitment",
        body: "Pricing displayed on this website, if any, is indicative only and subject to change without notice. Final pricing is determined after scope review and is communicated through a formal proposal or SOW. No pricing shown on the public site creates a binding price commitment.",
      },
      {
        heading: "Intellectual property",
        body: "All content on this site — copy, design, code, images, and brand assets — is owned by NoDrftSystems unless otherwise noted. You may not reproduce, distribute, or use any content from this site for commercial purposes without written permission.",
      },
      {
        heading: "Form submissions",
        body: "Information submitted through forms on this site is used to evaluate your request and respond. Submitting a form does not create a client relationship, commit NoDrftSystems to providing services, or guarantee a response within a specific timeframe.",
      },
      {
        heading: "Limitation of liability",
        body: "NoDrftSystems is not liable for any damages arising from use of or inability to use this website, including errors, interruptions, or inaccuracies in content. The website is provided as-is without warranties of any kind.",
      },
      {
        heading: "Third-party links",
        body: "This site may contain links to third-party websites. NoDrftSystems is not responsible for the content, privacy practices, or accuracy of any third-party site.",
      },
      {
        heading: "Changes to these terms",
        body: "These terms may be updated at any time. Continued use of the website following any update constitutes acceptance of the revised terms.",
      },
      {
        heading: "Contact",
        body: "For questions about these terms: sales@nodrftsystems.com",
      },
    ],
  },
  es: {
    label: "Legal",
    heading: "Términos de Servicio",
    updated: "Última actualización: mayo de 2025",
    notice: "Estos términos aplican al uso del sitio web nodrftsystems.com. Los proyectos de colaboración están gobernados por un Contrato Marco de Servicios (MSA) y una Declaración de Trabajo (SOW) separados, firmados entre NoDrftSystems y el cliente. En caso de conflicto entre estos términos y un MSA/SOW firmado, prevalece el MSA/SOW.",
    sections: [
      {
        heading: "Uso de este sitio web",
        body: "Este sitio web es operado por NoDrftSystems. Al usarlo, acepta estos términos. El contenido de este sitio es solo para fines informativos. Nada en este sitio constituye una propuesta vinculante, asesoramiento legal o disponibilidad garantizada de servicios.",
      },
      {
        heading: "Sin compromiso de precios públicos",
        body: "Los precios mostrados en este sitio web, si los hay, son solo indicativos y pueden cambiar sin previo aviso. El precio final se determina después de la revisión del alcance y se comunica a través de una propuesta formal o SOW. Ningún precio mostrado en el sitio público crea un compromiso de precio vinculante.",
      },
      {
        heading: "Propiedad intelectual",
        body: "Todo el contenido de este sitio — textos, diseño, código, imágenes y activos de marca — es propiedad de NoDrftSystems salvo que se indique lo contrario. No puede reproducir, distribuir ni usar ningún contenido de este sitio con fines comerciales sin permiso escrito.",
      },
      {
        heading: "Envíos de formularios",
        body: "La información enviada a través de formularios en este sitio se utiliza para evaluar su solicitud y responder. El envío de un formulario no crea una relación de cliente, no compromete a NoDrftSystems a proporcionar servicios, ni garantiza una respuesta dentro de un plazo específico.",
      },
      {
        heading: "Limitación de responsabilidad",
        body: "NoDrftSystems no es responsable de los daños que surjan del uso o la imposibilidad de usar este sitio web, incluidos errores, interrupciones o inexactitudes en el contenido. El sitio web se proporciona tal cual, sin garantías de ningún tipo.",
      },
      {
        heading: "Enlaces a terceros",
        body: "Este sitio puede contener enlaces a sitios web de terceros. NoDrftSystems no es responsable del contenido, las prácticas de privacidad ni la exactitud de ningún sitio de terceros.",
      },
      {
        heading: "Cambios a estos términos",
        body: "Estos términos pueden actualizarse en cualquier momento. El uso continuado del sitio web después de cualquier actualización constituye la aceptación de los términos revisados.",
      },
      {
        heading: "Contacto",
        body: "Para preguntas sobre estos términos: sales@nodrftsystems.com",
      },
    ],
  },
};

export default async function TermsPage({ params }: Props) {
  const { locale } = await params;
  const loc = locale as Locale;
  const copy = COPY[loc];

  return (
    <section className="nd-section nd-geo-bg" aria-labelledby="terms-heading">
      <div className="nd-wrap-narrow">
        <FadeUp>
          <span className="nd-label" style={{ display: "block", marginBottom: "var(--space-4)" }}>
            {copy.label}
          </span>
          <h1 id="terms-heading" className="nd-h1" style={{ marginBottom: "var(--space-3)" }}>
            {copy.heading}
          </h1>
          <p className="nd-p-xs nd-pkg-subtext" style={{ marginBottom: "var(--space-6)" }}>
            {copy.updated}
          </p>
          <div className="nd-notice" style={{ marginBottom: "var(--space-8)" }}>
            <p className="nd-p-sm">{copy.notice}</p>
          </div>
        </FadeUp>
        <div className="nd-legal">
          {copy.sections.map((section, i) => (
            <FadeUp key={i} delay={i * 0.04}>
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
