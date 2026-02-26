import Image from "next/image";
import { getTestimonials } from "@/lib/data";

export function Testimonials() {
  const testimonials = getTestimonials();

  return (
    <section className="py-20 md:py-28 bg-card">
      <div className="mx-auto max-w-[var(--width-content)] px-6">
        <div className="mb-12">
          <hr className="divider-ember mb-6" />
          <h2 className="font-display text-4xl tracking-tight md:text-5xl">
            What People Say
          </h2>
        </div>
        <div className="stagger-children grid grid-cols-1 gap-6 md:grid-cols-2">
          {testimonials.map((t) => (
            <blockquote
              key={t.name}
              className="group relative rounded-2xl border border-border bg-background p-8 transition-shadow hover:shadow-lg hover:shadow-accent/5"
            >
              <span className="absolute -top-4 left-8 font-display text-6xl leading-none text-accent/20">
                &ldquo;
              </span>
              <p className="relative mt-2 leading-relaxed text-muted">
                {t.content}
              </p>
              <footer className="mt-6 flex items-center gap-4 border-t border-border/50 pt-6">
                <Image
                  src={t.photo}
                  alt={t.name}
                  width={44}
                  height={44}
                  className="rounded-full ring-2 ring-border"
                />
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-muted">{t.title}</p>
                </div>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
