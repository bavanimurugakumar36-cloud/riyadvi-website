import {
  lazy,
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { Link } from 'react-router-dom';

import jobs from '../../data/jobs';

import styles from './Careers.module.css';

const CareersScene = lazy(
  () => import('../../three/scenes/CareersScene.jsx')
);

/* Mounts the 3D scene only while it is near the viewport */
function LazyScene({ variant, className, children }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;

    if (!el) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: '250px' }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={className} aria-hidden="true">
      {visible && (
        <Suspense fallback={null}>
          <CareersScene variant={variant} />
        </Suspense>
      )}

      {children}
    </div>
  );
}

function FilterRow({ label, options, active, onChange }) {
  return (
    <div className={styles.filterGroup}>
      <span className={styles.filterLabel}>{label}</span>

      <div
        className={styles.filterOptions}
        role="group"
        aria-label={`Filter by ${label.toLowerCase()}`}
      >
        {options.map((option) => {
          const isActive = active === option;

          return (
            <button
              key={option}
              type="button"
              className={[
                styles.filterButton,
                isActive ? styles.filterButtonActive : '',
              ].join(' ')}
              onClick={() => onChange(option)}
              aria-pressed={isActive}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function unique(list, key) {
  return [
    'All',
    ...new Set(list.map((item) => item[key]).filter(Boolean)),
  ];
}

function Careers() {
  const [department, setDepartment] = useState('All');
  const [designation, setDesignation] = useState('All');
  const [type, setType] = useState('All');
  const [experience, setExperience] = useState('All');

  /* measure the real navbar height so each screen fits below it */
  useEffect(() => {
    const root = document.documentElement;

    const apply = () => {
      const nav =
        document.querySelector('header') ||
        document.querySelector('nav');

      const height = nav
        ? Math.round(nav.getBoundingClientRect().height)
        : 78;

      root.style.setProperty('--nav', `${height}px`);
    };

    apply();
    window.addEventListener('resize', apply);

    return () => {
      window.removeEventListener('resize', apply);
      root.style.removeProperty('--nav');
    };
  }, []);

  const departments = useMemo(
    () => unique(jobs, 'department'),
    []
  );
  const designations = useMemo(() => unique(jobs, 'title'), []);
  const types = useMemo(() => unique(jobs, 'type'), []);
  const experiences = useMemo(
    () => unique(jobs, 'experience'),
    []
  );

  const filteredJobs = useMemo(
    () =>
      jobs.filter(
        (job) =>
          (department === 'All' ||
            job.department === department) &&
          (designation === 'All' ||
            job.title === designation) &&
          (type === 'All' || job.type === type) &&
          (experience === 'All' ||
            job.experience === experience)
      ),
    [department, designation, type, experience]
  );

  const hasFilters =
    department !== 'All' ||
    designation !== 'All' ||
    type !== 'All' ||
    experience !== 'All';

  const resetFilters = () => {
    setDepartment('All');
    setDesignation('All');
    setType('All');
    setExperience('All');
  };

  return (
    <main className={styles.page}>
      {/* =====================================================
          SCREEN 1 — HERO
      ===================================================== */}

      <section className={`${styles.screen} ${styles.hero}`}>
        <div className={styles.heroGrid} aria-hidden="true" />

        <div className={styles.heroInner}>
          <div className={styles.eyebrow}>
            <span className={styles.line} />
            <span>CAREERS AT RIYADVI</span>
          </div>

          <h1 className={styles.heroTitle}>
            Build what&apos;s next.
            <br />
            <span>Build it with us.</span>
          </h1>

          <p className={styles.heroDescription}>
            Join a team building software, digital experiences,
            immersive technology and intelligent solutions for
            businesses ready to move forward.
          </p>

          <div className={styles.heroActions}>
            <a
              href="#open-positions"
              className={styles.primaryButton}
            >
              <span>View Open Positions</span>
              <span aria-hidden="true">↓</span>
            </a>

            <Link
              to="/contact"
              className={styles.secondaryButton}
            >
              <span>Talk to Riyadvi</span>
              <span aria-hidden="true">↗</span>
            </Link>
          </div>

          <div className={styles.heroStats}>
            <div className={styles.heroStat}>
              <strong>
                {String(jobs.length).padStart(2, '0')}
              </strong>
              <span>OPEN ROLES</span>
            </div>

            <div className={styles.heroStat}>
              <strong>
                {String(departments.length - 1).padStart(2, '0')}
              </strong>
              <span>CORE AREAS</span>
            </div>

            <div className={styles.heroStat}>
              <strong>01</strong>
              <span>SHARED VISION</span>
            </div>
          </div>
        </div>

        <LazyScene variant="globe" className={styles.heroScene}>
          <span className={`${styles.tag} ${styles.tagInnovation}`}>
            <i />
            INNOVATION
          </span>
          <span className={`${styles.tag} ${styles.tagTechnology}`}>
            <i />
            TECHNOLOGY
          </span>
          <span className={`${styles.tag} ${styles.tagGrowth}`}>
            <i />
            GROWTH
          </span>
          <span className={`${styles.tag} ${styles.tagPeople}`}>
            <i />
            PEOPLE
          </span>
        </LazyScene>
      </section>

      {/* =====================================================
          SCREEN 2 — OPEN POSITIONS
      ===================================================== */}

      <section
        id="open-positions"
        className={`${styles.screen} ${styles.positions}`}
        aria-labelledby="careers-positions-title"
      >
        <LazyScene
          variant="crystal"
          className={styles.positionsScene}
        />

        <div className={styles.container}>
          <div className={styles.eyebrow}>
            <span className={styles.line} />
            <span>OPEN POSITIONS</span>
          </div>

          <div className={styles.sectionHead}>
            <h2
              id="careers-positions-title"
              className={styles.sectionTitle}
            >
              Find your place
              <br />
              <span>at Riyadvi.</span>
            </h2>

            <p className={styles.sectionCopy}>
              Explore current opportunities across engineering,
              design and immersive technology. Find a role where
              your skills can contribute to meaningful digital
              experiences.
            </p>
          </div>

          <div className={styles.filters}>
            <div className={styles.filterHeader}>
              <span>FILTER OPPORTUNITIES</span>

              <span className={styles.resultCount}>
                {filteredJobs.length}{' '}
                {filteredJobs.length === 1 ? 'ROLE' : 'ROLES'}
                {hasFilters && (
                  <button
                    type="button"
                    className={styles.resetButton}
                    onClick={resetFilters}
                  >
                    RESET ↺
                  </button>
                )}
              </span>
            </div>

            <FilterRow
              label="DEPARTMENT"
              options={departments}
              active={department}
              onChange={setDepartment}
            />
            <FilterRow
              label="DESIGNATION"
              options={designations}
              active={designation}
              onChange={setDesignation}
            />
            <FilterRow
              label="WORK TYPE"
              options={types}
              active={type}
              onChange={setType}
            />
            <FilterRow
              label="EXPERIENCE"
              options={experiences}
              active={experience}
              onChange={setExperience}
            />
          </div>

          <div className={styles.jobList}>
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job, index) => (
                <article key={job.slug} className={styles.jobRow}>
                  <span className={styles.jobIndex}>
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <div className={styles.jobMain}>
                    <span className={styles.jobTop}>
                      {job.department}
                      <i>·</i>
                      {job.location}
                    </span>

                    <h3>{job.title}</h3>
                  </div>

                  <p className={styles.jobDescription}>
                    {job.shortDescription || job.description}
                  </p>

                  <span className={styles.jobMeta}>
                    {job.type}
                    {job.experience && (
                      <>
                        <i>·</i>
                        {job.experience}
                      </>
                    )}
                  </span>

                  <Link
                    to={`/careers/${job.slug}`}
                    className={styles.viewRole}
                    aria-label={`View ${job.title} position`}
                  >
                    <span>View role</span>
                    <span aria-hidden="true">↗</span>
                  </Link>
                </article>
              ))
            ) : (
              <div className={styles.emptyState}>
                <span>00</span>

                <div>
                  <h3>No roles match these filters.</h3>
                  <p>
                    Try changing one or more filters to explore
                    the available opportunities.
                  </p>

                  <button
                    type="button"
                    className={styles.emptyReset}
                    onClick={resetFilters}
                  >
                    Reset filters
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* =====================================================
          SCREEN 3 — HOW WE WORK
      ===================================================== */}

      <section className={`${styles.screen} ${styles.culture}`}>
        <LazyScene
          variant="portal"
          className={styles.cultureScene}
        />

        <div className={styles.container}>
          <div className={styles.eyebrow}>
            <span className={styles.line} />
            <span>HOW WE WORK</span>
          </div>

          <div className={styles.sectionHead}>
            <h2 className={styles.sectionTitle}>
              Bring curiosity.
              <br />
              <span>Make an impact.</span>
            </h2>

            <p className={styles.sectionCopy}>
              We work across software, design, immersive
              technology and emerging digital experiences. The
              best work happens when different perspectives come
              together around a clear business problem.
            </p>
          </div>

          <div className={styles.points}>
            <div className={styles.point}>
              <span>01</span>
              <div>
                <h3>Think beyond the brief</h3>
                <p>
                  Understand the problem before jumping to the
                  solution.
                </p>
              </div>
            </div>

            <div className={styles.point}>
              <span>02</span>
              <div>
                <h3>Build with intent</h3>
                <p>
                  Every interaction and decision should have a
                  purpose.
                </p>
              </div>
            </div>

            <div className={styles.point}>
              <span>03</span>
              <div>
                <h3>Keep learning</h3>
                <p>
                  Explore new technologies and continuously
                  improve.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          SCREEN 4 — CTA
      ===================================================== */}

      <section className={`${styles.screen} ${styles.cta}`}>
        <LazyScene variant="embers" className={styles.ctaScene} />

        <div className={styles.container}>
          <div className={styles.eyebrow}>
            <span className={styles.line} />
            <span>DON&apos;T SEE YOUR ROLE?</span>
          </div>

          <div className={styles.ctaGrid}>
            <h2 className={styles.sectionTitle}>
              Have something
              <br />
              <span>to build together?</span>
            </h2>

            <div className={styles.ctaRight}>
              <p>
                Even if you do not see the exact role you are
                looking for, we are always interested in hearing
                from people who can bring something valuable to
                Riyadvi.
              </p>

              <Link to="/contact" className={styles.ctaButton}>
                <span>Start a conversation</span>
                <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Careers;