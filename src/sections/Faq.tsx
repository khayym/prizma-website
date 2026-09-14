import * as React from "react";
import { useTranslation } from "gatsby-plugin-react-i18next";
import Highlight from "../components/Highlight";

const items = [
  "purchases",
  "orders",
  "payments",
  "quotes",
  "stages",
  "reports",
  "dashboards",
  "hr",
  "hrReports",
  "inventory",
];

const Faq: React.FC = () => {
  const { t } = useTranslation();
  const [openKey, setOpenKey] = React.useState<string | null>(items[0]);

  return (
    <section id="faq" className="section">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center" data-reveal>
          <h2 className="section-title">
            <Highlight text={t("faq.title")} className="text-brand-600" />
          </h2>
        </div>

        <div className="mt-12 grid items-start gap-4 lg:grid-cols-2" data-reveal>
          {items.map((key) => {
            const isOpen = openKey === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setOpenKey(isOpen ? null : key)}
                className="block w-full self-start rounded-2xl border border-ink-100 bg-white px-6 py-5 text-left transition hover:border-brand-200 hover:bg-ink-50"
                aria-expanded={isOpen}
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="text-base font-semibold text-ink-900">
                    {t(`faq.items.${key}.q`)}
                  </span>
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition ${
                      isOpen
                        ? "rotate-45 bg-brand-600 text-white"
                        : "bg-brand-50 text-brand-700"
                    }`}
                    aria-hidden="true"
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path
                        d="M7 2v10M2 7h10"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </div>
                {isOpen && (
                  <p className="mt-3 text-sm text-ink-600">
                    {t(`faq.items.${key}.a`)}
                  </p>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Faq;
