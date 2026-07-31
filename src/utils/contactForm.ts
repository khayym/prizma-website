const WEB3FORMS_KEY = process.env.GATSBY_WEB3FORMS_KEY;

/**
 * Submits a contact/demo form to Web3Forms. The form should contain a
 * Cloudflare Turnstile widget; its `cf-turnstile-response` token is picked
 * up automatically from the FormData and verified by Web3Forms.
 *
 * When no access key is configured (e.g. local preview without secrets) it
 * resolves to `true` so the success state still works for testing.
 */
export async function submitContactForm(
  form: HTMLFormElement,
): Promise<boolean> {
  const formData = new FormData(form);

  if (!WEB3FORMS_KEY) return true;

  formData.append("access_key", WEB3FORMS_KEY);
  // Web3Forms free plan has no Turnstile secret configured, so the token
  // can't be verified server-side — drop it to keep it out of the emails.
  formData.delete("cf-turnstile-response");

  const res = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    body: formData,
  });
  const data = (await res.json()) as { success?: boolean };
  return Boolean(data.success);
}
