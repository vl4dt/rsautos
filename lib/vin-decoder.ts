export type VinDecodeStatus = "decoded" | "invalid" | "notFound" | "error";

export type VinDecodeResult = {
  status: VinDecodeStatus;
  vin: string;
  modelYear?: string;
  make?: string;
  model?: string;
  trim?: string;
  bodyClass?: string;
  vehicleType?: string;
  engineCylinders?: string;
  fuelTypePrimary?: string;
  driveType?: string;
  transmissionStyle?: string;
  plantCountry?: string;
  manufacturer?: string;
  errorText?: string;
  source: "NHTSA vPIC";
};

type NhtsaVinResponse = {
  Results?: Array<Record<string, string>>;
};

const vinPattern = /^[A-HJ-NPR-Z0-9*]{11,17}$/i;

export function normalizeVin(value: string): string {
  return value.trim().toUpperCase().replace(/\s+/g, "");
}

export function isVinLike(value: string): boolean {
  return vinPattern.test(normalizeVin(value));
}

export async function decodeVinWithNhtsa({
  modelYear,
  vin
}: {
  modelYear?: string;
  vin: string;
}): Promise<VinDecodeResult> {
  const normalizedVin = normalizeVin(vin);

  if (!isVinLike(normalizedVin)) {
    return {
      status: "invalid",
      vin: normalizedVin,
      errorText: "VIN invalido. Usa 11 a 17 caracteres validos.",
      source: "NHTSA vPIC"
    };
  }

  const url = new URL(
    `https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinValues/${encodeURIComponent(
      normalizedVin
    )}`
  );
  url.searchParams.set("format", "json");

  if (modelYear) {
    url.searchParams.set("modelyear", modelYear);
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    const response = await fetch(url, {
      headers: {
        Accept: "application/json",
        "User-Agent": "RSAutosHN/1.0"
      },
      next: { revalidate: 60 * 60 * 24 },
      signal: controller.signal
    });

    if (!response.ok) {
      return {
        status: "error",
        vin: normalizedVin,
        modelYear,
        errorText: "NHTSA no respondio correctamente.",
        source: "NHTSA vPIC"
      };
    }

    const data = (await response.json()) as NhtsaVinResponse;
    const result = data.Results?.[0];

    if (!result) {
      return {
        status: "notFound",
        vin: normalizedVin,
        modelYear,
        errorText: "No se encontraron datos para este VIN.",
        source: "NHTSA vPIC"
      };
    }

    const errorText = clean(result.ErrorText);
    const hasUsefulData = Boolean(clean(result.Make) || clean(result.Model));

    return {
      status: hasUsefulData ? "decoded" : "notFound",
      vin: normalizedVin,
      modelYear: clean(result.ModelYear) ?? modelYear,
      make: clean(result.Make),
      model: clean(result.Model),
      trim: clean(result.Trim),
      bodyClass: clean(result.BodyClass),
      vehicleType: clean(result.VehicleType),
      engineCylinders: clean(result.EngineCylinders),
      fuelTypePrimary: clean(result.FuelTypePrimary),
      driveType: clean(result.DriveType),
      transmissionStyle: clean(result.TransmissionStyle),
      plantCountry: clean(result.PlantCountry),
      manufacturer: clean(result.Manufacturer),
      errorText,
      source: "NHTSA vPIC"
    };
  } catch (error) {
    return {
      status: "error",
      vin: normalizedVin,
      modelYear,
      errorText:
        error instanceof Error && error.name === "AbortError"
          ? "La consulta a NHTSA tardo demasiado."
          : "No fue posible consultar NHTSA en este momento.",
      source: "NHTSA vPIC"
    };
  } finally {
    clearTimeout(timeout);
  }
}

function clean(value: string | undefined): string | undefined {
  const trimmed = value?.trim();

  if (!trimmed || trimmed.toLowerCase() === "not applicable") {
    return undefined;
  }

  return trimmed;
}
