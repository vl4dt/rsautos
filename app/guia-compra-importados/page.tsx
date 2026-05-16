import type { Metadata } from "next";
import {
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  ClipboardCheck,
  CircleHelp,
  FileSearch,
  FileText,
  MessageCircle,
  ShieldCheck,
  Wrench,
  type LucideIcon
} from "lucide-react";
import Link from "next/link";

import { FaqSection, type FaqItem } from "@/components/faq-section";
import { WhatsappIntentActions } from "@/components/whatsapp-intent-actions";
import { env } from "@/lib/env";
import {
  buyerGuideSettingsQuery,
  type BuyerGuideSettings
} from "@/lib/queries";
import { getSanityClient, isSanityConfigured } from "@/lib/sanity/client";
import { buildWhatsappUrl } from "@/lib/whatsapp";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Guia para comprar importados",
  description:
    "Guia practica de RS Autos HN para entender titulos, condicion de subasta, reparaciones, documentos y preguntas antes de comprar un vehiculo importado."
};

const fallbackTitleTerms = [
  {
    title: "Clean title",
    text: "Titulo limpio. No significa que el vehiculo este perfecto, solo que el titulo no marca una perdida total segun la informacion disponible."
  },
  {
    title: "Salvage",
    text: "Titulo de perdida o dano declarado. Puede repararse, pero exige revisar fotos, tipo de dano, calidad de reparacion y documentos."
  },
  {
    title: "Rebuilt",
    text: "Vehiculo salvage que paso por un proceso de reconstruccion o inspeccion en su mercado de origen. Aun requiere validacion."
  },
  {
    title: "Flood / water damage",
    text: "Dano por agua. Es una alerta importante porque puede afectar electronica, motor, interior y seguridad a largo plazo."
  },
  {
    title: "Hail damage",
    text: "Dano por granizo. Suele ser cosmetico, pero debe revisarse pintura, vidrios, techo y valor de reparacion."
  },
  {
    title: "Frame damage",
    text: "Posible dano estructural. Requiere revision cuidadosa porque puede afectar seguridad, alineacion y valor de reventa."
  }
];

type GuideTextBlock = {
  _key?: string;
  title?: string;
  label?: string;
  text: string;
};

const checklist: Array<{
  title: string;
  text: string;
  Icon: LucideIcon;
}> = [
  {
    title: "Fotos de origen",
    text: "Pide fotos o evidencia de como estaba el vehiculo cuando se compro o ingreso.",
    Icon: FileSearch
  },
  {
    title: "Estado actual",
    text: "Compara el estado final contra el estado de origen, especialmente si hubo reparaciones.",
    Icon: ClipboardCheck
  },
  {
    title: "Titulo y VIN",
    text: "Valida VIN, titulo, millaje y cualquier reporte disponible antes de apartar.",
    Icon: ShieldCheck
  },
  {
    title: "Reparaciones",
    text: "Pregunta que se reparo, que piezas se usaron y que puntos quedan pendientes.",
    Icon: Wrench
  }
];

const fallbackComparisonRows = [
  {
    label: "Estado de subasta",
    text: "Como estaba el vehiculo al momento de origen: danos, fotos, lote, titulo y contexto inicial."
  },
  {
    label: "Estado actual",
    text: "Como se encuentra ahora: reparaciones, revision mecanica, pendientes, documentos y disponibilidad."
  },
  {
    label: "Decision responsable",
    text: "La compra mejora cuando puedes comparar ambos estados y preguntar por lo que cambio."
  }
];

const fallbackResponsibleQuestions = [
  "Que titulo tiene el vehiculo y que significa ese titulo?",
  "Hay fotos de subasta o de origen disponibles?",
  "Que reparaciones se hicieron y cuales estan pendientes?",
  "Puedo ver VIN, millaje, reporte o documentos disponibles?",
  "El vehiculo se vende como ingreso o ya fue reparado?",
  "Que debo revisar antes de reservar o enviar anticipo?"
];

