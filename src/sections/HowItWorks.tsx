import * as React from "react";
import { useTranslation } from "gatsby-plugin-react-i18next";
import Link from "../components/Link";

const steps = [
  {
    n: "01",
    title: "Map your processes",
    body: "We model your existing flows in Prizma — no rip-and-replace.",
  },
  {
    n: "02",
    title: "Configure approvals",
    body: "Rule-based routing for procurement, payments and HR.",
  },
  {
    n: "03",
    title: "Go live in weeks",
    body: "Roll out across sites with mobile and web access.",
  },
];

const HowItWorks: React.FC = () => {
  const { t } = useTranslation();
  return (
    <section id="how" className="section">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">{t("howItWorks.eyebrow")}</span>
          <h2 className="mt-3 text-3xl sm:text-4xl">
            {t("howItWorks.title")}
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((s) => (
            <div
              key={s.n}
              className="rounded-2xl border border-ink-100 bg-white p-6"
            >
              <div className="text-5xl font-semibold text-brand-700/20">
                {s.n}
              </div>
              <h3 className="mt-4 text-lg">{s.title}</h3>
              <p className="mt-2 text-sm text-ink-600">{s.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link to="/#demo" className="btn-primary">
            {t("howItWorks.cta")}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
