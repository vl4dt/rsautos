import { MessageCircle } from "lucide-react";

import { buildWhatsappUrl } from "@/lib/whatsapp";

export function EmptyInventory() {
  return (
    <section className="glass-card mx-auto max-w-2xl p-8 text-center">
      <h2 className="text-2xl font-black">Inventario en preparacion</h2>
      <p className="mt-3 text-muted">
        No hay vehiculos publicados con estos filtros. Escríbenos por WhatsApp
        para recibir opciones disponibles o asistencia de importacion.
      </p>
      <a className="btn-primary mt-6 px-6" href={buildWhatsappUrl()}>
        <MessageCircle aria-hidden size={18} />
        Consultar por WhatsApp
      </a>
    </section>
  );
}
