import * as React from "react";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}

const PageHero: React.FC<PageHeroProps> = ({
  eyebrow,
  title,
  subtitle,
  children,
}) => (
  <section className="relative overflow-hidden bg-ink-900">
    <div className="absolute inset-0 -z-0 bg-gradient-to-br from-brand-800 via-ink-900 to-ink-950" />
    <div className="absolute -right-24 -top-24 -z-0 h-72 w-72 rounded-full bg-accent-400/10 blur-3xl" />
    <div className="absolute -bottom-24 -left-24 -z-0 h-72 w-72 rounded-full bg-brand-500/10 blur-3xl" />
    <div className="container relative z-10 py-20 lg:py-28">
      <div className="mx-auto max-w-3xl text-center">
        <span className="inline-block text-xs font-semibold uppercase tracking-[0.18em] text-accent-300">
          {eyebrow}
        </span>
        <h1 className="mt-4 text-4xl font-semibold leading-[1.08] text-white sm:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mx-auto mt-6 max-w-2xl text-lg text-ink-300">
            {subtitle}
          </p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </div>
  </section>
);

export default PageHero;
