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
        <Image
          src={src}
          alt={alt}
          width={size}
          height={size}
          draggable={false}
          className="w-full h-full object-contain drop-shadow-[0_8px_24px_rgba(91,75,255,0.25)] pointer-events-none bg-transparent"
          priority
        />
      </div>
    </motion.div>
  );
}
