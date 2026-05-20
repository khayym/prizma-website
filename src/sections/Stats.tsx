import * as React from "react";
import { useTranslation } from "gatsby-plugin-react-i18next";

const Stats: React.FC = () => {
  const { t } = useTranslation();
  const items = [
    { value: "50+", key: "partners" },
    { value: "5,000+", key: "users" },
    { value: "500K+", key: "procurements" },
    { value: "1M+", key: "workflows" },
  ];

  return (
    <section className="section">
      <div className="container">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <div
              key={item.key}
              className="rounded-2xl border border-ink-100 bg-white p-6"
            >
              <div className="text-4xl font-semibold text-ink-900">
                {item.value}
              </div>
              <div className="mt-2 text-sm text-ink-600">
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
