import { Archivo } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nischaldhungel.com.np";
const gaMeasurementId = process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-G2PBEF46QL";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Nischal Dhungel — Full Stack Developer & Tech Co-Founder",
    template: "%s | Nischal Dhungel",
  },
  description:
    "Nischal Dhungel is a Full Stack Developer and Co-Founder at Garud Labs & Babal Cloud based in Nepal. Specializing in high-performance web applications, scalable cloud backends, React, Next.js, Node.js, and modern digital products.",
  keywords: [
    "Nischal Dhungel",
    "Full Stack Developer",
    "Software Engineer Nepal",
    "React Developer",
    "Next.js Developer",
    "Node.js Developer",
    "Garud Labs",
    "Babal Cloud",
    "Frontend Developer",
    "Backend Developer",
    "Web Developer Portfolio",
    "Cloud Solutions",
    "SaaS Architecture",
    "JavaScript Developer",
    "TypeScript Developer",
  ],
  authors: [{ name: "Nischal Dhungel", url: siteUrl }],
  creator: "Nischal Dhungel",
  publisher: "Nischal Dhungel",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Nischal Dhungel — Full Stack Developer",
    title: "Nischal Dhungel — Full Stack Developer & Tech Co-Founder",
    description:
      "Full Stack Developer and Co-Founder at Garud Labs & Babal Cloud. Building clean, scalable, and performance-driven digital products with React, Next.js, and Node.js.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nischal Dhungel — Full Stack Developer & Tech Co-Founder",
    description:
      "Full Stack Developer and Co-Founder at Garud Labs & Babal Cloud. Building clean, scalable, and performance-driven digital products.",
    creator: "@nischal119",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${archivo.variable}`}>
      <head>
        {/* Google Analytics Tag */}
        {gaMeasurementId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaMeasurementId}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}
      </head>
      <body className="antialiased bg-cream text-ink">{children}</body>
    </html>
  );
}
