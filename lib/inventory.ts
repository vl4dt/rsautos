import {
  importStatusOptions,
  sortOptions,
  type ImportStatus,
  type InventorySearchParams,
  type InventorySort
} from "@/lib/queries";

type RawSearchParams = Record<string, string | string[] | undefined>;

export const importStatusLabels: Record<ImportStatus, string> = {
  auctionWon: "Subasta ganada",
  inTransit: "En transito",
  customsClearance: "En aduana",
  atWorkshop: "En taller",
  readyForSale: "Listo para venta"
};

export const sortLabels: Record<InventorySort, string> = {
  newest: "Mas recientes",
  priceAsc: "Precio: menor a mayor",
  priceDesc: "Precio: mayor a menor",
  mileageAsc: "Millaje: menor a mayor"
};

export function parseInventorySearchParams(
  searchParams: RawSearchParams
): InventorySearchParams {
  const status = firstValue(searchParams.status);
  const sort = firstValue(searchParams.sort);

  return {
    make: cleanText(firstValue(searchParams.make)),
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
