import * as React from "react";
import { Link as I18nLink } from "gatsby-plugin-react-i18next";

interface LinkProps {
  to: string;
  className?: string;
  activeClassName?: string;
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  language?: string;
  state?: Record<string, unknown>;
}

const Link = I18nLink as unknown as React.ComponentType<LinkProps>;

export default Link;
