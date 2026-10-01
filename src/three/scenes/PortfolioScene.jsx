import {
  Float,
  Line,
  OrbitControls,
  RoundedBox,
} from '@react-three/drei';

import {
  Canvas,
  useFrame,
} from '@react-three/fiber';

import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import * as THREE from 'three';

import gsap from 'gsap';


/* =========================================================
   COLORS
========================================================= */

const GOLD = '#d4af37';
const GOLD_BRIGHT = '#f4d76b';
const GOLD_SOFT = '#8f741f';

const WHITE = '#f5f5f5';
const DARK = '#030303';


/* =========================================================
   PROJECT TYPES
========================================================= */

const PROJECT_TYPES = {
  WEB: 'web',
  IMMERSIVE: 'immersive',
  MARKETING: 'marketing',
};


/* =========================================================
   DETECT PROJECT TYPE
========================================================= */

const getProjectType = (project) => {
  if (!project) {
    return PROJECT_TYPES.WEB;
  }

  if (
    project.category
      ?.toLowerCase()
      .includes('3d')
  ) {
    return PROJECT_TYPES.IMMERSIVE;
  }

  if (
    project.category
      ?.toLowerCase()
      .includes('marketing')
  ) {
    return PROJECT_TYPES.MARKETING;
  }

  return PROJECT_TYPES.WEB;
};


/* =========================================================
   RESPONSIVE PREFERENCES
========================================================= */

const useScenePreferences = () => {
  const [state, setState] = useState({
    mobile: false,
    reducedMotion: false,
  });

  useEffect(() => {
    const mobileQuery =
      window.matchMedia(
        '(max-width: 768px)',
      );

    const motionQuery =
      window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      );

    const update = () => {
      setState({
        mobile: mobileQuery.matches,
        reducedMotion:
          motionQuery.matches,
      });
    };

    update();

    mobileQuery.addEventListener(
      'change',
      update,
    );

    motionQuery.addEventListener(
      'change',
      update,
    );

    return () => {
      mobileQuery.removeEventListener(
        'change',
        update,
      );

      motionQuery.removeEventListener(
        'change',
        update,
      );
    };
  }, []);

  return state;
};


/* =========================================================
   GOLD MATERIAL
========================================================= */

const GoldMaterial = ({
  bright = false,
  opacity = 1,
}) => (
  <meshStandardMaterial
    color={
      bright
        ? GOLD_BRIGHT
        : GOLD
    }
    emissive={GOLD}
    emissiveIntensity={
      bright ? 1.25 : 0.5
    }
    metalness={0.85}
    roughness={0.2}
    transparent={opacity < 1}
    opacity={opacity}
  />
);


/* =========================================================
   PARTICLES
========================================================= */

const ParticleField = ({
  mobile,
}) => {
  const positions = useMemo(() => {
    const count = mobile
      ? 28
      : 85;

    const values = [];

    for (
      let index = 0;
      index < count;
      index += 1
    ) {
      values.push(
        (Math.random() - 0.5) * 9,
        (Math.random() - 0.5) * 5.5,
        (Math.random() - 0.5) * 4,
      );
    }

    return new Float32Array(
      values,
    );
  }, [mobile]);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={
            positions.length / 3
          }
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>

      <pointsMaterial
        color={GOLD_BRIGHT}
        size={
          mobile
            ? 0.025
            : 0.032
        }
        transparent
        opacity={0.5}
        sizeAttenuation
      />
    </points>
  );
};


/* =========================================================
   ORBIT RING
========================================================= */

const OrbitRing = ({
  radius = 2.8,
  rotation = [
    Math.PI / 2,
    0,
    0,
  ],
  speed = 0.08,
  opacity = 0.55,
}) => {
  const ref = useRef(null);

  useFrame((_, delta) => {
    if (!ref.current) return;

    ref.current.rotation.z +=
      delta * speed;
  });

  return (
    <group
      ref={ref}
      rotation={rotation}
    >
      <mesh>
        <torusGeometry
          args={[
            radius,
            0.012,
            8,
            128,
          ]}
        />

        <meshBasicMaterial
          color={GOLD}
          transparent
          opacity={opacity}
        />
      </mesh>
    </group>
  );
};


