import type { Metadata } from "next";

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
  return (
    <html lang="es-HN">
      <body>
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
