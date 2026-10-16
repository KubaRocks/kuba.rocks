import Link from "next/link";
import { getExperience, getTestimonials } from "@/lib/data";
import { getCurrentTeam, getTeamCount } from "@/lib/career";
import {
  getYearsOfExperience,
  getCoffeeConsumed,
  GITHUB_REPOS,
} from "@/lib/fun-facts";
import { CourtLines } from "@/components/ui/court-lines";
import { TradingCard } from "./trading-card";

export function Hero() {
  const years = getYearsOfExperience();
  const experience = getExperience();
  const currentTeam = getCurrentTeam(experience);

  const bio = [
    ["Position", "Full-Stack / Team Lead"],
    ["Current team", currentTeam],
    ["Hometown", "Warsaw, PL"],
    ["Rookie season", "2004"],
    ["Off-court", "Dad of two, comics, coffee"],
  ];

  return (
    <section
      aria-labelledby="hero-title"
      className="relative overflow-clip bg-navy bg-[radial-gradient(1200px_600px_at_75%_30%,rgb(242_107_29/0.1),transparent_60%),radial-gradient(900px_700px_at_10%_100%,rgb(8_17_29/0.9),transparent_70%)] pt-[clamp(40px,6vw,80px)]"
    >
      <CourtLines className="-right-[8%] -top-[30px] w-[min(1150px,140vw)]" />
      <div className="wrap">
        {/* DOM order matches the mobile layout (name, card, copy, buttons) so focus
            order follows what is on screen; desktop places the card in column 2. */}
        <div className="relative grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] lg:grid-rows-[1fr_auto_auto_auto_auto_1fr] lg:gap-x-6">
          <p className="eyebrow animate-rise lg:col-start-1 lg:row-start-2 [animation-delay:0.1s] max-sm:gap-2 max-sm:text-[11px] max-sm:tracking-[0.12em] max-sm:before:w-5">
            Player profile <span aria-hidden="true">·</span> No. {years}{" "}
            <span aria-hidden="true">·</span> Warsaw
          </p>
          <h1
            id="hero-title"
            className="mt-[18px] lg:col-start-1 lg:row-start-3 font-display font-black uppercase leading-[0.8] tracking-[-0.01em]"
          >
            <span className="mb-[0.08em] block animate-rise text-[clamp(2.6rem,6vw,5.4rem)] tracking-[0.04em] text-orange [animation-delay:0.2s]">
              Kuba
            </span>
            <span className="relative z-[1] -ml-[0.04em] block animate-slam whitespace-nowrap text-[clamp(4rem,23vw,10rem)] [animation-delay:0.3s] lg:text-[clamp(4.6rem,14.2vw,13.6rem)]">
              Florczuk
            </span>
          </h1>
          <div className="relative grid place-items-center lg:col-start-2 lg:row-[1/-1] lg:self-center pb-2.5 pt-[50px] [--card-w:min(78vw,300px)] sm:[--card-w:clamp(250px,25vw,340px)] lg:min-h-[calc(var(--card-w)*1.6)] lg:pb-[30px] lg:pt-10">
            <div
              aria-hidden="true"
              data-number={years}
              className="jersey animate-jersey text-[calc(var(--card-w)*1.45)] sm:text-[calc(var(--card-w)*1.8)]"
            >
              {years}
            </div>
            <div className="relative z-[2] animate-card">
              <TradingCard
                years={years}
                teams={getTeamCount(experience)}
                repos={GITHUB_REPOS}
                coffee={getCoffeeConsumed()}
                currentTeam={currentTeam}
                signatureMove={getTestimonials()[0].headline}
              />
            </div>
            <p
              aria-hidden="true"
              className="relative z-[2] mt-[22px] animate-fade font-mono text-[11px] uppercase leading-none tracking-[0.2em] text-chalk-faint [animation-delay:1.9s]"
            >
              <span className="[@media(hover:none)]:hidden">Hover or tab</span>
              <span className="hidden [@media(hover:none)]:inline">Tap</span> to
              flip
            </p>
          </div>
          <p className="mt-7 lg:col-start-1 lg:row-start-4 max-w-[34em] animate-rise text-[clamp(16px,1.3vw,19px)] text-chalk-muted [animation-delay:0.6s]">
            <strong className="font-semibold text-chalk">
              Full-Stack Developer &amp; Team Leader.
            </strong>{" "}
            {years} seasons of commercial work since 2004. These days I ship
            React, Next.js and Go at {currentTeam} and wire LLMs into real
            product features. Off the clock it&apos;s my wife, our daughter
            and son, basketball, comics and way too much coffee.
          </p>
          <div className="mt-[30px] lg:col-start-1 lg:row-start-5 flex animate-rise flex-wrap gap-3.5 [animation-delay:0.6s]">
            <Link href="/contact" className="btn btn-primary max-sm:flex-auto">
              Draft Kuba <span className="arrow" aria-hidden="true">&rarr;</span>
            </Link>
            <a
              href="/assets/me/CV - Kuba Florczuk - 2026 EN.pdf"
              download
              className="btn max-sm:flex-auto"
            >
              Scouting file (CV)
            </a>
          </div>
        </div>

        <dl
          aria-label="Player bio"
          className="relative z-[3] mt-[clamp(30px,5vw,56px)] grid grid-cols-2 border-t-2 border-orange bg-deep lg:grid-cols-[1.35fr_1fr_1fr_1fr_1.6fr]"
        >
          {bio.map(([term, value], i) => (
            <div
              key={term}
              style={{ animationDelay: `${1.05 + i * 0.08}s` }}
              className="animate-rise border-b border-r border-line px-5 pb-5 pt-[18px] last:col-span-2 last:border-r-0 even:border-r-0 lg:border-b-0 lg:last:col-span-1 lg:even:border-r"
            >
              <dt className="font-mono text-[11px] uppercase leading-[1.3] tracking-[0.18em] text-orange">
                {term}
              </dt>
              <dd className="mt-1.5 font-cond text-[clamp(18px,1.6vw,23px)] font-semibold uppercase leading-[1.15] tracking-[0.03em]">
                {value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
