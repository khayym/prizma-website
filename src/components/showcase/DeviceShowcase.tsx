import * as React from "react";
import { useTranslation } from "gatsby-plugin-react-i18next";
import PhoneFrame from "./PhoneFrame";
import { heroSlides, useScreens, WEB_ASPECT } from "./screens";

/** Both screens switch together every two seconds, then the loop restarts. */
const SLIDE_MS = 2000;

/** Crossfade plus a slow settle-in zoom, so each screenshot feels alive. */
const layerStyle = (active: boolean): React.CSSProperties => ({
  opacity: active ? 1 : 0,
  transform: active ? "scale(1)" : "scale(1.04)",
  transition: "opacity 500ms ease, transform 2400ms cubic-bezier(0.22, 1, 0.36, 1)",
});

/**
 * Hero visual: a monitor with the Prizma web app and a phone with the mobile
 * app, cycling through the same module on both in sync, in the site language.
 */
const DeviceShowcase: React.FC = () => {
  const { t } = useTranslation();
  const screens = useScreens();
  const [index, setIndex] = React.useState(0);
  const [paused, setPaused] = React.useState(false);

  React.useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    const id = window.setTimeout(
      () => setIndex((i) => (i + 1) % heroSlides.length),
      SLIDE_MS,
    );
    return () => window.clearTimeout(id);
  }, [index, paused]);

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label={t("showcase.label")}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative pb-4 pr-8 sm:pr-14">
        <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[3rem] bg-gradient-to-br from-brand-200/70 via-accent-100/60 to-transparent blur-3xl" />

        <div className="rounded-[1.1rem] border-[9px] border-ink-900 bg-ink-900 shadow-[0_30px_80px_-20px_rgba(15,23,42,0.45)]">
          <div
            className="relative overflow-hidden rounded-md bg-white"
            style={{ aspectRatio: WEB_ASPECT }}
          >
            {heroSlides.map((s, i) => (
              <img
                key={s.key}
                src={screens.web[s.key]}
                alt={i === index ? t(`showcase.modules.${s.key}`) : ""}
                aria-hidden={i !== index}
                loading={i === 0 ? "eager" : "lazy"}
                className="absolute inset-0 h-full w-full object-cover object-left-top"
                style={layerStyle(i === index)}
              />
            ))}
          </div>
        </div>
        <div className="mx-auto h-6 w-20 bg-gradient-to-b from-ink-300 to-ink-200 [clip-path:polygon(22%_0,78%_0,100%_100%,0_100%)] sm:h-9 sm:w-28" />
        <div className="mx-auto h-1.5 w-36 rounded-full bg-ink-200 sm:w-48" />

        <div className="absolute bottom-0 right-0 w-[24%] min-w-[92px] max-w-[170px]">
          <PhoneFrame>
            {heroSlides.map((s, i) => (
              <img
                key={s.key}
                src={screens.mobile[s.mobile]}
                alt=""
                aria-hidden="true"
                loading={i === 0 ? "eager" : "lazy"}
                className="absolute inset-0 h-full w-full object-cover object-top"
                style={layerStyle(i === index)}
              />
            ))}
          </PhoneFrame>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap justify-center gap-2">
        {heroSlides.map((s, i) => (
          <button
            key={s.key}
            type="button"
            onClick={() => setIndex(i)}
            aria-pressed={i === index}
            className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
              i === index
                ? "bg-brand-600 text-white shadow-md shadow-brand-600/30"
                : "bg-white text-ink-600 ring-1 ring-ink-200 hover:text-brand-700 hover:ring-brand-300"
            }`}
          >
            {t(`showcase.modules.${s.key}`)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DeviceShowcase;
