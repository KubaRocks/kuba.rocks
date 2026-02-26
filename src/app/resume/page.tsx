import type { Metadata } from "next";
import { getExperience, getEducation } from "@/lib/data";
import { ResumeItem } from "@/components/resume/resume-item";

export const metadata: Metadata = {
  title: "Resume",
};

function formatDateRange(start: string, end: string | null): string {
  const startDate = new Date(start);
  const startStr = startDate.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
  if (!end) return `${startStr} — Present`;
  const endDate = new Date(end);
  const endStr = endDate.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
  return `${startStr} — ${endStr}`;
}

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

export default function ResumePage() {
  const experience = getExperience();
  const education = getEducation();

  return (
    <main className="py-20 md:py-32">
      <div className="mx-auto max-w-[var(--width-content)] px-6">
        <div className="mb-16">
          <hr className="divider-ember mb-6" />
          <h1 className="font-display text-5xl tracking-tight md:text-6xl">
            Resume
          </h1>
        </div>

        <div className="grid grid-cols-1 gap-20 lg:grid-cols-2">
          <section>
            <h2 className="mb-10 font-display text-3xl tracking-tight">
              Experience
            </h2>
            {experience.map((exp, i) => (
              <ResumeItem
                key={i}
                title={exp.title}
                subtitle={exp.company}
                date={formatDateRange(exp.startDate, exp.endDate)}
                description={exp.description}
                highlights={exp.highlights}
              />
            ))}
          </section>

          <section>
            <h2 className="mb-10 font-display text-3xl tracking-tight">
              Education
            </h2>
            {education.map((edu, i) => (
              <ResumeItem
                key={i}
                title={edu.title}
                subtitle={edu.institution}
                date={formatDate(edu.date)}
                description={edu.description}
              />
            ))}
          </section>
        </div>
      </div>
    </main>
  );
}
