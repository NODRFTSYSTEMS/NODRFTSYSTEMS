import type { BilingualText } from "@/content/types";

export type PackageTier = "t0" | "t1" | "t2" | "t3";

export type PackageRecord = {
  id: string;
  tier: PackageTier;
  tierLabel: BilingualText;
  name: BilingualText;
  summary: BilingualText;
  subtext: BilingualText;
  includes: BilingualText[];
  excludes: BilingualText[];
  timeline: BilingualText;
  notFor?: BilingualText;
  startHereNote?: BilingualText;
};

export const packages: PackageRecord[] = [
  {
    id: "pkg-audit",
    tier: "t0",
    tierLabel: { en: "DIAGNOSTIC", es: "DIAGNÓSTICO" },
    name: { en: "Website Audit", es: "Auditoría de Sitio Web" },
    summary: {
      en: "A structured review of your existing website. We score it across six dimensions and deliver a written report with a clear recommendation — before any build commitment.",
      es: "Una revisión estructurada de su sitio web existente. Lo puntuamos en seis dimensiones y entregamos un informe escrito con una recomendación clara, antes de cualquier compromiso de construcción.",
    },
    subtext: {
      en: "Start here if you have a live site but aren't sure whether to rebuild, refresh, or stay put.",
      es: "Comience aquí si tiene un sitio en vivo pero no está seguro de si reconstruir, refrescar o quedarse donde está.",
    },
    includes: [
      { en: "6-dimension scored audit report", es: "informe de auditoría con 6 dimensiones puntuadas" },
      { en: "gap analysis: Critical / Important / Enhancement", es: "análisis de brechas: Crítico / Importante / Mejora" },
      { en: "package recommendation for next steps", es: "recomendación de paquete para próximos pasos" },
      { en: "one 30-minute follow-up Q&A session", es: "una sesión de preguntas y respuestas de 30 minutos" },
    ],
    excludes: [
      { en: "design or development work", es: "trabajo de diseño o desarrollo" },
      { en: "copywriting or content changes", es: "redacción o cambios de contenido" },
      { en: "modifications to your existing platform", es: "modificaciones a su plataforma existente" },
      { en: "implementation of recommendations", es: "implementación de recomendaciones" },
    ],
    timeline: { en: "Timeline: 5 business days", es: "Cronograma: 5 días hábiles" },
    startHereNote: {
      en: "Right for you when: you have an existing site, something feels off, but you can't justify a rebuild yet — or you need a clear business case before spending more.",
      es: "Adecuado para usted cuando: tiene un sitio existente, algo no está bien, pero aún no puede justificar una reconstrucción, o necesita un caso de negocio claro antes de gastar más.",
    },
  },
  {
    id: "pkg-discovery",
    tier: "t1",
    tierLabel: { en: "ENTRY", es: "ENTRADA" },
    name: { en: "Discovery Sprint", es: "Discovery Sprint" },
    summary: {
      en: "Clarifies scope, execution path, risks, and next-step recommendation before any build begins.",
      es: "Aclara el alcance, camino de ejecución, riesgos y recomendación antes de cualquier construcción.",
    },
    subtext: {
      en: "Protects against rework and mis-scoping.",
      es: "Protege contra retrabajo y definición incorrecta de alcance.",
    },
    includes: [
      { en: "intake call: we establish goals, constraints, and unknowns", es: "llamada de intake: establecemos metas, restricciones e incógnitas" },
      { en: "structured discovery session: requirements, users, integrations", es: "sesión de descubrimiento estructurada: requisitos, usuarios, integraciones" },
      { en: "scope brief delivered: in-scope, out-of-scope, dependencies", es: "entrega del resumen de alcance: en alcance, fuera de alcance, dependencias" },
      { en: "package recommendation and risk review", es: "recomendación de paquete y revisión de riesgos" },
      { en: "Discovery fee credited in full toward your next package if signed within 30 days", es: "El costo del Discovery se acredita en su totalidad al próximo paquete si se firma dentro de 30 días" },
    ],
    excludes: [
      { en: "design production", es: "producción de diseño" },
      { en: "development", es: "desarrollo" },
      { en: "copywriting", es: "redacción" },
      { en: "integrations", es: "integraciones" },
    ],
    timeline: { en: "Timeline: 1 week", es: "Cronograma: 1 semana" },
    startHereNote: {
      en: "Start here when: multiple decision-makers, unclear scope, unclear platform/tool need, messy legacy situation, higher-risk approvals.",
      es: "Comience aquí cuando: múltiples responsables, alcance poco claro, necesidad de plataforma/herramienta incierta, situación legacy complicada, aprobaciones de mayor riesgo.",
    },
  },
  {
    id: "pkg-landing",
    tier: "t1",
    tierLabel: { en: "ENTRY", es: "ENTRADA" },
    name: { en: "Conversion Landing Page Sprint", es: "Sprint de Landing Page de Conversión" },
    summary: {
      en: "One focused page built to convert a single offer, audience, or campaign objective. Sprint format — fast brief, fast delivery.",
      es: "Una página enfocada para convertir una oferta, audiencia u objetivo de campaña. Formato sprint: brief rápido, entrega rápida.",
    },
    subtext: {
      en: "If you need a complete multi-page business presence instead of a single campaign page, use the Static Business Site.",
      es: "Si necesita una presencia empresarial multipágina en lugar de una página de campaña individual, use el Sitio Empresarial Estático.",
    },
    includes: [
      { en: "one custom landing page", es: "una landing page personalizada" },
      { en: "responsive implementation", es: "implementación responsiva" },
      { en: "one CTA form", es: "un formulario CTA" },
      { en: "basic on-page SEO", es: "SEO on-page básico" },
      { en: "two revision rounds", es: "dos rondas de revisión" },
      { en: "logo design — new brand or use your existing logo", es: "diseño de logotipo — nueva marca o use su logo existente" },
      { en: "business signs & card design — print-ready files", es: "diseño de letreros y tarjetas de presentación — archivos listos para imprimir" },
      { en: "branded QR code linked to your website", es: "código QR de marca vinculado a su sitio web" },
      { en: "domain name research and registration", es: "investigación y registro de nombre de dominio" },
    ],
    excludes: [
      { en: "copywriting", es: "redacción" },
      { en: "CMS setup", es: "configuración de CMS" },
      { en: "custom integrations", es: "integraciones personalizadas" },
      { en: "multi-page expansion", es: "expansión multipágina" },
    ],
    timeline: { en: "Timeline: 10 business days", es: "Cronograma: 10 días hábiles" },
    notFor: {
      en: "multi-page repositioning, unclear offers, complex integrations. Choose Static Business Site for a full brochure presence.",
      es: "reposicionamiento multipágina, ofertas poco claras, integraciones complejas. Elija Sitio Empresarial Estático para una presencia de brochure completo.",
    },
  },
  {
    id: "pkg-static",
    tier: "t2",
    tierLabel: { en: "CORE", es: "NÚCLEO" },
    name: { en: "Static Business Site", es: "Sitio Empresarial Estático" },
    summary: {
      en: "A brochure-style multi-page website for stable content, clear positioning, and low maintenance. No CMS by default.",
      es: "Un sitio multipágina tipo brochure para contenido estable, posicionamiento claro y bajo mantenimiento. Sin CMS por defecto.",
    },
    subtext: {
      en: "Best when the content is mostly fixed and the objective is a serious web presence without editorial overhead.",
      es: "Ideal cuando el contenido es mayormente fijo y el objetivo es una presencia seria sin sobrecarga editorial.",
    },
    includes: [
      { en: "up to 5 pages", es: "hasta 5 páginas" },
      { en: "no-CMS implementation", es: "implementación sin CMS" },
      { en: "contact form", es: "formulario de contacto" },
      { en: "mobile-responsive build", es: "construcción responsiva móvil" },
      { en: "technical SEO basics", es: "bases de SEO técnico" },
      { en: "two revision rounds", es: "dos rondas de revisión" },
      { en: "logo design — new brand or use your existing logo", es: "diseño de logotipo — nueva marca o use su logo existente" },
      { en: "business signs & card design — print-ready files", es: "diseño de letreros y tarjetas de presentación — archivos listos para imprimir" },
      { en: "branded QR code linked to your website", es: "código QR de marca vinculado a su sitio web" },
      { en: "domain name research and registration", es: "investigación y registro de nombre de dominio" },
    ],
    excludes: [
      { en: "CMS setup", es: "configuración de CMS" },
      { en: "blog or editorial system", es: "blog o sistema editorial" },
      { en: "custom calculators", es: "calculadoras personalizadas" },
      { en: "ecommerce", es: "comercio electrónico" },
      { en: "advanced integrations", es: "integraciones avanzadas" },
    ],
    timeline: { en: "Timeline: 10–12 business days", es: "Cronograma: 10–12 días hábiles" },
    notFor: {
      en: "blogs, CMS parity, calculators, dashboards, ecommerce, custom automation, multilingual parity by default.",
      es: "blogs, CMS completo, calculadoras, dashboards, ecommerce, automatización personalizada, paridad multilingüe por defecto.",
    },
  },
  {
    id: "pkg-launch",
    tier: "t2",
    tierLabel: { en: "CORE", es: "NÚCLEO" },
    name: { en: "Business Launch Site", es: "Sitio de Lanzamiento Empresarial" },
    summary: {
      en: "A complete business website with CMS-backed content management, structured positioning, and clean handoff.",
      es: "Un sitio empresarial completo con gestión de contenido en CMS, posicionamiento estructurado y traspaso limpio.",
    },
    subtext: {
      en: "Use this tier when the client needs editable content after launch rather than a fixed brochure build.",
      es: "Use este nivel cuando el cliente necesita contenido editable después del lanzamiento.",
    },
    includes: [
      { en: "up to 5 pages", es: "hasta 5 páginas" },
      { en: "headless CMS setup", es: "configuración de CMS headless" },
      { en: "contact form plus one additional form type", es: "formulario de contacto más un formulario adicional" },
      { en: "mobile-responsive build", es: "construcción responsiva móvil" },
      { en: "technical SEO basics", es: "bases de SEO técnico" },
      { en: "analytics setup", es: "configuración de analítica" },
      { en: "two revision rounds", es: "dos rondas de revisión" },
      { en: "logo design — new brand or use your existing logo", es: "diseño de logotipo — nueva marca o use su logo existente" },
      { en: "business signs & card design — print-ready files", es: "diseño de letreros y tarjetas de presentación — archivos listos para imprimir" },
      { en: "branded QR code linked to your website", es: "código QR de marca vinculado a su sitio web" },
      { en: "domain name research and registration", es: "investigación y registro de nombre de dominio" },
    ],
    excludes: [
      { en: "copywriting", es: "redacción" },
      { en: "ecommerce", es: "comercio electrónico" },
      { en: "custom calculators", es: "calculadoras personalizadas" },
      { en: "CRM automations", es: "automatizaciones CRM" },
      { en: "member dashboards", es: "paneles de miembros" },
    ],
    timeline: { en: "Timeline: 15 business days", es: "Cronograma: 15 días hábiles" },
    notFor: {
      en: "calculators, dashboards, CRM automations, member portals, advanced integrations.",
      es: "calculadoras, dashboards, automatizaciones CRM, portales de miembros, integraciones avanzadas.",
    },
  },
  {
    id: "pkg-authority",
    tier: "t2",
    tierLabel: { en: "CORE", es: "NÚCLEO" },
    name: { en: "Authority Website", es: "Sitio de Autoridad" },
    summary: {
      en: "A larger site for trust-heavy, content-structured, credibility-sensitive organizations. Built for search visibility, multi-form conversion, and more complex information architecture.",
      es: "Un sitio más amplio para organizaciones sensibles a la confianza, al contenido y a la credibilidad.",
    },
    subtext: {
      en: "For established firms, institutions, and reputation-sensitive service businesses.",
      es: "Para firmas establecidas, instituciones y negocios sensibles a la reputación.",
    },
    includes: [
      { en: "up to 15 pages", es: "hasta 15 páginas" },
      { en: "advanced CMS structure", es: "estructura avanzada de CMS" },
      { en: "blog or insights section", es: "sección de blog o insights" },
      { en: "conversion tracking", es: "seguimiento de conversión" },
      { en: "up to 3 form types", es: "hasta 3 tipos de formulario" },
      { en: "WCAG 2.1 AA accessibility review", es: "revisión de accesibilidad WCAG 2.1 AA" },
      { en: "logo design — new brand or use your existing logo", es: "diseño de logotipo — nueva marca o use su logo existente" },
      { en: "business signs & card design — print-ready files", es: "diseño de letreros y tarjetas de presentación — archivos listos para imprimir" },
      { en: "branded QR code linked to your website", es: "código QR de marca vinculado a su sitio web" },
      { en: "domain name research and registration", es: "investigación y registro de nombre de dominio" },
    ],
    excludes: [
      { en: "custom application features", es: "funciones personalizadas de aplicación" },
      { en: "workflow automation", es: "automatización de flujos" },
      { en: "large migrations without Discovery", es: "migraciones grandes sin Discovery" },
      { en: "ongoing content strategy", es: "estrategia continua de contenido" },
    ],
    timeline: { en: "Timeline: 25 business days", es: "Cronograma: 25 días hábiles" },
    notFor: {
      en: "app logic, open-ended platform requirements, ongoing content strategy by default.",
      es: "lógica de app, requisitos abiertos de plataforma, estrategia continua de contenido por defecto.",
    },
  },
  {
    id: "pkg-platform",
    tier: "t3",
    tierLabel: { en: "ADVANCED", es: "AVANZADO" },
    name: { en: "Platform Starter", es: "Plataforma Inicial" },
    summary: {
      en: "A bounded workflow layer: login, dashboards, structured intake, and third-party data integration. For organizations that have outgrown what a standard website can support.",
      es: "Una capa de flujo de trabajo acotada: login, dashboards, intake estructurado e integración de datos de terceros. Para organizaciones que han superado lo que un sitio web estándar puede soportar.",
    },
    subtext: {
      en: "Discovery Sprint required first. Scope must be defined before any Platform Starter begins.",
      es: "Discovery Sprint requerido primero. El alcance debe estar definido antes de que comience cualquier Plataforma Inicial.",
    },
    includes: [
      { en: "user authentication and access controls", es: "autenticación de usuarios y controles de acceso" },
      { en: "up to 3 third-party integrations", es: "hasta 3 integraciones de terceros" },
      { en: "admin dashboard", es: "panel de administración" },
      { en: "database schema and API routes", es: "esquema de base de datos y rutas API" },
      { en: "mobile-responsive implementation", es: "implementación responsiva móvil" },
      { en: "WCAG 2.1 AA review", es: "revisión WCAG 2.1 AA" },
      { en: "security review and hardening", es: "revisión y endurecimiento de seguridad" },
    ],
    excludes: [
      { en: "open-ended platform scope without Discovery", es: "alcance abierto de plataforma sin Discovery" },
      { en: "more than 3 integrations without Change Order", es: "más de 3 integraciones sin Orden de Cambio" },
      { en: "ongoing product management", es: "gestión continua del producto" },
    ],
    timeline: { en: "Timeline: 35–45 business days", es: "Cronograma: 35–45 días hábiles" },
    startHereNote: {
      en: "Start here when: the workflow layer — login, data access, structured automation — is the core requirement, not just a website.",
      es: "Comience aquí cuando: la capa de flujo de trabajo — login, acceso a datos, automatización estructurada — es el requisito central, no solo un sitio web.",
    },
  },
  {
    id: "pkg-ecosystem",
    tier: "t3",
    tierLabel: { en: "ADVANCED", es: "AVANZADO" },
    name: { en: "Ecosystem Build", es: "Construcción de Ecosistema" },
    summary: {
      en: "Multi-surface: public site + app/workflow + admin + integrations. A coordinated program, not a single website project.",
      es: "Multi-superficie: sitio público + app/flujo + admin + integraciones. Un programa coordinado, no un proyecto de sitio web individual.",
    },
    subtext: {
      en: "Discovery Sprint + Architecture review required. This is a program, not a project.",
      es: "Discovery Sprint + revisión de arquitectura requeridos. Esto es un programa, no un proyecto.",
    },
    includes: [
      { en: "public marketing site", es: "sitio de marketing público" },
      { en: "application layer with authentication", es: "capa de aplicación con autenticación" },
      { en: "admin panel and operations dashboard", es: "panel admin y dashboard de operaciones" },
      { en: "third-party integrations (scoped per Discovery)", es: "integraciones de terceros (alcance por Discovery)" },
      { en: "architecture documentation", es: "documentación de arquitectura" },
      { en: "security and compliance review", es: "revisión de seguridad y cumplimiento" },
    ],
    excludes: [
      { en: "undefined scope without Discovery", es: "alcance indefinido sin Discovery" },
      { en: "open-ended platform ambition without defined workflow", es: "ambición de plataforma abierta sin flujo definido" },
    ],
    timeline: { en: "Timeline: 60+ business days", es: "Cronograma: 60+ días hábiles" },
    startHereNote: {
      en: "Start here when: the organization needs multiple coordinated surfaces — public, operational, and administrative — under a single coherent system.",
      es: "Comience aquí cuando: la organización necesita múltiples superficies coordinadas — pública, operativa y administrativa — bajo un sistema coherente único.",
    },
  },
];

