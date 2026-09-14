import * as React from "react";
import { graphql, HeadFC } from "gatsby";
import { useTranslation } from "gatsby-plugin-react-i18next";
import Layout from "../components/Layout";
import Seo from "../components/Seo";
import Highlight from "../components/Highlight";
import StoreBadges, {
  APP_STORE_URL,
  GOOGLE_PLAY_URL,
} from "../components/StoreBadges";

/**
 * Target of the QR code in the mobile-app section: sends phones straight to
 * their store and shows both badges to everyone else.
 */
const AppLinkPage: React.FC = () => {
  const { t } = useTranslation();

  React.useEffect(() => {
    const ua = navigator.userAgent;
    // iPadOS reports a desktop Safari user agent; touch support gives it away.
    const isIos =
      /iPhone|iPad|iPod/i.test(ua) ||
      (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1);
    if (isIos) window.location.replace(APP_STORE_URL);
    else if (/Android/i.test(ua)) window.location.replace(GOOGLE_PLAY_URL);
  }, []);

  return (
    <Layout>
      <section className="section">
        <div className="container">
          <div className="mx-auto max-w-xl text-center">
            <h1 className="section-title">
              <Highlight text={t("mobile.title")} className="text-brand-600" />
            </h1>
            <p className="mt-4 text-lg text-ink-600">{t("appLink.body")}</p>
            <StoreBadges className="mt-8 justify-center" />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AppLinkPage;

export const Head: HeadFC = () => <Seo title="App" />;

export const query = graphql`
  query ($language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`;
