import { Bell, MessageCircle, SearchCheck } from "lucide-react";

import { WhatsappIntentActions } from "@/components/whatsapp-intent-actions";

export function EmptyInventory() {
  return (
    <section className="glass-card neon-panel mx-auto max-w-2xl p-8 text-center">
      <div className="relative z-10">
        <h2 className="text-2xl font-black">Inventario en preparacion</h2>
        <p className="mt-3 text-muted">
          No hay vehiculos publicados con estos filtros. Escribenos por WhatsApp
          para recibir opciones disponibles o asistencia de importacion.
        </p>
        <div className="mt-6 text-left">
          <WhatsappIntentActions
            compact
            eyebrow="Siguiente paso"
            framed={false}
            intents={[
              {
                icon: Bell,
                label: "Avisarme de nuevos ingresos",
                leadSource: "empty_inventory_notify",
                message:
                  "Hola RS Autos HN, quiero que me avisen cuando publiquen nuevos vehiculos disponibles."
              },
              {
                icon: SearchCheck,
                label: "Ayudenme a buscar uno",
                leadSource: "empty_inventory_search_help",
                message:
                  "Hola RS Autos HN, no encontre lo que buscaba en inventario y quiero ayuda para buscar una opcion."
              },
              {
                icon: MessageCircle,
                label: "Consulta general",
                leadSource: "empty_inventory_general",
                message:
                  "Hola RS Autos HN, quiero informacion sobre vehiculos importados disponibles."
              }
            ]}
            title="Que quieres hacer?"
          />
        </div>
      </div>
    </section>
  );
}
