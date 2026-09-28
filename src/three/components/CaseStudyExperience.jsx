import {
  Canvas,
  useFrame,
} from '@react-three/fiber';

import { OrbitControls } from '@react-three/drei';

import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import * as THREE from 'three';

import FloatingGroup from './FloatingGroup.jsx';

import styles from './CaseStudyExperience.module.css';

const GOLD = '#d4af37';

/* =========================================================
   RESPONSIVE / MOTION PREFERENCES
========================================================= */

function useScenePreferences() {
  const [preferences, setPreferences] = useState({
    isMobile: false,
    reducedMotion: false,
  });

  useEffect(() => {
    const mobileQuery = window.matchMedia(
      '(max-width: 700px)',
    );

    const motionQuery = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    );

    const updatePreferences = () => {
      setPreferences({
        isMobile: mobileQuery.matches,
        reducedMotion: motionQuery.matches,
      });
    };

    updatePreferences();

    mobileQuery.addEventListener(
      'change',
      updatePreferences,
    );

    motionQuery.addEventListener(
      'change',
      updatePreferences,
    );

    return () => {
      mobileQuery.removeEventListener(
        'change',
        updatePreferences,
      );

      motionQuery.removeEventListener(
        'change',
        updatePreferences,
      );
    };
  }, []);

  return preferences;
}

/* =========================================================
   PROJECT CORE
========================================================= */

function ProjectCore({
  isMobile,
  reducedMotion,
}) {
  const groupRef = useRef(null);

  const targetScale = isMobile ? 0.9 : 1;

  useFrame((state, delta) => {
    if (
      reducedMotion ||
      !groupRef.current
    ) {
      return;
    }

    groupRef.current.rotation.x +=
      delta * 0.08;

    groupRef.current.rotation.y +=
      delta * 0.14;

    const currentScale =
      groupRef.current.scale.x;

    const nextScale =
      THREE.MathUtils.lerp(
        currentScale,
        targetScale,
        0.05,
      );

    groupRef.current.scale.setScalar(
      nextScale,
    );
  });

  return (
    <group ref={groupRef}>
      {/* Central project core */}
      <mesh>
        <icosahedronGeometry
          args={[
            1.15,
            isMobile ? 1 : 2,
          ]}
        />

        <meshStandardMaterial
          color="#ffffff"
          metalness={0.8}
          roughness={0.18}
          emissive={GOLD}
          emissiveIntensity={
            reducedMotion ? 0.04 : 0.08
          }
        />
      </mesh>

      {/* Gold wireframe layer */}
      <mesh scale={1.08}>
        <icosahedronGeometry
          args={[
            1.15,
            isMobile ? 1 : 2,
          ]}
        />

        <meshBasicMaterial
          color={GOLD}
          wireframe
          transparent
          opacity={0.55}
        />
      </mesh>

      {/* Primary orbit */}
      <mesh scale={1.25}>
        <torusGeometry
          args={[
            1.15,
            0.012,
            12,
            isMobile ? 64 : 96,
          ]}
        />

        <meshBasicMaterial
          color={GOLD}
          transparent
          opacity={0.75}
        />
      </mesh>

      {/* Secondary orbit */}
      <mesh
        rotation={[
          Math.PI / 2,
          0,
          0,
        ]}
        scale={1.4}
      >
        <torusGeometry
          args={[
            1.15,
            0.008,
            12,
            isMobile ? 64 : 96,
          ]}
        />

        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.18}
        />
      </mesh>
    </group>
  );
}

/* =========================================================
   TECHNOLOGY NODE
========================================================= */

