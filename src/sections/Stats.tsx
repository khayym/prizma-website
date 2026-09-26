import * as React from "react";
import { useTranslation } from "gatsby-plugin-react-i18next";

interface StatItem {
  key: string;
  end: number;
  suffix: string;
  /** Show one decimal while animating (e.g. 0.4M), trimmed at the end. */
  decimals?: number;
  useGrouping?: boolean;
}

const items: StatItem[] = [
  { key: "partners", end: 50, suffix: "+" },
  { key: "users", end: 5000, suffix: "+", useGrouping: true },
  { key: "procurements", end: 500, suffix: "K+" },
  { key: "workflows", end: 1, suffix: "M+", decimals: 1 },
];

const DURATION = 1800;
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

const formatValue = (value: number, item: StatItem, done: boolean) => {
  let text: string;
  if (item.decimals && !done) {
    text = value.toFixed(item.decimals);
  } else if (item.useGrouping) {
    text = Math.round(value).toLocaleString("en-US");
  } else {
    text = String(Math.round(value));
  }
  return `${text}${item.suffix}`;
};

const CountUp: React.FC<{ item: StatItem; start: boolean }> = ({ item, start }) => {
  const [display, setDisplay] = React.useState(formatValue(0, item, false));

  React.useEffect(() => {
    if (!start) return;
    let raf = 0;
    let from: number | null = null;
    const tick = (now: number) => {
      if (from === null) from = now;
      const progress = Math.min((now - from) / DURATION, 1);
      const value = easeOutCubic(progress) * item.end;
      setDisplay(formatValue(value, item, progress === 1));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, item]);

  return <>{display}</>;
};

/** Ratings-style figures row: serif numbers separated by hairlines. */
const Stats: React.FC = () => {
  const { t } = useTranslation();
  const ref = React.useRef<HTMLDivElement>(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="section pb-8 lg:pb-12">
      <div className="container">
        <div
          ref={ref}
          className="grid grid-cols-2 gap-y-10 lg:grid-cols-4 lg:divide-x lg:divide-ink-200"
        >
          {items.map((item) => (
            <div key={item.key} className="px-4 text-center">
              <div className="font-display text-4xl leading-none text-ink-900 sm:text-5xl lg:text-[3.5rem]">
                <CountUp item={item} start={visible} />
              </div>
              <div className="mt-3 text-sm text-ink-500 sm:text-base">
                {t(`stats.${item.key}`)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
