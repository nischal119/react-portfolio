"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useMotionValue, useReducedMotion } from "framer-motion";

const FRICTION = 0.92;
const MIN_VELOCITY = 0.15;
const VELOCITY_SAMPLES = 5;

export function useInertiaDrag() {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const [isDragging, setIsDragging] = useState(false);
  const isDraggingRef = useRef(false);
  const rafId = useRef(null);
  const velocity = useRef({ x: 0, y: 0 });
  const lastSamples = useRef([]);
  const dragOffset = useRef({ x: 0, y: 0 });

  const stopInertia = useCallback(() => {
    if (rafId.current !== null) {
      cancelAnimationFrame(rafId.current);
      rafId.current = null;
    }
  }, []);

  const startInertia = useCallback(() => {
    stopInertia();

    const tick = () => {
      velocity.current.x *= FRICTION;
      velocity.current.y *= FRICTION;

      const speed = Math.hypot(velocity.current.x, velocity.current.y);
      if (speed < MIN_VELOCITY) {
        rafId.current = null;
        return;
      }

      x.set(x.get() + velocity.current.x);
      y.set(y.get() + velocity.current.y);
      rafId.current = requestAnimationFrame(tick);
    };

    rafId.current = requestAnimationFrame(tick);
  }, [stopInertia, x, y]);

  const recordSample = useCallback((clientX, clientY) => {
    const samples = lastSamples.current;
    samples.push({ x: clientX, y: clientY, t: performance.now() });
    if (samples.length > VELOCITY_SAMPLES) {
      samples.shift();
    }
  }, []);

  const computeReleaseVelocity = useCallback(() => {
    const samples = lastSamples.current;
    if (samples.length < 2) {
      return { x: 0, y: 0 };
    }

    const first = samples[0];
    const last = samples[samples.length - 1];
    const dt = Math.max(last.t - first.t, 1);

    return {
      x: ((last.x - first.x) / dt) * 16,
      y: ((last.y - first.y) / dt) * 16,
    };
  }, []);

  const onPointerDown = useCallback(
    (event) => {
      if (reduce) return;

      stopInertia();
      isDraggingRef.current = true;
      setIsDragging(true);
      lastSamples.current = [];

      const rect = event.currentTarget.getBoundingClientRect();
      dragOffset.current = {
        x: event.clientX - rect.left - rect.width / 2 - x.get(),
        y: event.clientY - rect.top - rect.height / 2 - y.get(),
      };

      event.currentTarget.setPointerCapture(event.pointerId);
      recordSample(event.clientX, event.clientY);
    },
    [reduce, stopInertia, x, y, recordSample]
  );

  const onPointerMove = useCallback(
    (event) => {
      if (!isDraggingRef.current || reduce) return;

      const rect = event.currentTarget.getBoundingClientRect();
      const nextX =
        event.clientX - rect.left - rect.width / 2 - dragOffset.current.x;
      const nextY =
        event.clientY - rect.top - rect.height / 2 - dragOffset.current.y;

      x.set(nextX);
      y.set(nextY);
      recordSample(event.clientX, event.clientY);
    },
    [reduce, x, y, recordSample]
  );

  const onPointerUp = useCallback(
    (event) => {
      if (!isDraggingRef.current || reduce) return;

      isDraggingRef.current = false;
      setIsDragging(false);
      event.currentTarget.releasePointerCapture(event.pointerId);

      const releaseVelocity = computeReleaseVelocity();
      velocity.current = releaseVelocity;
      startInertia();
    },
    [reduce, computeReleaseVelocity, startInertia]
  );

  const onPointerCancel = useCallback(
    (event) => {
      if (!isDraggingRef.current) return;
      isDraggingRef.current = false;
      setIsDragging(false);
      event.currentTarget.releasePointerCapture(event.pointerId);
    },
    []
  );

  useEffect(() => () => stopInertia(), [stopInertia]);

  return {
    x,
    y,
    isDragging,
    reduce,
    dragHandlers: reduce
      ? {}
      : {
          onPointerDown,
          onPointerMove,
          onPointerUp,
          onPointerCancel,
        },
  };
}
