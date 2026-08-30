import { COMPANY_LINKS } from "@/lib/content";

const linkClassName =
  "text-accent underline underline-offset-4 decoration-accent/60 hover:decoration-accent transition-colors";

export default function HeroIntro() {
  return (
    <p className="text-ink font-semibold text-base sm:text-lg leading-relaxed max-w-[340px] mx-auto lg:mx-0">
      I&apos;m Nischal, a builder based in Nepal, currently Co-Founder at{" "}
      <a
        href={COMPANY_LINKS.garudLabs.href}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClassName}
      >
        {COMPANY_LINKS.garudLabs.label}
      </a>{" "}
      and{" "}
      <a
        href={COMPANY_LINKS.babalCloud.href}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClassName}
      >
        {COMPANY_LINKS.babalCloud.label}
      </a>
      .
    </p>
  );
}
