export function formatUsd(value: number): string {
  return new Intl.NumberFormat("es-HN", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(value);
}

export function formatMileage(value: number): string {
  return new Intl.NumberFormat("es-HN").format(value);
}

export function formatDate(value: string | undefined): string {
  if (!value) {
    return "Fecha pendiente";
  }

  return new Intl.DateTimeFormat("es-HN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  }).format(new Date(value));
}
