import * as React from "react";
import { useI18next } from "gatsby-plugin-react-i18next";

/** The page context gatsby-plugin-react-i18next adds to every page. */
export interface I18nPageContext {
  language: string;
  i18n: { defaultLanguage: string };
}

/**
 * About, Services and Blog moved onto the home page. Their old URLs stay
 * reachable (bookmarks, search results) and forward to the matching section.
 */
const RedirectPage: React.FC<{ hash: string }> = ({ hash }) => {
  const { navigate } = useI18next();
  React.useEffect(() => {
    navigate(`/#${hash}`, { replace: true });
  }, [navigate, hash]);
  return null;
};

/** No-JS fallback for `RedirectPage`, and keeps the stub out of search indexes. */
export const RedirectHead: React.FC<{
  hash: string;
  pageContext: I18nPageContext;
}> = ({ hash, pageContext }) => {
  const prefix =
    pageContext.language === pageContext.i18n.defaultLanguage
      ? ""
      : `/${pageContext.language}`;
  return (
    <>
      <meta name="robots" content="noindex" />
      <meta httpEquiv="refresh" content={`0; url=${prefix}/#${hash}`} />
    </>
  );
};

export default RedirectPage;
