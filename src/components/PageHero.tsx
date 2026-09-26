import * as React from "react";
import Highlight from "./Highlight";

interface PageHeroProps {
  /** Heading; wrap the words to emphasize in `<hl>…</hl>`. */
  title: string;
  subtitle?: string;
  /** `h1` on standalone pages, `h2` when the band opens a home-page section. */
  as?: "h1" | "h2";
  children?: React.ReactNode;
}

/** Navy title band with the hero's gradient and serif heading. */
const PageHero: React.FC<PageHeroProps> = ({
  title,
  subtitle,
  as: Heading = "h1",
  children,
}) => (
  <section
    className="text-white"
    style={{
      background:
        "radial-gradient(120% 90% at 50% 110%, #2563eb 0%, #1e40af 35%, #172554 75%)",
    }}
  >
    <div className="container pb-16 pt-32 lg:pb-24 lg:pt-40">
      <div className="mx-auto max-w-3xl text-center">
        <Heading className="display-title">
          <Highlight text={title} className="text-brand-300" />
        </Heading>
        {subtitle && (
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/85">{subtitle}</p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </div>
  </section>
);

export default PageHero;
