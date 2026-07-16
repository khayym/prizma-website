import * as React from "react";
import { useTranslation } from "gatsby-plugin-react-i18next";
import appHome from "../images/app-home.png";
import appMenu from "../images/app-menu.png";

const MobileApp: React.FC = () => {
  const { t } = useTranslation();
  return (
    <section className="section bg-ink-50 overflow-hidden">
      <div className="container grid items-center gap-16 lg:grid-cols-2">
        <div>
          <span className="eyebrow">{t("mobile.eyebrow")}</span>
          <h2 className="mt-3 text-3xl sm:text-4xl">{t("mobile.title")}</h2>
          <p className="mt-4 max-w-lg text-ink-600">{t("mobile.body")}</p>

          <ul className="mt-6 grid gap-2 sm:grid-cols-2">
            {["access", "realtime", "approvals", "ux", "secure", "compat"].map((key) => (
              <li
                key={key}
                className="flex items-center gap-2 text-sm text-ink-700"
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-100 text-brand-700">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 14 14"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M2 7l3.5 3.5L12 4"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                {t(`mobile.features.${key}`)}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="https://apps.apple.com/tr/app/prizma-flow/id1579328322"
              target="_blank"
              rel="noreferrer"
              className="btn-primary"
            >
              {t("mobile.appStore")}
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=com.bpm.theia"
              target="_blank"
              rel="noreferrer"
              className="btn-ghost"
            >
              {t("mobile.googlePlay")}
            </a>
          </div>
        </div>

        <div className="relative mx-auto flex h-[420px] w-full max-w-md items-center justify-center sm:h-[560px]">
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-100 blur-3xl opacity-60" />
          </div>

          <PhoneFrame
            src={appMenu}
            alt="Prizma mobile menu"
            className="absolute left-4 top-8 z-0 w-[150px] -rotate-6 sm:left-0 sm:top-6 sm:w-[210px]"
          />
          <PhoneFrame
            src={appHome}
            alt="Prizma mobile home dashboard"
            className="relative z-10 w-[165px] translate-x-10 translate-y-3 rotate-3 sm:w-[240px] sm:translate-x-12 sm:translate-y-4"
          />
        </div>
      </div>
    </section>
  );
};

interface PhoneFrameProps {
  src: string;
  alt: string;
  className?: string;
}

const PhoneFrame: React.FC<PhoneFrameProps> = ({ src, alt, className = "" }) => (
  <div
    className={`rounded-[2.5rem] border-[8px] border-ink-900 bg-ink-900 shadow-2xl ${className}`}
  >
    <img
      src={src}
      alt={alt}
      className="block w-full rounded-[1.9rem]"
      loading="lazy"
    />
  </div>
);

export default MobileApp;
