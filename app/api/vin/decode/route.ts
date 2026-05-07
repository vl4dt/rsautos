import { NextResponse } from "next/server";

import { decodeVinWithNhtsa } from "@/lib/vin-decoder";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const vin = url.searchParams.get("vin") ?? "";
  const modelYear = url.searchParams.get("modelYear") ?? undefined;
  const result = await decodeVinWithNhtsa({ modelYear, vin });

  return NextResponse.json(result, {
    status: result.status === "invalid" ? 400 : 200
  });
}
