import * as React from "react";
import { useTranslation } from "gatsby-plugin-react-i18next";
import Highlight from "../components/Highlight";
import Link from "../components/Link";
import { blogPosts as posts } from "../data/blogPosts";
import { blogImages } from "../data/blogImages";

const ArrowIcon: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M7 17L17 7M8 7h9v9" />
  </svg>
);

/** Blog teaser in the zoom.com news pattern: blue gradient cards, serif titles. */
const Blog: React.FC = () => {
  const { t } = useTranslation();
  const [featured, ...rest] = posts;

  return (
    <section id="blog" className="section bg-white">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center" data-reveal>
          <h2 className="section-title">
            <Highlight text={t("blog.title")} className="text-brand-600" />
          </h2>
          <p className="mt-4 text-lg text-ink-600">{t("blog.subtitle")}</p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2" data-reveal>
          <Link
            to={`/blog/${featured.key}`}
            className="group flex flex-col overflow-hidden rounded-3xl bg-gradient-to-b from-brand-600 to-brand-950 text-white transition duration-300 hover:-translate-y-1 hover:shadow-pop md:col-span-2 lg:col-span-1 lg:row-span-2"
          >
            <div className="p-7">
              <div className="text-xs font-semibold uppercase tracking-wider text-white/70">
                {t(`blog.posts.${featured.key}.category`)} · {t(`blog.posts.${featured.key}.date`)}
              </div>
              <h3 className="mt-3 font-display text-2xl leading-snug text-white sm:text-3xl">
                {t(`blog.posts.${featured.key}.title`)}
              </h3>
              <p className="mt-3 text-sm text-white/85">
                {t(`blog.posts.${featured.key}.excerpt`)}
              </p>
            </div>
            <div className="relative mt-auto flex-1 min-h-[260px] px-7 pb-7">
              <img
                src={blogImages[featured.key]}
                alt=""
                loading="lazy"
                className="absolute inset-x-7 bottom-7 top-0 h-[calc(100%-1.75rem)] w-[calc(100%-3.5rem)] rounded-2xl object-cover"
              />
              <span className="card-arrow absolute bottom-11 right-11">
                <ArrowIcon />
              </span>
            </div>
          </Link>

          {rest.map((p) => (
            <Link
              key={p.key}
              to={`/blog/${p.key}`}
              className="group flex min-h-[220px] flex-col rounded-3xl bg-gradient-to-b from-brand-600 to-brand-950 p-7 text-white transition duration-300 hover:-translate-y-1 hover:shadow-pop"
            >
              <div className="text-xs font-semibold uppercase tracking-wider text-white/70">
                {t(`blog.posts.${p.key}.category`)} · {t(`blog.posts.${p.key}.date`)}
              </div>
              <h3 className="mt-3 font-display text-xl leading-snug text-white sm:text-2xl">
                {t(`blog.posts.${p.key}.title`)}
              </h3>
              <p className="mt-3 text-sm text-white/85">{t(`blog.posts.${p.key}.excerpt`)}</p>
              <div className="mt-auto flex justify-end pt-6">
                <span className="card-arrow">
                  <ArrowIcon />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
