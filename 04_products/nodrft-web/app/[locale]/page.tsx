import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Link from "next/link";
import type { Locale } from "@/content/types";
import { FadeUp } from "@/components/motion/FadeUp";
import { HeroAnimated } from "@/components/motion/HeroAnimated";
import { DispatchTicker } from "@/components/motion/DispatchTicker";

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

/* ── Static copy data ─────────────────────────────────────── */

const INDUSTRIES = {
  en: [
    { tag: "Pharmacy",             note: "Rx workflow · dispensing · DEA · HIPAA",    flagship: true  },
    { tag: "Healthcare",           note: "Clinical ops · intake · scheduling",          flagship: false },
    { tag: "Financial Services",   note: "Compliance · audit · client ops",             flagship: false },
    { tag: "Retail",               note: "POS · inventory · staff · timecards",         flagship: false },
    { tag: "Professional Services",note: "Authority sites · intake routing",            flagship: false },
  ],
  es: [
    { tag: "Farmacia",             note: "Flujo Rx · dispensación · DEA · HIPAA",      flagship: true  },
    { tag: "Salud",                note: "Operaciones clínicas · intake · citas",       flagship: false },
    { tag: "Servicios Financieros",note: "Cumplimiento · auditoría · ops de clientes", flagship: false },
    { tag: "Comercio Minorista",   note: "POS · inventario · personal · tarjetas",     flagship: false },
    { tag: "Servicios Profesionales",note: "Sitios de autoridad · enrutamiento de intake", flagship: false },
  ],
};

const FLAGSHIP_ATTRS = {
  en: [
    ["Deployable", "Weeks, not quarters. Prebuilt for your operating model."],
    ["Owned",      "You hold the code, the data, the documentation, and the keys."],
    ["Governed",   "AI accelerates production. Human authority signs every release."],
    ["Compliant",  "Audit trail, role separation, and review gates built in from day one."],
  ],
  es: [
    ["Desplegable","Semanas, no trimestres. Preconfigurado para su modelo operativo."],
    ["En su poder","Usted conserva el código, los datos, la documentación y las credenciales."],
    ["Gobernado",  "La IA acelera la producción. Una autoridad humana firma cada versión."],
    ["Cumplimiento","Trazabilidad, separación de roles y compuertas de revisión incorporadas desde el día uno."],
  ],
};

const VALUE_ROWS = {
  en: [
    ["Pricing model",     "Hourly or vague retainer",                "Fixed scope. Clear deliverables. Starting prices shown."],
    ["Scope control",     "Expands with every revision request",      "Scope defined before work begins. Changes are Change Orders."],
    ["Delivery",          "Timeline is an estimate",                  "Milestones are firm. Nothing ships without sign-off."],
    ["Bilingual",         "Translation as an afterthought add-on",    "EN · ES built into the production architecture as standard."],
    ["AI",                "Marketing claim. Execution is manual.",    "AI tools run inside a governed production system. Every output reviewed."],
    ["Operating systems", "Not available",                            "Prebuilt, deployable OS for regulated and complex industries."],
    ["Accountability",    "Account manager relays decisions",         "One principal. Named authority on every release."],
    ["Handoff",           "Dependency continues post-launch",         "You own the result. Build team can leave; system keeps running."],
  ],
  es: [
    ["Modelo de precio",    "Por hora o retainer vago",                    "Alcance fijo. Entregables claros. Precios desde mostrados."],
    ["Control de alcance",  "Se expande con cada solicitud de revisión",   "Alcance definido antes de empezar. Cambios = Órdenes de Cambio."],
    ["Entrega",             "El cronograma es una estimación",             "Los hitos son firmes. Nada se publica sin aprobación."],
    ["Bilingüe",            "Traducción como complemento tardío",          "EN · ES integrado en la arquitectura de producción."],
    ["IA",                  "Afirmación de marketing. Ejecución manual.",  "IA dentro de un sistema de producción gobernado. Todo revisado."],
    ["Sistemas operativos", "No disponible",                               "OS preconfigurado y desplegable para industrias reguladas."],
    ["Responsabilidad",     "El gerente de cuenta transmite decisiones",   "Un principal. Autoridad nombrada en cada versión."],
    ["Traspaso",            "La dependencia continúa después del lanzamiento","Usted es dueño del resultado. El equipo puede irse; el sistema sigue."],
  ],
};

