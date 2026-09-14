import * as React from "react";
import Highlight from "./Highlight";
import Glyph, { type GlyphName } from "./Glyph";

interface PageHeroProps {
  /** Heading; wrap the words to emphasize in `<hl>…</hl>`. */
  title: string;
  subtitle?: string;
  /** `h1` on standalone pages, `h2` when the band opens a home-page section. */
  as?: "h1" | "h2";
  children?: React.ReactNode;
}

const floaters: { glyph: GlyphName; position: string; delay: string }[] = [
  { glyph: "layers", position: "left-[7%] top-[20%]", delay: "0s" },
  { glyph: "trend", position: "left-[13%] bottom-[16%]", delay: "-2s" },
  { glyph: "shield", position: "right-[8%] top-[18%]", delay: "-4s" },
  { glyph: "users", position: "right-[14%] bottom-[14%]", delay: "-1s" },
];

/** Blue title band that opens a page or a home-page section. */
const PageHero: React.FC<PageHeroProps> = ({
  title,
  subtitle,
  as: Heading = "h1",
  children,
}) => (
  <section className="relative isolate overflow-hidden bg-gradient-to-br from-brand-800 via-brand-600 to-accent-600">
    <div className="absolute inset-0 -z-10 opacity-25 [background-image:linear-gradient(to_right,rgba(255,255,255,0.35)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.35)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
    <div className="absolute -right-24 -top-24 -z-10 h-80 w-80 rounded-full bg-white/15 blur-3xl" />
    <div className="absolute -bottom-32 -left-20 -z-10 h-80 w-80 rounded-full bg-accent-300/30 blur-3xl" />

    {floaters.map((f, i) => (
      <div
        key={f.glyph}
        aria-hidden="true"
        className={`absolute hidden animate-float lg:block ${f.position}`}
        style={{ animationDelay: f.delay }}
      >
        <div
          className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-white shadow-lg ring-1 ring-white/30 backdrop-blur-sm ${
            i % 2 ? "-rotate-6" : "rotate-6"
          }`}
        >
          <Glyph name={f.glyph} size={24} />
        </div>
      </div>
    ))}

    <div className="container relative py-16 lg:py-24">
      <div className="mx-auto max-w-3xl text-center">
        <Heading className="text-4xl font-semibold leading-[1.3] text-white sm:text-5xl">
          <Highlight text={title} className="hl-marker" />
        </Heading>
        {subtitle && (
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/85">
            {subtitle}
          </p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </div>
  </section>
);

export default PageHero;
