"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NAV_ITEMS, PROFILE } from "@/lib/content";
import { useSectionScroll } from "@/hooks/useSectionScroll";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);
  const { handleSectionClick } = useSectionScroll();

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const diff = latest - lastScrollY.current;
    if (latest < 80) {
      setHidden(false);
    } else if (diff > 8) {
      setHidden(true);
    } else if (diff < -8) {
      setHidden(false);
    }
    lastScrollY.current = latest;
  });

  useEffect(() => {
    const sections = NAV_ITEMS.map((item) => item.href.slice(1));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const onNavClick = (e, href) => {
    handleSectionClick(e, href);
    setIsOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{
        y: hidden && !isOpen ? -100 : 0,
        opacity: 1,
      }}
      transition={{ type: "spring", bounce: 0, duration: 0.4 }}
      className="fixed top-3 sm:top-5 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-2xl"
    >
      <div className="flex items-center justify-between gap-3 rounded-full bg-ink/90 backdrop-blur-xl border border-white/10 px-2 py-2 pl-5 shadow-[0_8px_30px_rgba(17,17,17,0.15)]">
        <a
          href="#home"
          onClick={(e) => onNavClick(e, "#home")}
          className="text-cream font-semibold tracking-tight text-sm sm:text-base"
        >
          {PROFILE.shortName}
        </a>

        <nav className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => onNavClick(e, item.href)}
              className={`relative px-3 py-2 text-sm font-medium rounded-full transition-colors duration-300 ${
                active === item.href.slice(1)
                  ? "text-ink bg-cream"
                  : "text-cream/70 hover:text-cream"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <button
          onClick={() => setIsOpen((v) => !v)}
          className="md:hidden flex items-center justify-center w-9 h-9 rounded-full bg-cream/10 text-cream active:scale-95 transition-transform"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", bounce: 0, duration: 0.3 }}
          className="md:hidden mt-2 rounded-3xl bg-ink/95 backdrop-blur-xl border border-white/10 p-2 shadow-[0_8px_30px_rgba(17,17,17,0.2)]"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => onNavClick(e, item.href)}
              className={`block px-4 py-3 rounded-2xl text-sm font-medium transition-colors ${
                active === item.href.slice(1)
                  ? "text-ink bg-cream"
                  : "text-cream/80 hover:text-cream hover:bg-white/5"
              }`}
            >
              {item.label}
            </a>
          ))}
        </motion.div>
      )}
    </motion.header>
  );
}
