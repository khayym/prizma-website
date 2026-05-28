import * as React from "react";
import { graphql, HeadFC, PageProps } from "gatsby";
import { useTranslation } from "gatsby-plugin-react-i18next";
import Layout from "../components/Layout";
import Seo from "../components/Seo";
import Link from "../components/Link";
import CtaBanner from "../sections/CtaBanner";
import { blogPosts, toneByKey } from "../data/blogPosts";

interface PageContext {
  postKey: string;
}

interface Section {
  heading: string;
  body: string;
}

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

const BackIcon: React.FC = () => (
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
    <path d="M19 12H5M11 18l-6-6 6-6" />
  </svg>
);

const BlogPostTemplate: React.FC<PageProps<object, PageContext>> = ({
  pageContext,
}) => {
  const { t } = useTranslation();
  const { postKey } = pageContext;
  const base = `blog.posts.${postKey}`;

  const tone = toneByKey[postKey] ?? "from-brand-700 to-ink-900";
  const sections =
    (t(`${base}.sections`, { returnObjects: true }) as unknown as Section[]) ||
    [];
  const quote = t(`${base}.quote`);
  const author = t(`${base}.author`);
  const role = t(`${base}.role`);

  const related = blogPosts.filter((p) => p.key !== postKey).slice(0, 3);

  return (
    <Layout>
      <article>
        {/* Article hero */}
        <header className="relative overflow-hidden bg-ink-900">
          <div
            className={`absolute inset-0 -z-0 bg-gradient-to-br ${tone}`}
          />
          <div className="absolute -right-24 -top-24 -z-0 h-72 w-72 rounded-full bg-accent-400/10 blur-3xl" />
          <div className="container relative z-10 py-16 lg:py-24">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-sm font-medium text-white/80 transition hover:text-white"
            >
              <BackIcon />
              {t("blog.backToBlog")}
            </Link>
            <div className="mt-8 max-w-3xl">
              <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-white/70">
                <span className="rounded-full bg-white/15 px-3 py-1 uppercase tracking-wider text-white backdrop-blur">
                  {t(`${base}.category`)}
                </span>
                <span>{t(`${base}.date`)}</span>
                <span>•</span>
                <span>{t(`${base}.readTime`)}</span>
              </div>
              <h1 className="mt-5 text-3xl font-semibold leading-[1.12] text-white sm:text-4xl lg:text-5xl">
                {t(`${base}.title`)}
              </h1>
              <div className="mt-8 flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-sm font-semibold text-white backdrop-blur">
                  {author.slice(0, 1)}
                </span>
                <div className="text-sm">
                  <div className="font-semibold text-white">{author}</div>
                  <div className="text-white/70">{role}</div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Article body */}
        <div className="section">
          <div className="container">
            <div className="mx-auto max-w-2xl">
              <p className="text-lg leading-relaxed text-ink-700">
                {t(`${base}.lead`)}
              </p>

              {sections.map((s, i) => (
                <div key={i} className="mt-10">
                  <h2 className="text-2xl">{s.heading}</h2>
                  <p className="mt-4 leading-relaxed text-ink-600">{s.body}</p>
                </div>
              ))}

              {quote && (
                <blockquote className="my-10 border-l-4 border-brand-700 bg-ink-50 px-6 py-5 text-lg font-medium italic text-ink-800">
                  “{quote}”
                </blockquote>
              )}

              <div className="mt-12 rounded-2xl border border-ink-100 bg-white p-6">
                <p className="text-sm text-ink-600">{t("blog.ctaInline")}</p>
                <Link to="/contact" className="btn-primary mt-4">
                  {t("blog.ctaInlineButton")}
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Related posts */}
        <section className="section bg-ink-50 pt-0">
          <div className="container">
            <h2 className="text-2xl">{t("blog.relatedTitle")}</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <Link
                  key={p.key}
                  to={`/blog/${p.key}`}
                  className="group flex flex-col overflow-hidden rounded-3xl border border-ink-100 bg-white transition hover:border-brand-200 hover:shadow-lg"
                >
                  <div
                    className={`h-32 bg-gradient-to-br ${p.tone} transition group-hover:opacity-90`}
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

        <CtaBanner />
      </article>
    </Layout>
  );
};

export default BlogPostTemplate;

export const Head: HeadFC<object, PageContext> = ({ pageContext }) => (
  <Seo title={`Blog · ${pageContext.postKey}`} />
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
