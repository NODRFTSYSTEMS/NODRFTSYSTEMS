import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Link from "next/link";
import type { Locale } from "@/content/types";
import { FadeUp } from "@/components/motion/FadeUp";
import { HeroAnimated } from "@/components/motion/HeroAnimated";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.home" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `https://nodrftsystems.com/${locale}`,
      languages: {
        en: "https://nodrftsystems.com/en",
        es: "https://nodrftsystems.com/es",
        "x-default": "https://nodrftsystems.com/en",
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: `https://nodrftsystems.com/${locale}`,
      images: [`/api/og?title=${encodeURIComponent(t("title"))}&locale=${locale}`],
    },
  };
}

const MISCONCEPTIONS = {
  en: [
    {
      q: "“We already have a website.”",
      a: "Having a site and having a site that works are different things. Most websites function as presence markers, not conversion assets. The question is whether your site is doing work when you’re not in the room.",
    },
    {
      q: "“We get business through referrals.”",
      a: "Referrals still check the site. A warm introduction gets the attention; the site either validates the referral or quietly works against it. Most referral leakage is invisible—it happens before contact is made.",
    },
    {
      q: "“A freelancer can do this cheaper.”",
      a: "The comparison that matters is total project cost and delivery outcome — not hourly rate. Scope drift, rework cycles, and sites that fail without continued developer involvement are common in underscoped builds. You’re not hiring a rate. You’re buying a result.",
    },
    {
      q: "“We just need a refresh, not a rebuild.”",
      a: "A refresh fixes surface appearance. A rebuild fixes the underlying architecture. Most refresh requests are diagnosing symptom rather than cause—the site looks dated because the structure was wrong from the start.",
    },
    {
      q: "“This is for bigger companies.”",
      a: "The firms that defer digital infrastructure investment until they’re larger often don’t get there. Structured digital presence isn’t a reward for scale—it’s a condition for it.",
    },
    {
      q: "“We’ll do this once content is ready.”",
      a: "Content readiness is managed during scoping, not as a prerequisite to it. Waiting for perfect content postpones structure, routing, and design—and perfect content rarely arrives on its own.",
    },
    {
      q: "“We can build this in-house.”",
      a: "In-house teams often can. The question is governance and time-to-correct, not technical capability. Internal builds without external review architecture tend to accumulate debt quietly — scope changes get absorbed, test coverage slips, handoff documentation falls behind. The cost isn’t the build. It’s the first time something breaks and nobody knows why.",
    },
  ],
  es: [
    {
      q: "“Ya tenemos un sitio web.”",
      a: "Tener un sitio y tener un sitio que funcione son cosas distintas. La mayoría de los sitios web son marcadores de presencia, no activos de conversión. La pregunta es si su sitio trabaja cuando usted no está.",
    },
    {
      q: "“Conseguimos clientes por referencias.”",
      a: "Las referencias igual revisan el sitio. Una presentación cálida consigue la atención; el sitio la valida o silenciosamente trabaja en su contra. La fuga de referencias es invisible: ocurre antes de que se haga contacto.",
    },
    {
      q: "“Un freelancer puede hacerlo más barato.”",
      a: "La comparación que importa es el costo total del proyecto y el resultado final, no la tarifa por hora. La desviación del alcance, los ciclos de retrabajo y los sitios que fallan sin soporte continuo son comunes en construcciones mal definidas. No se contrata una tarifa. Se compra un resultado.",
    },
    {
      q: "“Solo necesitamos una actualización, no una reconstrucción.”",
      a: "Una actualización corrige la apariencia superficial. Una reconstrucción corrige la arquitectura subyacente. La mayoría de solicitudes de actualización diagnostican síntomas en lugar de causas.",
    },
    {
      q: "“Esto es para empresas más grandes.”",
      a: "Las empresas que difieren la inversión en infraestructura digital hasta ser más grandes a menudo no llegan. Una presencia digital estructurada no es una recompensa para la escala, es una condición para ella.",
    },
    {
      q: "“Lo haremos cuando el contenido esté listo.”",
      a: "La preparación del contenido se gestiona durante el alcance, no como requisito previo. Esperar contenido perfecto pospone estructura, enrutamiento y diseño.",
    },
    {
      q: "“Podemos construirlo internamente.”",
      a: "Los equipos internos a menudo pueden. La pregunta es gobernanza y tiempo de corrección, no capacidad técnica. Las construcciones internas sin arquitectura de revisión externa tienden a acumular deuda silenciosamente — los cambios de alcance se absorben, la cobertura de pruebas cae, la documentación de traspaso se queda atrás. El costo no es la construcción. Es la primera vez que algo falla y nadie sabe por qué.",
    },
  ],
};

