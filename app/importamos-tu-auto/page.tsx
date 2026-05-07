import type { Metadata } from "next";
import {
  ArrowRight,
  FileSearch,
  MessageCircle,
  Search,
  ShieldCheck,
  type LucideIcon
} from "lucide-react";
import Link from "next/link";

import { FaqSection, type FaqItem } from "@/components/faq-section";
import { ImportQuoteFlow } from "@/components/import-quote-flow";
import { env } from "@/lib/env";
import { buildWhatsappUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Importamos tu auto",
  description:
    "Cotiza la importacion de tu proximo vehiculo a Honduras con asesoria, verificacion y seguimiento por WhatsApp."
};

const importFaqs: FaqItem[] = [
  {
    question: "Que necesito para iniciar?",
    answer:
      "Un presupuesto aproximado, tipo de vehiculo deseado y ciudad de entrega. Con eso RS Autos puede orientar opciones reales."
  },
  {
    question: "Puedo enviar un lote que encontre?",
    answer:
      "Si. El formulario abre WhatsApp y ahi puedes enviar capturas, enlaces o referencias para revision."
  },
  {
    question: "El precio final se confirma de inmediato?",
    answer:
      "Primero se revisan condicion, disponibilidad, costos publicos del proceso y documentacion para preparar una cotizacion responsable."
  },
  {
    question: "Como se da seguimiento?",
    answer:
      "Por WhatsApp con una fuente de lead de importacion, para separar tu caso de consultas de inventario."
  }
];

const flowHighlights: Array<{
  title: string;
  text: string;
  Icon: LucideIcon;
}> = [
  { title: "Busqueda", text: "Opciones por presupuesto, ano, uso y condicion.", Icon: Search },
  { title: "Verificacion", text: "Revision de informacion visible antes de avanzar.", Icon: FileSearch },
  { title: "Handoff", text: "Resumen claro para seguimiento directo por WhatsApp.", Icon: ArrowRight }
];

export default function ImportamosTuAutoPage() {
  return (
    <main className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <section className="mb-6 overflow-hidden rounded-[var(--radius)] border border-white/10 bg-black/35 p-6 shadow-glass">
          <div className="grid gap-6 lg:grid-cols-[1fr_22rem] lg:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.18em] text-brandRed">
                Importacion guiada
              </p>
              <h1 className="metal-heading mt-3 text-4xl uppercase leading-tight sm:text-5xl lg:text-6xl">
                Importamos tu auto a Honduras
              </h1>
              <p className="mt-4 max-w-3xl text-lg leading-8 text-muted">
                Comparte presupuesto, uso y preferencias. El resumen se envia
                por WhatsApp con el contexto necesario para buscar opciones
                verificables.
              </p>
            </div>
            <div className="glass-card p-5">
              <p className="flex items-center gap-2 text-sm font-bold text-muted">
                <ShieldCheck aria-hidden className="text-brandRed" size={18} />
                Mercado
              </p>
              <p className="mt-2 text-xl font-black">{env.primaryMarket}</p>
              <a
                className="btn-secondary mt-5 w-full px-4"
                href={buildWhatsappUrl({
                  leadSource: "import_quote_direct",
                  message:
                    "Hola RS Autos HN, quiero asesorarme para importar un vehiculo."
                })}
              >
                <MessageCircle aria-hidden size={18} />
                Consulta rapida
              </a>
            </div>
          </div>
        </section>

        <section className="mb-6 grid gap-4 md:grid-cols-3">
          {flowHighlights.map(({ Icon, text, title }) => (
            <article className="glass-card p-5" key={title}>
              <Icon aria-hidden className="text-brandBlue" size={24} />
              <h2 className="mt-4 font-black text-white">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted">{text}</p>
            </article>
          ))}
        </section>

        <ImportQuoteFlow />

        <FaqSection items={importFaqs} title="Preguntas de importacion" />

        <section className="mt-8 text-center">
          <Link className="btn-secondary px-6" href="/inventory">
            Ver inventario disponible <ArrowRight aria-hidden size={18} />
          </Link>
        </section>
      </div>
    </main>
  );
}
