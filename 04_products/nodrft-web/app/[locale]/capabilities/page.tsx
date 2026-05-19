import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Link from "next/link";
import type { Locale } from "@/content/types";
import { packages } from "@/content/capabilities";
import { PackageCard } from "@/components/ui/PackageCard";
import { FadeUp } from "@/components/motion/FadeUp";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.capabilities" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `https://nodrftsystems.com/${locale}/capabilities`,
      languages: {
        en: "https://nodrftsystems.com/en/capabilities",
        es: "https://nodrftsystems.com/es/capabilities",
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: `https://nodrftsystems.com/${locale}/capabilities`,
      images: [`/api/og?title=${encodeURIComponent(t("title"))}&locale=${locale}`],
    },
  };
}

const COPY = {
  en: {
    label: "PRICING",
    heading: "Clear scope. Defined deliverables. Built to hold.",
    lead: "Operating systems, websites, brand, and content. Starting prices shown where scope is standard. Operating systems and business management systems are priced on inquiry — scope determines cost.",
    nav: {
      heading: "Where do you start?",
      chips: [
        { label: "I need a brand or logo", href: "#section-brand" },
        { label: "I need a website", href: "#section-website" },
        { label: "I need a management system or OS", href: "#section-bms" },
        { label: "I need content or social media", href: "#section-content" },
        { label: "I'm not sure yet — help me scope it", href: "#section-ba" },
      ],
    },
    bundles: {
      heading: "Recommended Packages",
      lead: "Four named packages that bundle the most commonly needed services — strategy, brand, website, and content — into one scoped engagement.",
    },
    ba: {
      heading: "Business Architecture & Planning",
      lead: "Think before you build. A planning sprint defines your offer, constraints, recommended path, and build priorities — before any proposal is made.",
    },
    brand: {
      heading: "Brand & Identity",
      lead: "Logo, brand system, and visual standards — the foundation every other deliverable is built on. Delivered fast. Defined clearly.",
    },
    website: {
      heading: "Websites & Digital Presence",
      lead: "From a single conversion page to a full authority site. Explicit scope on every package — you know exactly what you own at handoff.",
      addonsHeading: "Website Add-Ons",
      addons: [
        { name: "E-commerce Add-on (to existing site)", price: "Starting at $1,900" },
        { name: "Standalone E-commerce Site", price: "Starting at $7,500" },
        { name: "Bilingual Setup — EN/ES (add-on)", price: "Starting at $1,900" },
        { name: "Client Portal / Member Site", price: "Starting at $3,700" },
      ],
    },
    bms: {
      heading: "Business Management Systems",
      lead: "Deployable business management tools built on the same governed infrastructure as the NoDrftSystems OS product line. Scoped and priced per engagement.",
      cta: "Every engagement begins with a scoping sprint. Submit an inquiry to discuss your requirements.",
      ctaButton: "Submit a BMS Inquiry",
    },
    os: {
      heading: "Business Operating Systems",
      lead: "NoDrftSystems builds and licenses Management Operating Systems — the operational software layer that runs how businesses work. Every OS runs on governance-grade infrastructure: identity and access control, inventory, audit trail, dashboards, alerts, and document management — with business-specific logic layered on top. Prebuilt products target regulated and operationally complex industries. Custom builds can be commissioned for any operational need.",
      lead2: "Prebuilt OS products are available for licensed deployment. If your industry has no existing product, a custom build can be commissioned — you become the first licensed operator.",
      lead3: "All OS engagements begin with a Product Fit & Feasibility Sprint.",
      ctaButton: "Submit an OS Inquiry",
    },
    platform: {
      heading: "Platforms & Applications",
      lead: "Workflow automation, CRM, dashboards, and custom-built platforms. Smaller scopes are standard-priced. Platform Starter and above are scoped on inquiry.",
    },
    content: {
      heading: "Content & Social Media",
      lead: "Monthly content production for blog, email, and social. All content delivered under editorial review. Platform ad spend is always client-managed — never bundled into production pricing.",
    },
    retainer: {
      heading: "Ongoing Support",
      lead: "Retainers for teams that need continued improvement, priority access, and system assurance after launch. All retainers are month-to-month or minimum-term as stated — never auto-bundled.",
    },
    advisory: {
      heading: "Advisory Rates",
      display: "Implementation support from $95/hr. Strategy, QA, and security review $125–$175/hr. Architecture, AI systems, and rescue work quoted separately.",
    },
    cta: {
      heading: "Ready to start?",
      body: "Submit a brief and we'll assess scope, fit, and the right starting point. If scope isn't clear yet, a scoping sprint is the right first step.",
      button: "Start an Engagement",
    },
  },
  es: {
    label: "PRECIOS",
    heading: "Alcance claro. Entregables definidos. Construido para durar.",
    lead: "Sistemas operativos, sitios web, marca y contenido. Precios iniciales visibles donde el alcance es estándar. Los sistemas operativos y sistemas de gestión empresarial se cotizan por consulta — el alcance determina el costo.",
    nav: {
      heading: "¿Por dónde empieza?",
      chips: [
        { label: "Necesito una marca o logotipo", href: "#section-brand" },
        { label: "Necesito un sitio web", href: "#section-website" },
        { label: "Necesito un sistema de gestión u OS", href: "#section-bms" },
        { label: "Necesito contenido o redes sociales", href: "#section-content" },
        { label: "No estoy seguro aún — ayúdeme a definir el alcance", href: "#section-ba" },
      ],
    },
    bundles: {
      heading: "Paquetes Recomendados",
      lead: "Cuatro paquetes nombrados que agrupan los servicios más solicitados — estrategia, marca, sitio web y contenido — en un solo proyecto con alcance definido.",
    },
    ba: {
      heading: "Arquitectura y Planificación Empresarial",
      lead: "Piense antes de construir. Un sprint de planificación define su oferta, restricciones, camino recomendado y prioridades de construcción — antes de hacer cualquier propuesta.",
    },
    brand: {
      heading: "Marca e Identidad",
      lead: "Logotipo, sistema de marca y estándares visuales — la base sobre la que se construye cada entregable. Entregados rápido. Definidos con claridad.",
    },
    website: {
      heading: "Sitios Web y Presencia Digital",
      lead: "Desde una página de conversión única hasta un sitio de autoridad completo. Alcance explícito en cada paquete — usted sabe exactamente qué posee al momento del traspaso.",
      addonsHeading: "Complementos para Sitios Web",
      addons: [
        { name: "Complemento de e-commerce (a sitio existente)", price: "Desde $1,900" },
        { name: "Sitio de e-commerce independiente", price: "Desde $7,500" },
        { name: "Configuración bilingüe EN/ES (complemento)", price: "Desde $1,900" },
        { name: "Portal de cliente / Sitio de miembros", price: "Desde $3,700" },
      ],
    },
    bms: {
      heading: "Sistemas de Gestión Empresarial",
      lead: "Herramientas de gestión empresarial desplegables construidas sobre la misma infraestructura gobernada que la línea de productos OS de NoDrftSystems. Precio y alcance por proyecto.",
      cta: "Cada proyecto comienza con un sprint de alcance. Envíe una consulta para discutir sus requisitos.",
      ctaButton: "Enviar una Consulta de SGE",
    },
    os: {
      heading: "Sistemas Operativos Empresariales",
      lead: "NoDrftSystems construye y licencia Sistemas Operativos de Gestión — la capa de software operativo que define cómo funcionan los negocios. Cada OS corre sobre infraestructura de nivel gobernanza: control de identidad y acceso, inventario, registro de auditoría, paneles, alertas y gestión de documentos — con lógica específica del negocio encima. Los productos preintegrados están orientados a industrias reguladas y operacionalmente complejas. Las construcciones personalizadas pueden encargarse para cualquier necesidad operativa.",
      lead2: "Los productos OS preintegrados están disponibles para despliegue licenciado. Si su industria no tiene producto existente, se puede encargar una construcción personalizada — usted se convierte en el primer operador licenciado.",
      lead3: "Todos los proyectos OS comienzan con un Sprint de Ajuste y Viabilidad del Producto.",
      ctaButton: "Enviar una Consulta de OS",
    },
    platform: {
      heading: "Plataformas y Aplicaciones",
      lead: "Automatización de flujos, CRM, paneles y plataformas construidas a medida. Los alcances menores tienen precio fijo. La Plataforma Inicial y superiores se cotizan por consulta.",
    },
    content: {
      heading: "Contenido y Redes Sociales",
      lead: "Producción mensual de contenido para blog, email y redes sociales. Todo el contenido se entrega bajo revisión editorial. El gasto en publicidad siempre es gestionado por el cliente — nunca incluido en el precio de producción.",
    },
    retainer: {
      heading: "Soporte Continuo",
      lead: "Retainers para equipos que necesitan mejora continua, acceso prioritario y aseguramiento de sistemas después del lanzamiento. Todos los retainers son mes a mes o con término mínimo según se indica — nunca agrupados automáticamente.",
    },
    advisory: {
      heading: "Tarifas de Consultoría",
      display: "Soporte de implementación desde $95/hr. Estrategia, QA y revisión de seguridad $125–$175/hr. Arquitectura, sistemas de IA y trabajos de rescate se cotizan por separado.",
    },
    cta: {
      heading: "¿Listo para comenzar?",
      body: "Envíe un brief y evaluaremos alcance, ajuste y el punto de partida correcto. Si el alcance aún no está claro, un sprint de alcance es el primer paso adecuado.",
      button: "Iniciar un Proyecto",
    },
  },
};

