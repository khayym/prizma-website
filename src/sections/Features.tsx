import * as React from "react";
import { useTranslation } from "gatsby-plugin-react-i18next";

const items = [
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

const Features: React.FC = () => {
  const { t } = useTranslation();
  return (
    <section className="section bg-ink-900 text-white">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-300">
            {t("features.eyebrow")}
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl text-white">
            {t("features.title")}
          </h2>
        </div>

        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((key) => (
            <div
              key={key}
              className="flex items-start gap-3 rounded-xl border border-ink-700/60 bg-ink-800/60 p-5 backdrop-blur"
            >
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
              <span className="text-sm text-ink-100">
                {t(`features.items.${key}`)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
