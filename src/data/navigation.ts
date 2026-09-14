/**
 * Site navigation shared by the header and footer. About, Services and Blog
 * are sections of the home page, so their links scroll there; Contact keeps
 * its own page.
 */
export const navItems: { key: string; href: string }[] = [
  { key: "home", href: "/" },
  { key: "about", href: "/#about" },
  { key: "services", href: "/#services" },
  { key: "blog", href: "/#blog" },
  { key: "contact", href: "/contact" },
];