function TechnologyNode({
  index,
  total,
  label,
  active,
  onSelect,
  isMobile,
  reducedMotion,
}) {
  const groupRef = useRef(null);

  const angle =
    (index / total) *
    Math.PI *
    2;

  const radius = isMobile
    ? 2.05
    : 2.65;

  const position = useMemo(
    () => [
      Math.cos(angle) * radius,
      Math.sin(angle) * radius,
      Math.sin(angle * 1.7) * 0.45,
    ],
    [angle, radius],
  );

  useFrame(() => {
    if (
      reducedMotion ||
      !groupRef.current
    ) {
      return;
    }

    const targetScale = active
      ? 1.3
      : 1;

    const currentScale =
      groupRef.current.scale.x;

    const nextScale =
      THREE.MathUtils.lerp(
        currentScale,
        targetScale,
        0.08,
      );

    groupRef.current.scale.setScalar(
      nextScale,
    );
  });

  return (
    <group
      ref={groupRef}
      position={position}
      onClick={(event) => {
        event.stopPropagation();
        onSelect(label);
      }}
    >
      <mesh>
        <sphereGeometry
          args={[
            active
              ? 0.13
              : 0.09,
            isMobile ? 10 : 16,
            isMobile ? 10 : 16,
          ]}
        />

        <meshStandardMaterial
          color={
            active
              ? '#ffffff'
              : GOLD
          }
          emissive={GOLD}
          emissiveIntensity={
            active ? 0.7 : 0.25
          }
          metalness={0.6}
          roughness={0.25}
        />
      </mesh>
    </group>
  );
}

/* =========================================================
   TECHNOLOGY CONNECTIONS
========================================================= */

function OrbitConnections({
  count,
  isMobile,
}) {
  const points = useMemo(() => {
    const result = [];

    const radius = isMobile
      ? 2.05
      : 2.65;

    for (
      let index = 0;
      index < count;
      index += 1
    ) {
      const angle =
        (index / count) *
        Math.PI *
        2;

      result.push([
        Math.cos(angle) * radius,
        Math.sin(angle) * radius,
        Math.sin(angle * 1.7) * 0.45,
      ]);
    }

    return result;
  }, [count, isMobile]);

  const geometry = useMemo(() => {
    const positions = [];

    points.forEach((point) => {
      positions.push(0, 0, 0);
      positions.push(...point);
    });

    const bufferGeometry =
      new THREE.BufferGeometry();

    bufferGeometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(
        positions,
        3,
      ),
    );

    return bufferGeometry;
  }, [points]);

  useEffect(() => {
    return () => {
      geometry.dispose();
    };
  }, [geometry]);

  return (
    <lineSegments
      geometry={geometry}
    >
      <lineBasicMaterial
        color={GOLD}
        transparent
        opacity={0.22}
      />
    </lineSegments>
  );
}

/* =========================================================
   THREE.JS SCENE
========================================================= */

function Scene({
  technologies,
  activeTechnology,
  setActiveTechnology,
  isMobile,
  reducedMotion,
}) {
  const orbitGroup = useRef(null);

  useFrame((state, delta) => {
    if (
      reducedMotion ||
      !orbitGroup.current
    ) {
      return;
    }

    orbitGroup.current.rotation.z +=
      delta * 0.025;

    orbitGroup.current.rotation.y +=
      delta * 0.018;
  });

  return (
    <>
      {/* Lighting */}
      <ambientLight
        intensity={
          isMobile ? 0.35 : 0.45
        }
      />

      <directionalLight
        position={[3, 4, 5]}
        intensity={
          isMobile ? 0.9 : 1.2
        }
      />

      <pointLight
        position={[-4, -2, 3]}
        color={GOLD}
        intensity={
          isMobile ? 2 : 3
        }
        distance={8}
      />

      {/* Main project core */}
      {reducedMotion ? (
        <ProjectCore
          isMobile={isMobile}
          reducedMotion
        />
      ) : (
        <FloatingGroup
          speed={isMobile ? 0.8 : 1.2}
          rotationIntensity={isMobile ? 0.08 : 0.15}
          floatIntensity={isMobile ? 0.2 : 0.35}
        >
          <ProjectCore
            isMobile={isMobile}
            reducedMotion={false}
          />
        </FloatingGroup>
      )}

      {/* Technology orbit */}
      <group ref={orbitGroup}>
        <OrbitConnections
          count={technologies.length}
          isMobile={isMobile}
        />

        {technologies.map(
          (technology, index) => (
            <TechnologyNode
              key={technology}
              index={index}
              total={technologies.length}
              label={technology}
              active={
                activeTechnology ===
                technology
              }
              onSelect={
                setActiveTechnology
              }
              isMobile={isMobile}
              reducedMotion={
                reducedMotion
              }
            />
          ),
        )}
      </group>

      {/* User interaction */}
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        enableRotate={!reducedMotion}
        enableDamping={!reducedMotion}
        autoRotate={!reducedMotion}
        autoRotateSpeed={0.35}
        dampingFactor={0.06}
        rotateSpeed={
          isMobile ? 0.35 : 0.5
        }
        minPolarAngle={
          Math.PI / 2.8
        }
        maxPolarAngle={
          Math.PI / 1.8
        }
      />
    </>
  );
}

