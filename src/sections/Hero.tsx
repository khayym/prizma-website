import * as React from "react";
import { useTranslation } from "gatsby-plugin-react-i18next";
import Link from "../components/Link";

const Hero: React.FC = () => {
  const { t } = useTranslation();
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="absolute inset-x-0 top-0 -z-10 h-[600px] bg-gradient-to-b from-brand-50 to-transparent" />
      <div className="container grid gap-12 pt-16 pb-24 lg:grid-cols-2 lg:items-center lg:pt-24 lg:pb-32">
        <div>
          <span className="eyebrow">{t("hero.eyebrow")}</span>
          <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.05] text-ink-900">
            {t("hero.title")}
          </h1>
          <p className="mt-6 max-w-xl text-lg text-ink-600">
            {t("hero.subtitle")}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link to="/#demo" className="btn-primary">
              {t("hero.primaryCta")}
            </Link>
            <Link to="/#how" className="btn-ghost">
              {t("hero.secondaryCta")}
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-700 text-white text-lg font-semibold">
                21
              </div>
              <div className="text-sm">
                <div className="font-semibold text-ink-900">21 years</div>
                <div className="text-ink-600">built for construction</div>
              </div>
            </div>
            <div className="hidden sm:block h-10 w-px bg-ink-200" />
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {["#bef264", "#86efac", "#4ade80", "#22c55e"].map((c, i) => (
                  <span
                    key={i}
                    className="h-9 w-9 rounded-full ring-2 ring-white"
                    style={{ background: c }}
                  />
                ))}
              </div>
              <p className="text-sm text-ink-600">
                <span className="font-semibold text-ink-900">5,000+</span>{" "}
                {t("stats.users").toLowerCase()}
              </p>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="aspect-[5/4] rounded-3xl bg-gradient-to-br from-brand-700 to-brand-900 p-1 shadow-2xl">
            <div className="h-full w-full rounded-[1.4rem] bg-ink-900 p-6">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
              </div>
              <div className="mt-5 grid gap-3">
                <div className="rounded-xl bg-ink-800 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-ink-400">
                      Active workflows
                    </span>
                    <span className="rounded-full bg-accent-400/20 px-2 py-0.5 text-xs font-semibold text-accent-300">
                      +12.4%
                    </span>
                  </div>
                  <div className="mt-3 text-3xl font-semibold text-white">
                    1,284
                  </div>
                  <div className="mt-3 flex items-end gap-1.5 h-16">
                    {[40, 65, 50, 80, 55, 90, 72, 100, 85, 95, 60, 88].map(
                      (h, i) => (
                        <span
                          key={i}
                          className="flex-1 rounded-sm bg-gradient-to-t from-brand-700 to-accent-400"
                          style={{ height: `${h}%` }}
                        />
                      ),
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-ink-800 p-4">
                    <div className="text-xs text-ink-400">Budget used</div>
                    <div className="mt-2 text-xl font-semibold text-white">
                      68%
                    </div>
                    <div className="mt-3 h-1.5 w-full rounded-full bg-ink-700">
                      <div className="h-full w-2/3 rounded-full bg-accent-400" />
                    </div>
                  </div>
                  <div className="rounded-xl bg-ink-800 p-4">
                    <div className="text-xs text-ink-400">Approvals</div>
                    <div className="mt-2 text-xl font-semibold text-white">
                      92
                    </div>
                    <div className="mt-3 text-xs text-brand-300">
                      8 pending review
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-6 -left-6 hidden h-24 w-24 rounded-2xl bg-accent-400 sm:block" />
          <div className="absolute -top-6 -right-6 hidden h-16 w-16 rounded-full bg-brand-200 sm:block" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
