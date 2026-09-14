import * as React from "react";
import { graphql, HeadFC } from "gatsby";
import { useTranslation } from "gatsby-plugin-react-i18next";
import Layout from "../components/Layout";
import Seo from "../components/Seo";
import PageHero from "../components/PageHero";
import Captcha from "../components/Captcha";
import PhoneField from "../components/PhoneField";
import Glyph, { type GlyphName } from "../components/Glyph";
import YandexMap from "../components/YandexMap";
import { submitContactForm } from "../utils/contactForm";
import { telHref } from "../utils/phone";

interface FieldProps {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
}

const Field: React.FC<FieldProps> = ({ name, label, type = "text", required }) => (
  <label className="block">
    <span className="text-sm font-medium text-ink-700">{label}</span>
    <input
      name={name}
      type={type}
      required={required}
      className="mt-1.5 w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-sm text-ink-900 outline-none transition focus:border-brand-700 focus:ring-2 focus:ring-brand-100"
    />
  </label>
);

const ContactPage: React.FC = () => {
  const { t } = useTranslation();
  const [status, setStatus] = React.useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const sent = status === "success";

  const phone = t("footer.phone");
  const email = t("footer.email");

  const cards: {
    key: string;
    label: string;
    value: string;
    href?: string;
    glyph: GlyphName;
  }[] = [
    {
      key: "phone",
      label: t("contact.phoneLabel"),
      value: phone,
      href: telHref(phone),
      glyph: "phone",
    },
    {
      key: "email",
      label: t("contact.emailLabel"),
      value: email,
      href: `mailto:${email}`,
      glyph: "mail",
    },
    {
      key: "address",
      label: t("contact.addressLabel"),
      value: t("footer.address"),
      glyph: "pin",
    },
    {
      key: "hours",
      label: t("contact.hoursLabel"),
      value: t("contact.hours"),
      glyph: "clock",
    },
  ];

  return (
    <Layout>
      <PageHero title={t("contact.title")} subtitle={t("contact.subtitle")} />

      <section className="section">
        <div className="container grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          {/* Info column */}
          <div>
            <div className="grid gap-4 sm:grid-cols-2">
              {cards.map((c) => (
                <div
                  key={c.key}
                  className="group rounded-2xl border border-ink-100 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl"
                >
                  <span className="icon-tile">
                    <Glyph name={c.glyph} size={20} />
                  </span>
                  <div className="mt-4 text-sm font-semibold text-ink-900">
                    {c.label}
                  </div>
                  {c.href ? (
                    <a
                      href={c.href}
                      className="mt-1 block text-sm text-ink-600 transition hover:text-brand-700"
                    >
                      {c.value}
                    </a>
                  ) : (
                    <div className="mt-1 text-sm text-ink-600">{c.value}</div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-4 overflow-hidden rounded-2xl border border-ink-100">
              <YandexMap className="h-72" />
            </div>
          </div>

          {/* Form column */}
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const form = e.currentTarget;
              setStatus("sending");
              try {
                const ok = await submitContactForm(form);
                setStatus(ok ? "success" : "error");
              } catch {
                setStatus("error");
              }
            }}
            className="rounded-3xl border border-ink-100 bg-white p-8 shadow-sm lg:p-10"
          >
            {sent ? (
              <div className="flex h-full min-h-[320px] flex-col items-center justify-center text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-100 text-brand-700">
                  <Glyph name="check" size={20} strokeWidth={2} />
                </div>
                <p className="mt-4 text-lg font-semibold text-ink-900">
                  {t("contact.successTitle")}
                </p>
                <p className="mt-1 text-sm text-ink-600">
                  {t("contact.successBody")}
                </p>
              </div>
            ) : (
              <>
                <h2 className="text-2xl">{t("contact.formTitle")}</h2>
                <p className="mt-2 text-sm text-ink-600">
                  {t("contact.formNote")}
                </p>
                <div className="mt-6 grid gap-4">
                  <Field name="name" label={t("demo.name")} required />
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field
                      name="email"
                      label={t("demo.email")}
                      type="email"
                      required
                    />
                    <PhoneField label={t("demo.phone")} />
                  </div>
                  <Field name="company" label={t("demo.company")} />
                  <label className="block">
                    <span className="text-sm font-medium text-ink-700">
                      {t("demo.message")}
                    </span>
                    <textarea
                      name="message"
                      rows={5}
                      className="mt-1.5 w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-sm text-ink-900 outline-none transition focus:border-brand-700 focus:ring-2 focus:ring-brand-100"
                    />
                  </label>
                  <input
                    type="hidden"
                    name="subject"
                    value="New Prizma contact message"
                  />
                  <input
                    type="checkbox"
                    name="botcheck"
                    tabIndex={-1}
                    autoComplete="off"
                    className="hidden"
                    aria-hidden="true"
                  />
                  <Captcha className="mt-1" />
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="btn-primary mt-2 disabled:opacity-60"
                  >
                    {status === "sending"
                      ? t("common.sending")
                      : t("demo.submit")}
                  </button>
                  {status === "error" && (
                    <p className="text-sm text-red-600">
                      {t("common.formError")}
                    </p>
                  )}
                </div>
              </>
            )}
          </form>
        </div>
      </section>
    </Layout>
  );
};

export default ContactPage;

export const Head: HeadFC = () => <Seo title="Contact" />;

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
