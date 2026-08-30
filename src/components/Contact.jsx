"use client";

import { Mail } from "lucide-react";
import Reveal from "./Reveal";
import { SOCIAL_LINKS } from "@/lib/content";
import ContactForm from "./contact/ContactForm";

function SocialIcon({ label }) {
  if (label === "GitHub") {
    return (
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    );
  }
  if (label === "LinkedIn") {
    return (
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
      </svg>
    );
  }
  if (label === "Instagram") {
    return (
      <svg className="w-5 h-5 fill-none stroke-current stroke-2 stroke-linecap-round stroke-linejoin-round" viewBox="0 0 24 24">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    );
  }
  return <Mail size={18} />;
}

export default function Contact() {
  return (
    <section id="contact" className="section-padding max-w-[1240px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        <Reveal className="flex flex-col justify-between h-full">
          <div>
            <h2 className="font-display font-bold text-ink text-[10vw] sm:text-7xl lg:text-8xl tracking-tight mb-6 leading-none">
              Let&rsquo;s talk.
            </h2>
            <p className="text-ink-soft text-base sm:text-lg lg:text-xl max-w-md mb-12 leading-relaxed">
              Have a project or need help? Fill out the form, and we&rsquo;ll get back to you soon.
            </p>
          </div>

          <div className="flex items-center gap-3 pt-4 sm:pt-12">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="w-12 h-12 rounded-2xl bg-white border border-line flex items-center justify-center text-ink hover:border-ink/40 hover:bg-cream hover:scale-105 active:scale-95 transition-all shadow-sm"
              >
                <SocialIcon label={link.label} />
              </a>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="bg-[#111111] text-white rounded-[2.5rem] p-7 sm:p-10 shadow-2xl border border-white/5">
            <ContactForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
