import { ImageResponse } from "next/og";

import { env } from "@/lib/env";

export const alt = `${env.businessName} - vehiculos importados verificados`;
export const contentType = "image/png";
export const size = {
  width: 1200,
  height: 630
};

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "stretch",
          background:
            "linear-gradient(135deg, #05070a 0%, #101624 48%, #020305 100%)",
          color: "white",
          display: "flex",
          fontFamily: "Arial, sans-serif",
          height: "100%",
          overflow: "hidden",
          position: "relative",
          width: "100%"
        }}
      >
        <div
          style={{
            background:
              "linear-gradient(90deg, rgba(229,9,20,0.36), transparent 32%), linear-gradient(270deg, rgba(0,107,255,0.32), transparent 36%)",
            inset: 0,
            position: "absolute"
          }}
        />
        <div
          style={{
            borderRight: "8px solid rgba(229,9,20,0.88)",
            height: 760,
            left: 790,
            position: "absolute",
            top: -64,
            transform: "rotate(28deg)",
            width: 240
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "78px 86px",
            position: "relative",
            width: "100%"
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
            <div
              style={{
                color: "#d6dbe4",
                display: "flex",
                fontSize: 28,
                fontWeight: 900,
                letterSpacing: 4,
                textTransform: "uppercase"
              }}
            >
              {env.primaryMarket} / Inventario transparente
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                fontSize: 86,
                fontWeight: 900,
                letterSpacing: 0,
                lineHeight: 0.92,
                maxWidth: 820,
                textTransform: "uppercase"
              }}
            >
              <span>{env.businessName}</span>
              <span style={{ color: "#e50914" }}>Verificados</span>
            </div>
            <div
              style={{
                color: "#d6dbe4",
                display: "flex",
                fontSize: 32,
                lineHeight: 1.3,
                maxWidth: 780
              }}
            >
              Vehiculos importados con condicion, inspeccion y documentacion clara antes de comprar.
            </div>
          </div>
          <div
            style={{
              alignItems: "center",
              display: "flex",
              gap: 22,
              fontSize: 27,
              fontWeight: 800
            }}
          >
            {["VIN verificable", "Estado actual", "WhatsApp directo"].map(
              (item) => (
                <div
                  key={item}
                  style={{
                    background: "rgba(0,0,0,0.42)",
                    border: "1px solid rgba(214,219,228,0.22)",
                    borderRadius: 18,
                    padding: "16px 22px"
                  }}
                >
                  {item}
                </div>
              )
            )}
          </div>
        </div>
      </div>
    ),
    size
  );
}
