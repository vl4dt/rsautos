import type { Metadata } from "next";
import {
  ArrowRight,
  Clock,
  FileText,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck
} from "lucide-react";
import Link from "next/link";

import { FaqSection, type FaqItem } from "@/components/faq-section";
import { env } from "@/lib/env";
import { buildWhatsappUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Contacta a RS Autos HN por WhatsApp para inventario, importacion, documentos y visitas."
};

const contactFaqs: FaqItem[] = [
  {
    question: "Cual es el canal principal?",
    answer:
      "WhatsApp es el canal principal para responder con contexto, enlaces, documentos y disponibilidad."
  },
  {
    question: "Puedo preguntar por un vehiculo especifico?",
    answer:
      "Si. Desde cada ficha de inventario el mensaje incluye titulo, VIN publico, estado y enlace."
  },
  {
    question: "Atienden importaciones por encargo?",
    answer:
      "Si. La pagina Importamos tu auto organiza presupuesto, uso, ano esperado y tiempo de compra."
  },
  {
    question: "Que datos no son publicos?",
    answer:
      "Los costos internos de adquisicion, reparacion, importacion y margenes no se publican en fichas ni reportes."
  }
];

const contactOptions = [
  {
    icon: MessageCircle,
    title: "Inventario disponible",
    text: "Consulta disponibilidad, visita, precio publico y documentos.",
    href: buildWhatsappUrl({
      leadSource: "contact_inventory",
      message: "Hola RS Autos HN, quiero informacion sobre inventario disponible."
    })
  },
  {
    icon: FileText,
    title: "Importar un vehiculo",
    text: "Comparte presupuesto, tipo de vehiculo y tiempo esperado.",
    href: buildWhatsappUrl({
      leadSource: "contact_import",
      message: "Hola RS Autos HN, quiero asesorarme para importar un vehiculo."
    })
  },
  {
    icon: ShieldCheck,
    title: "Documentos o reportes",
    text: "Solicita contexto sobre VIN, inspeccion o importacion.",
    href: buildWhatsappUrl({
      leadSource: "contact_documents",
      message: "Hola RS Autos HN, quiero consultar documentos o reportes de un vehiculo."
    })
  }
];

export default function ContactoPage() {
  return (
    <main className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <section className="mb-6 overflow-hidden rounded-[var(--radius)] border border-white/10 bg-black/35 p-6 shadow-glass">
          <div className="grid gap-6 lg:grid-cols-[1fr_23rem] lg:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.18em] text-brandRed">
                Contacto directo
              </p>
              <h1 className="metal-heading mt-3 text-4xl uppercase leading-tight sm:text-5xl lg:text-6xl">
                Hablemos de tu proximo vehiculo
              </h1>
              <p className="mt-4 max-w-3xl text-lg leading-8 text-muted">
                Elige el motivo de contacto para que WhatsApp llegue con fuente
                y contexto. Asi se separan consultas de inventario, importacion
                y documentos.
              </p>
            </div>
            <div className="glass-card p-5">
              <p className="flex items-center gap-2 text-sm font-bold text-muted">
                <MapPin aria-hidden className="text-brandRed" size={18} />
                Ubicacion
              </p>
              <p className="mt-2 text-xl font-black">{env.businessLocation}</p>
              <p className="mt-2 text-sm leading-6 text-muted">
                Atencion para {env.primaryMarket} con seguimiento por WhatsApp.
              </p>
            </div>
          </div>
        </section>

        <section className="grid gap-5 lg:grid-cols-3">
          {contactOptions.map((option) => (
            <article className="glass-card p-5" key={option.title}>
              <option.icon aria-hidden className="text-brandBlue" size={28} />
              <h2 className="mt-4 text-xl font-black text-white">
                {option.title}
              </h2>
              <p className="mt-2 min-h-12 text-sm leading-6 text-muted">
                {option.text}
              </p>
              <a className="btn-primary mt-5 w-full px-4" href={option.href}>
                <MessageCircle aria-hidden size={18} />
                Escribir por WhatsApp
              </a>
            </article>
          ))}
        </section>

        <section className="mt-6 grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="glass-card p-5">
            <Clock aria-hidden className="text-brandRed" size={28} />
            <h2 className="mt-4 text-xl font-black text-white">
              Expectativas de respuesta
            </h2>
            <div className="mt-5 grid gap-3">
              {[
                ["Inventario", "Confirmacion de disponibilidad y siguiente paso."],
                ["Importacion", "Revision inicial de presupuesto, uso y opciones."],
                ["Documentos", "Orientacion sobre datos publicos disponibles."]
              ].map(([label, text]) => (
                <div
                  className="rounded-xl border border-white/10 bg-white/[0.03] p-3"
                  key={label}
                >
                  <p className="font-black text-white">{label}</p>
                  <p className="mt-1 text-sm leading-6 text-muted">{text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-5">
            <Phone aria-hidden className="text-brandBlue" size={28} />
            <h2 className="mt-4 text-xl font-black text-white">
              Informacion del negocio
            </h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <InfoBlock label="Nombre" value={env.businessName} />
              <InfoBlock label="Mercado" value={env.primaryMarket} />
              <InfoBlock label="Ubicacion" value={env.businessLocation} />
              <InfoBlock
                label="WhatsApp"
                value={env.contactPhone || "Configurar en env"}
              />
            </div>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Link className="btn-secondary px-5" href="/inventory">
                Ver inventario <ArrowRight aria-hidden size={18} />
              </Link>
              <Link className="btn-secondary px-5" href="/importamos-tu-auto">
                Importar auto <ArrowRight aria-hidden size={18} />
              </Link>
            </div>
          </div>
        </section>

        <FaqSection items={contactFaqs} title="Preguntas de contacto" />
      </div>
    </main>
  );
}

function InfoBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
      <p className="text-xs font-black uppercase tracking-[0.14em] text-muted">
        {label}
      </p>
      <p className="mt-1 break-words font-black text-white">{value}</p>
    </div>
  );
}
