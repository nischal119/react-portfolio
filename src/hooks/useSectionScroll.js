"use client";

import { useCallback } from "react";
import { useReducedMotion } from "framer-motion";
import { useLenis } from "lenis/react";

const DEFAULT_OFFSET = -24;
const DEFAULT_DURATION = 1.15;

export function useSectionScroll() {
  const lenis = useLenis();
  const reduce = useReducedMotion();

  const scrollToSection = useCallback(
    (href, options = {}) => {
      const el = typeof href === "string" ? document.querySelector(href) : href;
      if (!el) return;

      const offset = options.offset ?? DEFAULT_OFFSET;
      const duration = reduce ? 0 : (options.duration ?? DEFAULT_DURATION);

      if (lenis) {
        lenis.scrollTo(el, { offset, duration });
        return;
      }

      const top = el.getBoundingClientRect().top + window.scrollY + offset;
      window.scrollTo({
        top,
        behavior: reduce ? "auto" : "smooth",
      });
    },
    [lenis, reduce]
  );

  const handleSectionClick = useCallback(
    (e, href, options) => {
      e.preventDefault();
      scrollToSection(href, options);
    },
    [scrollToSection]
  );

  return { scrollToSection, handleSectionClick };
}
