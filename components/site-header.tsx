import { MessageCircle } from "lucide-react";
import Link from "next/link";

import { env } from "@/lib/env";
import { buildWhatsappUrl } from "@/lib/whatsapp";

const navItems = [
  { href: "/", label: "Inicio" },
  { href: "/inventory", label: "Inventario" }
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/55 backdrop-blur-xl">
      <nav
        aria-label="Navegacion principal"
        className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
      >
        <Link className="flex items-center gap-3" href="/">
          <span className="grid h-10 w-10 place-items-center rounded-xl border border-brandRed/55 bg-brandRed/15 font-black shadow-redGlow">
            RS
          </span>
          <span className="text-base font-black uppercase text-white">
            {env.businessName}
          </span>
        </Link>
        <div className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <Link
              className="relative text-sm font-bold text-silver transition hover:text-white"
              href={item.href}
              key={item.href}
            >
              {item.label}
              {item.href === "/inventory" ? (
                <span className="absolute -bottom-3 left-0 h-0.5 w-full rounded-full bg-brandRed shadow-redGlow" />
              ) : null}
            </Link>
          ))}
        </div>
        <a className="btn-primary min-h-10 px-4 text-sm" href={buildWhatsappUrl()}>
          <MessageCircle aria-hidden size={18} />
          WhatsApp
        </a>
      </nav>
    </header>
  );
}
