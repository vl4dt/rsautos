import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";

import { env } from "@/lib/env";
import { schemaTypes } from "@/sanity/schemaTypes";

export default defineConfig({
  name: "rs-autos-hn",
  title: "RS Autos HN",
  projectId: env.sanityProjectId ?? "missing-project-id",
  dataset: env.sanityDataset,
  basePath: "/studio",
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes
  }
});
