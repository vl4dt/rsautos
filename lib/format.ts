export function formatUsd(value: number): string {
  return new Intl.NumberFormat("es-HN", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(value);
}

export function formatHnl(value: number): string {
  return `L ${new Intl.NumberFormat("es-HN", {
    maximumFractionDigits: 0
  }).format(value)}`;
}

export function formatMileage(value: number): string {
  return new Intl.NumberFormat("es-HN").format(value);
}

export function milesToKilometers(value: number): number {
  return Math.round(value * 1.609344);
}

export function formatMileagePair(miles: number): {
  kilometers: string;
  miles: string;
} {
  return {
    kilometers: `${formatMileage(milesToKilometers(miles))} km`,
    miles: `${formatMileage(miles)} mi`
  };
}

export function formatPricePair(
  usd: number,
  usdToHnlRate: number
): {
  hnl: string;
  usd: string;
} {
  return {
    hnl: formatHnl(usd * usdToHnlRate),
    usd: formatUsd(usd)
  };
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
