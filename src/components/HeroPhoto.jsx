"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { PROFILE } from "@/lib/content";

const FLOATING_SIZE_CLASS =
  "w-[min(42vw,160px)] sm:w-[min(42vw,180px)] md:w-[min(42vw,220px)] xl:w-[400px]";

export default function HeroPhoto({
  rotateY,
  rotateX,
  scale,
  fill = false,
  className = "",
  style = {},
}) {
  return (
    <motion.div
      style={{
        rotateY,
        rotateX,
        scale,
        ...style,
      }}
      className={`relative shrink-0 [transform-style:preserve-3d] origin-center ${
        fill ? "w-full h-full" : `${FLOATING_SIZE_CLASS} aspect-[400/456]`
      } ${className}`}
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
