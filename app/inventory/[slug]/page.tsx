import type { Metadata } from "next";
import type { ReactNode } from "react";
import {
  BadgeCheck,
  CalendarCheck,
  CarFront,
  ClipboardCheck,
  FileCheck2,
  FileText,
  Fuel,
  Gauge,
  MapPin,
  MessageCircle,
  Route,
  Settings,
  ShieldCheck,
  type LucideIcon
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { TrackPageView } from "@/components/track-page-view";
import { VehicleTransparencyView } from "@/components/vehicle-transparency-view";
import { env } from "@/lib/env";
import { getUsdHnlRate } from "@/lib/exchange-rate";
import {
  formatDate,
  formatMileagePair,
  formatPricePair
} from "@/lib/format";
import {
  legacyImportStatusLabels,
  publicImportStatus,
  inspectionStatusLabels
} from "@/lib/inventory";
import {
  publicVehicleDetailQuery,
  vehicleSlugsQuery,
  type InspectionStatus,
  type PublicVehicleDocument,
  type PublicVehicleDetail
} from "@/lib/queries";
import { getSanityClient, isSanityConfigured } from "@/lib/sanity/client";
import { buildWhatsappUrl } from "@/lib/whatsapp";

export const revalidate = 3600;

type VehicleDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const sanityFetchOptions =
  process.env.NODE_ENV === "development"
    ? { cache: "no-store" as const }
    : { next: { revalidate } };

export async function generateStaticParams() {
  if (!isSanityConfigured) {
    return [];
  }

  const client = getSanityClient();
  const slugs = await client.fetch<{ slug: string }[]>(
    vehicleSlugsQuery,
    {},
    sanityFetchOptions
  );

  return slugs.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params
}: VehicleDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const vehicle = await getVehicle(slug);

  if (!vehicle) {
    return {
      title: "Vehiculo no encontrado"
    };
  }

  return {
    title: vehicle.title,
    description: `${vehicle.title} en ${env.primaryMarket}: VIN, inspeccion, condicion de subasta, estado actual y documentos publicos.`
  };
}

