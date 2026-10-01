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
const GOLD_LIGHT = '#f4d875';

function useScenePreferences() {
  const [preferences, setPreferences] = useState({
    reducedMotion: false,
    mobile: false,
  });

  useEffect(() => {
    const reducedQuery = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    );

    const mobileQuery = window.matchMedia(
      '(max-width: 768px)'
    );

    const update = () => {
      setPreferences({
        reducedMotion: reducedQuery.matches,
        mobile: mobileQuery.matches,
      });
    };

    update();

    reducedQuery.addEventListener(
      'change',
      update
    );

    mobileQuery.addEventListener(
      'change',
      update
    );

    return () => {
      reducedQuery.removeEventListener(
        'change',
        update
      );

      mobileQuery.removeEventListener(
        'change',
        update
      );
    };
  }, []);

  return preferences;
}

/* =========================================================
   PARTICLES
   ========================================================= */

function ParticleField({
  mobile,
  reducedMotion,
}) {
  const pointsRef = useRef();

  const particles = useMemo(() => {
    const count = mobile ? 90 : 180;

    const positions = new Float32Array(
      count * 3
    );

    const sizes = new Float32Array(count);

    for (let i = 0; i < count; i += 1) {
      const radius =
        2.8 + Math.random() * 2.5;

      const angle =
        Math.random() * Math.PI * 2;

      positions[i * 3] =
        Math.cos(angle) *
        radius *
        (0.65 + Math.random() * 0.45);

      positions[i * 3 + 1] =
        (Math.random() - 0.5) *
        3.8;

      positions[i * 3 + 2] =
        Math.sin(angle) *
        radius *
        (0.45 + Math.random() * 0.55);

      sizes[i] =
        0.018 + Math.random() * 0.035;
    }

    return {
      positions,
      sizes,
    };
  }, [mobile]);

  useFrame((state, delta) => {
    if (!pointsRef.current) {
      return;
    }

    if (!reducedMotion) {
      pointsRef.current.rotation.y +=
        delta * 0.025;
    }

    pointsRef.current.rotation.x =
      Math.sin(state.clock.elapsedTime * 0.12) *
      0.03;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.positions.length / 3}
          array={particles.positions}
          itemSize={3}
        />

        <bufferAttribute
          attach="attributes-size"
          count={particles.sizes.length}
          array={particles.sizes}
          itemSize={1}
        />
      </bufferGeometry>

      <pointsMaterial
        color={GOLD_LIGHT}
        size={0.035}
        sizeAttenuation
        transparent
        opacity={0.72}
        depthWrite={false}
      />
    </points>
  );
}

/* =========================================================
   ORBIT
   ========================================================= */