/* =========================================================
   FLOATING GOLD ORBS
========================================================= */

const FloatingOrb = ({
  position,
  size = 0.07,
}) => (
  <Float
    speed={0.7}
    rotationIntensity={0.15}
    floatIntensity={0.5}
  >
    <mesh position={position}>
      <sphereGeometry
        args={[
          size,
          18,
          18,
        ]}
      />

      <GoldMaterial bright />
    </mesh>
  </Float>
);


/* =========================================================
   PLATFORM
========================================================= */

const StagePlatform = ({
  mobile,
}) => {
  return (
    <group
      position={[
        0,
        mobile ? -1.45 : -1.55,
        0,
      ]}
      scale={
        mobile
          ? 0.78
          : 1
      }
    >

      {/* Main platform */}

      <mesh>
        <cylinderGeometry
          args={[
            2.55,
            2.75,
            0.18,
            96,
          ]}
        />

        <meshStandardMaterial
          color="#121212"
          metalness={0.88}
          roughness={0.22}
        />
      </mesh>


      {/* Gold edge */}

      <mesh
        position={[
          0,
          0.11,
          0,
        ]}
      >
        <torusGeometry
          args={[
            2.58,
            0.035,
            12,
            96,
          ]}
        />

        <GoldMaterial bright />
      </mesh>


      {/* Inner light */}

      <mesh
        position={[
          0,
          0.13,
          0,
        ]}
      >
        <torusGeometry
          args={[
            1.75,
            0.018,
            8,
            96,
          ]}
        />

        <meshBasicMaterial
          color={GOLD_BRIGHT}
          transparent
          opacity={0.8}
        />
      </mesh>


      {/* Bottom ring */}

      <mesh
        position={[
          0,
          -0.14,
          0,
        ]}
      >
        <torusGeometry
          args={[
            2.25,
            0.018,
            8,
            96,
          ]}
        />

        <meshBasicMaterial
          color={GOLD}
          transparent
          opacity={0.35}
        />
      </mesh>

    </group>
  );
};


/* =========================================================
   FLOATING SCREEN
========================================================= */

const FloatingScreen = ({
  position,
  rotation,
  scale = 1,
  type = 'standard',
}) => {
  return (
    <Float
      speed={0.7}
      rotationIntensity={0.08}
      floatIntensity={0.2}
    >
      <group
        position={position}
        rotation={rotation}
        scale={scale}
      >

        <RoundedBox
          args={[
            1.65,
            1.05,
            0.07,
          ]}
          radius={0.06}
          smoothness={5}
        >
          <meshStandardMaterial
            color="#161616"
            metalness={0.78}
            roughness={0.24}
          />
        </RoundedBox>


        <mesh
          position={[
            0,
            0,
            0.055,
          ]}
        >
          <planeGeometry
            args={[
              1.43,
              0.83,
            ]}
          />

          <meshStandardMaterial
            color="#090909"
            emissive="#191307"
            emissiveIntensity={0.4}
          />
        </mesh>


        {/* Header */}

        <mesh
          position={[
            -0.45,
            0.3,
            0.09,
          ]}
        >
          <planeGeometry
            args={[
              0.55,
              0.055,
            ]}
          />

          <meshBasicMaterial
            color={GOLD_BRIGHT}
          />
        </mesh>


        {/* Content */}

        <mesh
          position={[
            -0.42,
            0.18,
            0.09,
          ]}
        >
          <planeGeometry
            args={[
              0.68,
              0.035,
            ]}
          />

          <meshBasicMaterial
            color="#777777"
          />
        </mesh>


        {/* Main image */}

        <RoundedBox
          args={[
            0.72,
            0.36,
            0.02,
          ]}
          radius={0.02}
          smoothness={3}
          position={[
            0.3,
            0.02,
            0.09,
          ]}
        >
          <meshStandardMaterial
            color={
              type === 'property'
                ? '#2a2110'
                : '#181818'
            }
            emissive={
              type === 'property'
                ? GOLD_SOFT
                : '#000000'
            }
            emissiveIntensity={
              type === 'property'
                ? 0.28
                : 0
            }
          />
        </RoundedBox>


        {/* Bottom cards */}

        {[-0.42, 0.08].map(
          (x, index) => (
            <RoundedBox
              key={index}
              args={[
                0.43,
                0.2,
                0.02,
              ]}
              radius={0.015}
              smoothness={3}
              position={[
                x,
                -0.27,
                0.09,
              ]}
            >
              <meshStandardMaterial
                color="#171717"
              />
            </RoundedBox>
          ),
        )}

      </group>
    </Float>
  );
};


