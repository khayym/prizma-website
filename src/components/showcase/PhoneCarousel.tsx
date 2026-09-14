import * as React from "react";
import { useTranslation } from "gatsby-plugin-react-i18next";
import Glyph from "../Glyph";
import PhoneFrame from "./PhoneFrame";
import { useScreens, type ModuleKey } from "./screens";

const screens: ModuleKey[] = ["home", "processes", "hr", "isg", "equipment", "menu"];
const STEP = 360 / screens.length;
/** Pause between automatic turns. */
const AUTO_TURN_MS = 2500;
/** Ring rotation per pixel dragged. */
const DEG_PER_PX = 0.35;
/** How long a released drag keeps coasting at its final speed. */
const FLING_MS = 350;

const snap = (angle: number) => Math.round(angle / STEP) * STEP;
const wrap = (i: number) => ((i % screens.length) + screens.length) % screens.length;
/** Shortest signed number of steps from `from` to `to` around the ring. */
const stepsBetween = (from: number, to: number) =>
  ((to - from + screens.length + screens.length / 2) % screens.length) - screens.length / 2;

interface DragState {
  startX: number;
  startAngle: number;
  lastX: number;
  lastTime: number;
  velocity: number;
  moved: boolean;
}

/**
 * Ferris-wheel of real mobile app screens in the site language. Turns on its
 * own every few seconds; visitors can drag or flick it to spin faster, tap a
 * side phone, or use the arrows and keyboard.
 */
const PhoneCarousel: React.FC = () => {
  const { t } = useTranslation();
  const { mobile } = useScreens();
  const [angle, setAngle] = React.useState(0);
  const [duration, setDuration] = React.useState(800);
  const [dragging, setDragging] = React.useState(false);
  const [paused, setPaused] = React.useState(false);
  const drag = React.useRef<DragState | null>(null);

  const active = wrap(Math.round(-angle / STEP));

  const turnTo = React.useCallback(
    (target: number) => {
      const next = snap(target);
      setDuration(Math.min(1800, Math.max(700, Math.abs(next - angle) * 6)));
      setAngle(next);
    },
    [angle],
  );
  const turnBy = (steps: number) => turnTo(snap(angle) - steps * STEP);

  React.useEffect(() => {
    if (dragging || paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    const id = window.setTimeout(() => turnTo(angle - STEP), AUTO_TURN_MS);
    return () => window.clearTimeout(id);
  }, [angle, dragging, paused, turnTo]);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    drag.current = {
      startX: e.clientX,
      startAngle: angle,
      lastX: e.clientX,
      lastTime: e.timeStamp,
      velocity: 0,
      moved: false,
    };
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d) return;
    const dx = e.clientX - d.startX;
    if (!d.moved) {
      // Below the threshold it is still a tap on a phone, not a drag.
      if (Math.abs(dx) < 5) return;
      d.moved = true;
      e.currentTarget.setPointerCapture(e.pointerId);
      setDragging(true);
    }
    const dt = e.timeStamp - d.lastTime;
    if (dt > 0) d.velocity = (e.clientX - d.lastX) / dt;
    d.lastX = e.clientX;
    d.lastTime = e.timeStamp;
    setAngle(d.startAngle + dx * DEG_PER_PX);
  };

  const endDrag = () => {
    const d = drag.current;
    drag.current = null;
    if (!d?.moved) return;
    setDragging(false);
    turnTo(angle + d.velocity * FLING_MS * DEG_PER_PX);
  };

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={t("showcase.label")}
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="pointer-events-none absolute left-1/2 top-[42%] -z-10 h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-200/70 blur-3xl sm:h-[420px] sm:w-[420px]" />

      <div
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") turnBy(-1);
          if (e.key === "ArrowRight") turnBy(1);
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        className={`relative mx-auto h-[380px] touch-pan-y select-none rounded-3xl outline-none [--phone-w:130px] [--ring-r:150px] focus-visible:ring-2 focus-visible:ring-brand-400 sm:h-[500px] sm:[--phone-w:200px] sm:[--ring-r:230px] ${
          dragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        style={{ perspective: "1600px" }}
      >
        <div
          className="absolute left-1/2 top-1/2"
          style={{
            transformStyle: "preserve-3d",
            transform: `translateZ(calc(var(--ring-r) * -1)) rotateY(${angle}deg)`,
            transition: dragging
              ? "none"
              : `transform ${duration}ms cubic-bezier(0.22, 1, 0.36, 1)`,
          }}
        >
          {screens.map((key, i) => {
            // Angle of this phone relative to the viewer, in (-180, 180].
            const relative = ((((i * STEP + angle) % 360) + 540) % 360) - 180;
            const facing = Math.cos((relative * Math.PI) / 180);
            return (
              <div
                key={key}
                aria-hidden={i !== active}
                onClick={() => turnBy(stepsBetween(active, i))}
                className="absolute left-0 top-0 w-[var(--phone-w)]"
                style={{
                  transform: `translate(-50%, -50%) rotateY(${i * STEP}deg) translateZ(var(--ring-r))`,
                  backfaceVisibility: "hidden",
                  opacity: facing > 0 ? 0.35 + 0.65 * facing : 0,
                  transition: dragging ? "none" : `opacity ${duration}ms ease`,
                }}
              >
                <PhoneFrame>
                  <img
                    src={mobile[key]}
                    alt={i === active ? t(`showcase.modules.${key}`) : ""}
                    draggable={false}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover object-top"
                  />
                </PhoneFrame>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-2 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => turnBy(-1)}
          aria-label={t("showcase.prev")}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-ink-800 shadow ring-1 ring-ink-100 transition hover:bg-brand-600 hover:text-white"
        >
          <Glyph name="chevronLeft" size={18} strokeWidth={2.2} />
        </button>
        <div className="min-w-[9rem] text-center">
          <div className="text-lg font-semibold text-ink-900" aria-live="polite">
            {t(`showcase.modules.${screens[active]}`)}
          </div>
          <div className="text-xs text-ink-500">{t("showcase.carouselHint")}</div>
        </div>
        <button
          type="button"
          onClick={() => turnBy(1)}
          aria-label={t("showcase.next")}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-ink-800 shadow ring-1 ring-ink-100 transition hover:bg-brand-600 hover:text-white"
        >
          <Glyph name="chevronRight" size={18} strokeWidth={2.2} />
        </button>
      </div>
      <div className="mt-3 flex justify-center gap-1.5">
        {screens.map((key, i) => (
          <button
            key={key}
            type="button"
            onClick={() => turnBy(stepsBetween(active, i))}
            aria-label={t(`showcase.modules.${key}`)}
            aria-current={i === active}
            className={`h-2 rounded-full transition-all ${
              i === active ? "w-6 bg-brand-600" : "w-2 bg-ink-300 hover:bg-ink-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default PhoneCarousel;
