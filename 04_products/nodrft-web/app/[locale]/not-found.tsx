import Link from "next/link";
import { getLocale } from "next-intl/server";

const COPY = {
  en: {
    label: "404",
    heading: "Page not found.",
    body: "The page you are looking for does not exist or has been moved. Start from the homepage or begin an engagement.",
    home: "Back to Home",
    start: "Start an Engagement",
  },
  es: {
    label: "404",
    heading: "Página no encontrada.",
    body: "La página que busca no existe o ha sido movida. Comience desde la página de inicio o inicie un proyecto.",
    home: "Volver al inicio",
    start: "Iniciar un proyecto",
  },
};

export default async function LocaleNotFound() {
  const locale = await getLocale();
  const copy = COPY[locale as keyof typeof COPY] ?? COPY.en;

  return (
    <section
      className="nd-section nd-geo-bg"
      aria-labelledby="nf-heading"
      style={{ minHeight: "60vh", display: "flex", alignItems: "center" }}
    >
      <div className="nd-wrap" style={{ textAlign: "center" }}>
        <span
          className="nd-label"
          style={{
            display: "block",
            marginBottom: "var(--space-4)",
            fontFamily: "var(--font-mono)",
            fontSize: "40px",
            letterSpacing: "-1px",
            color: "var(--accent)",
          }}
        >
          {copy.label}
        </span>
        <h1
          id="nf-heading"
          className="nd-h1"
          style={{ marginBottom: "var(--space-6)" }}
        >
          {copy.heading}
        </h1>
        <p className="nd-lead" style={{ marginBottom: "var(--space-8)" }}>
          {copy.body}
        </p>
        <div className="nd-cta-row" style={{ justifyContent: "center" }}>
          <Link href={`/${locale}`} className="btn--ghost">
            {copy.home}
          </Link>
          <Link href={`/${locale}/start`} className="btn">
            {copy.start}
          </Link>
        </div>
      </div>
    </section>
  );
}
