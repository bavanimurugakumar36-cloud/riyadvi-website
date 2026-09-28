import styles from './ThreeSceneLoader.module.css';

function ThreeSceneLoader({ label = 'Loading interactive experience' }) {
  return (
    <div className={styles.loader} aria-label={label} role="status">
      <span className={styles.ring} aria-hidden="true" />
      <span className={styles.label}>{label}</span>
    </div>
  );
}

export default ThreeSceneLoader;