const fallbackGuideFaqs: FaqItem[] = [
  {
    question: "Un clean title siempre es mejor?",
    answer:
      "No siempre. Es una senal positiva, pero todavia debes revisar millaje, mantenimiento, fotos, inspeccion, historial y condicion actual."
  },
  {
    question: "Un salvage siempre es mala compra?",
    answer:
      "No necesariamente. Depende del tipo de dano, precio, calidad de reparacion, uso esperado y documentacion disponible."
  },
  {
    question: "Que significa vendido como ingreso?",
    answer:
      "Que el vehiculo puede venderse en el estado en que llego, sin completar reparaciones. El comprador debe entender claramente pendientes y riesgos."
  },
  {
    question: "Que deberia pedir antes de apartar?",
    answer:
      "Ficha del vehiculo, fotos, VIN, estado de titulo, resumen de reparaciones, documentos disponibles y cualquier punto pendiente de inspeccion."
  }
];

const sanityFetchOptions =
  process.env.NODE_ENV === "development"
    ? { cache: "no-store" as const }
    : { next: { revalidate } };

export default async function GuiaCompraImportadosPage() {
  const buyerGuide = isSanityConfigured
    ? await getSanityClient().fetch<BuyerGuideSettings | null>(
        buyerGuideSettingsQuery,
        {},
        sanityFetchOptions
      )
    : null;
  const heroEyebrow = buyerGuide?.heroEyebrow || "Compra informado";
  const heroTitle = buyerGuide?.heroTitle || "Guia para comprar importados";
  const heroBody =
    buyerGuide?.heroBody ||
    `Una guia practica para entender titulos de USA, condicion de subasta, reparaciones, documentos y preguntas clave antes de comprar un vehiculo importado en ${env.primaryMarket}.`;
  const ruleTitle = buyerGuide?.ruleTitle || "Regla principal";
  const ruleText =
    buyerGuide?.ruleText ||
    "No decidas solo por precio o fotos bonitas. Revisa titulo, condicion de origen, estado actual, reparaciones y documentos disponibles.";
  const titleTerms: GuideTextBlock[] =
    buyerGuide?.terms && buyerGuide.terms.length > 0
      ? buyerGuide.terms
      : fallbackTitleTerms;
  const comparisonRows: GuideTextBlock[] =
    buyerGuide?.comparisonRows && buyerGuide.comparisonRows.length > 0
      ? buyerGuide.comparisonRows
      : fallbackComparisonRows;
  const checklistItems: GuideTextBlock[] =
    buyerGuide?.checklist && buyerGuide.checklist.length > 0
      ? buyerGuide.checklist
      : checklist;
  const responsibleQuestions =
    buyerGuide?.responsibleQuestions &&
    buyerGuide.responsibleQuestions.length > 0
      ? buyerGuide.responsibleQuestions.map((item) => item.question)
      : fallbackResponsibleQuestions;
  const guideFaqs: FaqItem[] =
    buyerGuide?.faqs && buyerGuide.faqs.length > 0
      ? buyerGuide.faqs.map((item) => ({
          answer: item.answer,
          question: item.question
        }))
      : fallbackGuideFaqs;

  return (
    <main className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <section className="mb-8 overflow-hidden rounded-[var(--radius)] border border-white/10 bg-black/35 p-6 shadow-glass">
          <div className="grid gap-6 lg:grid-cols-[1fr_23rem] lg:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.18em] text-brandRed">
                {heroEyebrow}
              </p>
              <h1 className="metal-heading mt-3 text-4xl uppercase leading-tight sm:text-5xl lg:text-6xl">
                {heroTitle}
              </h1>
              <p className="mt-4 max-w-3xl text-lg leading-8 text-muted">
                {heroBody}
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link className="btn-primary px-6" href="/inventory">
                  Ver inventario <ArrowRight aria-hidden size={19} />
                </Link>
                <a
                  className="btn-secondary px-6"
                  href={buildWhatsappUrl({
                    leadSource: "buyer_guide",
                    message:
                      "Hola RS Autos HN, quiero asesoria para entender un vehiculo importado antes de comprar."
                  })}
                >
                  <MessageCircle aria-hidden size={18} />
                  Consultar una duda
                </a>
              </div>
            </div>
            <div className="glass-card p-5">
              <AlertTriangle aria-hidden className="text-brandRed" size={28} />
              <h2 className="mt-4 text-xl font-black text-white">
                {ruleTitle}
              </h2>
              <p className="mt-2 text-sm leading-6 text-muted">
                {ruleText}
              </p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="section-title">Terminos que debes entender</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {titleTerms.map((term) => (
              <article
                className="glass-card p-5"
                key={term._key ?? term.title ?? term.text}
              >
                <FileText aria-hidden className="text-brandBlue" size={24} />
                <h3 className="mt-4 text-xl font-black text-white">
                  {term.title ?? "Termino importante"}
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted">
                  {term.text}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-8 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="glass-card p-6">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-brandRed">
              Subasta vs actual
            </p>
            <h2 className="mt-2 text-2xl font-black text-white">
              Compara dos momentos distintos
            </h2>
            <div className="mt-5 grid gap-3">
              {comparisonRows.map((row) => (
                <InfoRow
                  key={row._key ?? row.label ?? row.text}
                  label={row.label ?? "Punto de comparacion"}
                  text={row.text}
                />
              ))}
            </div>
          </div>

          <div className="glass-card p-6">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-brandRed">
              Checklist basico
            </p>
            <h2 className="mt-2 text-2xl font-black text-white">
              Que revisar antes de avanzar
            </h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {checklistItems.map(({ text, title }, index) => {
                const Icon = checklist[index]?.Icon ?? ClipboardCheck;

                return (
                <article
                  className="rounded-[var(--radius)] border border-white/10 bg-white/[0.035] p-4"
                  key={title ?? text}
                >
                  <Icon aria-hidden className="text-brandBlue" size={22} />
                  <h3 className="mt-3 font-black text-white">
                    {title ?? "Punto de revision"}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-muted">{text}</p>
                </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="mb-8 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="glass-card p-6">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-brandRed">
              Preguntas utiles
            </p>
            <h2 className="mt-2 text-2xl font-black text-white">
              Antes de reservar o enviar anticipo
            </h2>
            <div className="mt-5 grid gap-3">
              {responsibleQuestions.map((question) => (
                <p
                  className="flex gap-3 rounded-[var(--radius)] border border-white/10 bg-black/35 p-3 text-sm font-bold leading-6 text-silver"
                  key={question}
                >
                  <BadgeCheck
                    aria-hidden
                    className="mt-0.5 shrink-0 text-brandRed"
                    size={18}
                  />
                  {question}
                </p>
              ))}
            </div>
          </div>

          <div className="glass-card p-6">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-brandRed">
              Como ayuda RS Autos
            </p>
            <h2 className="mt-2 text-2xl font-black text-white">
              Transparencia sin exponer operacion interna
            </h2>
            <p className="mt-4 leading-7 text-muted">
              RS Autos puede mostrar informacion publica para evaluar el
              vehiculo: condicion, fotos, VIN, inspeccion, reparaciones y
              documentos disponibles. Los costos internos de adquisicion,
              margen y desglose operativo no forman parte de la ficha publica.
            </p>
            <Link className="btn-secondary mt-6 px-6" href="/sobre-nosotros">
              Ver proceso RS Autos <ArrowRight aria-hidden size={18} />
            </Link>
          </div>
        </section>

        <section className="mb-8">
          <WhatsappIntentActions
            description="Elige la duda mas cercana a tu caso y WhatsApp se abre con contexto para que RS Autos pueda responder mejor."
            intents={[
              {
                icon: FileText,
                label: "Tengo duda sobre un titulo",
                leadSource: "guide_title_question",
                message:
                  "Hola RS Autos HN, tengo duda sobre un titulo de USA y quiero entender que significa antes de comprar."
              },
              {
                icon: ShieldCheck,
                label: "Quiero revisar un VIN",
                leadSource: "guide_vin_review",
                message:
                  "Hola RS Autos HN, quiero revisar un VIN o historial disponible antes de tomar una decision."
              },
              {
                icon: AlertTriangle,
                label: "Quiero evaluar un salvage",
                leadSource: "guide_salvage_review",
                message:
                  "Hola RS Autos HN, quiero saber si un vehiculo salvage vale la pena segun fotos, dano y reparacion."
              },
              {
                icon: CircleHelp,
                label: "No se que preguntar",
                leadSource: "guide_general_question",
                message:
                  "Hola RS Autos HN, quiero comprar un importado pero no se que debo revisar primero."
              }
            ]}
            title="Pregunta con contexto"
          />
        </section>

        <FaqSection items={guideFaqs} title="Preguntas frecuentes" />
      </div>
    </main>
  );
}

function InfoRow({ label, text }: { label: string; text: string }) {
  return (
    <div className="rounded-[var(--radius)] border border-white/10 bg-white/[0.03] p-4">
      <p className="text-xs font-black uppercase tracking-[0.16em] text-brandRed">
        {label}
      </p>
      <p className="mt-2 text-sm font-semibold leading-6 text-silver">
        {text}
      </p>
    </div>
  );
}