export default async function VehicleDetailPage({
  params
}: VehicleDetailPageProps) {
  const { slug } = await params;
  const vehicle = await getVehicle(slug);

  if (!vehicle) {
    notFound();
  }

  const statusLabel = legacyImportStatusLabels[vehicle.importStatus];
  const usdHnlRate = await getUsdHnlRate();
  const mileage = formatMileagePair(vehicle.mileage);
  const price = formatPricePair(vehicle.priceUsd, usdHnlRate.rate);
  const whatsappUrl = buildWhatsappUrl({
    title: vehicle.title,
    vin: vehicle.vin,
    slug: vehicle.slug,
    importStatusLabel: statusLabel,
    leadSource: "inventory_detail"
  });
  const specItems: Array<{
    label: string;
    value: ReactNode;
    Icon: LucideIcon;
  }> = [
    { label: "VIN", value: vehicle.vin ?? "Disponible por consulta", Icon: ShieldCheck },
    {
      label: "Millaje",
      value: (
        <span className="grid leading-tight">
          <span>{mileage.miles}</span>
          <span className="text-sm text-muted">{mileage.kilometers}</span>
        </span>
      ),
      Icon: Gauge
    },
    { label: "Traccion", value: vehicle.drivetrain ?? "Pendiente", Icon: Route },
    { label: "Combustible", value: vehicle.fuelType ?? "Pendiente", Icon: Fuel },
    { label: "Transmision", value: vehicle.transmission ?? "Pendiente", Icon: Settings },
    { label: "Titulo", value: vehicle.titleStatus ?? "Pendiente de publicar", Icon: FileCheck2 },
    { label: "Ubicacion", value: vehicle.location ?? env.businessLocation, Icon: MapPin },
    { label: "Importacion", value: statusLabel, Icon: CalendarCheck }
  ];
  const repairLogs = vehicle.currentState?.repairLogs ?? [];
  const inspection = vehicle.inspection ?? [];
  const documents = buildPublicDocuments(vehicle);

  return (
    <main className="px-4 py-8 sm:px-6 lg:px-8">
      <TrackPageView event="detail_view" source="vehicle_detail" />
      <div className="mx-auto max-w-7xl">
        <nav aria-label="Migas de pan" className="mb-6 text-sm text-muted">
          <Link className="hover:text-white" href="/inventory">
            Inventario
          </Link>
          <span className="mx-2 text-white/30">/</span>
          <span className="text-silver">{vehicle.title}</span>
        </nav>

        <section className="mb-6 overflow-hidden rounded-[var(--radius)] border border-white/10 bg-black/35 p-6 shadow-glass">
          <div className="grid gap-6 lg:grid-cols-[1fr_22rem] lg:items-end">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-brandBlue/45 bg-black/65 px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-silver shadow-blueGlow">
                  {statusLabel}
                </span>
                <span className="rounded-full border border-brandRed/40 bg-brandRed/10 px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-brandRed">
                  Ficha transparente
                </span>
              </div>
              <h1 className="metal-heading mt-4 text-4xl uppercase leading-tight sm:text-5xl lg:text-6xl">
                {vehicle.title}
              </h1>
              <p className="mt-4 max-w-3xl text-lg leading-8 text-muted">
                Compara condicion de subasta, estado actual, revision mecanica
                y documentos publicos antes de coordinar una visita o compra.
              </p>
            </div>
            <div className="glass-card p-5">
              <p className="text-sm font-bold text-muted">Precio publico</p>
              <p className="mt-1 text-4xl font-black text-brandRed">
                {price.usd}
              </p>
              <p className="mt-1 text-sm font-bold text-muted">
                {price.hnl} aprox.
              </p>
              <p className="mt-1 text-xs text-muted">
                Tasa USD/HNL actualizada diariamente.
              </p>
              <a
                className="btn-primary mt-5 w-full px-4"
                data-analytics-event="whatsapp_click"
                data-lead-source="inventory_detail"
                href={whatsappUrl}
              >
                <MessageCircle aria-hidden size={20} />
                Consultar por WhatsApp
              </a>
            </div>
          </div>
        </section>

        <VehicleTransparencyView vehicle={vehicle} />

        <section className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {specItems.map(({ Icon, label, value }) => (
            <div className="glass-card p-4" key={label}>
              <Icon aria-hidden className="text-brandBlue" size={22} />
              <p className="mt-3 text-xs font-black uppercase tracking-[0.16em] text-muted">
                {label}
              </p>
              <p className="mt-1 break-words text-lg font-black text-white">
                {value}
              </p>
            </div>
          ))}
        </section>

        <section className="mt-5 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="glass-card p-5">
            <div className="flex items-center gap-3">
              <ClipboardCheck aria-hidden className="text-brandRed" size={24} />
              <h2 className="text-xl font-black">Checklist de inspeccion</h2>
            </div>
            <div className="mt-5 grid gap-3">
              {inspection.length ? (
                inspection.map((item) => (
                  <div
                    className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3"
                    key={item._key}
                  >
                    <span className="font-bold text-silver">{item.label}</span>
                    <span className={statusClass(item.status)}>
                      {inspectionStatusLabels[item.status]}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-muted">Checklist pendiente de publicar.</p>
              )}
            </div>
          </div>

          <div className="glass-card p-5">
            <div className="flex items-center gap-3">
              <CarFront aria-hidden className="text-brandBlue" size={24} />
              <h2 className="text-xl font-black">Bitacora de reparacion</h2>
            </div>
            <div className="mt-5 grid gap-4">
              {repairLogs.length ? (
                repairLogs.map((repairLog) => (
                  <article
                    className="rounded-xl border border-white/10 bg-white/[0.03] p-4"
                    key={repairLog._key}
                  >
                    <p className="text-xs font-black uppercase tracking-[0.16em] text-brandRed">
                      {formatDate(repairLog.date)}
                    </p>
                    <h3 className="mt-2 font-black text-white">
                      {repairLog.summary ?? "Trabajo registrado"}
                    </h3>
                    {repairLog.details ? (
                      <p className="mt-2 leading-6 text-muted">
                        {repairLog.details}
                      </p>
                    ) : null}
                  </article>
                ))
              ) : (
                <p className="text-muted">
                  Sin reparaciones publicadas para este vehiculo.
                </p>
              )}
            </div>
          </div>
        </section>

        <section className="mt-5">
          <div className="mb-4 flex items-center gap-3">
            <FileText aria-hidden className="text-brandRed" size={24} />
            <h2 className="text-xl font-black">Documentos y reportes</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {documents.map((document) => (
              <article className="glass-card p-5" key={document._key}>
                <BadgeCheck aria-hidden className="text-brandBlue" size={24} />
                <h3 className="mt-4 font-black text-white">{document.title}</h3>
                <p className="mt-2 min-h-12 text-sm leading-6 text-muted">
                  {document.description}
                </p>
                {document.url ? (
                  <a
                    className="btn-secondary mt-4 w-full px-4 text-sm"
                    data-analytics-event="report_download"
                    data-lead-source="vehicle_detail"
                    href={document.url}
                    rel="noreferrer"
                    target="_blank"
                  >
                    Abrir documento
                  </a>
                ) : (
                  <p className="mt-4 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-sm font-bold text-muted">
                    {document.status === "available"
                      ? "Disponible por WhatsApp"
                      : "Pendiente"}
                  </p>
                )}
              </article>
            ))}
          </div>
        </section>

        <section className="neon-panel mt-8 rounded-[var(--radius)] border border-white/10 bg-black/50 p-6 shadow-glass">
          <div className="relative grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.18em] text-brandRed">
                Consulta con contexto
              </p>
              <h2 className="mt-2 text-2xl font-black text-white">
                Envia esta ficha completa a RS Autos HN
              </h2>
              <p className="mt-2 max-w-3xl leading-7 text-muted">
                El mensaje incluye titulo, enlace, VIN publico y estado de
                importacion para responderte sobre disponibilidad, visita y
                documentos.
              </p>
            </div>
            <a
              className="btn-primary px-6"
              data-analytics-event="whatsapp_click"
              data-lead-source="inventory_detail"
              href={whatsappUrl}
            >
              <MessageCircle aria-hidden size={20} />
              Hablar por WhatsApp
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}

async function getVehicle(slug: string): Promise<PublicVehicleDetail | null> {
  if (!isSanityConfigured) {
    return null;
  }

  const client = getSanityClient();

  return client.fetch<PublicVehicleDetail | null>(
    publicVehicleDetailQuery,
    { slug },
    sanityFetchOptions
  );
}

function statusClass(status: InspectionStatus) {
  switch (status) {
    case "verified":
      return "rounded-full bg-emerald-500/12 px-3 py-1 text-xs font-black text-emerald-300";
    case "needsService":
      return "rounded-full bg-brandRed/12 px-3 py-1 text-xs font-black text-brandRed";
    case "pending":
    default:
      return "rounded-full bg-amber-400/12 px-3 py-1 text-xs font-black text-amber-200";
  }
}

function buildPublicDocuments(
  vehicle: PublicVehicleDetail
): PublicVehicleDocument[] {
  const cmsDocuments = vehicle.documents ?? [];
  const publicStatus = publicImportStatus(vehicle.importStatus);
  const defaults: PublicVehicleDocument[] = [
    {
      _key: "public-technical-report",
      title: "Reporte tecnico PDF",
      description: "Ficha PDF generada con datos publicos del comprador.",
      url: `/inventory/${vehicle.slug}/report`,
      status: "available"
    },
    {
      _key: "vin-verification",
      title: "Verificacion VIN",
      description: vehicle.vin
        ? `VIN publico ${vehicle.vin} listo para validar con RS Autos.`
        : "VIN disponible por consulta directa con RS Autos.",
      status: vehicle.vin ? "available" : "pending"
    },
    {
      _key: "inspection-report",
      title: "Reporte de inspeccion",
      description: "Resumen publico del checklist mecanico y visual.",
      status: vehicle.inspection?.length ? "available" : "pending"
    },
    {
      _key: "vehicle-history",
      title: "Carfax o equivalente",
      description: "Enlace o reporte equivalente cuando este disponible.",
      status: "pending"
    },
    {
      _key: "import-documents",
      title: "Documentos de importacion",
      description: "Soportes publicos de embarque, aduana o entrega.",
      status:
        publicStatus === "readyForSale"
          ? "available"
          : "pending"
    }
  ] as const;

  if (!cmsDocuments.length) {
    return defaults;
  }

  const hasReport = cmsDocuments.some(
    (document) => document._key === "public-technical-report"
  );

  return hasReport ? cmsDocuments : [defaults[0], ...cmsDocuments];
}
