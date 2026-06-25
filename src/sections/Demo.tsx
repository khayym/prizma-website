import * as React from "react";
import { useTranslation } from "gatsby-plugin-react-i18next";
import Captcha from "../components/Captcha";
import { submitContactForm } from "../utils/contactForm";

const Demo: React.FC = () => {
  const { t } = useTranslation();
  const [status, setStatus] = React.useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const sent = status === "success";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    try {
      const ok = await submitContactForm(form);
      setStatus(ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="demo" className="section bg-ink-50">
      <div className="container grid gap-12 lg:grid-cols-2">
        <div>
          <span className="eyebrow">{t("demo.eyebrow")}</span>
          <h2 className="mt-3 text-3xl sm:text-4xl">{t("demo.title")}</h2>
          <p className="mt-4 max-w-lg text-ink-600">{t("demo.body")}</p>
          <div className="mt-8 inline-flex items-center gap-3 rounded-2xl bg-white px-4 py-3 ring-1 ring-ink-100">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-700 text-white">
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
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.37 1.9.72 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0122 16.92z" />
              </svg>
            </span>
            <a
              href={`tel:${t("demo.phoneLabel").replace(/\s/g, "")}`}
              className="text-sm font-semibold text-ink-900"
            >
              {t("demo.phoneLabel")}
            </a>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-ink-100 bg-white p-8 shadow-sm"
        >
          {sent ? (
            <div className="flex h-full min-h-[300px] flex-col items-center justify-center text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-100 text-brand-700">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="mt-4 text-lg font-semibold text-ink-900">
                {t("contact.successTitle")}
              </p>
              <p className="mt-1 text-sm text-ink-600">
                {t("contact.successBody")}
              </p>
            </div>
          ) : (
            <div className="grid gap-4">
              <Field name="name" label={t("demo.name")} />
              <Field
                name="email"
                label={t("demo.email")}
                type="email"
                required
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <Field name="company" label={t("demo.company")} />
                <Field name="phone" label={t("demo.phone")} type="tel" />
              </div>
              <label className="block">
                <span className="text-sm font-medium text-ink-700">
                  {t("demo.message")}
                </span>
                <textarea
                  name="message"
                  rows={4}
                  className="mt-1.5 w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-sm text-ink-900 outline-none transition focus:border-brand-700 focus:ring-2 focus:ring-brand-100"
                />
              </label>
              <input
                type="hidden"
                name="subject"
                value="New Prizma demo request"
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
                {status === "sending" ? t("common.sending") : t("demo.submit")}
              </button>
              {status === "error" && (
                <p className="text-sm text-red-600">{t("common.formError")}</p>
              )}
            </div>
          )}
        </form>
      </div>
    </section>
  );
};

interface FieldProps {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
}

const Field: React.FC<FieldProps> = ({
  name,
  label,
  type = "text",
  required,
}) => (
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

export default Demo;
