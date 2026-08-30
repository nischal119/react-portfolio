"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Award } from "lucide-react";
import Reveal from "./Reveal";

const TOP_BASE = 96;
const TOP_STEP = 36;

function StackCard({ certificate, index, total }) {
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const dim = useTransform(scrollYProgress, [0, 1], [0, 0.28]);
  const isLast = index === total - 1;

  return (
    <div
      ref={cardRef}
      style={{ top: TOP_BASE + index * TOP_STEP }}
      className="sticky mb-6 sm:mb-8"
    >
      <motion.div
        style={isLast ? undefined : { scale }}
        className="relative rounded-[2rem] border border-line bg-white overflow-hidden shadow-[0_20px_50px_rgba(17,17,17,0.12)]"
      >
        <div className="relative h-64 sm:h-80 lg:h-[26rem] bg-ink/5">
          {certificate.Img ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={certificate.Img}
              alt={certificate.Title || "Certificate"}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-ink-soft">
              <Award size={40} />
            </div>
          )}
          {!isLast && (
            <motion.div
              style={{ opacity: dim }}
              className="absolute inset-0 bg-ink pointer-events-none"
            />
          )}
        </div>
        {certificate.Title && (
          <div className="px-6 py-4 flex items-center justify-between gap-3 bg-white">
            <span className="font-display font-semibold text-ink text-sm sm:text-base">
              {certificate.Title}
            </span>
            <Award size={16} className="text-accent shrink-0" />
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default function CertificatesStack({ certificates = [], status = "loading" }) {
  return (
    <section id="certificates" className="section-padding max-w-[1240px] mx-auto">
      <Reveal>
        <h2 className="font-display font-bold text-ink text-[10vw] sm:text-6xl lg:text-7xl tracking-tight mb-14 sm:mb-20">
          Certificates
        </h2>
      </Reveal>

      {status === "loading" && (
        <div className="h-64 sm:h-80 lg:h-[26rem] rounded-[2rem] bg-ink/5 animate-pulse" />
      )}

      {status === "ready" && certificates.length === 0 && (
        <p className="text-ink-soft">Certificates will show up here soon.</p>
      )}

      {status === "ready" && certificates.length > 0 && (
        <div className="max-w-2xl mx-auto">
          {certificates.map((cert, index) => (
            <StackCard
              key={cert.id || index}
              certificate={cert}
              index={index}
              total={certificates.length}
            />
          ))}
        </div>
      )}
    </section>
  );
}
