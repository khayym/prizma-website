import * as React from "react";
import { useTranslation } from "gatsby-plugin-react-i18next";
import {
  featurePreviews,
  isReady,
  resolveVideo,
  type FeatureKey,
  type VideoSlot,
} from "../data/videos";

/** Order the cards appear in the grid; keys match `features.items.*`. */
const featureOrder: FeatureKey[] = [
  "budget",
  "projects",
  "approvals",
  "routes",
  "control",
  "history",
  "export",
  "monitoring",
  "integration",
  "personnel",
  "hr",
  "ar",
];

/**
 * Glyph per feature, drawn on the placeholder tile so the twelve cards stay
 * distinguishable while their clips are still being filmed.
 */
const glyphs: Record<FeatureKey, React.ReactNode> = {
  budget: (
    <>
      <path d="M4 20h24M8 20V11M14 20V6M20 20v-6M26 20V9" />
      <path d="M4 26h24" opacity="0.45" />
    </>
  ),
  projects: (
    <>
      <path d="M4 8h9l2 3h13v13a2 2 0 01-2 2H6a2 2 0 01-2-2z" />
      <path d="M4 16h24" opacity="0.45" />
    </>
  ),
  approvals: (
    <>
      <path d="M6 16l6 6L26 8" />
      <path d="M6 25h20" opacity="0.45" />
    </>
  ),
  routes: (
    <>
      <path d="M7 6v12a5 5 0 005 5h8" />
      <path d="M17 19l4 4-4 4" />
      <circle cx="7" cy="6" r="2.5" opacity="0.45" />
    </>
  ),
  control: (
    <>
      <circle cx="16" cy="16" r="10" />
      <path d="M16 10v6l4 3" />
    </>
  ),
  history: (
    <>
      <path d="M5 16a11 11 0 1111 11" />
      <path d="M5 10v6h6" />
      <path d="M16 11v5l4 2" opacity="0.6" />
    </>
  ),
  export: (
    <>
      <path d="M16 5v14" />
      <path d="M11 14l5 5 5-5" />
      <path d="M6 23v3h20v-3" opacity="0.6" />
    </>
  ),
  monitoring: (
    <>
      <path d="M4 18l6-7 5 5 5-9 8 12" />
      <circle cx="10" cy="11" r="2" opacity="0.45" />
    </>
  ),
  integration: (
    <>
      <circle cx="9" cy="9" r="4" />
      <circle cx="23" cy="23" r="4" />
      <path d="M12 11l9 9" opacity="0.6" />
      <circle cx="23" cy="9" r="4" opacity="0.45" />
    </>
  ),
  personnel: (
    <>
      <circle cx="16" cy="11" r="4.5" />
      <path d="M7 26a9 9 0 0118 0" />
    </>
  ),
  hr: (
    <>
      <circle cx="11" cy="11" r="4" />
      <path d="M4 25a7 7 0 0114 0" />
      <path d="M21 12h7M21 17h7M21 22h5" opacity="0.55" />
    </>
  ),
  ar: (
    <>
      <path d="M5 9h22v14H5z" />
      <path d="M5 14h22" opacity="0.45" />
      <path d="M10 19h5" />
    </>
  ),
};

interface FeatureCardProps {
  featureKey: FeatureKey;
  slot: VideoSlot;
  label: string;
  playLabel: string;
  pauseLabel: string;
}

/** The approved card chrome — identical for filmed and not-yet-filmed cards. */
const cardShell =
  "group relative flex flex-col overflow-hidden rounded-2xl border border-ink-700/60 bg-ink-800/60 backdrop-blur transition-all duration-300 hover:border-accent-400/60 hover:bg-ink-800 hover:shadow-[0_20px_50px_-20px_rgba(190,242,100,0.25)]";

const FeatureCard: React.FC<FeatureCardProps> = ({
  featureKey,
  slot,
  label,
  playLabel,
  pauseLabel,
}) => {
  const videoRef = React.useRef<HTMLVideoElement | null>(null);
  const [active, setActive] = React.useState(false);
  const media = resolveVideo(slot);

  const start = React.useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    setActive(true);
    v.play().catch(() => undefined);
  }, []);

  const stop = React.useCallback(() => {
    setActive(false);
    videoRef.current?.pause();
  }, []);

  const caption = (
    <div className="flex items-start gap-3 p-5">
      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent-400 text-ink-900">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path
            d="M2 7l3.5 3.5L12 4"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="text-sm font-medium text-ink-100">{label}</span>
    </div>
  );

  // No clip delivered yet — same tile as a filmed card, just without the video
  // and without the play affordance. Styling stays identical to the approved
  // design so the grid does not change shape when clips land.
  if (!media) {
    return (
      <div className={cardShell}>
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-ink-950">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand-900/30 via-transparent to-ink-950/60" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink-950/70 to-transparent" />

          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              width="48"
              height="48"
              viewBox="0 0 32 32"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white/25 transition-colors duration-300 group-hover:text-white/40"
              aria-hidden="true"
            >
              {glyphs[featureKey]}
            </svg>
          </div>
        </div>
        {caption}
      </div>
    );
  }

  const toggle = () => (active ? stop() : start());

  return (
    <div
      className={cardShell}
      onMouseEnter={start}
      onMouseLeave={stop}
    >
      <button
        type="button"
        onClick={toggle}
        onFocus={start}
        onBlur={stop}
        aria-label={active ? `${pauseLabel} — ${label}` : `${playLabel} — ${label}`}
        aria-pressed={active}
        className="relative block aspect-[16/9] w-full overflow-hidden bg-ink-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-400"
      >
        <video
          ref={videoRef}
          src={media.src}
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500"
          style={{ opacity: active ? 1 : 0.7 }}
          preload="metadata"
          muted
          loop
          playsInline
          aria-hidden="true"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand-900/30 via-transparent to-ink-950/60" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink-950/70 to-transparent" />

        <span
          className={`pointer-events-none absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-ink-950/70 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.12em] text-white backdrop-blur-sm transition-opacity duration-300 ${
            active ? "opacity-100" : "opacity-0"
          }`}
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-400 opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent-400" />
          </span>
          Preview
        </span>
      </button>
      {caption}
    </div>
  );
};

const Features: React.FC = () => {
  const { t } = useTranslation();
  const anyPlayable = featureOrder.some((key) => isReady(featurePreviews[key]));

  return (
    <section id="features" className="section bg-ink-900 text-white">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-300">
            {t("features.eyebrow")}
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl text-white">
            {t("features.title")}
          </h2>
          {anyPlayable && (
            <p className="mt-3 text-sm text-ink-400">{t("features.hint")}</p>
          )}
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featureOrder.map((key) => (
            <FeatureCard
              key={key}
              featureKey={key}
              slot={featurePreviews[key]}
              label={t(`features.items.${key}`)}
              playLabel={t("features.play")}
              pauseLabel={t("features.pause")}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
