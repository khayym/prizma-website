import * as React from "react";
import { useTranslation } from "gatsby-plugin-react-i18next";
import Link from "./Link";
import Logo from "./Logo";
import LanguageSwitcher from "./LanguageSwitcher";
import Glyph from "./Glyph";
import { navItems } from "../data/navigation";
import { telHref } from "../utils/phone";

/**
 * Top bar in the zoom.com pattern: transparent over the page's dark opening
 * band, solid once the visitor scrolls. Every page opens with a dark band
 * padded for the header height (see Hero, PageHero, blog-post).
 */
const Header: React.FC = () => {
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const phone = t("footer.phone");

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || open;
  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
        solid ? "bg-white text-ink-900 shadow-card" : "bg-transparent text-white"
      }`}
    >
      <div className="container flex h-16 items-center gap-8">
        <Link to="/" className="shrink-0">
          <Logo variant={solid ? "dark" : "light"} className="h-8 lg:h-9" />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.key}
              to={item.href}
              className={`text-sm font-medium transition ${solid ? "text-ink-800 hover:text-brand-600" : "text-white hover:text-white/80"}`}
            >
              {t(`nav.${item.key}`)}
            </Link>
          ))}
        </nav>

        <div className="ml-auto hidden items-center gap-3 lg:flex">
          <LanguageSwitcher variant={solid ? "light" : "dark"} />
          <a
            href={telHref(phone)}
            aria-label={`${t("contact.phoneLabel")}: ${phone}`}
            className="btn-ghost h-11 px-4 text-sm"
          >
            <Glyph name="phone" size={15} strokeWidth={2} />
            <span className="hidden whitespace-nowrap xl:inline">{phone}</span>
          </a>
          <Link to="/#demo" className="btn-primary h-11 px-4 text-sm">
            {t("nav.requestDemo")}
          </Link>
        </div>

        <button
          type="button"
          className="ml-auto inline-flex h-10 w-10 items-center justify-center rounded lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <svg width="22" height="22" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            {open ? (
              <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            ) : (
              <path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="border-t border-ink-100 bg-white lg:hidden">
          <div className="container space-y-1 py-4">
            {navItems.map((item) => (
              <Link
                key={item.key}
                to={item.href}
                className="block rounded px-3 py-2.5 text-[15px] font-medium text-ink-800 hover:bg-brand-50"
                onClick={() => setOpen(false)}
              >
                {t(`nav.${item.key}`)}
              </Link>
            ))}
            <div className="flex items-center justify-between gap-3 pt-3">
              <LanguageSwitcher />
              <Link
                to="/#demo"
                className="btn-primary flex-1 text-center"
                onClick={() => setOpen(false)}
              >
                {t("nav.requestDemo")}
              </Link>
            </div>
            <a href={telHref(phone)} className="btn-ghost mt-2 w-full">
              <Glyph name="phone" size={16} strokeWidth={2} />
              {phone}
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
