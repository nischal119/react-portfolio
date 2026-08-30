"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Reveal from "../Reveal";
import { TECH_ICONS } from "@/lib/content";

export default function TechIconStrip() {
  return (
    <Reveal delay={0.2} className="mt-20 sm:mt-24">
      <div className="flex items-center gap-2 text-ink-soft text-sm mb-6 font-medium">
        <ArrowUpRight size={14} />
        Working with
      </div>

      <div className="overflow-x-auto pb-2 -mx-1 px-1 scrollbar-hide">
        <div className="flex flex-wrap md:justify-center gap-3 sm:gap-4 min-w-max md:min-w-0">
          {TECH_ICONS.map((tech) => (
            <div
              key={tech.language}
              className="group flex items-center gap-2.5 rounded-full border border-line/80 bg-white/50 backdrop-blur-sm px-4 py-2.5 hover:border-accent/30 hover:bg-white transition-all duration-200"
            >
              <Image
                src={`/${tech.icon}`}
                alt=""
                width={24}
                height={24}
                className="w-6 h-6 opacity-80 group-hover:opacity-100 transition-opacity"
              />
              <span className="text-sm font-medium text-ink-soft group-hover:text-ink transition-colors whitespace-nowrap">
                {tech.language}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}
