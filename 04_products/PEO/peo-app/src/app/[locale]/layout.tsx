import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/navigation";
import { getMessages } from "next-intl/server";
import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "../globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PosthogProvider } from "@/components/PosthogProvider";
import { HtmlLang } from "@/components/HtmlLang";

const clerkKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ?? "";
const clerkConfigured =
  clerkKey.startsWith("pk_") && clerkKey !== "pk_test_replace_me" && clerkKey.length > 30;

export const metadata: Metadata = {
  metadataBase: new URL("https://peakequityoptimizer.com"),
  openGraph: {
    siteName: "Peak Equity Optimizer",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-default.png",
        width: 1024,
        height: 1024,
        alt: "Peak Equity Optimizer — Real Estate Deal Analysis & ARV Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@PeakEquityOpt",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Peak Equity Optimizer",
  url: "https://peakequityoptimizer.com",
  logo: "https://peakequityoptimizer.com/logo.png",
  description:
    "Real estate intelligence platform providing verified ARV, live comps, and strategy-specific deal analysis for sellers and investors.",
  sameAs: [
    "https://twitter.com/PeakEquityOpt",
    "https://www.linkedin.com/company/peak-equity-optimizer",
  ],
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Peak Equity Optimizer",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  url: "https://peakequityoptimizer.com",
  offers: [
    { "@type": "Offer", price: "0", priceCurrency: "USD", name: "Free Estimator" },
    { "@type": "Offer", price: "49", priceCurrency: "USD", name: "Seller Analysis", priceSpecification: { "@type": "UnitPriceSpecification", unitText: "property" } },
    { "@type": "Offer", price: "99", priceCurrency: "USD", name: "Investor Core", priceSpecification: { "@type": "UnitPriceSpecification", unitText: "month" } },
    { "@type": "Offer", price: "299", priceCurrency: "USD", name: "Investor Elite", priceSpecification: { "@type": "UnitPriceSpecification", unitText: "month" } },
  ],
  description:
    "Verify ARV, calculate MAO, and analyze flip, BRRRR, rental, and wholesale deals with live comps and verified data.",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a
        href="#main-content"
        className="skip-link"
        style={{
          position: "fixed",
          top: 0,
          left: "16px",
          transform: "translateY(-100%)",
          background: "var(--gold)",
          color: "#070a10",
          padding: "8px 20px",
          fontWeight: 700,
          fontSize: "0.875rem",
          borderRadius: "0 0 8px 8px",
          zIndex: 9999,
          textDecoration: "none",
          transition: "transform 0.15s ease",
        }}
      >
        Skip to main content
      </a>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main id="main-content" className="flex-1 relative z-10">
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();

  const content = (
    <PosthogProvider>
      <NextIntlClientProvider messages={messages}>
        <AppShell>{children}</AppShell>
      </NextIntlClientProvider>
    </PosthogProvider>
  );

  return (
    <>
      <HtmlLang locale={locale} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      {clerkConfigured ? <ClerkProvider>{content}</ClerkProvider> : content}
    </>
  );
}
