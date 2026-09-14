import * as React from "react";
import Header from "./Header";
import Footer from "./Footer";
import BackToTop from "./BackToTop";

interface LayoutProps {
  children: React.ReactNode;
}

/**
 * Fades `[data-reveal]` blocks up as they scroll into view. Blocks at or above
 * the viewport — including after a jump to a `#section` link — are shown
 * straight away, so nothing on screen stays hidden, and nothing is hidden
 * before JavaScript runs.
 */
function useRevealOnScroll() {
  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let pending = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    let frame = 0;

    const stop = () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(frame);
    };
    const reveal = () => {
      frame = 0;
      const threshold = window.innerHeight * 0.92;
      pending = pending.filter((el) => {
        if (el.getBoundingClientRect().top >= threshold) return true;
        el.classList.add("is-revealed");
        return false;
      });
      if (pending.length === 0) stop();
    };
    function schedule() {
      if (!frame) frame = requestAnimationFrame(reveal);
    }

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    // Reveal what is already on screen before arming the hidden state.
    reveal();
    document.documentElement.classList.add("reveal-ready");
    return stop;
  }, []);
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  useRevealOnScroll();
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <BackToTop />
    </div>
  );
};

export default Layout;
