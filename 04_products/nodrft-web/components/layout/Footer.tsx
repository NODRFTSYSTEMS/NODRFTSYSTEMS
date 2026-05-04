import { getTranslations, getLocale } from "next-intl/server";
import Link from "next/link";

export async function Footer() {
  const t = await getTranslations("footer");
  const locale = await getLocale();

  function localHref(href: string) {
    return `/${locale}${href === "/" ? "" : href}`;
  }

  return (
    <footer className="nd-footer" role="contentinfo">
      <div className="nd-wrap-wide" style={{ padding: "0 var(--space-6)" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-8)",
          }}
        >
          {/* Wordmark row */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: "var(--space-8)",
              flexWrap: "wrap",
            }}
          >
            <div>
              <Link
                href={localHref("/")}
                aria-label="NoDrftSystems home"
                style={{
                  fontFamily: "var(--nd-font-mono, monospace)",
                  fontWeight: 500,
                  fontSize: "15px",
                  letterSpacing: "-0.02em",
                  color: "#EEECEA",
                  textDecoration: "none",
                  display: "block",
                  marginBottom: "var(--space-3)",
                }}
              >
                NoDrft<span style={{ color: "#3D9E96" }}>Systems</span>
              </Link>
              <p
                style={{
                  fontSize: "13px",
                  color: "#908E87",
                  maxWidth: "280px",
                  lineHeight: 1.6,
                }}
              >
                {t("tagline")}
              </p>
            </div>

            {/* Footer nav columns */}
            <div
              style={{
                display: "flex",
                gap: "var(--space-16)",
                flexWrap: "wrap",
              }}
            >
              <div>
                <p
                  style={{
                    fontFamily: "var(--nd-font-mono, monospace)",
                    fontSize: "11px",
                    fontWeight: 500,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "#48463F",
                    marginBottom: "var(--space-4)",
                  }}
                >
                  {t("workLabel")}
                </p>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
                  {[
                    { href: "/capabilities", key: "capabilities" as const },
                    { href: "/engagements", key: "engagements" as const },
                    { href: "/insights", key: "insights" as const },
                  ].map(({ href, key }) => (
                    <li key={href}>
                      <Link
                        href={localHref(href)}
                        style={{ fontSize: "14px", color: "#908E87", textDecoration: "none" }}
                      >
                        {t(key)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p
                  style={{
                    fontFamily: "var(--nd-font-mono, monospace)",
                    fontSize: "11px",
                    fontWeight: 500,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "#48463F",
                    marginBottom: "var(--space-4)",
                  }}
                >
                  {t("companyLabel")}
                </p>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
                  {[
                    { href: "/about", key: "about" as const },
                    { href: "/careers", key: "careers" as const },
                    { href: "/inquiries", key: "inquiries" as const },
                  ].map(({ href, key }) => (
                    <li key={href}>
                      <Link
                        href={localHref(href)}
                        style={{ fontSize: "14px", color: "#908E87", textDecoration: "none" }}
                      >
                        {t(key)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div
            style={{
              borderTop: "1px solid #272522",
              paddingTop: "var(--space-6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "var(--space-4)",
              flexWrap: "wrap",
            }}
          >
            <p style={{ fontSize: "12px", color: "#48463F" }}>
              {t("copyright", { year: new Date().getFullYear() })}
            </p>
            <div style={{ display: "flex", gap: "var(--space-6)" }}>
              <Link
                href={localHref("/privacy")}
                style={{ fontSize: "12px", color: "#48463F", textDecoration: "none" }}
              >
                {t("privacy")}
              </Link>
              <Link
                href={localHref("/terms")}
                style={{ fontSize: "12px", color: "#48463F", textDecoration: "none" }}
              >
                {t("terms")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
