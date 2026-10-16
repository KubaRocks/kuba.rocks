/** Half-court markings drawn as chalk lines. Position it with className. */
export function CourtLines({ className = "" }: { className?: string }) {
  return (
    <svg className={`court ${className}`} viewBox="0 0 500 471" aria-hidden="true">
      <rect x="1" y="1" width="498" height="469" />
      <rect x="170" y="1" width="160" height="189" />
      <rect x="190" y="1" width="120" height="189" />
      <circle cx="250" cy="190" r="60" />
      <path d="M190 190 A60 60 0 0 1 310 190" strokeDasharray="10 9" />
      <path d="M30 1 L30 140 A237.5 237.5 0 0 0 470 140 L470 1" />
      <path d="M210 52.5 A40 40 0 0 0 290 52.5" />
      <line x1="220" y1="40" x2="280" y2="40" />
      <circle cx="250" cy="52.5" r="7.5" />
      <path d="M190 470 A60 60 0 0 1 310 470" />
      <path d="M230 470 A20 20 0 0 1 270 470" />
    </svg>
  );
}
