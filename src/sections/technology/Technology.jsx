import { useMemo, useState } from 'react';
import styles from './Technology.module.css';

const technologies = [
  {
    name: 'React',
    short: 'REACT',
    category: 'Frontend',
    description:
      'Component-driven interfaces built for scalable, responsive and maintainable digital products.',
    role: 'Interactive interfaces',
  },
  {
    name: 'Next.js',
    short: 'NEXT',
    category: 'Frontend',
    description:
      'Modern React applications with structured routing, rendering strategies and production-ready architecture.',
    role: 'Modern web platforms',
  },
  {
    name: 'JavaScript',
    short: 'JS',
    category: 'Language',
    description:
      'The foundation for interactive web experiences, application logic and dynamic digital products.',
    role: 'Web application logic',
  },
  {
    name: 'Node.js',
    short: 'NODE',
    category: 'Backend',
    description:
      'Server-side JavaScript for APIs, backend services and scalable application architectures.',
    role: 'Backend & APIs',
  },
  {
    name: 'MongoDB',
    short: 'MONGO',
    category: 'Database',
    description:
      'Flexible document-based data storage for applications that need scalable and adaptable data models.',
    role: 'Application data',
  },
  {
    name: 'MySQL',
    short: 'MYSQL',
    category: 'Database',
    description:
      'Relational database technology for structured, transactional and business-critical application data.',
    role: 'Structured data',
  },
  {
    name: 'Three.js',
    short: 'THREE',
    category: '3D',
    description:
      'Web-based 3D rendering for immersive product experiences, visual storytelling and interactive environments.',
    role: '3D experiences',
  },
  {
    name: 'React Three Fiber',
    short: 'R3F',
    category: '3D',
    description:
      'React-based 3D development for building interactive WebGL experiences inside modern applications.',
    role: 'React + 3D',
  },
  {
    name: 'WordPress',
    short: 'WP',
    category: 'CMS',
    description:
      'Content-driven website solutions for businesses that need flexible publishing and manageable digital content.',
    role: 'Content platforms',
  },
];

const orbitPositions = [
  { x: 50, y: 7 },
  { x: 78, y: 19 },
  { x: 92, y: 50 },
  { x: 78, y: 81 },
  { x: 50, y: 93 },
  { x: 22, y: 81 },
  { x: 8, y: 50 },
  { x: 22, y: 19 },
  { x: 50, y: 50 },
];

function Technology() {
  const [activeTechnology, setActiveTechnology] = useState(technologies[0]);

  const activeIndex = useMemo(
    () =>
      technologies.findIndex(
        (technology) => technology.name === activeTechnology.name
      ),
    [activeTechnology]
  );

  const selectTechnology = (technology) => {
    setActiveTechnology(technology);
  };

  return (
    <section className={styles.section} id="technology">
      <div className={styles.backgroundGlow} aria-hidden="true" />

      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <p className={styles.eyebrow}>TECHNOLOGY ECOSYSTEM</p>

            <h2 className={styles.title}>
              The technology behind
              <span> meaningful digital products.</span>
            </h2>
          </div>

          <p className={styles.intro}>
            We combine modern development technologies with thoughtful
            architecture to build digital experiences that are scalable,
            reliable and ready for growth.
          </p>
        </div>

        <div className={styles.experience}>
          <div className={styles.visualColumn}>
            <div className={styles.orbit} aria-label="Interactive technology ecosystem">
              <div className={styles.orbitRing} aria-hidden="true" />
              <div className={styles.orbitRingInner} aria-hidden="true" />

              <div className={styles.connectionLayer} aria-hidden="true">
                {technologies.slice(0, 8).map((technology, index) => {
                  const position = orbitPositions[index];

                  return (
                    <span
                      key={`${technology.name}-line`}
                      className={`${styles.connection} ${
                        index === activeIndex ? styles.connectionActive : ''
                      }`}
                      style={{
                        '--line-x': `${position.x}%`,
                        '--line-y': `${position.y}%`,
                      }}
                    />
                  );
                })}
              </div>

              {technologies.slice(0, 8).map((technology, index) => {
                const position = orbitPositions[index];
                const isActive =
                  technology.name === activeTechnology.name;

                return (
                  <button
                    key={technology.name}
                    type="button"
                    className={`${styles.node} ${
                      isActive ? styles.nodeActive : ''
                    }`}
                    style={{
                      '--node-x': `${position.x}%`,
                      '--node-y': `${position.y}%`,
                    }}
                    onClick={() => selectTechnology(technology)}
                    aria-label={`Explore ${technology.name}`}
                    aria-pressed={isActive}
                  >
                    <span className={styles.nodePulse} aria-hidden="true" />
                    <span className={styles.nodeDot} aria-hidden="true" />

                    <span className={styles.nodeLabel}>
                      {technology.short}
                    </span>
                  </button>
                );
              })}

              <div className={styles.core}>
                <div className={styles.coreGrid} aria-hidden="true" />

                <div className={styles.coreLogo}>
                  <span>R</span>
                </div>

                <p className={styles.coreName}>RIYADVI</p>
                <span className={styles.coreCaption}>TECH CORE</span>
              </div>
            </div>

            <div className={styles.mobileSelector}>
              <label htmlFor="technology-select">
                Explore technology
              </label>

              <select
                id="technology-select"
                value={activeTechnology.name}
                onChange={(event) => {
                  const selected = technologies.find(
                    (technology) =>
                      technology.name === event.target.value
                  );

                  if (selected) {
                    selectTechnology(selected);
                  }
                }}
              >
                {technologies.map((technology) => (
                  <option
                    key={technology.name}
                    value={technology.name}
                  >
                    {technology.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles.infoColumn}>
            <div className={styles.infoTop}>
              <span className={styles.index}>
                {String(activeIndex + 1).padStart(2, '0')}
              </span>

              <span className={styles.category}>
                {activeTechnology.category}
              </span>
            </div>

            <div className={styles.infoContent}>
              <p className={styles.kicker}>SELECTED TECHNOLOGY</p>

              <h3 className={styles.technologyName}>
                {activeTechnology.name}
              </h3>

              <p className={styles.description}>
                {activeTechnology.description}
              </p>

              <div className={styles.role}>
                <span className={styles.roleLine} />
                <div>
                  <span className={styles.roleLabel}>PRIMARY ROLE</span>
                  <strong>{activeTechnology.role}</strong>
                </div>
              </div>
            </div>

            <div className={styles.selectorList}>
              {technologies.map((technology, index) => {
                const isActive =
                  technology.name === activeTechnology.name;

                return (
                  <button
                    key={technology.name}
                    type="button"
                    className={`${styles.selector} ${
                      isActive ? styles.selectorActive : ''
                    }`}
                    onClick={() => selectTechnology(technology)}
                    aria-pressed={isActive}
                  >
                    <span>
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    <strong>{technology.name}</strong>

                    <span className={styles.selectorArrow}>
                      ↗
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className={styles.footerNote}>
          <span className={styles.footerLine} />

          <p>
            Technology is selected around the business problem — not the
            other way around.
          </p>

          <span className={styles.footerLine} />
        </div>
      </div>
    </section>
  );
}

export default Technology;