/* =========================================================
   LAPTOP
========================================================= */

const Laptop = ({
  mobile,
}) => {
  const ref = useRef(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;

    ref.current.rotation.y =
      Math.sin(
        clock.elapsedTime * 0.35,
      ) * 0.035;
  });

  return (
    <group
      ref={ref}
      scale={
        mobile ? 0.78 : 1
      }
    >

      {/* Screen */}

      <RoundedBox
        args={[
          3.1,
          2.05,
          0.13,
        ]}
        radius={0.08}
        smoothness={6}
        position={[
          0,
          0.65,
          0,
        ]}
      >
        <meshStandardMaterial
          color="#181818"
          metalness={0.82}
          roughness={0.22}
        />
      </RoundedBox>


      {/* Display */}

      <mesh
        position={[
          0,
          0.65,
          0.08,
        ]}
      >
        <planeGeometry
          args={[
            2.82,
            1.77,
          ]}
        />

        <meshStandardMaterial
          color="#070707"
          emissive="#171006"
          emissiveIntensity={0.45}
        />
      </mesh>


      {/* Browser header */}

      <mesh
        position={[
          -0.95,
          1.25,
          0.1,
        ]}
      >
        <planeGeometry
          args={[
            1.1,
            0.08,
          ]}
        />

        <meshBasicMaterial
          color={GOLD_BRIGHT}
        />
      </mesh>


      {/* Dashboard cards */}

      {[0, 1, 2].map(
        (index) => (
          <RoundedBox
            key={index}
            args={[
              0.55,
              0.38,
              0.025,
            ]}
            radius={0.02}
            smoothness={3}
            position={[
              -0.85 +
                index * 0.65,
              0.55,
              0.1,
            ]}
          >
            <meshStandardMaterial
              color="#151515"
              emissive={
                index === 1
                  ? GOLD_SOFT
                  : '#000000'
              }
              emissiveIntensity={
                index === 1
                  ? 0.25
                  : 0
              }
            />
          </RoundedBox>
        ),
      )}


      {/* Main chart */}

      <Line
        points={[
          [-1.0, 0.0, 0.11],
          [-0.55, 0.22, 0.11],
          [-0.1, 0.05, 0.11],
          [0.35, 0.3, 0.11],
          [0.85, 0.5, 0.11],
        ]}
        color={GOLD_BRIGHT}
        lineWidth={2}
      />


      {/* Base */}

      <RoundedBox
        args={[
          3.45,
          0.16,
          2.15,
        ]}
        radius={0.05}
        smoothness={5}
        position={[
          0,
          -0.5,
          0.4,
        ]}
      >
        <meshStandardMaterial
          color="#141414"
          metalness={0.82}
          roughness={0.24}
        />
      </RoundedBox>


      {/* Keyboard */}

      <mesh
        position={[
          0,
          -0.4,
          0.72,
        ]}
      >
        <planeGeometry
          args={[
            2.65,
            1.15,
          ]}
        />

        <meshBasicMaterial
          color="#080808"
        />
      </mesh>


      {/* Gold underlight */}

      <mesh
        position={[
          0,
          -0.59,
          0.4,
        ]}
      >
        <boxGeometry
          args={[
            3.05,
            0.025,
            1.8,
          ]}
        />

        <meshBasicMaterial
          color={GOLD}
          transparent
          opacity={0.3}
        />
      </mesh>

    </group>
  );
};


