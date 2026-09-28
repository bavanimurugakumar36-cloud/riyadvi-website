import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

function useLenis(pathname = '') {
  const lenisRef = useRef(null);

  /*
   * --------------------------------------------------
   * INITIALIZE LENIS
   * --------------------------------------------------
   */
  useEffect(() => {
    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (reducedMotion) {
      return undefined;
    }

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 0.9,
      touchMultiplier: 1,
    });

    lenisRef.current = lenis;

    let animationFrame;

    const raf = (time) => {
      lenis.raf(time);
      animationFrame = requestAnimationFrame(raf);
    };

    animationFrame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrame);

      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  /*
   * --------------------------------------------------
   * RESET SCROLL WHEN ROUTE CHANGES
   * --------------------------------------------------
   *
   * React Router changes the route without reloading
   * the page. Lenis therefore needs to be explicitly
   * moved to the top of the new route.
   */
  useEffect(() => {
    if (!pathname) {
      return;
    }

    const scrollToTop = () => {
      /*
       * Reset Lenis' internal scroll position.
       */
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, {
          immediate: true,
          force: true,
        });
      }

      /*
       * Also reset the browser's native scroll position.
       */
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'auto',
      });

      if (document.scrollingElement) {
        document.scrollingElement.scrollTop = 0;
        document.scrollingElement.scrollLeft = 0;
      }
    };

    /*
     * First reset.
     */
    scrollToTop();

    /*
     * Second reset after the new route has painted.
     * This protects against pages containing 3D,
     * GSAP or dynamically measured content.
     */
    const frame = window.requestAnimationFrame(() => {
      scrollToTop();
    });

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, [pathname]);
}

export default useLenis;