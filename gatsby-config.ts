import type { GatsbyConfig } from "gatsby";
import path from "path";

const config: GatsbyConfig = {
  siteMetadata: {
    title: "Prizma Flow",
    description:
      "Streamline workflows and boost efficiency across ERP and HR with Prizma Flow.",
    siteUrl: "https://prizmaflow.com",
  },
  graphqlTypegen: false,
  plugins: [
    "gatsby-plugin-postcss",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "Prizma Flow",
        short_name: "Prizma",
        start_url: "/",
        background_color: "#ffffff",
        theme_color: "#2563eb",
        display: "standalone",
        // The "a" flag mark lifted from the Prizma Flow wordmark; the wordmark
        // itself is too wide to stay legible at favicon sizes. Generates the
        // full favicon/apple-touch set.
        icon: "src/images/prizma-icon.png",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: path.resolve(__dirname, "src/images"),
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "locale",
        path: path.resolve(__dirname, "locales"),
      },
    },
    {
      resolve: "gatsby-plugin-react-i18next",
      options: {
        localeJsonSourceName: "locale",
        languages: ["en", "ru", "tr"],
        defaultLanguage: "ru",
        siteUrl: "https://prizmaflow.com",
        i18nextOptions: {
          interpolation: { escapeValue: false },
          keySeparator: ".",
          nsSeparator: false,
        },
      },
    },
  ],
};

export default config;
