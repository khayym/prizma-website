import * as React from "react";
import { useTranslation } from "gatsby-plugin-react-i18next";
import Link from "./Link";
import Logo from "./Logo";

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  const quickLinks: { key: string; href: string }[] = [
    { key: "home", href: "/" },
    { key: "about", href: "/about" },
    { key: "services", href: "/services" },
    { key: "blog", href: "/blog" },
    { key: "contact", href: "/contact" },
  ];

  return (
    <footer className="border-t border-ink-100 bg-ink-50">
      <div className="container py-16">
        <div className="grid gap-10 lg:grid-cols-4">
          <div className="lg:col-span-1 space-y-4">
            <Logo />
            <p className="text-sm text-ink-600 max-w-xs">
              {t("footer.aboutText")}
            </p>
            <a
              href="https://www.youtube.com/@PrizmaFlow"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-brand-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-brand-800"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M21.6 7.2a2.5 2.5 0 00-1.8-1.8C18.3 5 12 5 12 5s-6.3 0-7.8.4A2.5 2.5 0 002.4 7.2 26 26 0 002 12a26 26 0 00.4 4.8 2.5 2.5 0 001.8 1.8C5.7 19 12 19 12 19s6.3 0 7.8-.4a2.5 2.5 0 001.8-1.8A26 26 0 0022 12a26 26 0 00-.4-4.8zM10 15V9l5 3-5 3z" />
              </svg>
              {t("nav.trainingVideos")}
            </a>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-ink-900">
              {t("footer.quickAccess")}
            </h4>
            <ul className="mt-4 space-y-2">
              {quickLinks.map((item) => (
                <li key={item.key}>
                  <Link
                    to={item.href}
                    className="text-sm text-ink-600 hover:text-ink-900"
                  >
                    {t(`nav.${item.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-ink-900">
              {t("footer.contact")}
            </h4>
            <ul className="mt-4 space-y-2 text-sm text-ink-600">
              <li>
                <a
                  href={`tel:${t("footer.phone").replace(/\s/g, "")}`}
                  className="hover:text-ink-900"
                >
                  {t("footer.phone")}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${t("footer.email")}`}
                  className="hover:text-ink-900"
                >
                  {t("footer.email")}
                </a>
              </li>
              <li className="max-w-xs">{t("footer.address")}</li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-ink-900">
              {t("footer.about")}
            </h4>
            <div className="mt-4 flex gap-3">
              <SocialIcon href="https://www.youtube.com/@PrizmaFlow" label="YouTube">
                <path d="M21.6 7.2a2.5 2.5 0 00-1.8-1.8C18.3 5 12 5 12 5s-6.3 0-7.8.4A2.5 2.5 0 002.4 7.2 26 26 0 002 12a26 26 0 00.4 4.8 2.5 2.5 0 001.8 1.8C5.7 19 12 19 12 19s6.3 0 7.8-.4a2.5 2.5 0 001.8-1.8A26 26 0 0022 12a26 26 0 00-.4-4.8zM10 15V9l5 3-5 3z" />
              </SocialIcon>
              <SocialIcon href="https://linkedin.com" label="LinkedIn">
                <path d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zM8.34 18.34H5.67V9.67h2.67v8.67zM7 8.34a1.67 1.67 0 110-3.34 1.67 1.67 0 010 3.34zm11.34 10H15.67v-4.34c0-1.33-.67-2-1.67-2s-1.67.67-1.67 2v4.34H9.67V9.67h2.67v1.34c.34-.67 1.34-1.67 3-1.67 2 0 3 1.34 3 4v5z" />
              </SocialIcon>
              <SocialIcon href="https://vk.com" label="VK">
                <path d="M19 5H5a2 2 0 00-2 2v10a2 2 0 002 2h14a2 2 0 002-2V7a2 2 0 00-2-2zm-1.5 8.5c.5.5 1.5 1.3 1.5 2 0 .3-.2.5-.5.5h-2c-.6 0-.8-.5-1.3-1-.5-.4-.7-1-1.2-1-.5 0-.5.7-.5 1.3 0 .5-.3.7-1 .7-1.2 0-2.5-.7-3.4-2.1A12.5 12.5 0 016 8c0-.3.2-.5.5-.5h2c.5 0 .6.3.7.5.3.7.8 1.8 1.3 1.8.3 0 .5-.3.5-1V8c-.1-1-.6-1-.6-1.4 0-.2.2-.4.5-.4h2c.5 0 .6.3.6.6v3c0 .4.1.6.3.6.4 0 .7-.6 1.4-2 .2-.4.4-.7.8-.7h2c.5 0 .6.3.5.6-.3 1.1-1.8 3.2-1.8 3.5 0 .2.1.3.3.5z" />
              </SocialIcon>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-ink-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-ink-500">
            © {year} Prizma Flow. {t("footer.rights")}
          </p>
          <div className="flex gap-4 text-xs text-ink-500">
            <Link to="/privacy" className="hover:text-ink-900">
              Privacy
            </Link>
            <Link to="/terms" className="hover:text-ink-900">
              Terms
            </Link>
          </div>
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
    className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-ink-700 ring-1 ring-ink-200 transition hover:bg-brand-700 hover:text-white"
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
