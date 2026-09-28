import { useRef } from 'react';
import {
  Canvas,
  useFrame,
  useThree,
} from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

import FloatingGroup from '../components/FloatingGroup.jsx';

function AboutCore({ isMobile, reducedMotion }) {
  const groupRef = useRef(null);
  const outerRingRef = useRef(null);
  const middleRingRef = useRef(null);
  const innerRingRef = useRef(null);
  const coreRef = useRef(null);

  const { viewport } = useThree();

  useFrame((state, delta) => {
    if (reducedMotion) {
      return;
    }

    const elapsed = state.clock.getElapsedTime();

    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.08;
      groupRef.current.rotation.x =
        Math.sin(elapsed * 0.35) * 0.04;
    }

    if (outerRingRef.current) {
      outerRingRef.current.rotation.z += delta * 0.12;
    }

    if (middleRingRef.current) {
      middleRingRef.current.rotation.z -= delta * 0.16;
    }

    if (innerRingRef.current) {
      innerRingRef.current.rotation.x += delta * 0.2;
      innerRingRef.current.rotation.y += delta * 0.12;
    }

    if (coreRef.current) {
      const targetScale =
        1 +
        Math.sin(elapsed * 1.4) * 0.025;

      coreRef.current.scale.lerp(
        new THREE.Vector3(
          targetScale,
          targetScale,
          targetScale,
        ),
        0.08,
      );
    }

    if (groupRef.current) {
      const targetY = isMobile
        ? 0
        : Math.sin(elapsed * 0.5) * 0.08;

      groupRef.current.position.y +=
        (targetY - groupRef.current.position.y) *
        0.03;
    }
  });

  const scale = isMobile ? 0.72 : 1;

  return (
    <group
      ref={groupRef}
      scale={scale}
      position={[
        0,
        0,
        viewport.width < 5 ? 0 : -0.2,
      ]}
    >
      {/* ===================================================
          OUTER TORUS
      =================================================== */}

      <mesh
        ref={outerRingRef}
        rotation={[
          Math.PI / 2.7,
          0,
          0,
        ]}
      >
        <torusGeometry
          args={[
            1.75,
            0.012,
            12,
            isMobile ? 64 : 96,
          ]}
        />

        <meshStandardMaterial
          color="#D4AF37"
          metalness={0.9}
          roughness={0.28}
          transparent
          opacity={0.55}
        />
      </mesh>

      {/* ===================================================
          SECOND ORBIT
      =================================================== */}

      <mesh
        ref={middleRingRef}
        rotation={[
          Math.PI / 3,
          Math.PI / 5,
          0,
        ]}
      >
        <torusGeometry
          args={[
            1.35,
            0.018,
            12,
            isMobile ? 56 : 80,
          ]}
        />

        <meshStandardMaterial
          color="#D4AF37"
          metalness={0.95}
          roughness={0.22}
          transparent
          opacity={0.75}
        />
      </mesh>

      {/* ===================================================
          INNER ORBIT
      =================================================== */}

      <mesh
        ref={innerRingRef}
        rotation={[
          Math.PI / 2,
          0,
          Math.PI / 5,
        ]}
      >
        <torusGeometry
          args={[
            0.95,
            0.025,
            12,
            isMobile ? 48 : 72,
          ]}
        />

        <meshStandardMaterial
          color="#F0D778"
          metalness={0.95}
          roughness={0.18}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* ===================================================
          CENTRAL CORE
      =================================================== */}

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
          roughness={0.2}
          emissive="#6D5514"
          emissiveIntensity={0.22}
        />
      </mesh>

      {/* ===================================================
          INNER CORE
      =================================================== */}

      <mesh scale={0.62}>
        <sphereGeometry
          args={[
            0.68,
            isMobile ? 20 : 32,
            isMobile ? 20 : 32,
          ]}
        />

        <meshStandardMaterial
          color="#050505"
          metalness={0.8}
          roughness={0.3}
        />
      </mesh>

      {/* ===================================================
          FLOATING PARTICLES
      =================================================== */}
    </group>
  );
}

function AboutScene({
  isMobile = false,
  reducedMotion = false,
}) {

  return (
    <Canvas
      camera={{
        position: [0, 0, 5.8],
        fov: isMobile ? 48 : 42,
      }}
      dpr={
        isMobile
          ? [1, 1.35]
          : [1, 1.35]
      }
      gl={{
        antialias: !isMobile,
        alpha: true,
        powerPreference: 'high-performance',
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
      <ambientLight intensity={0.35} />

      <directionalLight
        position={[3, 4, 5]}
        intensity={2}
        color="#FFFFFF"
      />

      <pointLight
        position={[2, 1, 2]}
        intensity={12}
        distance={7}
        color="#D4AF37"
      />

      <pointLight
        position={[-3, -2, 1]}
        intensity={7}
        distance={6}
        color="#FFFFFF"
      />

      <FloatingGroup
        speed={0.5}
        rotationIntensity={0.08}
        floatIntensity={0.12}
        enabled={!reducedMotion}
      >
        <AboutCore
          isMobile={isMobile}
          reducedMotion={reducedMotion}
        />
      </FloatingGroup>

      {!reducedMotion && !isMobile && (
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate
          autoRotate
          autoRotateSpeed={0.25}
          minPolarAngle={Math.PI * 0.38}
          maxPolarAngle={Math.PI * 0.62}
        />
      )}
    </Canvas>
  );
}

export default AboutScene;