/* =========================================================
   CASE STUDY EXPERIENCE
========================================================= */

function CaseStudyExperience({
  project,
}) {
  const [
    activeTechnology,
    setActiveTechnology,
  ] = useState(
    project.technologies?.[0] || '',
  );

  const {
    isMobile,
    reducedMotion,
  } = useScenePreferences();

  const technologies =
    project.technologies || [];

  /*
   * Keep the selected technology valid
   * when navigating between different
   * case-study routes.
   */
  useEffect(() => {
    setActiveTechnology(
      technologies[0] || '',
    );
  }, [project.slug]);

  if (!technologies.length) {
    return null;
  }

  return (
    <section
      className={styles.experience}
      aria-labelledby="project-experience-title"
    >
      {/* Section header */}
      <div className={styles.header}>
        <div>
          <p className={styles.eyebrow}>
            INTERACTIVE EXPERIENCE
          </p>

          <h2 id="project-experience-title">
            Explore the technology
            behind the project.
          </h2>
        </div>

        <p className={styles.description}>
          Explore the project system through
          an interactive 3D view. Select a
          technology node to inspect the
          architecture layer.
        </p>
      </div>

      {/* Interactive 3D experience */}
      <div className={styles.experienceGrid}>
        <div
          className={styles.sceneWrapper}
        >
          <Canvas
            dpr={
              isMobile
                ? [1, 1.2]
                : [1, 1.25]
            }
            camera={{
              position: [
                0,
                0,
                isMobile ? 7.2 : 7,
              ],
              fov: isMobile ? 47 : 45,
            }}
            gl={{
              antialias: !isMobile,
              alpha: true,
              powerPreference:
                'high-performance',
            }}
            frameloop={
              reducedMotion
                ? 'demand'
                : 'always'
            }
            performance={{
              min: 0.5,
            }}
          >
            <color
              attach="background"
              args={['#050505']}
            />

            <Scene
              technologies={
                technologies
              }
              activeTechnology={
                activeTechnology
              }
              setActiveTechnology={
                setActiveTechnology
              }
              isMobile={isMobile}
              reducedMotion={
                reducedMotion
              }
            />
          </Canvas>

          <div
            className={
              styles.sceneHint
            }
            aria-hidden="true"
          >
            {reducedMotion
              ? 'Reduced motion enabled'
              : isMobile
                ? 'Tap a node to explore'
                : 'Drag to explore · Select a node'}
          </div>
        </div>

        {/* Accessible technology information */}
        <aside
          className={styles.infoPanel}
          aria-live="polite"
        >
          <p className={styles.infoNumber}>
            {project.number}
          </p>

          <p className={styles.infoLabel}>
            PROJECT SYSTEM
          </p>

          <h3>
            {activeTechnology}
          </h3>

          <p>
            {activeTechnology
              ? `${activeTechnology} is part of the technology stack used to shape this project experience.`
              : 'Select a technology node to explore the project stack.'}
          </p>

          <div
            className={styles.techList}
          >
            {technologies.map(
              (technology) => (
                <button
                  key={technology}
                  type="button"
                  className={
                    activeTechnology ===
                    technology
                      ? styles.activeTech
                      : styles.techButton
                  }
                  onClick={() =>
                    setActiveTechnology(
                      technology,
                    )
                  }
                  aria-pressed={
                    activeTechnology ===
                    technology
                  }
                >
                  <span>
                    {technology}
                  </span>

                  <span aria-hidden="true">
                    →
                  </span>
                </button>
              ),
            )}
          </div>
        </aside>
      </div>
    </section>
  );
}

export default CaseStudyExperience;