/* =========================================================
   PROPERTY BUILDING
========================================================= */

const PropertyBuilding = ({
  position = [0, 0, 0],
  scale = 1,
}) => {
  return (
    <group
      position={position}
      scale={scale}
    >

      <RoundedBox
        args={[
          1.45,
          1.8,
          1.05,
        ]}
        radius={0.04}
        smoothness={5}
      >
        <meshStandardMaterial
          color="#151515"
          metalness={0.48}
          roughness={0.38}
        />
      </RoundedBox>


      {/* Windows */}

      {[
        [-0.42, 0.45],
        [0, 0.45],
        [0.42, 0.45],
        [-0.42, 0],
        [0, 0],
        [0.42, 0],
        [-0.42, -0.45],
        [0, -0.45],
        [0.42, -0.45],
      ].map(
        ([x, y], index) => (
          <mesh
            key={index}
            position={[
              x,
              y,
              0.54,
            ]}
          >
            <planeGeometry
              args={[
                0.23,
                0.28,
              ]}
            />

            <meshBasicMaterial
              color={
                index % 2 === 0
                  ? GOLD_BRIGHT
                  : '#5c6267'
              }
            />
          </mesh>
        ),
      )}


      {/* Roof */}

      <mesh
        position={[
          0,
          1.1,
          0,
        ]}
      >
        <boxGeometry
          args={[
            1.7,
            0.12,
            1.25,
          ]}
        />

        <meshStandardMaterial
          color="#242424"
          metalness={0.65}
          roughness={0.3}
        />
      </mesh>

    </group>
  );
};


/* =========================================================
   WEB PROJECT
========================================================= */

const WebProject = ({
  mobile,
}) => (
  <group>

    <OrbitRing
      radius={3}
      rotation={[
        Math.PI / 2,
        0.2,
        0,
      ]}
      speed={0.07}
    />

    <OrbitRing
      radius={2.4}
      rotation={[
        Math.PI / 2.3,
        -0.15,
        0,
      ]}
      speed={-0.08}
      opacity={0.24}
    />

    <Laptop
      mobile={mobile}
    />

    <FloatingScreen
      position={
        mobile
          ? [-1.35, 1.45, -0.4]
          : [-2.3, 1.35, -0.5]
      }
      rotation={[
        0,
        0.35,
        -0.08,
      ]}
      scale={
        mobile ? 0.48 : 0.72
      }
    />

    <FloatingScreen
      position={
        mobile
          ? [1.35, 1.3, -0.4]
          : [2.25, 1.35, -0.5]
      }
      rotation={[
        0,
        -0.35,
        0.08,
      ]}
      scale={
        mobile ? 0.48 : 0.72
      }
    />

    <Line
      points={[
        [-2.3, 1.35, -0.5],
        [-1.1, 0.8, 0],
        [0, 0.5, 0],
      ]}
      color={GOLD}
      transparent
      opacity={0.25}
    />

    <Line
      points={[
        [2.25, 1.35, -0.5],
        [1.1, 0.8, 0],
        [0, 0.5, 0],
      ]}
      color={GOLD}
      transparent
      opacity={0.25}
    />

    <FloatingOrb
      position={[
        -2.7,
        1.8,
        -0.2,
      ]}
    />

    <FloatingOrb
      position={[
        2.7,
        1.7,
        -0.2,
      ]}
      size={0.09}
    />

  </group>
);


/* =========================================================
   IMMERSIVE PROJECT
========================================================= */

