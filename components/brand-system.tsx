import type { LucideIcon } from "lucide-react";
import type { ElementType, ReactNode } from "react";

import { cn } from "@/lib/cn";

type ShellProps<T extends ElementType> = {
  as?: T;
  children: ReactNode;
  className?: string;
};

export function GlassPanel<T extends ElementType = "div">({
  as,
  children,
  className
}: ShellProps<T>) {
  const Component = as ?? "div";

  return <Component className={cn("glass-card", className)}>{children}</Component>;
}

export function NeonPanel<T extends ElementType = "div">({
  as,
  children,
  className
}: ShellProps<T>) {
  const Component = as ?? "div";

  return (
    <Component className={cn("glass-card neon-panel", className)}>
      {children}
    </Component>
  );
}

export function SectionTitle({
  children,
  className
}: {
  children: ReactNode;
  className?: string;
}) {
  return <h2 className={cn("section-title", className)}>{children}</h2>;
}

export function BrandBadge({
  children,
  tone = "blue"
}: {
  children: ReactNode;
  tone?: "blue" | "red" | "silver";
}) {
  return (
    <span
      className={cn(
        "inline-flex min-h-8 items-center rounded-[var(--radius)] border bg-black/45 px-3 py-1 text-xs font-black uppercase text-silver",
        tone === "blue" && "border-brandBlue/35",
        tone === "red" && "border-brandRed/40",
        tone === "silver" && "border-white/15"
      )}
    >
      {children}
    </span>
  );
}

export function StatCard({
  Icon,
  label,
  value
}: {
  Icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <GlassPanel as="article" className="p-5">
      <Icon aria-hidden className="text-silver" size={24} />
      <p className="mt-4 text-xs font-black uppercase tracking-[0.16em] text-muted">
        {label}
      </p>
      <h2 className="mt-1 text-xl font-black text-white">{value}</h2>
    </GlassPanel>
  );
}

export function CtaBand({
  children,
  className
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <NeonPanel
      as="section"
      className={cn(
        "rounded-[var(--radius)] border border-white/10 bg-black/45 p-6 shadow-glass",
        className
      )}
    >
      <div className="relative">{children}</div>
    </NeonPanel>
  );
}
