import type { GatsbyConfig } from "gatsby";
import path from "path";

const config: GatsbyConfig = {
  siteMetadata: {
    title: "Prizma Flow",
    description:
      "Simplify workflows and boost efficiency in ERP and HR with Prizma Flow.",
    siteUrl: "https://prizmaflow.com",
  },
  graphqlTypegen: false,
  plugins: [
    "gatsby-plugin-postcss",
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
