import { useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';

import { mainNavigation, serviceLinks } from '../../data/navigation';
import styles from './Navbar.module.css';

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen
      ? 'hidden'
      : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsServicesOpen(false);
  };

  const toggleMobileServices = () => {
    setIsServicesOpen((current) => !current);
  };

  return (
    <header
      className={`${styles.navbar} ${
        isScrolled ? styles.navbarScrolled : ''
      }`}
    >
      <div className={styles.container}>
        {/* ========================================
            LOGO
        ======================================== */}

        <Link
          to="/"
          className={styles.logo}
          onClick={closeMobileMenu}
          aria-label="Riyadvi Software Technologies home"
        >
          RIYADVI
        </Link>

        {/* ========================================
            DESKTOP NAVIGATION
        ======================================== */}

        <nav
          className={styles.desktopNav}
          aria-label="Main navigation"
        >
          {/* HOME */}

          <NavLink
            to="/"
            className={({ isActive }) =>
              `${styles.navLink} ${
                isActive ? styles.active : ''
              }`
            }
          >
            Home
          </NavLink>

          {/* SERVICES */}

          <div
            className={styles.servicesWrapper}
            onMouseEnter={() => setIsServicesOpen(true)}
            onMouseLeave={() => setIsServicesOpen(false)}
          >
            <NavLink
              to="/services"
              className={({ isActive }) =>
                `${styles.servicesButton} ${
                  isActive ? styles.active : ''
                }`
              }
            >
              Services

              <span
                className={`${styles.chevron} ${
                  isServicesOpen
                    ? styles.chevronOpen
                    : ''
                }`}
                aria-hidden="true"
              >
                ↓
              </span>
            </NavLink>

            {isServicesOpen && (
              <div className={styles.dropdown}>
                {serviceLinks.map((service) => (
                  <NavLink
                    key={service.path}
                    to={service.path}
                    className={styles.dropdownLink}
                    onClick={() =>
                      setIsServicesOpen(false)
                    }
                  >
                    <span>{service.label}</span>

                    <span
                      className={styles.arrow}
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </NavLink>
                ))}
              </div>
            )}
          </div>

          {/* OTHER NAVIGATION */}

          {mainNavigation
            .filter((item) => item.label !== 'Home')
            .map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `${styles.navLink} ${
                    isActive ? styles.active : ''
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
        </nav>

        {/* ========================================
            DESKTOP ACTIONS
        ======================================== */}

        <div className={styles.desktopActions}>
          {/* ADMIN */}

          <Link
            to="/admin/login"
            className={styles.adminLink}
          >
            Admin
          </Link>

          {/* CONSULTATION */}

          <Link
            to="/contact"
            className={styles.consultationButton}
          >
            Book a Free Consultation
          </Link>
        </div>

        {/* ========================================
            MOBILE MENU BUTTON
        ======================================== */}

        <button
          type="button"
          className={`${styles.menuButton} ${
            isMobileMenuOpen
              ? styles.menuButtonOpen
              : ''
          }`}
          onClick={() =>
            setIsMobileMenuOpen(
              (current) => !current
            )
          }
          aria-label={
            isMobileMenuOpen
              ? 'Close menu'
              : 'Open menu'
          }
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-navigation"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* ========================================
          MOBILE NAVIGATION
      ======================================== */}

      <div
        id="mobile-navigation"
        className={`${styles.mobileMenu} ${
          isMobileMenuOpen
            ? styles.mobileMenuOpen
            : ''
        }`}
        aria-hidden={!isMobileMenuOpen}
      >
        <nav
          className={styles.mobileNav}
          aria-label="Mobile navigation"
        >
          {/* ========================================
              HOME
          ======================================== */}

          <NavLink
            to="/"
            onClick={closeMobileMenu}
            className={({ isActive }) =>
              `${styles.mobileNavLink} ${
                isActive
                  ? styles.mobileActive
                  : ''
              }`
            }
          >
            Home
          </NavLink>

          {/* ========================================
              SERVICES
              
              IMPORTANT:
              - Clicking "Services" opens /services
              - Clicking "+" opens the service submenu
          ======================================== */}

          <div className={styles.mobileServices}>
            <div className={styles.mobileServicesRow}>
              {/* MAIN SERVICES LINK */}

              <NavLink
                to="/services"
                onClick={closeMobileMenu}
                className={({ isActive }) =>
                  `${styles.mobileServicesLink} ${
                    isActive
                      ? styles.mobileActive
                      : ''
                  }`
                }
              >
                Services
              </NavLink>

              {/* SUBMENU TOGGLE */}

              <button
                type="button"
                className={styles.mobileServicesToggle}
                onClick={toggleMobileServices}
                aria-label={
                  isServicesOpen
                    ? 'Collapse Services submenu'
                    : 'Expand Services submenu'
                }
                aria-expanded={isServicesOpen}
              >
                <span
                  className={`${styles.mobileChevron} ${
                    isServicesOpen
                      ? styles.mobileChevronOpen
                      : ''
                  }`}
                  aria-hidden="true"
                >
                  +
                </span>
              </button>
            </div>

            {/* SERVICE SUBMENU */}

            {isServicesOpen && (
              <div
                className={
                  styles.mobileServiceLinks
                }
              >
                {serviceLinks.map((service) => (
                  <NavLink
                    key={service.path}
                    to={service.path}
                    onClick={closeMobileMenu}
                    className={
                      styles.mobileServiceLink
                    }
                  >
                    {service.label}
                  </NavLink>
                ))}
              </div>
            )}
          </div>

          {/* ========================================
              OTHER NAVIGATION
          ======================================== */}

          {mainNavigation
            .filter((item) => item.label !== 'Home')
            .map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={closeMobileMenu}
                className={({ isActive }) =>
                  `${styles.mobileNavLink} ${
                    isActive
                      ? styles.mobileActive
                      : ''
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}

          {/* ========================================
              MOBILE ADMIN
          ======================================== */}

          <Link
            to="/admin/login"
            onClick={closeMobileMenu}
            className={styles.mobileAdminLink}
          >
            Admin
          </Link>

          {/* ========================================
              MOBILE CONSULTATION
          ======================================== */}

          <Link
            to="/contact"
            className={
              styles.mobileConsultationButton
            }
            onClick={closeMobileMenu}
          >
            Book a Free Consultation
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;