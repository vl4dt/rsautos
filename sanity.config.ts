"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import type { StructureResolver } from "sanity/structure";
import { visionTool } from "@sanity/vision";

import { env } from "@/lib/env";
import { schemaTypes } from "@/sanity/schemaTypes";

const singletonStructure: StructureResolver = (S) =>
  S.list()
    .title("RS Autos HN")
    .items([
      S.listItem()
        .title("Site Settings")
        .id("siteSettings")
        .child(
          S.document()
            .schemaType("siteSettings")
            .documentId("siteSettings")
            .title("Site Settings")
        ),
      S.listItem()
        .title("Buyer Guide")
        .id("buyerGuideSettings")
        .child(
          S.document()
            .schemaType("buyerGuideSettings")
            .documentId("buyerGuideSettings")
            .title("Buyer Guide")
        ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) =>
          !["siteSettings", "buyerGuideSettings"].includes(item.getId() ?? "")
      )
    ]);

export default defineConfig({
  name: "rs-autos-hn",
  title: "RS Autos HN",
  projectId: env.sanityProjectId ?? "missing-project-id",
  dataset: env.sanityDataset,
  basePath: "/studio",
  plugins: [structureTool({ structure: singletonStructure }), visionTool()],
  schema: {
    types: schemaTypes
  }
});
