import { HelpCircle } from "lucide-react";

export type FaqItem = {
  question: string;
  answer: string;
};

export function FaqSection({
  items,
  title
}: {
  items: FaqItem[];
  title: string;
}) {
  return (
    <section className="mt-8">
      <div className="mb-4 flex items-center gap-3">
        <HelpCircle aria-hidden className="text-brandRed" size={24} />
        <h2 className="text-xl font-black">{title}</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {items.map((item) => (
          <article className="glass-card p-5" key={item.question}>
            <h3 className="font-black text-white">{item.question}</h3>
            <p className="mt-2 text-sm leading-6 text-muted">{item.answer}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
