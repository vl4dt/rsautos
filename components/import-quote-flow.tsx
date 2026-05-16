"use client";

import {
  Banknote,
  CalendarDays,
  Camera,
  CarFront,
  CheckCircle2,
  ClipboardCheck,
  Fuel,
  Gauge,
  ListChecks,
  MapPin,
  MessageCircle,
  Route,
  ShieldQuestion,
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
  vehicleType: string;
  makeModel: string;
  yearRange: string;
  budget: string;
  fuelType: string;
  useCase: string;
  titleTolerance: string;
  conditionPreference: string;
  timeline: string;
  mustHaves: string[];
};

const initialForm: ImportQuoteForm = {
  name: "",
  city: "",
  vehicleType: "SUV",
  makeModel: "",
  yearRange: "2019-2022",
  budget: "20000-30000",
  fuelType: "Gasolina",
  useCase: "Uso familiar",
  titleTolerance: "No estoy seguro, asesorenme",
  conditionPreference: "Listo o reparado",
  timeline: "30-60 dias",
  mustHaves: ["Bajo riesgo de reparacion"]
};

const yearOptions = [
  { label: "2016-2018", value: "2016-2018" },
  { label: "2019-2022", value: "2019-2022" },
  { label: "2023 o mas reciente", value: "2023+" }
];

const budgetRanges = [
  { max: 20000, min: 15000, value: "15000-20000" },
  { max: 30000, min: 20000, value: "20000-30000" },
  { max: 45000, min: 30000, value: "30000-45000" },
  { min: 45000, value: "45000+" }
];

const fuelOptions = [
  { label: "Gasolina", value: "Gasolina" },
  { label: "Diesel", value: "Diesel" },
  { label: "Hibrido", value: "Hibrido" },
  { label: "Flexible", value: "Flexible" }
];

const vehicleTypeOptions = [
  { label: "Sedan", value: "Sedan" },
  { label: "SUV", value: "SUV" },
  { label: "Pickup", value: "Pickup" },
  { label: "Lujo", value: "Lujo" },
  { label: "Trabajo", value: "Trabajo" },
  { label: "Flexible", value: "Flexible" }
];

const useOptions = [
  { label: "Uso familiar", value: "Uso familiar" },
  { label: "Trabajo", value: "Trabajo" },
  { label: "Ejecutivo", value: "Ejecutivo" },
  { label: "Aventura / 4x4", value: "Aventura / 4x4" }
];

const titleToleranceOptions = [
  { label: "Clean title solamente", value: "Clean title solamente" },
  { label: "Rebuilt aceptable", value: "Rebuilt aceptable" },
  {
    label: "Salvage aceptable si esta documentado",
    value: "Salvage aceptable si esta documentado"
  },
  {
    label: "No estoy seguro, asesorenme",
    value: "No estoy seguro, asesorenme"
  }
];

const conditionOptions = [
  { label: "Listo o reparado", value: "Listo o reparado" },
  { label: "Puede venir como ingreso", value: "Puede venir como ingreso" },
  { label: "Depende del precio", value: "Depende del precio" },
  { label: "Menor riesgo posible", value: "Menor riesgo posible" }
];

const timelineOptions = [
  { label: "Lo antes posible", value: "Lo antes posible" },
  { label: "30-60 dias", value: "30-60 dias" },
  { label: "60-90 dias", value: "60-90 dias" },
  { label: "Estoy comparando", value: "Estoy comparando" }
];

const mustHaveOptions = [
  "AWD / 4x4",
  "Bajo consumo",
  "Uso familiar",
  "Uso de trabajo",
  "Bajo millaje",
  "Bajo riesgo de reparacion",
  "Documentacion fuerte",
  "Buen valor de reventa"
];

