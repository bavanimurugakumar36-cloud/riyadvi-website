import styles from './PageLoader.module.css';

function PageLoader() {
  return (
    <section
      className={styles.loader}
      aria-label="Loading page"
    >
      <div className={styles.content}>
        <div
          className={styles.spinner}
          aria-hidden="true"
        />
        <span className={styles.label}>Loading</span>
      </div>
    </section>
  );
}

export default PageLoader;
