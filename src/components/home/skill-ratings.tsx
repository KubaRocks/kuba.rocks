import { getSkillTiers } from "@/lib/data";
import type { SkillTier } from "@/lib/types";
import { SectionHead } from "@/components/ui/section-head";

function TierItems({ tier }: { tier: SkillTier }) {
  switch (tier.kind) {
    case "franchise":
      return (
        <ul className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 xl:border-l xl:border-line">
          {tier.items.map((item) => (
            <li
              key={item.name}
              className="border-b border-line py-3.5 pr-4 last:border-b-0 xl:border-b-0 xl:border-r xl:px-5 xl:pb-1.5 xl:pt-1"
            >
              <b className="block font-display text-[clamp(26px,2.6vw,34px)] font-black uppercase leading-none text-orange">
                {item.name}
              </b>
              <span className="mt-2 block text-[14.5px] leading-[1.45] text-chalk-muted">
                {item.note}
              </span>
            </li>
          ))}
        </ul>
      );
    case "retired":
      return (
        <ul className="rafters relative flex flex-wrap gap-3.5 pt-[18px]">
          {tier.items.map((item) => (
            <li
              key={item.name}
              className="banner w-[calc(33.33%-10px)] bg-chalk px-2 pb-[34px] pt-[18px] text-center text-deep sm:w-[104px]"
            >
              <b className="mt-1.5 block font-display text-[22px] font-black uppercase leading-none tracking-[0.02em]">
                {item.name}
              </b>
              <small className="mt-1.5 block font-mono text-[10px] leading-[1.2] tracking-[0.08em] text-deep/75">
                {item.note}
              </small>
            </li>
          ))}
        </ul>
      );
    default:
      return (
        <ul className="flex flex-wrap content-start gap-2.5">
          {tier.items.map((item) => (
            <li
              key={item.name}
              className={`border bg-deep/50 px-3.5 py-[11px] font-cond text-[17px] font-semibold uppercase leading-none tracking-[0.08em] ${
                tier.kind === "breakout"
                  ? "border-amber text-amber"
                  : "border-chalk/28"
              }`}
            >
              {item.name}
            </li>
          ))}
        </ul>
      );
  }
}

export function SkillRatings() {
  const tiers = getSkillTiers();

  return (
    <section aria-labelledby="skills-title" className="py-[clamp(64px,8vw,110px)]">
      <div className="wrap">
        <SectionHead
          id="skills-title"
          quarter="3rd"
          quarterLabel="QTR"
          title="Skill ratings"
          intro="No made-up percentages. Every tool gets a role on the roster instead."
        />
        <div className="border-t-[3px] border-chalk">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className="grid grid-cols-1 gap-x-10 gap-y-5 border-b border-line py-7 lg:grid-cols-[minmax(220px,300px)_1fr]"
            >
              <div>
                <span className="mb-2.5 inline-block font-mono text-[11px] font-bold uppercase leading-none tracking-[0.18em] text-amber">
                  {tier.tag}
                </span>
                <h3 className="font-display text-[clamp(28px,3vw,38px)] font-black uppercase leading-[0.9] tracking-[0.02em]">
                  {tier.name}
                </h3>
                <p className="mt-2.5 text-[15px] leading-normal text-chalk-muted">
                  {tier.blurb}
                </p>
              </div>
              <TierItems tier={tier} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
