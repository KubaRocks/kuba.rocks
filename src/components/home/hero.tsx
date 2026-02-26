import Link from "next/link";
import { getYearsOfExperience } from "@/lib/fun-facts";

export function Hero() {
  const years = getYearsOfExperience();

  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-[var(--width-content)] px-6">
        <p className="text-accent font-mono text-sm mb-4">
          Full-Stack Developer &amp; Team Leader
        </p>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
          Kuba Florczuk
        </h1>
        <p className="text-xl text-muted max-w-2xl mb-8">
          Based in Warsaw, Poland with over {years} years of commercial
          experience. When I&apos;m not coding, I spend time with my wife and
          daughter, play basketball, read comics, and drink way too much coffee.
        </p>
        <div className="flex gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center rounded-lg bg-accent px-6 py-3 text-accent-foreground font-medium hover:opacity-90 transition-opacity"
          >
            Get in touch
          </Link>
          <a
            href="/cv.pdf"
            download
            className="inline-flex items-center rounded-lg border border-border px-6 py-3 font-medium hover:bg-card transition-colors"
          >
            Download CV
          </a>
        </div>
      </div>
    </section>
  );
}
