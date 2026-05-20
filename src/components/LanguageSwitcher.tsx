import * as React from "react";
import { useI18next } from "gatsby-plugin-react-i18next";

const languages = [
  { code: "ru", label: "RU" },
  { code: "tr", label: "TR" },
  { code: "en", label: "EN" },
];

const LanguageSwitcher: React.FC = () => {
  const { language, changeLanguage } = useI18next();
  return (
    <div className="inline-flex items-center rounded-full border border-ink-200 p-1 text-xs font-semibold">
      {languages.map((lang) => {
        const active = lang.code === language;
        return (
          <button
            key={lang.code}
            type="button"
            onClick={() => changeLanguage(lang.code)}
            className={`rounded-full px-3 py-1 transition ${
              active
                ? "bg-ink-900 text-white"
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