const ImmersiveProject = ({
  mobile,
}) => {
  const portal = useRef(null);

  useFrame((_, delta) => {
    if (!portal.current) return;

    portal.current.rotation.z +=
      delta * 0.15;
  });

  return (
    <group>

      <OrbitRing
        radius={3}
        rotation={[
          Math.PI / 2,
          0,
          0.2,
        ]}
        speed={0.06}
      />

      <OrbitRing
        radius={2.35}
        rotation={[
          Math.PI / 2.4,
          0.2,
          0,
        ]}
        speed={-0.08}
        opacity={0.25}
      />

      {/* Portal */}

      <group
        ref={portal}
        position={[
          0,
          0.45,
          -0.6,
        ]}
      >

        <mesh
          rotation={[
            Math.PI / 2,
            0,
            0,
          ]}
        >
          <torusGeometry
            args={[
              1.6,
              0.04,
              12,
              96,
            ]}
          />

          <GoldMaterial bright />
        </mesh>

        <mesh>
          <circleGeometry
            args={[
              1.5,
              64,
            ]}
          />

          <meshBasicMaterial
            color="#211808"
            transparent
            opacity={0.22}
          />
        </mesh>

      </group>


      <PropertyBuilding
        position={[
          0,
          -0.3,
          0,
        ]}
        scale={
          mobile ? 0.8 : 1
        }
      />

      <PropertyBuilding
        position={[
          -1.35,
          -0.65,
          -0.45,
        ]}
        scale={0.52}
      />

      <PropertyBuilding
        position={[
          1.35,
          -0.65,
          -0.45,
        ]}
        scale={0.52}
      />


      <FloatingScreen
        position={
          mobile
            ? [-1.35, 1.5, -0.35]
            : [-2.25, 1.35, -0.45]
        }
        rotation={[
          0,
          0.28,
          -0.08,
        ]}
        scale={
          mobile ? 0.48 : 0.68
        }
        type="property"
      />

      <FloatingScreen
        position={
          mobile
            ? [1.35, 1.45, -0.35]
            : [2.25, 1.4, -0.45]
        }
        rotation={[
          0,
          -0.28,
          0.08,
        ]}
        scale={
          mobile ? 0.48 : 0.68
        }
        type="property"
      />

    </group>
  );
};


/* =========================================================
   MARKETING DASHBOARD
========================================================= */

const MarketingDashboard = ({
  mobile,
}) => {
  const points = [
    [-1.3, -0.35, 0.1],
    [-0.85, -0.05, 0.1],
    [-0.4, -0.2, 0.1],
    [0, 0.1, 0.1],
    [0.4, 0.08, 0.1],
    [0.8, 0.42, 0.1],
    [1.25, 0.62, 0.1],
  ];

  return (
    <group
      scale={
        mobile ? 0.84 : 1
      }
    >

      <RoundedBox
        args={[
          3.2,
          2.05,
          0.12,
        ]}
        radius={0.08}
        smoothness={5}
      >
        <meshStandardMaterial
          color="#101010"
          metalness={0.65}
          roughness={0.28}
        />
      </RoundedBox>


      {/* Header */}

      <mesh
        position={[
          -0.8,
          0.72,
          0.075,
        ]}
      >
        <planeGeometry
          args={[
            1.0,
            0.09,
          ]}
        />

        <meshBasicMaterial
          color={WHITE}
        />
      </mesh>


      {/* KPI cards */}

      {[-0.9, 0, 0.9].map(
        (x, index) => (
          <RoundedBox
            key={index}
            args={[
              0.7,
              0.38,
              0.03,
            ]}
            radius={0.025}
            smoothness={3}
            position={[
              x,
              0.25,
              0.08,
            ]}
          >
            <meshStandardMaterial
              color="#181818"
              emissive={
                index === 1
                  ? GOLD_SOFT
                  : '#000000'
              }
              emissiveIntensity={
                index === 1
                  ? 0.3
                  : 0
              }
            />
          </RoundedBox>
        ),
      )}


      {/* Chart */}

      <RoundedBox
        args={[
          2.6,
          0.85,
          0.03,
        ]}
        radius={0.03}
        smoothness={3}
        position={[
          0,
          -0.55,
          0.08,
        ]}
      >
        <meshStandardMaterial
          color="#141414"
        />
      </RoundedBox>


      <Line
        points={points}
        color={GOLD_BRIGHT}
        lineWidth={2}
      />


      {points.map(
        ([x, y, z], index) => (
          <mesh
            key={index}
            position={[
              x,
              y,
              z + 0.03,
            ]}
          >
            <sphereGeometry
              args={[
                0.045,
                12,
                12,
              ]}
            />

            <meshBasicMaterial
              color={GOLD_BRIGHT}
            />
          </mesh>
        ),
      )}


      {!mobile && (
        <group
          position={[
            0.9,
            -0.1,
            0.12,
          ]}
        >
          {[0.3, 0.5, 0.7, 0.9].map(
            (height, index) => (
              <RoundedBox
                key={index}
                args={[
                  0.14,
                  height,
                  0.12,
                ]}
                radius={0.02}
                smoothness={3}
                position={[
                  index * 0.22 -
                    0.33,
                  height / 2 -
                    0.35,
                  0,
                ]}
              >
                <GoldMaterial />
              </RoundedBox>
            ),
          )}
        </group>
      )}

    </group>
  );
};