const PIPELINE_STAGES = {
  en: [
    { k: "Intake",        sub: "Discovery brief",        ai: false, body: "Owner-direct intake. Fit is evaluated before any proposal is made." },
    { k: "AI Production", sub: "Research · draft · code", ai: true,  body: "AI agents accelerate research, drafting, scaffolding, and code generation under structured prompts." },
    { k: "Review Gate",   sub: "Principal sign-off",      ai: false, body: "Every output crosses a human authority. No release without a name attached." },
    { k: "AI Production", sub: "Build · QA · docs",       ai: true,  body: "AI executes the bounded build. Tests and documentation produced in lockstep with code." },
    { k: "Review Gate",   sub: "Bilingual parity",        ai: false, body: "EN · ES transcreation review is structural — not bolted on. Cultural accuracy validated." },
    { k: "Handoff",       sub: "You own the result",      ai: false, body: "Repository, docs, ownership, and next-step recommendation. System runs after the build team is gone." },
  ],
  es: [
    { k: "Intake",           sub: "Brief de descubrimiento",   ai: false, body: "Intake directo con el responsable. El ajuste se evalúa antes de hacer cualquier propuesta." },
    { k: "Producción IA",    sub: "Investigación · borrador",  ai: true,  body: "Agentes de IA aceleran investigación, redacción, scaffolding y generación de código bajo prompts estructurados." },
    { k: "Compuerta",        sub: "Aprobación del principal",  ai: false, body: "Cada entrega cruza una autoridad humana. Ninguna versión se publica sin un nombre asociado." },
    { k: "Producción IA",    sub: "Build · QA · docs",         ai: true,  body: "La IA ejecuta el build acotado. Pruebas y documentación producidas al ritmo del código." },
    { k: "Compuerta",        sub: "Paridad bilingüe",          ai: false, body: "Revisión de transcreación EN · ES estructural — no añadida. Precisión cultural validada." },
    { k: "Traspaso",         sub: "Usted es propietario",      ai: false, body: "Repositorio, docs, propiedad y recomendación. El sistema funciona después que el equipo se va." },
  ],
};

