"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  once = true,
  as: Component = motion.div,
}) {
  const reduce = useReducedMotion();

  return (
    <Component
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-10% 0px -10% 0px" }}
      transition={{ type: "spring", bounce: 0, duration: 0.7, delay }}
    >
      {children}
    </Component>
  );
}
