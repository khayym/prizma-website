import * as React from "react";

const SITE_KEY = process.env.GATSBY_TURNSTILE_SITE_KEY;
const SCRIPT_ID = "cf-turnstile-script";

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: Record<string, unknown>) => string;
      remove: (id: string) => void;
      reset: (id?: string) => void;
    };
  }
}

/**
 * Cloudflare Turnstile widget. Renders explicitly so it works across
 * client-side route changes. When no site key is configured (local/dev
 * without secrets) it renders nothing and the form still submits.
 */
const Captcha: React.FC<{ className?: string }> = ({ className = "" }) => {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!SITE_KEY) return;
    let widgetId: string | undefined;
    let timer: ReturnType<typeof setInterval> | undefined;

    const render = () => {
      if (
        window.turnstile &&
        ref.current &&
        ref.current.childElementCount === 0
      ) {
        widgetId = window.turnstile.render(ref.current, {
          sitekey: SITE_KEY,
          theme: "light",
        });
        return true;
      }
      return false;
    };

    const startPolling = () => {
      if (render()) return;
      timer = setInterval(() => {
        if (render() && timer) clearInterval(timer);
      }, 300);
    };

    if (window.turnstile) {
      startPolling();
    } else if (!document.getElementById(SCRIPT_ID)) {
      const s = document.createElement("script");
      s.id = SCRIPT_ID;
      s.src =
        "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      s.async = true;
      s.defer = true;
      s.onload = startPolling;
      document.head.appendChild(s);
    } else {
      startPolling();
    }

    return () => {
      if (timer) clearInterval(timer);
      if (widgetId && window.turnstile) {
        try {
          window.turnstile.remove(widgetId);
        } catch {
          /* widget already gone */
        }
      }
    };
  }, []);

  if (!SITE_KEY) return null;
  return <div ref={ref} className={className} />;
};

export default Captcha;
