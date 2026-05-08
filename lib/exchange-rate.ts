import { env } from "@/lib/env";

type ExchangeRateResponse = {
  rates?: {
    HNL?: number;
  };
  result?: string;
};

export type UsdHnlRate = {
  rate: number;
  source: "daily" | "fallback";
};

export async function getUsdHnlRate(): Promise<UsdHnlRate> {
  try {
    const response = await fetch("https://open.er-api.com/v6/latest/USD", {
      next: { revalidate: 86400 }
    });

    if (!response.ok) {
      return fallbackRate();
    }

    const data = (await response.json()) as ExchangeRateResponse;
    const rate = data.rates?.HNL;

    if (data.result !== "success" || !rate || !Number.isFinite(rate)) {
      return fallbackRate();
    }

    return { rate, source: "daily" };
  } catch {
    return fallbackRate();
  }
}

function fallbackRate(): UsdHnlRate {
  return {
    rate: Number.isFinite(env.usdHnlFallbackRate)
      ? env.usdHnlFallbackRate
      : 26.25,
    source: "fallback"
  };
}
