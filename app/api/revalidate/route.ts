import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

import { env } from "@/lib/env";

const basePaths = [
  "/",
  "/inventory",
  "/importamos-tu-auto",
  "/sobre-nosotros",
  "/contacto"
];

export async function POST(request: Request) {
  const secret =
    request.headers.get("x-revalidate-secret") ??
    new URL(request.url).searchParams.get("secret");

  if (!env.sanityRevalidateSecret || secret !== env.sanityRevalidateSecret) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const documentType =
    typeof body?._type === "string"
      ? body._type
      : typeof body?.type === "string"
        ? body.type
        : null;

  if (documentType && !["carListing", "siteSettings"].includes(documentType)) {
    return NextResponse.json({
      revalidated: false,
      message: "No matching paths for document type."
    });
  }

  const slug = resolveSlug(body);
  const paths = documentType === "siteSettings"
    ? ["/", "/sobre-nosotros"]
    : slug
    ? [...basePaths, `/inventory/${slug}`, `/inventory/${slug}/report`]
    : basePaths;

  paths.forEach((path) => revalidatePath(path));

  return NextResponse.json({
    revalidated: true,
    paths,
    now: new Date().toISOString()
  });
}

function resolveSlug(body: unknown): string | null {
  if (!body || typeof body !== "object") {
    return null;
  }

  const record = body as Record<string, unknown>;
  const slug = record.slug;

  if (typeof slug === "string") {
    return slug;
  }

  if (slug && typeof slug === "object") {
    const current = (slug as Record<string, unknown>).current;

    return typeof current === "string" ? current : null;
  }

  const current = record["slug.current"];

  return typeof current === "string" ? current : null;
}
