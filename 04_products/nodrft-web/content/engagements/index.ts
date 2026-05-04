import type { BilingualText } from "@/content/types";

export type EngagementMetaItem = {
  key: BilingualText;
  value: BilingualText;
};

export type EngagementRecord = {
  id: string;
  label: BilingualText;
  summary: BilingualText;
  meta: EngagementMetaItem[];
};

export const engagements: EngagementRecord[] = [
  {
    id: "professional-services-authority",
    label: {
      en: "Professional Services — Authority Website",
      es: "Servicios Profesionales — Sitio de Autoridad",
    },
    summary: {
      en: "Repositioned a 30-person firm's digital presence from outdated brochure-ware to a structured authority site with clear service hierarchy, intake routing, and bilingual content parity.",
      es: "Reposicionamiento de presencia digital de una firma de 30 personas a sitio de autoridad con jerarquía de servicios, enrutamiento de intake y paridad bilingüe.",
    },
    meta: [
      {
        key: { en: "Business problem", es: "Problema de negocio" },
        value: {
          en: "Outdated digital presence misrepresenting the firm's actual capability and credibility",
          es: "Presencia digital desactualizada que tergiversaba la capacidad y credibilidad real de la empresa",
        },
      },
      {
        key: { en: "Scope class", es: "Clase de alcance" },
        value: { en: "Authority Website", es: "Sitio de Autoridad" },
      },
      {
        key: { en: "Constraints", es: "Restricciones" },
        value: {
          en: "Tight timeline, multiple stakeholders, legacy content migration required",
          es: "Cronograma ajustado, múltiples partes interesadas, migración de contenido legacy requerida",
        },
      },
      {
        key: { en: "Delivered", es: "Entregado" },
        value: {
          en: "Structured authority site with service hierarchy, qualified intake routing, and bilingual content parity",
          es: "Sitio de autoridad estructurado con jerarquía de servicios, enrutamiento de intake calificado y paridad bilingüe",
        },
      },
      {
        key: { en: "Outcome", es: "Resultado" },
        value: {
          en: "Qualified inbound requests routing automatically from day one — no manual triage, no missed inquiries",
          es: "Solicitudes entrantes calificadas enrutándose automáticamente desde el primer día — sin clasificación manual, sin consultas perdidas",
        },
      },
      {
        key: { en: "Enabled next", es: "Habilitó después" },
        value: {
          en: "Bilingual intake live for the first time — firm's Spanish-speaking client base could self-qualify without staff intervention",
          es: "Intake bilingüe activo por primera vez — la base de clientes hispanohablantes pudo auto-calificarse sin intervención del personal",
        },
      },
    ],
  },
  {
    id: "proptech-platform-starter",
    label: {
      en: "PropTech — Platform Starter",
      es: "PropTech — Plataforma Inicial",
    },
    summary: {
      en: "Built a gated application with user authentication, property data integration, and admin dashboard for a growing real estate technology company.",
      es: "Aplicación con autenticación, integración de datos inmobiliarios y panel admin para empresa de tecnología inmobiliaria.",
    },
    meta: [
      {
        key: { en: "Business problem", es: "Problema de negocio" },
        value: {
          en: "Operational workflow requiring gated application logic, user authentication, and third-party data access that a standard website couldn't support",
          es: "Flujo operativo que requería lógica de aplicación de acceso controlado, autenticación y acceso a datos de terceros que un sitio web estándar no podía soportar",
        },
      },
      {
        key: { en: "Scope class", es: "Clase de alcance" },
        value: { en: "Platform Starter", es: "Plataforma Inicial" },
      },
      {
        key: { en: "Constraints", es: "Restricciones" },
        value: {
          en: "Integration with third-party data providers, strict access controls, testing to production standard",
          es: "Integración con proveedores de datos externos, controles de acceso estrictos, pruebas a estándar de producción",
        },
      },
      {
        key: { en: "Delivered", es: "Entregado" },
        value: {
          en: "Gated application with user authentication, property data integration, and admin dashboard",
          es: "Aplicación de acceso controlado con autenticación, integración de datos inmobiliarios y panel de administración",
        },
      },
      {
        key: { en: "Outcome", es: "Resultado" },
        value: {
          en: "Platform live and accessible to users within 45 days — no manual handholding required from day one",
          es: "Plataforma activa y accesible para usuarios en 45 días — sin intervención manual requerida desde el primer día",
        },
      },
      {
        key: { en: "Enabled next", es: "Habilitó después" },
        value: {
          en: "Admin dashboard allowed the client to manage listings and user records independently — no developer access required for day-to-day operations",
          es: "El panel de administración permitió al cliente gestionar listados y registros de usuarios de forma independiente — sin acceso de desarrollador para operaciones diarias",
        },
      },
    ],
  },
  {
    id: "internal-casaclaro",
    label: {
      en: "Internal Product — CasaClaro",
      es: "Producto Interno — CasaClaro",
    },
    summary: {
      en: "A proprietary SaaS product built to manage real estate listings with structured data, access controls, and an editorial workflow. Designed and delivered under the same execution standard applied to all client engagements.",
      es: "Producto SaaS propio diseñado para la gestión de listados inmobiliarios con datos estructurados, controles de acceso y flujo editorial. Diseñado y entregado bajo el mismo estándar que se aplica a todos los compromisos con clientes.",
    },
    meta: [
      {
        key: { en: "Business problem", es: "Problema de negocio" },
        value: {
          en: "Internal listing management process requiring a structured tool with no viable off-the-shelf fit",
          es: "Proceso interno de gestión de listados que requería una herramienta estructurada sin alternativa adecuada disponible",
        },
      },
      {
        key: { en: "Scope class", es: "Clase de alcance" },
        value: {
          en: "Platform Starter (internal product)",
          es: "Plataforma Inicial (producto interno)",
        },
      },
      {
        key: { en: "Constraints", es: "Restricciones" },
        value: {
          en: "Built to the same delivery standard as client engagements; internal-only scope",
          es: "Construido con el mismo estándar de entrega que los compromisos con clientes; alcance solo interno",
        },
      },
      {
        key: { en: "Delivered", es: "Entregado" },
        value: {
          en: "Proprietary SaaS pilot for real estate listing management",
          es: "Piloto SaaS propietario para gestión de listados inmobiliarios",
        },
      },
      {
        key: { en: "Outcome", es: "Resultado" },
        value: {
          en: "Operational tool built to production standard in-house — the same delivery protocol applied to all client work",
          es: "Herramienta operativa construida al estándar de producción interno — el mismo protocolo de entrega aplicado a todos los clientes",
        },
      },
      {
        key: { en: "Enabled next", es: "Habilitó después" },
        value: {
          en: "Validated architecture for real estate platform builds — directly applicable to client engagements in the same vertical",
          es: "Arquitectura validada para proyectos de plataforma inmobiliaria — directamente aplicable a futuros compromisos con clientes en el mismo sector",
        },
      },
    ],
  },
];
