import {
  ArrowRight,
  Camera,
  ClipboardCheck,
  BookOpenCheck,
  FileCheck2,
  FileSearch,
  Gauge,
  KeyRound,
  ListChecks,
  MessageCircle,
  Search,
  ShieldCheck
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { VehicleCard } from "@/components/vehicle-card";
import { env } from "@/lib/env";
import { getUsdHnlRate } from "@/lib/exchange-rate";
import {
  publicVehicleProjection,
  siteVisualSettingsQuery,
  type PublicVehicleCard,
  type SiteVisualSettings,
  type Testimonial
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
    icon: FileCheck2,
    title: "Historial visible",
    text: "VIN, titulo, origen y documentos publicos cuando estan disponibles."
  },
  {
    icon: Camera,
    title: "Fotos como evidencia",
    text: "Galeria del estado de origen, estado actual y detalles relevantes."
  },
  {
    icon: ListChecks,
    title: "Condicion explicada",
    text: "Checklist simple para saber que esta verificado, pendiente o reparado."
  },
  {
    icon: MessageCircle,
    title: "Decision acompanada",
    text: "Asesoria directa para revisar la ficha antes de coordinar una visita."
  }
];

const processSteps = [
  {
    icon: Search,
    title: "Entendemos tu caso",
    text: "Partimos de presupuesto, uso, ciudad, tiempo esperado y tolerancia al riesgo."
  },
  {
    icon: ClipboardCheck,
    title: "Revisamos evidencia",
    text: "Comparamos VIN, fotos, titulo, condicion de origen y estado actual."
  },
  {
    icon: FileSearch,
    title: "Explicamos pendientes",
    text: "Separamos lo verificado, lo pendiente, reparaciones y documentos disponibles."
  },
  {
    icon: KeyRound,
    title: "Guiamos el siguiente paso",
    text: "Te orientamos para visitar, reservar, pedir documentos o buscar una opcion mejor."
  }
];

const decisionRoutes = [
  {
    icon: Search,
    title: "Quiero ver unidades disponibles",
    text: "Explora vehiculos publicados con precio, millaje, estado y ficha transparente.",
    href: "/inventory",
    label: "Ver inventario"
  },
  {
    icon: BookOpenCheck,
    title: "Quiero entender como comprar",
    text: "Aprende sobre titulos, salvage, rebuilt, estado de subasta y preguntas clave.",
    href: "/guia-compra-importados",
    label: "Leer guia"
  },
  {
    icon: FileSearch,
    title: "Quiero importar un vehiculo",
    text: "Completa un perfil guiado con presupuesto, uso, riesgo aceptable y prioridades.",
    href: "/importamos-tu-auto",
    label: "Cotizar importacion"
  },
  {
    icon: MessageCircle,
    title: "Quiero hablar con RS Autos",
    text: "Elige el motivo correcto y envia un WhatsApp con contexto desde el inicio.",
    href: "/contacto",
    label: "Ir a contacto"
  }
];

