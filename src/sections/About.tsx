import * as React from "react";
import { useTranslation } from "gatsby-plugin-react-i18next";
import PageHero from "../components/PageHero";
import Highlight from "../components/Highlight";
import Glyph, { type GlyphName } from "../components/Glyph";

const offers: { key: string; glyph: GlyphName }[] = [
  { key: "integrated", glyph: "layers" },
  { key: "budget", glyph: "trend" },
  { key: "process", glyph: "checkSquare" },
  { key: "visibility", glyph: "eye" },
  { key: "financial", glyph: "dollar" },
  { key: "procurement", glyph: "cart" },
  { key: "hr", glyph: "users" },
  { key: "flexible", glyph: "sliders" },
  { key: "site", glyph: "building" },
  { key: "secure", glyph: "shield" },
];

/** Former About page, now a home-page section. */
const About: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div id="about">
      <PageHero as="h2" title={t("about.title")} subtitle={t("about.subtitle")} />

      {/* Story */}
      <section className="section">
        <div className="container grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-center">
          <div data-reveal>
            <div className="aspect-[4/3] overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 to-accent-500 p-1 shadow-2xl shadow-brand-600/20">
              <div className="flex h-full w-full flex-col justify-end rounded-[1.4rem] bg-ink-900 p-8">
                <div className="text-6xl font-semibold text-white">21</div>
                <div className="mt-2 text-lg font-medium text-accent-300">
                  {t("about.yearsLabel")}
                </div>
                <p className="mt-3 text-sm text-ink-300">
                  {t("about.yearsBody")}
                </p>
              </div>
            </div>
          </div>
          <div data-reveal>
            <h3 className="section-title">
              <Highlight text={t("about.storyTitle")} className="text-brand-600" />
            </h3>
            <p className="mt-5 text-ink-600">{t("about.storyBody1")}</p>
            <p className="mt-4 text-ink-600">{t("about.storyBody2")}</p>
            <p className="mt-4 text-ink-600">{t("about.storyBody3")}</p>
            <p className="mt-4 text-ink-600">{t("about.storyBody4")}</p>
            <p className="mt-4 text-ink-600">{t("about.storyBody5")}</p>
            <a
              href="https://vkvideo.ru/@prizmaflow"
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand-700 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-brand-800"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm-2 14.5v-9l7 4.5-7 4.5z" />
              </svg>
              {t("nav.trainingVideos")}
            </a>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section bg-ink-50">
        <div className="container grid gap-6 md:grid-cols-2" data-reveal>
          {(["mission", "vision"] as const).map((k) => (
            <div
              key={k}
              className="rounded-3xl border border-ink-100 bg-white p-8 transition duration-300 hover:-translate-y-1 hover:shadow-xl lg:p-10"
            >
              <span className="inline-flex items-center rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-700">
                {t(`about.${k}.label`)}
              </span>
              <h3 className="mt-5 text-2xl">{t(`about.${k}.title`)}</h3>
              <p className="mt-3 text-ink-600">{t(`about.${k}.body`)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What we offer */}
      <section className="section">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center" data-reveal>
            <h3 className="section-title">
              <Highlight text={t("about.offerTitle")} className="text-brand-600" />
            </h3>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" data-reveal>
            {offers.map((o) => (
              <div
                key={o.key}
                className="group rounded-2xl border border-ink-100 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl"
              >
                <span className="icon-tile">
                  <Glyph name={o.glyph} size={20} />
                </span>
                <h4 className="mt-5 text-lg">{t(`about.offer.${o.key}.title`)}</h4>
                <p className="mt-2 text-sm text-ink-600">
                  {t(`about.offer.${o.key}.body`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
