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
