import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.onboarding" });
  return {
    title: t("title"),
    description: t("description"),
    // Onboarding is for active clients — discourage indexing
    robots: { index: false, follow: false },
  };
}

export default async function OnboardingPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "nav" });
  return (
    <section className="nd-section">
      <div className="nd-wrap-narrow">
        <span className="nd-label" style={{ display: "block", marginBottom: "var(--space-4)" }}>
          NoDrftSystems
        </span>
        <h1 className="nd-h1">{t("onboarding")}</h1>
      </div>
    </section>
  );
}
