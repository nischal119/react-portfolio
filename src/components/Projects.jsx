"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";
import ProjectCard from "./projects/ProjectCard";

export default function Projects({ projects = [], status = "loading" }) {
  const [hovered, setHovered] = useState(null);

  return (
    <section id="projects" className="section-padding max-w-[1240px] mx-auto">
      <Reveal className="flex items-end justify-between mb-14 sm:mb-20 flex-wrap gap-4">
        <h2 className="font-display font-bold text-ink text-[10vw] sm:text-6xl lg:text-7xl tracking-tight">
          Projects
        </h2>
        {projects.length > 0 && (
          <span className="text-sm text-ink-soft flex items-center gap-1.5 pb-2 font-medium">
            Featured Work
            <ArrowUpRight size={14} />
          </span>
        )}
      </Reveal>

      {status === "loading" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="aspect-[1.45/1] rounded-2xl bg-ink/5 animate-pulse"
            />
          ))}
        </div>
      )}

      {status === "ready" && projects.length === 0 && (
        <p className="text-ink-soft">New projects are on the way — check back soon.</p>
      )}

      {status === "ready" && projects.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-x-14">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id || index}
              project={project}
              index={index}
              hovered={hovered}
              setHovered={setHovered}
            />
          ))}
        </div>
      )}
    </section>
  );
}
