import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

import { env } from "@/lib/env";

const inventoryPaths = ["/", "/inventory"];

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

  if (documentType && documentType !== "carListing") {
    return NextResponse.json({
      revalidated: false,
      message: "No matching paths for document type."
    });
  }

  inventoryPaths.forEach((path) => revalidatePath(path));

  return NextResponse.json({
    revalidated: true,
    paths: inventoryPaths,
    now: new Date().toISOString()
  });
}
