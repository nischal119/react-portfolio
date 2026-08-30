"use client";

import { useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { useLenis } from "lenis/react";
import { ArrowUp } from "lucide-react";

const SHOW_AFTER = 320;

export default function BackToTop() {
  const reduce = useReducedMotion();
  const lenis = useLenis();
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setVisible(latest > SHOW_AFTER);
  });

  const scrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0, { duration: reduce ? 0 : 1.1 });
      return;
    }

    window.scrollTo({
      top: 0,
      behavior: reduce ? "auto" : "smooth",
    });
  };

  return (
    <motion.button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      initial={false}
      animate={{
        opacity: visible ? 1 : 0,
        y: visible ? 0 : 12,
        pointerEvents: visible ? "auto" : "none",
      }}
      transition={{ type: "spring", bounce: 0, duration: 0.35 }}
      className="fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-40 flex items-center justify-center w-10 h-10 rounded-full border border-accent/35 bg-cream/90 backdrop-blur-md text-ink shadow-[0_0_0_1px_rgba(91,75,255,0.15),0_0_18px_rgba(91,75,255,0.28),0_4px_20px_rgba(17,17,17,0.08)] hover:border-accent/55 hover:shadow-[0_0_0_1px_rgba(91,75,255,0.25),0_0_24px_rgba(91,75,255,0.38),0_4px_20px_rgba(17,17,17,0.1)] active:scale-95 transition-all"
    >
      <ArrowUp size={16} strokeWidth={2.25} />
    </motion.button>
  );
}
