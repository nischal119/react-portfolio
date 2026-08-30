"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import SkillRow from "./skills/SkillRow";
import TechIconStrip from "./skills/TechIconStrip";
import { SKILL_GROUPS } from "@/lib/content";

export default function Skills() {
  const [hovered, setHovered] = useState(null);

  return (
    <section id="skills" className="section-padding max-w-[1240px] mx-auto">
      <Reveal>
        <h2 className="font-display font-bold text-ink text-[10vw] sm:text-6xl lg:text-7xl tracking-tight mb-14 sm:mb-20">
          Skills
        </h2>
      </Reveal>

      <div className="max-w-5xl mx-auto">
        {SKILL_GROUPS.map((group, i) => (
          <SkillRow
            key={group.title}
            group={group}
            index={i}
            hovered={hovered}
            setHovered={setHovered}
          />
        ))}
      </div>

      <TechIconStrip />
    </section>
  );
}
