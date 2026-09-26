import * as React from "react";
import { useTranslation } from "gatsby-plugin-react-i18next";
import Link from "../components/Link";
import Highlight from "../components/Highlight";
import ModuleCarousel from "../components/showcase/ModuleCarousel";

/** Navy-to-blue hero with a centered serif headline, then the module cards. */
const Hero: React.FC = () => {
  const { t } = useTranslation();
  return (
    <section className="relative overflow-hidden bg-white">
      <div
        className="absolute inset-x-0 top-0 -z-0 h-[760px] sm:h-[840px] lg:h-[920px]"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 100%, #2563eb 0%, #1e40af 32%, #172554 72%)",
        }}
      >
        {/* Soft fade into the page so the cards sit on a gradient, not on an edge. */}
        <div className="absolute inset-x-0 bottom-0 h-[480px] bg-[linear-gradient(to_bottom,rgba(255,255,255,0)_0%,rgba(255,255,255,0.12)_25%,rgba(255,255,255,0.4)_50%,rgba(255,255,255,0.78)_75%,#ffffff_100%)]" />
      </div>
      <div className="relative">
        <div className="container pb-10 pt-28 text-center sm:pt-32 lg:pb-12 lg:pt-36">
          <h1 className="display-title mx-auto max-w-4xl text-white">
            <Highlight text={t("hero.title")} className="text-brand-300" />
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/85 sm:text-xl">
            {t("hero.subtitle")}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link to="/#demo" className="btn-dark px-6 py-3.5 text-base">
              {t("hero.primaryCta")}
            </Link>
            <Link to="/#demo-video" className="btn-light px-6 py-3.5 text-base">
              {t("hero.secondaryCta")}
            </Link>
          </div>
        </div>
        <ModuleCarousel />
      </div>
    </section>
  );
};

export default Hero;
