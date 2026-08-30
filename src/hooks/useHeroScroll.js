"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import {
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

const PHOTO_ASPECT = 456 / 400;

const DEFAULT_ANIM = {
  scrollEnd: 0.72,
  dockAt: 0.72,
  startScale: 0.55,
  startGap: 24,
  maxRotateX: 16,
  flipIn: [0.1, 0.35],
  flipHold: [0.35, 0.48],
  flipOut: [0.48, 0.72],
};

function getViewportMetrics() {
  if (typeof window === "undefined") {
    return { vw: 390, vh: 700, isShort: true, isVeryShort: false };
  }

  const vw = window.innerWidth;
  const vh = window.innerHeight;

  return {
    vw,
    vh,
    isShort: vh < 700,
    isVeryShort: vh < 580,
  };
}

function getScrollHeight(metrics = getViewportMetrics()) {
  if (metrics.isVeryShort) return "175vh";
  if (metrics.isShort) return "185vh";
  return "200vh";
}

function subscribeToViewport(onStoreChange) {
  window.addEventListener("resize", onStoreChange);
  return () => window.removeEventListener("resize", onStoreChange);
}

function getAnimConfig(metrics = getViewportMetrics()) {
  if (metrics.isVeryShort) {
    return {
      scrollEnd: 0.66,
      dockAt: 0.66,
      startScale: 0.48,
      startGap: 10,
      maxRotateX: 6,
      flipIn: [0.08, 0.28],
      flipHold: [0.28, 0.4],
      flipOut: [0.4, 0.66],
    };
  }

  if (metrics.isShort) {
    return {
      scrollEnd: 0.7,
      dockAt: 0.7,
      startScale: 0.52,
      startGap: 14,
      maxRotateX: 10,
      flipIn: [0.09, 0.32],
      flipHold: [0.32, 0.44],
      flipOut: [0.44, 0.7],
    };
  }

  return DEFAULT_ANIM;
}

function getPhotoSize(metrics = getViewportMetrics()) {
  const { vw, vh, isShort, isVeryShort } = metrics;

  let w;
  if (vw >= 1280) w = 400;
  else if (vw >= 810) w = 220;
  else if (vw >= 640) w = 180;
  else w = Math.round(Math.min(160, vw * 0.4));

  const maxHeightRatio = isVeryShort ? 0.2 : isShort ? 0.24 : 0.34;
  const maxH = Math.round(vh * maxHeightRatio);
  let h = Math.round(w * PHOTO_ASPECT);

  if (h > maxH) {
    h = maxH;
    w = Math.round(h / PHOTO_ASPECT);
  }

  return { w, h };
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

export function useHeroScroll(
  wrapperRef,
  titleBottomRef,
  photoEndRef,
  photoFloatRef
) {
  const reduce = useReducedMotion();
  const animRef = useRef(DEFAULT_ANIM);
  const [photoDocked, setPhotoDocked] = useState(reduce);
  const scrollHeight = useSyncExternalStore(
    subscribeToViewport,
    () => getScrollHeight(getViewportMetrics()),
    () => "200vh"
  );
  const photoStartY = useMotionValue(120);
  const photoEndY = useMotionValue(0);

  const measurePositions = useCallback(() => {
    if (typeof window === "undefined") return;
    if (!titleBottomRef.current || !photoEndRef.current) return;

    const metrics = getViewportMetrics();
    animRef.current = getAnimConfig(metrics);
    const anim = animRef.current;

    const measuredH = photoFloatRef?.current?.getBoundingClientRect().height;
    const photoH = measuredH && measuredH > 0 ? measuredH : getPhotoSize(metrics).h;
    const viewportCenter = window.innerHeight / 2;
    const titleRect = titleBottomRef.current.getBoundingClientRect();
    const endRect = photoEndRef.current.getBoundingClientRect();

    const photoHalfAtStart = (photoH * anim.startScale) / 2;
    const photoCenterAtStart = titleRect.bottom + anim.startGap + photoHalfAtStart;
    const startY = photoCenterAtStart - viewportCenter;
    const endY = endRect.top + endRect.height / 2 - viewportCenter;

    photoStartY.set(startY);
    photoEndY.set(endY);
  }, [titleBottomRef, photoEndRef, photoFloatRef, photoStartY, photoEndY]);

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
    setPhotoDocked(v >= animRef.current.dockAt);
  });

  const photoY = useTransform(
    [scrollYProgress, photoStartY, photoEndY],
    ([v, start, end]) => {
      if (reduce) return end;
      const { scrollEnd } = animRef.current;
      return lerpRange(v, [0, scrollEnd], [start, end]);
    }
  );

  const photoScale = useTransform(scrollYProgress, (v) => {
    if (reduce) return 1;
    const { scrollEnd, startScale } = animRef.current;
    return lerpRange(v, [0, scrollEnd], [startScale, 1]);
  });

  const photoRotateY = useTransform(scrollYProgress, (v) => {
    if (reduce) return 180;
    const { flipIn, flipHold, flipOut } = animRef.current;
    if (v <= flipIn[0]) return 0;
    if (v <= flipIn[1]) return lerpRange(v, flipIn, [0, 90]);
    if (v <= flipHold[1]) return 90;
    if (v <= flipOut[1]) return lerpRange(v, flipOut, [90, 180]);
    return 180;
  });

  const photoRotateX = useTransform(scrollYProgress, (v) => {
    if (reduce) return 0;
    const { flipIn, flipOut, maxRotateX } = animRef.current;
    if (v <= flipIn[0]) return 0;
    if (v <= flipIn[1]) return lerpRange(v, flipIn, [0, maxRotateX]);
    if (v <= flipOut[1]) return lerpRange(v, [flipIn[1], flipOut[1]], [maxRotateX, 0]);
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
    scrollHeight,
  };
}
