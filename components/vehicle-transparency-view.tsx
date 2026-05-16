"use client";

import {
  Camera,
  CheckCircle2,
  FileText,
  Image as ImageIcon,
  MessageCircle,
  Video
} from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";

import { legacyImportStatusLabels } from "@/lib/inventory";
import type { PublicVehicleDetail, VehicleImage } from "@/lib/queries";
import { urlForImage } from "@/lib/sanity/image";
import { buildWhatsappUrl } from "@/lib/whatsapp";

type TransparencyMode = "auction" | "current";

type VehicleTransparencyViewProps = {
  vehicle: PublicVehicleDetail;
};

const modeLabels: Record<TransparencyMode, string> = {
  auction: "Estado de subasta",
  current: "Estado actual"
};

export function VehicleTransparencyView({
  vehicle
}: VehicleTransparencyViewProps) {
  const [mode, setMode] = useState<TransparencyMode>("current");
  const activeState =
    mode === "auction" ? vehicle.auctionState : vehicle.currentState;
  const fallbackImages =
    mode === "auction" ? vehicle.currentState?.images : vehicle.auctionState?.images;
  const images = activeState?.images?.length
    ? activeState.images
    : fallbackImages ?? [];
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectedImage = images[Math.min(selectedIndex, Math.max(images.length - 1, 0))];
  const selectedImageUrl = selectedImage ? urlForImage(selectedImage) : "";
  const summary = activeState?.conditionSummary ?? "Resumen pendiente de publicar.";
  const imageAlt = selectedImage?.alt || `${vehicle.title} - ${modeLabels[mode]}`;
  const selectedLabel = selectedImage
    ? imageCategory(selectedImage, selectedIndex, mode)
    : "Galeria";
  const evidenceItems = buildEvidenceItems(vehicle);
  const whatsappBase = {
    importStatusLabel: legacyImportStatusLabels[vehicle.importStatus],
    slug: vehicle.slug,
    title: vehicle.title,
    vin: vehicle.vin
  };

  const beforeAfter = useMemo(
    () => ({
      auction: vehicle.auctionState?.images?.[0],
      current: vehicle.currentState?.images?.[0]
    }),
    [vehicle.auctionState?.images, vehicle.currentState?.images]
  );

  function selectMode(nextMode: TransparencyMode) {
    setMode(nextMode);
    setSelectedIndex(0);
  }

  return (
    <section className="grid gap-5 lg:grid-cols-[1.35fr_0.65fr]">
      <div className="glass-card overflow-hidden">
        <div className="flex flex-col gap-3 border-b border-white/10 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-brandRed">
              Comparacion transparente
            </p>
            <h2 className="mt-1 text-xl font-black text-white">
              {modeLabels[mode]}
            </h2>
          </div>
          <div className="grid grid-cols-2 rounded-[var(--radius)] border border-white/12 bg-black/50 p-1">
            {(["auction", "current"] as const).map((option) => (
              <button
                aria-pressed={mode === option}
                className={`rounded-lg px-3 py-2 text-sm font-black transition ${
                  mode === option
                    ? "rounded-[6px] bg-brandRed text-white shadow-redGlow"
                    : "text-muted hover:bg-white/[0.06] hover:text-white"
                }`}
                key={option}
                onClick={() => selectMode(option)}
                type="button"
              >
                {option === "auction" ? "Subasta" : "Actual"}
              </button>
            ))}
          </div>
        </div>

        <div className="relative aspect-[16/10] bg-black">
          {selectedImageUrl ? (
            <Image
              alt={imageAlt}
              className="object-cover"
              fill
              priority
              sizes="(min-width: 1024px) 58vw, 100vw"
              src={selectedImageUrl}
            />
          ) : (
            <div className="grid h-full place-items-center text-muted">
              <ImageIcon aria-hidden size={42} />
            </div>
          )}
          <div className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/75 px-3 py-2 text-xs font-black uppercase tracking-[0.12em] text-silver backdrop-blur">
            {selectedLabel}
          </div>
        </div>

        <div className="space-y-4 p-4">
          <p className="leading-7 text-silver">{summary}</p>
          {images.length > 1 ? (
            <div className="flex gap-2 overflow-x-auto pb-1 sm:grid sm:grid-cols-6 sm:overflow-visible sm:pb-0">
              {images.map((image, index) => (
                <ImageThumb
                  image={image}
                  isSelected={index === selectedIndex}
                  key={image._key ?? `${mode}-${index}`}
                  label={imageCategory(image, index, mode)}
                  onClick={() => setSelectedIndex(index)}
                  title={`${modeLabels[mode]} ${index + 1}`}
                />
              ))}
            </div>
          ) : null}

          <div className="grid gap-3 border-t border-white/10 pt-4 md:grid-cols-3">
            <a
              className="btn-secondary px-4 text-sm"
              data-analytics-event="whatsapp_click"
              data-lead-source="gallery_extra_photos"
              href={buildWhatsappUrl({
                ...whatsappBase,
                leadSource: "gallery_extra_photos"
              })}
            >
              <Camera aria-hidden size={17} />
              Solicitar fotos
            </a>
            <a
              className="btn-secondary px-4 text-sm"
              data-analytics-event="whatsapp_click"
              data-lead-source="gallery_engine_video"
              href={buildWhatsappUrl({
                ...whatsappBase,
                leadSource: "gallery_engine_video"
              })}
            >
              <Video aria-hidden size={17} />
              Pedir video
            </a>
            <a
              className="btn-primary px-4 text-sm"
              data-analytics-event="whatsapp_click"
              data-lead-source="gallery_documents"
              href={buildWhatsappUrl({
                ...whatsappBase,
                leadSource: "gallery_documents"
              })}
            >
              <MessageCircle aria-hidden size={17} />
              Ver documentos
            </a>
          </div>
        </div>
      </div>

      <aside className="glass-card p-5">
        <div className="flex items-center gap-3">
          <FileText aria-hidden className="text-brandBlue" size={24} />
          <h2 className="text-lg font-black">Evidencia visual</h2>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-1">
          <ComparisonFrame
            image={beforeAfter.auction}
            label="Origen"
            title={vehicle.auctionState?.conditionSummary ?? "Origen pendiente"}
          />
          <ComparisonFrame
            image={beforeAfter.current}
            label="Actual"
            title={vehicle.currentState?.conditionSummary ?? "Estado pendiente"}
          />
        </div>

        <div className="mt-5 border-t border-white/10 pt-5">
          <h3 className="text-sm font-black uppercase tracking-[0.14em] text-silver">
            Evidencia a validar
          </h3>
          <div className="mt-3 grid gap-2">
            {evidenceItems.map((item) => (
              <div
                className="flex items-center justify-between gap-3 rounded-[var(--radius)] border border-white/10 bg-white/[0.03] px-3 py-2"
                key={item.label}
              >
                <span className="flex items-center gap-2 text-sm font-bold text-silver">
                  <CheckCircle2
                    aria-hidden
                    className={item.available ? "text-emerald-300" : "text-muted"}
                    size={16}
                  />
                  {item.label}
                </span>
                <span className="text-xs font-black uppercase text-muted">
                  {item.available ? "Publicado" : "Pedir"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </section>
  );
}

function ImageThumb({
  image,
  isSelected,
  label,
  onClick,
  title
}: {
  image: VehicleImage;
  isSelected: boolean;
  label: string;
  onClick: () => void;
  title: string;
}) {
  const imageUrl = urlForImage(image);

  return (
    <button
      aria-label={title}
      className={`relative aspect-[4/3] min-w-28 overflow-hidden rounded-[var(--radius)] border ${
        isSelected ? "border-brandRed" : "border-white/12"
      } bg-black`}
      onClick={onClick}
      type="button"
    >
      {imageUrl ? (
        <Image
          alt={image.alt || title}
          className="object-cover"
          fill
          sizes="8rem"
          src={imageUrl}
        />
      ) : null}
      <span className="absolute inset-x-1 bottom-1 truncate rounded bg-black/72 px-2 py-1 text-left text-[0.65rem] font-black uppercase tracking-[0.08em] text-white">
        {label}
      </span>
    </button>
  );
}

function ComparisonFrame({
  image,
  label,
  title
}: {
  image: VehicleImage | undefined;
  label: string;
  title: string;
}) {
  const imageUrl = image ? urlForImage(image) : "";

  return (
    <div className="overflow-hidden rounded-[var(--radius)] border border-white/10 bg-white/[0.03]">
      <div className="relative aspect-[16/9] bg-black">
        {imageUrl ? (
          <Image
            alt={image?.alt || label}
            className="object-cover"
            fill
            sizes="(min-width: 1024px) 22vw, 100vw"
            src={imageUrl}
          />
        ) : (
          <div className="grid h-full place-items-center text-muted">
            <ImageIcon aria-hidden size={28} />
          </div>
        )}
      </div>
      <div className="p-3">
        <p className="text-xs font-black uppercase tracking-[0.16em] text-brandRed">
          {label}
        </p>
        <p className="mt-1 line-clamp-2 text-sm leading-6 text-silver">
          {title}
        </p>
      </div>
    </div>
  );
}

function imageCategory(
  image: VehicleImage,
  index: number,
  mode: TransparencyMode
): string {
  const alt = image.alt?.toLowerCase() ?? "";

  if (alt.includes("vin")) return "VIN";
  if (alt.includes("motor") || alt.includes("engine")) return "Motor";
  if (alt.includes("interior")) return "Interior";
  if (alt.includes("llanta") || alt.includes("tire")) return "Llantas";
  if (alt.includes("airbag") || alt.includes("bolsa")) return "Airbags";
  if (alt.includes("daño") || alt.includes("dano") || alt.includes("imper")) {
    return "Imperfeccion";
  }
  if (index === 0) return mode === "auction" ? "Subasta" : "Actual";
  if (index === 1) return "Exterior";
  if (index === 2) return "Interior";

  return mode === "auction" ? "Origen" : "Detalle";
}

function buildEvidenceItems(vehicle: PublicVehicleDetail) {
  const allText = [
    vehicle.auctionState?.conditionSummary,
    vehicle.currentState?.conditionSummary,
    ...(vehicle.inspection?.map((item) => item.label) ?? []),
    ...(vehicle.auctionState?.images?.map((image) => image.alt) ?? []),
    ...(vehicle.currentState?.images?.map((image) => image.alt) ?? [])
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return [
    { label: "Exterior", available: hasAny(allText, ["exterior", "carroceria", "pintura"]) },
    { label: "Interior", available: hasAny(allText, ["interior", "cabina", "asiento"]) },
    { label: "Motor", available: hasAny(allText, ["motor", "engine", "mecanica"]) },
    { label: "VIN", available: Boolean(vehicle.vin) || hasAny(allText, ["vin"]) },
    { label: "Airbags", available: hasAny(allText, ["airbag", "airbags", "bolsa"]) },
    { label: "Llantas", available: hasAny(allText, ["llanta", "llantas", "tire"]) }
  ];
}

function hasAny(text: string, terms: string[]) {
  return terms.some((term) => text.includes(term));
}
