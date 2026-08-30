"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { PROFILE } from "@/lib/content";

export default function HeroPhoto({
  width,
  height,
  rotateY,
  rotateX,
  scale,
  fill = false,
  className = "",
  style = {},
}) {
  const sizeStyle = fill
    ? { width: "100%", height: "100%" }
    : { width, height };

  return (
    <motion.div
      style={{
        ...sizeStyle,
        rotateY,
        rotateX,
        scale,
        ...style,
      }}
      className={`relative [transform-style:preserve-3d] origin-center ${className}`}
    >
      <div className="absolute inset-0 rounded-[20px] overflow-hidden shadow-[0_20px_50px_rgba(17,17,17,0.22)] border border-black/5 [backface-visibility:hidden]">
        <Image
          src={PROFILE.photo}
          alt={PROFILE.name}
          fill
          priority
          sizes="(min-width: 1280px) 400px, (min-width: 810px) 220px, 180px"
          className="object-cover grayscale contrast-125 brightness-90"
        />
      </div>
      <div
        className="absolute inset-0 rounded-[20px] overflow-hidden shadow-[0_25px_60px_rgba(17,17,17,0.28)] border border-black/10 [backface-visibility:hidden]"
        style={{ transform: "rotateY(180deg)" }}
      >
        <Image
          src={PROFILE.photo}
          alt=""
          fill
          sizes="(min-width: 1280px) 400px, (min-width: 810px) 220px, 180px"
          className="object-cover"
          aria-hidden="true"
        />
      </div>
    </motion.div>
  );
}
