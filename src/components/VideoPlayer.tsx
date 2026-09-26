import * as React from "react";

interface VideoPlayerProps {
  /** Self-hosted video file. Ignored when `embedSrc` is set. */
  src?: string;
  /** Third-party player URL rendered in an iframe once the user hits play. */
  embedSrc?: string;
  /** Plain-text name of the video, used for the iframe title. */
  title?: string;
  /** Content shown on the poster under the play button. */
  overlay?: React.ReactNode;
  caption?: string;
  playLabel?: string;
  className?: string;
}

/** Rounded media block with a navy poster; the player mounts on first play. */
const VideoPlayer: React.FC<VideoPlayerProps> = ({
  src,
  embedSrc,
  title,
  overlay,
  caption,
  playLabel = "Play video",
  className = "",
}) => {
  const [active, setActive] = React.useState(false);
  const videoRef = React.useRef<HTMLVideoElement | null>(null);
  /** No clip delivered yet — show the poster without a play affordance. */
  const awaitingClip = !src && !embedSrc;

  const handleStart = () => {
    setActive(true);
    if (embedSrc) return;
    requestAnimationFrame(() => {
      videoRef.current?.play().catch(() => undefined);
    });
  };

  return (
    <div className={`relative overflow-hidden rounded-3xl bg-brand-950 ${className}`}>
      <div className="relative aspect-[16/9] w-full">
        {!active &&
          React.createElement(
            awaitingClip ? "div" : "button",
            awaitingClip
              ? { className: "group absolute inset-0 z-10 flex items-center justify-center overflow-hidden" }
              : {
                  type: "button",
                  onClick: handleStart,
                  className:
                    "group absolute inset-0 z-10 flex items-center justify-center overflow-hidden focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-300",
                  "aria-label": playLabel,
                },
            <>
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(110% 90% at 50% 110%, #2563eb 0%, #1e40af 35%, #172554 80%)",
                }}
              />
              <div className="relative flex flex-col items-center gap-4 px-6 text-center sm:gap-6 sm:px-8">
                <span
                  className={`flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-pop transition-transform duration-300 sm:h-20 sm:w-20 ${
                    awaitingClip ? "opacity-40" : "group-hover:scale-110 group-active:scale-95"
                  }`}
                >
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="ml-1">
                    <path d="M6 4l16 8-16 8z" fill="#2563eb" />
                  </svg>
                </span>
                {overlay}
                {!awaitingClip && caption && (
                  <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                    {caption}
                  </span>
                )}
              </div>
            </>,
          )}

        {embedSrc
          ? active && (
              <iframe
                src={embedSrc}
                title={title ?? playLabel}
                className="absolute inset-0 h-full w-full border-0"
                allow="autoplay; encrypted-media; fullscreen; picture-in-picture; screen-wake-lock"
                allowFullScreen
              />
            )
          : src && (
              <video
                ref={videoRef}
                src={src}
                className="absolute inset-0 h-full w-full object-cover"
                preload={active ? "auto" : "none"}
                playsInline
                controls={active}
              />
            )}
      </div>
    </div>
  );
};

export default VideoPlayer;
