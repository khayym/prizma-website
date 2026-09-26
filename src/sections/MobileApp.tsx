import * as React from "react";
import { useTranslation } from "gatsby-plugin-react-i18next";
import Highlight from "../components/Highlight";
import StoreBadges from "../components/StoreBadges";
import PhoneCarousel from "../components/showcase/PhoneCarousel";
import appQr from "../images/app-qr.svg";

const featureKeys = ["access", "realtime", "approvals", "ux", "secure", "compat"];

const MobileApp: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section id="mobile" className="section overflow-hidden bg-white">
      <div className="container grid items-center gap-12 lg:grid-cols-2 lg:gap-8">
        <div data-reveal>
          <h2 className="section-title">
            <Highlight text={t("mobile.title")} className="text-brand-600" />
          </h2>
          <p className="mt-6 max-w-xl text-lg text-ink-600">{t("mobile.body")}</p>

          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {featureKeys.map((key) => (
              <li key={key} className="flex items-center gap-3 text-[15px] font-medium text-ink-900">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white">
                  <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M2 7l3.5 3.5L12 4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                {t(`mobile.features.${key}`)}
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap items-center gap-5">
            <StoreBadges />
            <div className="hidden items-center gap-3 rounded-2xl bg-brand-50 p-2.5 pr-4 sm:flex">
              <img src={appQr} alt={t("mobile.qrAlt")} width={88} height={88} className="h-[88px] w-[88px] rounded-lg" />
              <p className="max-w-[9rem] text-sm font-medium leading-snug text-ink-700">{t("mobile.qrHint")}</p>
            </div>
          </div>
        </div>

        <PhoneCarousel />
      </div>
    </section>
  );
};

export default MobileApp;
