import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SYNTHETIC_LISTINGS } from "@/data/listings.seed";
import { ListingDetail } from "@/components/listings/ListingDetail";
import { routing } from "@/i18n/navigation";

interface Props {
  params: Promise<{ slug: string; locale: string }>;
}

export function generateStaticParams() {
  const paths: { locale: string; slug: string }[] = [];
  for (const locale of routing.locales) {
    for (const listing of SYNTHETIC_LISTINGS) {
      paths.push({ locale, slug: listing.slug });
    }
  }
  return paths;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;
  const listing = SYNTHETIC_LISTINGS.find((l) => l.slug === slug);
  if (!listing) return {};

  const isEn = locale !== "es";
  const title = `${listing.neighborhood}, ${listing.city} — ${listing.property_type}`;
  const description = isEn ? listing.description_en : listing.description_es;
  const price = listing.listing_type === "sale"
    ? `$${listing.price_usd.toLocaleString()} USD`
    : `$${listing.price_usd.toLocaleString()} USD/mo`;

  return {
    title,
    description: `${price} · ${description.slice(0, 140)}`,
    robots: listing.is_synthetic
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      title: `${title} | CasaClaro`,
      description: `${price} · ${listing.bedrooms}BR ${listing.area_sqm}m² in ${listing.neighborhood}, ${listing.city}`,
      images: [
        {
          url: listing.images.find((i) => i.is_primary)?.url ?? listing.images[0].url,
          width: 900,
          height: 600,
          alt: `${listing.neighborhood}, ${listing.city}`,
        },
      ],
    },
  };
}

function buildJsonLd(listing: (typeof SYNTHETIC_LISTINGS)[number], locale: string) {
  const isEn = locale !== "es";
  const description = isEn ? listing.description_en : listing.description_es;
  const primaryImage = listing.images.find((i) => i.is_primary)?.url ?? listing.images[0].url;

  return {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: `${listing.neighborhood}, ${listing.city}`,
    description,
    image: primaryImage,
    url: `https://casaclaro.co/${locale}/listings/${listing.slug}`,
    datePosted: listing.listed_at,
    dateModified: listing.updated_at,
    offers: {
      "@type": "Offer",
      price: String(listing.price_usd),
      priceCurrency: "USD",
      availability: listing.listing_type === "sale"
        ? "https://schema.org/InStock"
        : "https://schema.org/LeaseOut",
      businessFunction: listing.listing_type === "sale"
        ? "http://purl.org/goodrelations/v1#Sell"
        : "http://purl.org/goodrelations/v1#LeaseOut",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: listing.city,
      addressRegion: listing.city,
      addressCountry: "CO",
    },
    numberOfRooms: listing.bedrooms || undefined,
    floorSize: {
      "@type": "QuantitativeValue",
      value: listing.area_sqm,
      unitCode: "MTQ",
    },
    propertyType: listing.property_type,
    furnished: listing.furnished,
    parkingSpaces: listing.parking_spots || undefined,
  };
}

export default async function ListingDetailPage({ params }: Props) {
  const { slug, locale } = await params;
  const listing = SYNTHETIC_LISTINGS.find((l) => l.slug === slug);
  if (!listing) notFound();

  const similarListings = SYNTHETIC_LISTINGS.filter(
    (l) => l.slug !== slug && l.city === listing.city
  ).slice(0, 3);

  const jsonLd = buildJsonLd(listing, locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ListingDetail listing={listing} similarListings={similarListings} />
    </>
  );
}
