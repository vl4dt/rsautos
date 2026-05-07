"use client";

import {
  Banknote,
  CalendarDays,
  Camera,
  CarFront,
  CheckCircle2,
  Fuel,
  Gauge,
  MapPin,
  MessageCircle,
  Route,
  User
} from "lucide-react";
import { useMemo, useState } from "react";

import {
  IconField,
  IconSelect,
  ProgressSummary,
  SuccessState,
  UploadDropzone
} from "@/components/glass-form-controls";
import { buildWhatsappUrl } from "@/lib/whatsapp";

type ImportQuoteForm = {
  name: string;
  city: string;
  makeModel: string;
  yearRange: string;
  budget: string;
  fuelType: string;
  useCase: string;
  timeline: string;
};

const initialForm: ImportQuoteForm = {
  name: "",
  city: "",
  makeModel: "",
  yearRange: "2019-2022",
  budget: "20000-30000",
  fuelType: "Gasolina",
  useCase: "Uso familiar",
  timeline: "30-60 dias"
};

const yearOptions = [
  { label: "2016-2018", value: "2016-2018" },
  { label: "2019-2022", value: "2019-2022" },
  { label: "2023 o mas reciente", value: "2023+" }
];

const budgetOptions = [
  { label: "USD 15,000 - 20,000", value: "15000-20000" },
  { label: "USD 20,000 - 30,000", value: "20000-30000" },
  { label: "USD 30,000 - 45,000", value: "30000-45000" },
  { label: "Mas de USD 45,000", value: "45000+" }
];

const fuelOptions = [
  { label: "Gasolina", value: "Gasolina" },
  { label: "Diesel", value: "Diesel" },
  { label: "Hibrido", value: "Hibrido" },
  { label: "Flexible", value: "Flexible" }
];

const useOptions = [
  { label: "Uso familiar", value: "Uso familiar" },
  { label: "Trabajo", value: "Trabajo" },
  { label: "Ejecutivo", value: "Ejecutivo" },
  { label: "Aventura / 4x4", value: "Aventura / 4x4" }
];

const timelineOptions = [
  { label: "Lo antes posible", value: "Lo antes posible" },
  { label: "30-60 dias", value: "30-60 dias" },
  { label: "60-90 dias", value: "60-90 dias" },
  { label: "Estoy comparando", value: "Estoy comparando" }
];

export function ImportQuoteFlow() {
  const [form, setForm] = useState<ImportQuoteForm>(initialForm);
  const [submitted, setSubmitted] = useState(false);

  const completedFields = Object.values(form).filter(Boolean).length;
  const progress = Math.round((completedFields / Object.keys(form).length) * 100);
  const whatsappUrl = useMemo(
    () =>
      buildWhatsappUrl({
        leadSource: "import_quote",
        message: `Hola RS Autos HN, quiero cotizar una importacion. Nombre: ${form.name || "pendiente"}. Ciudad: ${form.city || "pendiente"}. Vehiculo buscado: ${form.makeModel || "pendiente"}. Ano: ${form.yearRange}. Presupuesto: ${form.budget}. Combustible: ${form.fuelType}. Uso: ${form.useCase}. Tiempo esperado: ${form.timeline}.`
      }),
    [form]
  );

  function updateField(name: keyof ImportQuoteForm, value: string) {
    setSubmitted(false);
    setForm((current) => ({ ...current, [name]: value }));
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_22rem]">
      <form
        className="glass-card p-5"
        onSubmit={(event) => {
          event.preventDefault();
          setSubmitted(true);
          window.location.href = whatsappUrl;
        }}
      >
        <div className="grid gap-4 md:grid-cols-2">
          <IconField
            autoComplete="name"
            icon={User}
            label="Nombre"
            onChange={(event) => updateField("name", event.target.value)}
            placeholder="Tu nombre"
            value={form.name}
          />
          <IconField
            autoComplete="address-level2"
            icon={MapPin}
            label="Ciudad"
            onChange={(event) => updateField("city", event.target.value)}
            placeholder="Ciudad en Honduras"
            value={form.city}
          />
          <IconField
            icon={CarFront}
            label="Vehiculo deseado"
            onChange={(event) => updateField("makeModel", event.target.value)}
            placeholder="Ej. Toyota RAV4, Honda CR-V"
            value={form.makeModel}
          />
          <IconSelect
            icon={CalendarDays}
            label="Ano objetivo"
            onChange={(event) => updateField("yearRange", event.target.value)}
            options={yearOptions}
            value={form.yearRange}
          />
          <IconSelect
            icon={Banknote}
            label="Presupuesto"
            onChange={(event) => updateField("budget", event.target.value)}
            options={budgetOptions}
            value={form.budget}
          />
          <IconSelect
            icon={Fuel}
            label="Combustible"
            onChange={(event) => updateField("fuelType", event.target.value)}
            options={fuelOptions}
            value={form.fuelType}
          />
          <IconSelect
            icon={Route}
            label="Uso principal"
            onChange={(event) => updateField("useCase", event.target.value)}
            options={useOptions}
            value={form.useCase}
          />
          <IconSelect
            icon={Gauge}
            label="Tiempo esperado"
            onChange={(event) => updateField("timeline", event.target.value)}
            options={timelineOptions}
            value={form.timeline}
          />
        </div>

        <div className="mt-5">
          <UploadDropzone
            description="En WhatsApp podras enviar capturas de lotes, referencias o ejemplos de vehiculos."
            icon={Camera}
            label="Fotos o referencias"
          />
        </div>

        {submitted ? (
          <div className="mt-5">
            <SuccessState title="Handoff listo">
              Se abrio WhatsApp con el resumen de tu cotizacion de importacion.
            </SuccessState>
          </div>
        ) : null}

        <button className="btn-primary mt-5 w-full px-5" type="submit">
          <MessageCircle aria-hidden size={20} />
          Enviar cotizacion por WhatsApp
        </button>
      </form>

      <ProgressSummary eyebrow="Resumen" title="Cotizacion guiada">
        <div className="h-2 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-brandRed shadow-redGlow"
            style={{ width: `${progress}%` }}
          />
        </div>
        <SummaryItem label="Avance" value={`${progress}% completado`} />
        <SummaryItem label="Vehiculo" value={form.makeModel || "Pendiente"} />
        <SummaryItem label="Presupuesto" value={form.budget} />
        <SummaryItem label="Tiempo" value={form.timeline} />
        <div className="mt-2 rounded-xl border border-white/10 bg-white/[0.03] p-3">
          <p className="flex items-center gap-2 text-sm font-black text-silver">
            <CheckCircle2 aria-hidden className="text-brandBlue" size={18} />
            El mensaje incluye fuente `import_quote` para seguimiento.
          </p>
        </div>
      </ProgressSummary>
    </div>
  );
}

function SummaryItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
      <p className="text-xs font-black uppercase tracking-[0.14em] text-muted">
        {label}
      </p>
      <p className="mt-1 font-black text-white">{value}</p>
    </div>
  );
}
