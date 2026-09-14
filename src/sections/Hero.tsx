import * as React from "react";
import { useTranslation } from "gatsby-plugin-react-i18next";
import Link from "../components/Link";
import Highlight from "../components/Highlight";
import ConstructionLineArt from "../components/ConstructionLineArt";
import DeviceShowcase from "../components/showcase/DeviceShowcase";

const Hero: React.FC = () => {
  const { t } = useTranslation();
  return (
    <section className="relative isolate overflow-hidden bg-white">
      <div className="absolute inset-x-0 top-0 -z-10 h-[640px] bg-gradient-to-b from-brand-50 to-transparent" />
      <ConstructionLineArt className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[380px] w-full text-brand-300 opacity-60 [mask-image:linear-gradient(to_top,black_60%,transparent_100%)] sm:h-[480px] lg:h-[560px]" />

      <div className="container grid gap-14 pt-14 pb-20 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-center lg:pt-20 lg:pb-28">
        <div>
          <h1 className="text-4xl font-semibold leading-[1.05] text-ink-900 sm:text-5xl lg:text-6xl">
            <Highlight text={t("hero.title")} className="text-brand-600" />
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

        <div className="relative lg:-mr-8 xl:-mr-16">
          <DeviceShowcase />
        </div>
      </div>
    </section>
  );
};

export default Hero;
