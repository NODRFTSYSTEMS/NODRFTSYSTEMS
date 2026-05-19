"use client";

import { motion, useReducedMotion } from "framer-motion";

const BRAND_EASE = [0.16, 1, 0.3, 1] as const;

const containerVariant = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.04, delayChildren: 0.12 },
  },
};

const wordVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.28, ease: BRAND_EASE },
  },
};

const blockVariant = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: BRAND_EASE },
  },
};

function WordLine({ text, serif }: { text: string; serif?: boolean }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((word, i, arr) => (
        <motion.span
          key={i}
          variants={wordVariant}
          style={{
            display: "inline-block",
            marginRight: i < arr.length - 1 ? "0.3em" : 0,
            // Apply serif italic to last word of second line for design accent
            ...(serif && i === arr.length - 1
              ? {
                  fontFamily: "var(--nd-font-serif, 'Instrument Serif', Georgia, serif)",
                  fontStyle: "italic",
                  fontWeight: 400,
                  letterSpacing: "-0.02em",
                }
              : {}),
          }}
        >
          {word}
        </motion.span>
      ))}
    </>
  );
}

/**
 * SystemSchematic — 9-node pipeline SVG that represents the AI-integrated
 * delivery architecture. Decorative only — aria-hidden.
 */
function SystemSchematic() {
  // 9 nodes in 3 rows: [Intake, AI, Review] × [Brand, Web, Platform]
  const nodes = [
    { cx: 60,  cy: 60,  label: "Intake" },
    { cx: 210, cy: 60,  label: "AI" },
    { cx: 360, cy: 60,  label: "Review" },
    { cx: 60,  cy: 180, label: "Brand" },
    { cx: 210, cy: 180, label: "Build" },
    { cx: 360, cy: 180, label: "QA" },
    { cx: 60,  cy: 300, label: "OS" },
    { cx: 210, cy: 300, label: "Deploy" },
    { cx: 360, cy: 300, label: "Handoff" },
  ];

  const paths = [
    "M60 60 L210 60",  "M210 60 L360 60",
    "M60 180 L210 180","M210 180 L360 180",
    "M60 300 L210 300","M210 300 L360 300",
    "M60 60 L60 180",  "M210 60 L210 180","M360 60 L360 180",
    "M60 180 L60 300", "M210 180 L210 300","M360 180 L360 300",
    // Cross-links (dashed)
    "M60 60 L210 180", "M210 180 L360 60",
    "M60 180 L210 300","M210 60 L360 180",
  ];

  return (
    <svg
      className="nd-schematic"
      viewBox="0 0 420 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Base grid paths */}
      {paths.slice(0, 12).map((d, i) => (
        <path
          key={i}
          d={d}
          stroke="var(--accent)"
          strokeWidth="1"
          strokeDasharray="4 4"
          opacity="0.6"
          style={{
            strokeDashoffset: 0,
            animation: `nd-drift-line ${8 + i * 1.2}s linear infinite`,
          }}
        />
      ))}

      {/* Cross-links */}
      {paths.slice(12).map((d, i) => (
        <path
          key={`x${i}`}
          d={d}
          stroke="var(--accent)"
          strokeWidth="0.5"
          strokeDasharray="2 6"
          opacity="0.3"
        />
      ))}

      {/* Node pings */}
      {nodes.map((n, i) => (
        <g key={i}>
          {/* Ping ring */}
          <circle
            cx={n.cx}
            cy={n.cy}
            r="10"
            stroke="var(--accent)"
            strokeWidth="1"
            fill="none"
            opacity="0"
            style={{
              animation: `nd-ping-pulse 3s ease-out ${i * 0.35}s infinite`,
            }}
          />
          {/* Core dot */}
          <circle
            cx={n.cx}
            cy={n.cy}
            r="4"
            fill="var(--accent)"
            opacity="0.7"
            style={{
              animation: `nd-node-blink 4s ease-in-out ${i * 0.4}s infinite`,
            }}
          />
          {/* Label */}
          <text
            x={n.cx}
            y={n.cy + 18}
            textAnchor="middle"
            fontSize="9"
            fill="var(--muted, var(--text-md))"
            letterSpacing="0.08em"
            style={{ fontFamily: "var(--nd-font-mono, monospace)", textTransform: "uppercase" }}
          >
            {n.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

interface MetricsStripProps {
  locale: string;
}

const METRICS_EN = [
  { value: "14", label: "Systems Deployed" },
  { value: "06", label: "Industries Served" },
  { value: "04", label: "Review Gates" },
  { value: "100%", label: "Bilingual" },
  { value: "07", label: "QA Passes" },
];
const METRICS_ES = [
  { value: "14", label: "Sistemas Desplegados" },
  { value: "06", label: "Industrias Atendidas" },
  { value: "04", label: "Compuertas de Revisión" },
  { value: "100%", label: "Bilingüe" },
  { value: "07", label: "Compuertas QA" },
];

function MetricsStrip({ locale }: MetricsStripProps) {
  const metrics = locale === "es" ? METRICS_ES : METRICS_EN;
  return (
    <div className="nd-metrics-strip" aria-label={locale === "es" ? "Métricas clave" : "Key metrics"}>
      {metrics.map((m) => (
        <div key={m.label} className="nd-metric">
          <span className="nd-metric__value">{m.value}</span>
          <span className="nd-metric__label">{m.label}</span>
        </div>
      ))}
    </div>
  );
}

interface HeroAnimatedProps {
  label: string;
  headline1: string;
  headline2: string;
  lead: string;
  ctaButton: string;
  ctaSecondary: string;
  locale: string;
}

export function HeroAnimated({
  label,
  headline1,
  headline2,
  lead,
  ctaButton,
  ctaSecondary,
  locale,
}: HeroAnimatedProps) {
  const prefersReduced = useReducedMotion();

  function lineProps(delay: number, axis: "x" | "y") {
    if (prefersReduced) return {};
    return {
      initial: axis === "x" ? { scaleX: 0 } : { scaleY: 0 },
      animate: axis === "x" ? { scaleX: 1 } : { scaleY: 1 },
      transition: { duration: 0.4, ease: BRAND_EASE, delay },
    };
  }

  return (
    <>
      {/* Structural grid lines — decorative */}
      <div className="nd-hero__grid" aria-hidden="true">
        <motion.div
          className="nd-hero__grid-line nd-hero__grid-line--h"
          style={{ top: "30%", transformOrigin: "left center" }}
          {...lineProps(0.05, "x")}
        />
        <motion.div
          className="nd-hero__grid-line nd-hero__grid-line--h"
          style={{ top: "65%", transformOrigin: "left center" }}
          {...lineProps(0.2, "x")}
        />
        <motion.div
          className="nd-hero__grid-line nd-hero__grid-line--v"
          style={{ left: "33%", transformOrigin: "center top" }}
          {...lineProps(0.1, "y")}
        />
        <motion.div
          className="nd-hero__grid-line nd-hero__grid-line--v"
          style={{ left: "66%", transformOrigin: "center top" }}
          {...lineProps(0.25, "y")}
        />
      </div>

      {/* System schematic — right-side decorative SVG */}
      <SystemSchematic />

      {/* Hero copy */}
      <div className="nd-wrap">
        <motion.div
          initial={prefersReduced ? {} : "hidden"}
          animate={prefersReduced ? {} : "visible"}
          variants={containerVariant}
        >
          {/* Eyebrow / label */}
          <motion.div className="nd-hero-label-wrap" variants={blockVariant}>
            <motion.div
              className="nd-hero-copper-bar"
              initial={prefersReduced ? {} : { scaleX: 0 }}
              animate={prefersReduced ? {} : { scaleX: 1 }}
              transition={{ duration: 0.4, ease: BRAND_EASE, delay: 0.08 }}
            />
            <p className="nd-label">{label}</p>
          </motion.div>

          {/* Headline — second line gets serif italic last word */}
          <h1 id="hero-heading" className="nd-h1 nd-mb6">
            <span className="block">
              <WordLine text={headline1} />
            </span>
            <span className="block">
              <WordLine text={headline2} serif />
            </span>
          </h1>

          {/* Lead */}
          <motion.p
            className="nd-lead nd-mb8"
            style={{ maxWidth: "600px" }}
            variants={blockVariant}
          >
            {lead}
          </motion.p>

          {/* CTAs */}
          <motion.div className="nd-cta-row" variants={blockVariant}>
            <a href={`/${locale}/start`} className="btn">
              {ctaButton}
            </a>
            <a href={`/${locale}/capabilities`} className="btn--ghost">
              {ctaSecondary}
            </a>
          </motion.div>

          {/* Metrics strip */}
          <motion.div variants={blockVariant}>
            <MetricsStrip locale={locale} />
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}
