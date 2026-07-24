import * as React from "react";
import { withPrefix } from "gatsby";
import { useTranslation } from "gatsby-plugin-react-i18next";
import Link from "../components/Link";

const Hero: React.FC = () => {
  const { t } = useTranslation();
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="absolute inset-x-0 top-0 -z-10 h-[600px] bg-gradient-to-b from-brand-50 to-transparent" />
      <div className="container grid gap-12 pt-16 pb-24 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-center lg:pt-24 lg:pb-32">
        <div>
          <span className="eyebrow">{t("hero.eyebrow")}</span>
          <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.05] text-ink-900">
            {t("hero.title")}
          </h1>
          <p className="mt-6 max-w-xl text-lg text-ink-600">
            {t("hero.subtitle")}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link to="/#demo" className="btn-primary">
              {t("hero.primaryCta")}
            </Link>
            <Link to="/#demo-video" className="btn-ghost">
              {t("hero.secondaryCta")}
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-700 text-white text-lg font-semibold">
                21
              </div>
              <div className="text-sm">
                <div className="font-semibold text-ink-900">
                  {t("hero.yearsTitle")}
                </div>
                <div className="text-ink-600">{t("hero.yearsSub")}</div>
              </div>
            </div>
            <div className="hidden sm:block h-10 w-px bg-ink-200" />
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {["#7dd3fc", "#60a5fa", "#3b82f6", "#2563eb"].map((c, i) => (
                  <span
                    key={i}
                    className="h-9 w-9 rounded-full ring-2 ring-white"
                    style={{ background: c }}
                  />
                ))}
              </div>
              <p className="text-sm text-ink-600">
                <span className="font-semibold text-ink-900">5,000+</span>{" "}
                {t("stats.users").toLowerCase()}
              </p>
            </div>
          </div>
        </div>

        <div className="relative lg:-mr-12 xl:-mr-24">
          <div className="aspect-[5/4] rounded-3xl bg-gradient-to-br from-brand-700 to-brand-900 p-1 shadow-2xl lg:aspect-[6/5]">
            <div className="flex h-full w-full flex-col rounded-[1.4rem] bg-ink-900 p-2">
              <div className="flex items-center justify-between px-3 py-2">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
                </div>
                <span className="flex items-center gap-1.5 rounded-full bg-ink-800 px-2 py-0.5 text-[10px] font-medium text-accent-300">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-400 opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent-400" />
                  </span>
                  LIVE
                </span>
              </div>
              <div className="relative flex-1 overflow-hidden rounded-xl bg-ink-950">
                <video
                  src={withPrefix("/videos/hero-loop.mp4")}
                  className="absolute inset-0 h-full w-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  aria-hidden="true"
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink-950/70 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                  <div>
                    <div className="text-xs font-medium text-white/70">
                      Active workflows
                    </div>
                    <div className="mt-0.5 text-2xl font-semibold text-white">
                      1,284
                    </div>
                  </div>
                  <span className="rounded-full bg-white/10 px-2.5 py-1 text-xs font-semibold text-accent-300 backdrop-blur-sm">
                    +12.4%
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-6 -left-6 hidden h-24 w-24 rounded-2xl bg-accent-400 sm:block" />
          <div className="absolute -top-6 -right-6 hidden h-16 w-16 rounded-full bg-brand-200 sm:block" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
