import * as React from "react";
import { useTranslation } from "gatsby-plugin-react-i18next";
import Link from "./Link";
import Logo from "./Logo";
import YandexMap from "./YandexMap";
import { navItems } from "../data/navigation";
import { telHref } from "../utils/phone";

/** Navy footer in the zoom.com layout: brand column left, link columns right. */
const Footer: React.FC = () => {
  const { t } = useTranslation();
  const year = new Date().getFullYear();
  const phone = t("footer.phone");

  return (
    <footer className="bg-gradient-to-b from-brand-950 to-[#0f1b3d] text-white">
      <div className="container pb-8 pt-16 lg:pt-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <Logo variant="light" className="h-11" />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/75">
              {t("footer.aboutText")}
            </p>
            <div className="mt-8 max-w-sm overflow-hidden rounded-2xl ring-1 ring-white/15">
              <YandexMap zoom={15} className="h-44" />
            </div>
            <div className="mt-10">
              <div className="text-sm text-white/70">{t("contact.phoneLabel")}</div>
              <a
                href={telHref(phone)}
                className="mt-1 inline-block font-display text-2xl text-white transition hover:text-brand-300 sm:text-3xl"
              >
                {phone}
              </a>
            </div>
            <div className="mt-6 flex gap-5">
              <SocialIcon href="https://www.linkedin.com/company/prizma-flow/" label="LinkedIn">
                <path d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zM8.34 18.34H5.67V9.67h2.67v8.67zM7 8.34a1.67 1.67 0 110-3.34 1.67 1.67 0 010 3.34zm11.34 10H15.67v-4.34c0-1.33-.67-2-1.67-2s-1.67.67-1.67 2v4.34H9.67V9.67h2.67v1.34c.34-.67 1.34-1.67 3-1.67 2 0 3 1.34 3 4v5z" />
              </SocialIcon>
              <SocialIcon href="https://www.youtube.com/@prizmaflow" label="YouTube">
                <path d="M21.6 7.2a2.5 2.5 0 00-1.8-1.8C18.3 5 12 5 12 5s-6.3 0-7.8.4A2.5 2.5 0 002.4 7.2 26 26 0 002 12a26 26 0 00.4 4.8 2.5 2.5 0 001.8 1.8C5.7 19 12 19 12 19s6.3 0 7.8-.4a2.5 2.5 0 001.8-1.8A26 26 0 0022 12a26 26 0 00-.4-4.8zM10 15V9l5 3-5 3z" />
              </SocialIcon>
              <SocialIcon href="https://vkvideo.ru/@prizmaflow" label="VK Video">
                <path d="M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm6 4.5v7l6-3.5-6-3.5z" />
              </SocialIcon>
              <SocialIcon href="https://vk.com" label="VK">
                <path d="M19 5H5a2 2 0 00-2 2v10a2 2 0 002 2h14a2 2 0 002-2V7a2 2 0 00-2-2zm-1.5 8.5c.5.5 1.5 1.3 1.5 2 0 .3-.2.5-.5.5h-2c-.6 0-.8-.5-1.3-1-.5-.4-.7-1-1.2-1-.5 0-.5.7-.5 1.3 0 .5-.3.7-1 .7-1.2 0-2.5-.7-3.4-2.1A12.5 12.5 0 016 8c0-.3.2-.5.5-.5h2c.5 0 .6.3.7.5.3.7.8 1.8 1.3 1.8.3 0 .5-.3.5-1V8c-.1-1-.6-1-.6-1.4 0-.2.2-.4.5-.4h2c.5 0 .6.3.6.6v3c0 .4.1.6.3.6.4 0 .7-.6 1.4-2 .2-.4.4-.7.8-.7h2c.5 0 .6.3.5.6-.3 1.1-1.8 3.2-1.8 3.5 0 .2.1.3.3.5z" />
              </SocialIcon>
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-7 lg:col-start-6">
            <div>
              <h4 className="font-sans text-base font-semibold text-white">
                {t("footer.quickAccess")}
              </h4>
              <ul className="mt-5 space-y-3">
                {navItems.map((item) => (
                  <li key={item.key}>
                    <Link
                      to={item.href}
                      className="text-[15px] text-white/80 transition hover:text-white"
                    >
                      {t(`nav.${item.key}`)}
                    </Link>
                  </li>
                ))}
                <li>
                  <a
                    href="https://vkvideo.ru/@prizmaflow"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[15px] text-white/80 transition hover:text-white"
                  >
                    {t("nav.trainingVideos")}
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-sans text-base font-semibold text-white">
                {t("footer.contact")}
              </h4>
              <ul className="mt-5 space-y-3 text-[15px] text-white/80">
                <li>
                  <a href={telHref(phone)} className="transition hover:text-white">
                    {phone}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${t("footer.email")}`} className="transition hover:text-white">
                    {t("footer.email")}
                  </a>
                </li>
                <li>{t("footer.address")}</li>
                <li>{t("contact.hours")}</li>
              </ul>
            </div>

            <div>
              <h4 className="font-sans text-base font-semibold text-white">
                {t("mobile.title").replace(/<\/?hl>/g, "")}
              </h4>
              <ul className="mt-5 space-y-3 text-[15px] text-white/80">
                <li>
                  <a
                    href="https://apps.apple.com/tr/app/prizma-flow/id1579328322"
                    target="_blank"
                    rel="noreferrer"
                    className="transition hover:text-white"
                  >
                    App Store
                  </a>
                </li>
                <li>
                  <a
                    href="https://play.google.com/store/apps/details?id=com.bpm.theia"
                    target="_blank"
                    rel="noreferrer"
                    className="transition hover:text-white"
                  >
                    Google Play
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 border-t border-white/15 pt-6">
          <p className="text-xs text-white/60">
            © {year} Prizma Flow. {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  );
};

interface SocialIconProps {
  href: string;
  label: string;
  children: React.ReactNode;
}

const SocialIcon: React.FC<SocialIconProps> = ({ href, label, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    aria-label={label}
    className="text-white/85 transition hover:text-brand-300"
  >
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      {children}
    </svg>
  </a>
);

export default Footer;
