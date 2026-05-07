import { NextResponse } from "next/server";

import { estimateHondurasImportCost } from "@/lib/honduras-import-estimate";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const vehicleValueUsd = Number(url.searchParams.get("vehicleValueUsd"));

  if (!Number.isFinite(vehicleValueUsd) || vehicleValueUsd <= 0) {
    return NextResponse.json(
      { error: "vehicleValueUsd must be a positive number." },
      { status: 400 }
    );
  }

  return NextResponse.json(
    estimateHondurasImportCost({
      vehicleValueUsd,
      freightUsd: optionalNumber(url.searchParams.get("freightUsd")),
      insuranceUsd: optionalNumber(url.searchParams.get("insuranceUsd")),
      customsRate: optionalNumber(url.searchParams.get("customsRate")),
      salesTaxRate: optionalNumber(url.searchParams.get("salesTaxRate")),
      portAndHandlingUsd: optionalNumber(url.searchParams.get("portAndHandlingUsd"))
    })
  );
}

function optionalNumber(value: string | null): number | undefined {
  if (!value) {
    return undefined;
  }

  const parsed = Number(value);

  return Number.isFinite(parsed) ? parsed : undefined;
}
