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
const SCROLL_ANIM_END = 0.72;
const DOCK_AT = 0.72;

const PHOTO_SIZE_DEFAULT = { w: 160, h: Math.round(160 * PHOTO_ASPECT) };

function getViewportHeight() {
  if (typeof window === "undefined") return 800;
  return window.innerHeight;
}

function isShortViewport(vh = getViewportHeight()) {
  return vh <= 700;
}

function isVeryShortViewport(vh = getViewportHeight()) {
  return vh <= 600;
}

function getHeroAnimationConfig(vh = getViewportHeight()) {
  if (isVeryShortViewport(vh)) {
    return {
      startScale: 0.42,
      startGap: 10,
      scrollEnd: 0.66,
      dockAt: 0.66,
      maxRotateX: 6,
      flipPhase1: 0.08,
      flipPhase2: 0.3,
      flipPhase3: 0.44,
    };
  }

  if (isShortViewport(vh)) {
    return {
      startScale: 0.48,
      startGap: 14,
      scrollEnd: 0.69,
      dockAt: 0.69,
      maxRotateX: 10,
      flipPhase1: 0.09,
      flipPhase2: 0.32,
      flipPhase3: 0.46,
    };
  }

  return {
    startScale: PHOTO_START_SCALE,
    startGap: PHOTO_START_GAP,
    scrollEnd: SCROLL_ANIM_END,
    dockAt: DOCK_AT,
    maxRotateX: 16,
    flipPhase1: 0.1,
    flipPhase2: 0.35,
    flipPhase3: 0.48,
  };
}

function getPhotoSize() {
  if (typeof window === "undefined") return PHOTO_SIZE_DEFAULT;

  const vw = window.innerWidth;
  const vh = window.innerHeight;
  let w;

  if (vw >= 1280) w = 400;
  else if (vw >= 810) w = 220;
  else if (vw >= 640) w = 180;
  else w = Math.round(Math.min(160, vw * 0.4));

  if (isVeryShortViewport(vh)) {
    w = Math.min(w, Math.round(vh * 0.22), 110);
  } else if (isShortViewport(vh)) {
    w = Math.min(w, Math.round(vh * 0.26), 140);
  }

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
    const { startScale, startGap } = getHeroAnimationConfig();
    const viewportCenter = window.innerHeight / 2;
    const titleRect = titleBottomRef.current.getBoundingClientRect();
    const endRect = photoEndRef.current.getBoundingClientRect();

    const photoHalfAtStart = (photoH * startScale) / 2;
    const photoCenterAtStart =
      titleRect.bottom + startGap + photoHalfAtStart;
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
    const { dockAt } = getHeroAnimationConfig();
    setPhotoDocked(v >= dockAt);
  });

  const photoY = useTransform(
    [scrollYProgress, photoStartY, photoEndY],
    ([v, start, end]) => {
      if (reduce) return end;
      const { scrollEnd } = getHeroAnimationConfig();
      return lerpRange(v, [0, scrollEnd], [start, end]);
    },
  );

  const photoScale = useTransform(scrollYProgress, (v) => {
    if (reduce) return 1;
    const { startScale, scrollEnd } = getHeroAnimationConfig();
    return lerpRange(v, [0, scrollEnd], [startScale, 1]);
  });

  const photoRotateY = useTransform(scrollYProgress, (v) => {
    if (reduce) return 180;
    const { scrollEnd, flipPhase1, flipPhase2, flipPhase3 } =
      getHeroAnimationConfig();
    if (v <= flipPhase1) return 0;
    if (v <= flipPhase2) return lerpRange(v, [flipPhase1, flipPhase2], [0, 90]);
    if (v <= flipPhase3) return 90;
    if (v <= scrollEnd) return lerpRange(v, [flipPhase3, scrollEnd], [90, 180]);
    return 180;
  });

  const photoRotateX = useTransform(scrollYProgress, (v) => {
    if (reduce) return 0;
    const { scrollEnd, flipPhase1, flipPhase2, maxRotateX } =
      getHeroAnimationConfig();
    if (v <= flipPhase1) return 0;
    if (v <= flipPhase2) return lerpRange(v, [flipPhase1, flipPhase2], [0, maxRotateX]);
    if (v <= scrollEnd) return lerpRange(v, [flipPhase2, scrollEnd], [maxRotateX, 0]);
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
