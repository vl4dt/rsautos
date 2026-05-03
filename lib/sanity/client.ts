import { createClient } from "next-sanity";

import { env } from "@/lib/env";

export const isSanityConfigured = Boolean(env.sanityProjectId);

export function getSanityClient() {
  if (!env.sanityProjectId) {
    throw new Error("NEXT_PUBLIC_SANITY_PROJECT_ID is required.");
  }

  return createClient({
    projectId: env.sanityProjectId,
    dataset: env.sanityDataset,
    apiVersion: env.sanityApiVersion,
    useCdn: false,
    perspective: "published",
    stega: false
  });
}
