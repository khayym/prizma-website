import * as React from "react";
import { useTranslation } from "gatsby-plugin-react-i18next";
import Highlight from "../components/Highlight";
import { useScreens, type WebModuleKey } from "../components/showcase/screens";

/** Services grouped into tabs; labels live under `services.groups.*`. */
const groups: { key: string; items: string[]; screen: WebModuleKey }[] = [
  {
    key: "projects",
    items: ["planning", "contracts", "finance", "analysis", "clients"],
    screen: "processes",
  },
  { key: "supply", items: ["inventory", "procurement", "mrp"], screen: "erp" },
  { key: "people", items: ["hr", "equipment", "ohs", "subcon"], screen: "hr" },
  { key: "management", items: ["dashboards", "dms", "legal"], screen: "equipment" },
];

/** Former Services page, now a tabbed section in the zoom.com "One platform" pattern. */
const Services: React.FC = () => {
  const { t } = useTranslation();
  const screens = useScreens();
  const [active, setActive] = React.useState(0);
  const group = groups[active];

  return (
    <section id="services" className="section bg-white">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center" data-reveal>
          <h2 className="section-title">
            <Highlight text={t("services.title")} className="text-brand-600" />
          </h2>
          <p className="mt-4 text-lg text-ink-600">{t("services.subtitle")}</p>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-2" role="tablist" data-reveal>
          {groups.map((g, i) => (
            <button
              key={g.key}
              type="button"
              role="tab"
              aria-selected={i === active}
              onClick={() => setActive(i)}
              className={`rounded-full px-5 py-2.5 text-[15px] font-semibold transition duration-300 ${
                i === active
                  ? "bg-white text-brand-600 shadow-pop ring-1 ring-brand-300"
                  : "bg-ink-50 text-ink-600 hover:bg-brand-100 hover:text-ink-900"
              }`}
            >
              {t(`services.groups.${g.key}`)}
            </button>
          ))}
        </div>

        <div
          key={group.key}
          className="surface mt-8 grid items-center gap-8 p-6 sm:p-8 lg:grid-cols-2 lg:p-10"
          role="tabpanel"
        >
          <div className="overflow-hidden rounded-2xl shadow-pop">
            <img
              src={screens.web[group.screen]}
              alt=""
              loading="lazy"
              className="aspect-[16/10] w-full object-cover object-left-top"
            />
          </div>
          <ul className="space-y-5">
            {group.items.map((key) => (
              <li key={key} className="flex gap-3">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand-600" />
                <p className="text-ink-600">
                  <span className="font-semibold text-ink-900">
                    {t(`services.items.${key}.title`)}:
                  </span>{" "}
                  {t(`services.items.${key}.body`)}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Services;