const FIT = {
  en: {
    label: "Who we serve best",
    items: [
      "Organizations that lose business when their digital presence doesn’t match their actual quality",
      "Teams with a clear owner — one person who can say yes, hold the scope, and move without a committee",
      "Founders and operators who have been burned by a previous build — and need a delivery model with real accountability, not a new round of promises",
      "Companies building platforms and tools that need to work five years from now, not just at launch",
      "Organizations in regulated industries — pharmacy, healthcare, financial services, and retail — that need a production-ready operating platform without building one from scratch.",
    ],
    note: "Not every project is accepted. Fit matters to the quality of the outcome. We evaluate scope clarity, timeline, decision structure, and budget reality before proposing. When it’s a strong fit, the engagement gets full commitment.",
  },
  es: {
    label: "A quiénes servimos mejor",
    items: [
      "Organizaciones que pierden negocios cuando su presencia digital no refleja su calidad real",
      "Equipos con un responsable claro — una persona que puede decir sí, mantener el alcance y avanzar sin comités",
      "Fundadores y operadores que han sufrido las consecuencias de una construcción anterior — y necesitan un modelo de entrega con responsabilidad real, no una nueva ronda de promesas",
      "Empresas que construyen plataformas y herramientas que necesitan funcionar en cinco años, no solo al lanzamiento",
      "Organizaciones en industrias reguladas — farmacia, salud, servicios financieros y comercio minorista — que necesitan una plataforma operativa lista para producción sin tener que construirla desde cero.",
    ],
    note: "No todos los proyectos son aceptados. El ajuste importa para la calidad del resultado. Evaluamos la claridad del alcance, el cronograma, la estructura de decisiones y la realidad del presupuesto antes de proponer. Cuando es un ajuste sólido, el compromiso es total.",
  },
};

const PROCESS = {
  en: [
    { num: "01", title: "Discovery", body: "Clarify business goals, constraints, and fit. Confirm whether engagement is the right move." },
    { num: "02", title: "Scope Definition", body: "Confirm exactly what is being built, what is excluded, and what success means." },
    { num: "03", title: "Structure & Direction", body: "Establish content architecture, page or system logic, and design direction." },
    { num: "04", title: "Build", body: "Implementation under controlled execution with bounded milestones and review gates." },
    { num: "05", title: "Review & QA", body: "Validation, corrections, and release checks. Nothing ships without sign-off." },
    { num: "06", title: "Launch & Handoff", body: "Deployment, documentation, and next-step recommendation. Client owns the result." },
  ],
  es: [
    { num: "01", title: "Descubrimiento", body: "Clarificar objetivos de negocio, restricciones y ajuste. Confirmar si el compromiso es la decisión correcta." },
    { num: "02", title: "Definición de Alcance", body: "Confirmar exactamente qué se construye, qué se excluye y qué significa el éxito." },
    { num: "03", title: "Estructura y Dirección", body: "Establecer arquitectura de contenido, lógica de página o sistema, y dirección de diseño." },
    { num: "04", title: "Construcción", body: "Implementación bajo ejecución controlada con hitos acotados y compuertas de revisión." },
    { num: "05", title: "Revisión y Validación", body: "Validación, correcciones y verificaciones de lanzamiento. Nada se publica sin aprobación." },
    { num: "06", title: "Lanzamiento y Traspaso", body: "Despliegue, documentación y recomendación del siguiente paso. El cliente es propietario del resultado." },
  ],
};

