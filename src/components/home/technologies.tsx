import { getTechnologies } from "@/lib/data";

export function Technologies() {
  const technologies = getTechnologies();

  return (
    <section className="border-y border-border/50 py-20 md:py-28">
      <div className="mx-auto max-w-[var(--width-content)] px-6">
        <div className="mb-12">
          <hr className="divider-ember mb-6" />
          <h2 className="font-display text-4xl tracking-tight md:text-5xl">
            What I Use
          </h2>
        </div>
        <div className="stagger-children grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-border md:grid-cols-2 lg:grid-cols-4">
          {technologies.map((tech) => (
            <div
              key={tech.name}
              className="bg-card p-8 transition-colors hover:bg-card/70"
            >
              <h3 className="font-display text-xl">{tech.name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {tech.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
