import * as React from "react";
import { graphql, HeadFC } from "gatsby";
import { useTranslation } from "gatsby-plugin-react-i18next";
import Layout from "../components/Layout";
import Seo from "../components/Seo";
import PageHero from "../components/PageHero";
import Link from "../components/Link";
import { blogPosts as posts } from "../data/blogPosts";

const ArrowIcon: React.FC = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

const BlogPage: React.FC = () => {
  const { t } = useTranslation();
  const [featured, ...rest] = posts;
  const [subscribed, setSubscribed] = React.useState(false);

  return (
    <Layout>
      <PageHero
        eyebrow={t("blog.eyebrow")}
        title={t("blog.title")}
        subtitle={t("blog.subtitle")}
      />

      {/* Featured post */}
      <section className="section">
        <div className="container">
          <article className="grid overflow-hidden rounded-3xl border border-ink-100 bg-white lg:grid-cols-2">
            <div
              className={`relative min-h-[260px] bg-gradient-to-br ${featured.tone} p-8`}
            >
              <span className="inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur">
                {t("blog.featured")}
              </span>
            </div>
            <div className="flex flex-col justify-center p-8 lg:p-12">
              <div className="flex items-center gap-3 text-xs font-medium text-ink-500">
                <span className="text-brand-700">
                  {t(`blog.posts.${featured.key}.category`)}
                </span>
                <span>•</span>
                <span>{t(`blog.posts.${featured.key}.date`)}</span>
              </div>
              <h2 className="mt-4 text-2xl sm:text-3xl">
                {t(`blog.posts.${featured.key}.title`)}
              </h2>
              <p className="mt-3 text-ink-600">
                {t(`blog.posts.${featured.key}.excerpt`)}
              </p>
              <Link
                to={`/blog/${featured.key}`}
                className="mt-6 inline-flex items-center gap-2 self-start text-sm font-semibold text-brand-700 transition hover:gap-3 hover:text-brand-800"
              >
                {t("blog.readMore")}
                <ArrowIcon />
              </Link>
            </div>
          </article>

          {/* Article grid */}
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((p) => (
              <Link
                key={p.key}
                to={`/blog/${p.key}`}
                className="group flex flex-col overflow-hidden rounded-3xl border border-ink-100 bg-white transition hover:border-brand-200 hover:shadow-lg"
              >
                <div
                  className={`h-40 bg-gradient-to-br ${p.tone} transition group-hover:opacity-90`}
                />
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center gap-3 text-xs font-medium text-ink-500">
                    <span className="text-brand-700">
                      {t(`blog.posts.${p.key}.category`)}
                    </span>
                    <span>•</span>
                    <span>{t(`blog.posts.${p.key}.date`)}</span>
                  </div>
                  <h3 className="mt-3 text-lg leading-snug">
                    {t(`blog.posts.${p.key}.title`)}
                  </h3>
                  <p className="mt-2 flex-1 text-sm text-ink-600">
                    {t(`blog.posts.${p.key}.excerpt`)}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 self-start text-sm font-semibold text-brand-700 transition group-hover:gap-3">
                    {t("blog.readMore")}
                    <ArrowIcon />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="section pt-0">
        <div className="container">
          <div className="relative overflow-hidden rounded-3xl bg-brand-900 px-6 py-14 sm:px-12">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.18),transparent_60%)]" />
            <div className="relative mx-auto max-w-2xl text-center">
              <h2 className="text-2xl font-semibold text-white sm:text-3xl">
                {t("blog.newsletterTitle")}
              </h2>
              <p className="mt-3 text-brand-100">{t("blog.newsletterBody")}</p>
              {subscribed ? (
                <p className="mt-6 font-medium text-accent-300">
                  {t("blog.newsletterThanks")}
                </p>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSubscribed(true);
                  }}
                  className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row"
                >
                  <input
                    type="email"
                    required
                    placeholder={t("blog.newsletterPlaceholder")}
                    className="w-full rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm text-white placeholder-brand-100/70 outline-none transition focus:border-accent-300 focus:ring-2 focus:ring-accent-300/40"
                  />
                  <button type="submit" className="btn-accent shrink-0">
                    {t("blog.newsletterCta")}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default BlogPage;

export const Head: HeadFC = () => <Seo title="Blog" />;

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
