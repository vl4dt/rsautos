import type { Metadata } from "next";
import {
  ArrowRight,
  Clock,
  ClipboardCheck,
  FileText,
  MapPin,
  MessageCircle,
  Phone,
  SearchCheck,
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
      "Si. La pagina Importamos tu auto organiza presupuesto, uso, año esperado y tiempo de compra."
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
    title: "Consultar vehiculo publicado",
    text: "Usa esta opcion si tienes una ficha, enlace o screenshot de inventario.",
    details: "Envia el enlace, ciudad, disponibilidad para visita y que quieres validar.",
    href: buildWhatsappUrl({
      leadSource: "contact_published_vehicle",
      message:
        "Hola RS Autos HN, quiero consultar un vehiculo publicado. Tengo enlace o captura y quiero validar disponibilidad, estado y documentos."
    })
  },
  {
    icon: ShieldCheck,
    title: "Entender documentos o VIN",
    text: "Elige esto si quieres revisar titulo, VIN, historial, reporte o documentos.",
    details: "Comparte VIN, foto del titulo, reporte o la duda concreta que quieres aclarar.",
    href: buildWhatsappUrl({
      leadSource: "contact_vin_documents",
      message:
        "Hola RS Autos HN, quiero entender documentos, titulo, VIN o reporte de un vehiculo antes de decidir."
    })
  },
  {
    icon: FileText,
    title: "Importar un vehiculo",
    text: "Comparte presupuesto, tipo de vehiculo, ciudad y tiempo esperado.",
    details: "Ideal si buscas una unidad especifica o quieres que RS Autos te oriente.",
    href: buildWhatsappUrl({
      leadSource: "contact_import",
      message: "Hola RS Autos HN, quiero asesorarme para importar un vehiculo. Tengo presupuesto, uso esperado y ciudad de entrega."
    })
  },
  {
    icon: SearchCheck,
    title: "Buscar algo parecido",
    text: "Si viste un vehiculo similar o no encontraste el ideal en inventario.",
    details: "Envia modelo deseado, presupuesto, uso principal y nivel de reparacion aceptable.",
    href: buildWhatsappUrl({
      leadSource: "contact_find_similar",
      message:
        "Hola RS Autos HN, quiero buscar un vehiculo parecido a una opcion que vi o a una necesidad especifica."
    })
  },
  {
    icon: ClipboardCheck,
    title: "No se que necesito",
    text: "Para compradores que quieren asesoria antes de elegir o reservar.",
    details: "Comparte presupuesto aproximado, ciudad, uso esperado y si prefieres listo o como ingreso.",
    href: buildWhatsappUrl({
      leadSource: "contact_guided_help",
      message:
        "Hola RS Autos HN, quiero comprar un vehiculo importado pero no se que necesito revisar primero. Quiero asesoria."
    })
  }
];

const beforeMessaging = [
  "Enlace, screenshot o nombre del vehiculo si ya tienes uno.",
  "VIN o documento si la duda es sobre titulo, historial o reporte.",
  "Presupuesto aproximado en USD o lempiras.",
  "Ciudad donde quieres coordinar visita o entrega.",
  "Tiempo esperado de compra: inmediato, semanas o explorando.",
  "Preferencia: listo/reparado o vendido como ingreso."
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
                Contacto segun tu decision
              </h1>
              <p className="mt-4 max-w-3xl text-lg leading-8 text-muted">
                Elige el motivo correcto para que WhatsApp llegue con contexto:
                vehiculo publicado, documentos, importacion, busqueda parecida
                o asesoria inicial.
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

        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {contactOptions.map((option) => (
            <article className="glass-card p-5" key={option.title}>
              <option.icon aria-hidden className="text-brandBlue" size={28} />
              <h2 className="mt-4 text-xl font-black text-white">
                {option.title}
              </h2>
              <p className="mt-2 min-h-12 text-sm leading-6 text-muted">
                {option.text}
              </p>
              <div className="mt-4 rounded-[var(--radius)] border border-white/10 bg-black/35 p-3">
                <p className="text-xs font-black uppercase tracking-[0.14em] text-brandRed">
                  Que enviar
                </p>
                <p className="mt-1 text-sm leading-6 text-silver">
                  {option.details}
                </p>
              </div>
              <a className="btn-primary mt-5 w-full px-4" href={option.href}>
                <MessageCircle aria-hidden size={18} />
                Escribir por WhatsApp
              </a>
            </article>
          ))}
        </section>

        <section className="mt-6 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="glass-card p-5">
            <ClipboardCheck aria-hidden className="text-brandRed" size={28} />
            <h2 className="mt-4 text-xl font-black text-white">
              Antes de escribir
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted">
              Entre mas contexto envies, mas precisa sera la respuesta.
            </p>
            <div className="mt-5 grid gap-3">
              {beforeMessaging.map((item) => (
                <p
                  className="flex gap-3 rounded-[var(--radius)] border border-white/10 bg-white/[0.03] p-3 text-sm font-bold leading-6 text-silver"
                  key={item}
                >
                  <ShieldCheck
                    aria-hidden
                    className="mt-0.5 shrink-0 text-brandBlue"
                    size={17}
                  />
                  {item}
                </p>
              ))}
            </div>
          </div>

          <div className="glass-card p-5">
            <Clock aria-hidden className="text-brandRed" size={28} />
            <h2 className="mt-4 text-xl font-black text-white">
              Expectativas de respuesta
            </h2>
            <div className="mt-5 grid gap-3">
              {[
                ["Inventario", "Confirmacion de disponibilidad y siguiente paso."],
                ["Importacion", "Revision inicial de presupuesto, uso y opciones."],
                ["Documentos", "Orientacion sobre datos publicos disponibles."],
                ["Asesoria", "Preguntas para definir que vehiculo conviene buscar."]
              ].map(([label, text]) => (
                <div
                  className="rounded-[var(--radius)] border border-white/10 bg-white/[0.03] p-3"
                  key={label}
                >
                  <p className="font-black text-white">{label}</p>
                  <p className="mt-1 text-sm leading-6 text-muted">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-6">
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
              <Link className="btn-secondary px-5" href="/guia-compra-importados">
                Guia de compra <ArrowRight aria-hidden size={18} />
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
