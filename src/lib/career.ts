import type { Experience } from "./types";

const DAY_MS = 24 * 60 * 60 * 1000;
const YEAR_MS = 365.25 * DAY_MS;

/** "2024–now", "2023", "2021–25" */
export function formatSeasons(start: string, end: string | null): string {
  const startYear = new Date(start).getUTCFullYear();
  if (!end) return `${startYear}–now`;
  const endYear = new Date(end).getUTCFullYear();
  if (endYear === startYear) return String(startYear);
  return `${startYear}–${String(endYear).slice(-2)}`;
}

/** Tenure in years, rounded to a tenth. End dates are inclusive. */
export function getTenureYears(
  start: string,
  end: string | null,
  now: Date = new Date()
): number {
  const startMs = new Date(start).getTime();
  const endMs = end ? new Date(end).getTime() + DAY_MS : now.getTime();
  return Math.round(((endMs - startMs) / YEAR_MS) * 10) / 10;
}

export function isLeadershipRole(title: string): boolean {
  return /\b(lead|leader|cto|owner)\b/i.test(title);
}

export function getTeamCount(experience: Experience[]): number {
  return new Set(experience.map((e) => e.company)).size;
}

export function getCurrentTeam(experience: Experience[]): string {
  return experience.find((e) => e.endDate === null)?.company ?? "";
}
