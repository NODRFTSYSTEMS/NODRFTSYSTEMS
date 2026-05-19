"use client";

interface TickerItem {
  text: string;
  accent?: boolean;
  live?: boolean;
}

const ITEMS_EN: TickerItem[] = [
  { text: "System: Production", live: true },
  { text: "AI-integrated build — human-governed release" },
  { text: "Bilingual delivery: EN · ES", accent: true },
  { text: "All builds QA-reviewed before delivery" },
  { text: "PharmacyOS v1 · Licensed deployment active", live: true },
  { text: "Zero scope drift — audit trail on every release" },
  { text: "Handoff structured so you own the result" },
  { text: "From $400 logo to full OS platform — one delivery standard" },
];

const ITEMS_ES: TickerItem[] = [
  { text: "Sistema: Producción", live: true },
  { text: "Producción integrada con IA — entrega gobernada por humanos" },
  { text: "Entrega bilingüe: EN · ES", accent: true },
  { text: "Todas las entregas revisadas antes de publicar" },
  { text: "PharmacyOS v1 · Despliegue licenciado activo", live: true },
  { text: "Cero desviación de alcance — trazabilidad en cada versión" },
  { text: "Traspaso estructurado para que usted sea propietario del resultado" },
  { text: "Desde logotipo a plataforma OS — un solo estándar de entrega" },
];

interface DispatchTickerProps {
  locale: string;
}

export function DispatchTicker({ locale }: DispatchTickerProps) {
  const items = locale === "es" ? ITEMS_ES : ITEMS_EN;
  // Duplicate for seamless infinite marquee
  const doubled = [...items, ...items];

  return (
    <div className="nd-ticker" aria-hidden="true" role="presentation">
      <div className="nd-ticker__track">
        {doubled.map((item, i) => (
          <span
            key={i}
            className={`nd-ticker__item${item.accent ? " nd-ticker__item--accent" : ""}`}
          >
            {item.live && <span className="nd-ticker__dot" />}
            {item.accent && <span className="nd-ticker__dot nd-ticker__dot--accent" />}
            {item.text}
          </span>
        ))}
      </div>
    </div>
  );
}
