import {
  ExternalLink,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Music2,
  Phone,
  MessageCircle,
  Youtube,
  type LucideIcon
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { env } from "@/lib/env";
import {
  siteVisualSettingsQuery,
  type FooterContactItem,
  type FooterContactKind,
  type SiteVisualSettings,
  type SocialLink,
  type SocialPlatform
} from "@/lib/queries";
import { getSanityClient, isSanityConfigured } from "@/lib/sanity/client";
import { buildWhatsappUrl } from "@/lib/whatsapp";

const quickLinks = [
  { href: "/", label: "Inicio" },
  { href: "/inventory", label: "Inventario" },
  { href: "/guia-compra-importados", label: "Guia de compra" },
  { href: "/importamos-tu-auto", label: "Importamos tu auto" },
  { href: "/sobre-nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" }
];

const socialIconMap: Record<SocialPlatform, LucideIcon> = {
  facebook: Facebook,
  instagram: Instagram,
  tiktok: Music2,
  youtube: Youtube
};

const socialLabelMap: Record<SocialPlatform, string> = {
  facebook: "Facebook",
  instagram: "Instagram",
  tiktok: "TikTok",
  youtube: "YouTube"
};

const contactIconMap: Record<FooterContactKind, LucideIcon> = {
  custom: ExternalLink,
  email: Mail,
  location: MapPin,
  phone: Phone,
  whatsapp: MessageCircle
};

const envSocialLinks: SocialLink[] = [
  { platform: "facebook" as const, url: env.facebookUrl },
  { platform: "instagram" as const, url: env.instagramUrl },
  { platform: "youtube" as const, url: env.youtubeUrl },
  { platform: "tiktok" as const, url: env.tiktokUrl }
].filter((link) => link.url);

const fallbackContactItems: FooterContactItem[] = [
  {
    kind: "whatsapp",
    label: env.contactPhone || "WhatsApp directo",
    href: buildWhatsappUrl()
  },
  {
    kind: "location",
    label: env.businessLocation
  }
];

const sanityFetchOptions =
  process.env.NODE_ENV === "development"
    ? { cache: "no-store" as const }
    : { next: { revalidate: 3600 } };

export async function SiteFooter() {
  const siteVisuals = isSanityConfigured
    ? await getSanityClient().fetch<SiteVisualSettings | null>(
        siteVisualSettingsQuery,
        {},
        sanityFetchOptions
      )
    : null;
  const socialLinks =
    siteVisuals?.socialLinks && siteVisuals.socialLinks.length > 0
      ? siteVisuals.socialLinks
      : envSocialLinks;
  const footerContactItems =
    siteVisuals?.footerContactItems && siteVisuals.footerContactItems.length > 0
      ? siteVisuals.footerContactItems
      : fallbackContactItems;

  return (
    <footer className="mt-14 border-t border-white/10 bg-black/55 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.2fr_1fr_1fr_0.8fr]">
        <div>
          <Image
            alt={env.businessName}
            className="h-auto w-44"
            height={76}
            src="/images/rs-autos/rs-autos-logo.png"
            width={240}
          />
          <p className="mt-4 max-w-sm text-sm leading-6 text-muted">
            Vehiculos importados verificados, documentacion clara y asesoria
            directa para comprar con confianza en {env.primaryMarket}.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-black uppercase tracking-wide text-white">
            Enlaces rapidos
          </h2>
          <div className="mt-4 grid gap-3 text-sm font-semibold text-muted">
            {quickLinks.map((link) => (
              <Link className="transition hover:text-white" href={link.href} key={link.href}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-sm font-black uppercase tracking-wide text-white">
            Contáctanos
          </h2>
          <div className="mt-4 grid gap-3 text-sm text-muted">
            {footerContactItems.map((item) => {
              const Icon = contactIconMap[item.kind] ?? ExternalLink;
              const content = (
                <>
                  <Icon
                    aria-hidden
                    className={item.kind === "location" ? "text-silver" : "text-brandRed"}
                    size={18}
                  />
                  <span className="grid">
                    <span>{item.label}</span>
                    {item.value ? (
                      <span className="text-xs text-muted/80">{item.value}</span>
                    ) : null}
                  </span>
                </>
              );

              return item.href ? (
                <a
                  className="flex items-center gap-3 transition hover:text-white"
                  href={item.href}
                  key={item._key ?? `${item.kind}-${item.label}`}
                >
                  {content}
                </a>
              ) : (
                <span
                  className="flex items-center gap-3"
                  key={item._key ?? `${item.kind}-${item.label}`}
                >
                  {content}
                </span>
              );
            })}
          </div>
        </div>

        <div>
          <h2 className="text-sm font-black uppercase tracking-wide text-white">
            Siguenos
          </h2>
          {socialLinks.length > 0 ? (
            <div className="mt-4 flex flex-wrap gap-3">
              {socialLinks.map((link) => {
                const Icon = socialIconMap[link.platform] ?? ExternalLink;

                return (
                  <a
                    aria-label={socialLabelMap[link.platform] ?? "Red social"}
                    className="grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/[0.03] text-silver transition hover:border-brandBlue/60 hover:text-white"
                    href={link.url}
                    key={link._key ?? `${link.platform}-${link.url}`}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <Icon aria-hidden size={18} />
                  </a>
                );
              })}
            </div>
          ) : (
            <p className="mt-4 text-sm leading-6 text-muted">
              Redes sociales configurables desde Sanity o variables de entorno.
            </p>
          )}
        </div>
      </div>
      <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-3 border-t border-white/10 pt-5 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <span>(c) 2026 {env.businessName}. Todos los derechos reservados.</span>
        <span>Confianza, transparencia y calidad en cada proceso.</span>
      </div>
    </footer>
  );
}
