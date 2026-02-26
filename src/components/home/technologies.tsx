import { getTechnologies } from "@/lib/data";

export function Technologies() {
  const technologies = getTechnologies();

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-[var(--width-content)] px-6">
        <h2 className="text-3xl font-bold mb-12">What I Use</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {technologies.map((tech) => (
            <div key={tech.name} className="space-y-3">
              <h3 className="text-xl font-semibold">{tech.name}</h3>
              <p className="text-muted">{tech.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
