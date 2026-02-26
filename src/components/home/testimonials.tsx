import Image from "next/image";
import { getTestimonials } from "@/lib/data";

export function Testimonials() {
  const testimonials = getTestimonials();

  return (
    <section className="py-16 md:py-24 bg-card">
      <div className="mx-auto max-w-[var(--width-content)] px-6">
        <h2 className="text-3xl font-bold mb-12">What People Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((t) => (
            <blockquote
              key={t.name}
              className="rounded-xl border border-border bg-background p-6"
            >
              <p className="text-muted mb-6">&ldquo;{t.content}&rdquo;</p>
              <footer className="flex items-center gap-4">
                <Image
                  src={t.photo}
                  alt={t.name}
                  width={48}
                  height={48}
                  className="rounded-full"
                />
                <div>
                  <p className="font-medium">{t.name}</p>
                  <p className="text-sm text-muted">{t.title}</p>
                </div>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
