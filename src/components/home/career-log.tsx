import Link from "next/link";
import { getExperience } from "@/lib/data";
import {
  formatSeasons,
  getTeamCount,
  getTenureYears,
  isLeadershipRole,
} from "@/lib/career";
import { getYearsOfExperience } from "@/lib/fun-facts";
import { SectionHead } from "@/components/ui/section-head";
import { LeadershipBadge } from "@/components/ui/leadership-badge";

const SHOWN_ROLES = 8;

export function CareerLog() {
  const experience = getExperience();
  const shown = experience.slice(0, SHOWN_ROLES);
  const notShown = [
    ...new Set(experience.slice(SHOWN_ROLES).map((e) => e.company)),
  ];

  return (
    <section aria-labelledby="career-title" className="py-[clamp(64px,8vw,110px)]">
      <div className="wrap">
        <SectionHead
          id="career-title"
          quarter="2nd"
          quarterLabel="QTR"
          title="Career log"
          intro={`The last ${SHOWN_ROLES} teams. Contract seasons overlap with full-time ones, so the rows don't add up to the career line.`}
        />

        <div className="border-t-[3px] border-chalk">
          <table className="career-log">
            <caption className="sr-only">
              Recent roles with seasons, team, role and years. C marks a
              leadership role.
            </caption>
            <thead>
              <tr>
                <th scope="col" className="w-[15%]">Season(s)</th>
                <th scope="col" className="w-[30%]">Team</th>
                <th scope="col">Role</th>
                <th scope="col" className="w-[8%] text-right">Yrs</th>
              </tr>
            </thead>
            <tbody>
              {shown.map((role) => (
                <tr key={`${role.company}-${role.startDate}`}>
                  <td
                    data-col="season"
                    className="whitespace-nowrap font-mono text-[15px] leading-[1.2] text-chalk-muted"
                  >
                    {formatSeasons(role.startDate, role.endDate)}
                  </td>
                  <td
                    data-col="team"
                    className="font-cond text-[clamp(19px,2vw,26px)] font-bold uppercase leading-[1.1] tracking-[0.02em]"
                  >
                    {role.company}
                    {isLeadershipRole(role.title) && <LeadershipBadge />}
                  </td>
                  <td data-col="role" className="text-base leading-[1.3] text-chalk-muted">
                    {role.title}
                  </td>
                  <td
                    data-col="yrs"
                    className="text-right font-mono text-lg font-bold leading-none text-amber"
                  >
                    {getTenureYears(role.startDate, role.endDate).toFixed(1)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td
                  data-col="season"
                  className="whitespace-nowrap font-mono text-[15px] leading-[1.2] text-chalk-muted"
                >
                  2004–now
                </td>
                <th
                  scope="row"
                  data-col="team"
                  className="font-display text-[26px] font-black uppercase leading-none tracking-[0.06em]"
                >
                  Career · {getTeamCount(experience)} teams
                </th>
                <td data-col="role" className="text-base leading-[1.3]">
                  Developer · Team Lead · CTO
                </td>
                <td
                  data-col="yrs"
                  className="text-right font-mono text-[26px] font-bold leading-none text-amber"
                >
                  {getYearsOfExperience()}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        <div className="mt-7 flex flex-wrap items-center justify-between gap-5">
          <p className="font-mono text-xs leading-[1.4] tracking-[0.06em] text-chalk-faint">
            <span aria-hidden="true" className="mr-2 inline-grid h-4 w-4 place-items-center bg-orange font-display text-[11px] font-black leading-none text-on-accent">
              C
            </span>
            Leadership role. Not shown: {notShown.join(", ")}.
          </p>
          <Link href="/resume" className="text-link">
            Full career log &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
