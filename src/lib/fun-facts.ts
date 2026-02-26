export function getYearsOfExperience(): number {
  const start = new Date(2004, 6, 1); // July 2004
  const now = new Date();
  return Math.floor(
    (now.getTime() - start.getTime()) / (365.25 * 24 * 60 * 60 * 1000)
  );
}

export function getWorkingHours(): number {
  const start = new Date(2005, 7, 1); // August 2005
  const now = new Date();
  const months =
    (now.getFullYear() - start.getFullYear()) * 12 +
    (now.getMonth() - start.getMonth());
  return months * 140;
}

export function getCoffeeConsumed(): number {
  const start = new Date(2010, 2, 1); // March 2010
  const now = new Date();
  const days = Math.floor(
    (now.getTime() - start.getTime()) / (24 * 60 * 60 * 1000)
  );
  return Math.round(days * 1.5);
}

export const GITHUB_REPOS = 41;
