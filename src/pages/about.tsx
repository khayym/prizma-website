import * as React from "react";
import { graphql, HeadFC } from "gatsby";
import { useTranslation } from "gatsby-plugin-react-i18next";
import Layout from "../components/Layout";
import Seo from "../components/Seo";
import PageHero from "../components/PageHero";
import Stats from "../sections/Stats";
import CtaBanner from "../sections/CtaBanner";

const offerKeys = [
  "integrated",
  "productivity",
  "analytics",
  "integration",
  "mobile",
  "access",
];

const OfferIcon: React.FC = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

const AboutPage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Layout>
      <PageHero
        eyebrow={t("about.eyebrow")}
        title={t("about.title")}
        subtitle={t("about.subtitle")}
      />

      {/* Story */}
      <section className="section">
        <div className="container grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-center">
          <div className="relative">
            <div className="aspect-[4/3] overflow-hidden rounded-3xl bg-gradient-to-br from-brand-700 to-brand-900 p-1 shadow-2xl">
              <div className="flex h-full w-full flex-col justify-end rounded-[1.4rem] bg-ink-900 p-8">
                <div className="text-6xl font-semibold text-white">21</div>
                <div className="mt-2 text-lg font-medium text-accent-300">
                  {t("about.yearsLabel")}
                </div>
                <p className="mt-3 text-sm text-ink-300">
                  {t("about.yearsBody")}
                </p>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 hidden h-24 w-24 rounded-2xl bg-accent-400 sm:block" />
          </div>
          <div>
            <span className="eyebrow">{t("about.storyEyebrow")}</span>
            <h2 className="mt-3 text-3xl sm:text-4xl">{t("about.storyTitle")}</h2>
            <p className="mt-5 text-ink-600">{t("about.storyBody1")}</p>
            <p className="mt-4 text-ink-600">{t("about.storyBody2")}</p>
          </div>
        </div>
      </section>

      <Stats />

      {/* Mission & Vision */}
      <section className="section bg-ink-50">
        <div className="container grid gap-6 md:grid-cols-2">
          {(["mission", "vision"] as const).map((k) => (
            <div
              key={k}
              className="rounded-3xl border border-ink-100 bg-white p-8 lg:p-10"
            >
              <span className="inline-flex items-center rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-700">
                {t(`about.${k}.label`)}
              </span>
              <h3 className="mt-5 text-2xl">{t(`about.${k}.title`)}</h3>
              <p className="mt-3 text-ink-600">{t(`about.${k}.body`)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What we offer */}
      <section className="section">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">{t("about.offerEyebrow")}</span>
            <h2 className="mt-3 text-3xl sm:text-4xl">{t("about.offerTitle")}</h2>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {offerKeys.map((key) => (
              <div
                key={key}
                className="rounded-2xl border border-ink-100 bg-white p-6 transition hover:border-brand-200 hover:shadow-lg"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-700 text-white">
                  <OfferIcon />
                </div>
                <h3 className="mt-5 text-lg">
                  {t(`valueProp.items.${key}.title`)}
                </h3>
                <p className="mt-2 text-sm text-ink-600">
                  {t(`valueProp.items.${key}.body`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </Layout>
  );
};

export default AboutPage;

export const Head: HeadFC = () => (
  <Seo title="About" />
);

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
