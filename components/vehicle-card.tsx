import { Gauge, MessageCircle, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { formatMileage, formatUsd } from "@/lib/format";
import { importStatusLabels } from "@/lib/inventory";
import type { PublicVehicleCard } from "@/lib/queries";
import { urlForImage } from "@/lib/sanity/image";
import { buildWhatsappUrl } from "@/lib/whatsapp";

type VehicleCardProps = {
  vehicle: PublicVehicleCard;
  compact?: boolean;
};

export function VehicleCard({ compact = false, vehicle }: VehicleCardProps) {
  const imageUrl = vehicle.heroImage ? urlForImage(vehicle.heroImage) : "";
  const leadVehicle = {
    title: vehicle.title,
    vin: vehicle.vin,
    slug: vehicle.slug,
    importStatusLabel: importStatusLabels[vehicle.importStatus]
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
          {importStatusLabels[vehicle.importStatus]}
        </div>
      </div>

      <div className={compact ? "p-4" : "p-5"}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-bold text-muted">
              {vehicle.year} {vehicle.make}
            </p>
            <h2 className={compact ? "mt-1 text-lg font-black text-white" : "mt-1 text-xl font-black text-white"}>
              {vehicle.model}
            </h2>
          </div>
          <p className={compact ? "text-right text-lg font-black text-brandRed" : "text-right text-xl font-black text-brandRed"}>
            {formatUsd(vehicle.priceUsd)}
          </p>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3 text-sm text-silver">
          <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] p-3">
            <Gauge aria-hidden className="text-brandBlue" size={18} />
            {formatMileage(vehicle.mileage)} mi
          </div>
          <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] p-3">
            <ShieldCheck aria-hidden className="text-brandRed" size={18} />
            {vehicle.transmission ?? "Inspeccion"}
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <Link className="btn-secondary px-4 text-sm" href={`/inventory/${vehicle.slug}`}>
            Ver detalles
          </Link>
          <a className="btn-primary px-4 text-sm" href={buildWhatsappUrl(leadVehicle)}>
            <MessageCircle aria-hidden size={18} />
            WhatsApp
          </a>
        </div>
      </div>
    </article>
  );
}
