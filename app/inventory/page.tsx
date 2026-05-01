import type { Metadata } from "next";

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
          { next: { revalidate } }
        ),
        sanityClient.fetch<InventoryFiltersData>(
          inventoryFiltersQuery,
          {},
          { next: { revalidate } }
        )
      ])
    : [[], emptyFilters];

  return (
    <main className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <section className="mb-8">
          <p className="text-sm font-black uppercase text-brandRed">
            Inventario transparente
          </p>
          <div className="mt-3 grid gap-4 lg:grid-cols-[1fr_24rem] lg:items-end">
            <div>
              <h1 className="metal-heading text-4xl leading-tight sm:text-5xl">
                Vehiculos importados disponibles
              </h1>
              <p className="mt-4 max-w-3xl text-muted">
                Filtra por marca, ano, precio y estado de importacion. Cada
                vehiculo publicado esta preparado para mostrar condicion de
                subasta y estado actual cuando abras su ficha tecnica.
              </p>
            </div>
            <div className="glass-card p-4">
              <p className="text-sm font-bold text-muted">Ubicacion</p>
              <p className="mt-1 text-xl font-black">{env.businessLocation}</p>
            </div>
          </div>
        </section>

        <InventoryFilterBar filters={filterData} values={filters} />

        <section
          aria-live="polite"
          className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3"
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
      </div>
    </main>
  );
}
