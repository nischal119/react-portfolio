import { PROFILE, SOCIAL_LINKS, SKILL_GROUPS } from "@/lib/content";

export default function JsonLd() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nischaldhungel.com.np";

  const allSkills = SKILL_GROUPS.flatMap((g) => g.tags);

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: PROFILE.name,
    givenName: PROFILE.shortName,
    jobTitle: PROFILE.role,
    description: PROFILE.bio,
    url: baseUrl,
    image: `${baseUrl}${PROFILE.photo}`,
    sameAs: SOCIAL_LINKS.map((s) => s.url),
    knowsAbout: allSkills,
    worksFor: [
      {
        "@type": "Organization",
        name: "Garud Labs",
        url: "https://garudlabs.com",
      },
      {
        "@type": "Organization",
        name: "Babal Cloud",
        url: "https://babalcloud.com",
      },
    ],
    address: {
      "@type": "PostalAddress",
      addressCountry: "NP",
    },
  };

  const webSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${PROFILE.name} — Full Stack Developer Portfolio`,
    url: baseUrl,
    description: PROFILE.mission,
    author: {
      "@type": "Person",
      name: PROFILE.name,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
      />
    </>
  );
}
