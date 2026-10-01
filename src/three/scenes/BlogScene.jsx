import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import {
  Canvas,
  useFrame,
  useThree,
} from '@react-three/fiber';

import {
  Float,
  Line,
  OrbitControls,
} from '@react-three/drei';

import * as THREE from 'three';

import gsap from 'gsap';

const GOLD = '#d4af37';
const GOLD_LIGHT = '#f3d46b';

/* =========================================================
   RESPONSIVE PREFERENCES
   ========================================================= */

function useScenePreferences() {
  const [state, setState] = useState({
    mobile: false,
    reducedMotion: false,
  });

  useEffect(() => {
    const mobileQuery = window.matchMedia(
      '(max-width: 768px)'
    );

    const motionQuery = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    );

    const update = () => {
      setState({
        mobile: mobileQuery.matches,
        reducedMotion: motionQuery.matches,
      });
    };

    update();

    mobileQuery.addEventListener(
      'change',
      update
    );

    motionQuery.addEventListener(
      'change',
      update
    );

    return () => {
      mobileQuery.removeEventListener(
        'change',
        update
      );

      motionQuery.removeEventListener(
        'change',
        update
      );
    };
  }, []);

  return state;
}

/* =========================================================
   PARTICLES
   ========================================================= */

function ParticleField({
  mobile,
  reducedMotion,
}) {
  const pointsRef = useRef();

  const positions = useMemo(() => {
    const count = mobile ? 80 : 170;

    const array = new Float32Array(
      count * 3
    );

    for (let i = 0; i < count; i += 1) {
      const radius =
        2.5 + Math.random() * 2.8;

      const angle =
        Math.random() *
        Math.PI *
        2;

      array[i * 3] =
        Math.cos(angle) *
        radius;

      array[i * 3 + 1] =
        (Math.random() - 0.5) *
        4;

      array[i * 3 + 2] =
        Math.sin(angle) *
        radius;
    }

    return array;
  }, [mobile]);

  useFrame((_, delta) => {
    if (
      !pointsRef.current ||
      reducedMotion
    ) {
      return;
    }

    pointsRef.current.rotation.y +=
      delta * 0.025;
  });

  return (
    <points ref={pointsRef}>
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
        color={GOLD_LIGHT}
        size={0.035}
        transparent
        opacity={0.65}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/* =========================================================
   ORBIT RING
   ========================================================= */

function OrbitRing({
  radius,
  rotation,
  speed,
  opacity,
  reducedMotion,
}) {
  const ref = useRef();

  useFrame((_, delta) => {
    if (
      !ref.current ||
      reducedMotion
    ) {
      return;
    }

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
            0.008,
            8,
            160,
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
}

/* =========================================================
   CORE
   ========================================================= */

function DigitalCore({
  reducedMotion,
}) {
  const groupRef = useRef();
  const innerRef = useRef();

  useEffect(() => {
    if (!groupRef.current) {
      return undefined;
    }

    gsap.fromTo(
      groupRef.current.scale,
      {
        x: 0.2,
        y: 0.2,
        z: 0.2,
      },
      {
        x: 1,
        y: 1,
        z: 1,
        duration: 1.6,
        ease: 'expo.out',
      }
    );

    return undefined;
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) {
      return;
    }

    if (!reducedMotion) {
      groupRef.current.rotation.y +=
        delta * 0.13;

      groupRef.current.rotation.x =
        Math.sin(
          state.clock.elapsedTime *
            0.45
        ) * 0.05;
    }

    if (
      innerRef.current &&
      !reducedMotion
    ) {
      innerRef.current.rotation.z +=
        delta * 0.35;
    }
  });

  return (
    <group ref={groupRef}>

      <mesh>
        <sphereGeometry
          args={[0.92, 32, 32]}
        />

        <meshBasicMaterial
          color={GOLD}
          transparent
          opacity={0.045}
        />
      </mesh>

      <mesh>
        <icosahedronGeometry
          args={[0.72, 2]}
        />

        <meshStandardMaterial
          color="#8a6915"
          emissive="#b38b19"
          emissiveIntensity={0.55}
          metalness={0.85}
          roughness={0.22}
        />
      </mesh>

      <mesh ref={innerRef}>
        <icosahedronGeometry
          args={[0.46, 1]}
        />

        <meshBasicMaterial
          color={GOLD_LIGHT}
          wireframe
          transparent
          opacity={0.72}
        />
      </mesh>

      <pointLight
        color={GOLD_LIGHT}
        intensity={4}
        distance={3}
      />

    </group>
  );
}

/* =========================================================
   ORBIT DOT
   ========================================================= */

function OrbitDot({
  radius,
  speed,
  offset,
  reducedMotion,
}) {
  const ref = useRef();

  useFrame((state) => {
    if (!ref.current) {
      return;
    }

    const time = reducedMotion
      ? offset
      : state.clock.elapsedTime *
          speed +
        offset;

    ref.current.position.set(
      Math.cos(time) * radius,
      Math.sin(time * 1.5) *
        0.22,
      Math.sin(time) * radius
    );
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry
        args={[0.055, 12, 12]}
      />

      <meshStandardMaterial
        color={GOLD_LIGHT}
        emissive={GOLD}
        emissiveIntensity={2}
      />
    </mesh>
  );
}

/* =========================================================
   CONNECTIONS
   ========================================================= */

function ConnectionNetwork({
  reducedMotion,
}) {
  const groupRef = useRef();

  const connections = [
    [
      [-2.7, 0.75, 0],
      [-1.7, 0.45, 0],
      [-0.75, 0.15, 0],
    ],

    [
      [2.7, 0.75, 0],
      [1.7, 0.45, 0],
      [0.75, 0.15, 0],
    ],

    [
      [-2.1, -0.9, 0],
      [-1.2, -0.5, 0],
      [-0.5, -0.2, 0],
    ],

    [
      [2.1, -0.9, 0],
      [1.2, -0.5, 0],
      [0.5, -0.2, 0],
    ],
  ];

  useFrame((state) => {
    if (
      !groupRef.current ||
      reducedMotion
    ) {
      return;
    }

    groupRef.current.position.y =
      Math.sin(
        state.clock.elapsedTime *
          0.4
      ) * 0.025;
  });

  return (
    <group ref={groupRef}>
      {connections.map(
        (points, index) => (
          <Line
            key={index}
            points={points}
            color={GOLD}
            transparent
            opacity={0.22}
            lineWidth={0.7}
          />
        )
      )}
    </group>
  );
}

/* =========================================================
   SCENE
   ========================================================= */

function SceneContent({
  mobile,
  reducedMotion,
}) {
  const groupRef = useRef();

  const { pointer } = useThree();

  useFrame(() => {
    if (!groupRef.current) {
      return;
    }

    const targetX =
      pointer.y * -0.1;

    const targetY =
      pointer.x * 0.14;

    groupRef.current.rotation.x +=
      (targetX -
        groupRef.current.rotation.x) *
      0.025;

    groupRef.current.rotation.y +=
      (targetY -
        groupRef.current.rotation.y) *
      0.025;
  });

  return (
    <group ref={groupRef}>

      <ambientLight
        intensity={0.5}
      />

      <pointLight
        position={[2, 2, 3]}
        intensity={2}
        color={GOLD}
      />

      <pointLight
        position={[-2, -1, 2]}
        intensity={1.2}
        color="#fff5c8"
      />

      <ParticleField
        mobile={mobile}
        reducedMotion={reducedMotion}
      />

      <Float
        speed={
          reducedMotion
            ? 0
            : 0.5
        }
        rotationIntensity={
          reducedMotion
            ? 0
            : 0.12
        }
        floatIntensity={
          reducedMotion
            ? 0
            : 0.1
        }
      >

        <DigitalCore
          reducedMotion={
            reducedMotion
          }
        />

        <OrbitRing
          radius={1.15}
          rotation={[
            Math.PI / 2.7,
            0.2,
            0,
          ]}
          speed={0.08}
          opacity={0.6}
          reducedMotion={
            reducedMotion
          }
        />

        <OrbitRing
          radius={1.5}
          rotation={[
            1.1,
            0.25,
            -0.3,
          ]}
          speed={-0.055}
          opacity={0.38}
          reducedMotion={
            reducedMotion
          }
        />

        <OrbitRing
          radius={1.9}
          rotation={[
            0.4,
            -0.4,
            0.7,
          ]}
          speed={0.035}
          opacity={0.2}
          reducedMotion={
            reducedMotion
          }
        />

        <OrbitDot
          radius={1.15}
          speed={0.4}
          offset={0}
          reducedMotion={
            reducedMotion
          }
        />

        <OrbitDot
          radius={1.5}
          speed={-0.27}
          offset={2}
          reducedMotion={
            reducedMotion
          }
        />

        <OrbitDot
          radius={1.9}
          speed={0.18}
          offset={4}
          reducedMotion={
            reducedMotion
          }
        />

        <ConnectionNetwork
          reducedMotion={
            reducedMotion
          }
        />

      </Float>

    </group>
  );
}

/* =========================================================
   MAIN
   ========================================================= */

function BlogScene() {
  const {
    mobile,
    reducedMotion,
  } = useScenePreferences();

  return (
    <Canvas
      camera={{
        position: [0, 0, 5.8],
        fov: mobile ? 48 : 42,
      }}
      dpr={
        mobile
          ? [1, 1.3]
          : [1, 1.7]
      }
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

      <SceneContent
        mobile={mobile}
        reducedMotion={
          reducedMotion
        }
      />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={!mobile}
        autoRotate={
          !reducedMotion
        }
        autoRotateSpeed={0.3}
      />

    </Canvas>
  );
}

export default BlogScene;