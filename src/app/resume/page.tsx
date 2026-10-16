import type { Metadata } from "next";
import Link from "next/link";
import { getExperience, getEducation } from "@/lib/data";
import { getTenureYears, isLeadershipRole } from "@/lib/career";
import { ResumeItem } from "@/components/resume/resume-item";
import { CourtLines } from "@/components/ui/court-lines";
import { SectionHead } from "@/components/ui/section-head";

export const metadata: Metadata = {
  title: "Resume",
};

function formatMonth(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

function formatDateRange(start: string, end: string | null): string {
  return `${formatMonth(start)} — ${end ? formatMonth(end) : "Present"}`;
}

export default function ResumePage() {
  const experience = getExperience();
  const education = getEducation();

  return (
    <main id="main">
      <section
        aria-labelledby="resume-title"
        className="relative overflow-clip bg-[radial-gradient(1000px_500px_at_80%_0%,rgb(242_107_29/0.1),transparent_60%)] pb-[clamp(48px,6vw,80px)] pt-[clamp(48px,7vw,96px)]"
      >
        <CourtLines className="-right-[10%] -top-[60px] w-[min(900px,120vw)]" />
        <div className="wrap relative">
          <p className="eyebrow mb-6 animate-rise">
            Full career log <span aria-hidden="true">·</span> 2004–now
          </p>
          <SectionHead
            as="h1"
            id="resume-title"
            quarter="Full"
            quarterLabel="LOG"
            title="Career log"
            intro="Every team since a summer job in 2004, newest first. C marks a leadership role."
          />
          <div className="flex flex-wrap gap-3.5">
            <a
              href="/assets/me/CV - Kuba Florczuk - 2026 EN.pdf"
              download
              className="btn btn-primary"
            >
              Download CV (PDF) <span className="arrow" aria-hidden="true">&darr;</span>
            </a>
            <Link href="/contact" className="btn">
              Draft Kuba
            </Link>
          </div>
        </div>
      </section>

      <section aria-labelledby="experience-title" className="pb-[clamp(64px,8vw,110px)]">
        <div className="wrap">
          <h2
            id="experience-title"
            className="mb-2 font-mono text-xs font-bold uppercase tracking-[0.18em] text-orange"
          >
            Experience · {experience.length} roles
          </h2>
          <div className="border-t-[3px] border-chalk">
            {experience.map((exp) => (
              <ResumeItem
                key={`${exp.company}-${exp.startDate}`}
                heading={exp.company}
                subheading={exp.title}
                date={formatDateRange(exp.startDate, exp.endDate)}
                tenure={`${getTenureYears(exp.startDate, exp.endDate).toFixed(1)} yrs`}
                leadership={isLeadershipRole(exp.title)}
                description={exp.description}
                highlights={exp.highlights}
              />
            ))}
          </div>
        </div>
      </section>

      <div className="halfcourt" aria-hidden="true" />

      <section
        aria-labelledby="education-title"
        className="py-[clamp(64px,8vw,110px)]"
      >
        <div className="wrap">
          <SectionHead
            id="education-title"
            quarter="Camp"
            quarterLabel="TRAINING"
            title="Training camp"
            intro="School, university and the courses that kept the game sharp."
          />
          <div className="border-t-[3px] border-chalk">
            {education.map((edu) => (
              <ResumeItem
                key={`${edu.institution}-${edu.date}`}
                heading={edu.institution}
                subheading={edu.title}
                date={formatMonth(edu.date)}
                description={edu.description}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
