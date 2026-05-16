import type { Metadata } from "next";
import {
  ArrowRight,
  BadgeCheck,
  Bell,
  CarFront,
  DollarSign,
  FileCheck2,
  Gauge,
  LayoutGrid,
  MessageCircle,
  SearchCheck,
  ShieldCheck
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { EmptyInventory } from "@/components/empty-inventory";
import { VehicleCard } from "@/components/vehicle-card";
import { WhatsappIntentActions } from "@/components/whatsapp-intent-actions";
import { env } from "@/lib/env";
import { getUsdHnlRate } from "@/lib/exchange-rate";
import {
  legacyImportStatusLabels,
  publicImportStatus,
  parseInventorySearchParams
} from "@/lib/inventory";
import {
  formatDate,
  formatMileagePair,
  formatPricePair,
  formatUsd
} from "@/lib/format";
import { buildInventoryQuery, type PublicVehicleCard } from "@/lib/queries";
import { getSanityClient, isSanityConfigured } from "@/lib/sanity/client";
import { urlForImage } from "@/lib/sanity/image";
import {
  formatVehicleMake,
  formatVehicleModel
} from "@/lib/vehicle-normalization";
import { buildWhatsappUrl } from "@/lib/whatsapp";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Inventario",
  description: "Inventario de vehiculos importados en Honduras."
};

type InventoryPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const sanityFetchOptions =
  process.env.NODE_ENV === "development"
    ? { cache: "no-store" as const }
    : { next: { revalidate } };

