import { NextResponse } from "next/server";

import { env } from "@/lib/env";
import { getUsdHnlRate } from "@/lib/exchange-rate";
import { formatMileagePair, formatPricePair } from "@/lib/format";
import { legacyImportStatusLabels } from "@/lib/inventory";
import {
  publicVehicleDetailQuery,
  type PublicVehicleDetail
} from "@/lib/queries";
import { getSanityClient, isSanityConfigured } from "@/lib/sanity/client";

export const revalidate = 3600;

type ReportRouteProps = {
  params: Promise<{
    slug: string;
  }>;
};

const sanityFetchOptions =
  process.env.NODE_ENV === "development"
    ? { cache: "no-store" as const }
    : { next: { revalidate } };

export async function GET(_request: Request, { params }: ReportRouteProps) {
  if (!isSanityConfigured) {
    return NextResponse.json(
      { error: "Sanity is not configured." },
      { status: 503 }
    );
  }

  const { slug } = await params;
  const vehicle = await getSanityClient().fetch<PublicVehicleDetail | null>(
    publicVehicleDetailQuery,
    { slug },
    sanityFetchOptions
  );

  if (!vehicle) {
    return NextResponse.json({ error: "Vehicle not found." }, { status: 404 });
  }

  const usdHnlRate = await getUsdHnlRate();
  const pdf = buildPublicReportPdf(vehicle, usdHnlRate.rate);
  const filename = `${vehicle.slug}-reporte-publico.pdf`;

  return new Response(pdf, {
    headers: {
      "Content-Disposition": `inline; filename="${filename}"`,
      "Content-Type": "application/pdf",
      "Cache-Control":
        process.env.NODE_ENV === "development"
          ? "no-store"
          : "public, s-maxage=3600, stale-while-revalidate=86400"
    }
  });
}

function buildPublicReportPdf(
  vehicle: PublicVehicleDetail,
  usdToHnlRate: number
): string {
  const price = formatPricePair(vehicle.priceUsd, usdToHnlRate);
  const mileage = formatMileagePair(vehicle.mileage);
  const lines = [
    `${env.businessName} - Reporte publico de vehiculo`,
    vehicle.title,
    "",
    `Precio publico: ${price.usd} / ${price.hnl} aprox.`,
    `Estado de importacion: ${legacyImportStatusLabels[vehicle.importStatus]}`,
    `VIN publico: ${vehicle.vin ?? "Disponible por consulta"}`,
    `Millaje: ${mileage.miles} / ${mileage.kilometers}`,
    `Transmision: ${vehicle.transmission ?? "Pendiente"}`,
    `Traccion: ${vehicle.drivetrain ?? "Pendiente"}`,
    `Combustible: ${vehicle.fuelType ?? "Pendiente"}`,
    `Titulo: ${vehicle.titleStatus ?? "Pendiente"}`,
    `Ubicacion: ${vehicle.location ?? env.businessLocation}`,
    "",
    "Condicion de subasta:",
    vehicle.auctionState?.conditionSummary ?? "Pendiente de publicar.",
    "",
    "Estado actual:",
    vehicle.currentState?.conditionSummary ?? "Pendiente de publicar.",
    "",
    "Inspeccion:",
    ...(vehicle.inspection?.length
      ? vehicle.inspection.map((item) => `- ${item.label}: ${item.status}`)
      : ["- Checklist pendiente de publicar."]),
    "",
    "Bitacora de reparacion:",
    ...(vehicle.currentState?.repairLogs?.length
      ? vehicle.currentState.repairLogs.map(
          (repairLog) =>
            `- ${repairLog.date ?? "Fecha pendiente"}: ${
              repairLog.summary ?? "Trabajo registrado"
            }`
        )
      : ["- Sin reparaciones publicadas."]),
    "",
    "Nota: este reporte contiene solo datos publicos para compradores. No incluye costos internos de adquisicion, subasta, importacion, reparacion ni margenes."
  ];

  const content = buildPdfTextContent(lines);
  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
    `<< /Length ${byteLength(content)} >>\nstream\n${content}\nendstream`
  ];
  const chunks = ["%PDF-1.4\n"];
  const offsets: number[] = [];

  objects.forEach((object, index) => {
    const objectNumber = index + 1;
    offsets.push(byteLength(chunks.join("")));
    chunks.push(`${objectNumber} 0 obj\n${object}\nendobj\n`);
  });

  const xrefOffset = byteLength(chunks.join(""));
  chunks.push(`xref\n0 ${objects.length + 1}\n`);
  chunks.push("0000000000 65535 f \n");
  offsets.forEach((offset) => {
    chunks.push(`${String(offset).padStart(10, "0")} 00000 n \n`);
  });
  chunks.push(
    `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`
  );

  return chunks.join("");
}

function buildPdfTextContent(lines: string[]): string {
  const visibleLines = lines.flatMap((line) => wrapLine(toPdfSafeText(line), 82));
  const textLines = visibleLines.slice(0, 44).map((line, index) => {
    const y = 748 - index * 15;
    const size = index === 0 ? 16 : index === 1 ? 14 : 10;

    return `BT /F1 ${size} Tf 54 ${y} Td (${escapePdfText(line)}) Tj ET`;
  });

  return textLines.join("\n");
}

function wrapLine(line: string, maxLength: number): string[] {
  if (!line) {
    return [""];
  }

  const words = line.split(/\s+/);
  const rows: string[] = [];
  let current = "";

  words.forEach((word) => {
    const next = current ? `${current} ${word}` : word;

    if (next.length > maxLength && current) {
      rows.push(current);
      current = word;
    } else {
      current = next;
    }
  });

  if (current) {
    rows.push(current);
  }

  return rows;
}

function toPdfSafeText(value: string): string {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function escapePdfText(value: string): string {
  return value.replace(/[()\\]/g, (match) => `\\${match}`);
}

function byteLength(value: string): number {
  return new TextEncoder().encode(value).length;
}