export const compareRows = [
  {
    id: "pkg-audit",
    name: { en: "Website Audit", es: "Auditoría de Sitio Web" },
    best: { en: "You have a live site; need diagnosis before committing to a rebuild", es: "Tiene un sitio en vivo; necesita diagnóstico antes de comprometerse" },
    price: { en: "Talk to us", es: "Hablemos" },
    time: { en: "5 business days", es: "5 días hábiles" },
    notFor: { en: "Development work", es: "Trabajo de desarrollo" },
  },
  {
    id: "pkg-discovery",
    name: { en: "Discovery Sprint", es: "Discovery Sprint" },
    best: { en: "Unclear scope, multiple stakeholders, legacy situation", es: "Alcance poco claro, múltiples responsables, situación legacy" },
    price: { en: "Talk to us", es: "Hablemos" },
    time: { en: "1 week", es: "1 semana" },
    notFor: { en: "Build output — this defines it", es: "Resultado de construcción — esto lo define" },
  },
  {
    id: "pkg-landing",
    name: { en: "Landing Page Sprint", es: "Sprint de Landing Page" },
    best: { en: "Single offer, defined audience, campaign objective", es: "Una oferta, audiencia definida, objetivo de campaña" },
    price: { en: "Talk to us", es: "Hablemos" },
    time: { en: "10 business days", es: "10 días hábiles" },
    notFor: { en: "Multi-page presence", es: "Presencia multipágina" },
  },
  {
    id: "pkg-static",
    name: { en: "Static Business Site", es: "Sitio Empresarial Estático" },
    best: { en: "Stable content, clear positioning, low maintenance", es: "Contenido estable, posicionamiento claro, bajo mantenimiento" },
    price: { en: "Talk to us", es: "Hablemos" },
    time: { en: "10–12 business days", es: "10–12 días hábiles" },
    notFor: { en: "CMS, blog, ecommerce", es: "CMS, blog, ecommerce" },
  },
  {
    id: "pkg-launch",
    name: { en: "Business Launch Site", es: "Sitio de Lanzamiento" },
    best: { en: "Client needs editable content after launch", es: "El cliente necesita contenido editable tras el lanzamiento" },
    price: { en: "Talk to us", es: "Hablemos" },
    time: { en: "15 business days", es: "15 días hábiles" },
    notFor: { en: "Calculators, CRM automations, member portals", es: "Calculadoras, automatizaciones CRM, portales" },
  },
  {
    id: "pkg-authority",
    name: { en: "Authority Website", es: "Sitio de Autoridad" },
    best: { en: "Trust-heavy, content-structured, credibility-sensitive organizations", es: "Organizaciones que priorizan confianza y credibilidad" },
    price: { en: "Talk to us", es: "Hablemos" },
    time: { en: "25 business days", es: "25 días hábiles" },
    notFor: { en: "App logic, open-ended platform requirements", es: "Lógica de app, requisitos abiertos de plataforma" },
  },
  {
    id: "pkg-platform",
    name: { en: "Platform Starter", es: "Plataforma Inicial" },
    best: { en: "Bounded workflow layer: login, dashboards, structured intake", es: "Capa de flujo de trabajo acotada: login, dashboards, intake" },
    price: { en: "Talk to us", es: "Hablemos" },
    time: { en: "35–45 business days", es: "35–45 días hábiles" },
    notFor: { en: "Open-ended platform ambition without defined workflow", es: "Ambición de plataforma abierta sin flujo definido" },
  },
  {
    id: "pkg-ecosystem",
    name: { en: "Ecosystem Build", es: "Construcción de Ecosistema" },
    best: { en: "Multi-surface: public site + app + admin + integrations", es: "Multi-superficie: sitio público + app + admin + integraciones" },
    price: { en: "Talk to us", es: "Hablemos" },
    time: { en: "60+ business days", es: "60+ días hábiles" },
    notFor: { en: "Undefined scope without Discovery", es: "Alcance indefinido sin Discovery" },
  },
];
