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
    <div className="relative pl-8 pb-8 border-l border-border last:pb-0">
      <div className="absolute -left-1.5 top-1.5 h-3 w-3 rounded-full bg-accent" />
      <p className="text-sm text-muted mb-1">{date}</p>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-accent">{subtitle}</p>
      {description && <p className="mt-2 text-muted">{description}</p>}
      {highlights && highlights.length > 0 && (
        <ul className="mt-2 space-y-1">
          {highlights.map((h, i) => (
            <li key={i} className="text-sm text-muted">
              &bull; {h}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
