interface SectionHeadProps {
  id: string;
  quarter: string;
  quarterLabel: string;
  title: string;
  intro?: React.ReactNode;
  as?: "h1" | "h2";
}

/** Section header with an orange quarter badge, e.g. "2nd QTR — Career log". */
export function SectionHead({
  id,
  quarter,
  quarterLabel,
  title,
  intro,
  as: Heading = "h2",
}: SectionHeadProps) {
  return (
    <header className="mb-[clamp(32px,5vw,56px)] grid grid-cols-1 items-end gap-x-6 gap-y-1.5 sm:grid-cols-[auto_1fr]">
      <span className="qtr self-stretch sm:row-span-2">
        {quarter}
        <small>{quarterLabel}</small>
      </span>
      <Heading
        id={id}
        className="font-display text-[clamp(3rem,7.5vw,6.6rem)] font-black uppercase leading-[0.82] tracking-[-0.005em]"
      >
        {title}
      </Heading>
      {intro && <p className="max-w-[46em] text-chalk-muted">{intro}</p>}
    </header>
  );
}
