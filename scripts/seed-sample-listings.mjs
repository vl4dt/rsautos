import { createReadStream, existsSync, readFileSync } from "node:fs";
import { basename, resolve } from "node:path";

import { createClient } from "@sanity/client";

for (const filename of [".env.production.local", ".env.local"]) {
  const envPath = resolve(process.cwd(), filename);

  if (!existsSync(envPath)) {
    continue;
  }

  for (const line of readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const trimmedLine = line.trim();

    if (
      !trimmedLine ||
      trimmedLine.startsWith("#") ||
      !trimmedLine.includes("=")
    ) {
      continue;
    }

    const separatorIndex = trimmedLine.indexOf("=");
    const name = trimmedLine.slice(0, separatorIndex).trim();
    const value = trimmedLine
      .slice(separatorIndex + 1)
      .trim()
      .replace(/^["']|["']$/g, "");

    process.env[name] ??= value;
  }
}

const dryRun = process.argv.includes("--dry-run");

function redactToken(text) {
  const token = process.env.SANITY_API_WRITE_TOKEN;

  return token ? text.replaceAll(token, "[redacted-token]") : text;
}

function logSeedError(error) {
  const message =
    error instanceof Error
      ? (error.stack ?? error.message)
      : JSON.stringify(error, null, 2);

  console.error(redactToken(message));
}

const requiredEnv = [
  "NEXT_PUBLIC_SANITY_PROJECT_ID",
  "NEXT_PUBLIC_SANITY_DATASET",
  "NEXT_PUBLIC_SANITY_API_VERSION"
];

if (!dryRun) {
  requiredEnv.push("SANITY_API_WRITE_TOKEN");
}

const missingEnv = requiredEnv.filter((name) => !process.env[name]?.trim());

if (missingEnv.length > 0) {
  console.error("Cannot seed sample listings. Missing environment values:");
  missingEnv.forEach((name) => console.error(`- ${name}`));
  process.exit(1);
}

const listings = [
  {
    _id: "sample-toyota-rav4-xle-2021",
    title: "Toyota RAV4 XLE 2021",
    slug: "toyota-rav4-xle-2021",
    make: "Toyota",
    model: "RAV4 XLE",
    year: 2021,
    vin: "2T3P1RFV8MW123456",
    priceUsd: 22900,
    mileage: 38200,
    importStatus: "readyForSale",
    transmission: "Automatica",
    drivetrain: "AWD",
    fuelType: "Gasolina",
    imagePath: "public/images/rs-autos/vehicle-rav4.png",
    imageAlt: "Toyota RAV4 XLE blanca en presentacion premium RS Autos",
    auctionSummary:
      "Unidad comprada con frente y laterales visibles, sin dano estructural reportado en la inspeccion inicial.",
    currentSummary:
      "Lista para venta, revision mecanica completada, limpieza profunda y documentacion ordenada para comprador.",
    repairLogs: [
      {
        date: "2026-04-08",
        summary: "Revision mecanica general",
        details: "Cambio de aceite, filtros y diagnostico electronico sin alertas activas."
      },
      {
        date: "2026-04-15",
        summary: "Detalle estetico",
        details: "Pulido exterior, limpieza interior y revision de luces."
      }
    ],
    inspection: [
      { label: "VIN verificado", status: "verified" },
      { label: "Motor y transmision", status: "verified" },
      { label: "Documentacion de importacion", status: "verified" }
    ]
  },
  {
    _id: "sample-honda-crv-exl-2020",
    title: "Honda CR-V EX-L 2020",
    slug: "honda-crv-exl-2020",
    make: "Honda",
    model: "CR-V EX-L",
    year: 2020,
    vin: "7FARW2H89LE123456",
    priceUsd: 24900,
    mileage: 42100,
    importStatus: "atWorkshop",
    transmission: "Automatica",
    drivetrain: "AWD",
    fuelType: "Gasolina",
    imagePath: "public/images/rs-autos/vehicle-crv.png",
    imageAlt: "Honda CR-V EX-L gris en vitrina oscura RS Autos",
    auctionSummary:
      "Seleccionada por kilometraje moderado, interior conservado y fotos de origen consistentes.",
    currentSummary:
      "En taller para inspeccion final, cambio preventivo de fluidos y preparacion antes de publicacion completa.",
    repairLogs: [
      {
        date: "2026-04-18",
        summary: "Inspeccion de suspension",
        details: "Revision de tren delantero y alineamiento programado."
      }
    ],
    inspection: [
      { label: "VIN verificado", status: "verified" },
      { label: "Frenos", status: "verified" },
      { label: "Alineamiento", status: "pending" }
    ]
  },
  {
    _id: "sample-bmw-x3-xdrive30i-2021",
    title: "BMW X3 xDrive30i 2021",
    slug: "bmw-x3-xdrive30i-2021",
    make: "BMW",
    model: "X3 xDrive30i",
    year: 2021,
    vin: "5UXTY5C08M9E12345",
    priceUsd: 35900,
    mileage: 31800,
    importStatus: "customsClearance",
    transmission: "Automatica",
    drivetrain: "AWD",
    fuelType: "Gasolina",
    imagePath: "public/images/rs-autos/vehicle-bmw.png",
    imageAlt: "BMW X3 xDrive30i negro con iluminacion premium RS Autos",
    auctionSummary:
      "SUV premium con historial visual claro, paquete de seguridad activo y fotos de origen completas.",
    currentSummary:
      "En proceso de liberacion aduanera, pendiente de inspeccion local final al llegar a sala.",
    repairLogs: [],
    inspection: [
      { label: "VIN verificado", status: "verified" },
      { label: "Documentos de importacion", status: "pending" },
      { label: "Inspeccion local", status: "pending" }
    ]
  },
  {
    _id: "sample-toyota-hilux-sr5-2020",
    title: "Toyota Hilux SR5 2020",
    slug: "toyota-hilux-sr5-2020",
    make: "Toyota",
    model: "Hilux SR5",
    year: 2020,
    vin: "MR0HA3CDX00012345",
    priceUsd: 30200,
    mileage: 49700,
    importStatus: "inTransit",
    transmission: "Automatica",
    drivetrain: "4x4",
    fuelType: "Diesel",
    imagePath: "public/images/rs-autos/vehicle-hilux.png",
    imageAlt: "Toyota Hilux SR5 blanca con presencia de pickup premium",
    auctionSummary:
      "Pickup seleccionada por configuracion 4x4, condicion exterior limpia y demanda alta para trabajo familiar.",
    currentSummary:
      "En transito hacia Honduras con documentacion de embarque revisada por RS Autos.",
    repairLogs: [],
    inspection: [
      { label: "VIN verificado", status: "verified" },
      { label: "Embarque", status: "verified" },
      { label: "Revision local", status: "pending" }
    ]
  }
];

function toSanityImage(asset, alt) {
  return {
    _type: "image",
    asset: {
      _type: "reference",
      _ref: asset._id
    },
    alt
  };
}

function toDocument(listing, image) {
  return {
    _id: listing._id,
    _type: "carListing",
    title: listing.title,
    slug: {
      _type: "slug",
      current: listing.slug
    },
    isPublic: true,
    publishedAt: "2026-05-02T12:00:00.000Z",
    make: listing.make,
    model: listing.model,
    year: listing.year,
    vin: listing.vin,
    priceUsd: listing.priceUsd,
    mileage: listing.mileage,
    importStatus: listing.importStatus,
    transmission: listing.transmission,
    drivetrain: listing.drivetrain,
    fuelType: listing.fuelType,
    auctionState: {
      conditionSummary: listing.auctionSummary,
      images: [image]
    },
    currentState: {
      conditionSummary: listing.currentSummary,
      images: [image],
      repairLogs: listing.repairLogs.map((repairLog) => ({
        _key: `${listing.slug}-${repairLog.date}`,
        _type: "object",
        ...repairLog
      }))
    },
    inspection: listing.inspection.map((item) => ({
      _key: `${listing.slug}-${item.label.toLowerCase().replaceAll(" ", "-")}`,
      _type: "object",
      ...item
    }))
  };
}

if (dryRun) {
  console.log("Sample Sanity listings dry run:");
  listings.forEach((listing) =>
    console.log(`- ${listing.title} (${listing.slug}) from ${listing.imagePath}`)
  );
  process.exit(0);
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false
});

try {
  for (const listing of listings) {
    const imagePath = resolve(process.cwd(), listing.imagePath);

    if (!existsSync(imagePath)) {
      throw new Error(`Missing seed image: ${listing.imagePath}`);
    }

    console.log(`Uploading image for ${listing.title}: ${basename(imagePath)}`);
    const asset = await client.assets.upload("image", createReadStream(imagePath), {
      filename: basename(imagePath),
      contentType: "image/png"
    });

    const document = toDocument(listing, toSanityImage(asset, listing.imageAlt));

    console.log(`Creating or replacing ${document._id}`);
    await client.createOrReplace(document);
  }

  console.log(`Seeded ${listings.length} public sample listings.`);
} catch (error) {
  logSeedError(error);
  process.exit(1);
}