export default async function CapabilitiesPage({ params }: Props) {
  const { locale } = await params;
  const loc = locale as Locale;
  const copy = COPY[loc];
  const startHref = `/${locale}/start`;

  const byCategory = (cat: string) => packages.filter((p) => p.category === cat);

  const bundlePackages = byCategory("bundle");
  const baPackages = byCategory("ba");
  const brandPackages = byCategory("brand");
  const websitePackages = byCategory("website");
  const bmsPackages = byCategory("bms");
  const osPackages = byCategory("os");
  const platformPackages = byCategory("platform");
  const contentPackages = byCategory("content");
  const retainerPackages = byCategory("retainer");

  return (
    <>
      {/* Header */}
      <section className="nd-section nd-geo-bg" aria-labelledby="capabilities-heading">
        <div className="nd-wrap">
          <FadeUp>
            <span className="nd-label nd-label-block">{copy.label}</span>
            <h1 id="capabilities-heading" className="nd-h1" style={{ marginBottom: "var(--space-6)" }}>
              {copy.heading}
            </h1>
            <p className="nd-lead">{copy.lead}</p>
          </FadeUp>
        </div>
      </section>

      {/* Decision Navigator */}
      <section className="nd-section alt" aria-labelledby="nav-heading">
        <div className="nd-wrap">
          <FadeUp>
            <h2 id="nav-heading" className="nd-h2 nd-h2-mb6">{copy.nav.heading}</h2>
          </FadeUp>
          <div className="nd-chip-row">
            {copy.nav.chips.map((chip, i) => (
              <FadeUp key={i} delay={i * 0.05}>
                <a href={chip.href} className="nd-chip">{chip.label}</a>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Bundles */}
      <section id="section-bundle" className="nd-section nd-grid-bg" aria-labelledby="bundles-heading" style={{ scrollMarginTop: "var(--nav-height)" }}>
        <div className="nd-wrap">
          <FadeUp>
            <h2 id="bundles-heading" className="nd-h2 nd-h2-mb4">{copy.bundles.heading}</h2>
            <p className="nd-p nd-mb8">{copy.bundles.lead}</p>
          </FadeUp>
        </div>
      </section>
      {bundlePackages.map((pkg, i) => (
        <PackageCard key={pkg.id} pkg={pkg} locale={loc} startHref={startHref} alt={i % 2 === 0} />
      ))}

      {/* Business Architecture & Planning */}
      <section id="section-ba" className="nd-section alt" aria-labelledby="ba-heading" style={{ scrollMarginTop: "var(--nav-height)" }}>
        <div className="nd-wrap">
          <FadeUp>
            <h2 id="ba-heading" className="nd-h2 nd-h2-mb4">{copy.ba.heading}</h2>
            <p className="nd-p nd-mb8">{copy.ba.lead}</p>
          </FadeUp>
        </div>
      </section>
      {baPackages.map((pkg, i) => (
        <PackageCard key={pkg.id} pkg={pkg} locale={loc} startHref={startHref} alt={i % 2 !== 0} />
      ))}

      {/* Brand & Identity */}
      <section id="section-brand" className="nd-section nd-grid-bg" aria-labelledby="brand-heading" style={{ scrollMarginTop: "var(--nav-height)" }}>
        <div className="nd-wrap">
          <FadeUp>
            <h2 id="brand-heading" className="nd-h2 nd-h2-mb4">{copy.brand.heading}</h2>
            <p className="nd-p nd-mb8">{copy.brand.lead}</p>
          </FadeUp>
        </div>
      </section>
      {brandPackages.map((pkg, i) => (
        <PackageCard key={pkg.id} pkg={pkg} locale={loc} startHref={startHref} alt={i % 2 === 0} />
      ))}

      {/* Websites */}
      <section id="section-website" className="nd-section alt" aria-labelledby="website-heading" style={{ scrollMarginTop: "var(--nav-height)" }}>
        <div className="nd-wrap">
          <FadeUp>
            <h2 id="website-heading" className="nd-h2 nd-h2-mb4">{copy.website.heading}</h2>
            <p className="nd-p nd-mb8">{copy.website.lead}</p>
          </FadeUp>
        </div>
      </section>
      {websitePackages.map((pkg, i) => (
        <PackageCard key={pkg.id} pkg={pkg} locale={loc} startHref={startHref} alt={i % 2 !== 0} />
      ))}

      {/* Website Add-Ons */}
      <section className="nd-section nd-grid-bg" aria-labelledby="addons-heading">
        <div className="nd-wrap">
          <FadeUp>
            <h3 id="addons-heading" className="nd-h3" style={{ marginBottom: "var(--space-6)" }}>
              {copy.website.addonsHeading}
            </h3>
          </FadeUp>
          <div className="nd-compare-table" role="table" aria-label={copy.website.addonsHeading}>
            <div className="nd-compare-row nd-compare-row--header" role="row">
              <div role="columnheader">{loc === "en" ? "Add-On" : "Complemento"}</div>
              <div role="columnheader">{loc === "en" ? "Starting Price" : "Precio inicial"}</div>
            </div>
            {copy.website.addons.map((addon, i) => (
              <FadeUp key={i} delay={i * 0.04}>
                <div className="nd-compare-row" role="row">
                  <div role="cell">{addon.name}</div>
                  <div role="cell">{addon.price}</div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Business Management Systems */}
      <section id="section-bms" className="nd-section alt" aria-labelledby="bms-heading" style={{ scrollMarginTop: "var(--nav-height)" }}>
        <div className="nd-wrap">
          <FadeUp>
            <h2 id="bms-heading" className="nd-h2 nd-h2-mb4">{copy.bms.heading}</h2>
            <p className="nd-p nd-mb8">{copy.bms.lead}</p>
          </FadeUp>
        </div>
      </section>
      {bmsPackages.map((pkg, i) => (
        <PackageCard key={pkg.id} pkg={pkg} locale={loc} startHref={startHref} alt={i % 2 !== 0} />
      ))}
      <section className="nd-section nd-grid-bg">
        <div className="nd-wrap">
          <FadeUp>
            <div className="nd-section-cta">
              <p className="nd-p nd-section-cta__body">{copy.bms.cta}</p>
              <div className="nd-cta-row nd-cta-row--center">
                <Link href={startHref} className="btn">
                  {copy.bms.ctaButton}
                </Link>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Business Operating Systems */}
      <section id="section-os" className="nd-section alt" aria-labelledby="os-heading" style={{ scrollMarginTop: "var(--nav-height)" }}>
        <div className="nd-wrap">
          <FadeUp>
            <h2 id="os-heading" className="nd-h2 nd-h2-mb6">{copy.os.heading}</h2>
            <p className="nd-p" style={{ marginBottom: "var(--space-4)" }}>{copy.os.lead}</p>
            <p className="nd-p" style={{ marginBottom: "var(--space-4)" }}>{copy.os.lead2}</p>
            <p className="nd-p">{copy.os.lead3}</p>
          </FadeUp>
        </div>
      </section>
      {osPackages.map((pkg, i) => (
        <PackageCard key={pkg.id} pkg={pkg} locale={loc} startHref={startHref} alt={i % 2 !== 0} />
      ))}
      <section className="nd-section nd-grid-bg">
        <div className="nd-wrap">
          <FadeUp>
            <div className="nd-section-cta">
              <div className="nd-cta-row nd-cta-row--center">
                <Link href={startHref} className="btn">
                  {copy.os.ctaButton}
                </Link>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Platforms & Applications */}
      <section id="section-platform" className="nd-section alt" aria-labelledby="platform-heading" style={{ scrollMarginTop: "var(--nav-height)" }}>
        <div className="nd-wrap">
          <FadeUp>
            <h2 id="platform-heading" className="nd-h2 nd-h2-mb4">{copy.platform.heading}</h2>
            <p className="nd-p nd-mb8">{copy.platform.lead}</p>
          </FadeUp>
        </div>
      </section>
      {platformPackages.map((pkg, i) => (
        <PackageCard key={pkg.id} pkg={pkg} locale={loc} startHref={startHref} alt={i % 2 !== 0} />
      ))}

      {/* Content & Social Media */}
      <section id="section-content" className="nd-section nd-grid-bg" aria-labelledby="content-heading" style={{ scrollMarginTop: "var(--nav-height)" }}>
        <div className="nd-wrap">
          <FadeUp>
            <h2 id="content-heading" className="nd-h2 nd-h2-mb4">{copy.content.heading}</h2>
            <p className="nd-p nd-mb8">{copy.content.lead}</p>
          </FadeUp>
        </div>
      </section>
      {contentPackages.map((pkg, i) => (
        <PackageCard key={pkg.id} pkg={pkg} locale={loc} startHref={startHref} alt={i % 2 === 0} />
      ))}

      {/* Ongoing Support */}
      <section id="section-retainer" className="nd-section alt" aria-labelledby="retainer-heading" style={{ scrollMarginTop: "var(--nav-height)" }}>
        <div className="nd-wrap">
          <FadeUp>
            <h2 id="retainer-heading" className="nd-h2 nd-h2-mb4">{copy.retainer.heading}</h2>
            <p className="nd-p nd-mb8">{copy.retainer.lead}</p>
          </FadeUp>
        </div>
      </section>
      {retainerPackages.map((pkg, i) => (
        <PackageCard key={pkg.id} pkg={pkg} locale={loc} startHref={startHref} alt={i % 2 !== 0} />
      ))}

      {/* Advisory Rates */}
      <section id="section-advisory" className="nd-section nd-grid-bg" aria-labelledby="advisory-heading" style={{ scrollMarginTop: "var(--nav-height)" }}>
        <div className="nd-wrap">
          <FadeUp>
            <h2 id="advisory-heading" className="nd-h2" style={{ marginBottom: "var(--space-6)" }}>
              {copy.advisory.heading}
            </h2>
            <blockquote className="nd-advisory-quote">
              <p className="nd-p">{copy.advisory.display}</p>
            </blockquote>
          </FadeUp>
        </div>
      </section>

      {/* CTA */}
      <section className="nd-section alt" aria-labelledby="capabilities-cta-heading">
        <div className="nd-wrap">
          <FadeUp>
            <div className="nd-section-cta">
              <h2 id="capabilities-cta-heading" className="nd-h2 nd-h2-mb4">{copy.cta.heading}</h2>
              <p className="nd-p nd-section-cta__body">{copy.cta.body}</p>
              <div className="nd-cta-row nd-cta-row--center">
                <Link href={startHref} className="btn btn--lg">{copy.cta.button}</Link>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
