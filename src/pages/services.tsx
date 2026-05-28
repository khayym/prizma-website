import * as React from "react";
import { graphql, HeadFC } from "gatsby";
import { useTranslation } from "gatsby-plugin-react-i18next";
import Layout from "../components/Layout";
import Seo from "../components/Seo";
import PageHero from "../components/PageHero";
import HowItWorks from "../sections/HowItWorks";
import CtaBanner from "../sections/CtaBanner";

const services: { key: string; icon: React.ReactNode }[] = [
  {
    key: "planning",
    icon: <path d="M3 3v18h18M7 14l3-4 3 3 5-7" />,
  },
  {
    key: "inventory",
    icon: <path d="M3 7l9-4 9 4-9 4-9-4zM3 12l9 4 9-4M3 17l9 4 9-4" />,
  },
  {
    key: "contracts",
    icon: <path d="M8 3h8l4 4v14H4V3h4zM9 12h6M9 16h6M9 8h2" />,
  },
  {
    key: "finance",
    icon: <path d="M3 6h18v12H3zM3 10h18M7 15h3" />,
  },
  {
    key: "personnel",
    icon: <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2M9 7a4 4 0 100 8 4 4 0 000-8zM22 21v-2a4 4 0 00-3-3.87" />,
  },
  {
    key: "mrp",
    icon: <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16zM3.3 7l8.7 5 8.7-5M12 22V12" />,
  },
  {
    key: "accounting",
    icon: <path d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />,
  },
  {
    key: "customers",
    icon: <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z" />,
  },
  {
    key: "dashboards",
    icon: <path d="M4 19V5M9 19V9M14 19v-7M19 19v-3" />,
  },
];

const ServiceIcon: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {children}
  </svg>
);

const ServicesPage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Layout>
      <PageHero
        eyebrow={t("services.eyebrow")}
        title={t("services.title")}
        subtitle={t("services.subtitle")}
      />

      <section className="section">
        <div className="container">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <div
                key={s.key}
                className="group flex flex-col rounded-3xl border border-ink-100 bg-white p-8 transition hover:border-brand-200 hover:shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-700 text-white transition group-hover:bg-brand-800">
                    <ServiceIcon>{s.icon}</ServiceIcon>
                  </div>
                  <span className="text-4xl font-semibold text-ink-100">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-6 text-xl">
                  {t(`services.items.${s.key}.title`)}
                </h3>
                <p className="mt-2 text-ink-600">
                  {t(`services.items.${s.key}.body`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <HowItWorks />
      <CtaBanner />
    </Layout>
  );
};

export default ServicesPage;

export const Head: HeadFC = () => <Seo title="Services" />;

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
