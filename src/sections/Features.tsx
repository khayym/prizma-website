import * as React from "react";
import { useTranslation } from "gatsby-plugin-react-i18next";

const HERO_VIDEO = "/videos/hero-loop.mp4";
const DEMO_VIDEO = "/videos/product-demo.mp4";

interface FeatureSpec {
  key: string;
  src: string;
  offset: number;
}

const items: FeatureSpec[] = [
  { key: "budget", src: HERO_VIDEO, offset: 0 },
  { key: "projects", src: DEMO_VIDEO, offset: 2 },
  { key: "approvals", src: HERO_VIDEO, offset: 4 },
  { key: "routes", src: DEMO_VIDEO, offset: 6 },
  { key: "control", src: HERO_VIDEO, offset: 8 },
  { key: "history", src: DEMO_VIDEO, offset: 10 },
  { key: "export", src: HERO_VIDEO, offset: 1 },
  { key: "monitoring", src: DEMO_VIDEO, offset: 3 },
  { key: "integration", src: HERO_VIDEO, offset: 5 },
  { key: "personnel", src: DEMO_VIDEO, offset: 7 },
  { key: "hr", src: HERO_VIDEO, offset: 9 },
  { key: "ar", src: DEMO_VIDEO, offset: 11 },
];

interface FeatureCardProps {
  spec: FeatureSpec;
  label: string;
  playLabel: string;
  pauseLabel: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  spec,
  label,
  playLabel,
  pauseLabel,
}) => {
  const videoRef = React.useRef<HTMLVideoElement | null>(null);
  const [active, setActive] = React.useState(false);

  const start = React.useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    setActive(true);
    if (Number.isFinite(v.duration) && spec.offset < v.duration) {
      v.currentTime = spec.offset;
    }
    v.play().catch(() => undefined);
  }, [spec.offset]);

  const stop = React.useCallback(() => {
    const v = videoRef.current;
    setActive(false);
    if (!v) return;
    v.pause();
    if (Number.isFinite(v.duration) && spec.offset < v.duration) {
      v.currentTime = spec.offset;
    }
  }, [spec.offset]);

  const toggle = () => (active ? stop() : start());

  return (
    <div
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-ink-700/60 bg-ink-800/60 backdrop-blur transition-all duration-300 hover:border-accent-400/60 hover:bg-ink-800 hover:shadow-[0_20px_50px_-20px_rgba(190,242,100,0.25)]"
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
          src={spec.src}
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

      <div className="flex items-start gap-3 p-5">
        <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent-400 text-ink-900">
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            aria-hidden="true"
          >
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
    </div>
  );
};

const Features: React.FC = () => {
  const { t } = useTranslation();
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
          <p className="mt-3 text-sm text-ink-400">{t("features.hint")}</p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((spec) => (
            <FeatureCard
              key={spec.key}
              spec={spec}
              label={t(`features.items.${spec.key}`)}
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
