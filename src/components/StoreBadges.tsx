import * as React from "react";
import { useTranslation } from "gatsby-plugin-react-i18next";

export const APP_STORE_URL =
  "https://apps.apple.com/tr/app/prizma-flow/id1579328322";
export const GOOGLE_PLAY_URL =
  "https://play.google.com/store/apps/details?id=com.bpm.theia";

const badgeClass =
  "inline-flex items-center gap-3 rounded-2xl bg-ink-950 py-2.5 pl-4 pr-6 text-white shadow-lg ring-1 ring-ink-800 transition duration-300 hover:-translate-y-0.5 hover:bg-brand-700 hover:ring-brand-600";

/** App Store and Google Play download badges. */
const StoreBadges: React.FC<{ className?: string }> = ({ className = "" }) => {
  const { t } = useTranslation();
  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      <a
        href={APP_STORE_URL}
        target="_blank"
        rel="noreferrer"
        className={badgeClass}
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M16.37 1.43c0 1.14-.49 2.27-1.18 3.08-.74.9-1.99 1.57-2.99 1.57-.12 0-.23-.02-.3-.03-.01-.06-.04-.22-.04-.39 0-1.15.57-2.27 1.21-2.98.8-.94 2.14-1.64 3.25-1.68.03.13.05.28.05.43zm4.56 15.71c-.03.07-.46 1.58-1.52 3.12-.94 1.34-1.94 2.71-3.43 2.71-1.52 0-1.9-.88-3.63-.88-1.7 0-2.3.91-3.67.91-1.38 0-2.33-1.26-3.43-2.8-1.29-1.82-2.32-4.63-2.32-7.28 0-4.28 2.8-6.55 5.55-6.55 1.45 0 2.68.95 3.6.95.87 0 2.22-1.01 3.9-1.01.61 0 2.89.06 4.37 2.19-.13.09-2.38 1.37-2.38 4.19 0 3.26 2.85 4.42 2.96 4.45z" />
        </svg>
        <span className="text-left leading-tight">
          <span className="block text-[11px] font-medium text-white/70">
            {t("mobile.appStore")}
          </span>
          <span className="block text-xl font-semibold">App Store</span>
        </span>
      </a>
      <a
        href={GOOGLE_PLAY_URL}
        target="_blank"
        rel="noreferrer"
        className={badgeClass}
      >
        <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M3.6 1.8L13.4 11.6 3.6 21.4z" fill="#00c3ff" />
          <path d="M3.6 1.8l13.2 7.15-3.4 2.65z" fill="#00f076" />
          <path d="M3.6 21.4l9.8-9.8 3.4 2.65z" fill="#ff3a44" />
          <path d="M16.8 8.95l4.4 2.65-4.4 2.65-3.4-2.65z" fill="#ffd500" />
        </svg>
        <span className="text-left leading-tight">
          <span className="block text-[11px] font-medium text-white/70">
            {t("mobile.googlePlay")}
          </span>
          <span className="block text-xl font-semibold">Google Play</span>
        </span>
      </a>
    </div>
  );
};

export default StoreBadges;
