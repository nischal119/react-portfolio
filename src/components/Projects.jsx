"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import Reveal from "./Reveal";
import ProjectCard from "./projects/ProjectCard";

const MOBILE_PROJECT_LIMIT = 3;

export default function Projects({ projects = [], status = "loading" }) {
  const [hovered, setHovered] = useState(null);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const isMobile = useMediaQuery("(max-width: 1023px)");

  const shouldLimitProjects =
    isMobile && !showAllProjects && projects.length > MOBILE_PROJECT_LIMIT;
  const visibleProjects = shouldLimitProjects
    ? projects.slice(0, MOBILE_PROJECT_LIMIT)
    : projects;
  const hiddenCount = projects.length - MOBILE_PROJECT_LIMIT;

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
          {[...Array(isMobile ? MOBILE_PROJECT_LIMIT : 4)].map((_, i) => (
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
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-x-14">
            {visibleProjects.map((project, index) => (
              <ProjectCard
                key={project.id || index}
                project={project}
                index={index}
                hovered={hovered}
                setHovered={setHovered}
              />
            ))}
          </div>

          {isMobile && projects.length > MOBILE_PROJECT_LIMIT && (
            <div className="mt-12 flex justify-center lg:hidden">
              <button
                type="button"
                onClick={() => setShowAllProjects((prev) => !prev)}
                aria-expanded={showAllProjects}
                className="group inline-flex items-center gap-2 rounded-lg border border-ink/15 bg-cream/80 backdrop-blur text-ink text-sm font-semibold px-5 py-2.5 active:scale-95 transition-transform"
              >
                {showAllProjects ? "View Less" : `View More (${hiddenCount})`}
                <ArrowUpRight
                  size={14}
                  className={`transition-transform ${showAllProjects ? "rotate-90" : "group-hover:translate-x-0.5 group-hover:-translate-y-0.5"}`}
                />
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}
