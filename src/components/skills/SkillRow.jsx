"use client";

import { motion } from "framer-motion";
import Reveal from "../Reveal";

export default function SkillRow({ group, index, hovered, setHovered }) {
  const isHovered = hovered === index;

  return (
    <Reveal delay={index * 0.08}>
      <motion.div
        onMouseEnter={() => setHovered(index)}
        onMouseLeave={() => setHovered(null)}
        animate={{
          backgroundColor: isHovered ? "rgba(17,17,17,0.02)" : "rgba(17,17,17,0)",
        }}
        transition={{ duration: 0.25 }}
        className="group grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 md:gap-10 items-start md:items-center py-8 sm:py-10 border-b border-line first:border-t"
      >
        <div className="flex items-start gap-5 sm:gap-8">
          <span className="font-display font-semibold text-sm text-ink-soft/60 pt-1">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3
            className={`font-display font-semibold text-2xl sm:text-3xl lg:text-4xl tracking-tight transition-colors duration-300 ${
              isHovered ? "text-accent" : "text-ink"
            }`}
          >
            {group.title}
          </h3>
        </div>

        <motion.div
          animate={{ x: isHovered ? 4 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
          className="flex flex-wrap items-center gap-x-3 gap-y-2 md:justify-end pl-10 md:pl-0"
        >
          {group.tags.map((tag, tagIndex) => (
            <span key={tag} className="inline-flex items-center gap-3">
              {tagIndex > 0 && (
                <span className="text-ink-soft/30 hidden sm:inline" aria-hidden="true">
                  ·
                </span>
              )}
              <span className="text-sm sm:text-base font-medium text-ink-soft group-hover:text-ink transition-colors">
                {tag}
              </span>
            </span>
          ))}
        </motion.div>
      </motion.div>
    </Reveal>
  );
}
