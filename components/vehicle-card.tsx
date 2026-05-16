import { Camera, FileCheck2, Gauge, MessageCircle, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { formatMileagePair, formatPricePair } from "@/lib/format";
import { legacyImportStatusLabels } from "@/lib/inventory";
import type { PublicVehicleCard } from "@/lib/queries";
import { urlForImage } from "@/lib/sanity/image";
import {
  formatVehicleMake,
  formatVehicleModel
} from "@/lib/vehicle-normalization";
import { buildWhatsappUrl } from "@/lib/whatsapp";

type VehicleCardProps = {
  vehicle: PublicVehicleCard;
  compact?: boolean;
  usdToHnlRate: number;
};

export function VehicleCard({
  compact = false,
  usdToHnlRate,
  vehicle
}: VehicleCardProps) {
  const imageUrl = vehicle.heroImage ? urlForImage(vehicle.heroImage) : "";
  const make = formatVehicleMake(vehicle.make);
  const model = formatVehicleModel(vehicle.model);
  const mileage = formatMileagePair(vehicle.mileage);
  const price = formatPricePair(vehicle.priceUsd, usdToHnlRate);
  const leadVehicle = {
    title: vehicle.title,
    vin: vehicle.vin,
    slug: vehicle.slug,
    importStatusLabel: legacyImportStatusLabels[vehicle.importStatus],
    leadSource: "inventory"
  };

  return (
    <article className="glass-card vehicle-card-shell group overflow-hidden">
      <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-zinc-950 via-slate-900 to-black">
        {imageUrl ? (
          <Image
            alt={vehicle.heroImage?.alt || vehicle.title}
            className="object-cover transition duration-300 group-hover:scale-[1.03]"
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            src={imageUrl}
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <div className="h-20 w-48 rounded-full border border-white/15 bg-white/5 shadow-blueGlow" />
          </div>
        )}
        <div className="absolute left-4 top-4 rounded-full border border-brandBlue/45 bg-black/65 px-3 py-1 text-xs font-black text-silver shadow-blueGlow">
          {legacyImportStatusLabels[vehicle.importStatus]}
        </div>
      </div>

      <div className={compact ? "p-4" : "p-5"}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-bold text-muted">
              {vehicle.year} {make}
            </p>
            <h2 className={compact ? "mt-1 text-lg font-black text-white" : "mt-1 text-xl font-black text-white"}>
              {model}
            </h2>
          </div>
          <div className="text-right">
            <p className={compact ? "text-lg font-black text-brandRed" : "text-xl font-black text-brandRed"}>
              {price.usd}
            </p>
            <p className="mt-1 text-xs font-bold text-muted">{price.hnl}</p>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3 text-sm text-silver">
          <div className="flex min-h-16 items-center gap-2 rounded-[var(--radius)] border border-white/10 bg-white/[0.03] p-3">
            <Gauge aria-hidden className="text-brandBlue" size={18} />
            <span className="grid leading-tight">
              <span>{mileage.miles}</span>
              <span className="text-xs text-muted">{mileage.kilometers}</span>
            </span>
          </div>
          <div className="flex min-h-16 items-center gap-2 rounded-[var(--radius)] border border-white/10 bg-white/[0.03] p-3">
            <ShieldCheck aria-hidden className="text-brandRed" size={18} />
            {vehicle.transmission ?? "Inspeccion"}
          </div>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2 text-xs font-black uppercase tracking-[0.08em] text-muted">
          <span className="inline-flex min-h-9 items-center gap-2 rounded-[var(--radius)] border border-white/10 bg-black/35 px-3">
            <FileCheck2 aria-hidden className="text-brandRed" size={15} />
            VIN / ficha
          </span>
          <span className="inline-flex min-h-9 items-center gap-2 rounded-[var(--radius)] border border-white/10 bg-black/35 px-3">
            <Camera aria-hidden className="text-brandBlue" size={15} />
            Fotos reales
          </span>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <Link className="btn-secondary px-4 text-sm" href={`/inventory/${vehicle.slug}`}>
            Ver detalles
          </Link>
          <a
            className="btn-primary px-4 text-sm"
            data-analytics-event="whatsapp_click"
            data-lead-source="inventory"
            href={buildWhatsappUrl(leadVehicle)}
          >
            <MessageCircle aria-hidden size={18} />
            WhatsApp
          </a>
        </div>
      </div>
    </article>
  );
}
