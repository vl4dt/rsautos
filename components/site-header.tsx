import { SiteHeaderClient } from "@/components/site-header-client";
import { env } from "@/lib/env";
import { buildWhatsappUrl } from "@/lib/whatsapp";

export function SiteHeader() {
  return (
    <SiteHeaderClient
      businessName={env.businessName}
      whatsappUrl={buildWhatsappUrl({
        leadSource: "header",
        message:
          "Hola RS Autos HN, quiero informacion sobre vehiculos importados."
      })}
    />
  );
}
