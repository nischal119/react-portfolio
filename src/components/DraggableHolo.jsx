"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useInertiaDrag } from "@/hooks/useInertiaDrag";

export default function DraggableHolo({
  src,
  alt,
  className = "",
  initialRotate = 0,
  size = 140,
}) {
  const { x, y, isDragging, reduce, dragHandlers } = useInertiaDrag();

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 10, rotate: initialRotate }}
      animate={
        reduce
          ? { opacity: 1, rotate: initialRotate }
          : {
              opacity: 1,
              y: isDragging ? 0 : [0, -6, 0],
              rotate: initialRotate,
            }
      }
      transition={
        reduce
          ? undefined
          : {
              opacity: { type: "spring", bounce: 0, duration: 1.6, delay: 1.4 },
              y: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2,
              },
            }
      }
      style={{ x, y }}
      className={`pointer-events-auto touch-none select-none z-40 ${className}`}
      aria-hidden="true"
      {...dragHandlers}
    >
      <div
        className={`relative w-full h-full transition-transform duration-150 ${
          isDragging ? "scale-105 cursor-grabbing" : "cursor-grab"
        }`}
      >
        <div
          className="absolute inset-[16%] rounded-[28%] bg-ink/[0.05] border border-ink/[0.08] shadow-[0_6px_20px_rgba(91,75,255,0.1)]"
          aria-hidden="true"
        />
        <Image
          src={src}
          alt={alt}
          width={size}
          height={size}
          draggable={false}
          unoptimized
          className="relative z-10 w-full h-full object-contain drop-shadow-[0_10px_28px_rgba(91,75,255,0.3)] pointer-events-none"
          priority
        />
      </div>
    </motion.div>
  );
}
