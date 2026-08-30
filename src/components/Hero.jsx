"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Mail } from "lucide-react";
import { PROFILE } from "@/lib/content";
import { useHeroScroll } from "@/hooks/useHeroScroll";
import { useSectionScroll } from "@/hooks/useSectionScroll";
import HeroSparkles from "./HeroSparkles";
import HeroIntro from "./HeroIntro";
import HeroPhoto from "./HeroPhoto";

function subscribeNoop() {
  return () => {};
}

export default function Hero() {
  const wrapperRef = useRef(null);
  const titleBottomRef = useRef(null);
  const photoEndRef = useRef(null);
  const photoFloatRef = useRef(null);

  const {
    photoY,
    photoScale,
    photoRotateY,
    photoRotateX,
    measure,
    reduce,
    photoDocked,
    scrollHeight,
  } = useHeroScroll(wrapperRef, titleBottomRef, photoEndRef, photoFloatRef);

  const isClient = useSyncExternalStore(subscribeNoop, () => true, () => false);

  const { handleSectionClick } = useSectionScroll();

  useEffect(() => {
    const t1 = setTimeout(measure, 50);
    const t2 = setTimeout(measure, 400);
    const t3 = setTimeout(measure, 1000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [measure]);

  const bioParts = PROFILE.bio.split(". ");
  const bioFirst = bioParts[0] ? `${bioParts[0]}.` : PROFILE.bio;
  const bioRest = bioParts.slice(1).join(". ");

  return (
    <section id="home" aria-label="Introduction">
      <div ref={wrapperRef} className="relative" style={{ height: scrollHeight }}>
        <div className="sticky top-0 h-svh w-full overflow-hidden pointer-events-none z-20 flex items-center justify-center [perspective:1200px] max-[700px]:[perspective:900px]">
          {isClient && !photoDocked && (
            <HeroPhoto
              ref={photoFloatRef}
              rotateY={photoRotateY}
              rotateX={photoRotateX}
              scale={photoScale}
              style={{ y: photoY }}
            />
          )}
        </div>

        <div className="relative z-10 -mt-svh">
          <div className="relative min-h-svh flex flex-col items-center justify-center px-4 sm:px-8 max-[700px]:py-6">
            <div className="relative w-full max-w-[1180px] mx-auto flex flex-col items-center">
              <div className="relative">
                <HeroSparkles />
                <div className="relative flex flex-col items-center select-none">
                  <motion.p
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: "spring", bounce: 0, duration: 0.7, delay: 0.05 }}
                    className="font-display font-bold uppercase text-ink text-[clamp(0.875rem,3.8vw,1.5rem)] tracking-[0.12em] mb-2 sm:mb-5 max-[700px]:mb-2"
                  >
                    Myself {PROFILE.name} !
                  </motion.p>
                  <motion.h1
                    initial={{ opacity: 0, y: 10, filter: "blur(2px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ type: "spring", bounce: 0, duration: 0.8, delay: 0.1 }}
                    className="font-display font-extrabold uppercase text-ink leading-[0.92] tracking-[-0.02em] text-center text-[clamp(2.25rem,11vw,10.875rem)] max-[700px]:text-[clamp(1.85rem,9.5vw,4.5rem)] max-w-full"
                  >
                    Full Stack
                  </motion.h1>
                  <motion.h1
                    initial={{ opacity: 0, y: 10, filter: "blur(2px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ type: "spring", bounce: 0, duration: 0.8, delay: 0.22 }}
                    className="font-display font-extrabold uppercase text-ink leading-[0.92] tracking-[-0.02em] text-center text-[clamp(2.25rem,11vw,10.875rem)] max-[700px]:text-[clamp(1.85rem,9.5vw,4.5rem)] max-w-full"
                  >
                    Developer
                  </motion.h1>
                  <div ref={titleBottomRef} className="w-px h-px" aria-hidden="true" />
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", bounce: 0, duration: 1.6, delay: 1.4 }}
              className="absolute inset-x-0 bottom-4 sm:bottom-8 px-6 sm:px-12 lg:px-16 flex items-end justify-between max-w-[1180px] mx-auto w-full gap-4 max-[700px]:bottom-3"
            >
              <span className="font-display font-semibold text-3xl sm:text-5xl lg:text-[68px] text-ink leading-none tracking-tight">
                &copy;2026
              </span>
              <span className="text-[10px] sm:text-sm font-medium tracking-widest text-ink-soft uppercase pb-1 text-right max-w-[50%]">
                {PROFILE.since}
              </span>
            </motion.div>

            <div className="absolute top-16 sm:top-28 right-4 sm:right-12 lg:right-16 flex flex-col gap-2 z-30 max-[700px]:top-14">
              <a
                href="#projects"
                onClick={(e) => handleSectionClick(e, "#projects")}
                className="group flex items-center gap-1.5 rounded-lg bg-ink text-cream text-xs sm:text-sm font-medium px-3 sm:px-4 py-2 sm:py-2.5 shadow-md active:scale-95 transition-transform"
              >
                View Projects
                <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a
                href="#contact"
                onClick={(e) => handleSectionClick(e, "#contact")}
                className="group flex items-center gap-1.5 rounded-lg border border-ink/15 bg-cream/80 backdrop-blur text-ink text-xs sm:text-sm font-medium px-3 sm:px-4 py-2 sm:py-2.5 active:scale-95 transition-transform"
              >
                Contact
                <Mail size={14} className="transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>

          <div
            id="bio"
            className="relative min-h-svh flex items-center px-4 sm:px-10 lg:px-14 pt-12 sm:pt-24 lg:pt-0 pb-16 sm:pb-24 max-[700px]:pt-10 max-[700px]:pb-14"
          >
            <div className="w-full max-w-[1180px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_400px_1fr] gap-x-10 gap-y-8 lg:gap-y-0 items-center max-[700px]:gap-y-6">
              <div className="flex flex-col gap-4 sm:gap-5 text-center lg:text-left order-1">
                <h2 className="font-display font-semibold text-ink text-[clamp(2.5rem,8vw,4.75rem)] leading-none tracking-tight">
                  Hey!
                </h2>
                <HeroIntro />
              </div>

              <div
                className="order-2 flex justify-center items-center mx-auto w-full max-w-[min(36vw,160px)] sm:max-w-[220px] lg:max-w-[400px] max-[700px]:max-w-[min(32vw,140px)]"
              >
                <div
                  ref={photoEndRef}
                  className="w-full aspect-[400/456] relative flex items-center justify-center [perspective:1200px]"
                  aria-hidden={!photoDocked}
                >
                  {photoDocked && (
                    <HeroPhoto
                      fill
                      rotateY={180}
                      rotateX={0}
                      scale={1}
                      className="absolute inset-0"
                    />
                  )}
                </div>
              </div>

              <div className="text-center lg:text-left order-3 flex flex-col justify-center">
                <p className="text-ink text-base sm:text-lg leading-relaxed mb-3 max-w-[340px] mx-auto lg:mx-0">
                  {bioFirst}
                </p>
                {bioRest && (
                  <p className="text-ink-soft text-sm sm:text-base leading-relaxed mb-6 max-w-[340px] mx-auto lg:mx-0">
                    {bioRest}
                  </p>
                )}
                <a
                  href="#contact"
                  onClick={(e) => handleSectionClick(e, "#contact")}
                  className="group inline-flex items-center gap-2 text-ink font-semibold text-sm sm:text-base border-b-2 border-ink pb-0.5 hover:opacity-75 transition-opacity mx-auto lg:mx-0"
                >
                  {PROFILE.getStarted}
                  <ArrowUpRight
                    size={16}
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {reduce && (
        <div className="sr-only" aria-live="polite">
          Hero animation reduced for accessibility preferences.
        </div>
      )}
    </section>
  );
}
