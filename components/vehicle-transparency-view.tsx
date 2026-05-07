"use client";

import { FileText, Image as ImageIcon } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";

import type { PublicVehicleDetail, VehicleImage } from "@/lib/queries";
import { urlForImage } from "@/lib/sanity/image";

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
              Transparency Toggle
            </p>
            <h2 className="mt-1 text-xl font-black text-white">
              {modeLabels[mode]}
            </h2>
          </div>
          <div className="grid grid-cols-2 rounded-xl border border-white/12 bg-black/50 p-1">
            {(["auction", "current"] as const).map((option) => (
              <button
                aria-pressed={mode === option}
                className={`rounded-lg px-3 py-2 text-sm font-black transition ${
                  mode === option
                    ? "bg-brandRed text-white shadow-redGlow"
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
        </div>

        <div className="space-y-4 p-4">
          <p className="leading-7 text-silver">{summary}</p>
          {images.length > 1 ? (
            <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
              {images.map((image, index) => (
                <ImageThumb
                  image={image}
                  isSelected={index === selectedIndex}
                  key={image._key ?? `${mode}-${index}`}
                  onClick={() => setSelectedIndex(index)}
                  title={`${modeLabels[mode]} ${index + 1}`}
                />
              ))}
            </div>
          ) : null}
        </div>
      </div>

      <aside className="glass-card p-5">
        <div className="flex items-center gap-3">
          <FileText aria-hidden className="text-brandBlue" size={24} />
          <h2 className="text-lg font-black">Comparacion visual</h2>
        </div>
        <div className="mt-5 grid gap-4">
          <ComparisonFrame
            image={beforeAfter.auction}
            label="Origen de subasta"
            title={vehicle.auctionState?.conditionSummary ?? "Origen pendiente"}
          />
          <ComparisonFrame
            image={beforeAfter.current}
            label="Estado actual"
            title={vehicle.currentState?.conditionSummary ?? "Estado pendiente"}
          />
        </div>
      </aside>
    </section>
  );
}

function ImageThumb({
  image,
  isSelected,
  onClick,
  title
}: {
  image: VehicleImage;
  isSelected: boolean;
  onClick: () => void;
  title: string;
}) {
  const imageUrl = urlForImage(image);

  return (
    <button
      aria-label={title}
      className={`relative aspect-[4/3] overflow-hidden rounded-lg border ${
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
    <div className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.03]">
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
