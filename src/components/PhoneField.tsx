import * as React from "react";
import { useTranslation } from "gatsby-plugin-react-i18next";

const COUNTRIES = [
  { code: "ru", dial: "+7", flag: "🇷🇺" },
  { code: "tr", dial: "+90", flag: "🇹🇷" },
  { code: "az", dial: "+994", flag: "🇦🇿" },
  { code: "kz", dial: "+7", flag: "🇰🇿" },
  { code: "uz", dial: "+998", flag: "🇺🇿" },
  { code: "ge", dial: "+995", flag: "🇬🇪" },
  { code: "ua", dial: "+380", flag: "🇺🇦" },
  { code: "ae", dial: "+971", flag: "🇦🇪" },
  { code: "de", dial: "+49", flag: "🇩🇪" },
  { code: "gb", dial: "+44", flag: "🇬🇧" },
  { code: "us", dial: "+1", flag: "🇺🇸" },
];

const defaultByLang: Record<string, string> = {
  ru: "ru",
  tr: "tr",
  en: "us",
};

/**
 * Phone input with a country-code picker. Submits a single `phone` field
 * (e.g. "+90 532 123 45 67") through a hidden input so form serialization
 * stays unchanged.
 */
const PhoneField: React.FC<{ label: string }> = ({ label }) => {
  const { i18n } = useTranslation();
  const [country, setCountry] = React.useState(
    defaultByLang[i18n.language] ?? "tr"
  );
  const [number, setNumber] = React.useState("");
  const dial = COUNTRIES.find((c) => c.code === country)?.dial ?? "";

  return (
    <label className="block">
      <span className="text-sm font-medium text-ink-700">{label}</span>
      <div className="mt-1.5 flex overflow-hidden rounded-xl border border-ink-200 bg-white transition focus-within:border-brand-700 focus-within:ring-2 focus-within:ring-brand-100">
        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          aria-label="Country code"
          className="shrink-0 cursor-pointer border-r border-ink-200 bg-ink-50 py-3 pl-3 pr-1 text-sm text-ink-700 outline-none"
        >
          {COUNTRIES.map((c) => (
            <option key={c.code} value={c.code}>
              {c.flag} {c.dial}
            </option>
          ))}
        </select>
        <input
          type="tel"
          inputMode="tel"
          autoComplete="tel-national"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          className="w-full min-w-0 px-4 py-3 text-sm text-ink-900 outline-none"
        />
      </div>
      <input
        type="hidden"
        name="phone"
        value={number.trim() ? `${dial} ${number.trim()}` : ""}
      />
    </label>
  );
};

export default PhoneField;
