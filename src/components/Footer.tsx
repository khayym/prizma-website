import * as React from "react";
import { useTranslation } from "gatsby-plugin-react-i18next";
import Link from "./Link";
import Logo from "./Logo";
import YandexMap from "./YandexMap";
import { navItems } from "../data/navigation";
import { telHref } from "../utils/phone";

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const year = new Date().getFullYear();
  const phone = t("footer.phone");

  return (
    <footer className="relative overflow-hidden bg-brand-700 text-white">
      <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-brand-600" />
      <div className="absolute -left-10 -bottom-10 h-40 w-40 rounded-full bg-accent-400/30" />
      <div className="container relative py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="space-y-4 lg:col-span-3">
            <Logo variant="light" />
            <p className="text-sm text-brand-100 max-w-xs">
              {t("footer.aboutText")}
            </p>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-sm font-semibold text-white">
              {t("footer.quickAccess")}
            </h4>
            <ul className="mt-4 space-y-2">
              {navItems.map((item) => (
                <li key={item.key}>
                  <Link
                    to={item.href}
                    className="text-sm text-brand-100 transition hover:text-white"
                  >
                    {t(`nav.${item.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-sm font-semibold text-white">
              {t("footer.followUs")}
            </h4>
            <div className="mt-4 flex flex-wrap gap-3">
              <SocialIcon
                href="https://www.youtube.com/@prizmaflow"
                label="YouTube"
              >
                <path d="M21.6 7.2a2.5 2.5 0 00-1.8-1.8C18.3 5 12 5 12 5s-6.3 0-7.8.4A2.5 2.5 0 002.4 7.2 26 26 0 002 12a26 26 0 00.4 4.8 2.5 2.5 0 001.8 1.8C5.7 19 12 19 12 19s6.3 0 7.8-.4a2.5 2.5 0 001.8-1.8A26 26 0 0022 12a26 26 0 00-.4-4.8zM10 15V9l5 3-5 3z" />
              </SocialIcon>
              <SocialIcon href="https://vkvideo.ru/@prizmaflow" label="VK Video">
                <path d="M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm6 4.5v7l6-3.5-6-3.5z" />
              </SocialIcon>
              <SocialIcon
                href="https://www.linkedin.com/company/prizma-flow/"
                label="LinkedIn"
              >
                <path d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zM8.34 18.34H5.67V9.67h2.67v8.67zM7 8.34a1.67 1.67 0 110-3.34 1.67 1.67 0 010 3.34zm11.34 10H15.67v-4.34c0-1.33-.67-2-1.67-2s-1.67.67-1.67 2v4.34H9.67V9.67h2.67v1.34c.34-.67 1.34-1.67 3-1.67 2 0 3 1.34 3 4v5z" />
              </SocialIcon>
              <SocialIcon href="https://vk.com" label="VK">
                <path d="M19 5H5a2 2 0 00-2 2v10a2 2 0 002 2h14a2 2 0 002-2V7a2 2 0 00-2-2zm-1.5 8.5c.5.5 1.5 1.3 1.5 2 0 .3-.2.5-.5.5h-2c-.6 0-.8-.5-1.3-1-.5-.4-.7-1-1.2-1-.5 0-.5.7-.5 1.3 0 .5-.3.7-1 .7-1.2 0-2.5-.7-3.4-2.1A12.5 12.5 0 016 8c0-.3.2-.5.5-.5h2c.5 0 .6.3.7.5.3.7.8 1.8 1.3 1.8.3 0 .5-.3.5-1V8c-.1-1-.6-1-.6-1.4 0-.2.2-.4.5-.4h2c.5 0 .6.3.6.6v3c0 .4.1.6.3.6.4 0 .7-.6 1.4-2 .2-.4.4-.7.8-.7h2c.5 0 .6.3.5.6-.3 1.1-1.8 3.2-1.8 3.5 0 .2.1.3.3.5z" />
              </SocialIcon>
            </div>
            <a
              href="https://vkvideo.ru/@prizmaflow"
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-brand-700 transition hover:bg-brand-50"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm-2 14.5v-9l7 4.5-7 4.5z" />
              </svg>
              {t("nav.trainingVideos")}
            </a>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-sm font-semibold text-white">
              {t("footer.contact")}
            </h4>
            <ul className="mt-4 space-y-2 text-sm text-brand-100">
              <li>
                <a href={telHref(phone)} className="transition hover:text-white">
                  {phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${t("footer.email")}`}
                  className="transition hover:text-white"
                >
                  {t("footer.email")}
                </a>
              </li>
              <li className="max-w-xs">{t("footer.address")}</li>
              <li className="max-w-xs">{t("contact.hours")}</li>
            </ul>
          </div>

          <div className="sm:col-span-2 lg:col-span-3">
            <div className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-white/25">
              <YandexMap zoom={15} className="h-48" />
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/20 pt-6">
          <p className="text-xs text-brand-100/80">
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
    className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/20 transition hover:bg-white hover:text-brand-700"
  >
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      {children}
    </svg>
  </a>
);

export default Footer;
