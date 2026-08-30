"use client";

import { ArrowUpRight } from "lucide-react";
import { PROFILE, SOCIAL_LINKS, NAV_ITEMS } from "@/lib/content";
import { useSectionScroll } from "@/hooks/useSectionScroll";

export default function Footer() {
  const { handleSectionClick } = useSectionScroll();

  return (
    <footer className="bg-[#111111] text-white w-full">
      <div className="max-w-[1240px] mx-auto px-6 sm:px-10 lg:px-12 pt-20 sm:pt-24 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr_0.8fr] gap-12 lg:gap-8 mb-20 sm:mb-28">
          <div>
            <h3 className="font-display font-bold text-4xl sm:text-5xl lg:text-[3.4rem] leading-[1.05] tracking-tight text-white">
              Scaling<br />
              Start-ups for Growth.
            </h3>
          </div>

          <div>
            <span className="text-white/40 text-xs sm:text-sm font-medium tracking-wide mb-5 block">
              /Quick links
            </span>
            <div className="flex flex-wrap gap-2.5">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleSectionClick(e, item.href)}
                  className="text-xs sm:text-sm font-medium text-white/90 bg-[#222222] border border-white/5 hover:bg-[#333333] hover:text-white rounded-xl px-4 py-2.5 transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <span className="text-white/40 text-xs sm:text-sm font-medium tracking-wide mb-5 block">
              /Contact
            </span>
            <a
              href="mailto:dhungeln12@gmail.com"
              className="text-sm sm:text-base text-white/90 hover:text-white transition-colors block mb-4"
            >
              dhungeln12@gmail.com
            </a>
            <div className="flex flex-wrap gap-4">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-1 text-xs sm:text-sm font-medium text-white/60 hover:text-white transition-colors"
                >
                  {link.label}
                  <ArrowUpRight
                    size={12}
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="relative select-none pointer-events-none py-2 sm:py-4">
          <div
            className="font-display font-black text-[clamp(3.5rem,16vw,11rem)] leading-[1.05] text-white/[0.04] uppercase tracking-tighter text-center"
            aria-hidden="true"
          >
            {PROFILE.name.split(" ")[0]}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 border-t border-white/10 pt-6">
          <span className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} {PROFILE.name}. All rights reserved.
          </span>
          <span className="text-xs text-white/40">
            Designed & Built with precision
          </span>
        </div>
      </div>
    </footer>
  );
}
