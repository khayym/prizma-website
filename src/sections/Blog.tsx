import * as React from "react";
import { useTranslation } from "gatsby-plugin-react-i18next";
import PageHero from "../components/PageHero";
import Link from "../components/Link";
import { blogPosts as posts } from "../data/blogPosts";
import { blogImages } from "../data/blogImages";

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

/** Former Blog page, now a home-page section. */
const Blog: React.FC = () => {
  const { t } = useTranslation();
  const [featured, ...rest] = posts;

  return (
    <div id="blog">
      <PageHero as="h2" title={t("blog.title")} subtitle={t("blog.subtitle")} />

      <section className="section">
        <div className="container">
          {/* Featured post */}
          <article
            className="grid overflow-hidden rounded-3xl border border-ink-100 bg-white transition duration-300 hover:shadow-xl lg:grid-cols-2"
            data-reveal
          >
            <div
              className={`relative min-h-[260px] bg-gradient-to-br ${featured.tone} p-8`}
            >
              <img
                src={blogImages[featured.key]}
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/50 to-transparent" />
              <span className="relative z-10 inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur">
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
              <h3 className="mt-4 text-2xl sm:text-3xl">
                {t(`blog.posts.${featured.key}.title`)}
              </h3>
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
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4" data-reveal>
            {rest.map((p) => (
              <Link
                key={p.key}
                to={`/blog/${p.key}`}
                className="group flex flex-col overflow-hidden rounded-3xl border border-ink-100 bg-white transition duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl"
              >
                <div className={`h-40 overflow-hidden bg-gradient-to-br ${p.tone}`}>
                  <img
                    src={blogImages[p.key]}
                    alt=""
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
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
    </div>
  );
};

export default Blog;
