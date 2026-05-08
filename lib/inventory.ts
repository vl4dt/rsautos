import {
  importStatusOptions,
  type InspectionStatus,
  sortOptions,
  type ImportStatus,
  type InventorySearchParams,
  type InventorySort,
  type LegacyImportStatus
} from "@/lib/queries";

type RawSearchParams = Record<string, string | string[] | undefined>;

export const importStatusLabels: Record<ImportStatus, string> = {
  inTransit: "En tránsito",
  readyForSale: "Listo para venta"
};

export const legacyImportStatusLabels: Record<LegacyImportStatus, string> = {
  auctionWon: "En tránsito",
  atWorkshop: "En tránsito",
  customsClearance: "En tránsito",
  inTransit: "En tránsito",
  readyForSale: "Listo para venta"
};

export function publicImportStatus(status: LegacyImportStatus): ImportStatus {
  return status === "readyForSale" ? "readyForSale" : "inTransit";
}

export const sortLabels: Record<InventorySort, string> = {
  newest: "Mas recientes",
  priceAsc: "Precio: menor a mayor",
  priceDesc: "Precio: mayor a menor",
  mileageAsc: "Millaje: menor a mayor"
};

export const inspectionStatusLabels: Record<InspectionStatus, string> = {
  verified: "Verificado",
  needsService: "Requiere servicio",
  pending: "Pendiente"
};

export function parseInventorySearchParams(
  searchParams: RawSearchParams
): InventorySearchParams {
  const status = firstValue(searchParams.status);
  const sort = firstValue(searchParams.sort);
  const make = cleanText(firstValue(searchParams.make));
  const model = cleanText(firstValue(searchParams.model));

  return {
    make,
    makeSearch: toSearchToken(make),
    model,
    modelSearch: toSearchToken(model),
    minYear: toNumber(firstValue(searchParams.minYear)),
    maxYear: toNumber(firstValue(searchParams.maxYear)),
    minPrice: toNumber(firstValue(searchParams.minPrice)),
    maxPrice: toNumber(firstValue(searchParams.maxPrice)),
    status: isImportStatus(status) ? status : undefined,
    sort: isSort(sort) ? sort : "newest"
  };
}

function firstValue(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

function cleanText(value: string | undefined): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

function toSearchToken(value: string | undefined): string | undefined {
  const normalized = value
    ?.normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");

  return normalized ? `${normalized}*` : undefined;
}

function toNumber(value: string | undefined): number | undefined {
  if (!value) {
    return undefined;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

function isImportStatus(value: string | undefined): value is ImportStatus {
  return importStatusOptions.some((option) => option === value);
}

function isSort(value: string | undefined): value is InventorySort {
  return sortOptions.some((option) => option === value);
}
