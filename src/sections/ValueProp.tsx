import * as React from "react";
import { useTranslation } from "gatsby-plugin-react-i18next";

const items = [
  "digitization",
  "design",
  "integrated",
  "productivity",
  "analytics",
  "integration",
  "mobile",
  "access",
  "reporting",
];

const Icon: React.FC<{ index: number }> = ({ index }) => {
  const paths = [
    "M4 7h16M4 12h16M4 17h10",
    "M5 12l4 4L19 6",
    "M3 7h7v10H3zM14 7h7v10h-7z",
    "M12 3v18M3 12h18",
    "M4 19V5M9 19V9M14 19v-7M19 19v-3",
    "M9 7h6l3 3v7H6V7l3-3z",
    "M7 4h10v16H7zM10 18h4",
    "M12 4l3 3-3 3M12 14l-3 3 3 3M4 12l3-3 3 3M14 12l3-3 3 3",
    "M4 6h16v4H4zM4 14h16v4H4z",
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
