import * as React from "react";
import { useStaticQuery, graphql } from "gatsby";

interface SeoProps {
  title?: string;
  description?: string;
  lang?: string;
}

const Seo: React.FC<SeoProps> = ({ title, description, lang = "en" }) => {
  const data = useStaticQuery<{
    site: {
      siteMetadata: { title: string; description: string; siteUrl: string };
    };
  }>(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          siteUrl
        }
      }
    }
  `);

  const meta = data.site.siteMetadata;
  const pageTitle = title ? `${title} – ${meta.title}` : meta.title;
  const pageDescription = description || meta.description;

  return (
    <>
      <html lang={lang} />
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
    </>
  );
};

export default Seo;
