import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    /*
     * React Router performs client-side navigation,
     * so the browser does not automatically reset
     * the scroll position like a full page reload.
     *
     * This component handles the native browser
     * scroll position whenever the route changes.
     */

    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    /*
     * Reset native browser scroll immediately.
     */
    window.scrollTo(0, 0);

    /*
     * Reset the document scrolling element as an
     * additional safeguard.
     */
    if (document.scrollingElement) {
      document.scrollingElement.scrollTop = 0;
      document.scrollingElement.scrollLeft = 0;
    }

    /*
     * Run again after the new route has rendered.
     *
     * This protects against pages containing:
     * - Three.js / React Three Fiber
     * - GSAP
     * - dynamically rendered content
     * - images and other measured content
     */
    const frame = window.requestAnimationFrame(() => {
      window.scrollTo(0, 0);

      if (document.scrollingElement) {
        document.scrollingElement.scrollTop = 0;
        document.scrollingElement.scrollLeft = 0;
      }
    });

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, [pathname]);

  return null;
}

export default ScrollToTop;