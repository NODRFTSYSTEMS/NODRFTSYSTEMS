import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--bg)",
        padding: "48px 24px",
        textAlign: "center",
      }}
    >
      <img
        src="/icon.svg"
        alt="Peak Equity Optimizer"
        width={60}
        height={60}
        style={{ marginBottom: "28px" }}
      />

      <p
        style={{
          fontSize: "0.75rem",
          fontWeight: 600,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "var(--gold)",
          marginBottom: "12px",
        }}
      >
        404
      </p>

      <h1
        style={{
          fontFamily: "var(--display)",
          fontSize: "clamp(1.6rem, 4vw, 2.4rem)",
          fontWeight: 700,
          color: "var(--text)",
          lineHeight: 1.15,
          marginBottom: "14px",
        }}
      >
        That page does not exist.
      </h1>

      <p
        style={{
          fontSize: "1rem",
          color: "var(--text-muted)",
          maxWidth: "400px",
          lineHeight: 1.6,
          marginBottom: "36px",
        }}
      >
        The address may have changed or the page may have been removed.
        Return to the homepage to continue.
      </p>

      <Link
        href="/"
        className="button button-primary"
        style={{ padding: "12px 28px", fontSize: "0.9rem" }}
      >
        Back to Home
      </Link>
    </div>
  );
}
