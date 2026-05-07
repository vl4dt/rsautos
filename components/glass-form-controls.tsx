import type { LucideIcon } from "lucide-react";
import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes } from "react";

type IconFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  icon: LucideIcon;
  label: string;
};

type IconSelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  icon: LucideIcon;
  label: string;
  options: Array<{
    label: string;
    value: string;
  }>;
};

export function IconField({
  icon: Icon,
  label,
  ...props
}: IconFieldProps) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-black text-silver">{label}</span>
      <span className="flex min-h-12 items-center gap-3 rounded-xl border border-white/10 bg-black/45 px-4 focus-within:border-brandBlue/70 focus-within:shadow-blueGlow">
        <Icon aria-hidden className="shrink-0 text-brandBlue" size={19} />
        <input
          className="min-w-0 flex-1 bg-transparent text-white outline-none placeholder:text-muted"
          {...props}
        />
      </span>
    </label>
  );
}

export function IconSelect({
  icon: Icon,
  label,
  options,
  ...props
}: IconSelectProps) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-black text-silver">{label}</span>
      <span className="flex min-h-12 items-center gap-3 rounded-xl border border-white/10 bg-black/45 px-4 focus-within:border-brandBlue/70 focus-within:shadow-blueGlow">
        <Icon aria-hidden className="shrink-0 text-brandBlue" size={19} />
        <select
          className="min-w-0 flex-1 bg-transparent text-white outline-none"
          {...props}
        >
          {options.map((option) => (
            <option className="bg-zinc-950 text-white" key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </span>
    </label>
  );
}

export function UploadDropzone({
  description,
  icon: Icon,
  label
}: {
  description: string;
  icon: LucideIcon;
  label: string;
}) {
  return (
    <div className="rounded-xl border border-dashed border-white/18 bg-black/35 p-4">
      <div className="flex items-center gap-3">
        <Icon aria-hidden className="text-brandRed" size={22} />
        <div>
          <p className="font-black text-white">{label}</p>
          <p className="text-sm leading-6 text-muted">{description}</p>
        </div>
      </div>
    </div>
  );
}

export function ProgressSummary({
  children,
  eyebrow,
  title
}: {
  children: ReactNode;
  eyebrow: string;
  title: string;
}) {
  return (
    <aside className="glass-card h-fit p-5">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-brandRed">
        {eyebrow}
      </p>
      <h2 className="mt-2 text-xl font-black text-white">{title}</h2>
      <div className="mt-5 grid gap-3">{children}</div>
    </aside>
  );
}

export function SuccessState({
  children,
  title
}: {
  children: ReactNode;
  title: string;
}) {
  return (
    <div className="rounded-xl border border-emerald-400/20 bg-emerald-400/10 p-4">
      <p className="font-black text-emerald-200">{title}</p>
      <div className="mt-2 text-sm leading-6 text-silver">{children}</div>
    </div>
  );
}
