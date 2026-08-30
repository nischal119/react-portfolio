"use client";

import { usePortfolioData } from "@/hooks/usePortfolioData";
import SmoothScroll from "./SmoothScroll";
import ScrollProgress from "./ScrollProgress";
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

  return (
    <SmoothScroll>
      <div className="relative w-full min-h-screen bg-cream selection:bg-accent selection:text-cream">
        <ScrollProgress />
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
