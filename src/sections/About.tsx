import * as React from "react";
import { useTranslation } from "gatsby-plugin-react-i18next";
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

/** Former About page, now a home-page section in the zoom.com layout. */
const About: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div id="about" className="bg-white">
      {/* Story */}
      <section className="section">
        <div className="container" data-reveal>
          <h2 className="section-title">
            <Highlight text={t("about.title")} className="text-brand-600" />
          </h2>
          <p className="mt-5 text-lg text-ink-600">{t("about.subtitle")}</p>
          <a
            href="https://vkvideo.ru/@prizmaflow"
            target="_blank"
            rel="noreferrer"
            className="btn-ghost mt-8"
          >
            <Glyph name="chevronRight" size={16} strokeWidth={2.4} />
            {t("nav.trainingVideos")}
          </a>
        </div>

        {/* 21 years, mission, vision */}
        <div className="container mt-16 grid gap-5 lg:grid-cols-3" data-reveal>
          <div className="flex flex-col justify-between rounded-3xl bg-gradient-to-b from-brand-600 to-brand-950 p-8 text-white">
            <div className="font-display text-7xl leading-none">21</div>
            <div>
              <div className="mt-8 font-display text-2xl">{t("about.yearsLabel")}</div>
              <p className="mt-3 text-sm text-white/80">{t("about.yearsBody")}</p>
            </div>
          </div>
          {(["mission", "vision"] as const).map((k) => (
            <div key={k} className="surface p-8">
              <span className="text-sm font-semibold text-brand-600">
                {t(`about.${k}.label`)}
              </span>
              <h3 className="mt-3 font-display text-2xl">{t(`about.${k}.title`)}</h3>
              <p className="mt-3 text-ink-600">{t(`about.${k}.body`)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What we offer */}
      <section className="section pt-0">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center" data-reveal>
            <h2 className="section-title">
              <Highlight text={t("about.offerTitle")} className="text-brand-600" />
            </h2>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5" data-reveal>
            {offers.map((o) => (
              <div
                key={o.key}
                className="group surface p-6 transition duration-300 hover:-translate-y-1 hover:shadow-pop"
              >
                <span className="icon-tile">
                  <Glyph name={o.glyph} size={20} />
                </span>
                <h3 className="mt-5 font-sans text-base font-semibold leading-snug text-ink-900">
                  {t(`about.offer.${o.key}.title`)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">
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
