import * as React from "react";
import { useI18next } from "gatsby-plugin-react-i18next";

const languages = [
  { code: "ru", label: "RU" },
  { code: "tr", label: "TR" },
  { code: "en", label: "EN" },
];

interface LanguageSwitcherProps {
  /** `dark` sits on the navy header; `light` on white panels. */
  variant?: "light" | "dark";
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ variant = "light" }) => {
  const { language, changeLanguage } = useI18next();
  const dark = variant === "dark";
  return (
    <div
      className={`inline-flex items-center rounded-full p-0.5 text-[11px] font-semibold ${
        dark ? "bg-white/10" : "bg-brand-100"
      }`}
    >
      {languages.map((lang) => {
        const active = lang.code === language;
        return (
          <button
            key={lang.code}
            type="button"
            onClick={() => changeLanguage(lang.code)}
            className={`rounded-full px-2.5 py-1.5 transition ${
              active
                ? dark
                  ? "bg-white text-ink-900"
                  : "bg-ink-900 text-white"
                : dark
                  ? "text-white/80 hover:text-white"
                  : "text-ink-600 hover:text-ink-900"
            }`}
            aria-pressed={active}
          >
            {lang.label}
          </button>
        );
      })}
    </div>
  );
};

export default LanguageSwitcher;
