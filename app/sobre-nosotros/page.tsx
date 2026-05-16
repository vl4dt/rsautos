import type { Metadata } from "next";
import {
  ArrowRight,
  BadgeCheck,
  BookOpenCheck,
  Camera,
  ClipboardCheck,
  Eye,
  FileSearch,
  Gauge,
  KeyRound,
  MessageCircle,
  Search,
  ShieldCheck,
  Sparkles,
  Wrench,
  type LucideIcon
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { FaqSection, type FaqItem } from "@/components/faq-section";
import { env } from "@/lib/env";
import {
  siteVisualSettingsQuery,
  type SiteVisualSettings,
  type Testimonial
} from "@/lib/queries";
import { getSanityClient, isSanityConfigured } from "@/lib/sanity/client";
import { urlForImage } from "@/lib/sanity/image";
import { buildWhatsappUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Sobre nosotros",
  description:
    "Conoce el proceso de RS Autos HN: transparencia, verificacion, documentacion e importacion de vehiculos para Honduras."
};

const processSteps = [
  {
    icon: Search,
    title: "Revision VIN y specs",
    text: "Confirmamos datos publicos basicos como VIN, año, marca, modelo, millaje y especificaciones."
  },
  {
    icon: FileSearch,
    title: "Fotos y condicion de origen",
    text: "Revisamos evidencia inicial para entender como ingreso el vehiculo y que debe explicarse."
  },
  {
    icon: ClipboardCheck,
    title: "Estado actual e inspeccion",
    text: "Separamos el estado actual del estado de origen para mostrar cambios, revision y pendientes."
  },
  {
    icon: KeyRound,
    title: "Ficha para el comprador",
    text: "Preparamos precio, fotos, documentos, preguntas recomendadas y guia para decidir con criterio."
  }
];

const trustModules = [
  {
    icon: Camera,
    title: "Mostramos condicion",
    text: "La presentacion visual debe ayudar a evaluar el vehiculo, no solo hacerlo ver atractivo."
  },
  {
    icon: Eye,
    title: "Separamos origen y actual",
    text: "El comprador puede distinguir como ingreso el vehiculo y como se encuentra hoy."
  },
  {
    icon: Wrench,
    title: "Explicamos reparaciones",
    text: "Cuando hay trabajos publicados, se presentan como contexto para la decision de compra."
  },
  {
    icon: BookOpenCheck,
    title: "Guiamos preguntas",
    text: "Cada ficha y guia orienta al comprador sobre que validar antes de reservar o visitar."
  }
];

const fallbackTestimonials: Testimonial[] = [
  {
    name: "Carlos M.",
    city: "Tegucigalpa",
    vehicle: "Toyota RAV4 importada",
    rating: 5,
    quote:
      "Pude revisar fotos, estado y documentos antes de decidir. El seguimiento fue claro desde el primer mensaje."
  },
  {
    name: "Andrea P.",
    city: "San Pedro Sula",
    vehicle: "Honda CR-V en inventario",
    rating: 5,
    quote:
      "Me ayudaron a comparar opciones sin presion. La ficha del vehiculo tenia la informacion que necesitaba."
  },
  {
    name: "Jose R.",
    city: "La Ceiba",
    vehicle: "Pickup para trabajo",
    rating: 5,
    quote:
      "La diferencia fue entender que podia verificar y que datos eran internos. Eso me dio confianza."
  }
];

const transparencyFaqs: FaqItem[] = [
  {
    question: "Que puede verificar un comprador?",
    answer:
      "VIN publico, precio publico, millaje, estado de importacion, fotos, inspeccion, reparaciones publicadas y documentos disponibles."
  },
  {
    question: "Que datos permanecen internos?",
    answer:
      "Costos de subasta, adquisicion, fletes, aduana, reparaciones internas, margen y estructura de precio no se publican."
  },
  {
    question: "Por que separar datos publicos e internos?",
    answer:
      "La transparencia para compra exige condicion y documentacion clara; la operacion interna protege negociacion, costos y estrategia comercial."
  },
  {
    question: "Como se solicita mas informacion?",
    answer:
      "Cada ficha y pagina de contacto genera un WhatsApp con fuente y contexto para que RS Autos responda con el caso correcto."
  }
];

const businessStats: Array<{
  label: string;
  value: string;
  Icon: LucideIcon;
}> = [
  { label: "Mercado", value: env.primaryMarket, Icon: Gauge },
  { label: "Ubicacion", value: env.businessLocation, Icon: BadgeCheck },
  { label: "Promesa", value: "Datos publicos claros", Icon: ShieldCheck }
];

const sanityFetchOptions =
  process.env.NODE_ENV === "development"
    ? { cache: "no-store" as const }
    : { next: { revalidate: 3600 } };

export const revalidate = 3600;

export default async function SobreNosotrosPage() {
  const siteVisuals = isSanityConfigured
    ? await getSanityClient().fetch<SiteVisualSettings | null>(
        siteVisualSettingsQuery,
        {},
        sanityFetchOptions
      )
    : null;
  const aboutHeroImageUrl = siteVisuals?.aboutHeroImage
    ? urlForImage(siteVisuals.aboutHeroImage)
    : "/images/rs-autos/hero-car.png";
  const testimonials =
    siteVisuals?.testimonials && siteVisuals.testimonials.length > 0
      ? siteVisuals.testimonials
      : fallbackTestimonials;

  return (
    <main className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <section className="relative mb-8 overflow-hidden rounded-[var(--radius)] border border-white/10 bg-black/35 p-6 shadow-glass lg:min-h-[31rem]">
          <div className="absolute inset-y-0 right-0 hidden w-1/2 lg:block">
            <Image
              alt="Vehiculo premium RS Autos HN"
              className="object-cover object-right opacity-70 [mask-image:linear-gradient(90deg,transparent,#000_35%)]"
              fill
              priority
              sizes="50vw"
              src={aboutHeroImageUrl}
            />
          </div>
          <div className="relative max-w-3xl py-4 lg:py-10">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-brandRed">
              Sobre RS Autos HN
            </p>
            <h1 className="metal-heading mt-3 text-4xl uppercase leading-tight sm:text-5xl lg:text-6xl">
              Transparencia para comprar mejor
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">
              RS Autos existe para proteger mejor la decision del comprador:
              mostrar condicion, explicar reparaciones, separar datos publicos
              de costos internos y guiar las preguntas correctas antes de
              reservar un vehiculo importado en {env.primaryMarket}.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link className="btn-primary px-6" href="/inventory">
                Ver inventario <ArrowRight aria-hidden size={20} />
              </Link>
              <Link className="btn-secondary px-6" href="/guia-compra-importados">
                <BookOpenCheck aria-hidden size={19} />
                Guia de compra
              </Link>
              <a
                className="btn-secondary px-6"
                href={buildWhatsappUrl({
                  leadSource: "about",
                  message:
                    "Hola RS Autos HN, quiero conocer mas sobre su proceso de verificacion e importacion."
                })}
              >
                <MessageCircle aria-hidden size={19} />
                Hablar con RS Autos
              </a>
            </div>
          </div>
        </section>

        <section className="mb-8 grid gap-5 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="glass-card p-6">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-brandRed">
              Nuestra posicion
            </p>
            <h2 className="mt-2 text-3xl font-black text-white">
              No vendemos solo una foto bonita
            </h2>
            <p className="mt-4 leading-7 text-muted">
              En vehiculos importados, la confianza viene de entender el
              contexto: titulo, condicion de origen, estado actual, revision,
              documentos y preguntas pendientes. El objetivo es que el cliente
              pueda comprar con criterio, no por impulso.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              ["Condicion antes que apariencia", "La ficha debe mostrar evidencia util, no solo fotografia comercial."],
              ["Origen vs actual", "El comprador debe poder comparar como ingreso y como se entrega."],
              ["Reparado o como ingreso", "Se debe explicar si esta listo, en revision o vendido como llego."],
              ["Preguntas antes de reservar", "La guia ayuda a validar documentos, VIN, fotos y pendientes."]
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
        </section>

        <section className="mb-8 grid gap-4 md:grid-cols-3">
          {businessStats.map(({ Icon, label, value }) => (
            <article className="glass-card p-5" key={label}>
              <Icon aria-hidden className="text-brandBlue" size={24} />
              <p className="mt-4 text-xs font-black uppercase tracking-[0.16em] text-muted">
                {label}
              </p>
              <h2 className="mt-1 text-xl font-black text-white">{value}</h2>
            </article>
          ))}
        </section>

        <section className="mb-8">
          <h2 className="section-title">Antes de publicar un vehiculo</h2>
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
        </section>

        <section className="mb-8 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="glass-card p-6">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-brandRed">
              Informacion publica
            </p>
            <h2 className="mt-2 text-2xl font-black text-white">
              Lo que el comprador necesita para decidir
            </h2>
            <div className="mt-5 grid gap-3">
              {[
                "VIN publico cuando aplica",
                "Precio publico y estado de importacion",
                "Fotos de origen y estado actual",
                "Checklist, reparaciones y documentos disponibles",
                "Preguntas recomendadas antes de reservar"
              ].map((item) => (
                <p
                  className="rounded-[var(--radius)] border border-white/10 bg-white/[0.03] p-3 text-sm font-bold text-silver"
                  key={item}
                >
                  {item}
                </p>
              ))}
            </div>
          </div>
          <div className="glass-card p-6">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-brandRed">
              Que permanece interno
            </p>
            <h2 className="mt-2 text-2xl font-black text-white">
              Operacion protegida
            </h2>
            <p className="mt-4 leading-7 text-muted">
              RS Autos no publica campos internos como costos de subasta,
              adquisicion, fletes, aduana, reparaciones internas, margenes o
              desglose operativo. La ficha publica se centra en lo que ayuda al
              comprador a verificar el vehiculo y avanzar con confianza.
            </p>
            <div className="mt-5 rounded-xl border border-brandRed/25 bg-brandRed/10 p-4">
              <p className="flex items-center gap-2 text-sm font-black text-silver">
                <ShieldCheck aria-hidden className="text-brandRed" size={18} />
                Las consultas publicas no deben exponer costos de adquisicion
                ni desglose operativo interno.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="section-title">Principios de proteccion al comprador</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {trustModules.map((module) => (
              <article className="glass-card p-5" key={module.title}>
                <module.icon aria-hidden className="text-brandRed" size={30} />
                <h3 className="mt-4 text-lg font-black text-white">
                  {module.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted">
                  {module.text}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="section-title">Prueba social</h2>
          <p className="mt-3 max-w-3xl leading-7 text-muted">
            Los testimonios complementan la evidencia. La confianza principal
            debe venir de fichas claras, fotos, documentos y preguntas bien
            guiadas.
          </p>
          <div className="mt-6 grid gap-5 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <article className="glass-card p-6" key={testimonial._key ?? testimonial.name}>
                <Sparkles aria-hidden className="text-brandRed" size={24} />
                <p className="mt-4 min-h-24 text-sm leading-6 text-silver">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <p className="mt-5 text-brandRed">*****</p>
                <div className="mt-3">
                  <p className="font-black text-white">{testimonial.name}</p>
                  <p className="text-sm text-muted">
                    {[testimonial.city, testimonial.vehicle].filter(Boolean).join(" / ")}
                  </p>
                  <p className="mt-2 text-sm font-black text-brandBlue">
                    Rating {(testimonial.rating ?? 5).toFixed(1)}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <FaqSection
          items={transparencyFaqs}
          title="Transparencia publica e informacion interna"
        />

        <section className="neon-panel mt-8 rounded-[var(--radius)] border border-white/10 bg-black/50 p-6 shadow-glass">
          <div className="relative grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.18em] text-brandRed">
                Siguiente paso
              </p>
              <h2 className="mt-2 text-2xl font-black text-white">
                Revisa inventario, lee la guia o cotiza una importacion
              </h2>
              <p className="mt-2 max-w-3xl leading-7 text-muted">
                Elige entre vehiculos publicados o una busqueda guiada con
                presupuesto y uso esperado.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link className="btn-primary px-6" href="/inventory">
                Inventario <ArrowRight aria-hidden size={18} />
              </Link>
              <Link className="btn-secondary px-6" href="/guia-compra-importados">
                Guia <ArrowRight aria-hidden size={18} />
              </Link>
              <Link className="btn-secondary px-6" href="/importamos-tu-auto">
                Importar auto <ArrowRight aria-hidden size={18} />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
