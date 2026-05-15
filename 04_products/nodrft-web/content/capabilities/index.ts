import type { BilingualText } from "@/content/types";

export type PackageCategory =
  | "ba"
  | "brand"
  | "website"
  | "platform"
  | "bms"
  | "os"
  | "content"
  | "retainer"
  | "bundle";

export type PackageRecord = {
  id: string;
  category: PackageCategory;
  name: BilingualText;
  summary: BilingualText;
  subtext: BilingualText;
  price: BilingualText;
  includes: BilingualText[];
  excludes: BilingualText[];
  timeline: BilingualText;
  notFor?: BilingualText;
  startHereNote?: BilingualText;
};

export const packages: PackageRecord[] = [

  // ─── Business Architecture & Planning ───────────────────────────────────────

  {
    id: "ba-quick",
    category: "ba",
    name: { en: "BA Quick Sprint", es: "Sprint Rápido de BA" },
    summary: {
      en: "A rapid feasibility signal for a simple business, one offer, or one website idea — before any proposal is made.",
      es: "Una señal rápida de viabilidad para un negocio simple, una oferta o una idea de sitio web — antes de hacer cualquier propuesta.",
    },
    subtext: {
      en: "The right first step when the core question is go or no-go.",
      es: "El primer paso correcto cuando la pregunta central es avanzar o no.",
    },
    price: { en: "$750", es: "$750" },
    includes: [
      { en: "Business model clarification", es: "Clarificación del modelo de negocio" },
      { en: "Offer structure and positioning review", es: "Revisión de estructura y posicionamiento de la oferta" },
      { en: "Operational risks identification", es: "Identificación de riesgos operativos" },
      { en: "Recommended build path and implementation priorities", es: "Camino de construcción recomendado y prioridades de implementación" },
    ],
    excludes: [
      { en: "Design production", es: "Producción de diseño" },
      { en: "Full copywriting", es: "Redacción completa" },
      { en: "Development or integrations", es: "Desarrollo o integraciones" },
      { en: "Legal drafting", es: "Redacción legal" },
    ],
    timeline: { en: "1–2 business days", es: "1–2 días hábiles" },
    startHereNote: {
      en: "Routes to BA Standard Sprint, website proposal, or app proposal on completion.",
      es: "Redirige a Sprint Estándar de BA, propuesta de sitio web o propuesta de app al finalizar.",
    },
  },

  {
    id: "ba-standard",
    category: "ba",
    name: { en: "BA Standard Sprint", es: "Sprint Estándar de BA" },
    summary: {
      en: "Full planning evaluation before a website, app, automation, or content system. 17-section FACT-STRICT analysis with a go/hold recommendation.",
      es: "Evaluación de planificación completa antes de un sitio web, app, automatización o sistema de contenido. Análisis de 17 secciones con recomendación de avanzar o pausar.",
    },
    subtext: {
      en: "Required prerequisite for most Platform Starter and above engagements.",
      es: "Prerrequisito requerido para la mayoría de proyectos de Plataforma o superior.",
    },
    price: { en: "$1,500", es: "$1,500" },
    includes: [
      { en: "Full 17-section FACT-STRICT evaluation", es: "Evaluación completa de 17 secciones FACT-STRICT" },
      { en: "Market, financial, risk, and competitive analysis", es: "Análisis de mercado, financiero, de riesgos y competitivo" },
      { en: "Go/hold recommendation with supporting rationale", es: "Recomendación de avanzar o pausar con fundamento" },
      { en: "Workflow logic, system requirements, implementation priorities", es: "Lógica de flujo de trabajo, requisitos del sistema, prioridades de implementación" },
    ],
    excludes: [
      { en: "Design, development, or integrations", es: "Diseño, desarrollo o integraciones" },
      { en: "Legal drafting or deployment", es: "Redacción legal o despliegue" },
    ],
    timeline: { en: "2–3 business days", es: "2–3 días hábiles" },
  },

  {
    id: "ba-advanced",
    category: "ba",
    name: { en: "BA Advanced Sprint", es: "Sprint Avanzado de BA" },
    summary: {
      en: "Scenarios, workflows, roles, integrations, and service logic. For businesses with multiple revenue paths, complex automation needs, or parallel market comparisons.",
      es: "Escenarios, flujos de trabajo, roles, integraciones y lógica de servicio. Para negocios con múltiples rutas de ingresos o necesidades de automatización complejas.",
    },
    subtext: {
      en: "Includes full Standard Sprint evaluation plus scenario modeling.",
      es: "Incluye la evaluación completa del Sprint Estándar más modelado de escenarios.",
    },
    price: { en: "$2,500", es: "$2,500" },
    includes: [
      { en: "Full Standard Sprint evaluation", es: "Evaluación completa del Sprint Estándar" },
      { en: "Scenario modeling — multiple revenue paths, alternative market segments", es: "Modelado de escenarios — múltiples rutas de ingresos, segmentos alternativos de mercado" },
      { en: "Automation logic and integration requirements", es: "Lógica de automatización y requisitos de integración" },
      { en: "Role definition and operational risk mapping", es: "Definición de roles y mapeo de riesgos operativos" },
    ],
    excludes: [
      { en: "Design, development, or implementation", es: "Diseño, desarrollo o implementación" },
      { en: "Legal drafting or deployment", es: "Redacción legal o despliegue" },
    ],
    timeline: { en: "3–5 business days", es: "3–5 días hábiles" },
  },

  {
    id: "ba-architecture",
    category: "ba",
    name: { en: "BA Architecture Intensive", es: "Intensivo de Arquitectura de BA" },
    summary: {
      en: "MCP server design, agent workflows, platform planning, and operating architecture. Custom-scoped after a qualification call. $3,500 is a floor, not a flat rate.",
      es: "Diseño de servidor MCP, flujos de agentes, planificación de plataforma y arquitectura operativa. Precio personalizado tras una llamada de calificación.",
    },
    subtext: {
      en: "Required before any MCP/agent system or complex platform build. Scope defined per qualification call.",
      es: "Requerido antes de cualquier sistema MCP/agente o construcción de plataforma compleja.",
    },
    price: { en: "Starting at $3,500", es: "Desde $3,500" },
    includes: [
      { en: "MCP architecture and agent workflow design", es: "Arquitectura MCP y diseño de flujo de agentes" },
      { en: "Permissions framework and QA gate specification", es: "Marco de permisos y especificación de compuertas de QA" },
      { en: "Operating architecture blueprint", es: "Plano de arquitectura operativa" },
      { en: "Role matrix and data model", es: "Matriz de roles y modelo de datos" },
    ],
    excludes: [
      { en: "Implementation, development, or deployment", es: "Implementación, desarrollo o despliegue" },
    ],
    timeline: { en: "Custom — defined per scope", es: "Personalizado — definido por alcance" },
  },

  // ─── Brand & Identity ────────────────────────────────────────────────────────

  {
    id: "brand-logo-standard",
    category: "brand",
    name: { en: "Logo Design — Standard", es: "Diseño de Logotipo — Estándar" },
    summary: {
      en: "One concept direction, refined to final files. For businesses that need a professional logo without a full brand system.",
      es: "Una dirección de concepto, refinada hasta los archivos finales. Para negocios que necesitan un logotipo profesional sin un sistema de marca completo.",
    },
    subtext: {
      en: "Upgrade to Logo Premium for 3 concepts and social variants.",
      es: "Mejore al Logotipo Premium para 3 conceptos y variantes para redes sociales.",
    },
    price: { en: "$400", es: "$400" },
    includes: [
      { en: "1 concept direction", es: "1 dirección de concepto" },
      { en: "2 revision rounds", es: "2 rondas de revisión" },
      { en: "Final files: PNG, SVG, PDF", es: "Archivos finales: PNG, SVG, PDF" },
    ],
    excludes: [
      { en: "Brand guidelines document", es: "Documento de guías de marca" },
      { en: "Color palette development", es: "Desarrollo de paleta de colores" },
      { en: "Typography selection", es: "Selección tipográfica" },
      { en: "Social variants (profile, cover, favicon)", es: "Variantes para redes sociales (perfil, portada, favicon)" },
    ],
    timeline: { en: "2–3 business days", es: "2–3 días hábiles" },
  },

  {
    id: "brand-logo-premium",
    category: "brand",
    name: { en: "Logo Design — Premium", es: "Diseño de Logotipo — Premium" },
    summary: {
      en: "Three concept directions, full file set including social variants. For businesses that want options before committing.",
      es: "Tres direcciones de concepto, conjunto completo de archivos incluyendo variantes para redes sociales.",
    },
    subtext: {
      en: "Included in the Brand Identity System and Identity Starter bundle.",
      es: "Incluido en el Sistema de Identidad de Marca y el paquete Identity Starter.",
    },
    price: { en: "$1,200", es: "$1,200" },
    includes: [
      { en: "3 concept directions", es: "3 direcciones de concepto" },
      { en: "3 revision rounds", es: "3 rondas de revisión" },
      { en: "Full file set: PNG, SVG, PDF, EPS", es: "Conjunto completo de archivos: PNG, SVG, PDF, EPS" },
      { en: "Social variants: profile, cover, favicon", es: "Variantes para redes sociales: perfil, portada, favicon" },
    ],
    excludes: [
      { en: "Full brand guidelines document", es: "Documento completo de guías de marca" },
      { en: "Stationery templates", es: "Plantillas de papelería" },
    ],
    timeline: { en: "3–5 business days", es: "3–5 días hábiles" },
  },

  {
    id: "brand-identity-system",
    category: "brand",
    name: { en: "Brand Identity System", es: "Sistema de Identidad de Marca" },
    summary: {
      en: "Complete visual brand foundation — logo, color, typography, guidelines document, and stationery templates delivered together.",
      es: "Base visual de marca completa — logotipo, color, tipografía, documento de guías y plantillas de papelería entregados juntos.",
    },
    subtext: {
      en: "Required before any website or platform build. Included in the Brand Foundation and Market Ready bundles.",
      es: "Requerido antes de cualquier construcción de sitio web o plataforma. Incluido en los paquetes Brand Foundation y Market Ready.",
    },
    price: { en: "Starting at $2,800", es: "Desde $2,800" },
    includes: [
      { en: "Logo Design — Premium (3 concepts, 3 revisions, full file set)", es: "Diseño de Logotipo Premium (3 conceptos, 3 revisiones, archivos completos)" },
      { en: "Color palette with hex, RGB, and CMYK codes", es: "Paleta de colores con códigos hex, RGB y CMYK" },
      { en: "Typography system (primary and secondary typefaces)", es: "Sistema tipográfico (tipografías primaria y secundaria)" },
      { en: "Brand guidelines document", es: "Documento de guías de marca" },
      { en: "Stationery templates: business card, letterhead, email signature", es: "Plantillas de papelería: tarjeta de presentación, membrete, firma de email" },
    ],
    excludes: [
      { en: "Website or platform development", es: "Desarrollo de sitio web o plataforma" },
      { en: "Copywriting or social content production", es: "Redacción o producción de contenido para redes sociales" },
      { en: "Packaging design", es: "Diseño de empaque" },
    ],
    timeline: { en: "7–10 business days", es: "7–10 días hábiles" },
    startHereNote: {
      en: "Requires client-supplied brand direction brief or BA Standard Sprint.",
      es: "Requiere brief de dirección de marca del cliente o Sprint Estándar de BA.",
    },
  },

  {
    id: "brand-refresh",
    category: "brand",
    name: { en: "Brand Refresh", es: "Actualización de Marca" },
    summary: {
      en: "An existing brand updated — not redesigned from scratch. Updated logo, refreshed color and typography, and revised guidelines document.",
      es: "Una marca existente actualizada — no rediseñada desde cero. Logotipo actualizado, color y tipografía renovados, y documento de guías revisado.",
    },
    subtext: {
      en: "If the direction changes fundamentally, scope routes to Brand Identity System.",
      es: "Si la dirección cambia fundamentalmente, el alcance se redirige al Sistema de Identidad de Marca.",
    },
    price: { en: "Starting at $1,500", es: "Desde $1,500" },
    includes: [
      { en: "Updated logo file (refined, not redesigned)", es: "Archivo de logotipo actualizado (refinado, no rediseñado)" },
      { en: "Refreshed color palette and typography", es: "Paleta de colores y tipografía renovadas" },
      { en: "Updated brand guidelines document", es: "Documento de guías de marca actualizado" },
    ],
    excludes: [
      { en: "Full brand redesign from scratch", es: "Rediseño completo de marca desde cero" },
    ],
    timeline: { en: "5–7 business days", es: "5–7 días hábiles" },
  },

  {
    id: "brand-guidelines",
    category: "brand",
    name: { en: "Brand Guidelines Document", es: "Documento de Guías de Marca" },
    summary: {
      en: "A standalone guidelines document for an existing logo — color codes, typography usage, clearspace rules, and do/do-not examples.",
      es: "Un documento de guías independiente para un logotipo existente — códigos de color, uso tipográfico, reglas de espacio libre y ejemplos de uso correcto e incorrecto.",
    },
    subtext: {
      en: "Requires finalized logo files on file before scope begins.",
      es: "Requiere archivos de logotipo finalizados antes de iniciar el alcance.",
    },
    price: { en: "$800", es: "$800" },
    includes: [
      { en: "Color codes (hex, RGB, CMYK)", es: "Códigos de color (hex, RGB, CMYK)" },
      { en: "Typography usage rules", es: "Reglas de uso tipográfico" },
      { en: "Logo clearspace and size minimums", es: "Espacio libre del logotipo y tamaños mínimos" },
      { en: "Do/do-not usage examples", es: "Ejemplos de uso correcto e incorrecto" },
    ],
    excludes: [
      { en: "Logo redesign or revision", es: "Rediseño o revisión de logotipo" },
      { en: "Stationery templates", es: "Plantillas de papelería" },
    ],
    timeline: { en: "2–3 business days", es: "2–3 días hábiles" },
  },

  {
    id: "brand-collateral",
    category: "brand",
    name: { en: "Marketing Collateral", es: "Colateral de Marketing" },
    summary: {
      en: "Business cards, letterhead, email signatures, or social profile kits — priced per item. Brand guidelines must be on file.",
      es: "Tarjetas de presentación, membrete, firmas de email o kits de perfil para redes sociales — precio por ítem. Las guías de marca deben estar en archivo.",
    },
    subtext: {
      en: "Add multiple items to a single engagement for a combined scope.",
      es: "Agregue varios ítems a un solo proyecto para un alcance combinado.",
    },
    price: { en: "Starting at $200/item", es: "Desde $200 por ítem" },
    includes: [
      { en: "Business card — print-ready files", es: "Tarjeta de presentación — archivos listos para imprimir" },
      { en: "Letterhead template", es: "Plantilla de membrete" },
      { en: "Email signature (HTML + image)", es: "Firma de email (HTML + imagen)" },
      { en: "Social profile kit (cover + profile images)", es: "Kit de perfil para redes sociales (portada + imágenes de perfil)" },
    ],
    excludes: [
      { en: "Copywriting for collateral items", es: "Redacción para ítems de colateral" },
    ],
    timeline: { en: "2–3 business days per item", es: "2–3 días hábiles por ítem" },
  },

  // ─── Websites ────────────────────────────────────────────────────────────────

  {
    id: "web-quick",
    category: "website",
    name: { en: "Quick Web Presence", es: "Presencia Web Rápida" },
    summary: {
      en: "One focused page with a mobile layout, basic copy structure, and a single CTA. Fast to launch, simple to maintain.",
      es: "Una página enfocada con diseño móvil, estructura básica de copy y un CTA único. Rápido de lanzar, simple de mantener.",
    },
    subtext: {
      en: "For businesses that need a live presence immediately — not a full site.",
      es: "Para negocios que necesitan una presencia activa de inmediato — no un sitio completo.",
    },
    price: { en: "$750", es: "$750" },
    includes: [
      { en: "1 page, mobile layout", es: "1 página, diseño móvil" },
      { en: "Basic copy structure and single CTA", es: "Estructura básica de copy y CTA único" },
      { en: "Contact form", es: "Formulario de contacto" },
    ],
    excludes: [
      { en: "CMS or blog", es: "CMS o blog" },
      { en: "Multi-page navigation", es: "Navegación multipágina" },
      { en: "Analytics or domain setup", es: "Analítica o configuración de dominio" },
      { en: "Custom integrations", es: "Integraciones personalizadas" },
    ],
    timeline: { en: "2–3 business days", es: "2–3 días hábiles" },
  },

  {
    id: "web-local-starter",
    category: "website",
    name: { en: "Local Business Starter", es: "Inicio de Negocio Local" },
    summary: {
      en: "Up to 5 pages for a local business — service copy, local SEO basics, and WhatsApp/call CTAs built in.",
      es: "Hasta 5 páginas para un negocio local — copy de servicios, bases de SEO local y CTAs de WhatsApp/llamada incluidos.",
    },
    subtext: {
      en: "Domain connection, analytics, and Search Console setup are available as the Deployment add-on.",
      es: "La conexión de dominio, analítica y configuración de Search Console están disponibles como el complemento de Despliegue.",
    },
    price: { en: "$1,500", es: "$1,500" },
    includes: [
      { en: "Up to 5 static pages", es: "Hasta 5 páginas estáticas" },
      { en: "Service copy structure", es: "Estructura de copy de servicios" },
      { en: "Local SEO basics (title tags, meta descriptions)", es: "Bases de SEO local (títulos, meta descripciones)" },
      { en: "WhatsApp and call CTAs", es: "CTAs de WhatsApp y llamada" },
      { en: "Mobile-responsive build", es: "Construcción responsiva móvil" },
    ],
    excludes: [
      { en: "CMS or blog", es: "CMS o blog" },
      { en: "Payment processing or booking system", es: "Procesamiento de pagos o sistema de reservas" },
      { en: "Analytics, Search Console, or domain connection", es: "Analítica, Search Console o conexión de dominio" },
    ],
    timeline: { en: "5–7 business days", es: "5–7 días hábiles" },
  },

  {
    id: "web-local-deployment",
    category: "website",
    name: { en: "Local Business Starter + Deployment", es: "Inicio de Negocio Local + Despliegue" },
    summary: {
      en: "Everything in Local Business Starter plus domain connection, analytics, Google Search Console, mobile QA, and a client handoff session.",
      es: "Todo lo del Inicio de Negocio Local más conexión de dominio, analítica, Google Search Console, QA móvil y sesión de traspaso al cliente.",
    },
    subtext: {
      en: "The complete launch package for a local business — ready to be found from day one.",
      es: "El paquete de lanzamiento completo para un negocio local — listo para ser encontrado desde el primer día.",
    },
    price: { en: "$1,900", es: "$1,900" },
    includes: [
      { en: "Everything in Local Business Starter", es: "Todo lo del Inicio de Negocio Local" },
      { en: "Domain connection and DNS configuration", es: "Conexión de dominio y configuración de DNS" },
      { en: "Google Analytics 4 setup", es: "Configuración de Google Analytics 4" },
      { en: "Google Search Console setup and verification", es: "Configuración y verificación de Google Search Console" },
      { en: "Mobile QA pass", es: "Revisión de QA móvil" },
      { en: "Client handoff session (recorded)", es: "Sesión de traspaso al cliente (grabada)" },
    ],
    excludes: [
      { en: "CMS or blog", es: "CMS o blog" },
      { en: "Payment processing or booking system", es: "Procesamiento de pagos o sistema de reservas" },
      { en: "Google Business Profile setup", es: "Configuración de Google Business Profile" },
    ],
    timeline: { en: "7–10 business days", es: "7–10 días hábiles" },
  },

  {
    id: "web-authority-lite",
    category: "website",
    name: { en: "Authority Website Lite", es: "Sitio de Autoridad Lite" },
    summary: {
      en: "Up to 7 pages with a stronger copy structure, service architecture, trust sections, and SEO metadata.",
      es: "Hasta 7 páginas con una estructura de copy más sólida, arquitectura de servicios, secciones de confianza y metadatos SEO.",
    },
    subtext: {
      en: "For businesses that need a credible multi-page presence without CMS overhead.",
      es: "Para negocios que necesitan una presencia multipágina creíble sin la sobrecarga de un CMS.",
    },
    price: { en: "$2,500", es: "$2,500" },
    includes: [
      { en: "Up to 7 pages", es: "Hasta 7 páginas" },
      { en: "Copy structure and service architecture", es: "Estructura de copy y arquitectura de servicios" },
      { en: "Trust sections (team, process, results)", es: "Secciones de confianza (equipo, proceso, resultados)" },
      { en: "SEO metadata (title tags, meta descriptions, schema basics)", es: "Metadatos SEO (títulos, meta descripciones, schema básico)" },
      { en: "Mobile-responsive build", es: "Construcción responsiva móvil" },
    ],
    excludes: [
      { en: "CMS or blog", es: "CMS o blog" },
      { en: "Analytics or domain setup", es: "Analítica o configuración de dominio" },
      { en: "Bilingual (EN/ES) delivery", es: "Entrega bilingüe (EN/ES)" },
      { en: "Payment processing or booking system", es: "Procesamiento de pagos o sistema de reservas" },
    ],
    timeline: { en: "7–10 business days", es: "7–10 días hábiles" },
  },

  {
    id: "web-authority-standard",
    category: "website",
    name: { en: "Authority Website Standard", es: "Sitio de Autoridad Estándar" },
    summary: {
      en: "Up to 10 pages with CMS, conversion architecture, service/package pages, schema markup, and a full QA pass.",
      es: "Hasta 10 páginas con CMS, arquitectura de conversión, páginas de servicios/paquetes, schema markup y revisión completa de QA.",
    },
    subtext: {
      en: "Included in the Brand Foundation, Market Ready, and Launch Stack bundles.",
      es: "Incluido en los paquetes Brand Foundation, Market Ready y Launch Stack.",
    },
    price: { en: "$3,500", es: "$3,500" },
    includes: [
      { en: "Up to 10 pages", es: "Hasta 10 páginas" },
      { en: "CMS (client-editable content after handoff)", es: "CMS (contenido editable por el cliente tras el traspaso)" },
      { en: "Conversion architecture and package/service pages", es: "Arquitectura de conversión y páginas de servicios/paquetes" },
      { en: "Schema markup for SEO", es: "Schema markup para SEO" },
      { en: "Full QA pass before handoff", es: "Revisión completa de QA antes del traspaso" },
    ],
    excludes: [
      { en: "Bilingual (EN/ES) delivery", es: "Entrega bilingüe (EN/ES)" },
      { en: "Analytics setup (available as add-on)", es: "Configuración de analítica (disponible como complemento)" },
      { en: "Advanced integrations or case studies", es: "Integraciones avanzadas o casos de estudio" },
    ],
    timeline: { en: "10–14 business days", es: "10–14 días hábiles" },
  },

  {
    id: "web-authority-premium",
    category: "website",
    name: { en: "Authority Website Premium", es: "Sitio de Autoridad Premium" },
    summary: {
      en: "Up to 15 pages with bilingual structure (EN/ES), case studies, intake flow, analytics, schema markup, and a full QA pass.",
      es: "Hasta 15 páginas con estructura bilingüe (EN/ES), casos de estudio, flujo de intake, analítica, schema markup y revisión completa de QA.",
    },
    subtext: {
      en: "The complete authority build. Requires a discovery brief or BA Standard Sprint.",
      es: "La construcción de autoridad completa. Requiere un brief de descubrimiento o Sprint Estándar de BA.",
    },
    price: { en: "Starting at $5,500", es: "Desde $5,500" },
    includes: [
      { en: "Up to 15 pages", es: "Hasta 15 páginas" },
      { en: "Bilingual structure EN/ES", es: "Estructura bilingüe EN/ES" },
      { en: "Case studies section", es: "Sección de casos de estudio" },
      { en: "Intake flow and lead qualification structure", es: "Flujo de intake y estructura de calificación de leads" },
      { en: "Analytics setup (GA4 + Search Console)", es: "Configuración de analítica (GA4 + Search Console)" },
      { en: "Schema markup and full SEO pass", es: "Schema markup y revisión SEO completa" },
      { en: "Full QA pass before handoff", es: "Revisión completa de QA antes del traspaso" },
    ],
    excludes: [
      { en: "Paid third-party plugins or SaaS subscriptions", es: "Plugins de terceros de pago o suscripciones SaaS" },
      { en: "CRM integration", es: "Integración con CRM" },
      { en: "Payment processing or booking system", es: "Procesamiento de pagos o sistema de reservas" },
      { en: "Ongoing content production", es: "Producción continua de contenido" },
    ],
    timeline: { en: "14–21 business days", es: "14–21 días hábiles" },
    startHereNote: {
      en: "Requires discovery brief or BA Standard Sprint before scope is confirmed.",
      es: "Requiere brief de descubrimiento o Sprint Estándar de BA antes de confirmar el alcance.",
    },
  },

  // ─── Platforms & Applications ─────────────────────────────────────────────────

  {
    id: "platform-automation",
    category: "platform",
    name: { en: "Workflow Automation Starter", es: "Inicio de Automatización de Flujos" },
    summary: {
      en: "1–3 bounded workflows with trigger logic, action routing, data structuring, and basic error handling.",
      es: "1–3 flujos de trabajo acotados con lógica de activación, enrutamiento de acciones, estructuración de datos y manejo básico de errores.",
    },
    subtext: {
      en: "For teams with a defined, repeatable process that is currently manual.",
      es: "Para equipos con un proceso definido y repetible que actualmente es manual.",
    },
    price: { en: "Starting at $1,500", es: "Desde $1,500" },
    includes: [
      { en: "1–3 bounded workflows", es: "1–3 flujos de trabajo acotados" },
      { en: "Trigger logic and action routing", es: "Lógica de activación y enrutamiento de acciones" },
      { en: "Data structuring and basic error handling", es: "Estructuración de datos y manejo básico de errores" },
    ],
    excludes: [
      { en: "CRM, database, or dashboard UI", es: "CRM, base de datos o interfaz de panel" },
      { en: "Production deployment or ongoing maintenance", es: "Despliegue en producción o mantenimiento continuo" },
      { en: "4+ integrations (requires Change Order)", es: "4+ integraciones (requiere Orden de Cambio)" },
    ],
    timeline: { en: "7–10 business days", es: "7–10 días hábiles" },
  },

  {
    id: "platform-crm",
    category: "platform",
    name: { en: "CRM Setup & Configuration", es: "Configuración de CRM" },
    summary: {
      en: "Airtable or HubSpot setup — data model, views, automation rules, and a recorded training session.",
      es: "Configuración de Airtable o HubSpot — modelo de datos, vistas, reglas de automatización y sesión de capacitación grabada.",
    },
    subtext: {
      en: "Includes a 1-hour recorded training session for your team.",
      es: "Incluye una sesión de capacitación grabada de 1 hora para su equipo.",
    },
    price: { en: "Starting at $1,500", es: "Desde $1,500" },
    includes: [
      { en: "Data model and field configuration", es: "Modelo de datos y configuración de campos" },
      { en: "Views, filters, and automation rules", es: "Vistas, filtros y reglas de automatización" },
      { en: "1-hour recorded training session", es: "Sesión de capacitación grabada de 1 hora" },
    ],
    excludes: [
      { en: "Ongoing CRM management", es: "Gestión continua del CRM" },
      { en: "Data migration from legacy system", es: "Migración de datos de sistema heredado" },
      { en: "Third-party integrations beyond the selected CRM", es: "Integraciones de terceros fuera del CRM seleccionado" },
    ],
    timeline: { en: "7–12 business days", es: "7–12 días hábiles" },
  },

  {
    id: "platform-dashboard",
    category: "platform",
    name: { en: "Business Dashboard Build", es: "Construcción de Panel Empresarial" },
    summary: {
      en: "A reporting dashboard with data connections, role-scoped views, and export functionality. Requires an existing data source.",
      es: "Un panel de informes con conexiones de datos, vistas por rol y funcionalidad de exportación. Requiere una fuente de datos existente.",
    },
    subtext: {
      en: "Requires an existing data source (database, spreadsheet, or CRM) on file before scope begins.",
      es: "Requiere una fuente de datos existente (base de datos, hoja de cálculo o CRM) antes de iniciar el alcance.",
    },
    price: { en: "Starting at $2,200", es: "Desde $2,200" },
    includes: [
      { en: "Reporting dashboard with data connections", es: "Panel de informes con conexiones de datos" },
      { en: "Role-scoped views", es: "Vistas por rol" },
      { en: "Export functionality", es: "Funcionalidad de exportación" },
    ],
    excludes: [
      { en: "Data source build or ETL pipelines", es: "Construcción de fuente de datos o pipelines ETL" },
      { en: "Live API integrations beyond 2 sources", es: "Integraciones de API en vivo más allá de 2 fuentes" },
    ],
    timeline: { en: "7–12 business days", es: "7–12 días hábiles" },
  },

  {
    id: "platform-starter",
    category: "platform",
    name: { en: "Platform Starter", es: "Plataforma Inicial" },
    summary: {
      en: "Auth layer, database, dashboard, admin surface, and up to 3 integrations — fully scoped and QA-reviewed. The entry point for operational platform builds.",
      es: "Capa de autenticación, base de datos, panel, superficie de administración y hasta 3 integraciones — con alcance completo y revisión QA. El punto de entrada para construcciones de plataformas operativas.",
    },
    subtext: {
      en: "Requires BA Standard Sprint or Founder-approved scope brief before engagement begins.",
      es: "Requiere Sprint Estándar de BA o brief de alcance aprobado por el Fundador antes de iniciar.",
    },
    price: { en: "Starting at $8,500 — scoped on inquiry", es: "Desde $8,500 — precio por consulta" },
    includes: [
      { en: "Authentication layer and access controls", es: "Capa de autenticación y controles de acceso" },
      { en: "Database design and API routes", es: "Diseño de base de datos y rutas API" },
      { en: "Dashboard and admin surface", es: "Panel y superficie de administración" },
      { en: "Up to 3 integrations", es: "Hasta 3 integraciones" },
      { en: "Full QA pass before handoff", es: "Revisión completa de QA antes del traspaso" },
    ],
    excludes: [
      { en: "Mobile app", es: "Aplicación móvil" },
      { en: "AI/agent layer (separate engagement)", es: "Capa de IA/agentes (proyecto separado)" },
      { en: "Ongoing hosting or maintenance", es: "Hosting continuo o mantenimiento" },
    ],
    timeline: { en: "18–25 business days", es: "18–25 días hábiles" },
  },

  // ─── Business Management Systems ──────────────────────────────────────────────

  {
    id: "bms-pos",
    category: "bms",
    name: { en: "POS System", es: "Sistema POS" },
    summary: {
      en: "A point-of-sale system for retail, restaurants, and service businesses — transactions, reporting, and end-of-day reconciliation built in.",
      es: "Un sistema de punto de venta para comercio minorista, restaurantes y negocios de servicios — transacciones, informes y conciliación de cierre del día integrados.",
    },
    subtext: {
      en: "Available as a licensed deployment or custom build. All engagements begin with a scoping sprint.",
      es: "Disponible como despliegue licenciado o construcción personalizada. Todos los proyectos comienzan con un sprint de alcance.",
    },
    price: { en: "Inquiry", es: "Consulta" },
    includes: [
      { en: "Product catalog management", es: "Gestión de catálogo de productos" },
      { en: "Transaction processing (cash, card, mobile)", es: "Procesamiento de transacciones (efectivo, tarjeta, móvil)" },
      { en: "Sales reporting and analytics dashboard", es: "Informes de ventas y panel de análisis" },
      { en: "End-of-day reconciliation", es: "Conciliación de cierre del día" },
      { en: "Multi-location ready architecture", es: "Arquitectura preparada para múltiples ubicaciones" },
    ],
    excludes: [
      { en: "Payment processor fees (client-managed)", es: "Comisiones del procesador de pagos (gestionadas por el cliente)" },
      { en: "Third-party hardware integration beyond standard configuration", es: "Integración de hardware de terceros más allá de la configuración estándar" },
    ],
    timeline: { en: "Custom — scoped on inquiry", es: "Personalizado — alcance por consulta" },
    startHereNote: {
      en: "Every engagement begins with a Product Fit & Feasibility Sprint to confirm scope and commercial model.",
      es: "Cada proyecto comienza con un Sprint de Ajuste y Viabilidad del Producto para confirmar el alcance y el modelo comercial.",
    },
  },

  {
    id: "bms-staff",
    category: "bms",
    name: { en: "Staff & Timecard Management", es: "Gestión de Personal y Tarjetas de Tiempo" },
    summary: {
      en: "Staff scheduling and time tracking for businesses with hourly or shift employees — clock in/out, approvals, and exportable payroll data.",
      es: "Programación de personal y seguimiento de tiempo para negocios con empleados por hora o turno — entrada/salida, aprobaciones y datos de nómina exportables.",
    },
    subtext: {
      en: "Available as a licensed deployment or custom build. All engagements begin with a scoping sprint.",
      es: "Disponible como despliegue licenciado o construcción personalizada. Todos los proyectos comienzan con un sprint de alcance.",
    },
    price: { en: "Inquiry", es: "Consulta" },
    includes: [
      { en: "Clock in/out with shift management", es: "Entrada/salida con gestión de turnos" },
      { en: "Timecard approval workflow", es: "Flujo de aprobación de tarjetas de tiempo" },
      { en: "Overtime tracking and calculations", es: "Seguimiento y cálculo de horas extra" },
      { en: "Exportable payroll data", es: "Datos de nómina exportables" },
      { en: "Manager dashboard with team overview", es: "Panel de gerente con vista general del equipo" },
    ],
    excludes: [
      { en: "Payroll processing (client-managed)", es: "Procesamiento de nómina (gestionado por el cliente)" },
      { en: "HR compliance legal review", es: "Revisión legal de cumplimiento de RR. HH." },
    ],
    timeline: { en: "Custom — scoped on inquiry", es: "Personalizado — alcance por consulta" },
    startHereNote: {
      en: "Every engagement begins with a Product Fit & Feasibility Sprint to confirm scope and commercial model.",
      es: "Cada proyecto comienza con un Sprint de Ajuste y Viabilidad del Producto para confirmar el alcance y el modelo comercial.",
    },
  },

  {
    id: "bms-appointments",
    category: "bms",
    name: { en: "Appointment & Scheduling System", es: "Sistema de Citas y Programación" },
    summary: {
      en: "Client self-booking, staff calendar management, reminders, no-show handling, and reporting — for clinics, salons, and service businesses.",
      es: "Reservas de clientes en línea, gestión de calendario del personal, recordatorios, manejo de ausencias e informes — para clínicas, salones y negocios de servicios.",
    },
    subtext: {
      en: "Available as a licensed deployment or custom build. All engagements begin with a scoping sprint.",
      es: "Disponible como despliegue licenciado o construcción personalizada. Todos los proyectos comienzan con un sprint de alcance.",
    },
    price: { en: "Inquiry", es: "Consulta" },
    includes: [
      { en: "Client self-booking portal", es: "Portal de reservas en línea para clientes" },
      { en: "Staff calendar management", es: "Gestión de calendario del personal" },
      { en: "Confirmation and reminder workflows", es: "Flujos de confirmación y recordatorio" },
      { en: "No-show tracking and reporting", es: "Seguimiento de ausencias e informes" },
    ],
    excludes: [
      { en: "Payment processing integration (scoped separately)", es: "Integración de procesamiento de pagos (alcance separado)" },
      { en: "HIPAA compliance layer (unless explicitly in scope)", es: "Capa de cumplimiento HIPAA (a menos que esté explícitamente en el alcance)" },
    ],
    timeline: { en: "Custom — scoped on inquiry", es: "Personalizado — alcance por consulta" },
    startHereNote: {
      en: "Every engagement begins with a Product Fit & Feasibility Sprint to confirm scope and commercial model.",
      es: "Cada proyecto comienza con un Sprint de Ajuste y Viabilidad del Producto para confirmar el alcance y el modelo comercial.",
    },
  },

  {
    id: "bms-inventory",
    category: "bms",
    name: { en: "Inventory Management System", es: "Sistema de Gestión de Inventario" },
    summary: {
      en: "Stock tracking, reorder triggers, supplier management, and a full audit trail — for hardware, retail, and distribution businesses.",
      es: "Seguimiento de inventario, activadores de reorden, gestión de proveedores y registro de auditoría completo — para negocios de ferretería, comercio minorista y distribución.",
    },
    subtext: {
      en: "Available as a licensed deployment or custom build. All engagements begin with a scoping sprint.",
      es: "Disponible como despliegue licenciado o construcción personalizada. Todos los proyectos comienzan con un sprint de alcance.",
    },
    price: { en: "Inquiry", es: "Consulta" },
    includes: [
      { en: "Product catalog and stock level tracking", es: "Catálogo de productos y seguimiento de niveles de inventario" },
      { en: "Reorder triggers and low-stock alerts", es: "Activadores de reorden y alertas de bajo inventario" },
      { en: "Supplier management", es: "Gestión de proveedores" },
      { en: "Location-aware inventory", es: "Inventario por ubicación" },
      { en: "Full audit trail", es: "Registro de auditoría completo" },
    ],
    excludes: [
      { en: "Accounting system integration (scoped separately)", es: "Integración con sistema contable (alcance separado)" },
      { en: "Barcode scanner hardware", es: "Hardware de escáner de código de barras" },
    ],
    timeline: { en: "Custom — scoped on inquiry", es: "Personalizado — alcance por consulta" },
    startHereNote: {
      en: "Every engagement begins with a Product Fit & Feasibility Sprint to confirm scope and commercial model.",
      es: "Cada proyecto comienza con un Sprint de Ajuste y Viabilidad del Producto para confirmar el alcance y el modelo comercial.",
    },
  },

  {
    id: "bms-hr",
    category: "bms",
    name: { en: "Employee & HR Portal", es: "Portal de Empleados y RR. HH." },
    summary: {
      en: "Staff onboarding, document management, policy acknowledgment, and a staff directory with role-based access.",
      es: "Incorporación de personal, gestión de documentos, reconocimiento de políticas y directorio de empleados con acceso basado en roles.",
    },
    subtext: {
      en: "Available as a licensed deployment or custom build. All engagements begin with a scoping sprint.",
      es: "Disponible como despliegue licenciado o construcción personalizada. Todos los proyectos comienzan con un sprint de alcance.",
    },
    price: { en: "Inquiry", es: "Consulta" },
    includes: [
      { en: "Document upload and acknowledgment tracking", es: "Carga de documentos y seguimiento de reconocimiento" },
      { en: "Policy management", es: "Gestión de políticas" },
      { en: "Onboarding checklist and task assignment", es: "Lista de verificación de incorporación y asignación de tareas" },
      { en: "Staff directory with role-based access", es: "Directorio de empleados con acceso basado en roles" },
    ],
    excludes: [
      { en: "Legal compliance review (LCA must be scoped separately)", es: "Revisión de cumplimiento legal (LCA debe tener alcance separado)" },
      { en: "Payroll integration", es: "Integración de nómina" },
      { en: "Benefits administration", es: "Administración de beneficios" },
    ],
    timeline: { en: "Custom — scoped on inquiry", es: "Personalizado — alcance por consulta" },
    startHereNote: {
      en: "Every engagement begins with a Product Fit & Feasibility Sprint to confirm scope and commercial model.",
      es: "Cada proyecto comienza con un Sprint de Ajuste y Viabilidad del Producto para confirmar el alcance y el modelo comercial.",
    },
  },

  // ─── Business Operating Systems ──────────────────────────────────────────────

  {
    id: "os-licensed",
    category: "os",
    name: { en: "Licensed OS Deployment", es: "Despliegue OS Licenciado" },
    summary: {
      en: "Deploy a prebuilt NoDrftSystems OS with standard configuration. The fastest path to a production-ready operating platform.",
      es: "Despliegue un OS preintegrado de NoDrftSystems con configuración estándar. El camino más rápido hacia una plataforma operativa lista para producción.",
    },
    subtext: {
      en: "Includes platform access, deployment support, onboarding, and the required Systems Assurance Retainer.",
      es: "Incluye acceso a la plataforma, soporte de despliegue, incorporación y el Retainer de Aseguramiento de Sistemas requerido.",
    },
    price: { en: "Inquiry", es: "Consulta" },
    includes: [
      { en: "Platform access (annual license)", es: "Acceso a la plataforma (licencia anual)" },
      { en: "Deployment and configuration support", es: "Soporte de despliegue y configuración" },
      { en: "Onboarding and staff training", es: "Incorporación y capacitación del personal" },
      { en: "Systems Assurance Retainer (required for all OS deployments)", es: "Retainer de Aseguramiento de Sistemas (requerido para todos los despliegues OS)" },
    ],
    excludes: [
      { en: "Custom workflow modifications (see Licensed + Configured OS)", es: "Modificaciones de flujo de trabajo personalizadas (ver OS Licenciado + Configurado)" },
      { en: "Source code access or ownership", es: "Acceso al código fuente o propiedad del mismo" },
    ],
    timeline: { en: "Custom — defined in Deployment SOW", es: "Personalizado — definido en SOW de Despliegue" },
    startHereNote: {
      en: "All OS engagements begin with a Product Fit & Feasibility Sprint.",
      es: "Todos los proyectos OS comienzan con un Sprint de Ajuste y Viabilidad del Producto.",
    },
  },

  {
    id: "os-configured",
    category: "os",
    name: { en: "Licensed + Configured OS", es: "OS Licenciado + Configurado" },
    summary: {
      en: "A prebuilt OS with tailored configuration — workflow adjustments, integration modifications, and custom role definitions for 70–90% fit scenarios.",
      es: "Un OS preintegrado con configuración personalizada — ajustes de flujo de trabajo, modificaciones de integración y definiciones de roles personalizadas para escenarios de ajuste del 70–90%.",
    },
    subtext: {
      en: "When the standard OS is close but not exact — configuration bridges the gap without a custom build.",
      es: "Cuando el OS estándar está cerca pero no es exacto — la configuración cierra la brecha sin una construcción personalizada.",
    },
    price: { en: "Inquiry", es: "Consulta" },
    includes: [
      { en: "Everything in Licensed OS Deployment", es: "Todo lo del Despliegue OS Licenciado" },
      { en: "Workflow adjustments to fit operational requirements", es: "Ajustes de flujo de trabajo para adaptarse a los requisitos operativos" },
      { en: "Integration modifications", es: "Modificaciones de integración" },
      { en: "Custom role definitions", es: "Definiciones de roles personalizadas" },
    ],
    excludes: [
      { en: "Fundamental architecture changes (routes to Custom OS Build)", es: "Cambios fundamentales de arquitectura (redirige a Construcción OS Personalizada)" },
      { en: "Source code access or ownership", es: "Acceso al código fuente o propiedad del mismo" },
    ],
    timeline: { en: "Custom — defined in Deployment SOW", es: "Personalizado — definido en SOW de Despliegue" },
    startHereNote: {
      en: "All OS engagements begin with a Product Fit & Feasibility Sprint.",
      es: "Todos los proyectos OS comienzan con un Sprint de Ajuste y Viabilidad del Producto.",
    },
  },

  {
    id: "os-custom",
    category: "os",
    name: { en: "Custom OS Build", es: "Construcción OS Personalizada" },
    summary: {
      en: "A new OS commissioned for an industry with no existing NoDrftSystems product. The client becomes the first licensed operator and receives first-operator status.",
      es: "Un nuevo OS encargado para una industria sin producto NoDrftSystems existente. El cliente se convierte en el primer operador licenciado y recibe estado de primer operador.",
    },
    subtext: {
      en: "Requires BA Architecture Intensive. IP default: NoDrftSystems retains all IP.",
      es: "Requiere Intensivo de Arquitectura de BA. IP por defecto: NoDrftSystems retiene toda la propiedad intelectual.",
    },
    price: { en: "Inquiry", es: "Consulta" },
    includes: [
      { en: "Full architecture design and build", es: "Diseño y construcción de arquitectura completa" },
      { en: "Industry-specific compliance layer", es: "Capa de cumplimiento específica de la industria" },
      { en: "First licensed operator status", es: "Estado de primer operador licenciado" },
      { en: "ARE sign-off on delivery", es: "Firma de ARE en la entrega" },
    ],
    excludes: [
      { en: "Source code ownership (NoDrftSystems retains IP by default)", es: "Propiedad del código fuente (NoDrftSystems retiene la PI por defecto)" },
      { en: "IP Purchase Agreement (requires separate commercial negotiation)", es: "Acuerdo de Compra de PI (requiere negociación comercial separada)" },
    ],
    timeline: { en: "Custom — defined in BA Architecture Intensive output", es: "Personalizado — definido en el resultado del Intensivo de Arquitectura de BA" },
    startHereNote: {
      en: "Requires BA Architecture Intensive and Founder authorization before any engagement begins.",
      es: "Requiere Intensivo de Arquitectura de BA y autorización del Fundador antes de iniciar cualquier proyecto.",
    },
  },

  // ─── Content & Social Media ───────────────────────────────────────────────────

  {
    id: "content-starter",
    category: "content",
    name: { en: "Content Starter", es: "Contenido Inicial" },
    summary: {
      en: "Up to 2 blog posts or content pieces per month with basic on-page SEO per piece.",
      es: "Hasta 2 publicaciones de blog o piezas de contenido por mes con SEO on-page básico por pieza.",
    },
    subtext: {
      en: "Month-to-month after the first month. An approved brief is required before writing begins.",
      es: "Mes a mes después del primer mes. Se requiere un brief aprobado antes de comenzar a escribir.",
    },
    price: { en: "$750/month", es: "$750/mes" },
    includes: [
      { en: "Up to 2 blog posts or content pieces per month", es: "Hasta 2 publicaciones de blog o piezas de contenido por mes" },
      { en: "Basic on-page SEO per piece", es: "SEO on-page básico por pieza" },
      { en: "Client approval round before publication", es: "Ronda de aprobación del cliente antes de publicar" },
    ],
    excludes: [
      { en: "Social media posts or graphics", es: "Publicaciones en redes sociales o gráficos" },
      { en: "Video production", es: "Producción de video" },
      { en: "Graphic design (beyond basic formatting)", es: "Diseño gráfico (más allá del formato básico)" },
    ],
    timeline: { en: "Ongoing — monthly", es: "Continuo — mensual" },
  },

  {
    id: "content-standard",
    category: "content",
    name: { en: "Content Standard", es: "Contenido Estándar" },
    summary: {
      en: "Up to 4 content pieces per month with SEO keyword tracking and an editorial calendar.",
      es: "Hasta 4 piezas de contenido por mes con seguimiento de palabras clave SEO y calendario editorial.",
    },
    subtext: {
      en: "3-month minimum. Brand guidelines must be on file before month 1.",
      es: "Mínimo 3 meses. Las guías de marca deben estar en archivo antes del mes 1.",
    },
    price: { en: "$1,500/month", es: "$1,500/mes" },
    includes: [
      { en: "Up to 4 content pieces per month", es: "Hasta 4 piezas de contenido por mes" },
      { en: "SEO keyword tracking report", es: "Informe de seguimiento de palabras clave SEO" },
      { en: "Editorial calendar planned and delivered in advance", es: "Calendario editorial planificado y entregado con anticipación" },
      { en: "Client approval round before publication", es: "Ronda de aprobación del cliente antes de publicar" },
    ],
    excludes: [
      { en: "Social media posts or graphics", es: "Publicaciones en redes sociales o gráficos" },
      { en: "Video production", es: "Producción de video" },
    ],
    timeline: { en: "Ongoing — monthly", es: "Continuo — mensual" },
  },

  {
    id: "social-foundation",
    category: "content",
    name: { en: "Social: Content Foundation", es: "Social: Base de Contenido" },
    summary: {
      en: "8 posts per month across Instagram and TikTok — content calendar, copy, captions, hashtags, and static and animated graphics.",
      es: "8 publicaciones por mes en Instagram y TikTok — calendario de contenido, textos, pies de foto, hashtags y gráficos estáticos y animados.",
    },
    subtext: {
      en: "Platform ad spend is always client-managed and client-paid directly to the platform — not included in production pricing.",
      es: "El gasto en publicidad en plataformas siempre es gestionado y pagado directamente por el cliente a la plataforma — no incluido en el precio de producción.",
    },
    price: { en: "$995/month", es: "$995/mes" },
    includes: [
      { en: "8 posts/month — Instagram + TikTok", es: "8 publicaciones/mes — Instagram + TikTok" },
      { en: "Monthly content calendar planned in advance", es: "Calendario de contenido mensual planificado con anticipación" },
      { en: "Copywriting, captions, and hashtag research", es: "Redacción, pies de foto e investigación de hashtags" },
      { en: "Static and animated graphics matched to brand", es: "Gráficos estáticos y animados adaptados a la marca" },
      { en: "Client approval round before scheduling", es: "Ronda de aprobación del cliente antes de programar" },
    ],
    excludes: [
      { en: "Platform ad spend and boosting (client-paid directly)", es: "Gasto en publicidad y promoción en plataformas (pagado directamente por el cliente)" },
      { en: "On-site video filming (scripts and direction included; camera work is separate)", es: "Filmación de video en sitio (guiones y dirección incluidos; trabajo de cámara es separado)" },
    ],
    timeline: { en: "Ongoing — monthly", es: "Continuo — mensual" },
  },

  {
    id: "social-engine",
    category: "content",
    name: { en: "Social: Content Engine", es: "Social: Motor de Contenido" },
    summary: {
      en: "16 posts per month across Instagram, TikTok, and Facebook — more volume, more platforms.",
      es: "16 publicaciones por mes en Instagram, TikTok y Facebook — más volumen, más plataformas.",
    },
    subtext: {
      en: "Platform ad spend is always client-managed and client-paid directly to the platform — not included in production pricing.",
      es: "El gasto en publicidad en plataformas siempre es gestionado y pagado directamente por el cliente a la plataforma — no incluido en el precio de producción.",
    },
    price: { en: "$1,750/month", es: "$1,750/mes" },
    includes: [
      { en: "16 posts/month — Instagram, TikTok, Facebook", es: "16 publicaciones/mes — Instagram, TikTok, Facebook" },
      { en: "Monthly content calendar planned in advance", es: "Calendario de contenido mensual planificado con anticipación" },
      { en: "Copywriting, captions, and hashtag research", es: "Redacción, pies de foto e investigación de hashtags" },
      { en: "Static and animated graphics matched to brand", es: "Gráficos estáticos y animados adaptados a la marca" },
      { en: "Client approval round before scheduling", es: "Ronda de aprobación del cliente antes de programar" },
    ],
    excludes: [
      { en: "Platform ad spend and boosting (client-paid directly)", es: "Gasto en publicidad y promoción en plataformas (pagado directamente por el cliente)" },
      { en: "On-site video filming (scripts and direction included; camera work is separate)", es: "Filmación de video en sitio (guiones y dirección incluidos; trabajo de cámara es separado)" },
    ],
    timeline: { en: "Ongoing — monthly", es: "Continuo — mensual" },
  },

  {
    id: "social-system",
    category: "content",
    name: { en: "Social: Content System", es: "Social: Sistema de Contenido" },
    summary: {
      en: "24–30 posts per month across Instagram, TikTok, and Facebook — full-volume content production for businesses that need a consistent, high-frequency social presence.",
      es: "24–30 publicaciones por mes en Instagram, TikTok y Facebook — producción de contenido en volumen completo para negocios que necesitan una presencia social consistente y de alta frecuencia.",
    },
    subtext: {
      en: "Platform ad spend is always client-managed and client-paid directly to the platform — not included in production pricing.",
      es: "El gasto en publicidad en plataformas siempre es gestionado y pagado directamente por el cliente a la plataforma — no incluido en el precio de producción.",
    },
    price: { en: "$2,950/month", es: "$2,950/mes" },
    includes: [
      { en: "24–30 posts/month — Instagram, TikTok, Facebook", es: "24–30 publicaciones/mes — Instagram, TikTok, Facebook" },
      { en: "Monthly content calendar planned in advance", es: "Calendario de contenido mensual planificado con anticipación" },
      { en: "Copywriting, captions, and hashtag research", es: "Redacción, pies de foto e investigación de hashtags" },
      { en: "Static and animated graphics matched to brand", es: "Gráficos estáticos y animados adaptados a la marca" },
      { en: "Client approval round before scheduling", es: "Ronda de aprobación del cliente antes de programar" },
    ],
    excludes: [
      { en: "Platform ad spend and boosting (client-paid directly)", es: "Gasto en publicidad y promoción en plataformas (pagado directamente por el cliente)" },
      { en: "On-site video filming (scripts and direction included; camera work is separate)", es: "Filmación de video en sitio (guiones y dirección incluidos; trabajo de cámara es separado)" },
    ],
    timeline: { en: "Ongoing — monthly", es: "Continuo — mensual" },
  },

  // ─── Ongoing Support Retainers ────────────────────────────────────────────────

  {
    id: "retainer-care",
    category: "retainer",
    name: { en: "Care Retainer", es: "Retainer de Cuidado" },
    summary: {
      en: "Basic updates, uptime monitoring, small content changes, and a monthly npm audit. For small local businesses that need light ongoing support.",
      es: "Actualizaciones básicas, monitoreo de disponibilidad, pequeños cambios de contenido y auditoría npm mensual. Para pequeños negocios locales que necesitan soporte continuo ligero.",
    },
    subtext: {
      en: "Month-to-month after the first month.",
      es: "Mes a mes después del primer mes.",
    },
    price: { en: "$500/month", es: "$500/mes" },
    includes: [
      { en: "Basic site updates and small content changes", es: "Actualizaciones básicas del sitio y pequeños cambios de contenido" },
      { en: "Uptime monitoring", es: "Monitoreo de disponibilidad" },
      { en: "Monthly npm audit", es: "Auditoría npm mensual" },
      { en: "25 routine runs per rolling 24-hour window", es: "25 ejecuciones de rutina por ventana de 24 horas" },
    ],
    excludes: [
      { en: "New feature development", es: "Desarrollo de nuevas funciones" },
      { en: "Major design changes", es: "Cambios de diseño mayores" },
    ],
    timeline: { en: "48-hour response SLA", es: "SLA de respuesta de 48 horas" },
  },

  {
    id: "retainer-growth",
    category: "retainer",
    name: { en: "Growth Retainer", es: "Retainer de Crecimiento" },
    summary: {
      en: "Updates, content support, SEO signal checks, minor enhancements, and priority scheduling. For active businesses that need regular improvement.",
      es: "Actualizaciones, soporte de contenido, verificaciones de señales SEO, mejoras menores y programación prioritaria. Para negocios activos que necesitan mejora continua.",
    },
    subtext: {
      en: "3-month minimum.",
      es: "Mínimo 3 meses.",
    },
    price: { en: "$1,500/month", es: "$1,500/mes" },
    includes: [
      { en: "Updates and content support", es: "Actualizaciones y soporte de contenido" },
      { en: "SEO signal checks", es: "Verificaciones de señales SEO" },
      { en: "Minor enhancements and priority scheduling", es: "Mejoras menores y programación prioritaria" },
      { en: "Monthly npm audit", es: "Auditoría npm mensual" },
      { en: "100 routine runs per rolling 24-hour window", es: "100 ejecuciones de rutina por ventana de 24 horas" },
    ],
    excludes: [
      { en: "Major new features (requires Change Order)", es: "Nuevas funciones mayores (requiere Orden de Cambio)" },
    ],
    timeline: { en: "24-hour priority response SLA", es: "SLA de respuesta prioritaria de 24 horas" },
  },

  {
    id: "retainer-systems",
    category: "retainer",
    name: { en: "Systems Retainer", es: "Retainer de Sistemas" },
    summary: {
      en: "Strategy sessions, QA passes, automation support, priority implementation, reporting, and monthly npm audit + CVE scan.",
      es: "Sesiones de estrategia, revisiones QA, soporte de automatización, implementación prioritaria, informes y auditoría npm mensual + escaneo CVE.",
    },
    subtext: {
      en: "3-month minimum. For businesses with workflows, automations, or active digital operations.",
      es: "Mínimo 3 meses. Para negocios con flujos de trabajo, automatizaciones u operaciones digitales activas.",
    },
    price: { en: "$3,500/month", es: "$3,500/mes" },
    includes: [
      { en: "Strategy sessions and QA passes", es: "Sesiones de estrategia y revisiones QA" },
      { en: "Automation support and priority implementation", es: "Soporte de automatización e implementación prioritaria" },
      { en: "Reporting and roadmap management", es: "Informes y gestión de hoja de ruta" },
      { en: "Monthly npm audit + CVE scan", es: "Auditoría npm mensual + escaneo CVE" },
      { en: "250 routine runs per rolling 24-hour window", es: "250 ejecuciones de rutina por ventana de 24 horas" },
    ],
    excludes: [
      { en: "Major platform rebuilds (scoped separately)", es: "Reconstrucciones mayores de plataforma (alcance separado)" },
    ],
    timeline: { en: "4-hour emergency response SLA", es: "SLA de respuesta de emergencia de 4 horas" },
  },

  {
    id: "retainer-embedded",
    category: "retainer",
    name: { en: "Embedded Support", es: "Soporte Integrado" },
    summary: {
      en: "Priority roadmap management, systems work, QA, reporting, and dedicated capacity. For complex clients requiring ongoing build and support.",
      es: "Gestión prioritaria de hoja de ruta, trabajo de sistemas, QA, informes y capacidad dedicada. Para clientes complejos que requieren construcción y soporte continuos.",
    },
    subtext: {
      en: "3-month minimum. On-call coordination included.",
      es: "Mínimo 3 meses. Coordinación de guardia incluida.",
    },
    price: { en: "$7,500/month", es: "$7,500/mes" },
    includes: [
      { en: "Priority roadmap management and systems work", es: "Gestión prioritaria de hoja de ruta y trabajo de sistemas" },
      { en: "QA passes and advanced reporting", es: "Revisiones QA e informes avanzados" },
      { en: "Dedicated capacity", es: "Capacidad dedicada" },
      { en: "500 routine runs per rolling 24-hour window", es: "500 ejecuciones de rutina por ventana de 24 horas" },
    ],
    excludes: [
      { en: "OS licensing and Systems Assurance (separate retainer)", es: "Licencia OS y Aseguramiento de Sistemas (retainer separado)" },
    ],
    timeline: { en: "4-hour emergency response + on-call coordination SLA", es: "SLA de respuesta de emergencia de 4 horas + coordinación de guardia" },
  },

  {
    id: "retainer-assurance",
    category: "retainer",
    name: { en: "Systems Assurance Retainer", es: "Retainer de Aseguramiento de Sistemas" },
    summary: {
      en: "Monthly regulated workflow QA, quarterly compliance review, security audit, and role-permission drift detection. Required for all OS licensed deployments.",
      es: "QA mensual de flujos de trabajo regulados, revisión trimestral de cumplimiento, auditoría de seguridad y detección de desviación de permisos de roles. Requerido para todos los despliegues OS licenciados.",
    },
    subtext: {
      en: "6-month minimum. Required as a condition of all PharmacyOS and regulated vertical OS licenses.",
      es: "Mínimo 6 meses. Requerido como condición de todas las licencias PharmacyOS y OS de verticales reguladas.",
    },
    price: { en: "Starting at $1,500/month (OS clients)", es: "Desde $1,500/mes (clientes OS)" },
    includes: [
      { en: "Monthly regulated workflow QA pass", es: "Revisión QA mensual de flujos de trabajo regulados" },
      { en: "Quarterly compliance review", es: "Revisión trimestral de cumplimiento" },
      { en: "Security audit and role-permission drift detection", es: "Auditoría de seguridad y detección de desviación de permisos de roles" },
      { en: "Regulatory update monitoring", es: "Monitoreo de actualizaciones regulatorias" },
      { en: "Roadmap execution (≤15 hrs/month)", es: "Ejecución de hoja de ruta (≤15 hrs/mes)" },
    ],
    excludes: [
      { en: "Legal compliance review (LCA scoped separately)", es: "Revisión de cumplimiento legal (LCA con alcance separado)" },
    ],
    timeline: { en: "4-hour emergency response SLA", es: "SLA de respuesta de emergencia de 4 horas" },
  },

  // ─── Bundles ──────────────────────────────────────────────────────────────────

  {
    id: "bundle-identity",
    category: "bundle",
    name: { en: "Identity Starter", es: "Identity Starter" },
    summary: {
      en: "Logo Premium + Brand Guidelines Document. Everything you need to show up professionally — nothing you don't.",
      es: "Logotipo Premium + Documento de Guías de Marca. Todo lo que necesita para proyectar profesionalismo — nada más.",
    },
    subtext: {
      en: "The fastest path from no brand to a complete visual identity.",
      es: "El camino más rápido de no tener marca a una identidad visual completa.",
    },
    price: { en: "$1,800", es: "$1,800" },
    includes: [
      { en: "Logo Design — Premium (3 concepts, 3 revisions, full file set + social variants)", es: "Diseño de Logotipo Premium (3 conceptos, 3 revisiones, archivos completos + variantes para redes sociales)" },
      { en: "Brand Guidelines Document (color codes, typography, clearspace rules)", es: "Documento de Guías de Marca (códigos de color, tipografía, reglas de espacio libre)" },
    ],
    excludes: [
      { en: "Website or platform development", es: "Desarrollo de sitio web o plataforma" },
      { en: "Stationery templates", es: "Plantillas de papelería" },
    ],
    timeline: { en: "3–5 business days", es: "3–5 días hábiles" },
  },

  {
    id: "bundle-brand-foundation",
    category: "bundle",
    name: { en: "Brand Foundation", es: "Brand Foundation" },
    summary: {
      en: "Brand Identity System + Authority Website Standard. A complete brand and online presence delivered together.",
      es: "Sistema de Identidad de Marca + Sitio de Autoridad Estándar. Una marca completa y presencia en línea entregadas juntas.",
    },
    subtext: {
      en: "The most common starting point for established businesses building their first serious digital presence.",
      es: "El punto de partida más común para negocios establecidos que construyen su primera presencia digital seria.",
    },
    price: { en: "$7,500", es: "$7,500" },
    includes: [
      { en: "Brand Identity System (Logo Premium, color palette, typography, guidelines, stationery)", es: "Sistema de Identidad de Marca (Logotipo Premium, paleta de colores, tipografía, guías, papelería)" },
      { en: "Authority Website Standard (up to 10 pages, CMS, schema markup, full QA)", es: "Sitio de Autoridad Estándar (hasta 10 páginas, CMS, schema markup, QA completo)" },
    ],
    excludes: [
      { en: "Bilingual delivery (available as add-on)", es: "Entrega bilingüe (disponible como complemento)" },
      { en: "Analytics setup (available as add-on)", es: "Configuración de analítica (disponible como complemento)" },
    ],
    timeline: { en: "12–18 business days", es: "12–18 días hábiles" },
  },

  {
    id: "bundle-market-ready",
    category: "bundle",
    name: { en: "Market Ready", es: "Market Ready" },
    summary: {
      en: "Brand Identity System + Authority Website Standard + SEO Metadata Pass + Local SEO Setup. Brand, presence, and search visibility — ready to generate inbound.",
      es: "Sistema de Identidad de Marca + Sitio de Autoridad Estándar + Revisión de Metadatos SEO + Configuración de SEO Local. Marca, presencia y visibilidad en buscadores — listo para generar tráfico entrante.",
    },
    subtext: {
      en: "For businesses that need to be found, not just look good.",
      es: "Para negocios que necesitan ser encontrados, no solo verse bien.",
    },
    price: { en: "$9,000", es: "$9,000" },
    includes: [
      { en: "Everything in Brand Foundation", es: "Todo lo del Brand Foundation" },
      { en: "SEO Metadata Pass (title tags, meta descriptions, OG tags — up to 10 pages)", es: "Revisión de Metadatos SEO (títulos, meta descripciones, etiquetas OG — hasta 10 páginas)" },
      { en: "Local SEO Setup (schema, NAP consistency, local keyword structure)", es: "Configuración de SEO Local (schema, consistencia NAP, estructura de palabras clave locales)" },
    ],
    excludes: [
      { en: "Bilingual delivery (available as add-on)", es: "Entrega bilingüe (disponible como complemento)" },
      { en: "Ongoing SEO retainer", es: "Retainer SEO continuo" },
    ],
    timeline: { en: "14–21 business days", es: "14–21 días hábiles" },
  },

  {
    id: "bundle-launch-stack",
    category: "bundle",
    name: { en: "Launch Stack", es: "Launch Stack" },
    summary: {
      en: "BA Standard Sprint + Brand Identity System + Authority Website Standard + Social Content Foundation (3 months). From idea to market — strategy, brand, web, and social activation.",
      es: "Sprint Estándar de BA + Sistema de Identidad de Marca + Sitio de Autoridad Estándar + Base de Contenido Social (3 meses). De la idea al mercado — estrategia, marca, web y activación social.",
    },
    subtext: {
      en: "The complete go-to-market package for a new business or product launch.",
      es: "El paquete completo de salida al mercado para un nuevo negocio o lanzamiento de producto.",
    },
    price: { en: "$13,500", es: "$13,500" },
    includes: [
      { en: "BA Standard Sprint (full 17-section evaluation + go/hold recommendation)", es: "Sprint Estándar de BA (evaluación completa de 17 secciones + recomendación de avanzar o pausar)" },
      { en: "Brand Identity System", es: "Sistema de Identidad de Marca" },
      { en: "Authority Website Standard", es: "Sitio de Autoridad Estándar" },
      { en: "Social: Content Foundation — 3 months (8 posts/month, Instagram + TikTok)", es: "Social: Base de Contenido — 3 meses (8 publicaciones/mes, Instagram + TikTok)" },
    ],
    excludes: [
      { en: "Platform ad spend (client-managed)", es: "Gasto en publicidad en plataformas (gestionado por el cliente)" },
      { en: "Bilingual delivery (available as add-on)", es: "Entrega bilingüe (disponible como complemento)" },
    ],
    timeline: { en: "Sequenced — 4–6 weeks from confirmed start", es: "Secuenciado — 4–6 semanas desde el inicio confirmado" },
  },
];

