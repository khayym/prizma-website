import * as React from "react";
import { useTranslation } from "gatsby-plugin-react-i18next";

const items = ["inventory", "open", "suppliers"];

const Faq: React.FC = () => {
  const { t } = useTranslation();
  const [openIdx, setOpenIdx] = React.useState<number | null>(0);

  return (
    <section className="section">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">{t("faq.eyebrow")}</span>
          <h2 className="mt-3 text-3xl sm:text-4xl">{t("faq.title")}</h2>
        </div>

        <div className="mx-auto mt-12 max-w-3xl divide-y divide-ink-100 rounded-2xl border border-ink-100 bg-white">
          {items.map((key, i) => {
            const isOpen = openIdx === i;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setOpenIdx(isOpen ? null : i)}
                className="block w-full px-6 py-5 text-left transition hover:bg-ink-50"
                aria-expanded={isOpen}
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="text-base font-semibold text-ink-900">
                    {t(`faq.items.${key}.q`)}
                  </span>
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-700 transition ${
                      isOpen ? "rotate-45" : ""
                    }`}
                    aria-hidden="true"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                    >
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
