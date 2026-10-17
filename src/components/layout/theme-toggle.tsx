"use client";

import { useLayoutEffect } from "react";
import type { ThemeChoice } from "@/lib/theme";
import {
  setThemeChoice,
  syncThemeToRoot,
  useThemeChoice,
} from "@/lib/use-theme";

const NEXT: Record<ThemeChoice, ThemeChoice> = {
  system: "light",
  light: "dark",
  dark: "system",
};
const LABELS: Record<ThemeChoice, string> = {
  system: "Auto (system)",
  light: "Day game (light)",
  dark: "Night game (dark)",
};

/** Cycles Auto → Light → Dark. Auto follows the operating system setting. */
export function ThemeToggle() {
  // "system" during hydration; React re-renders with the saved choice right after.
  const choice = useThemeChoice();
  const next = NEXT[choice];

  useLayoutEffect(syncThemeToRoot, []);

  return (
    <button
      type="button"
      onClick={() => setThemeChoice(next)}
      aria-label={`Theme: ${LABELS[choice]}. Switch to ${LABELS[next]}`}
      title={`Theme: ${LABELS[choice]}`}
      className="grid h-8 w-8 shrink-0 cursor-pointer place-items-center border border-line text-chalk-muted transition-colors hover:border-orange hover:text-chalk sm:h-9 sm:w-9"
    >
      <ThemeIcons />
    </button>
  );
}

/**
 * All three icons render; CSS shows the one matching html[data-theme], so the
 * icon is right before hydration too (the head script sets the attribute).
 */
function ThemeIcons() {
  const svg = {
    viewBox: "0 0 24 24",
    width: 18,
    height: 18,
    "aria-hidden": true,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "square",
  } as const;

  return (
    <>
      <svg {...svg} className="hidden [:root:not([data-theme])_&]:block">
        <circle cx="12" cy="12" r="8" />
        <path d="M12 4a8 8 0 0 1 0 16Z" fill="currentColor" stroke="none" />
      </svg>
      <svg {...svg} className="hidden [[data-theme=light]_&]:block">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
      <svg {...svg} className="hidden [[data-theme=dark]_&]:block">
        <path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5Z" strokeLinejoin="round" />
      </svg>
    </>
  );
}
