import { getEducation, getExperience, getSkillTiers } from "./data";
import { isLeadershipRole } from "./career";
import { getYearsOfExperience } from "./fun-facts";
import { CV_PATH, PERSON, PROFILES, SITE_URL } from "./site";

// Plain names for the basketball-themed tiers in data/skills.json5, by tag
const TIER_LABELS: Record<string, string> = {
  "Tier 1": "Core",
  "Tier 2": "Recent focus",
  "Tier 3": "Regular use",
  "Tier 4": "Infrastructure and tooling",
  "Hall of fame": "Earlier career (PHP era)",
};

function formatMonth(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

/**
 * The site as Markdown for language models, following https://llmstxt.org:
 * a summary, links to the pages, then the full career record in plain terms
 * (the pages themselves use basketball wording).
 */
export function buildLlmsTxt(): string {
  const experience = getExperience();
  const education = getEducation();
  const tiers = getSkillTiers();
  const current = experience.find((role) => role.endDate === null);
  const cvUrl = `${SITE_URL}${encodeURI(CV_PATH)}`;

  const lines = [
    `# ${PERSON.name}`,
    "",
    `> ${PERSON.jobTitle} based in ${PERSON.city}, Poland, with ${getYearsOfExperience()} years of commercial work since 2004.${current ? ` Currently ${current.title} at ${current.company}.` : ""} Works mainly in TypeScript, React, Next.js and Go, and integrates LLMs into product features.`,
    "",
    `This is ${PERSON.name}'s personal site. The pages are styled as a basketball player profile: "teams" are employers, "seasons" are years of work, "C" marks a leadership role and "Book a tryout" is the contact form. The sections below state the same facts without the theme.`,
    "",
    "## Pages",
    "",
    `- [Home](${SITE_URL}/): profile, career stats, skills, testimonials and clients`,
    `- [Resume](${SITE_URL}/resume): every role since 2004, plus education and courses`,
    `- [CV (PDF)](${cvUrl}): downloadable CV in English`,
    `- [Contact](${SITE_URL}/contact): contact form and social profiles`,
    "",
    "## Profiles",
    "",
    ...PROFILES.map((profile) => `- [${profile.name}](${profile.url})`),
    "",
    "## Skills",
    "",
    ...tiers.map(
      (tier) =>
        `- ${TIER_LABELS[tier.tag] ?? tier.name}: ${tier.items
          .map((item) => item.name)
          .join(", ")}`
    ),
    "",
    "## Experience",
    "",
    ...experience.flatMap((role) => [
      `### ${role.title}, ${role.company}`,
      "",
      `${formatMonth(role.startDate)} – ${role.endDate ? formatMonth(role.endDate) : "present"}${isLeadershipRole(role.title) ? " · leadership role" : ""}`,
      "",
      ...(role.description ? [role.description, ""] : []),
      ...role.highlights.map((highlight) => `- ${highlight}`),
      ...(role.highlights.length ? [""] : []),
    ]),
    "## Education and courses",
    "",
    ...education.map(
      (entry) => `- ${entry.title}, ${entry.institution} (${formatMonth(entry.date)})`
    ),
    "",
  ];

  return lines.join("\n");
}
