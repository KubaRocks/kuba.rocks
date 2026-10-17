import type { Metadata } from "next";

export const SITE_URL = "https://kuba.rocks";
export const SITE_NAME = "kuba.rocks";

export const PERSON = {
  name: "Kuba Florczuk",
  jobTitle: "Full-Stack Developer & Team Leader",
  city: "Warsaw",
  country: "PL",
  photo: "/images/me-normal.png",
} as const;

export const SITE_DESCRIPTION =
  "Kuba Florczuk is a full-stack developer and team leader in Warsaw, Poland, shipping TypeScript, React, Next.js and Go since 2004, plus LLM features in production.";

export const DEFAULT_TITLE = `${PERSON.name} — Full-Stack Developer | ${SITE_NAME}`;

/** Profiles that belong to Kuba, for structured data and llms.txt */
export const PROFILES = [
  { name: "GitHub", url: "https://github.com/KubaRocks" },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/kubaflorczuk/" },
  { name: "Instagram", url: "https://www.instagram.com/kuba_rocks/" },
  { name: "Twitter", url: "https://twitter.com/KubaRocks" },
] as const;

export const CV_PATH = "/assets/me/CV - Kuba Florczuk - 2026 EN.pdf";

/**
 * Title, description, canonical URL and share tags for one page. Child
 * metadata replaces openGraph and twitter wholesale, dropping the inherited
 * image too, so each page points at app/opengraph-image.tsx again.
 */
export function pageMetadata({
  title,
  description,
  path,
}: {
  /** Omit on the home page to use the default title */
  title?: string;
  description: string;
  path: string;
}): Metadata {
  const shareTitle = title ? `${title} | ${PERSON.name}` : DEFAULT_TITLE;
  const image = {
    url: "/opengraph-image",
    width: 1200,
    height: 630,
    alt: `${PERSON.name}, ${PERSON.jobTitle}`,
  };
  return {
    ...(title && { title }),
    description,
    alternates: { canonical: path },
    openGraph: {
      title: shareTitle,
      description,
      url: path,
      siteName: SITE_NAME,
      locale: "en_US",
      type: "profile",
      firstName: "Kuba",
      lastName: "Florczuk",
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: shareTitle,
      description,
      creator: "@KubaRocks",
      images: [image],
    },
  };
}
