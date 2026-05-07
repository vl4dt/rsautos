import type { Metadata } from "next";
import {
  ArrowRight,
  BadgeCheck,
  ClipboardCheck,
  FileCheck2,
  FileSearch,
  Gauge,
  KeyRound,
  MessageCircle,
  Search,
  ShieldCheck,
  Sparkles,
  UserCheck,
  Wrench,
  type LucideIcon
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { FaqSection, type FaqItem } from "@/components/faq-section";
import { env } from "@/lib/env";
import { buildWhatsappUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Sobre nosotros",
  description:
    "Conoce el proceso de RS Autos HN: transparencia, verificacion, documentacion e importacion de vehiculos para Honduras."
};

const processSteps = [
  {
    icon: Search,
    title: "Elegir vehiculo",
    text: "Partimos de presupuesto, uso real, marca preferida y tolerancia al estado de origen."
  },
  {
    icon: FileSearch,
    title: "Verificar y comprar",
    text: "Comparamos VIN, fotos, condicion visible, documentos y estado antes de avanzar."
  },
  {
    icon: ClipboardCheck,
    title: "Importar con seguimiento",
    text: "Damos contexto del traslado, aduana, preparacion y avances importantes del proceso."
  },
  {
    icon: KeyRound,
    title: "Entregar documentado",
    text: "El comprador recibe una explicacion clara del estado final y los soportes publicos disponibles."
  }
];

const trustModules = [
  {
    icon: ShieldCheck,
    title: "Verificacion VIN",
    text: "El VIN publico ayuda a conectar ficha, documentos, inspeccion y seguimiento por WhatsApp."
  },
  {
    icon: Wrench,
    title: "Revision mecanica",
    text: "Se presenta condicion de subasta, estado actual y bitacora cuando hay trabajos publicados."
  },
  {
    icon: FileCheck2,
    title: "Claridad documental",
    text: "Las fichas separan datos publicos de comprador de costos internos de operacion."
  },
  {
    icon: UserCheck,
    title: "Atencion personalizada",
    text: "Cada lead llega con fuente y contexto para dar seguimiento segun inventario, importacion o documentos."
  }
];

const testimonials = [
  {
    name: "Carlos M.",
    city: "Tegucigalpa",
    vehicle: "Toyota RAV4 importada",
    rating: "5.0",
    quote:
      "Pude revisar fotos, estado y documentos antes de decidir. El seguimiento fue claro desde el primer mensaje."
  },
  {
    name: "Andrea P.",
    city: "San Pedro Sula",
    vehicle: "Honda CR-V en inventario",
    rating: "5.0",
    quote:
      "Me ayudaron a comparar opciones sin presion. La ficha del vehiculo tenia la informacion que necesitaba."
  },
  {
    name: "Jose R.",
    city: "La Ceiba",
    vehicle: "Pickup para trabajo",
    rating: "5.0",
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

export default function SobreNosotrosPage() {
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
              src="/images/rs-autos/hero-car.png"
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
              Somos una plataforma de inventario e importacion enfocada en que
              el comprador en {env.primaryMarket} pueda entender condicion,
              documentacion, revision y siguiente paso sin exponer costos
              internos de operacion.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link className="btn-primary px-6" href="/inventory">
                Ver inventario <ArrowRight aria-hidden size={20} />
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
          <h2 className="section-title">Proceso de compra e importacion</h2>
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
              Que si se muestra
            </p>
            <h2 className="mt-2 text-2xl font-black text-white">
              Datos publicos para decidir
            </h2>
            <div className="mt-5 grid gap-3">
              {[
                "VIN publico cuando aplica",
                "Precio publico y estado de importacion",
                "Fotos de origen y estado actual",
                "Checklist, reparaciones y documentos disponibles"
              ].map((item) => (
                <p
                  className="rounded-xl border border-white/10 bg-white/[0.03] p-3 text-sm font-bold text-silver"
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
          <h2 className="section-title">Modulos de confianza</h2>
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
          <h2 className="section-title">Clientes y casos</h2>
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
                  <p className="text-sm text-muted">
                    {testimonial.city} / {testimonial.vehicle}
                  </p>
                  <p className="mt-2 text-sm font-black text-brandBlue">
                    Rating {testimonial.rating}
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
                Revisa inventario o cotiza una importacion
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
