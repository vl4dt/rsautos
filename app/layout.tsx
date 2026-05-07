import type { Metadata } from "next";

import { AnalyticsListener } from "@/components/analytics-listener";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { env } from "@/lib/env";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(env.siteUrl),
  title: {
    default: `${env.businessName} | Vehiculos importados transparentes`,
    template: `%s | ${env.businessName}`
  },
  description:
    "Plataforma de inventario para vehiculos importados a Honduras con transparencia total de condicion de subasta, reparacion e inspeccion.",
  openGraph: {
    title: env.businessName,
    description:
      "Vehiculos importados desde subastas de USA con informacion clara antes y despues de reparacion.",
    locale: "es_HN",
    siteName: env.businessName,
    type: "website"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "AutoDealer",
    address: {
      "@type": "PostalAddress",
      addressCountry: "HN",
      addressLocality: env.businessLocation
    },
    areaServed: env.primaryMarket,
    name: env.businessName,
    telephone: env.contactPhone || undefined,
    url: env.siteUrl
  };

  return (
    <html lang="es-HN">
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd).replace(/</g, "\\u003c")
          }}
          type="application/ld+json"
        />
        <AnalyticsListener />
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