export const compareRows = [
  {
    id: "ba-quick",
    name: { en: "BA Quick Sprint", es: "Sprint Rápido de BA" },
    best: { en: "Simple business, one offer — rapid feasibility signal", es: "Negocio simple, una oferta — señal rápida de viabilidad" },
    price: { en: "$750", es: "$750" },
    time: { en: "1–2 business days", es: "1–2 días hábiles" },
    notFor: { en: "Build output — this defines it", es: "Resultado de construcción — esto lo define" },
  },
  {
    id: "brand-logo-standard",
    name: { en: "Logo Design — Standard", es: "Diseño de Logotipo Estándar" },
    best: { en: "Professional logo, fast", es: "Logotipo profesional, rápido" },
    price: { en: "$400", es: "$400" },
    time: { en: "2–3 business days", es: "2–3 días hábiles" },
    notFor: { en: "Full brand system", es: "Sistema de marca completo" },
  },
  {
    id: "web-quick",
    name: { en: "Quick Web Presence", es: "Presencia Web Rápida" },
    best: { en: "Live presence needed immediately — one page", es: "Presencia activa inmediata — una página" },
    price: { en: "$750", es: "$750" },
    time: { en: "2–3 business days", es: "2–3 días hábiles" },
    notFor: { en: "Multi-page site, CMS, analytics", es: "Sitio multipágina, CMS, analítica" },
  },
  {
    id: "web-authority-standard",
    name: { en: "Authority Website Standard", es: "Sitio de Autoridad Estándar" },
    best: { en: "Complete business website with CMS and conversion architecture", es: "Sitio empresarial completo con CMS y arquitectura de conversión" },
    price: { en: "$3,500", es: "$3,500" },
    time: { en: "10–14 business days", es: "10–14 días hábiles" },
    notFor: { en: "Bilingual, advanced integrations, case studies", es: "Bilingüe, integraciones avanzadas, casos de estudio" },
  },
  {
    id: "social-foundation",
    name: { en: "Social: Content Foundation", es: "Social: Base de Contenido" },
    best: { en: "Consistent social presence — 8 posts/month", es: "Presencia social consistente — 8 publicaciones/mes" },
    price: { en: "$995/month", es: "$995/mes" },
    time: { en: "Ongoing", es: "Continuo" },
    notFor: { en: "Ad spend management (client-managed)", es: "Gestión de gasto publicitario (gestionado por el cliente)" },
  },
  {
    id: "retainer-care",
    name: { en: "Care Retainer", es: "Retainer de Cuidado" },
    best: { en: "Light ongoing support for small local businesses", es: "Soporte continuo ligero para pequeños negocios locales" },
    price: { en: "$500/month", es: "$500/mes" },
    time: { en: "Month-to-month", es: "Mes a mes" },
    notFor: { en: "New feature development", es: "Desarrollo de nuevas funciones" },
  },
  {
    id: "bundle-brand-foundation",
    name: { en: "Brand Foundation Bundle", es: "Paquete Brand Foundation" },
    best: { en: "Complete brand + website in one engagement", es: "Marca + sitio web completos en un proyecto" },
    price: { en: "$7,500", es: "$7,500" },
    time: { en: "12–18 business days", es: "12–18 días hábiles" },
    notFor: { en: "Bilingual, analytics add-ons not included", es: "Bilingüe, complementos de analítica no incluidos" },
  },
  {
    id: "bms-pos",
    name: { en: "POS System", es: "Sistema POS" },
    best: { en: "Retail, restaurants, service businesses needing a managed POS", es: "Comercio minorista, restaurantes, negocios de servicios" },
    price: { en: "Inquiry", es: "Consulta" },
    time: { en: "Custom", es: "Personalizado" },
    notFor: { en: "Businesses without a defined transaction workflow", es: "Negocios sin flujo de transacciones definido" },
  },
];
