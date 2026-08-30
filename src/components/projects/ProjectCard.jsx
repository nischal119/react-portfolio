"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import Reveal from "../Reveal";

export default function ProjectCard({ project, index, hovered, setHovered }) {
  const isHovered = hovered === index;
  const isDimmed = hovered !== null && !isHovered;
  const projectNumber = String(index + 1).padStart(2, "0");

  const content = (
    <motion.article
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
      animate={{
        y: isHovered ? -6 : 0,
        opacity: isDimmed ? 0.55 : 1,
      }}
      transition={{ type: "spring", stiffness: 350, damping: 28 }}
      className="group flex flex-col h-full"
    >
      <div className="relative aspect-[1.45/1] overflow-hidden rounded-2xl bg-ink/5 mb-5 sm:mb-6">
        {project.Img && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.Img}
            alt={project.Title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        )}
        <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/[0.03] transition-colors duration-300" />
      </div>

      <div className="flex flex-col flex-1">
        <div className="flex items-baseline gap-3 mb-2">
          <span className="text-xs font-semibold text-ink-soft/50 tracking-widest">
            {projectNumber}
          </span>
          <h3 className="font-display font-semibold text-xl sm:text-2xl text-ink relative inline-block">
            <span className="relative">
              {project.Title}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
            </span>
          </h3>
        </div>

        <p className="text-sm sm:text-base text-ink-soft leading-relaxed line-clamp-3 mb-4">
          {project.Description}
        </p>

        {Array.isArray(project.TechStack) && project.TechStack.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-auto">
            {project.TechStack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="text-[11px] font-medium text-ink-soft border border-line rounded-full px-2.5 py-1"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        {project.Link && (
          <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent group-hover:text-accent-2 transition-colors">
            View Live
            <ExternalLink
              size={14}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </span>
        )}
      </div>
    </motion.article>
  );

  return (
    <Reveal delay={(index % 2) * 0.08} className="h-full">
      {project.Link ? (
        <a
          href={project.Link}
          target="_blank"
          rel="noopener noreferrer"
          className="block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-2xl"
        >
          {content}
        </a>
      ) : (
        content
      )}
    </Reveal>
  );
}
