import * as React from "react";
import { useTranslation } from "gatsby-plugin-react-i18next";
import Link from "../components/Link";
import Glyph from "../components/Glyph";
import { telHref } from "../utils/phone";

/** Closing call to action: centered serif heading and two pills, as on zoom.com. */
const CtaBanner: React.FC = () => {
  const { t } = useTranslation();
  const phone = t("footer.phone");
  return (
    <section className="section">
      <div className="container text-center" data-reveal>
        <h2 className="section-title mx-auto max-w-3xl">{t("cta.title")}</h2>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link to="/#demo" className="btn-primary px-6 py-3.5 text-base">
            {t("nav.requestDemo")}
          </Link>
          <a
            href={telHref(phone)}
            aria-label={`${t("contact.phoneLabel")}: ${phone}`}
            className="btn-ghost px-6 py-3.5 text-base"
          >
            <Glyph name="phone" size={18} strokeWidth={2} />
            {phone}
          </a>
        </div>
      </div>
    </section>
  );
};

export default CtaBanner;
