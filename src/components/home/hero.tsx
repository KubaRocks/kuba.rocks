import Link from "next/link";
import { getYearsOfExperience } from "@/lib/fun-facts";

export function Hero() {
  const years = getYearsOfExperience();

  return (
    <section className="relative overflow-hidden py-28 md:py-40">
      {/* Decorative accent line */}
      <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-accent via-accent/20 to-transparent" />

      <div className="mx-auto max-w-[var(--width-content)] px-6">
        <div className="flex flex-col-reverse items-start gap-12 md:flex-row md:items-center md:gap-16">
          <div className="stagger-children max-w-3xl">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
              Full-Stack Developer &amp; Team Leader
            </p>
            <h1 className="mt-6 font-display text-6xl leading-[1.1] tracking-tight md:text-8xl">
              Kuba Florczuk
            </h1>
            <p className="mt-8 text-lg leading-relaxed text-muted md:text-xl">
              Based in Warsaw, Poland with over {years} years of commercial
              experience. When I&apos;m not coding, I spend time with my wife,
              daughter and son, play basketball, read comics, and drink way too
              much coffee.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-accent-foreground transition-all hover:shadow-lg hover:shadow-accent/25"
              >
                Get in touch
                <span className="transition-transform group-hover:translate-x-0.5">
                  &rarr;
                </span>
              </Link>
              <a
                href="/assets/me/CV - Kuba Florczuk - 2026 EN.pdf"
                download
                className="inline-flex items-center rounded-full border border-border px-7 py-3.5 text-sm font-semibold uppercase tracking-wider transition-colors hover:border-foreground hover:bg-foreground hover:text-background"
              >
                Download CV
              </a>
            </div>
          </div>

          {/* Photo with hover swap */}
          <div className="group relative mx-auto shrink-0 md:mx-0">
            <div className="h-52 w-52 overflow-hidden rounded-full border-[6px] border-border/50 shadow-2xl shadow-accent/10 md:h-72 md:w-72">
              {/* Normal photo */}
              <img
                src="/images/me-normal.png"
                alt="Kuba Florczuk"
                className="h-full w-full object-cover transition-opacity duration-300 group-hover:opacity-0"
              />
              {/* Hover photo - absolutely positioned on top */}
              <img
                src="/images/me-hover.png"
                alt="Kuba Florczuk - having fun"
                className="absolute inset-0 m-[6px] h-[calc(100%-12px)] w-[calc(100%-12px)] rounded-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
