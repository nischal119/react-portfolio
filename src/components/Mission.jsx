"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { PROFILE } from "@/lib/content";

function Word({ word, range, progress }) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <motion.span style={{ opacity }} className="text-ink">
      {word}{" "}
    </motion.span>
  );
}

export default function Mission() {
  const wrapperRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  const revealProgress = useTransform(scrollYProgress, [0, 0.85], [0, 1]);
  const words = PROFILE.mission.split(" ");

  return (
    <section id="mission" ref={wrapperRef} className="relative h-[220vh]">
      <div className="sticky top-0 h-screen flex items-center justify-center px-6 sm:px-10 lg:px-14">
        <p className="font-display font-semibold text-[6.5vw] sm:text-[4vw] lg:text-[3rem] xl:text-[3.4rem] leading-[1.12] tracking-tight max-w-[900px] text-center">
          {words.map((word, i) => {
            const start = i / words.length;
            const end = (i + 1) / words.length;
            return (
              <Word key={i} word={word} range={[start, end]} progress={revealProgress} />
            );
          })}
        </p>
      </div>
    </section>
  );
}
