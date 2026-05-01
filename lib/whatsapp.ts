import { env } from "@/lib/env";

type VehicleLeadInput = {
  title: string;
  vin?: string;
  slug: string;
  importStatusLabel: string;
};

export function buildWhatsappUrl(vehicle?: VehicleLeadInput): string {
  const phone = env.contactPhone.replace(/\D/g, "");
  const base = phone ? `https://wa.me/${phone}` : "https://wa.me/";
  const message = vehicle
    ? `Hola ${env.businessName}, quiero mas informacion sobre ${vehicle.title}${vehicle.vin ? ` VIN ${vehicle.vin}` : ""}. Estado actual: ${vehicle.importStatusLabel}. Enlace: ${env.siteUrl}/inventory/${vehicle.slug}`
    : `Hola ${env.businessName}, quiero informacion sobre vehiculos importados disponibles en ${env.primaryMarket}.`;

  return `${base}?text=${encodeURIComponent(message)}`;
}
