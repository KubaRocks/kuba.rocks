import {
  getYearsOfExperience,
  getWorkingHours,
  getCoffeeConsumed,
  GITHUB_REPOS,
} from "@/lib/fun-facts";

interface FunFact {
  label: string;
  value: number;
}

export function FunFacts() {
  const facts: FunFact[] = [
    { label: "Years of Experience", value: getYearsOfExperience() },
    { label: "Working Hours", value: getWorkingHours() },
    { label: "GitHub Repos", value: GITHUB_REPOS },
    { label: "Coffee Consumed", value: getCoffeeConsumed() },
  ];

  return (
    <section className="py-16 md:py-24 bg-card">
      <div className="mx-auto max-w-[var(--width-content)] px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {facts.map((fact) => (
            <div key={fact.label} className="text-center">
              <p className="text-4xl md:text-5xl font-bold text-accent">
                {fact.value.toLocaleString()}
              </p>
              <p className="mt-2 text-muted">{fact.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
