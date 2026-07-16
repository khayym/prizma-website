import * as React from "react";
import { useTranslation } from "gatsby-plugin-react-i18next";

const items = [
  "process",
  "erp",
  "hr",
  "equipment",
  "ohs",
  "subcon",
  "legal",
  "dms",
  "reporting",
  "ai",
  "chat",
  "settings",
];

const Icon: React.FC<{ index: number }> = ({ index }) => {
  const paths = [
    "M4 6h6v6H4zM14 6h6v12h-6zM4 14h6v6H4z",
    "M3 7l9-4 9 4-9 4-9-4zM3 12l9 4 9-4M3 17l9 4 9-4",
    "M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM22 21v-2a4 4 0 00-3-3.87",
    "M14.7 6.3a4 4 0 00-5.4 5.4L3 18v3h3l6.3-6.3a4 4 0 005.4-5.4l-2.5 2.5-2.4-2.4 2.5-2.5z",
    "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10zM9 12l2 2 4-4",
    "M17 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75",
    "M12 3v18M5 7h14M7 7l-3 7a3 3 0 006 0zM17 7l-3 7a3 3 0 006 0z",
    "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8zM14 2v6h6M9 13h6M9 17h6",
    "M4 19V5M9 19V9M14 19v-7M19 19v-3",
    "M12 3v3M12 18v3M3 12h3M18 12h3M6 6l2 2M16 16l2 2M6 18l2-2M16 8l2-2M12 9a3 3 0 100 6 3 3 0 000-6z",
    "M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z",
    "M12 15a3 3 0 100-6 3 3 0 000 6zM19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 11-4 0v-.09a1.65 1.65 0 00-1-1.51 1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 110-4h.09a1.65 1.65 0 001.51-1 1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06a1.65 1.65 0 001.82.33h.01a1.65 1.65 0 001-1.51V3a2 2 0 114 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82v.01a1.65 1.65 0 001.51 1H21a2 2 0 110 4h-.09a1.65 1.65 0 00-1.51 1z",
  ];
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[index % paths.length]} />
    </svg>
  );
};

const ValueProp: React.FC = () => {
  const { t } = useTranslation();
  return (
    <section className="section bg-ink-50">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">{t("valueProp.eyebrow")}</span>
          <h2 className="mt-3 text-3xl sm:text-4xl">{t("valueProp.title")}</h2>
          <p className="mt-4 text-ink-600">{t("valueProp.subtitle")}</p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {items.map((key, i) => (
            <div
              key={key}
              className="group rounded-2xl border border-ink-100 bg-white p-6 transition hover:border-brand-200 hover:shadow-sm"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                <Icon index={i} />
              </div>
              <h3 className="mt-4 text-lg">
                {t(`valueProp.items.${key}.title`)}
              </h3>
              <p className="mt-2 text-sm text-ink-600">
                {t(`valueProp.items.${key}.body`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValueProp;
