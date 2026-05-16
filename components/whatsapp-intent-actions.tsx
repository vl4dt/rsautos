import { ArrowRight, MessageCircle, type LucideIcon } from "lucide-react";

import { cn } from "@/lib/cn";
import { buildWhatsappUrl } from "@/lib/whatsapp";

type WhatsappIntent = {
  icon?: LucideIcon;
  label: string;
  leadSource: string;
  message: string;
};

type WhatsappIntentActionsProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  intents: WhatsappIntent[];
  compact?: boolean;
  framed?: boolean;
};

export function WhatsappIntentActions({
  compact = false,
  description,
  eyebrow = "Consulta guiada",
  framed = true,
  intents,
  title
}: WhatsappIntentActionsProps) {
  return (
    <section
      className={cn(
        framed ? "glass-card p-5" : "p-0",
        compact && framed && "p-4"
      )}
    >
      <p className="text-xs font-black uppercase tracking-[0.16em] text-brandRed">
        {eyebrow}
      </p>
      <h2 className={cn("mt-2 font-black text-white", compact ? "text-xl" : "text-2xl")}>
        {title}
      </h2>
      {description ? (
        <p className="mt-2 text-sm leading-6 text-muted">{description}</p>
      ) : null}
      <div className={cn("mt-5 grid gap-3", compact ? "sm:grid-cols-2" : "md:grid-cols-2")}>
        {intents.map((intent, index) => {
          const Icon = intent.icon ?? MessageCircle;

          return (
            <a
              className={cn(
                "group flex min-h-14 min-w-0 items-center justify-between gap-3 rounded-[var(--radius)] border border-white/10 bg-white/[0.035] px-4 py-3 text-left font-black text-silver transition hover:border-brandRed/45 hover:bg-brandRed/10 hover:text-white",
                index === 0 && !compact && "md:col-span-2"
              )}
              data-analytics-event="whatsapp_click"
              data-lead-source={intent.leadSource}
              href={buildWhatsappUrl({
                leadSource: intent.leadSource,
                message: intent.message
              })}
              key={intent.leadSource}
            >
              <span className="flex min-w-0 items-center gap-3">
                <Icon aria-hidden className="text-brandRed" size={19} />
                <span className="min-w-0 break-words">{intent.label}</span>
              </span>
              <ArrowRight
                aria-hidden
                className="text-muted transition group-hover:text-white"
                size={17}
              />
            </a>
          );
        })}
      </div>
    </section>
  );
}