/* =========================================================
   MARKETING PROJECT
========================================================= */

const MarketingProject = ({
  mobile,
}) => (
  <group>

    <OrbitRing
      radius={3}
      rotation={[
        Math.PI / 2,
        0.15,
        0,
      ]}
      speed={0.07}
    />

    <OrbitRing
      radius={2.45}
      rotation={[
        Math.PI / 2.2,
        -0.15,
        0,
      ]}
      speed={-0.08}
      opacity={0.24}
    />

    <MarketingDashboard
      mobile={mobile}
    />

    <FloatingScreen
      position={
        mobile
          ? [-1.35, 1.45, -0.4]
          : [-2.25, 1.35, -0.45]
      }
      rotation={[
        0,
        0.28,
        -0.08,
      ]}
      scale={
        mobile ? 0.48 : 0.68
      }
    />

    <FloatingScreen
      position={
        mobile
          ? [1.35, 1.4, -0.4]
          : [2.25, 1.35, -0.45]
      }
      rotation={[
        0,
        -0.28,
        0.08,
      ]}
      scale={
        mobile ? 0.48 : 0.68
      }
    />

    <FloatingOrb
      position={[
        -2.65,
        1.75,
        -0.2,
      ]}
    />

    <FloatingOrb
      position={[
        2.7,
        1.6,
        -0.2,
      ]}
      size={0.09}
    />

  </group>
);


/* =========================================================
   PROJECT VISUAL
========================================================= */

const ProjectVisual = ({
  project,
  mobile,
}) => {
  const type =
    getProjectType(project);

  switch (type) {

    case PROJECT_TYPES.IMMERSIVE:
      return (
        <ImmersiveProject
          mobile={mobile}
        />
      );

    case PROJECT_TYPES.MARKETING:
      return (
        <MarketingProject
          mobile={mobile}
        />
      );

    case PROJECT_TYPES.WEB:
    default:
      return (
        <WebProject
          mobile={mobile}
        />
      );
  }
};


/* =========================================================
   SCENE TRANSITION
========================================================= */

const SceneGroup = ({
  children,
  activeProject,
  reducedMotion,
  mobile,
}) => {
  const ref = useRef(null);

  useEffect(() => {
    if (
      !ref.current ||
      reducedMotion
    ) {
      return;
    }

    gsap.killTweensOf(
      ref.current.scale,
    );

    gsap.killTweensOf(
      ref.current.rotation,
    );

    gsap.fromTo(
      ref.current.scale,
      {
        x: 0.82,
        y: 0.82,
        z: 0.82,
      },
      {
        x: mobile
          ? 0.82
          : 1,
        y: mobile
          ? 0.82
          : 1,
        z: mobile
          ? 0.82
          : 1,
        duration: 0.8,
        ease: 'power3.out',
      },
    );

    gsap.fromTo(
      ref.current.rotation,
      {
        y: -0.18,
      },
      {
        y: 0,
        duration: 0.85,
        ease: 'power3.out',
      },
    );
  }, [
    activeProject,
    reducedMotion,
    mobile,
  ]);

  return (
    <group ref={ref}>
      {children}
    </group>
  );
};


