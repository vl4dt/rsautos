import {
  ArrowRight,
  BadgeCheck,
  ClipboardCheck,
  FileSearch,
  Gauge,
  KeyRound,
  MessageCircle,
  Search,
  ShieldCheck,
  Sparkles,
  Wrench
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { VehicleCard } from "@/components/vehicle-card";
import { env } from "@/lib/env";
import {
  publicVehicleProjection,
  siteVisualSettingsQuery,
  type PublicVehicleCard,
  type SiteVisualSettings
} from "@/lib/queries";
import { getSanityClient, isSanityConfigured } from "@/lib/sanity/client";
import { urlForImage } from "@/lib/sanity/image";
import { buildWhatsappUrl } from "@/lib/whatsapp";

export const revalidate = 3600;

const featuredFallback = [
  {
    image: "/images/rs-autos/vehicle-rav4.png",
    title: "Toyota RAV4 XLE",
    details: "2021 - AWD - Automatica - Gasolina",
    price: "L 565,000"
  },
  {
    image: "/images/rs-autos/vehicle-crv.png",
    title: "Honda CR-V EX-L",
    details: "2020 - AWD - Automatica - Gasolina",
    price: "L 615,000"
  },
  {
    image: "/images/rs-autos/vehicle-bmw.png",
    title: "BMW X3 xDrive30i",
    details: "2021 - AWD - Automatica - Gasolina",
    price: "L 895,000"
  },
  {
    image: "/images/rs-autos/vehicle-hilux.png",
    title: "Toyota Hilux SR5",
    details: "2020 - 4x4 - Automatica - Diesel",
    price: "L 745,000"
  }
];

const trustItems = [
  {
    icon: ShieldCheck,
    title: "VIN verificable",
    text: "Historial claro, fotos de origen y datos publicos para validar el lote."
  },
  {
    icon: Wrench,
    title: "Revision mecanica",
    text: "Inspeccion del estado actual antes de que tomes una decision."
  },
  {
    icon: BadgeCheck,
    title: "Importados verificados",
    text: "Cada unidad publicada pasa por control de documentacion y condicion."
  },
  {
    icon: MessageCircle,
    title: "Asesoria directa",
    text: "Un asesor te guia por WhatsApp desde la busqueda hasta la entrega."
  }
];

const processSteps = [
  {
    icon: Search,
    title: "Elegis tu auto",
    text: "Buscamos opciones por presupuesto, uso, marca y estado esperado."
  },
  {
    icon: ClipboardCheck,
    title: "Verificacion y compra",
    text: "Revisamos informacion disponible y confirmamos el proceso contigo."
  },
  {
    icon: FileSearch,
    title: "Importacion segura",
    text: "Coordinamos traslado, documentacion y avances hasta Honduras."
  },
  {
    icon: KeyRound,
    title: "Entrega y respaldo",
    text: "Recibes tu vehiculo con informacion clara del estado final."
  }
];

const testimonials = [
  {
    quote:
      "Proceso claro desde la primera consulta. Me explicaron cada paso y el carro llego como se habia revisado.",
    name: "Carlos M.",
    city: "Tegucigalpa"
  },
  {
    quote:
      "La atencion por WhatsApp fue rapida y profesional. Pude comparar opciones antes de decidir.",
    name: "Andrea P.",
    city: "San Pedro Sula"
  },
  {
    quote:
      "Me gusto ver el estado de origen y el estado actual. Eso da mucha confianza para comprar.",
    name: "Jose R.",
    city: "La Ceiba"
  }
];

const sanityFetchOptions =
  process.env.NODE_ENV === "development"
    ? { cache: "no-store" as const }
    : { next: { revalidate } };

export default async function HomePage() {
  const sanityClient = isSanityConfigured ? getSanityClient() : null;
  const [featuredVehicles, siteVisuals] = sanityClient
    ? await Promise.all([
        sanityClient.fetch<PublicVehicleCard[]>(
          `*[_type == "carListing" && isPublic == true && defined(slug.current)] | order(publishedAt desc)[0...4] { ${publicVehicleProjection} }`,
          {},
          sanityFetchOptions
        ),
        sanityClient.fetch<SiteVisualSettings | null>(
          siteVisualSettingsQuery,
          {},
          sanityFetchOptions
        )
      ])
    : [[], null];
  const homeHeroImageUrl = siteVisuals?.homeHeroImage
    ? urlForImage(siteVisuals.homeHeroImage)
    : "/images/rs-autos/hero-car.png";
  const homeCtaImageUrl = siteVisuals?.homeCtaImage
    ? urlForImage(siteVisuals.homeCtaImage)
    : "/images/rs-autos/cta-car.png";

  return (
    <main>
      <section className="relative overflow-hidden border-b border-white/10 px-4 pb-10 pt-12 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,7,11,0.96)_0%,rgba(5,7,11,0.88)_38%,rgba(5,7,11,0.22)_70%,rgba(5,7,11,0.88)_100%)]" />
        <div className="absolute -right-24 top-8 h-[34rem] w-[20rem] rotate-[28deg] border-r-4 border-brandRed/70 shadow-redGlow" />
        <div className="absolute left-[48%] top-0 h-[34rem] w-1 rotate-[34deg] bg-gradient-to-b from-transparent via-brandBlue to-transparent shadow-blueGlow" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-[0.9fr_1.15fr]">
          <div className="max-w-2xl">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-silver">
              Confianza <span className="px-2 text-brandRed">/</span>
              Transparencia <span className="px-2 text-brandRed">/</span>
              Calidad
            </p>
            <h1 className="metal-heading mt-6 text-5xl uppercase leading-[0.9] sm:text-6xl lg:text-7xl">
              Vehiculos importados
              <span className="block text-brandRed [background:none]">
                verificados
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-silver">
              Importamos y publicamos vehiculos con informacion visible, estado
              documentado y asesoria directa para comprar con confianza en
              {` ${env.primaryMarket}`}.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link className="btn-primary px-6" href="/inventory">
                Ver inventario <ArrowRight aria-hidden size={20} />
              </Link>
              <Link className="btn-secondary px-6" href="/importamos-tu-auto">
                <MessageCircle aria-hidden size={19} />
                Cotizar importacion
              </Link>
            </div>
            <div className="mt-7 flex flex-wrap gap-4 text-sm font-extrabold text-silver">
              <span className="flex items-center gap-2">
                <ShieldCheck aria-hidden className="text-brandRed" size={18} />
                100% verificables
              </span>
              <span className="flex items-center gap-2">
                <FileSearch aria-hidden className="text-brandBlue" size={18} />
                Documentacion clara
              </span>
              <span className="flex items-center gap-2">
                <Gauge aria-hidden className="text-silver" size={18} />
                Proceso seguro
              </span>
            </div>
          </div>

          <div className="relative min-h-[17rem] sm:min-h-[24rem] lg:min-h-[29rem]">
            <Image
              alt="SUV negro en showroom RS Autos HN"
              className="object-cover object-right drop-shadow-[0_34px_44px_rgba(0,0,0,0.8)]"
              fill
              priority
              sizes="(min-width: 1024px) 54vw, 100vw"
              src={homeHeroImageUrl}
            />
          </div>
        </div>
      </section>

      <section className="relative z-10 -mt-6 px-4 sm:px-6 lg:px-8">
        <form
          action="/inventory"
          className="glass-card neon-panel mx-auto grid max-w-7xl gap-4 p-4 md:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1fr_auto]"
          data-analytics-event="filter_submit"
          data-lead-source="home_filter"
        >
          {[
            ["make", "Marca", "Todas las marcas"],
            ["minYear", "Ano", "Cualquier ano"],
            ["maxPrice", "Precio", "Cualquier precio"],
            ["status", "Estado", "Todos"]
          ].map(([name, label, placeholder]) => (
            <label
              className="relative z-10 flex items-center gap-3 rounded-xl border border-white/10 bg-black/35 px-4 py-3"
              key={name}
            >
              <Search aria-hidden className="text-silver" size={20} />
              <span className="grid">
                <span className="text-sm font-black text-white">{label}</span>
                <input
                  className="w-full bg-transparent text-sm text-muted outline-none placeholder:text-muted"
                  inputMode={name.includes("Year") || name.includes("Price") ? "numeric" : undefined}
                  name={name}
                  placeholder={placeholder}
                />
              </span>
            </label>
          ))}
          <button className="btn-primary relative z-10 px-8" type="submit">
            <Search aria-hidden size={19} />
            Buscar
          </button>
        </form>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="section-title">Inventario destacado</h2>
            <Link className="text-sm font-black text-silver transition hover:text-white" href="/inventory">
              Ver todo el inventario <ArrowRight aria-hidden className="inline" size={17} />
            </Link>
          </div>

          {featuredVehicles.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {featuredVehicles.map((vehicle) => (
                <VehicleCard compact key={vehicle._id} vehicle={vehicle} />
              ))}
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {featuredFallback.map((vehicle) => (
                <article className="glass-card vehicle-card-shell overflow-hidden" key={vehicle.title}>
                  <div className="relative aspect-[16/10] bg-black/50">
                    <Image
                      alt={vehicle.title}
                      className="object-cover"
                      fill
                      sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"
                      src={vehicle.image}
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-black">{vehicle.title}</h3>
                    <p className="mt-2 text-sm font-semibold text-muted">
                      {vehicle.details}
                    </p>
                    <p className="mt-3 text-xl font-black text-brandRed">
                      {vehicle.price}
                    </p>
                    <div className="mt-4 grid grid-cols-2 gap-3">
                      <Link className="btn-secondary px-4 text-sm" href="/inventory">
                        Ver detalles
                      </Link>
                      <a className="btn-primary px-4 text-sm" href={buildWhatsappUrl()}>
                        WhatsApp
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <section id="respaldo" className="px-4 pb-12 sm:px-6 lg:px-8">
        <div className="glass-card mx-auto grid max-w-7xl gap-0 overflow-hidden md:grid-cols-2 xl:grid-cols-4">
          {trustItems.map((item) => (
            <div
              className="border-b border-white/10 p-6 md:border-r xl:border-b-0"
              key={item.title}
            >
              <item.icon aria-hidden className="text-brandRed" size={42} />
              <h3 className="mt-4 text-lg font-black">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="proceso" className="px-4 pb-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="section-title">Como trabajamos</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {processSteps.map((step, index) => (
              <article className="glass-card p-6" key={step.title}>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-black italic text-brandRed">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <step.icon aria-hidden className="text-silver" size={34} />
                </div>
                <h3 className="mt-6 text-lg font-black">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="section-title">Lo que dicen nuestros clientes</h2>
          <div className="mt-6 grid gap-5 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <article className="glass-card p-6" key={testimonial.name}>
                <Sparkles aria-hidden className="text-brandRed" size={24} />
                <p className="mt-4 min-h-24 text-sm leading-6 text-silver">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <p className="mt-5 text-brandRed">*****</p>
                <div className="mt-3">
                  <p className="font-black text-white">{testimonial.name}</p>
                  <p className="text-sm text-muted">{testimonial.city}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="contacto" className="px-4 pb-4 sm:px-6 lg:px-8">
        <div className="glass-card neon-panel relative mx-auto grid max-w-7xl gap-6 overflow-hidden p-6 sm:p-8 lg:grid-cols-[auto_1fr_auto] lg:items-center">
          <div className="relative z-10 grid h-20 w-20 place-items-center rounded-full bg-brandRed shadow-redGlow">
            <MessageCircle aria-hidden size={38} />
          </div>
          <div className="relative z-10">
            <h2 className="text-3xl font-black">Listo para tu proximo auto?</h2>
            <p className="mt-2 max-w-2xl text-muted">
              Escribenos por WhatsApp y recibe asesoria personalizada con
              opciones disponibles, importacion o documentacion.
            </p>
          </div>
          <Link className="btn-primary relative z-10 px-7" href="/contacto">
            Ir a contacto <ArrowRight aria-hidden size={20} />
          </Link>
          <Image
            alt=""
            aria-hidden
            className="absolute bottom-0 right-0 hidden h-full w-[44%] object-cover opacity-45 [mask-image:linear-gradient(90deg,transparent,#000_35%)] lg:block"
            height={360}
            src={homeCtaImageUrl}
            width={760}
          />
        </div>
      </section>
    </main>
  );
}
