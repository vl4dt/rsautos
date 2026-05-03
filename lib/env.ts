export const env = {
  businessName: process.env.NEXT_PUBLIC_BUSINESS_NAME ?? "RS Autos HN",
  primaryMarket: process.env.NEXT_PUBLIC_PRIMARY_MARKET ?? "Honduras",
  businessLocation:
    process.env.NEXT_PUBLIC_BUSINESS_LOCATION ?? "Santa Rosa de Copan, Copan",
  contactPhone: process.env.NEXT_PUBLIC_CONTACT_PHONE ?? "",
  sanityProjectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  sanityDataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  sanityApiVersion:
    process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2026-05-01",
  sanityRevalidateSecret: process.env.SANITY_REVALIDATE_SECRET,
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
} as const;
