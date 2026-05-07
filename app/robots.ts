import type { MetadataRoute } from "next";

import { env } from "@/lib/env";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      allow: "/",
      disallow: ["/studio"],
      userAgent: "*"
    },
    sitemap: `${env.siteUrl}/sitemap.xml`
  };
}