const ENTRY_PKGS = {
  en: [
    { name: "Logo & Brand Identity", body: "Logo, color, typography, and brand standards — the foundation every site and platform is built on.", sub: "From a single logo to a full brand identity system.", timeline: "From $400" },
    { name: "Business Website", body: "Single conversion page to full authority site — scoped before build begins.", sub: "From a landing page to a 15-page authority build. Scope drives price.", timeline: "From $750" },
    { name: "Content & Social", body: "Blog, email, and social content produced under editorial review.", sub: "Monthly retainers. Volume and platform mix confirmed at onboarding.", timeline: "From $750/month" },
    { name: "Business Operating Systems", body: "POS, timecards, inventory, scheduling, and full OS platforms — built for how your business actually runs.", sub: "Deployable systems for regulated and operationally complex businesses. Scoped on inquiry.", timeline: "Inquiry" },
  ],
  es: [
    { name: "Logotipo e Identidad de Marca", body: "Logotipo, color, tipografía y estándares de marca — la base sobre la que se construye todo sitio y plataforma.", sub: "Desde un solo logotipo hasta un sistema de identidad de marca completo.", timeline: "Desde $400" },
    { name: "Sitio Web Empresarial", body: "Desde una página de conversión hasta un sitio de autoridad completo — definido antes de construir.", sub: "Desde una landing page hasta un sitio de 15 páginas. El alcance determina el precio.", timeline: "Desde $750" },
    { name: "Contenido y Redes Sociales", body: "Blog, email y contenido para redes sociales producido bajo revisión editorial.", sub: "Retainers mensuales. Volumen y plataformas confirmados al inicio.", timeline: "Desde $750/mes" },
    { name: "Sistemas Operativos para Negocios", body: "POS, tarjetas de tiempo, inventario, citas y plataformas OS completas — construidos para como funciona su negocio.", sub: "Sistemas desplegables para negocios regulados y operacionalmente complejos. Precio por consulta.", timeline: "Consulta" },
  ],
};

