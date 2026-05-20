import * as React from "react";
import { useTranslation } from "gatsby-plugin-react-i18next";

const modules: { key: string; tags: string[] }[] = [
  { key: "accounting", tags: ["Prizma FLOW"] },
  { key: "process", tags: ["Prizma FLOW"] },
  { key: "erp", tags: ["Prizma ERP"] },
  { key: "reporting", tags: ["Prizma BI"] },
];

const ModuleIcon: React.FC<{ name: string }> = ({ name }) => {
  const map: Record<string, React.ReactNode> = {
    accounting: (
      <path d="M4 4h16v6H4zM4 14h10v6H4zM18 14h2v6h-2z" />
    ),
    process: <path d="M4 6h6v6H4zM14 6h6v12h-6zM4 14h6v6H4z" />,
    erp: <path d="M3 7l9-4 9 4-9 4-9-4zM3 12l9 4 9-4M3 17l9 4 9-4" />,
    reporting: <path d="M4 19V5M9 19V9M14 19v-7M19 19v-3" />,
  };
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
      {map[name]}
    </svg>
  );
};

const Modules: React.FC = () => {
  const { t } = useTranslation();
  return (
    <section className="section">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">{t("modules.eyebrow")}</span>
          <h2 className="mt-3 text-3xl sm:text-4xl">{t("modules.title")}</h2>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {modules.map((m) => (
            <div
              key={m.key}
              className="rounded-3xl border border-ink-100 bg-white p-8 transition hover:border-brand-200 hover:shadow-lg"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-700 text-white">
                  <ModuleIcon name={m.key} />
                </div>
                <div className="flex gap-2">
                  {m.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-ink-100 px-2.5 py-1 text-xs font-medium text-ink-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <h3 className="mt-6 text-xl">
                {t(`modules.items.${m.key}.title`)}
              </h3>
              <p className="mt-2 text-ink-600">
                {t(`modules.items.${m.key}.body`)}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-sm font-semibold uppercase tracking-wider text-ink-400">
          <span>Prizma Flow</span>
          <span>Prizma ERP</span>
          <span>Prizma HR</span>
          <span>Prizma DMS</span>
          <span>Prizma BI</span>
        </div>
      </div>
    </section>
  );
};

export default Modules;
