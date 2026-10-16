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
      className="bg-[repeating-linear-gradient(90deg,rgb(244_241_234/0.022)_0_1px,transparent_1px_88px),linear-gradient(180deg,var(--color-deep),#0A1522_60%,var(--color-deep))] py-[clamp(64px,8vw,110px)]"
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
