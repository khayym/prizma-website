import * as React from "react";

interface VideoPlayerProps {
  src: string;
  title?: string;
  caption?: string;
  playLabel?: string;
  className?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  src,
  title,
  caption,
  playLabel = "Play video",
  className = "",
}) => {
  const [active, setActive] = React.useState(false);
  const videoRef = React.useRef<HTMLVideoElement | null>(null);

  const handleStart = () => {
    setActive(true);
    requestAnimationFrame(() => {
      videoRef.current?.play().catch(() => undefined);
    });
  };

  return (
    <div className={`relative mx-auto w-full max-w-5xl ${className}`}>
      <div className="pointer-events-none absolute -inset-x-10 -bottom-10 -top-6 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[80%] w-[90%] -translate-x-1/2 -translate-y-1/2 rounded-[3rem] bg-gradient-to-br from-brand-100 to-accent-100 opacity-60 blur-3xl" />
      </div>

      <div className="relative rounded-[1.75rem] border-[10px] border-ink-900 bg-ink-900 shadow-[0_30px_80px_-20px_rgba(15,23,42,0.45)]">
        <div className="absolute left-1/2 top-[6px] z-20 -translate-x-1/2">
          <div className="h-1.5 w-12 rounded-full bg-ink-800" />
        </div>

        <div className="overflow-hidden rounded-[0.85rem] bg-ink-950">
          <div className="flex items-center gap-3 border-b border-ink-200/10 bg-ink-50 px-4 py-2.5">
            <div className="flex gap-1.5">
              <span className="h-3 w-3 rounded-full bg-red-400" />
              <span className="h-3 w-3 rounded-full bg-yellow-400" />
              <span className="h-3 w-3 rounded-full bg-green-400" />
            </div>
            <div className="ml-2 flex flex-1 items-center justify-center">
              <div className="flex max-w-xs items-center gap-2 rounded-full bg-white px-3 py-1 text-[11px] font-medium text-ink-500 shadow-sm">
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M12 2a7 7 0 017 7c0 4.5-5.5 11-7 13-1.5-2-7-8.5-7-13a7 7 0 017-7zm0 5a2 2 0 100 4 2 2 0 000-4z"
                    fill="currentColor"
                  />
                </svg>
                <span>prizmaflow.com/app</span>
              </div>
            </div>
            <div className="hidden sm:block w-12" />
          </div>

          <div className="relative aspect-[16/10] w-full bg-ink-950">
            {!active && (
              <button
                type="button"
                onClick={handleStart}
                className="group absolute inset-0 z-10 flex items-center justify-center overflow-hidden focus:outline-none focus-visible:ring-4 focus-visible:ring-accent-300"
                aria-label={playLabel}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-brand-700 via-brand-800 to-ink-900" />
                <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_20%_20%,#7dd3fc_0%,transparent_45%),radial-gradient(circle_at_85%_75%,#2563eb_0%,transparent_50%)]" />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink-950/70 to-transparent" />

                <div className="relative flex flex-col items-center gap-5 px-8 text-center">
                  <span className="flex h-20 w-20 items-center justify-center rounded-full bg-white/95 shadow-2xl transition-transform duration-300 group-hover:scale-110 group-active:scale-95">
                    <svg
                      width="30"
                      height="30"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden="true"
                      className="ml-1"
                    >
                      <path d="M6 4l16 8-16 8z" fill="#1d4ed8" />
                    </svg>
                  </span>
                  {title && (
                    <span className="text-lg font-semibold text-white sm:text-xl">
                      {title}
                    </span>
                  )}
                  {caption && (
                    <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/80 backdrop-blur-sm">
                      {caption}
                    </span>
                  )}
                </div>
              </button>
            )}

            <video
              ref={videoRef}
              src={src}
              className="absolute inset-0 h-full w-full object-cover"
              preload={active ? "auto" : "none"}
              playsInline
              controls={active}
            />
          </div>
        </div>
      </div>

      <div className="mx-auto mt-2 h-3 w-[103%] -translate-x-[1.5%] rounded-b-3xl bg-gradient-to-b from-ink-200 to-ink-100 shadow-md" />
      <div className="mx-auto h-1 w-1/5 rounded-b-full bg-ink-200/80" />
    </div>
  );
};

export default VideoPlayer;
