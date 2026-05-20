import * as React from "react";
import { useTranslation } from "gatsby-plugin-react-i18next";
import Link from "../components/Link";

const CtaBanner: React.FC = () => {
  const { t } = useTranslation();
  return (
    <section className="pb-24">
      <div className="container">
        <div className="relative overflow-hidden rounded-3xl bg-brand-700 p-10 sm:p-14 text-white">
          <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-brand-600" />
          <div className="absolute -left-10 -bottom-10 h-40 w-40 rounded-full bg-accent-400/30" />
          <div className="relative grid items-center gap-6 lg:grid-cols-[1fr_auto]">
            <h2 className="text-2xl sm:text-3xl text-white">{t("cta.title")}</h2>
            <Link to="/contact" className="btn-accent">
              {t("cta.button")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaBanner;
