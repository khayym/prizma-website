import * as React from "react";
import { useI18next, useTranslation } from "gatsby-plugin-react-i18next";
import Highlight from "../components/Highlight";
import {
  featureKeys,
  getFeatureVideo,
  type FeatureKey,
  type FeatureVideo,
} from "../data/videos";

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
  label: string;
  video?: FeatureVideo;
  playLabel: string;
  onPlay: () => void;
}

/** The approved card chrome — identical for filmed and not-yet-filmed cards. */
const cardShell =
  "group relative flex flex-col overflow-hidden rounded-3xl bg-brand-50 transition duration-300 hover:-translate-y-1 hover:shadow-pop";

const FeatureCard: React.FC<FeatureCardProps> = ({
  featureKey,
  label,
  video,
  playLabel,
  onPlay,
}) => {
  const caption = (
    <div className="flex items-start gap-3 p-5">
      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white">
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
      <span className="text-[15px] font-semibold text-ink-900">
        {video?.title ?? label}
      </span>
    </div>
  );

  // No walkthrough in this language yet — same tile, without the play
  // affordance, so the grid does not change shape when recordings land.
  if (!video) {
    return (
      <div className={cardShell}>
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-gradient-to-b from-brand-600 to-brand-950">

          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              width="52"
              height="52"
              viewBox="0 0 32 32"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white/80 transition duration-300 group-hover:scale-110 group-hover:text-white"
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

  return (
    <div className={cardShell}>
      <button
        type="button"
        onClick={onPlay}
        aria-label={`${playLabel} — ${video.title}`}
        className="relative block aspect-[16/9] w-full overflow-hidden bg-brand-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
      >
        <img
          src={video.poster}
          alt=""
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover object-left-top transition duration-500 group-hover:scale-105"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-950/60 via-transparent to-transparent" />
        <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 shadow-2xl transition-transform duration-300 group-hover:scale-110">
          <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" className="ml-0.5">
            <path d="M6 4l16 8-16 8z" fill="#2563eb" />
          </svg>
        </span>
        <span className="absolute bottom-3 right-3 rounded-full bg-brand-950/80 px-2 py-0.5 text-[11px] font-semibold text-white backdrop-blur-sm">
          {video.duration}
        </span>
      </button>
      {caption}
    </div>
  );
};

interface VideoModalProps {
  video: FeatureVideo;
  closeLabel: string;
  onClose: () => void;
}

/** Full-screen player for a walkthrough: sound, controls, Esc or backdrop to close. */
const VideoModal: React.FC<VideoModalProps> = ({ video, closeLabel, onClose }) => {
  const closeRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={video.title}
      onClick={onClose}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-brand-950/90 p-4 backdrop-blur-sm sm:p-8"
    >
      <div className="w-full max-w-6xl" onClick={(e) => e.stopPropagation()}>
        <div className="mb-3 flex items-center justify-between gap-4">
          <span className="font-display text-xl text-white sm:text-2xl">
            {video.title}
          </span>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label={closeLabel}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-400"
          >
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <video
          src={video.src}
          poster={video.poster}
          controls
          autoPlay
          playsInline
          className="max-h-[80vh] w-full rounded-xl bg-black shadow-2xl"
        />
      </div>
    </div>
  );
};

const Features: React.FC = () => {
  const { t } = useTranslation();
  const { language } = useI18next();
  const [playing, setPlaying] = React.useState<FeatureVideo | null>(null);
  const close = React.useCallback(() => setPlaying(null), []);
  const videos = featureKeys.map((key) => getFeatureVideo(language, key));

  return (
    <section id="features" className="section bg-white">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center" data-reveal>
          <h2 className="section-title">
            <Highlight text={t("features.title")} className="text-brand-600" />
          </h2>
          {videos.some(Boolean) && (
            <p className="mt-4 text-lg text-ink-600">{t("features.hint")}</p>
          )}
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" data-reveal>
          {featureKeys.map((key, i) => (
            <FeatureCard
              key={key}
              featureKey={key}
              label={t(`features.items.${key}`)}
              video={videos[i]}
              playLabel={t("features.play")}
              onPlay={() => setPlaying(videos[i] ?? null)}
            />
          ))}
        </div>
      </div>

      {playing && (
        <VideoModal video={playing} closeLabel={t("features.close")} onClose={close} />
      )}
    </section>
  );
};

export default Features;
