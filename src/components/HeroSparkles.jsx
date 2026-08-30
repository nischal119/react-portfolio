"use client";

import DraggableHolo from "./DraggableHolo";

export default function HeroSparkles() {
  return (
    <>
      <DraggableHolo
        src="/holo-star.png"
        alt=""
        initialRotate={0}
        size={140}
        className="absolute -top-12 -left-4 sm:-top-16 sm:-left-10 lg:-top-14 lg:-left-4 w-12 h-12 sm:w-24 sm:h-24 lg:w-[140px] lg:h-[140px]"
      />
      <DraggableHolo
        src="/holo-lightning.png"
        alt=""
        initialRotate={16}
        size={160}
        className="absolute -bottom-16 -right-3 sm:-bottom-20 sm:-right-12 lg:-bottom-16 lg:-right-4 w-16 h-16 sm:w-28 sm:h-28 lg:w-[160px] lg:h-[160px]"
      />
    </>
  );
}
