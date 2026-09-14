import { useI18next } from "gatsby-plugin-react-i18next";
import tr from "./screens-tr";
import ru from "./screens-ru";
import en from "./screens-en";

/**
 * Real screenshots of the Prizma web app (dev.prizmapm.com, 1440×813) and the
 * mobile app (iOS simulator, 1206×2622 scaled down), captured once per site
 * language with the apps switched to that language. Keys match
 * `showcase.modules.*` in the locale files.
 */
export type ModuleKey =
  | "home"
  | "menu"
  | "processes"
  | "hr"
  | "isg"
  | "equipment"
  | "erp";

export type WebModuleKey = "processes" | "hr" | "isg" | "equipment" | "erp";

export interface ScreenSet {
  web: Record<WebModuleKey, string>;
  mobile: Record<ModuleKey, string>;
}

/** Width / height of the web captures, for the monitor mockup. */
export const WEB_ASPECT = "1440 / 813";
/** Width / height of the mobile captures, for the phone mockup. */
export const MOBILE_ASPECT = "1206 / 2622";

const screenSets: Record<string, ScreenSet> = { tr, ru, en };

/** The screenshot set for the current site language. */
export const useScreens = (): ScreenSet => {
  const { language } = useI18next();
  return screenSets[language] ?? screenSets.ru;
};

/** Hero slides: each module on the web app, paired with the phone screen. */
export const heroSlides: { key: WebModuleKey; mobile: ModuleKey }[] = [
  { key: "processes", mobile: "home" },
  { key: "hr", mobile: "hr" },
  { key: "isg", mobile: "isg" },
  { key: "equipment", mobile: "equipment" },
  { key: "erp", mobile: "erp" },
];
