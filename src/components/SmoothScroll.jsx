"use client";

import { useEffect, useRef } from "react";
import { ReactLenis } from "lenis/react";
import { cancelFrame, frame, useReducedMotion } from "framer-motion";

export default function SmoothScroll({ children }) {
  const reduce = useReducedMotion();
  const lenisRef = useRef(null);

  useEffect(() => {
    if (reduce) return;

    function update(data) {
      lenisRef.current?.lenis?.raf(data.timestamp);
    }

    frame.update(update, true);
    return () => cancelFrame(update);
  }, [reduce]);

  if (reduce) {
    return children;
  }

  return (
    <ReactLenis
      ref={lenisRef}
      root
      options={{
        lerp: 0.08,
        smoothWheel: true,
        autoRaf: false,
      }}
    >
      {children}
    </ReactLenis>
  );
}