const fallbackTestimonials: Testimonial[] = [
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
  const usdHnlRate = await getUsdHnlRate();
  const homeHeroImageUrl = siteVisuals?.homeHeroImage
    ? urlForImage(siteVisuals.homeHeroImage)
    : "/images/rs-autos/hero-car.png";
  const homeCtaImageUrl = siteVisuals?.homeCtaImage
    ? urlForImage(siteVisuals.homeCtaImage)
    : "/images/rs-autos/cta-car.png";
  const homeCta = {
    body:
      siteVisuals?.homeCta?.body ||
      "Escribenos por WhatsApp y recibe asesoria personalizada con opciones disponibles, importacion o documentacion.",
    buttonHref: siteVisuals?.homeCta?.buttonHref || "/contacto",
    buttonLabel: siteVisuals?.homeCta?.buttonLabel || "Ir a contacto",
    eyebrow: siteVisuals?.homeCta?.eyebrow,
    title: siteVisuals?.homeCta?.title || "Listo para tu proximo auto?"
  };
  const testimonials =
    siteVisuals?.testimonials && siteVisuals.testimonials.length > 0
      ? siteVisuals.testimonials
      : fallbackTestimonials;
  const featuredVehicle = featuredVehicles[0];

  return (
    <main>
      <section className="relative overflow-hidden border-b border-white/10 px-4 pb-8 pt-10 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,6,7,0.98)_0%,rgba(12,14,16,0.9)_50%,rgba(7,8,10,0.72)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-white/10" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-[0.9fr_1.15fr]">
          <div className="max-w-2xl">
            <p className="inline-flex border-l-2 border-brandRed pl-3 text-xs font-extrabold uppercase tracking-[0.16em] text-silver">
              Importados USA con informacion clara
            </p>
            <h1 className="metal-heading mt-6 max-w-2xl text-4xl leading-[1.02] sm:text-5xl lg:text-6xl">
              Compra con evidencia,
              <span className="block text-brandRed [background:none]">no con promesas</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-silver sm:text-lg">
              RS Autos presenta cada vehiculo con condicion, fotos, documentos
              y contexto suficiente para tomar una decision responsable en
              {` ${env.primaryMarket}`}.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link className="btn-primary whitespace-nowrap px-6" href="/inventory">
                Ver inventario <ArrowRight aria-hidden size={20} />
              </Link>
              <Link className="btn-secondary whitespace-nowrap px-6" href="/guia-compra-importados">
                <BookOpenCheck aria-hidden size={19} />
                Guia de compra
              </Link>
              <Link className="btn-secondary whitespace-nowrap px-6" href="/importamos-tu-auto">
                <MessageCircle aria-hidden size={19} />
                Cotizar importacion
              </Link>
            </div>
            <div className="mt-7 flex flex-wrap gap-4 text-sm font-bold text-silver">
              <span className="flex items-center gap-2">
                <ShieldCheck aria-hidden className="text-brandRed" size={18} />
                VIN e historial
              </span>
              <span className="flex items-center gap-2">
                <FileSearch aria-hidden className="text-brandBlue" size={18} />
                Estado antes y despues
              </span>
              <span className="flex items-center gap-2">
                <Gauge aria-hidden className="text-silver" size={18} />
                Checklist publico
              </span>
            </div>
          </div>

          <div className="relative min-h-[19rem] overflow-hidden rounded-[var(--radius)] border border-white/10 bg-black sm:min-h-[25rem] lg:min-h-[31rem]">
            <Image
              alt={featuredVehicle?.heroImage?.alt || "Vehiculo importado RS Autos HN"}
              className="object-cover object-right"
              fill
              priority
              sizes="(min-width: 1024px) 54vw, 100vw"
              src={
                featuredVehicle?.heroImage
                  ? urlForImage(featuredVehicle.heroImage)
                  : homeHeroImageUrl
              }
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/84 via-black/8 to-black/12" />
            <div className="absolute bottom-4 left-4 right-4 grid gap-3 rounded-[var(--radius)] border border-white/12 bg-black/78 p-4 md:grid-cols-[1fr_auto] md:items-end">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.16em] text-brandRed">
                  Vehiculo destacado
                </p>
                <h2 className="mt-1 text-2xl font-black text-white">
                  {featuredVehicle?.title ?? "Inventario RS Autos"}
                </h2>
                <p className="mt-1 text-sm font-semibold text-muted">
                  {featuredVehicle
                    ? `${featuredVehicle.year} / ${featuredVehicle.transmission ?? "Transmision pendiente"} / ${featuredVehicle.drivetrain ?? "Traccion pendiente"}`
                    : "Ficha transparente, fotos y asesoria directa."}
                </p>
              </div>
              <Link
                className="btn-secondary px-4 text-sm"
                href={featuredVehicle ? `/inventory/${featuredVehicle.slug}` : "/inventory"}
              >
                Revisar ficha <ArrowRight aria-hidden size={17} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 bg-white/[0.025] px-4 py-5 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-3 md:grid-cols-4">
          {[
            ["Origen", "Subasta USA o dealer verificado"],
            ["Estado", "Como ingreso y como se entrega"],
            ["Revision", "Puntos mecanicos y visuales clave"],
            ["Soporte", "Consulta directa por WhatsApp"]
          ].map(([label, value]) => (
            <div className="border-l border-brandRed/55 pl-4" key={label}>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-muted">
                {label}
              </p>
              <p className="mt-1 font-black text-silver">{value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-brandRed">
              Empieza por tu necesidad
            </p>
            <h2 className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">
              Elige el camino correcto antes de escribir
            </h2>
            <p className="mt-3 leading-7 text-muted">
              RS Autos funciona como un centro de decision: inventario
              documentado, guia de compra, importacion por encargo y contacto
              con contexto.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {decisionRoutes.map((route) => (
              <article className="glass-card flex min-h-[17rem] flex-col border-t-2 border-t-white/10 p-5" key={route.title}>
                <route.icon aria-hidden className="text-silver" size={26} />
                <h3 className="mt-4 text-xl font-extrabold text-white">
                  {route.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted">
                  {route.text}
                </p>
                <Link className="btn-secondary mt-auto w-full px-4 text-sm" href={route.href}>
                  {route.label} <ArrowRight aria-hidden size={17} />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-12 sm:px-6 lg:px-8">
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
                <VehicleCard
                  compact
                  key={vehicle._id}
                  usdToHnlRate={usdHnlRate.rate}
                  vehicle={vehicle}
                />
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

      <section className="px-4 pb-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[1fr_1fr]">
          <div className="glass-card p-6">
            <ShieldCheck aria-hidden className="text-silver" size={32} />
            <p className="mt-4 text-sm font-black uppercase tracking-[0.18em] text-brandRed">
              Inventario curado
            </p>
            <h2 className="mt-2 text-3xl font-black text-white">
              Pocas unidades, mejor documentadas
            </h2>
            <p className="mt-4 leading-7 text-muted">
              Preferimos publicar menos vehiculos con mejor contexto: estado,
              fotos, documentos, revision y preguntas utiles para el comprador.
              Eso convierte la baja cantidad en curacion, no en falta de
              opciones.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              ["Condicion", "Que se sabe del estado de origen y actual."],
              ["Documentos", "Que reportes o soportes se pueden revisar."],
              ["Preguntas", "Que validar antes de reservar o visitar."],
              ["Asesoria", "Que camino conviene segun presupuesto y riesgo."]
            ].map(([title, text]) => (
              <article
                className="rounded-[var(--radius)] border border-white/10 bg-white/[0.035] p-5"
                key={title}
              >
                <h3 className="font-black text-white">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-12 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="glass-card p-6">
            <BookOpenCheck aria-hidden className="text-silver" size={32} />
            <p className="mt-4 text-sm font-black uppercase tracking-[0.18em] text-brandRed">
              Compra informado
            </p>
            <h2 className="mt-2 text-3xl font-black text-white">
              Entiende titulos, danos y reparaciones antes de decidir
            </h2>
            <p className="mt-4 leading-7 text-muted">
              Una guia practica para leer condicion de subasta, estado actual,
              titulos de USA, documentos disponibles y preguntas importantes
              antes de comprar un importado.
            </p>
            <Link className="btn-secondary mt-6 px-6" href="/guia-compra-importados">
              Leer guia de compra <ArrowRight aria-hidden size={18} />
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              ["Clean / salvage / rebuilt", "Que significa cada titulo y que riesgo implica."],
              ["Subasta vs actual", "Como comparar el estado de origen contra el estado final."],
              ["Vendido como ingreso", "Que preguntar cuando el vehiculo no se entrega reparado."],
              ["Documentos y VIN", "Que evidencias pedir antes de reservar o visitar."]
            ].map(([title, text]) => (
              <article
                className="rounded-[var(--radius)] border border-white/10 bg-white/[0.035] p-5"
                key={title}
              >
                <h3 className="font-black text-white">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="proceso" className="px-4 pb-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="section-title">Como te ayudamos a decidir</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {processSteps.map((step, index) => (
              <article className="glass-card p-6" key={step.title}>
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <span className="text-2xl font-black tabular-nums text-brandRed">
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
          <h2 className="section-title">Prueba social</h2>
          <p className="mt-3 max-w-3xl leading-7 text-muted">
            La confianza principal viene de fichas claras. Los testimonios
            complementan esa evidencia cuando hay casos publicados.
          </p>
          <div className="mt-6 grid gap-5 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <article className="glass-card p-6" key={testimonial._key ?? testimonial.name}>
                <p className="mt-4 min-h-24 text-sm leading-6 text-silver">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <p className="mt-5 text-xs font-black tracking-[0.18em] text-brandRed">RS AUTOS</p>
                <div className="mt-3">
                  <p className="font-black text-white">{testimonial.name}</p>
                  <p className="text-sm text-muted">
                    {[testimonial.city, testimonial.vehicle].filter(Boolean).join(" / ")}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="contacto" className="px-4 pb-4 sm:px-6 lg:px-8">
        <div className="glass-card neon-panel relative mx-auto grid max-w-7xl gap-6 overflow-hidden p-6 sm:p-8 lg:grid-cols-[auto_1fr_auto] lg:items-center">
          <div className="relative z-10 grid h-16 w-16 place-items-center rounded-[var(--radius)] border border-white/10 bg-brandRed">
            <MessageCircle aria-hidden size={38} />
          </div>
          <div className="relative z-10">
            {homeCta.eyebrow ? (
              <p className="mb-2 text-xs font-black uppercase tracking-[0.18em] text-brandRed">
                {homeCta.eyebrow}
              </p>
            ) : null}
            <h2 className="text-3xl font-black">{homeCta.title}</h2>
            <p className="mt-2 max-w-2xl text-muted">
              {homeCta.body}
            </p>
          </div>
          <Link className="btn-primary relative z-10 px-7" href={homeCta.buttonHref}>
            {homeCta.buttonLabel} <ArrowRight aria-hidden size={20} />
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
