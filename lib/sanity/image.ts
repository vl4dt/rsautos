import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

import { env } from "@/lib/env";

const builder = env.sanityProjectId
  ? imageUrlBuilder({
      projectId: env.sanityProjectId,
      dataset: env.sanityDataset
    })
  : null;

export function urlForImage(source: SanityImageSource): string {
  if (!builder) {
    return "";
  }

  return builder.image(source).auto("format").fit("max").url();
}
