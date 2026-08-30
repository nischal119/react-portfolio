"use client";

import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import {
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

const PHOTO_ASPECT = 456 / 400;
const PHOTO_START_GAP = 24;
const PHOTO_START_SCALE = 0.55;

const PHOTO_SIZE_DEFAULT = { w: 160, h: Math.round(160 * PHOTO_ASPECT) };

function getPhotoSize() {
  if (typeof window === "undefined") return PHOTO_SIZE_DEFAULT;

  const vw = window.innerWidth;
  if (vw >= 1280) return { w: 400, h: 456 };
  if (vw >= 810) return { w: 220, h: 251 };
  if (vw >= 640) return { w: 180, h: 205 };

  const w = Math.round(Math.min(160, vw * 0.4));
  return { w, h: Math.round(w * PHOTO_ASPECT) };
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function lerpRange(progress, inputRange, outputRange) {
  const [inMin, inMax] = inputRange;
  const [outMin, outMax] = outputRange;
  const t = clamp((progress - inMin) / (inMax - inMin), 0, 1);
  return outMin + (outMax - outMin) * t;
}

export function useHeroScroll(wrapperRef, titleBottomRef, photoEndRef) {
  const reduce = useReducedMotion();
  const [photoDocked, setPhotoDocked] = useState(reduce);
  const photoStartY = useMotionValue(120);
  const photoEndY = useMotionValue(0);

  const measurePositions = useCallback(() => {
    if (typeof window === "undefined") return;
    if (!titleBottomRef.current || !photoEndRef.current) return;

    const { h: photoH } = getPhotoSize();
    const viewportCenter = window.innerHeight / 2;
    const titleRect = titleBottomRef.current.getBoundingClientRect();
    const endRect = photoEndRef.current.getBoundingClientRect();

    const photoHalfAtStart = (photoH * PHOTO_START_SCALE) / 2;
    const photoCenterAtStart = titleRect.bottom + PHOTO_START_GAP + photoHalfAtStart;
    const startY = photoCenterAtStart - viewportCenter;
    const endY = endRect.top + endRect.height / 2 - viewportCenter;

    photoStartY.set(startY);
    photoEndY.set(endY);
  }, [titleBottomRef, photoEndRef, photoStartY, photoEndY]);

  const measure = useCallback(() => {
    measurePositions();
  }, [measurePositions]);

  useLayoutEffect(() => {
    measurePositions();
  }, [measurePositions]);

  useEffect(() => {
    const onResize = () => measure();
    const onScroll = () => measure();

    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll, { passive: true });
    document.fonts?.ready?.then(measure);

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
    };
  }, [measure]);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (reduce) {
      setPhotoDocked(true);
      return;
    }
    setPhotoDocked(v >= 0.72);
  });

  const photoY = useTransform(
    [scrollYProgress, photoStartY, photoEndY],
    ([v, start, end]) => {
      if (reduce) return end;
      return lerpRange(v, [0, 0.72], [start, end]);
    }
  );

  const photoScale = useTransform(scrollYProgress, (v) => {
    if (reduce) return 1;
    return lerpRange(v, [0, 0.72], [PHOTO_START_SCALE, 1]);
  });

  const photoRotateY = useTransform(scrollYProgress, (v) => {
    if (reduce) return 180;
    if (v <= 0.1) return 0;
    if (v <= 0.35) return lerpRange(v, [0.1, 0.35], [0, 90]);
    if (v <= 0.48) return 90;
    if (v <= 0.72) return lerpRange(v, [0.48, 0.72], [90, 180]);
    return 180;
  });

  const photoRotateX = useTransform(scrollYProgress, (v) => {
    if (reduce) return 0;
    if (v <= 0.1) return 0;
    if (v <= 0.35) return lerpRange(v, [0.1, 0.35], [0, 16]);
    if (v <= 0.72) return lerpRange(v, [0.35, 0.72], [16, 0]);
    return 0;
  });

  return {
    photoY,
    photoScale,
    photoRotateY,
    photoRotateX,
    measure,
    reduce,
    photoDocked,
  };
}
