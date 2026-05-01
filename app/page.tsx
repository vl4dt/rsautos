import { ArrowRight, CheckCircle2, Gauge, ShieldCheck } from "lucide-react";
import Link from "next/link";

import { env } from "@/lib/env";
import { buildWhatsappUrl } from "@/lib/whatsapp";

const trustItems = [
  {
    icon: ShieldCheck,
    title: "Condicion visible",
    text: "Compara el estado de subasta en USA contra el estado actual del lote."
  },
  {
    icon: Gauge,
    title: "Datos tecnicos",
    text: "Millaje, VIN, estado mecanico e inspeccion en una vista clara."
  },
  {
    icon: CheckCircle2,
    title: "Compra asistida",
    text: "Compra reparado o recibe asistencia para importar antes de reparar."
  }
];

export default function HomePage() {
  return (
    <main>
      <section className="relative min-h-[calc(100vh-4.5rem)] overflow-hidden px-4 py-14 sm:px-6 lg:px-8">
        <div className="absolute inset-x-0 top-28 h-48 bg-gradient-to-r from-transparent via-brandRed/30 to-transparent blur-3xl" />
        <div className="absolute inset-x-0 bottom-16 h-44 bg-gradient-to-r from-transparent via-brandBlue/30 to-transparent blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1fr_27rem]">
          <div className="max-w-4xl">
            <p className="mb-5 inline-flex rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-bold text-silver">
              Importacion transparente para {env.primaryMarket}
            </p>
            <h1 className="metal-heading text-5xl leading-tight sm:text-6xl lg:text-7xl">
              {env.businessName}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
              Vehiculos de subastas en USA con historial visible, estado actual
              documentado y contacto directo por WhatsApp para decidir con
              informacion completa.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link className="btn-primary px-6" href="/inventory">
                Ver inventario <ArrowRight aria-hidden size={20} />
              </Link>
              <a className="btn-secondary px-6" href={buildWhatsappUrl()}>
                WhatsApp directo
              </a>
            </div>
          </div>

          <div className="glass-card relative overflow-hidden p-5">
            <div className="absolute inset-x-8 top-8 h-1 bg-gradient-to-r from-brandRed via-white to-brandBlue blur-sm" />
            <div className="rounded-[1rem] border border-white/10 bg-black/50 p-5">
              <div className="mb-7 flex items-center justify-between">
                <span className="text-sm font-bold text-muted">
                  Transparency Toggle
                </span>
                <span className="rounded-full bg-brandRed px-3 py-1 text-xs font-black">
                  EN VIVO
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-brandRed/40 bg-brandRed/10 p-4 shadow-redGlow">
                  <p className="text-xs font-bold text-muted">USA subasta</p>
                  <p className="mt-2 text-2xl font-black">As-Is</p>
                </div>
                <div className="rounded-xl border border-brandBlue/50 bg-brandBlue/10 p-4 shadow-blueGlow">
                  <p className="text-xs font-bold text-muted">Lote local</p>
                  <p className="mt-2 text-2xl font-black">Verificado</p>
                </div>
              </div>
              <div className="mt-6 space-y-3">
                {trustItems.map((item) => (
                  <div
                    className="flex gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4"
                    key={item.title}
                  >
                    <item.icon
                      aria-hidden
                      className="mt-1 shrink-0 text-brandRed"
                      size={20}
                    />
                    <div>
                      <h2 className="font-extrabold">{item.title}</h2>
                      <p className="mt-1 text-sm leading-6 text-muted">
                        {item.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
