import {
  useRef,
} from 'react';

import {
  Canvas,
  useFrame,
  useThree,
} from '@react-three/fiber';

import {
  OrbitControls,
} from '@react-three/drei';

import * as THREE from 'three';

import FloatingGroup from '../components/FloatingGroup.jsx';

/* =========================================================
   PARTICLES
========================================================= */

function ParticleField({
  isMobile,
  reducedMotion,
}) {
  const pointsRef = useRef(null);

  const count = isMobile
    ? 70
    : 150;

  const positions = new Float32Array(
    count * 3
  );

  for (let i = 0; i < count; i += 1) {
    const radius =
      2.8 + Math.random() * 2.2;

    const theta =
      Math.random() * Math.PI * 2;

    const phi =
      Math.acos(
        2 * Math.random() - 1
      );

    positions[i * 3] =
      radius *
      Math.sin(phi) *
      Math.cos(theta);

    positions[i * 3 + 1] =
      radius *
      Math.cos(phi);

    positions[i * 3 + 2] =
      radius *
      Math.sin(phi) *
      Math.sin(theta);
  }

  useFrame((state, delta) => {
    if (
      reducedMotion ||
      !pointsRef.current
    ) {
      return;
    }

    pointsRef.current.rotation.y +=
      delta * 0.012;

    pointsRef.current.rotation.x +=
      delta * 0.004;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>

      <pointsMaterial
        color="#D4AF37"
        size={isMobile ? 0.025 : 0.035}
        sizeAttenuation
        transparent
        opacity={0.55}
        depthWrite={false}
      />
    </points>
  );
}

/* =========================================================
   ORBITING DOTS
========================================================= */

function OrbitDots({
  radius,
  speed,
  color,
  count = 3,
}) {
  const groupRef = useRef(null);

  useFrame((_, delta) => {
    if (!groupRef.current) {
      return;
    }

    groupRef.current.rotation.z +=
      delta * speed;
  });

  return (
    <group ref={groupRef}>
      {Array.from({
        length: count,
      }).map((_, index) => {
        const angle =
          (index / count) *
          Math.PI *
          2;

        return (
          <mesh
            key={index}
            position={[
              Math.cos(angle) * radius,
              Math.sin(angle) * radius,
              0,
            ]}
          >
            <sphereGeometry
              args={[0.075, 16, 16]}
            />

            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={0.8}
              metalness={0.9}
              roughness={0.18}
            />
          </mesh>
        );
      })}
    </group>
  );
}

/* =========================================================
   ORBITAL RING
========================================================= */

function OrbitalRing({
  radius,
  tube,
  rotation,
  speed,
  opacity = 0.65,
  isMobile,
}) {
  const ringRef = useRef(null);

  useFrame((_, delta) => {
    if (!ringRef.current) {
      return;
    }

    ringRef.current.rotation.z +=
      delta * speed;
  });

  return (
    <mesh
      ref={ringRef}
      rotation={rotation}
    >
      <torusGeometry
        args={[
          radius,
          tube,
          12,
          isMobile ? 64 : 100,
        ]}
      />

      <meshStandardMaterial
        color="#D4AF37"
        metalness={0.95}
        roughness={0.2}
        transparent
        opacity={opacity}
        emissive="#6D5514"
        emissiveIntensity={0.18}
      />
    </mesh>
  );
}

/* =========================================================
   CENTRAL CORE
========================================================= */

function AboutCore({
  isMobile,
  reducedMotion,
}) {
  const groupRef = useRef(null);
  const coreRef = useRef(null);
  const innerRef = useRef(null);

  const { viewport } = useThree();

  useFrame((state, delta) => {
    if (!groupRef.current) {
      return;
    }

    if (!reducedMotion) {
      const elapsed =
        state.clock.getElapsedTime();

      groupRef.current.rotation.y +=
        delta * 0.09;

      groupRef.current.rotation.x =
        Math.sin(elapsed * 0.35) * 0.04;

      const targetY =
        Math.sin(elapsed * 0.55) *
        0.09;

      groupRef.current.position.y +=
        (targetY -
          groupRef.current.position.y) *
        0.035;

      if (coreRef.current) {
        const scale =
          1 +
          Math.sin(elapsed * 1.3) *
            0.025;

        coreRef.current.scale.lerp(
          new THREE.Vector3(
            scale,
            scale,
            scale
          ),
          0.08
        );
      }

      if (innerRef.current) {
        innerRef.current.rotation.y +=
          delta * 0.15;
      }
    }
  });

  const scale = isMobile
    ? 0.7
    : viewport.width < 7
      ? 0.82
      : 1;

  return (
    <group
      ref={groupRef}
      scale={scale}
      position={[
        0,
        0,
        -0.25,
      ]}
    >
      {/* CENTRAL CORE */}

      <mesh ref={coreRef}>
        <icosahedronGeometry
          args={[
            0.68,
            isMobile ? 1 : 2,
          ]}
        />

        <meshStandardMaterial
          color="#D4AF37"
          metalness={0.95}
          roughness={0.18}
          emissive="#8A6C17"
          emissiveIntensity={0.32}
        />
      </mesh>

      {/* DARK INNER CORE */}

      <mesh
        ref={innerRef}
        scale={0.63}
      >
        <sphereGeometry
          args={[
            0.68,
            isMobile ? 20 : 32,
            isMobile ? 20 : 32,
          ]}
        />

        <meshStandardMaterial
          color="#030303"
          metalness={0.9}
          roughness={0.22}
        />
      </mesh>

      {/* OUTER ORBIT */}

      <OrbitalRing
        radius={1.65}
        tube={0.012}
        rotation={[
          Math.PI / 2.7,
          0,
          0,
        ]}
        speed={0.12}
        opacity={0.48}
        isMobile={isMobile}
      />

      {/* SECOND ORBIT */}

      <OrbitalRing
        radius={1.35}
        tube={0.018}
        rotation={[
          Math.PI / 3,
          Math.PI / 5,
          0,
        ]}
        speed={-0.17}
        opacity={0.7}
        isMobile={isMobile}
      />

      {/* INNER ORBIT */}

      <OrbitalRing
        radius={0.95}
        tube={0.022}
        rotation={[
          Math.PI / 2,
          0,
          Math.PI / 5,
        ]}
        speed={0.22}
        opacity={0.9}
        isMobile={isMobile}
      />

      {/* ORBIT DOTS */}

      <OrbitDots
        radius={1.65}
        speed={0.2}
        color="#F0D778"
        count={3}
      />

      <OrbitDots
        radius={1.35}
        speed={-0.27}
        color="#D4AF37"
        count={2}
      />

      <OrbitDots
        radius={0.95}
        speed={0.32}
        color="#FFFFFF"
        count={1}
      />

      {/* SMALL SATELLITE */}

      <mesh
        position={[
          1.95,
          0.45,
          0.15,
        ]}
      >
        <sphereGeometry
          args={[
            0.09,
            16,
            16,
          ]}
        />

        <meshStandardMaterial
          color="#F0D778"
          emissive="#D4AF37"
          emissiveIntensity={1}
          metalness={0.9}
          roughness={0.2}
        />
      </mesh>

      {/* SECOND SATELLITE */}

      <mesh
        position={[
          -1.65,
          -0.65,
          0.2,
        ]}
      >
        <sphereGeometry
          args={[
            0.065,
            16,
            16,
          ]}
        />

        <meshStandardMaterial
          color="#FFFFFF"
          emissive="#D4AF37"
          emissiveIntensity={0.8}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
    </group>
  );
}

/* =========================================================
   CAMERA PARALLAX
========================================================= */

function CameraParallax({
  enabled,
}) {
  const { camera } = useThree();

  useFrame((state) => {
    if (!enabled) {
      return;
    }

    const targetX =
      state.pointer.x * 0.15;

    const targetY =
      state.pointer.y * 0.08;

    camera.position.x +=
      (targetX - camera.position.x) *
      0.015;

    camera.position.y +=
      (targetY - camera.position.y) *
      0.015;

    camera.lookAt(
      0,
      0,
      0
    );
  });

  return null;
}

/* =========================================================
   SCENE
========================================================= */

function AboutScene({
  isMobile = false,
  reducedMotion = false,
}) {
  return (
    <Canvas
      camera={{
        position: [
          0,
          0,
          isMobile ? 6.3 : 5.7,
        ],
        fov: isMobile ? 48 : 42,
      }}
      dpr={
        isMobile
          ? [1, 1.25]
          : [1, 1.5]
      }
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
      <ambientLight
        intensity={0.3}
      />

      <directionalLight
        position={[
          4,
          5,
          6,
        ]}
        intensity={1.8}
        color="#FFFFFF"
      />

      <pointLight
        position={[
          2,
          1,
          3,
        ]}
        intensity={10}
        distance={7}
        color="#D4AF37"
      />

      <pointLight
        position={[
          -3,
          -2,
          1,
        ]}
        intensity={5}
        distance={6}
        color="#FFFFFF"
      />

      <ParticleField
        isMobile={isMobile}
        reducedMotion={reducedMotion}
      />

      <FloatingGroup
        speed={0.45}
        rotationIntensity={0.06}
        floatIntensity={0.1}
        enabled={!reducedMotion}
      >
        <AboutCore
          isMobile={isMobile}
          reducedMotion={reducedMotion}
        />
      </FloatingGroup>

      {!reducedMotion &&
        !isMobile && (
          <CameraParallax
            enabled
          />
        )}

      {!reducedMotion &&
        !isMobile && (
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableRotate
            autoRotate
            autoRotateSpeed={0.18}
            minPolarAngle={
              Math.PI * 0.38
            }
            maxPolarAngle={
              Math.PI * 0.62
            }
          />
        )}
    </Canvas>
  );
}

export default AboutScene;