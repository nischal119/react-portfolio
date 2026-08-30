import { Archivo } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata = {
  title: "Nischal Dhungel — Full Stack Developer",
  description:
    "Nischal Dhungel is a Full Stack Developer and Co-Founder at Garud Labs and Babal Cloud, building fast, scalable web products with React, Next.js and Node.js.",
  keywords:
    "Nischal Dhungel, Full Stack Developer, React Developer, Next.js, Node.js, Software Engineer, Garud Labs, Babal Cloud",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${archivo.variable}`}>
      <body className="antialiased bg-cream text-ink">{children}</body>
    </html>
  );
}
