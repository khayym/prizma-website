import * as React from "react";
import { useI18next, useTranslation } from "gatsby-plugin-react-i18next";

/** Igarsky proezd 11, Moscow — the Prizma Flow office. */
const OFFICE = { lat: 55.857708, lon: 37.640845 };

const mapLanguage: Record<string, string> = {
  ru: "ru_RU",
  en: "en_US",
  tr: "tr_TR",
};

interface YandexMapProps {
  zoom?: number;
  className?: string;
}

/** Yandex Maps embed widget with the office pinned; needs no API key. */
const YandexMap: React.FC<YandexMapProps> = ({ zoom = 16, className = "" }) => {
  const { t } = useTranslation();
  const { language } = useI18next();
  const point = `${OFFICE.lon},${OFFICE.lat}`;
  const params = new URLSearchParams({
    ll: point,
    z: String(zoom),
    pt: `${point},pm2blm`,
    lang: mapLanguage[language] ?? mapLanguage.ru,
  });

  return (
    <iframe
      title={t("contact.mapTitle")}
      src={`https://yandex.ru/map-widget/v1/?${params.toString()}`}
      className={`block w-full border-0 ${className}`}
      loading="lazy"
      allowFullScreen
    />
  );
};

export default YandexMap;