const WORK_ON_RECORD = {
  en: {
    label: "Work on record",
    items: [
      "Restructured the digital presence of a 30-person professional services firm — from a static site to a structured authority build with bilingual delivery and self-qualifying intake flow.",
      "Deployed a regulated business operating system for an independent pharmacy — prescription workflow, dispensing, compliance layer, and AI-assisted processing. First licensed deployment of a proprietary NoDrftSystems OS product.",
    ],
    disclaimer: "Client names not disclosed. Outcomes framed qualitatively.",
    link: "View all selected engagements →",
  },
  es: {
    label: "Trabajo realizado",
    items: [
      "Reestructuración de la presencia digital de una firma de servicios profesionales de 30 personas — de un sitio estático a una plataforma de autoridad con entrega bilingüe y flujo de intake auto-calificante.",
      "Despliegue de un sistema operativo empresarial regulado para una farmacia independiente — flujo de prescripciones, dispensación, capa de cumplimiento normativo y procesamiento asistido por IA. Primer despliegue licenciado de un producto OS propietario de NoDrftSystems.",
    ],
    disclaimer: "Nombres de clientes no revelados. Resultados enmarcados cualitativamente.",
    link: "Ver todos los proyectos seleccionados →",
  },
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });
  const loc = locale as Locale;

  const misconceptions = MISCONCEPTIONS[loc];
  const fit = FIT[loc];
  const process = PROCESS[loc];
  const entryPkgs = ENTRY_PKGS[loc];
  const workRecord = WORK_ON_RECORD[loc];

  const STRENGTHS = [
    { title: t("strength1Title"), body: t("strength1Body") },
    { title: t("strength2Title"), body: t("strength2Body") },
    { title: t("strength3Title"), body: t("strength3Body") },
    { title: t("strength4Title"), body: t("strength4Body") },
    { title: t("strength5Title"), body: t("strength5Body") },
  ];

  const COSTS = [
    { title: t("cost1Title"), body: t("cost1Body") },
    { title: t("cost2Title"), body: t("cost2Body") },
    { title: t("cost3Title"), body: t("cost3Body") },
    { title: t("cost4Title"), body: t("cost4Body") },
    { title: t("cost5Title"), body: t("cost5Body") },
    {
      title: loc === "en" ? "Rework and fragility" : "Retrabajo y fragilidad",
      body: loc === "en"
        ? "Builds scoped incorrectly don’t get extended—they get rebuilt. The short-term savings of an underscoped build are often outweighed by the rework cycle it creates."
        : "Las construcciones con alcance incorrecto no se extienden, se reconstruyen. Los ahorros a corto plazo de una construcción mal definida son superados por el ciclo de retrabajo que crean.",
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="nd-hero nd-geo-bg" aria-labelledby="hero-heading">
        <HeroAnimated
          label={t("markerLabel")}
          headline1={t("headline1")}
          headline2={t("headline2")}
          lead={t("lead")}
          ctaButton={t("ctaButton")}
          ctaSecondary={t("ctaSecondary")}
          locale={locale}
        />
      </section>

      {/* Why this matters */}
      <section className="nd-section alt" aria-labelledby="why-matters-heading">
        <div className="nd-wrap">
          <FadeUp>
            <span className="nd-label nd-label-block">
              {t("whyLabel")}
            </span>
          </FadeUp>
          <FadeUp delay={0.05}>
            <h2 id="why-matters-heading" className="nd-h2 nd-h2-mb6">
              {t("whyHeadline")}
            </h2>
            <p className="nd-p">{t("whyBody")}</p>
            <p className="nd-p" style={{ marginTop: "var(--space-4)" }}>{t("whyBody2")}</p>
          </FadeUp>
        </div>
      </section>

      {/* Why NoDrftSystems — Strengths */}
      <section className="nd-section nd-grid-bg" aria-labelledby="strengths-heading">
        <div className="nd-wrap">
          <FadeUp>
            <span className="nd-label nd-label-block-lg">
              {t("strengthsLabel")}
            </span>
          </FadeUp>
          <div className="nd-grid-why">
            {STRENGTHS.map((s, i) => (
              <FadeUp key={i} delay={i * 0.06}>
                <div className={`nd-card nd-card--h-full${i === 0 || i === 4 ? " nd-card--copper" : ""}`}>
                  <span className="nd-card__corner" aria-hidden="true" />
                  <h3 className="nd-h3 nd-h3-mb3">{s.title}</h3>
                  <p className="nd-p-sm">{s.body}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* What it quietly costs */}
      <section className="nd-section alt" aria-labelledby="costs-heading">
        <div className="nd-wrap">
          <FadeUp>
            <span className="nd-label nd-label-block">
              {t("costsLabel")}
            </span>
            <h2 id="costs-heading" className="nd-h2 nd-h2-mb8">
              {t("costsHeadline")}
            </h2>
          </FadeUp>
          <div>
            {COSTS.map((c, i) => (
              <FadeUp key={i} delay={i * 0.05}>
                <div className="nd-cost-item">
                  <strong className="nd-cost-label">{c.title}</strong>
                  <p className="nd-p-sm">{c.body}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Entry packages preview */}
      <section className="nd-section nd-grid-bg" aria-labelledby="packages-heading">
        <div className="nd-wrap">
          <FadeUp>
            <span className="nd-label nd-label-block">
              {loc === "en" ? "Services" : "Servicios"}
            </span>
            <h2 id="packages-heading" className="nd-h2 nd-h2-mb4">
              {loc === "en" ? "Operating systems. Websites. Brand. Content." : "Sistemas operativos. Sitios web. Marca. Contenido."}
            </h2>
            <p className="nd-p nd-mb8">
              {loc === "en"
                ? "Four service areas — all produced under the same delivery standard. Scope is defined before work begins. Handoff is structured so you own the result."
                : "Cuatro áreas de servicio — todas producidas bajo el mismo estándar de entrega. El alcance se define antes de comenzar. El traspaso está estructurado para que usted sea propietario del resultado."}
            </p>
          </FadeUp>
          <div className="nd-grid-auto nd-pkg-grid">
            {entryPkgs.map((pkg, i) => (
              <FadeUp key={i} delay={i * 0.06}>
                <div className="nd-card nd-pkg-card">
                  <span className="nd-card__corner" aria-hidden="true" />
                  <div>
                    <h3 className="nd-h3 nd-h3-mb2">{pkg.name}</h3>
                    <Link href={`/${locale}/start`} className="nd-price">
                      {loc === "en" ? "Get pricing →" : "Consultar precio →"}
                    </Link>
                    <p className="nd-p-sm nd-mb2">{pkg.body}</p>
                    <p className="nd-p-xs nd-pkg-subtext">{pkg.sub}</p>
                  </div>
                  <span className="nd-timeline">
                    {pkg.timeline}
                  </span>
                </div>
              </FadeUp>
            ))}
          </div>
          <FadeUp delay={0.2}>
            <div className="nd-fit-note">
              <p className="nd-p-sm">
                {loc === "en"
                  ? "Complex needs or unclear scope? Start with a "
                  : "¿Necesidades complejas o alcance poco claro? Comience con un "}
                <Link href={`/${locale}/start`}>{loc === "en" ? "Discovery Sprint" : "Discovery Sprint"}</Link>
                {loc === "en"
                  ? " or visit the "
                  : " o visite la página de "}
                <Link href={`/${locale}/capabilities`}>{loc === "en" ? "Pricing" : "Precios"}</Link>
                {loc === "en" ? " page for the full service catalog and starting prices." : " para el catálogo completo de servicios y precios iniciales."}
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Work on record */}
      <section className="nd-section alt" aria-labelledby="work-record-heading">
        <div className="nd-wrap">
          <FadeUp>
            <span className="nd-label nd-label-d-block">{workRecord.label}</span>
            <hr className="nd-rule-accent" />
          </FadeUp>
          {workRecord.items.map((item, i) => (
            <FadeUp key={i} delay={i * 0.07}>
              <div className="nd-proof-item">
                <p className="nd-p">{item}</p>
              </div>
            </FadeUp>
          ))}
          <FadeUp delay={0.15}>
            <p className="nd-p-xs nd-p-italic nd-mt4">
              {workRecord.disclaimer}
            </p>
            <p className="nd-p-xs nd-mt3">
              <Link href={`/${locale}/engagements`}>{workRecord.link}</Link>
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Common misconceptions */}
      <section className="nd-section nd-grid-bg" aria-labelledby="misconceptions-heading">
        <div className="nd-wrap">
          <FadeUp>
            <span className="nd-label nd-label-block">
              {loc === "en" ? "Common misconceptions" : "Conceptos erróneos comunes"}
            </span>
            <h2 id="misconceptions-heading" className="nd-h2 nd-h2-mb8">
              {loc === "en"
                ? "What delays the decision—and why it’s worth reconsidering."
                : "Lo que retrasa la decisión y por qué vale la pena reconsiderarlo."}
            </h2>
          </FadeUp>
          <div className="nd-grid-2 nd-grid-2--gap5">
            {misconceptions.map((m, i) => (
              <FadeUp key={i} delay={i * 0.05}>
                <div className="nd-card">
                  <span className="nd-card__corner" aria-hidden="true" />
                  <p className="nd-misconception-q">{m.q}</p>
                  <p className="nd-p-sm">{m.a}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Who we serve best */}
      <section className="nd-section alt" aria-labelledby="fit-heading">
        <div className="nd-wrap">
          <FadeUp>
            <span className="nd-label nd-label-d-block">{fit.label}</span>
            <hr className="nd-rule-accent" />
          </FadeUp>
          <ul className="nd-fit-list nd-mb6" aria-labelledby="fit-heading">
            {fit.items.map((item, i) => (
              <FadeUp key={i} delay={i * 0.05}>
                <li className="nd-proof-item nd-p">{item}</li>
              </FadeUp>
            ))}
          </ul>
          <FadeUp delay={0.2}>
            <div className="nd-fit-note">
              <p className="nd-p">{fit.note}</p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* How it works */}
      <section className="nd-section nd-grid-bg" aria-labelledby="process-heading">
        <div className="nd-wrap">
          <FadeUp>
            <span className="nd-label nd-label-block">
              {loc === "en" ? "How it works" : "Cómo funciona"}
            </span>
            <h2 id="process-heading" className="nd-h2 nd-h2-mb8">
              {loc === "en"
                ? "What to expect from first contact to handoff."
                : "Qué esperar desde el primer contacto hasta el traspaso."}
            </h2>
          </FadeUp>
          <div className="nd-grid-3">
            {process.map((step, i) => (
              <FadeUp key={i} delay={i * 0.05}>
                <div className="nd-process-step">
                  <div className="nd-process-num" aria-hidden="true">{step.num}</div>
                  <div className="nd-step-title">{step.title}</div>
                  <div className="nd-step-body">{step.body}</div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="nd-section alt" aria-labelledby="cta-heading">
        <div className="nd-wrap">
          <FadeUp>
            <div className="nd-section-cta">
              <span className="nd-label nd-label-block">
                {t("ctaLabel")}
              </span>
              <h2 id="cta-heading" className="nd-h2 nd-h2-mb4">
                {t("ctaHeadline")}
              </h2>
              <p className="nd-p nd-section-cta__body">{t("ctaBody")}</p>
              <div className="nd-cta-row nd-cta-row--center">
                <Link href={`/${locale}/start`} className="btn btn--lg">
                  {t("ctaButton")}
                </Link>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
