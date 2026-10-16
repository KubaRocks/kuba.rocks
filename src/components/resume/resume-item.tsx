import { LeadershipBadge } from "@/components/ui/leadership-badge";

interface ResumeItemProps {
  /** Team or institution */
  heading: string;
  /** Role or course */
  subheading: string;
  date: string;
  tenure?: string;
  leadership?: boolean;
  description?: string | null;
  highlights?: string[];
}

const TECH_PREFIX = /^technologies:\s*/i;
// Commas outside parentheses, so "Amazon AWS (SQS, SNS)" stays one item
const TECH_SEPARATOR = /,\s*(?![^()]*\))/;

/** One row of the career log: dates on the left, team and details on the right. */
export function ResumeItem({
  heading,
  subheading,
  date,
  tenure,
  leadership = false,
  description,
  highlights = [],
}: ResumeItemProps) {
  // "Technologies: A, B, C" highlights are shown as chips instead of bullets
  const tech = highlights
    .filter((h) => TECH_PREFIX.test(h))
    .flatMap((h) => h.replace(TECH_PREFIX, "").split(TECH_SEPARATOR))
    .filter(Boolean);
  const bullets = highlights.filter((h) => !TECH_PREFIX.test(h));

  return (
    <article className="grid grid-cols-1 gap-x-10 gap-y-3 border-b border-line py-8 transition-[box-shadow] hover:shadow-[inset_4px_0_0_var(--color-orange)] md:grid-cols-[200px_1fr] md:pl-5">
      <div>
        <p className="font-mono text-sm uppercase leading-[1.4] tracking-[0.08em] text-chalk-muted">
          {date}
        </p>
        {tenure && (
          <p className="mt-2 font-mono text-lg font-bold leading-none text-amber">
            {tenure}
          </p>
        )}
      </div>
      <div>
        <h3 className="font-cond text-[clamp(22px,2.4vw,30px)] font-bold uppercase leading-[1.1] tracking-[0.02em]">
          {heading}
          {leadership && <LeadershipBadge />}
        </h3>
        <p className="mt-1 text-[17px] font-medium text-orange">{subheading}</p>
        {description && (
          <p className="mt-4 max-w-[62ch] leading-relaxed text-chalk-muted">
            {description}
          </p>
        )}
        {bullets.length > 0 && (
          <ul className="mt-4 max-w-[62ch] space-y-1.5">
            {bullets.map((h, i) => (
              <li
                key={`${i}-${h}`}
                className="flex items-start gap-3 leading-relaxed text-chalk-muted"
              >
                <span
                  aria-hidden="true"
                  className="mt-[0.7em] h-[2px] w-3 shrink-0 bg-orange"
                />
                {h}
              </li>
            ))}
          </ul>
        )}
        {tech.length > 0 && (
          <ul aria-label="Technologies" className="mt-5 flex flex-wrap gap-2">
            {tech.map((t, i) => (
              <li
                key={`${i}-${t}`}
                className="border border-chalk/28 bg-deep/50 px-2.5 py-1.5 font-cond text-sm font-semibold uppercase leading-none tracking-[0.08em]"
              >
                {t}
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}
