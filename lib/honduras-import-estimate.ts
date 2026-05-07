export type HondurasImportEstimateInput = {
  vehicleValueUsd: number;
  freightUsd?: number;
  insuranceUsd?: number;
  customsRate?: number;
  salesTaxRate?: number;
  portAndHandlingUsd?: number;
};

export type HondurasImportEstimate = {
  vehicleValueUsd: number;
  freightUsd: number;
  insuranceUsd: number;
  cifUsd: number;
  customsDutyUsd: number;
  salesTaxUsd: number;
  portAndHandlingUsd: number;
  estimatedTotalUsd: number;
  assumptions: string[];
};

const defaults = {
  customsRate: 0.15,
  freightUsd: 1200,
  insuranceUsd: 250,
  portAndHandlingUsd: 650,
  salesTaxRate: 0.15
};

export function estimateHondurasImportCost(
  input: HondurasImportEstimateInput
): HondurasImportEstimate {
  const vehicleValueUsd = toPositiveNumber(input.vehicleValueUsd);
  const freightUsd = toPositiveNumber(input.freightUsd ?? defaults.freightUsd);
  const insuranceUsd = toPositiveNumber(input.insuranceUsd ?? defaults.insuranceUsd);
  const customsRate = toRate(input.customsRate ?? defaults.customsRate);
  const salesTaxRate = toRate(input.salesTaxRate ?? defaults.salesTaxRate);
  const portAndHandlingUsd = toPositiveNumber(
    input.portAndHandlingUsd ?? defaults.portAndHandlingUsd
  );
  const cifUsd = vehicleValueUsd + freightUsd + insuranceUsd;
  const customsDutyUsd = cifUsd * customsRate;
  const salesTaxUsd = (cifUsd + customsDutyUsd) * salesTaxRate;

  return {
    vehicleValueUsd,
    freightUsd,
    insuranceUsd,
    cifUsd: roundCurrency(cifUsd),
    customsDutyUsd: roundCurrency(customsDutyUsd),
    salesTaxUsd: roundCurrency(salesTaxUsd),
    portAndHandlingUsd,
    estimatedTotalUsd: roundCurrency(
      cifUsd + customsDutyUsd + salesTaxUsd + portAndHandlingUsd
    ),
    assumptions: [
      "Estimacion orientativa para conversacion comercial, no liquidacion oficial.",
      "Usa valor del vehiculo, flete, seguro, tasa aduanera, impuesto sobre venta y manejo.",
      "La liquidacion final depende de clasificacion, documentacion y autoridad aduanera."
    ]
  };
}

function toPositiveNumber(value: number): number {
  return Number.isFinite(value) && value > 0 ? roundCurrency(value) : 0;
}

function toRate(value: number): number {
  if (!Number.isFinite(value)) {
    return 0;
  }

  if (value > 1) {
    return Math.min(value / 100, 1);
  }

  return Math.max(value, 0);
}

function roundCurrency(value: number): number {
  return Math.round(value * 100) / 100;
}
