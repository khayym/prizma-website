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
        // The "P" app mark shared with the Prizma web and mobile apps
        // (theia app icon, 1024px). Generates the manifest and apple-touch
        // icons; the browser-tab favicon is the web app's own favicon.ico,
        // served from static/ and linked in Seo.
        icon: "src/images/prizma-app-icon.png",
        include_favicon: false,
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