export function ImportQuoteFlow({
  usdToHnlRate
}: {
  usdToHnlRate: number;
}) {
  const [form, setForm] = useState<ImportQuoteForm>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const budgetOptions = useMemo(
    () => buildBudgetOptions(usdToHnlRate),
    [usdToHnlRate]
  );

  const completedFields = [
    form.name,
    form.city,
    form.vehicleType,
    form.makeModel,
    form.yearRange,
    form.budget,
    form.fuelType,
    form.useCase,
    form.titleTolerance,
    form.conditionPreference,
    form.timeline,
    form.mustHaves.length ? "must-haves" : ""
  ].filter(Boolean).length;
  const progress = Math.round((completedFields / 12) * 100);
  const whatsappUrl = useMemo(
    () =>
      buildWhatsappUrl({
        leadSource: "import_quote",
        message: `Hola RS Autos HN, quiero cotizar una importacion responsable. Nombre: ${form.name || "pendiente"}. Ciudad de entrega: ${form.city || "pendiente"}. Tipo de vehiculo: ${form.vehicleType}. Vehiculo buscado: ${form.makeModel || "pendiente"}. Año: ${form.yearRange}. Presupuesto: ${form.budget}. Combustible: ${form.fuelType}. Uso principal: ${form.useCase}. Tolerancia de titulo/riesgo: ${form.titleTolerance}. Condicion deseada: ${form.conditionPreference}. Tiempo esperado: ${form.timeline}. Prioridades: ${form.mustHaves.length ? form.mustHaves.join(", ") : "pendiente"}.`
      }),
    [form]
  );

  function updateField(name: keyof ImportQuoteForm, value: string) {
    setSubmitted(false);
    setForm((current) => ({ ...current, [name]: value }));
  }

  function toggleMustHave(value: string) {
    setSubmitted(false);
    setForm((current) => {
      const nextMustHaves = current.mustHaves.includes(value)
        ? current.mustHaves.filter((item) => item !== value)
        : [...current.mustHaves, value];

      return { ...current, mustHaves: nextMustHaves };
    });
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_22rem]">
      <form
        className="glass-card p-5"
        data-analytics-event="form_submit"
        data-lead-source="import_quote"
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
            icon={CarFront}
            label="Tipo de vehiculo"
            onChange={(event) => updateField("vehicleType", event.target.value)}
            options={vehicleTypeOptions}
            value={form.vehicleType}
          />
          <IconSelect
            icon={CalendarDays}
            label="Año objetivo"
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
            icon={ShieldQuestion}
            label="Titulo / riesgo aceptable"
            onChange={(event) => updateField("titleTolerance", event.target.value)}
            options={titleToleranceOptions}
            value={form.titleTolerance}
          />
          <IconSelect
            icon={ClipboardCheck}
            label="Condicion deseada"
            onChange={(event) =>
              updateField("conditionPreference", event.target.value)
            }
            options={conditionOptions}
            value={form.conditionPreference}
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
          <p className="flex items-center gap-2 text-sm font-black text-silver">
            <ListChecks aria-hidden className="text-brandBlue" size={19} />
            Prioridades obligatorias
          </p>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {mustHaveOptions.map((option) => {
              const isSelected = form.mustHaves.includes(option);

              return (
                <button
                  aria-pressed={isSelected}
                  className={`min-h-11 rounded-[var(--radius)] border px-3 py-2 text-left text-sm font-bold transition ${
                    isSelected
                      ? "border-brandRed/60 bg-brandRed/15 text-white"
                      : "border-white/10 bg-white/[0.03] text-muted hover:border-brandBlue/55 hover:text-white"
                  }`}
                  key={option}
                  onClick={() => toggleMustHave(option)}
                  type="button"
                >
                  {option}
                </button>
              );
            })}
          </div>
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
        <SummaryItem label="Tipo" value={form.vehicleType} />
        <SummaryItem label="Vehiculo" value={form.makeModel || "Pendiente"} />
        <SummaryItem label="Presupuesto" value={form.budget} />
        <SummaryItem label="Titulo / riesgo" value={form.titleTolerance} />
        <SummaryItem label="Condicion" value={form.conditionPreference} />
        <SummaryItem
          label="Prioridades"
          value={form.mustHaves.length ? form.mustHaves.join(", ") : "Pendiente"}
        />
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

function buildBudgetOptions(usdToHnlRate: number) {
  return budgetRanges.map((range) => {
    if (!range.max) {
      return {
        label: `Mas de ${compactUsd(range.min)} / ${compactHnl(range.min, usdToHnlRate)}`,
        value: range.value
      };
    }

    return {
      label: `${compactUsd(range.min)}-${compactUsd(range.max)} / ${compactHnl(range.min, usdToHnlRate)}-${compactHnl(range.max, usdToHnlRate)}`,
      value: range.value
    };
  });
}

function compactUsd(value: number) {
  return `$${Math.round(value / 1000)}k`;
}

function compactHnl(value: number, usdToHnlRate: number) {
  return `L ${Math.round((value * usdToHnlRate) / 1000)}k`;
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
