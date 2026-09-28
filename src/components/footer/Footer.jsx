import { Link } from 'react-router-dom';

import styles from './Footer.module.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <Link to="/" className={styles.logo} aria-label="Riyadvi home">
              RIYADVI
            </Link>

            <p className={styles.description}>
              Custom software and digital solutions designed to help businesses
              grow, evolve, and create meaningful digital experiences.
            </p>

            <Link to="/contact" className={styles.cta}>
              Start a Conversation
              <span aria-hidden="true">↗</span>
            </Link>
          </div>

          <div className={styles.column}>
            <h2 className={styles.heading}>Company</h2>

            <nav aria-label="Company">
              <ul className={styles.links}>
                <li>
                  <Link to="/about">About</Link>
                </li>

                <li>
                  <Link to="/portfolio">Portfolio</Link>
                </li>

                <li>
                  <Link to="/blog">Blog</Link>
                </li>

                <li>
                  <Link to="/careers">Careers</Link>
                </li>

                <li>
                  <Link to="/contact">Contact</Link>
                </li>
              </ul>
            </nav>
          </div>

          <div className={styles.column}>
            <h2 className={styles.heading}>Services</h2>

            <nav aria-label="Services">
              <ul className={styles.links}>
                <li>
                  <Link to="/services/web-development">
                    Web Development
                  </Link>
                </li>

                <li>
                  <Link to="/services/app-development">
                    App Development
                  </Link>
                </li>

                <li>
                  <Link to="/services/digital-marketing">
                    Digital Marketing
                  </Link>
                </li>

                <li>
                  <Link to="/services/ar-vr">
                    AR / VR
                  </Link>
                </li>

                <li>
                  <Link to="/services/3d-modeling">
                    3D Modeling
                  </Link>
                </li>

                <li>
                  <Link to="/services/ui-ux-design">
                    UI / UX Design
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          <div className={styles.column}>
            <h2 className={styles.heading}>Solutions</h2>

            <nav aria-label="Solutions">
              <ul className={styles.links}>
                <li>
                  <Link to="/business-health-checkup">
                    Business Health Checkup
                  </Link>
                </li>

                <li>
                  <Link to="/software-project-planning-guide">
                    Project Planning Guide
                  </Link>
                </li>

                <li>
                  <Link to="/contact">
                    Free Consultation
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>
            © {currentYear} Riyadvi Software Technologies. All rights reserved.
          </p>

          <div className={styles.bottomLinks}>
            <Link to="/contact">Get in touch</Link>

            <a href="mailto:careers@riyadvi.com">
              Careers
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;