export default async function InventoryPage({
  searchParams
}: InventoryPageProps) {
  const resolvedSearchParams = await searchParams;
  const filters = parseInventorySearchParams(resolvedSearchParams);
  const sanityClient = isSanityConfigured ? getSanityClient() : null;

  const [vehicles, usdHnlRate] = await Promise.all([
    sanityClient
      ? sanityClient.fetch<PublicVehicleCard[]>(
          buildInventoryQuery(filters),
          filters,
          sanityFetchOptions
        )
      : Promise.resolve([]),
    getUsdHnlRate()
  ]);
  const featuredVehicle = vehicles[0];
  const inventoryStats = buildInventoryStats(vehicles);

  return (
    <main className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <section className="mb-8 overflow-hidden rounded-[var(--radius)] border border-white/10 bg-black/35 p-6 shadow-glass">
          <div className="grid gap-6 lg:grid-cols-[1fr_24rem] lg:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.18em] text-brandRed">
                Showroom transparente
              </p>
              <h1 className="metal-heading mt-3 text-4xl uppercase leading-tight sm:text-5xl">
                Pocas unidades, fichas completas
              </h1>
              <p className="mt-4 max-w-3xl text-muted">
                Cada vehiculo disponible se muestra con precio en dolares y
                lempiras, millaje en millas y kilometros, estado de importacion,
                fotos y datos publicos para comprar con criterio.
              </p>
            </div>
            <div className="glass-card p-5">
              <p className="flex items-center gap-2 text-sm font-bold text-muted">
                <ShieldCheck aria-hidden className="text-brandRed" size={18} />
                Ubicacion y respaldo
              </p>
              <p className="mt-2 text-xl font-black">{env.businessLocation}</p>
              <p className="mt-2 text-sm leading-6 text-muted">
                Contacto directo, datos visibles y asesoria para revisar cada
                ficha antes de coordinar visita o compra.
              </p>
            </div>
          </div>
        </section>

        {featuredVehicle ? (
          <FeaturedInventoryVehicle
            usdToHnlRate={usdHnlRate.rate}
            vehicle={featuredVehicle}
          />
        ) : null}

        <section className="mt-8 grid gap-3 md:grid-cols-2 xl:grid-cols-5">
          {[
            ["Listos para venta", String(inventoryStats.readyCount), ShieldCheck],
            ["En transito", String(inventoryStats.inTransitCount), CarFront],
            ["Precio desde", inventoryStats.minPrice, DollarSign],
            ["Menor millaje", inventoryStats.minMileage, Gauge],
            ["Actualizacion", inventoryStats.latestDate, FileCheck2]
          ].map(([label, value, Icon]) => (
            <div
              className="rounded-[var(--radius)] border border-white/10 bg-white/[0.035] p-4"
              key={label as string}
            >
              <Icon aria-hidden className="text-brandRed" size={20} />
              <p className="mt-3 text-xs font-black uppercase tracking-[0.14em] text-muted">
                {label as string}
              </p>
              <p className="mt-1 font-black text-white">{value as string}</p>
            </div>
          ))}
        </section>

        <section className="mt-5 rounded-[var(--radius)] border border-brandBlue/20 bg-brandBlue/10 p-5">
          <p className="text-sm font-black uppercase tracking-[0.16em] text-brandBlue">
            Inventario curado
          </p>
          <p className="mt-2 max-w-4xl leading-7 text-silver">
            Publicamos pocas unidades porque priorizamos fichas con fotos,
            estado, revision y datos publicos utiles. Si no ves el vehiculo
            ideal, podemos buscar una opcion parecida con presupuesto y uso
            definido.
          </p>
        </section>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-3 text-lg font-black text-white">
            <CarFront aria-hidden className="text-brandRed" size={22} />
            <span className="text-brandRed">{vehicles.length}</span>
            vehiculos encontrados
          </p>
          <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-sm font-bold text-muted">
            <LayoutGrid aria-hidden size={18} />
            Vista de tarjetas
          </div>
        </div>

        <section
          aria-live="polite"
          className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3"
        >
          {vehicles.map((vehicle) => (
            <VehicleCard
              key={vehicle._id}
              usdToHnlRate={usdHnlRate.rate}
              vehicle={vehicle}
            />
          ))}
        </section>

        {vehicles.length === 0 ? (
          <div className="mt-10">
            <EmptyInventory />
          </div>
        ) : null}

        <section className="mt-10">
          <WhatsappIntentActions
            compact
            description="Si el inventario actual no encaja, envia una consulta con intencion clara."
            intents={[
              {
                icon: Bell,
                label: "Avisarme cuando ingresen unidades",
                leadSource: "inventory_notify_new_units",
                message:
                  "Hola RS Autos HN, quiero que me avisen cuando ingresen nuevas unidades al inventario."
              },
              {
                icon: SearchCheck,
                label: "Buscar uno parecido",
                leadSource: "inventory_find_similar",
                message:
                  "Hola RS Autos HN, quiero buscar un vehiculo parecido a los publicados, con presupuesto y uso definido."
              }
            ]}
            title="No viste el ideal?"
          />
        </section>

        <section className="mt-10 grid gap-5 lg:grid-cols-3">
          {[
            [
              "VIN verificable",
              "Historial y datos visibles para comparar antes de comprar."
            ],
            [
              "Revision clara",
              "Estado mecanico, kilometraje y condicion actual en una ficha simple."
            ],
            [
              "Asesoria por WhatsApp",
              "Coordinacion directa para inventario, importacion o venta."
            ]
          ].map(([title, text]) => (
            <div className="glass-card p-5" key={title}>
              <BadgeCheck aria-hidden className="text-brandRed" size={26} />
              <h2 className="mt-4 text-lg font-black">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted">{text}</p>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}

function FeaturedInventoryVehicle({
  usdToHnlRate,
  vehicle
}: {
  usdToHnlRate: number;
  vehicle: PublicVehicleCard;
}) {
  const imageUrl = vehicle.heroImage ? urlForImage(vehicle.heroImage) : "";
  const make = formatVehicleMake(vehicle.make);
  const model = formatVehicleModel(vehicle.model);
  const price = formatPricePair(vehicle.priceUsd, usdToHnlRate);
  const mileage = formatMileagePair(vehicle.mileage);
  const statusLabel = legacyImportStatusLabels[vehicle.importStatus];
  const whatsappUrl = buildWhatsappUrl({
    importStatusLabel: statusLabel,
    leadSource: "inventory_featured",
    slug: vehicle.slug,
    title: vehicle.title,
    vin: vehicle.vin
  });

  return (
    <section className="glass-card overflow-hidden">
      <div className="grid gap-0 lg:grid-cols-[1.08fr_0.92fr]">
        <div className="relative min-h-[18rem] bg-black sm:min-h-[24rem]">
          {imageUrl ? (
            <Image
              alt={vehicle.heroImage?.alt || vehicle.title}
              className="object-cover"
              fill
              priority
              sizes="(min-width: 1024px) 52vw, 100vw"
              src={imageUrl}
            />
          ) : (
            <div className="grid h-full place-items-center text-muted">
              <CarFront aria-hidden size={48} />
            </div>
          )}
          <div className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/75 px-3 py-2 text-xs font-black uppercase tracking-[0.12em] text-silver backdrop-blur">
            Vehiculo destacado
          </div>
        </div>

        <div className="p-5 sm:p-6">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-brandRed">
            Prioridad del showroom
          </p>
          <h2 className="mt-2 text-3xl font-black text-white">
            {vehicle.year} {make} {model}
          </h2>
          <div className="mt-4 flex flex-wrap items-end gap-3">
            <p className="text-3xl font-black text-brandRed">{price.usd}</p>
            <p className="pb-1 text-sm font-bold text-muted">{price.hnl} aprox.</p>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {[
              ["Estado", statusLabel],
              ["Millaje", `${mileage.miles} / ${mileage.kilometers}`],
              ["Traccion", vehicle.drivetrain ?? "Pendiente"],
              ["Combustible", vehicle.fuelType ?? "Pendiente"]
            ].map(([label, value]) => (
              <div
                className="rounded-[var(--radius)] border border-white/10 bg-white/[0.035] p-3"
                key={label}
              >
                <p className="text-xs font-black uppercase tracking-[0.14em] text-muted">
                  {label}
                </p>
                <p className="mt-1 font-black text-silver">{value}</p>
              </div>
            ))}
          </div>

          <div className="mt-5 rounded-[var(--radius)] border border-white/10 bg-black/35 p-4">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-brandRed">
              Por que verlo primero
            </p>
            <p className="mt-2 text-sm leading-6 text-muted">
              Es la unidad mas reciente publicada y cuenta con ficha publica
              para revisar precio, millaje, estado, fotos y consulta directa
              antes de coordinar una visita.
            </p>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <Link className="btn-secondary px-4" href={`/inventory/${vehicle.slug}`}>
              Ver ficha completa <ArrowRight aria-hidden size={18} />
            </Link>
            <a
              className="btn-primary px-4"
              data-analytics-event="whatsapp_click"
              data-lead-source="inventory_featured"
              href={whatsappUrl}
            >
              <MessageCircle aria-hidden size={18} />
              Consultar
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function buildInventoryStats(vehicles: PublicVehicleCard[]) {
  const readyCount = vehicles.filter(
    (vehicle) => publicImportStatus(vehicle.importStatus) === "readyForSale"
  ).length;
  const inTransitCount = vehicles.length - readyCount;
  const minPrice = vehicles.length
    ? formatUsd(Math.min(...vehicles.map((vehicle) => vehicle.priceUsd)))
    : "Pendiente";
  const minMileage = vehicles.length
    ? formatMileagePair(Math.min(...vehicles.map((vehicle) => vehicle.mileage))).miles
    : "Pendiente";
  const latestDate = vehicles[0]?.publishedAt
    ? formatDate(vehicles[0].publishedAt)
    : "Pendiente";

  return {
    inTransitCount,
    latestDate,
    minMileage,
    minPrice,
    readyCount
  };
}
