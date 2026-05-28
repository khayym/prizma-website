import * as React from "react";
import { graphql, HeadFC } from "gatsby";
import { useTranslation } from "gatsby-plugin-react-i18next";
import Layout from "../components/Layout";
import Seo from "../components/Seo";
import PageHero from "../components/PageHero";

const PhoneIcon: React.FC = () => (
  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.37 1.9.72 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0122 16.92z" />
);
const MailIcon: React.FC = () => (
  <>
    <path d="M4 4h16v16H4z" />
    <path d="M22 6l-10 7L2 6" />
  </>
);
const PinIcon: React.FC = () => (
  <>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
    <circle cx="12" cy="10" r="3" />
  </>
);
const ClockIcon: React.FC = () => (
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 3" />
  </>
);

const InfoIcon: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <svg
    width="20"
    height="20"
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
  const [sent, setSent] = React.useState(false);

  const phone = t("footer.phone");
  const email = t("footer.email");

  const cards = [
    {
      key: "phone",
      label: t("contact.phoneLabel"),
      value: phone,
      href: `tel:${phone.replace(/\s/g, "")}`,
      icon: <PhoneIcon />,
    },
    {
      key: "email",
      label: t("contact.emailLabel"),
      value: email,
      href: `mailto:${email}`,
      icon: <MailIcon />,
    },
    {
      key: "address",
      label: t("contact.addressLabel"),
      value: t("footer.address"),
      icon: <PinIcon />,
    },
    {
      key: "hours",
      label: t("contact.hoursLabel"),
      value: t("contact.hours"),
      icon: <ClockIcon />,
    },
  ];

  return (
    <Layout>
      <PageHero
        eyebrow={t("contact.eyebrow")}
        title={t("contact.title")}
        subtitle={t("contact.subtitle")}
      />

      <section className="section">
        <div className="container grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          {/* Info column */}
          <div>
            <div className="grid gap-4 sm:grid-cols-2">
              {cards.map((c) => (
                <div
                  key={c.key}
                  className="rounded-2xl border border-ink-100 bg-white p-6"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-100 text-brand-700">
                    <InfoIcon>{c.icon}</InfoIcon>
                  </div>
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
              <iframe
                title={t("contact.mapTitle")}
                src="https://www.openstreetmap.org/export/embed.html?bbox=37.65%2C55.83%2C37.72%2C55.86&layer=mapnik"
                className="h-64 w-full"
                loading="lazy"
              />
            </div>
          </div>

          {/* Form column */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            className="rounded-3xl border border-ink-100 bg-white p-8 shadow-sm lg:p-10"
          >
            {sent ? (
              <div className="flex h-full min-h-[320px] flex-col items-center justify-center text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-100 text-brand-700">
                  <InfoIcon>
                    <path d="M5 13l4 4L19 7" />
                  </InfoIcon>
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
                    <Field name="phone" label={t("demo.phone")} type="tel" />
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
                  <button type="submit" className="btn-primary mt-2">
                    {t("demo.submit")}
                  </button>
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
