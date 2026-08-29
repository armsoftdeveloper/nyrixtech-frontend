import { useEffect } from "react";
import { useLocation, useOutlet } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";

function AnimatedOutlet() {
  const location = useLocation();
  const element = useOutlet();
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    // Route changes must reset scroll instantly — `behavior: "instant"` explicitly
    // overrides the site-wide `scroll-behavior: smooth` (which is meant for in-page
    // anchor links), so navigating never animates a slow scroll up from the bottom
    // of a long page before the new content even appears.
    if (!location.hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      return;
    }

    // With a hash present (e.g. a deep link to /industries#hotels), the browser's
    // native scroll-to-fragment fires before the lazy-loaded route chunk has even
    // mounted the target element, so it silently does nothing. Poll for the element
    // across the route's code-split load + exit/enter transition and scroll to it
    // once it exists.
    const id = location.hash.slice(1);
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout>;
    const start = Date.now();

    function tryScroll() {
      if (cancelled) return;
      const el = document.getElementById(id);
      if (el) {
        const scrollMarginTop = parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
        const top = el.getBoundingClientRect().top + window.scrollY - scrollMarginTop;
        window.scrollTo({ top, left: 0, behavior: "instant" });
        return;
      }
      if (Date.now() - start < 2000) {
        timer = setTimeout(tryScroll, 50);
      }
    }
    tryScroll();

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [location.pathname, location.hash]);

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial={prefersReducedMotion ? undefined : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={prefersReducedMotion ? undefined : { opacity: 0, y: -6 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.32, ease: [0.22, 1, 0.36, 1] }}
      >
        {element}
      </motion.div>
    </AnimatePresence>
  );
}

export function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-ink-900)]">
      <Header />
      <main className="flex-1">
        <AnimatedOutlet />
      </main>
      <Footer />
    </div>
  );
}
