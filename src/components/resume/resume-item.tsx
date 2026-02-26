interface ResumeItemProps {
  title: string;
  subtitle: string;
  date: string;
  description?: string | null;
  highlights?: string[];
}

export function ResumeItem({
  title,
  subtitle,
  date,
  description,
  highlights,
}: ResumeItemProps) {
  return (
    <div className="relative border-l border-border pb-10 pl-8 last:pb-0">
      <div className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full border-2 border-accent bg-background" />
      <p className="font-mono text-xs uppercase tracking-widest text-muted">
        {date}
      </p>
      <h3 className="mt-1 text-lg font-semibold">{title}</h3>
      <p className="text-sm font-medium text-accent">{subtitle}</p>
      {description && (
        <p className="mt-3 text-sm leading-relaxed text-muted">
          {description}
        </p>
      )}
      {highlights && highlights.length > 0 && (
        <ul className="mt-3 space-y-1.5">
          {highlights.map((h, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-sm leading-relaxed text-muted"
            >
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent/60" />
              {h}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
