"use client";

import { useMemo, useState } from "react";
import {
  type StringInputProps,
  useClient,
  useFormValue
} from "sanity";

type VinDecodeResponse = {
  status: "decoded" | "invalid" | "notFound" | "error";
  vin: string;
  modelYear?: string;
  make?: string;
  model?: string;
  trim?: string;
  fuelTypePrimary?: string;
  driveType?: string;
  transmissionStyle?: string;
  errorText?: string;
};

export function VinPrefillInput(props: StringInputProps) {
  const client = useClient({ apiVersion: "2026-05-01" });
  const documentId = useFormValue(["_id"]);
  const currentYear = useFormValue(["year"]);
  const currentDocumentId = typeof documentId === "string" ? documentId : "";
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [message, setMessage] = useState("");
  const normalizedVin = useMemo(
    () => (props.value ?? "").trim().toUpperCase(),
    [props.value]
  );
  const canDecode = normalizedVin.length >= 11 && Boolean(currentDocumentId);

  async function decodeAndPrefill() {
    if (!canDecode) {
      setStatus("error");
      setMessage("Ingresa un VIN de al menos 11 caracteres y guarda el borrador.");
      return;
    }

    setStatus("loading");
    setMessage("Consultando NHTSA vPIC...");

    try {
      const url = new URL("/api/vin/decode", window.location.origin);
      url.searchParams.set("vin", normalizedVin);

      if (typeof currentYear === "number") {
        url.searchParams.set("modelYear", String(currentYear));
      }

      const response = await fetch(url);
      const decoded = (await response.json()) as VinDecodeResponse;

      if (!response.ok || decoded.status !== "decoded") {
        setStatus("error");
        setMessage(decoded.errorText ?? "No se pudo decodificar este VIN.");
        return;
      }

      const specPatch = buildVehicleSpecPatch(decoded);

      if (!Object.keys(specPatch).length) {
        setStatus("error");
        setMessage("NHTSA no devolvio campos utiles para llenar.");
        return;
      }

      await client.patch(currentDocumentId).set(specPatch).commit();
      setStatus("success");
      setMessage(`Ficha actualizada desde NHTSA para ${decoded.vin}.`);
    } catch {
      setStatus("error");
      setMessage("No fue posible consultar el decodificador VIN.");
    }
  }

  return (
    <div>
      {props.renderDefault(props)}
      <div
        style={{
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: "10px",
          marginTop: "0.75rem",
          padding: "0.75rem"
        }}
      >
        <button
          disabled={status === "loading" || !canDecode}
          onClick={decodeAndPrefill}
          style={{
            background: canDecode ? "#e50914" : "#333842",
            border: 0,
            borderRadius: "8px",
            color: "white",
            cursor: canDecode ? "pointer" : "not-allowed",
            fontWeight: 700,
            padding: "0.55rem 0.85rem"
          }}
          type="button"
        >
          {status === "loading"
            ? "Decodificando..."
            : "Decodificar VIN y llenar ficha"}
        </button>
        <p
          style={{
            color:
              status === "success"
                ? "#6ee7b7"
                : status === "error"
                  ? "#fca5a5"
                  : "#a9b3c1",
            fontSize: "0.82rem",
            lineHeight: 1.5,
            margin: "0.6rem 0 0"
          }}
        >
          {message ||
            "Completa VIN y usa NHTSA para prellenar marca, modelo, año y specs publicas."}
        </p>
      </div>
    </div>
  );
}

function buildVehicleSpecPatch(decoded: VinDecodeResponse): Record<string, unknown> {
  const model = [decoded.model, decoded.trim].filter(Boolean).join(" ");
  const title = [decoded.modelYear, decoded.make, model].filter(Boolean).join(" ");
  const mappedFields: Array<[string, unknown]> = [
    ["title", title || undefined],
    ["make", decoded.make],
    ["model", model || decoded.model],
    ["year", toNumber(decoded.modelYear)],
    ["fuelType", decoded.fuelTypePrimary],
    ["drivetrain", decoded.driveType],
    ["transmission", decoded.transmissionStyle]
  ];

  return Object.fromEntries(
    mappedFields.filter(([, value]) => value !== undefined && value !== "")
  );
}

function toNumber(value: string | undefined): number | undefined {
  if (!value) {
    return undefined;
  }

  const parsed = Number(value);

  return Number.isFinite(parsed) ? parsed : undefined;
}