function OrbitRing({
  radius,
  rotation,
  opacity = 0.6,
  speed = 0.08,
  reducedMotion,
}) {
  const ref = useRef();

  useFrame((_, delta) => {
    if (!ref.current || reducedMotion) {
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
   ORBIT PARTICLES
   ========================================================= */

function OrbitParticle({
  radius,
  speed,
  offset,
  vertical = false,
  reducedMotion,
}) {
  const ref = useRef();

  useFrame((state) => {
    if (!ref.current) {
      return;
    }

    const time = reducedMotion
      ? offset
      : state.clock.elapsedTime * speed +
        offset;

    const x =
      Math.cos(time) * radius;

    const z =
      Math.sin(time) * radius;

    if (vertical) {
      ref.current.position.set(
        x,
        Math.sin(time * 1.5) * 0.35,
        z
      );
    } else {
      ref.current.position.set(
        x,
        Math.sin(time * 1.8) * 0.15,
        z
      );
    }
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.055, 12, 12]} />

      <meshStandardMaterial
        color={GOLD_LIGHT}
        emissive={GOLD}
        emissiveIntensity={1.5}
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  );
}

/* =========================================================
   CENTRAL CORE
   ========================================================= */

function Core({
  reducedMotion,
}) {
  const groupRef = useRef();
  const sphereRef = useRef();
  const innerRef = useRef();

  useEffect(() => {
    if (!groupRef.current) {
      return undefined;
    }

    gsap.fromTo(
      groupRef.current.scale,
      {
        x: 0.25,
        y: 0.25,
        z: 0.25,
      },
      {
        x: 1,
        y: 1,
        z: 1,
        duration: 1.8,
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
        delta * 0.12;

      groupRef.current.rotation.x =
        Math.sin(
          state.clock.elapsedTime * 0.4
        ) * 0.05;
    }

    if (sphereRef.current) {
      const pulse =
        1 +
        Math.sin(
          state.clock.elapsedTime * 1.2
        ) *
          0.025;

      sphereRef.current.scale.setScalar(
        pulse
      );
    }

    if (innerRef.current && !reducedMotion) {
      innerRef.current.rotation.z +=
        delta * 0.3;
    }
  });

  return (
    <group ref={groupRef}>

      {/* Outer glow */}

      <mesh>
        <sphereGeometry
          args={[0.92, 32, 32]}
        />

        <meshBasicMaterial
          color={GOLD}
          transparent
          opacity={0.055}
        />
      </mesh>

      {/* Main core */}

      <mesh ref={sphereRef}>
        <sphereGeometry
          args={[0.72, 48, 48]}
        />

        <meshStandardMaterial
          color="#6d4f00"
          emissive="#b58b15"
          emissiveIntensity={0.45}
          metalness={0.85}
          roughness={0.2}
        />
      </mesh>

      {/* Inner glass */}

      <mesh ref={innerRef}>
        <sphereGeometry
          args={[0.48, 32, 32]}
        />

        <meshPhysicalMaterial
          color="#e1bb43"
          transparent
          opacity={0.24}
          roughness={0.12}
          metalness={0.55}
          transmission={0.25}
          thickness={0.5}
        />
      </mesh>

      {/* Center light */}

      <pointLight
        color={GOLD_LIGHT}
        intensity={4}
        distance={3.2}
      />

    </group>
  );
}

/* =========================================================
   DIGITAL CONNECTIONS
   ========================================================= */

function ConnectionLines({
  reducedMotion,
}) {
  const groupRef = useRef();

  const lines = [
    [
      [-2.7, 0.7, 0],
      [-1.6, 0.4, 0],
      [-0.7, 0.15, 0],
    ],
    [
      [2.6, 0.7, 0],
      [1.6, 0.35, 0],
      [0.7, 0.15, 0],
    ],
    [
      [-1.8, -0.9, 0.1],
      [-1, -0.45, 0.05],
      [-0.45, -0.25, 0],
    ],
    [
      [1.8, -0.9, 0.1],
      [1, -0.45, 0.05],
      [0.45, -0.25, 0],
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
        state.clock.elapsedTime * 0.45
      ) * 0.025;
  });

  return (
    <group ref={groupRef}>
      {lines.map((points, index) => (
        <Line
          key={index}
          points={points}
          color={GOLD}
          transparent
          opacity={0.25}
          lineWidth={0.7}
        />
      ))}
    </group>
  );
}

/* =========================================================
   CORE SCENE
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
      pointer.y * -0.08;

    const targetY =
      pointer.x * 0.12;

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
        intensity={0.45}
        color="#ffffff"
      />

      <pointLight
        position={[2, 2, 3]}
        intensity={2}
        color={GOLD}
      />

      <pointLight
        position={[-2, -1, 2]}
        intensity={1.3}
        color="#fff4bd"
      />

      <ParticleField
        mobile={mobile}
        reducedMotion={reducedMotion}
      />

      <Float
        speed={reducedMotion ? 0 : 0.55}
        rotationIntensity={
          reducedMotion ? 0 : 0.15
        }
        floatIntensity={
          reducedMotion ? 0 : 0.12
        }
      >
        <Core
          reducedMotion={reducedMotion}
        />

        <OrbitRing
          radius={1.2}
          rotation={[
            Math.PI / 2.8,
            0.15,
            0.2,
          ]}
          opacity={0.65}
          speed={0.08}
          reducedMotion={reducedMotion}
        />

        <OrbitRing
          radius={1.55}
          rotation={[
            1.1,
            0.2,
            -0.35,
          ]}
          opacity={0.38}
          speed={-0.055}
          reducedMotion={reducedMotion}
        />

        <OrbitRing
          radius={1.95}
          rotation={[
            0.4,
            -0.45,
            0.9,
          ]}
          opacity={0.2}
          speed={0.035}
          reducedMotion={reducedMotion}
        />

        <OrbitParticle
          radius={1.2}
          speed={0.42}
          offset={0}
          reducedMotion={reducedMotion}
        />

        <OrbitParticle
          radius={1.55}
          speed={-0.28}
          offset={2}
          vertical
          reducedMotion={reducedMotion}
        />

        <OrbitParticle
          radius={1.95}
          speed={0.18}
          offset={4}
          reducedMotion={reducedMotion}
        />

        <OrbitParticle
          radius={1.5}
          speed={0.3}
          offset={4.8}
          vertical
          reducedMotion={reducedMotion}
        />

        <ConnectionLines
          reducedMotion={reducedMotion}
        />
      </Float>
    </group>
  );
}

/* =========================================================
   CAMERA
   ========================================================= */

function CameraRig() {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(
      0,
      0,
      5.8
    );

    camera.lookAt(0, 0, 0);
  }, [camera]);

  return null;
}

/* =========================================================
   MAIN COMPONENT
   ========================================================= */

function BlogArticleScene({
  category = '',
}) {
  const {
    reducedMotion,
    mobile,
  } = useScenePreferences();

  const fov = mobile ? 48 : 42;

  return (
    <Canvas
      dpr={
        mobile
          ? [1, 1.35]
          : [1, 1.7]
      }
      camera={{
        position: [0, 0, 5.8],
        fov,
      }}
      gl={{
        antialias: !mobile,
        alpha: true,
        powerPreference: 'high-performance',
      }}
      frameloop={
        reducedMotion
          ? 'demand'
          : 'always'
      }
    >
      <CameraRig />

      <SceneContent
        mobile={mobile}
        reducedMotion={reducedMotion}
      />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={!mobile}
        autoRotate={!reducedMotion}
        autoRotateSpeed={0.35}
        minPolarAngle={Math.PI / 2.4}
        maxPolarAngle={Math.PI / 1.7}
      />
    </Canvas>
  );
}

export default BlogArticleScene;