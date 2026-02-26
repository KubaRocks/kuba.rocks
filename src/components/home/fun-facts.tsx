import {
  getYearsOfExperience,
  getWorkingHours,
  getCoffeeConsumed,
  GITHUB_REPOS,
} from "@/lib/fun-facts";

interface FunFact {
  label: string;
  value: number;
  suffix?: string;
}

export function FunFacts() {
  const facts: FunFact[] = [
    { label: "Years of Experience", value: getYearsOfExperience(), suffix: "+" },
    { label: "Working Hours", value: getWorkingHours(), suffix: "+" },
    { label: "GitHub Repos", value: GITHUB_REPOS },
    { label: "Coffees Consumed", value: getCoffeeConsumed(), suffix: "+" },
  ];

  return (
    <section className="border-t border-border/50 bg-card py-20 md:py-28">
      <div className="mx-auto max-w-[var(--width-content)] px-6">
        <div className="stagger-children grid grid-cols-2 gap-8 lg:grid-cols-4">
          {facts.map((fact) => (
            <div key={fact.label} className="text-center">
              <p className="font-display text-5xl tracking-tight text-accent md:text-6xl">
                {fact.value.toLocaleString()}
                {fact.suffix && (
                  <span className="text-accent/60">{fact.suffix}</span>
                )}
              </p>
              <p className="mt-3 text-sm uppercase tracking-widest text-muted">
                {fact.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
