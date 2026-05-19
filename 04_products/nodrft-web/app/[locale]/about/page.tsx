import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import type { Locale } from "@/content/types";
import { ProcessStep } from "@/components/ui/ProcessStep";
import { FadeUp } from "@/components/motion/FadeUp";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.about" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `https://nodrftsystems.com/${locale}/about`,
      languages: {
        en: "https://nodrftsystems.com/en/about",
        es: "https://nodrftsystems.com/es/about",
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: `https://nodrftsystems.com/${locale}/about`,
      images: [`/api/og?title=${encodeURIComponent(t("title"))}&locale=${locale}`],
    },
  };
}

const COPY = {
  en: {
    heading: "About NoDrftSystems",
    lead: "NoDrftSystems is built around one operating principle: what ships must stay correct. Structured scoping, controlled delivery, and review discipline—so your digital presence reflects your actual quality, long after handoff.",
    standardLabel: "Operating standard",
    standardHeading: "Built to solve a specific failure mode.",
    standardP1: "NoDrftSystems designs, builds, and licenses Management Operating Systems — the operational software layer that runs how businesses work. Websites, brand systems, and content production support every engagement. The primary product line is the MOS portfolio: deployable platforms and management systems for businesses that need structured operations, compliant infrastructure, and systems built to last.",
    standardP2: "The operating standard that governs every engagement: scope is defined before work begins, quality is validated before anything ships, and handoff is structured so the client owns the result without requiring continued access to the builder. These aren’t commitments made in a proposal—they are conditions of engagement.",
    scopeLabel: "Scope",
    scopeHeading: "What we build",
    scopeBody: "AI-integrated Management Operating Systems for businesses that need structured operations — POS, inventory, staff management, scheduling, HR, and full OS platforms. Websites, brand, and content for organizations that need delivery discipline and systems that stay correct after handoff.",
    methodLabel: "Method",
    methodHeading: "How we work",
    methodBody: "Human authority drives every decision. AI tools accelerate production. Every deliverable is reviewed before it ships. Scope is confirmed before work begins. Nothing ships without sign-off.",
    engagementLabel: "Engagement",
    engagementHeading: "Why clients engage",
    engagementBody: "Organizations choose NoDrftSystems when they need clarity before build, structured packages with explicit boundaries, disciplined execution, and systems that stay correct after handoff. We decline projects that don’t match our strengths.",
    postureLabel: "Posture",
    postureHeading: "Selective posture",
    postureBody: "Not every project is accepted. We evaluate scope clarity, readiness to decide, budget reality, and communication fit before proposing. This protects both sides.",
    discretionLabel: "Discretion",
    discretionHeading: "Privacy and discretion",
    discretionBody: "Sensitive projects are handled with professional discretion. Client information is protected. Proof is presented without naming dependency. Internal methods are not disclosed.",
    howLabel: "How engagements work",
    steps: [
      { num: "01", title: "Qualification & Fit", body: "We evaluate scope clarity, budget, timeline, and communication fit before any proposal." },
      { num: "02", title: "Discovery & Scope", body: "For complex projects, a Discovery Sprint defines requirements, constraints, and execution plan." },
      { num: "03", title: "Design & Structure", body: "We establish design direction, content structure, and technical architecture. Client review gates each decision." },
      { num: "04", title: "Build & QA", body: "Implementation proceeds in bounded milestones with multi-pass quality review at each stage." },
      { num: "05", title: "Launch & Handover", body: "Nothing ships without explicit sign-off at each gate. Training and documentation included." },
      { num: "06", title: "Post-Launch Support", body: "Stabilization period, defined support boundaries, and optional retainer for ongoing iteration." },
    ],
    ctaHeading: "Have a project in mind?",
    ctaBody: "If the engagement model fits, submit a brief and we’ll assess scope, fit, and the right starting point. If scope isn’t clear yet, a Discovery Sprint is the right first step.",
    ctaPrimary: "Start an Engagement",
    ctaSecondary: "View Selected Engagements",
  },
  es: {
    heading: "Sobre NoDrftSystems",
    lead: "NoDrftSystems opera bajo un principio: lo que se publica debe mantenerse correcto. Alcance estructurado, entrega controlada y disciplina de revisión—para que su presencia digital refleje su calidad real, mucho después del traspaso.",
    standardLabel: "Estándar operativo",
    standardHeading: "Construida para resolver un modo de fallo específico.",
    standardP1: "NoDrftSystems diseña, construye y licencia Sistemas Operativos de Gestión — la capa de software operativo que define cómo funcionan los negocios. Los sitios web, sistemas de marca y producción de contenido respaldan cada proyecto. La línea de productos principal es el portafolio MOS: plataformas desplegables y sistemas de gestión para negocios que necesitan operaciones estructuradas, infraestructura conforme y sistemas construidos para durar.",
    standardP2: "El estándar operativo que rige cada compromiso: el alcance se define antes de que comience el trabajo, la calidad se valida antes de que se publique cualquier cosa, y el traspaso se estructura para que el cliente sea propietario del resultado sin requerir acceso continuo al constructor. Estos no son compromisos hechos en una propuesta: son condiciones del compromiso.",
    scopeLabel: "Alcance",
    scopeHeading: "Qué construimos",
    scopeBody: "Sistemas Operativos de Gestión con IA integrada para negocios que necesitan operaciones estructuradas — POS, inventario, gestión de personal, citas, RR. HH. y plataformas OS completas. Sitios web, marca y contenido para organizaciones que necesitan disciplina de entrega y sistemas que se mantengan correctos después del traspaso.",
    methodLabel: "Método",
    methodHeading: "Cómo trabajamos",
    methodBody: "La autoridad humana guía cada decisión. Las herramientas de IA aceleran la producción. Cada entregable es revisado antes de publicarse. El alcance se confirma antes de iniciar. Nada se publica sin aprobación.",
    engagementLabel: "Compromiso",
    engagementHeading: "Por qué nos eligen",
    engagementBody: "Las organizaciones eligen NoDrftSystems cuando necesitan claridad antes de construir, paquetes estructurados con límites explícitos y sistemas correctos tras el traspaso. Declinamos proyectos que no coinciden con nuestras fortalezas.",
    postureLabel: "Postura",
    postureHeading: "Postura selectiva",
    postureBody: "No todos los proyectos son aceptados. Evaluamos claridad de alcance, disposición para decidir, presupuesto y comunicación antes de proponer. Esto protege a ambas partes.",
    discretionLabel: "Discreción",
    discretionHeading: "Privacidad y discreción",
    discretionBody: "Los proyectos sensibles se manejan con discreción profesional. La información del cliente está protegida. Los resultados se presentan sin revelar dependencias. Los métodos internos no se divulgan.",
    howLabel: "Cómo funcionan los compromisos",
    steps: [
      { num: "01", title: "Calificación y Ajuste", body: "Evaluamos claridad de alcance, presupuesto, cronograma y comunicación antes de proponer." },
      { num: "02", title: "Descubrimiento y Alcance", body: "Para proyectos complejos, un Discovery Sprint define requisitos y plan de ejecución." },
      { num: "03", title: "Diseño y Estructura", body: "Establecemos dirección de diseño, estructura de contenido y arquitectura técnica. El cliente revisa cada decisión." },
      { num: "04", title: "Construcción y QA", body: "Implementación en hitos con revisión de calidad multi-paso en cada etapa." },
      { num: "05", title: "Lanzamiento y Traspaso", body: "Nada se publica sin aprobación explícita en cada etapa. Capacitación y documentación incluidas." },
      { num: "06", title: "Soporte Post-Lanzamiento", body: "Período de estabilización, límites de soporte definidos y retainer opcional para iteración continua." },
    ],
    ctaHeading: "¿Tiene un proyecto en mente?",
    ctaBody: "Si el modelo de trabajo encaja, envíe un brief y evaluaremos alcance, ajuste y el punto de partida correcto. Si el alcance aún no está claro, un Discovery Sprint es el primer paso adecuado.",
    ctaPrimary: "Iniciar un Proyecto",
    ctaSecondary: "Ver Proyectos Seleccionados",
  },
};

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  const loc = locale as Locale;
  const copy = COPY[loc];

  return (
    <>
      {/* Header */}
      <section className="nd-section nd-geo-bg" aria-labelledby="about-heading">
        <div className="nd-wrap">
          <FadeUp>
            <h1 id="about-heading" className="nd-h1" style={{ marginBottom: "var(--space-6)" }}>
              {copy.heading}
            </h1>
            <p className="nd-lead">{copy.lead}</p>
          </FadeUp>
        </div>
      </section>

      {/* Operating standard */}
      <section className="nd-section" aria-labelledby="standard-heading">
        <div className="nd-wrap">
          <FadeUp>
            <span className="nd-label" style={{ display: "block", marginBottom: "var(--space-4)" }}>
              {copy.standardLabel}
            </span>
            <h2 id="standard-heading" className="nd-h2" style={{ marginBottom: "var(--space-6)" }}>
              {copy.standardHeading}
            </h2>
          </FadeUp>
          <FadeUp delay={0.07}>
            <p className="nd-p" style={{ marginBottom: "var(--space-6)" }}>{copy.standardP1}</p>
            <p className="nd-p">{copy.standardP2}</p>
          </FadeUp>
        </div>
      </section>

      {/* Scope + Method */}
      <section className="nd-section alt" aria-labelledby="scope-heading">
        <div className="nd-wrap">
          <FadeUp>
            <span className="nd-label" style={{ display: "block", marginBottom: "var(--space-3)" }}>
              {copy.scopeLabel}
            </span>
            <h2 id="scope-heading" className="nd-h2" style={{ marginBottom: "var(--space-4)" }}>
              {copy.scopeHeading}
            </h2>
            <p className="nd-p">{copy.scopeBody}</p>
          </FadeUp>
          <hr className="nd-rule-accent" />
          <FadeUp delay={0.07}>
            <span className="nd-label" style={{ display: "block", marginBottom: "var(--space-3)" }}>
              {copy.methodLabel}
            </span>
            <h2 className="nd-h2" style={{ marginBottom: "var(--space-4)" }}>
              {copy.methodHeading}
            </h2>
            <p className="nd-p">{copy.methodBody}</p>
          </FadeUp>
        </div>
      </section>

      {/* Engagement + Posture */}
      <section className="nd-section" aria-labelledby="why-heading">
        <div className="nd-wrap">
          <FadeUp>
            <hr className="nd-rule-accent" />
            <span className="nd-label" style={{ display: "block", marginBottom: "var(--space-3)" }}>
              {copy.engagementLabel}
            </span>
            <h2 id="why-heading" className="nd-h2" style={{ marginBottom: "var(--space-4)" }}>
              {copy.engagementHeading}
            </h2>
            <p className="nd-p">{copy.engagementBody}</p>
          </FadeUp>
          <hr className="nd-rule-accent" />
          <FadeUp delay={0.07}>
            <span className="nd-label" style={{ display: "block", marginBottom: "var(--space-3)" }}>
              {copy.postureLabel}
            </span>
            <h2 className="nd-h2" style={{ marginBottom: "var(--space-4)" }}>
              {copy.postureHeading}
            </h2>
            <p className="nd-p">{copy.postureBody}</p>
          </FadeUp>
        </div>
      </section>

      {/* Discretion */}
      <section className="nd-section alt" aria-labelledby="discretion-heading">
        <div className="nd-wrap">
          <FadeUp>
            <span className="nd-label" style={{ display: "block", marginBottom: "var(--space-3)" }}>
              {copy.discretionLabel}
            </span>
            <h2 id="discretion-heading" className="nd-h2" style={{ marginBottom: "var(--space-4)" }}>
              {copy.discretionHeading}
            </h2>
            <p className="nd-p">{copy.discretionBody}</p>
          </FadeUp>
        </div>
      </section>

      {/* 6-step methodology */}
      <section className="nd-section" aria-labelledby="method-heading">
        <div className="nd-wrap">
          <FadeUp>
            <span className="nd-label" style={{ display: "block" }}>{copy.howLabel}</span>
            <hr className="nd-rule-accent" />
          </FadeUp>
          {copy.steps.map((step, i) => (
            <FadeUp key={i} delay={i * 0.06}>
              <ProcessStep number={step.num} title={step.title} body={step.body} />
            </FadeUp>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="nd-section alt" aria-labelledby="about-cta-heading">
        <div className="nd-wrap">
          <FadeUp>
            <div className="nd-section-cta">
              <h2 id="about-cta-heading" className="nd-h2" style={{ marginBottom: "var(--space-4)" }}>
                {copy.ctaHeading}
              </h2>
              <p className="nd-p nd-section-cta__body">{copy.ctaBody}</p>
              <div className="nd-cta-row" style={{ justifyContent: "center" }}>
                <a href={`/${locale}/start`} className="btn">{copy.ctaPrimary}</a>
                <a href={`/${locale}/engagements`} className="btn--ghost">{copy.ctaSecondary}</a>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
