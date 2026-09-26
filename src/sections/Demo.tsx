import * as React from "react";
import { useTranslation } from "gatsby-plugin-react-i18next";
import Captcha from "../components/Captcha";
import PhoneField from "../components/PhoneField";
import Highlight from "../components/Highlight";
import Glyph from "../components/Glyph";
import { submitContactForm } from "../utils/contactForm";
import { telHref } from "../utils/phone";

const Demo: React.FC = () => {
  const { t } = useTranslation();
  const [status, setStatus] = React.useState<"idle" | "sending" | "success" | "error">("idle");
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
    <section id="demo" className="section bg-brand-50">
      <div className="container grid gap-12 lg:grid-cols-2 lg:items-center">
        <div data-reveal>
          <h2 className="section-title">
            <Highlight text={t("demo.title")} className="text-brand-600" />
          </h2>
          <p className="mt-4 max-w-lg text-lg text-ink-600">{t("demo.body")}</p>
          <a href={telHref(t("demo.phoneLabel"))} className="btn-light mt-8 shadow-card">
            <Glyph name="phone" size={17} strokeWidth={2} className="text-brand-600" />
            {t("demo.phoneLabel")}
          </a>
        </div>

        <form onSubmit={handleSubmit} className="rounded-3xl bg-white p-8 shadow-card">
          {sent ? (
            <div className="flex h-full min-h-[300px] flex-col items-center justify-center text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-100 text-brand-600">
                <Glyph name="check" size={24} strokeWidth={2} />
              </div>
              <p className="mt-4 font-display text-2xl text-ink-900">{t("contact.successTitle")}</p>
              <p className="mt-1 text-sm text-ink-600">{t("contact.successBody")}</p>
            </div>
          ) : (
            <div className="grid gap-4">
              <Field name="name" label={t("demo.name")} />
              <Field name="email" label={t("demo.email")} type="email" required />
              <div className="grid gap-4 sm:grid-cols-2">
                <Field name="company" label={t("demo.company")} />
                <PhoneField label={t("demo.phone")} />
              </div>
              <label className="block">
                <span className="text-sm font-medium text-ink-700">{t("demo.message")}</span>
                <textarea
                  name="message"
                  rows={4}
                  className="mt-1.5 w-full rounded border border-ink-200 bg-white px-4 py-3 text-sm text-ink-900 outline-none transition focus:border-brand-600 focus:ring-2 focus:ring-brand-100"
                />
              </label>
              <input type="hidden" name="subject" value="New Prizma demo request" />
              <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
              <Captcha className="mt-1" />
              <button type="submit" disabled={status === "sending"} className="btn-primary mt-2 disabled:opacity-60">
                {status === "sending" ? t("common.sending") : t("demo.submit")}
              </button>
              {status === "error" && <p className="text-sm text-red-600">{t("common.formError")}</p>}
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

const Field: React.FC<FieldProps> = ({ name, label, type = "text", required }) => (
  <label className="block">
    <span className="text-sm font-medium text-ink-700">{label}</span>
    <input
      name={name}
      type={type}
      required={required}
      className="mt-1.5 w-full rounded border border-ink-200 bg-white px-4 py-3 text-sm text-ink-900 outline-none transition focus:border-brand-600 focus:ring-2 focus:ring-brand-100"
    />
  </label>
);

export default Demo;