const ENTRY_PKGS = {
  en: [
    { name: "Logo & Brand Identity",      body: "Logo, color, typography, and brand standards — the foundation every site and platform is built on.", sub: "From a single logo to a full brand identity system.", timeline: "From $400" },
    { name: "Business Website",           body: "Single conversion page to full authority site — scoped before build begins.", sub: "From a landing page to a 15-page authority build. Scope drives price.", timeline: "From $750" },
    { name: "Content & Social",           body: "Blog, email, and social content produced under editorial review.", sub: "Monthly retainers. Volume and platform mix confirmed at onboarding.", timeline: "From $750/month" },
    { name: "Business Operating Systems", body: "POS, timecards, inventory, scheduling, and full OS platforms — built for how your business actually runs.", sub: "Deployable systems for regulated and operationally complex businesses. Scoped on inquiry.", timeline: "Inquiry" },
  ],
  es: [
    { name: "Logotipo e Identidad",        body: "Logotipo, color, tipografía y estándares de marca — la base de todo sitio y plataforma.", sub: "Desde un logotipo hasta un sistema de identidad completo.", timeline: "Desde $400" },
    { name: "Sitio Web Empresarial",       body: "Desde una página de conversión hasta un sitio de autoridad — definido antes de construir.", sub: "Desde una landing page hasta un sitio de 15 páginas. El alcance determina el precio.", timeline: "Desde $750" },
    { name: "Contenido y Redes Sociales",  body: "Blog, email y contenido para redes sociales bajo revisión editorial.", sub: "Retainers mensuales. Volumen y plataformas confirmados al inicio.", timeline: "Desde $750/mes" },
    { name: "Sistemas Operativos",         body: "POS, tarjetas de tiempo, inventario, citas y plataformas OS — construidos para como funciona su negocio.", sub: "Sistemas desplegables para negocios regulados. Precio por consulta.", timeline: "Consulta" },
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

const PRINCIPAL_NOTE = {
  en: {
    eyebrow: "From the desk of",
    quote: "Most studios optimize for billable hours. We optimize for what's still standing five years from now. That changes what we accept, what we charge, and how we sign our releases.",
    body1: "AI lets a small studio operate at the velocity of a large one. Discipline is what keeps it from running off the road. So we built a delivery model where every output crosses a human authority before it ships — and where the client owns the result, not us.",
    body2: "If you've been burned by an underscoped build, or you can feel your digital presence quietly working against you, we'd like to hear about it before we decide we can help.",
    sig: "— ND",
    byline: "Brooklyn · 2026",
    title: "Founder · NoDrftSystems",
  },
  es: {
    eyebrow: "De la mesa del",
    quote: "La mayoría de los estudios optimizan para horas facturables. Nosotros optimizamos para lo que seguirá en pie cinco años después. Eso cambia lo que aceptamos, lo que cobramos y cómo firmamos nuestras entregas.",
    body1: "La IA permite que un estudio pequeño opere a la velocidad de uno grande. La disciplina es lo que evita que se salga del camino. Por eso construimos un modelo de entrega donde cada resultado cruza una autoridad humana antes de publicarse — y donde el cliente es propietario del resultado, no nosotros.",
    body2: "Si ha sufrido las consecuencias de una construcción mal definida, o puede sentir que su presencia digital trabaja silenciosamente en su contra, nos gustaría escucharle antes de decidir si podemos ayudar.",
    sig: "— ND",
    byline: "Brooklyn · 2026",
    title: "Fundador · NoDrftSystems",
  },
};

const FIT = {
  en: {
    label: "Who we serve best",
    items: [
      "Organizations that lose business when their digital presence doesn't match their actual quality",
      "Teams with a clear owner — one person who can say yes, hold the scope, and move without a committee",
      "Founders and operators who have been burned by a previous build — and need a delivery model with real accountability, not a new round of promises",
      "Companies building platforms and tools that need to work five years from now, not just at launch",
      "Organizations in regulated industries — pharmacy, healthcare, financial services, and retail — that need a production-ready operating platform without building one from scratch",
    ],
    note: "Not every project is accepted. Fit matters to the quality of the outcome. We evaluate scope clarity, timeline, decision structure, and budget reality before proposing. When it's a strong fit, the engagement gets full commitment.",
  },
  es: {
    label: "A quiénes servimos mejor",
    items: [
      "Organizaciones que pierden negocios cuando su presencia digital no refleja su calidad real",
      "Equipos con un responsable claro — una persona que puede decir sí, mantener el alcance y avanzar sin comités",
      "Fundadores y operadores que han sufrido las consecuencias de una construcción anterior — y necesitan un modelo de entrega con responsabilidad real, no una nueva ronda de promesas",
      "Empresas que construyen plataformas y herramientas que necesitan funcionar en cinco años, no solo al lanzamiento",
      "Organizaciones en industrias reguladas — farmacia, salud, servicios financieros y comercio minorista — que necesitan una plataforma operativa lista para producción sin tener que construirla desde cero",
    ],
    note: "No todos los proyectos son aceptados. El ajuste importa para la calidad del resultado. Evaluamos la claridad del alcance, el cronograma, la estructura de decisiones y la realidad del presupuesto antes de proponer. Cuando es un ajuste sólido, el compromiso es total.",
  },
};

/* ── OS Mock UI ───────────────────────────────────────────── */
function PharmacyOSMock({ locale }: { locale: string }) {
  const isEs = locale === "es";
  const nav = [
    [isEs ? "Panel" : "Dashboard",             true ],
    [isEs ? "Prescripciones" : "Prescriptions", false],
    [isEs ? "Dispensación" : "Dispensing",      false],
    [isEs ? "Inventario" : "Inventory",         false],
    [isEs ? "Personal" : "Staff",               false],
    [isEs ? "Cumplimiento" : "Compliance",      false],
  ] as [string, boolean][];

  const rxItems = [
    { rx: "RX-08412", p: "Garcia, M.",  d: "Metformin 500mg · 30",  s: "ai-flagged", sNote: isEs ? "DDI · revisar" : "DDI · check" },
    { rx: "RX-08413", p: "Chen, L.",    d: "Lisinopril 10mg · 90",  s: "ready",      sNote: isEs ? "Firma farmacéutico" : "Pharmacist sign" },
    { rx: "RX-08414", p: "Okafor, A.", d: "Albuterol HFA · 1",      s: "dispensed",  sNote: "11:42a" },
    { rx: "RX-08415", p: "Smith, J.",  d: "Amoxicillin 500 · 21",   s: "ready",      sNote: isEs ? "Firma farmacéutico" : "Pharmacist sign" },
  ];

  return (
    <div className="nd-os-mock">
      {/* Window chrome */}
      <div className="nd-os-mock__chrome">
        <span className="nd-os-mock__dot" style={{ background: "color-mix(in oklab, var(--danger) 60%, transparent)" }} />
        <span className="nd-os-mock__dot" style={{ background: "color-mix(in oklab, var(--warn) 60%, transparent)" }} />
        <span className="nd-os-mock__dot" style={{ background: "color-mix(in oklab, var(--signal) 60%, transparent)" }} />
        <span className="nd-os-mock__title">
          os.client.nds — {isEs ? "Farmacia · Producción" : "Pharmacy · Production"}
        </span>
      </div>

      <div className="nd-os-mock__body">
        {/* Sidebar */}
        <aside className="nd-os-mock__sidebar">
          <div className="nd-os-mock__sidebar-label">
            {isEs ? "Área de trabajo" : "Workspace"}
          </div>
          {nav.map(([label, active]) => (
            <span
              key={label as string}
              className={`nd-os-mock__nav-item${active ? " nd-os-mock__nav-item--active" : ""}`}
            >
              {label as string}
            </span>
          ))}
          <div className="nd-os-mock__sidebar-label" style={{ marginTop: "12px" }}>
            {isEs ? "Sistema" : "System"}
          </div>
          <span className="nd-os-mock__nav-item">{isEs ? "Registro de auditoría" : "Audit log"}</span>
          <span className="nd-os-mock__nav-item">{isEs ? "Configuración" : "Settings"}</span>
        </aside>

        {/* Main content */}
        <main className="nd-os-mock__main">
          {/* Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <div className="nd-os-mock__metric-key">{isEs ? "Hoy" : "Today"}</div>
              <div style={{ fontSize: "16px", fontWeight: 500, letterSpacing: "-0.015em", color: "var(--ink)" }}>
                {isEs ? "Resumen de operaciones" : "Operations overview"}
              </div>
            </div>
            <span className="nd-tech-chip nd-tech-chip--accent">
              <span className="nd-tech-chip__dot" style={{ animation: "nd-blink 2s ease-in-out infinite" }} />
              Live
            </span>
          </div>

          {/* Metric tiles */}
          <div className="nd-os-mock__metrics">
            {[
              { k: isEs ? "Rx en cola" : "Rx queued",         v: "47",  d: isEs ? "+8 desde las 9am" : "+8 since 9am" },
              { k: isEs ? "Espera revisión" : "Awaiting check", v: "12", d: isEs ? "Revisión farmacéutico" : "Pharmacist review" },
              { k: isEs ? "Dispensados hoy" : "Dispensed today", v: "184", d: "−3% vs. avg" },
            ].map((m) => (
              <div key={m.k} className="nd-os-mock__metric">
                <div className="nd-os-mock__metric-key">{m.k}</div>
                <div className="nd-os-mock__metric-val">{m.v}</div>
                <div className="nd-os-mock__metric-sub">{m.d}</div>
              </div>
            ))}
          </div>

          {/* Prescription queue (abbreviated) */}
          <div style={{ border: "1px solid var(--rule)", borderRadius: "6px", overflow: "hidden" }}>
            <div style={{ padding: "8px 12px", borderBottom: "1px solid var(--rule)", background: "var(--bg-tint)", display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontSize: "12px", fontWeight: 500, color: "var(--ink)" }}>
                {isEs ? "Cola de prescripciones" : "Prescription queue"}
              </span>
              <span style={{ fontFamily: "var(--nd-font-mono, monospace)", fontSize: "10px", color: "var(--muted)" }}>
                47 {isEs ? "ítems" : "items"} · SLA
              </span>
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {rxItems.map((r) => (
                <li key={r.rx} style={{
                  padding: "8px 12px",
                  borderBottom: "1px solid var(--rule)",
                  display: "grid",
                  gridTemplateColumns: "auto 1fr 1fr auto",
                  gap: "8px",
                  alignItems: "center",
                  fontSize: "11px",
                }}>
                  <span style={{ fontFamily: "var(--nd-font-mono, monospace)", color: "var(--muted)" }}>{r.rx}</span>
                  <span style={{ color: "var(--ink)" }}>{r.p}</span>
                  <span style={{ color: "var(--ink-2)" }}>{r.d}</span>
                  <span style={{
                    fontFamily: "var(--nd-font-mono, monospace)",
                    fontSize: "9px",
                    padding: "2px 6px",
                    borderRadius: "999px",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    background: r.s === "ai-flagged"
                      ? "color-mix(in oklab, var(--warn) 14%, transparent)"
                      : r.s === "ready"
                      ? "color-mix(in oklab, var(--accent) 14%, transparent)"
                      : "color-mix(in oklab, var(--signal) 12%, transparent)",
                    color: r.s === "ai-flagged"
                      ? "var(--warn)"
                      : r.s === "ready"
                      ? "var(--accent-ink)"
                      : "var(--signal)",
                  }}>
                    {r.sNote}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </main>
      </div>
    </div>
  );
}

/* ── Page ─────────────────────────────────────────────────── */
export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });
  const loc = locale as Locale;

  const industries   = INDUSTRIES[loc];
  const flagshipAttrs = FLAGSHIP_ATTRS[loc];
  const valueRows    = VALUE_ROWS[loc];
  const pipelineStages = PIPELINE_STAGES[loc];
  const entryPkgs    = ENTRY_PKGS[loc];
  const workRecord   = WORK_ON_RECORD[loc];
  const principalNote = PRINCIPAL_NOTE[loc];
  const fit          = FIT[loc];

  const isEs = loc === "es";

  return (
    <>
      {/* ── Dispatch Ticker ───────────────────────────────────── */}
      <DispatchTicker locale={locale} />

      {/* ── Hero ──────────────────────────────────────────────── */}
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

      {/* ── Industries Served ─────────────────────────────────── */}
      <section className="nd-section nd-section--tight" aria-labelledby="industries-heading" style={{ borderTop: "1px solid var(--rule-strong)" }}>
        <div className="nd-wrap">
          <FadeUp>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: "8px" }}>
              <span className="nd-eyebrow" id="industries-heading">
                {isEs ? "Industrias atendidas" : "Industries served"}
              </span>
              <span style={{ fontFamily: "var(--nd-font-mono, monospace)", fontSize: "10px", letterSpacing: "0.12em", color: "var(--muted)", textTransform: "uppercase" }}>
                {isEs ? "REGULADAS · OPERACIONALMENTE COMPLEJAS" : "REGULATED · OPERATIONALLY COMPLEX"}
              </span>
            </div>
          </FadeUp>
          <div className="nd-industries-grid">
            {industries.map((ind, i) => (
              <FadeUp key={ind.tag} delay={i * 0.06}>
                <div className={`nd-industry-cell${ind.flagship ? " nd-industry-cell--flagship" : ""}`}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <span className="nd-industry-cell__num">{String(i + 1).padStart(2, "0")}</span>
                    {ind.flagship && (
                      <span className="nd-industry-cell__badge">
                        {isEs ? "Activo · OS desplegado" : "Live · OS deployed"}
                      </span>
                    )}
                  </div>
                  <div className="nd-industry-cell__name">{ind.tag}</div>
                  <div className="nd-industry-cell__note">{ind.note}</div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Flagship OS Product ───────────────────────────────── */}
      <section className="nd-section" aria-labelledby="flagship-heading" style={{ background: "var(--bg-tint)", borderTop: "1px solid var(--rule-strong)", borderBottom: "1px solid var(--rule-strong)" }}>
        <div className="nd-wrap">
          <div className="nd-flagship-grid">
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <FadeUp>
                <span className="nd-eyebrow" id="flagship-heading">
                  {isEs ? "El producto insignia" : "The flagship"}
                </span>
              </FadeUp>
              <FadeUp delay={0.06}>
                <h2 className="nd-h2" style={{ maxWidth: "18ch" }}>
                  {isEs
                    ? <>Un sistema operativo, <span className="nd-serif-italic" style={{ color: "var(--accent-ink)" }}>no solo</span> un sitio web.</>
                    : <>An operating system, <span className="nd-serif-italic" style={{ color: "var(--accent-ink)" }}>not just</span> a website.</>
                  }
                </h2>
              </FadeUp>
              <FadeUp delay={0.1}>
                <p className="nd-lead" style={{ maxWidth: "44ch" }}>
                  {isEs
                    ? "Nuestra plataforma OS propietaria es desplegable en semanas para PYMES reguladas — flujo Rx, dispensación, cumplimiento, citas e intake asistido por IA. Más rápido que un desarrollo a medida."
                    : "Our proprietary OS platform is deployable in weeks for regulated SMBs — Rx workflow, dispensing, compliance, scheduling, AI-assisted intake. Faster than custom. Built to run after the build team is gone."}
                </p>
              </FadeUp>
              <FadeUp delay={0.14}>
                <ul className="nd-flagship-attrs">
                  {flagshipAttrs.map(([key, val]) => (
                    <li key={key} className="nd-flagship-attr">
                      <span className="nd-flagship-attr__key">{key}</span>
                      <span className="nd-flagship-attr__val">{val}</span>
                    </li>
                  ))}
                </ul>
              </FadeUp>
              <FadeUp delay={0.18}>
                <div className="nd-cta-row" style={{ marginTop: "8px" }}>
                  <Link href={`/${locale}/start`} className="btn">
                    {isEs ? "Solicitar demostración" : "Request a walkthrough"}
                  </Link>
                  <Link href={`/${locale}/engagements`} className="btn--ghost">
                    {isEs ? "Ver caso de farmacia" : "Read the pharmacy case"}
                  </Link>
                </div>
              </FadeUp>
            </div>

            <FadeUp delay={0.1}>
              <PharmacyOSMock locale={locale} />
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── Entry Service Packages ────────────────────────────── */}
      <section className="nd-section nd-grid-bg" aria-labelledby="packages-heading">
        <div className="nd-wrap">
          <FadeUp>
            <span className="nd-eyebrow" style={{ marginBottom: "16px", display: "flex" }}>
              {isEs ? "Servicios" : "Services"}
            </span>
            <h2 id="packages-heading" className="nd-h2" style={{ marginBottom: "12px" }}>
              {isEs
                ? "Sistemas operativos. Sitios web. Marca. Contenido."
                : "Operating systems. Websites. Brand. Content."}
            </h2>
            <p className="nd-lead" style={{ maxWidth: "600px", marginBottom: "var(--space-10)" }}>
              {isEs
                ? "Cuatro áreas de servicio — todas bajo el mismo estándar de entrega. El alcance se define antes de comenzar."
                : "Four service areas — all produced under the same delivery standard. Scope is defined before work begins."}
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
                      {isEs ? "Consultar precio →" : "Get pricing →"}
                    </Link>
                    <p className="nd-p-sm nd-mb2">{pkg.body}</p>
                    <p className="nd-p-xs nd-pkg-subtext">{pkg.sub}</p>
                  </div>
                  <span className="nd-timeline">{pkg.timeline}</span>
                </div>
              </FadeUp>
            ))}
          </div>
          <FadeUp delay={0.2}>
            <div className="nd-fit-note" style={{ marginTop: "var(--space-8)" }}>
              <p className="nd-p-sm">
                {isEs
                  ? <>¿Necesidades complejas o alcance poco claro? Comience con un <Link href={`/${locale}/start`}>Discovery Sprint</Link> o visite la página de <Link href={`/${locale}/capabilities`}>Precios</Link> para el catálogo completo.</>
                  : <>Complex needs or unclear scope? Start with a <Link href={`/${locale}/start`}>Discovery Sprint</Link> or visit the <Link href={`/${locale}/capabilities`}>Pricing</Link> page for the full service catalog and starting prices.</>}
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── Value Comparison ──────────────────────────────────── */}
      <section className="nd-section alt" aria-labelledby="value-heading">
        <div className="nd-wrap">
          <FadeUp>
            <span className="nd-eyebrow" style={{ marginBottom: "16px", display: "flex" }}>
              {isEs ? "Por qué importa" : "Why this matters"}
            </span>
            <h2 id="value-heading" className="nd-h2" style={{ marginBottom: "var(--space-10)", maxWidth: "22ch" }}>
              {isEs
                ? <>Lo que la mayoría de estudios no pueden <span className="nd-serif-italic">garantizar.</span></>
                : <>What most studios can't <span className="nd-serif-italic">deliver.</span></>}
            </h2>
          </FadeUp>
          <FadeUp delay={0.06}>
            <div style={{ overflowX: "auto" }}>
              <table className="nd-value-table">
                <thead>
                  <tr>
                    <th>{isEs ? "Aspecto" : "Factor"}</th>
                    <th>{isEs ? "Estudio típico" : "Typical studio"}</th>
                    <th>NoDrftSystems</th>
                  </tr>
                </thead>
                <tbody>
                  {valueRows.map(([factor, them, us]) => (
                    <tr key={factor}>
                      <td>{factor}</td>
                      <td className="nd-value--them">{them}</td>
                      <td className="nd-value--us">{us}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── Production Pipeline ───────────────────────────────── */}
      <section className="nd-section nd-grid-bg" aria-labelledby="pipeline-heading">
        <div className="nd-wrap">
          <FadeUp>
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "24px", flexWrap: "wrap", marginBottom: "40px" }}>
              <div>
                <span className="nd-eyebrow" style={{ display: "flex", marginBottom: "14px" }}>
                  {isEs ? "Arquitectura de producción" : "Production architecture"}
                </span>
                <h2 id="pipeline-heading" className="nd-h2" style={{ maxWidth: "22ch" }}>
                  {isEs
                    ? <>La IA acelera el trabajo. Un humano <span className="nd-serif-italic">firma</span> la entrega.</>
                    : <>AI accelerates the work. A human <span className="nd-serif-italic">signs</span> the release.</>}
                </h2>
              </div>
              <p className="nd-p" style={{ maxWidth: "36ch", color: "var(--muted)" }}>
                {isEs
                  ? "No delegamos el juicio a un modelo. Cada etapa tiene un responsable nombrado. Cada entrega es gobernada."
                  : "We don't outsource judgement to a model. Every stage carries a named owner. Every release is governed."}
              </p>
            </div>
          </FadeUp>
          <FadeUp delay={0.08}>
            <div className="nd-pipeline-grid">
              {pipelineStages.map((s, i) => (
                <div
                  key={i}
                  className={`nd-pipeline-stage${s.ai ? " nd-pipeline-stage--ai" : ""}`}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <span className="nd-pipeline-stage__num">{String(i + 1).padStart(2, "0")}</span>
                    <span className={`nd-pipeline-stage__badge ${s.ai ? "nd-pipeline-stage__badge--ai" : "nd-pipeline-stage__badge--human"}`}>
                      {s.ai ? (isEs ? "IA · agente" : "AI · agent") : (isEs ? "Humano · compuerta" : "Human · gate")}
                    </span>
                  </div>
                  <div>
                    <div className="nd-pipeline-stage__key">{s.k}</div>
                    <div className="nd-pipeline-stage__sub">{s.sub}</div>
                  </div>
                  <p className="nd-pipeline-stage__body">{s.body}</p>
                  {i < pipelineStages.length - 1 && (
                    <svg
                      className="nd-pipeline-arrow"
                      width="12" height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path d="M2 6h8m-3-3 3 3-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── Work on Record ────────────────────────────────────── */}
      <section className="nd-section alt" aria-labelledby="work-record-heading">
        <div className="nd-wrap">
          <FadeUp>
            <span className="nd-eyebrow" style={{ display: "flex", marginBottom: "20px" }}>
              {workRecord.label}
            </span>
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
            <p className="nd-p-xs nd-p-italic" style={{ marginTop: "var(--space-4)", fontStyle: "italic" }}>
              {workRecord.disclaimer}
            </p>
            <p className="nd-p-xs" style={{ marginTop: "var(--space-3)" }}>
              <Link href={`/${locale}/engagements`}>{workRecord.link}</Link>
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── Principal's Note ──────────────────────────────────── */}
      <section className="nd-section" aria-labelledby="principal-heading" style={{ background: "var(--bg-tint)", borderTop: "1px solid var(--rule-strong)", borderBottom: "1px solid var(--rule-strong)" }}>
        <div className="nd-wrap">
          <div className="nd-principal-grid">
            <FadeUp>
              <div>
                <span className="nd-eyebrow" id="principal-heading" style={{ display: "flex" }}>
                  {principalNote.eyebrow}
                </span>
                <div style={{ marginTop: "24px", display: "flex", flexDirection: "column", gap: "14px" }}>
                  <div className="nd-principal-portrait" aria-hidden="true">
                    [ portrait ]
                  </div>
                  <div>
                    <div style={{ fontSize: "15px", color: "var(--ink)", fontWeight: 500, letterSpacing: "-0.01em" }}>
                      {isEs ? "El Principal" : "The Principal"}
                    </div>
                    <div style={{ fontFamily: "var(--nd-font-mono, monospace)", fontSize: "11px", color: "var(--muted)", letterSpacing: "0.04em" }}>
                      {principalNote.title}
                    </div>
                  </div>
                </div>
              </div>
            </FadeUp>

            <FadeUp delay={0.08}>
              <article style={{ display: "flex", flexDirection: "column", gap: "var(--space-5)" }}>
                <p className="nd-principal-quote">
                  <span className="nd-principal-quotemark" aria-hidden="true">"</span>
                  {principalNote.quote}
                </p>
                <p className="nd-p" style={{ maxWidth: "60ch", color: "var(--ink-2)" }}>
                  {principalNote.body1}
                </p>
                <p className="nd-p" style={{ maxWidth: "60ch", color: "var(--ink-2)" }}>
                  {principalNote.body2}
                </p>
                <div className="nd-principal-sig" aria-label="signature">
                  {principalNote.sig}
                </div>
                <div className="nd-principal-byline">{principalNote.byline}</div>
              </article>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── Who We Serve Best ─────────────────────────────────── */}
      <section className="nd-section alt" aria-labelledby="fit-heading">
        <div className="nd-wrap">
          <FadeUp>
            <span className="nd-eyebrow" id="fit-heading" style={{ display: "flex", marginBottom: "20px" }}>
              {fit.label}
            </span>
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

      {/* ── CTA ───────────────────────────────────────────────── */}
      <section className="nd-section" aria-labelledby="cta-heading" style={{ background: "var(--bg-elevated)", borderTop: "1px solid var(--rule-strong)" }}>
        <div className="nd-wrap">
          <FadeUp>
            <div className="nd-section-cta">
              <span className="nd-eyebrow" style={{ display: "flex", justifyContent: "center", marginBottom: "16px" }}>
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
