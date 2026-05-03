import type { Metadata } from "next";
import { BadgeCheck, CarFront, LayoutGrid, ShieldCheck } from "lucide-react";

import { EmptyInventory } from "@/components/empty-inventory";
import { InventoryFilterBar } from "@/components/inventory-filter-bar";
import { VehicleCard } from "@/components/vehicle-card";
import { env } from "@/lib/env";
import { parseInventorySearchParams } from "@/lib/inventory";
import {
  buildInventoryQuery,
  inventoryFiltersQuery,
  type InventoryFiltersData,
  type PublicVehicleCard
} from "@/lib/queries";
import { getSanityClient, isSanityConfigured } from "@/lib/sanity/client";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Inventario",
  description:
    "Inventario de vehiculos importados en Honduras con filtros por marca, ano, precio y estado de importacion."
};

type InventoryPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const emptyFilters: InventoryFiltersData = {
  makes: [],
  bounds: {}
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

  const [vehicles, filterData] = sanityClient
    ? await Promise.all([
        sanityClient.fetch<PublicVehicleCard[]>(
          buildInventoryQuery(filters),
          filters,
          sanityFetchOptions
        ),
        sanityClient.fetch<InventoryFiltersData>(
          inventoryFiltersQuery,
          {},
          sanityFetchOptions
        )
      ])
    : [[], emptyFilters];

  return (
    <main className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <section className="mb-8 overflow-hidden rounded-[var(--radius)] border border-white/10 bg-black/35 p-6 shadow-glass">
          <div className="grid gap-6 lg:grid-cols-[1fr_24rem] lg:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.18em] text-brandRed">
                Inventario transparente
              </p>
              <h1 className="metal-heading mt-3 text-4xl uppercase leading-tight sm:text-5xl">
                Vehiculos importados verificados
              </h1>
              <p className="mt-4 max-w-3xl text-muted">
                Filtra por marca, ano, precio y estado de importacion. Cada
                vehiculo publicado esta preparado para mostrar condicion de
                subasta y estado actual cuando abras su ficha tecnica.
              </p>
            </div>
            <div className="glass-card p-5">
              <p className="flex items-center gap-2 text-sm font-bold text-muted">
                <ShieldCheck aria-hidden className="text-brandRed" size={18} />
                Ubicacion y respaldo
              </p>
              <p className="mt-2 text-xl font-black">{env.businessLocation}</p>
              <p className="mt-2 text-sm leading-6 text-muted">
                Contacto directo y datos visibles antes de coordinar visita o
                compra.
              </p>
            </div>
          </div>
        </section>

        <InventoryFilterBar filters={filterData} values={filters} />

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
            <VehicleCard key={vehicle._id} vehicle={vehicle} />
          ))}
        </section>

        {vehicles.length === 0 ? (
          <div className="mt-10">
            <EmptyInventory />
          </div>
        ) : null}

        <section className="mt-10 grid gap-5 lg:grid-cols-3">
          {[
            ["VIN verificable", "Historial y datos visibles para comparar antes de comprar."],
            ["Revision clara", "Estado mecanico, kilometraje y condicion actual en una ficha simple."],
            ["Asesoria por WhatsApp", "Coordinacion directa para inventario, importacion o venta."]
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
