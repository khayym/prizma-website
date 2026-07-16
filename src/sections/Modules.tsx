import * as React from "react";
import { useTranslation } from "gatsby-plugin-react-i18next";

const modules: { key: string; tag: string }[] = [
  { key: "process", tag: "Prizma FLOW" },
  { key: "erp", tag: "Prizma ERP" },
  { key: "accounting", tag: "Prizma ACC" },
  { key: "reporting", tag: "Prizma BI" },
  { key: "hr", tag: "Prizma HR" },
  { key: "equipment", tag: "Prizma EQP" },
  { key: "hse", tag: "Prizma HSE" },
  { key: "subcon", tag: "Prizma SCM" },
  { key: "legal", tag: "Prizma LEG" },
  { key: "dms", tag: "Prizma DMS" },
];

const icons: Record<string, React.ReactNode> = {
  process: <path d="M4 6h6v6H4zM14 6h6v12h-6zM4 14h6v6H4z" />,
  erp: <path d="M3 7l9-4 9 4-9 4-9-4zM3 12l9 4 9-4M3 17l9 4 9-4" />,
  accounting: <path d="M4 4h16v6H4zM4 14h10v6H4zM18 14h2v6h-2z" />,
  reporting: <path d="M4 19V5M9 19V9M14 19v-7M19 19v-3" />,
  hr: (
    <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM22 21v-2a4 4 0 00-3-3.87" />
  ),
  equipment: (
    <path d="M14.7 6.3a4 4 0 00-5.4 5.4L3 18v3h3l6.3-6.3a4 4 0 005.4-5.4l-2.5 2.5-2.4-2.4 2.5-2.5z" />
  ),
  hse: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10zM9 12l2 2 4-4" />,
  subcon: (
    <path d="M17 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
  ),
  legal: <path d="M12 3v18M5 7h14M7 7l-3 7a3 3 0 006 0zM17 7l-3 7a3 3 0 006 0z" />,
  dms: <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8zM14 2v6h6M9 13h6M9 17h6" />,
};

const ModuleIcon: React.FC<{ name: string }> = ({ name }) => (
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
    {icons[name]}
  </svg>
);

const Modules: React.FC = () => {
  const { t } = useTranslation();
  return (
    <section className="section">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">{t("modules.eyebrow")}</span>
          <h2 className="mt-3 text-3xl sm:text-4xl">{t("modules.title")}</h2>
          <p className="mt-3 text-sm text-ink-500">{t("modules.subtitle")}</p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {modules.map((m) => (
            <div
              key={m.key}
              className="rounded-3xl border border-ink-100 bg-white p-7 transition hover:border-brand-200 hover:shadow-lg"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-700 text-white">
                  <ModuleIcon name={m.key} />
                </div>
                <span className="rounded-full bg-ink-100 px-2.5 py-1 text-xs font-medium text-ink-700">
                  {m.tag}
                </span>
              </div>
              <h3 className="mt-5 text-lg">
                {t(`modules.items.${m.key}.title`)}
              </h3>
              <p className="mt-2 text-sm text-ink-600">
                {t(`modules.items.${m.key}.body`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Modules;