/* =========================================================
   PARALLAX
========================================================= */

const ParallaxGroup = ({
  children,
  reducedMotion,
}) => {
  const ref = useRef(null);

  useFrame((state) => {
    if (
      !ref.current ||
      reducedMotion
    ) {
      return;
    }

    const targetX =
      state.pointer.x * 0.08;

    const targetY =
      state.pointer.y * 0.045;

    ref.current.rotation.y =
      THREE.MathUtils.lerp(
        ref.current.rotation.y,
        targetX,
        0.035,
      );

    ref.current.rotation.x =
      THREE.MathUtils.lerp(
        ref.current.rotation.x,
        -targetY,
        0.035,
      );
  });

  return (
    <group ref={ref}>
      {children}
    </group>
  );
};


/* =========================================================
   SCENE CONTENT
========================================================= */

const SceneContent = ({
  project,
  activeProject,
  mobile,
  reducedMotion,
}) => {
  return (
    <>

      {/* Lighting */}

      <ambientLight
        intensity={0.4}
      />

      <directionalLight
        position={[
          4,
          6,
          5,
        ]}
        intensity={2.4}
        color="#fff3cf"
      />

      <directionalLight
        position={[
          -4,
          2,
          4,
        ]}
        intensity={1.3}
        color="#ffffff"
      />

      <pointLight
        position={[
          -3,
          2,
          3,
        ]}
        intensity={3.2}
        distance={9}
        color={GOLD}
      />

      <pointLight
        position={[
          3,
          -1,
          2,
        ]}
        intensity={2}
        distance={8}
        color={GOLD_SOFT}
      />


      {/* Background particles */}

      <ParticleField
        mobile={mobile}
      />


      {/* Main stage */}

      <ParallaxGroup
        reducedMotion={reducedMotion}
      >

        <SceneGroup
          activeProject={activeProject}
          reducedMotion={reducedMotion}
          mobile={mobile}
        >

          <group
            position={[
              0,
              mobile ? 0 : 0.05,
              0,
            ]}
          >

            <ProjectVisual
              project={project}
              mobile={mobile}
            />

            <StagePlatform
              mobile={mobile}
            />

          </group>

        </SceneGroup>

      </ParallaxGroup>


      {/* Floating objects */}

      <FloatingOrb
        position={[
          -3.2,
          1.7,
          -0.3,
        ]}
      />

      <FloatingOrb
        position={[
          3.2,
          1.55,
          -0.3,
        ]}
        size={0.09}
      />

      <FloatingOrb
        position={[
          2.7,
          -1.2,
          0,
        ]}
        size={0.055}
      />

    </>
  );
};


/* =========================================================
   MAIN SCENE
========================================================= */

const PortfolioScene = ({
  project,
  activeProject = 0,
}) => {
  const {
    mobile,
    reducedMotion,
  } = useScenePreferences();

  return (
    <Canvas
      dpr={
        mobile
          ? [1, 1.25]
          : [1, 1.5]
      }

      camera={{
        position: [
          0,
          0.2,
          mobile
            ? 7.8
            : 7.1,
        ],

        fov:
          mobile
            ? 39
            : 34,

        near: 0.1,
        far: 100,
      }}

      gl={{
        antialias: !mobile,
        alpha: true,
        powerPreference:
          'high-performance',
      }}

      frameloop={
        reducedMotion
          ? 'demand'
          : 'always'
      }
    >

      <color
        attach="background"
        args={[DARK]}
      />

      <SceneContent
        project={project}
        activeProject={activeProject}
        mobile={mobile}
        reducedMotion={
          reducedMotion
        }
      />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={!mobile}
        enableDamping
        dampingFactor={0.055}
        rotateSpeed={0.3}
        minPolarAngle={
          Math.PI / 2.35
        }
        maxPolarAngle={
          Math.PI / 1.7
        }
      />

    </Canvas>
  );
};

export default PortfolioScene;