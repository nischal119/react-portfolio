"use client";

import { usePortfolioData } from "@/hooks/usePortfolioData";
import { usePageView } from "@/hooks/usePageView";
import SmoothScroll from "./SmoothScroll";
import ScrollProgress from "./ScrollProgress";
import BackToTop from "./BackToTop";
import Navbar from "./Navbar";
import Hero from "./Hero";
import Mission from "./Mission";
import Skills from "./Skills";
import Projects from "./Projects";
import CertificatesStack from "./CertificatesStack";
import Contact from "./Contact";
import Footer from "./Footer";

export default function PageClient() {
  const { projects, certificates, status } = usePortfolioData();
  usePageView();

  return (
    <SmoothScroll>
      <div className="relative w-full min-h-screen bg-cream selection:bg-accent selection:text-cream">
        <ScrollProgress />
        <BackToTop />
        <Navbar />
        <main className="w-full">
          <Hero />
          <Mission />
        <Skills />
        <Projects projects={projects} status={status} />
        <CertificatesStack certificates={certificates} status={status} />
        <Contact />
      </main>
        <Footer />
      </div>
    </SmoothScroll>
  );
}
