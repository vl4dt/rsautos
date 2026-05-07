import { env } from "@/lib/env";

type VehicleLeadInput = {
  title: string;
  vin?: string;
  slug: string;
  importStatusLabel: string;
  leadSource?: string;
};

type WhatsappInput =
  | VehicleLeadInput
  | {
      leadSource: string;
      message: string;
    };

export function buildWhatsappUrl(input?: WhatsappInput): string {
  const phone = env.contactPhone.replace(/\D/g, "");
  const base = phone ? `https://wa.me/${phone}` : "https://wa.me/";
  const message = input
    ? buildLeadMessage(input)
    : `[Fuente: general] Hola ${env.businessName}, quiero informacion sobre vehiculos importados disponibles en ${env.primaryMarket}.`;

  return `${base}?text=${encodeURIComponent(message)}`;
}

function buildLeadMessage(input: WhatsappInput): string {
  if ("message" in input) {
    return `[Fuente: ${input.leadSource}] ${input.message}`;
  }

  const source = input.leadSource ?? "inventory";

  return `[Fuente: ${source}] Hola ${env.businessName}, quiero mas informacion sobre ${input.title}${input.vin ? ` VIN ${input.vin}` : ""}. Estado actual: ${input.importStatusLabel}. Enlace: ${env.siteUrl}/inventory/${input.slug}`;
}
