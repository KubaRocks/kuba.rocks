import { Hero } from "@/components/home/hero";
import { BoxScore } from "@/components/home/box-score";
import { CareerLog } from "@/components/home/career-log";
import { SkillRatings } from "@/components/home/skill-ratings";
import { ScoutingReports } from "@/components/home/scouting-reports";
import { Sponsors } from "@/components/home/sponsors";
import { DraftCta } from "@/components/home/draft-cta";

export default function Home() {
  return (
    <main id="main">
      <Hero />
      <BoxScore />
      <CareerLog />
      <div className="halfcourt" aria-hidden="true" />
      <SkillRatings />
      <ScoutingReports />
      <Sponsors />
      <DraftCta />
    </main>
  );
}
