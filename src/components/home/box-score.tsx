import {
  getYearsOfExperience,
  getWorkingHours,
  getCoffeeConsumed,
  GITHUB_REPOS,
} from "@/lib/fun-facts";
import { SectionHead } from "@/components/ui/section-head";
import { Scoreboard } from "./scoreboard";

export function BoxScore() {
  return (
    <section
      aria-labelledby="stats-title"
      className="bg-[repeating-linear-gradient(90deg,color-mix(in_srgb,var(--color-chalk)_2.2%,transparent)_0_1px,transparent_1px_88px),linear-gradient(180deg,var(--color-deep),color-mix(in_srgb,var(--color-deep)_60%,var(--color-navy))_60%,var(--color-deep))] py-[clamp(64px,8vw,110px)]"
    >
      <div className="wrap">
        <SectionHead
          id="stats-title"
          quarter="1st"
          quarterLabel="QTR"
          title="Box score"
          intro="Live from the home arena. Career numbers, counted from the first season."
        />
        <Scoreboard
          years={getYearsOfExperience()}
          hours={getWorkingHours()}
          coffee={getCoffeeConsumed()}
          repos={GITHUB_REPOS}
          season={new Date().getFullYear()}
        />
      </div>
    </section>
  );
}
