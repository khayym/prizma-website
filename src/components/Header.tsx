import * as React from "react";
import { useTranslation } from "gatsby-plugin-react-i18next";
import Link from "./Link";
import Logo from "./Logo";
import LanguageSwitcher from "./LanguageSwitcher";

const Header: React.FC = () => {
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);

  const navItems: { key: string; href: string }[] = [
    { key: "home", href: "/" },
    { key: "about", href: "/about" },
    { key: "services", href: "/services" },
    { key: "blog", href: "/blog" },
    { key: "contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-ink-100 bg-white/80 backdrop-blur">
      <div className="container flex h-16 items-center justify-between gap-6 lg:h-20">
        <Link to="/" className="shrink-0">
          <Logo />
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.key}
              to={item.href}
              className="text-sm font-medium text-ink-700 transition hover:text-ink-900"
              activeClassName="text-ink-900"
            >
              {t(`nav.${item.key}`)}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <LanguageSwitcher />
          <Link to="/#demo" className="btn-ghost">
            {t("nav.requestDemo")}
          </Link>
          <Link to="/#demo" className="btn-primary">
            {t("nav.getStarted")}
          </Link>
        </div>

        <button
          type="button"
          className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-md border border-ink-200"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            aria-hidden="true"
          >
            {open ? (
              <path
                d="M5 5l10 10M15 5L5 15"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M3 6h14M3 10h14M3 14h14"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-ink-100 bg-white">
          <div className="container py-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.key}
                to={item.href}
                className="block rounded-md px-3 py-2 text-sm font-medium text-ink-800 hover:bg-ink-50"
                onClick={() => setOpen(false)}
              >
                {t(`nav.${item.key}`)}
              </Link>
            ))}
            <div className="pt-3 flex items-center justify-between gap-3">
              <LanguageSwitcher />
              <Link to="/#demo" className="btn-primary flex-1 text-center">
                {t("nav.requestDemo")}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
