import { Link } from 'react-router-dom';

import styles from './NotFound.module.css';

function NotFound() {
  return (
    <main className={styles.page}>
      <section className={styles.content}>
        <p className={styles.eyebrow}>404 — PAGE NOT FOUND</p>

        <h1>
          This page
          <br />
          doesn't exist.
        </h1>

        <p className={styles.description}>
          The page you're looking for may have been moved, removed,
          or the address may be incorrect.
        </p>

        <div className={styles.actions}>
          <Link to="/" className={styles.primaryButton}>
            Back to Home
            <span aria-hidden="true">↗</span>
          </Link>

          <Link to="/services" className={styles.secondaryButton}>
            Explore Services
            <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>

      <div className={styles.visual} aria-hidden="true">
        <span>404</span>
      </div>
    </main>
  );
}

export default NotFound;