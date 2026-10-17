import { getExperience, getSkillTiers } from "@/lib/data";
import { getCurrentTeam } from "@/lib/career";
import { PERSON, PROFILES, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

/** schema.org Person and WebSite, so search engines tie the name to the site and profiles */
export function StructuredData() {
  const skills = getSkillTiers()
    .filter((tier) => tier.kind !== "retired")
    .flatMap((tier) => tier.items.map((item) => item.name));

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: PERSON.name,
        url: SITE_URL,
        image: `${SITE_URL}${PERSON.photo}`,
        jobTitle: PERSON.jobTitle,
        description: SITE_DESCRIPTION,
        worksFor: {
          "@type": "Organization",
          name: getCurrentTeam(getExperience()),
        },
        address: {
          "@type": "PostalAddress",
          addressLocality: PERSON.city,
          addressCountry: PERSON.country,
        },
        knowsAbout: skills,
        sameAs: PROFILES.map((profile) => profile.url),
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        inLanguage: "en",
        publisher: { "@id": `${SITE_URL}/#person` },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // Escape "<" so the data can't close the script tag
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
      }}
    />
  );
}
