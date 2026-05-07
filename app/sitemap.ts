import type { MetadataRoute } from "next";

import { env } from "@/lib/env";
import { vehicleSlugsQuery } from "@/lib/queries";
import { getSanityClient, isSanityConfigured } from "@/lib/sanity/client";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    "",
    "/inventory",
    "/importamos-tu-auto",
    "/sobre-nosotros",
    "/contacto"
  ].map((path) => ({
    changeFrequency: "weekly" as const,
    lastModified: new Date(),
    priority: path === "" ? 1 : 0.8,
    url: `${env.siteUrl}${path}`
  }));
  const vehicleRoutes = isSanityConfigured
    ? (
        await getSanityClient().fetch<{ slug: string }[]>(vehicleSlugsQuery, {})
      ).map(({ slug }) => ({
        changeFrequency: "daily" as const,
        lastModified: new Date(),
        priority: 0.7,
        url: `${env.siteUrl}/inventory/${slug}`
      }))
    : [];

  return [...staticRoutes, ...vehicleRoutes];
}
