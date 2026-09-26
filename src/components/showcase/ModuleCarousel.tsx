import * as React from "react";
import { useTranslation } from "gatsby-plugin-react-i18next";
import Glyph, { type GlyphName } from "../Glyph";
import { heroSlides, useScreens, type ModuleKey } from "./screens";

interface Card {
  key: ModuleKey;
  glyph: GlyphName;
  /** Header strip gradient. */
  tone: string;
  /** Show the phone capture instead of the web one. */
  mobile?: boolean;
}

const glyphByKey: Partial<Record<ModuleKey, GlyphName>> = {
  processes: "flow",
  hr: "users",
  isg: "helmet",
  equipment: "truck",
  erp: "layers",
};

const tones = [
  "from-brand-600 to-brand-950",
  "from-accent-500 to-brand-800",
  "from-brand-800 to-brand-950",
  "from-brand-500 to-brand-800",
  "from-accent-600 to-brand-950",
];

const cards: Card[] = [
  ...heroSlides.map<Card>((s, i) => ({
    key: s.key,
    glyph: glyphByKey[s.key] ?? "grid",
    tone: tones[i % tones.length],
  })),
  { key: "home", glyph: "home", tone: "from-brand-700 to-brand-950", mobile: true },
];

/** Auto-advance interval; pauses while the pointer is over the strip. */
const AUTO_MS = 3500;

/**
 * Horizontal strip of module cards under the hero, in the zoom.com pattern:
 * colored title bar with an icon, a real screenshot below, arrows and dots.
 */
const ModuleCarousel: React.FC = () => {
  const { t } = useTranslation();
  const screens = useScreens();
  const trackRef = React.useRef<HTMLDivElement>(null);
  const [active, setActive] = React.useState(0);
  const [paused, setPaused] = React.useState(false);

  const goTo = React.useCallback((i: number) => {
    const track = trackRef.current;
    const card = track?.children[i] as HTMLElement | undefined;
    if (!track || !card) return;
    track.scrollTo({
      left: card.offsetLeft - (track.clientWidth - card.clientWidth) / 2,
      behavior: "smooth",
    });
  }, []);

  // Keep `active` in step with manual scrolling and snapping.
  const onScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const center = track.scrollLeft + track.clientWidth / 2;
    let best = 0;
    let bestDist = Infinity;
    Array.from(track.children).forEach((el, i) => {
      const c = el as HTMLElement;
      const d = Math.abs(c.offsetLeft + c.clientWidth / 2 - center);
      if (d < bestDist) {
        bestDist = d;
        best = i;
      }
    });
    setActive(best);
  };

  React.useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    const id = window.setTimeout(() => goTo((active + 1) % cards.length), AUTO_MS);
    return () => window.clearTimeout(id);
  }, [active, paused, goTo]);

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label={t("showcase.label")}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div
        ref={trackRef}
        onScroll={onScroll}
        className="no-scrollbar -mt-5 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-4 pb-12 pt-5 sm:px-[max(1.5rem,calc((100vw-1280px)/2+1.5rem))]"
      >
        {cards.map((card) => (
          <article
            key={card.key}
            className={`group relative isolate aspect-[3/4] w-[280px] shrink-0 snap-center overflow-hidden rounded-3xl bg-gradient-to-b text-left shadow-pop transition-[transform,box-shadow] duration-500 ease-in-out hover:-translate-y-3 hover:shadow-[0_36px_60px_-20px_rgba(23,37,84,0.6)] sm:w-[320px] [-webkit-mask-image:-webkit-radial-gradient(white,black)] ${card.tone}`}
          >
            <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute inset-x-6 top-6 z-10 flex items-center gap-2.5 text-white">
              <Glyph name={card.glyph} size={24} strokeWidth={2} />
              <span className="text-xl font-semibold">{t(`showcase.modules.${card.key}`)}</span>
            </div>
            {card.mobile ? (
              <img
                src={screens.mobile.home}
                alt=""
                loading="lazy"
                className="absolute left-1/2 top-[24%] w-[62%] -translate-x-1/2 rounded-[1.6rem] border-[5px] border-ink-900 shadow-2xl"
              />
            ) : (
              <img
                src={screens.web[card.key as keyof typeof screens.web]}
                alt=""
                loading="lazy"
                className="absolute left-6 top-[26%] w-[170%] max-w-none rounded-tl-xl shadow-2xl"
              />
            )}
          </article>
        ))}
      </div>

      <div className="container -mt-4 flex items-center justify-between">
        <button
          type="button"
          onClick={() => goTo((active - 1 + cards.length) % cards.length)}
          aria-label={t("showcase.prev")}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-100 text-ink-900 transition hover:bg-brand-200"
        >
          <Glyph name="chevronLeft" size={20} strokeWidth={2.2} />
        </button>
        <div className="flex items-center gap-2">
          {cards.map((card, i) => (
            <button
              key={card.key}
              type="button"
              onClick={() => goTo(i)}
              aria-label={t(`showcase.modules.${card.key}`)}
              aria-current={i === active}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                i === active ? "w-7 bg-brand-950" : "w-2.5 bg-brand-200 hover:bg-brand-300"
              }`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => goTo((active + 1) % cards.length)}
          aria-label={t("showcase.next")}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-100 text-ink-900 transition hover:bg-brand-200"
        >
          <Glyph name="chevronRight" size={20} strokeWidth={2.2} />
        </button>
      </div>
    </div>
  );
};

export default ModuleCarousel;
