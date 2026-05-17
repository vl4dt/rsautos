"use client";

import { Menu, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { cn } from "@/lib/cn";

const navItems = [
  { href: "/", label: "Inicio" },
  { href: "/inventory", label: "Inventario" },
  { href: "/guia-compra-importados", label: "Guia" },
  { href: "/importamos-tu-auto", label: "Importamos tu auto" },
  { href: "/sobre-nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" }
];

type SiteHeaderClientProps = {
  businessName: string;
  whatsappUrl: string;
};

export function SiteHeaderClient({
  businessName,
  whatsappUrl
}: SiteHeaderClientProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const isActive = (href: string) =>
    (href === "/" && pathname === "/") ||
    (href === "/inventory" && pathname.startsWith("/inventory")) ||
    (href === "/guia-compra-importados" &&
      pathname.startsWith("/guia-compra-importados")) ||
    (href !== "/" && pathname === href);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/82 backdrop-blur-md">
      <nav
        aria-label="Navegacion principal"
        className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
      >
        <Link className="flex min-w-0 items-center gap-3" href="/">
          <Image
            alt={businessName}
            className="h-auto w-32 sm:w-40"
            height={76}
            priority
            src="/images/rs-autos/rs-autos-logo.png"
            width={240}
          />
        </Link>
        <div className="hidden items-center gap-5 lg:flex">
          {navItems.map((item) => (
            <Link
              aria-current={isActive(item.href) ? "page" : undefined}
              className={cn(
                "relative py-7 text-sm font-bold transition hover:text-white",
                isActive(item.href) ? "text-white" : "text-silver"
              )}
              href={item.href}
              key={item.href}
            >
              {item.label}
              {isActive(item.href) ? (
                <span className="absolute bottom-0 left-0 h-0.5 w-full bg-brandRed" />
              ) : null}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <a
            className="btn-primary min-h-10 px-4 text-sm"
            data-analytics-event="whatsapp_click"
            data-lead-source="header"
            href={whatsappUrl}
          >
            <MessageCircle aria-hidden size={18} />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>
          <button
            aria-label="Abrir menu"
            className="grid h-10 w-10 place-items-center rounded-[var(--radius)] border border-white/15 bg-white/[0.04] text-white lg:hidden"
            onClick={() => setIsOpen((value) => !value)}
            type="button"
          >
            <Menu aria-hidden size={20} />
          </button>
        </div>
      </nav>
      {isOpen ? (
        <div className="mx-4 mb-4 grid gap-1 rounded-[var(--radius)] border border-white/12 bg-black/92 p-3 shadow-glass backdrop-blur-md lg:hidden">
          {navItems.map((item) => (
            <Link
              aria-current={isActive(item.href) ? "page" : undefined}
              className={cn(
                "rounded-[var(--radius)] px-3 py-3 text-sm font-bold transition hover:bg-white/[0.05] hover:text-white",
                isActive(item.href)
                  ? "bg-brandRed/12 text-white"
                  : "text-silver"
              )}
              href={item.href}
              key={item.href}
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      ) : null}
    </header>
  );
}
