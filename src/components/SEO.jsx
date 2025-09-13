import { Helmet } from "react-helmet-async";
import PropTypes from "prop-types";

const SEO = ({
  title = "Nischal Dhungel - Full Stack Developer & Software Engineer",
  description = "Experienced Full Stack Developer specializing in React, Node.js, and modern web technologies. Building innovative digital solutions and web applications with expertise in JavaScript, Python, and cloud technologies.",
  keywords = "Full Stack Developer, React Developer, Node.js, JavaScript, Python, Web Development, Software Engineer, Frontend Developer, Backend Developer, Portfolio, Nischal Dhungel",
  image = "https://eki.my.id/Meta.png",
  url = "https://eki.my.id",
  type = "website",
  author = "Nischal Dhungel",
  publishedTime = "2023-01-01T00:00:00Z",
  modifiedTime = new Date().toISOString(),
}) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Nischal Dhungel",
    jobTitle: "Full Stack Developer",
    description: description,
    url: url,
    image: image,
    sameAs: [
      "https://github.com/nischal-dhungel",
      "https://linkedin.com/in/nischal-dhungel",
      "https://instagram.com/nischal_dhungel",
    ],
    knowsAbout: [
      "React",
      "JavaScript",
      "Node.js",
      "Python",
      "Web Development",
      "Full Stack Development",
      "Frontend Development",
      "Backend Development",
    ],
    alumniOf: "Software Engineering",
    worksFor: {
      "@type": "Organization",
      name: "Freelance",
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: "Nepal",
    },
  };

  const websiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Nischal Dhungel Portfolio",
    description: description,
    url: url,
    author: {
      "@type": "Person",
      name: author,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: `${url}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  const portfolioStructuredData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: "Nischal Dhungel Portfolio",
    description: description,
    creator: {
      "@type": "Person",
      name: author,
    },
    dateCreated: publishedTime,
    dateModified: modifiedTime,
    url: url,
    image: image,
    keywords: keywords,
    genre: "Portfolio",
    inLanguage: "en",
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta
        name="robots"
        content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
      />
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />

      {/* Canonical URL */}
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta
        property="og:image:alt"
        content="Nischal Dhungel - Full Stack Developer Portfolio"
      />
      <meta property="og:site_name" content="Nischal Dhungel Portfolio" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta
        name="twitter:image:alt"
        content="Nischal Dhungel - Full Stack Developer Portfolio"
      />
      <meta name="twitter:creator" content="@nischal_dhungel" />
      <meta name="twitter:site" content="@nischal_dhungel" />

      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#6366f1" />
      <meta name="msapplication-TileColor" content="#6366f1" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta
        name="apple-mobile-web-app-status-bar-style"
        content="black-translucent"
      />
      <meta name="apple-mobile-web-app-title" content="Nischal Dhungel" />

      {/* Language and Region */}
      <meta name="language" content="English" />
      <meta name="geo.region" content="NP" />
      <meta name="geo.country" content="Nepal" />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(websiteStructuredData)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(portfolioStructuredData)}
      </script>

      {/* Preconnect to external domains for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link rel="preconnect" href="https://firebase.googleapis.com" />
      <link rel="preconnect" href="https://firestore.googleapis.com" />

      {/* DNS Prefetch for performance */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      <link rel="dns-prefetch" href="//firebase.googleapis.com" />
    </Helmet>
  );
};

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  keywords: PropTypes.string,
  image: PropTypes.string,
  url: PropTypes.string,
  type: PropTypes.string,
  author: PropTypes.string,
  publishedTime: PropTypes.string,
  modifiedTime: PropTypes.string,
};

export default SEO;
