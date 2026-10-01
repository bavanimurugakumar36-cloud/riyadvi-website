import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import {
  Canvas,
  useFrame,
} from '@react-three/fiber';

import * as THREE from 'three';

/* =========================================================
   MOTION PREFERENCES
========================================================= */

function useMotionPreferences() {
  const [preferences, setPreferences] = useState({
    isMobile: false,
    reducedMotion: false,
  });

  useEffect(() => {
    const mobileQuery = window.matchMedia(
      '(max-width: 700px)',
    );

    const reducedMotionQuery =
      window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      );

    const update = () => {
      setPreferences({
        isMobile: mobileQuery.matches,
        reducedMotion:
          reducedMotionQuery.matches,
      });
    };

    update();

    mobileQuery.addEventListener(
      'change',
      update,
    );

    reducedMotionQuery.addEventListener(
      'change',
      update,
    );

    return () => {
      mobileQuery.removeEventListener(
        'change',
        update,
      );

      reducedMotionQuery.removeEventListener(
        'change',
        update,
      );
    };
  }, []);

  return preferences;
}

/* =========================================================
   PARTICLE FIELD
========================================================= */

function ParticleField({
  isMobile,
  reducedMotion,
}) {
  const pointsRef = useRef(null);

  const positions = useMemo(() => {
    const count = isMobile ? 45 : 100;

    const values = new Float32Array(
      count * 3,
    );

    for (
      let index = 0;
      index < count;
      index += 1
    ) {
      const radius =
        2.5 + Math.random() * 2.2;

      const angle =
        Math.random() *
        Math.PI *
        2;

      const vertical =
        (Math.random() - 0.5) * 4;

      values[index * 3] =
        Math.cos(angle) * radius;

      values[index * 3 + 1] =
        vertical;

      values[index * 3 + 2] =
        Math.sin(angle) * radius;
    }

    return values;
  }, [isMobile]);

  useFrame((_, delta) => {
    if (
      reducedMotion ||
      !pointsRef.current
    ) {
      return;
    }

    pointsRef.current.rotation.y +=
      delta * 0.015;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>

      <pointsMaterial
        color="#d4af37"
        size={isMobile ? 0.018 : 0.025}
        transparent
        opacity={isMobile ? 0.25 : 0.34}
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
  color,
  opacity,
  speed,
  isMobile,
  reducedMotion,
}) {
  const ref = useRef(null);

  useFrame((_, delta) => {
    if (
      reducedMotion ||
      !ref.current
    ) {
      return;
    }

    ref.current.rotation.z +=
      delta * speed;
  });

  return (
    <mesh
      ref={ref}
      rotation={rotation}
    >
      <torusGeometry
        args={[
          isMobile
            ? radius * 0.85
            : radius,
          isMobile ? 0.007 : 0.011,
          8,
          isMobile ? 64 : 96,
        ]}
      />

      <meshBasicMaterial
        color={color}
        transparent
        opacity={opacity}
      />
    </mesh>
  );
}

/* =========================================================
   ORBIT DOT
========================================================= */

function OrbitDot({
  position,
  color = '#d4af37',
  size = 0.045,
}) {
  return (
    <mesh position={position}>
      <sphereGeometry
        args={[size, 12, 12]}
      />

      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={3}
        toneMapped={false}
      />
    </mesh>
  );
}

/* =========================================================
   CRYSTAL CORE
========================================================= */

function CrystalCore({
  isMobile,
  reducedMotion,
}) {
  const groupRef = useRef(null);
  const crystalRef = useRef(null);
  const innerRef = useRef(null);
  const glowRef = useRef(null);

  useFrame((state, delta) => {
    if (!groupRef.current) {
      return;
    }

    if (!reducedMotion) {
      const targetY =
        state.pointer.x * 0.25;

      const targetX =
        -state.pointer.y * 0.14;

      groupRef.current.rotation.y =
        THREE.MathUtils.lerp(
          groupRef.current.rotation.y,
          targetY,
          0.035,
        );

      groupRef.current.rotation.x =
        THREE.MathUtils.lerp(
          groupRef.current.rotation.x,
          targetX,
          0.035,
        );

      groupRef.current.position.y =
        0.35 +
        Math.sin(
          state.clock.elapsedTime * 0.5,
        ) *
          0.035;

      if (crystalRef.current) {
        crystalRef.current.rotation.y +=
          delta * 0.045;

        crystalRef.current.rotation.z +=
          delta * 0.014;
      }

      if (innerRef.current) {
        innerRef.current.rotation.y -=
          delta * 0.07;
      }

      if (glowRef.current) {
        const pulse =
          1 +
          Math.sin(
            state.clock.elapsedTime * 1.3,
          ) *
            0.03;

        glowRef.current.scale.setScalar(
          pulse,
        );
      }
    }
  });

  return (
    <group
      ref={groupRef}
      position={[
        0,
        0.35,
        0,
      ]}
    >
      {/* Golden aura */}

      <mesh ref={glowRef}>
        <sphereGeometry
          args={[
            1.65,
            24,
            24,
          ]}
        />

        <meshBasicMaterial
          color="#d4af37"
          transparent
          opacity={0.03}
          depthWrite={false}
        />
      </mesh>

      {/* Main crystal */}

      <mesh ref={crystalRef}>
        <icosahedronGeometry
          args={[
            1.15,
            isMobile ? 1 : 2,
          ]}
        />

        <meshPhysicalMaterial
          color="#d2d2d2"
          metalness={0.68}
          roughness={0.14}
          transmission={
            isMobile ? 0.12 : 0.3
          }
          thickness={0.7}
          ior={1.45}
          transparent
          opacity={0.78}
          clearcoat={1}
          clearcoatRoughness={0.07}
        />
      </mesh>

      {/* Gold edges */}

      <mesh scale={1.012}>
        <icosahedronGeometry
          args={[
            1.15,
            isMobile ? 1 : 2,
          ]}
        />

        <meshBasicMaterial
          color="#d4af37"
          wireframe
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Inner crystal */}

      <mesh
        ref={innerRef}
        scale={0.55}
      >
        <icosahedronGeometry
          args={[
            1.15,
            isMobile ? 1 : 2,
          ]}
        />

        <meshPhysicalMaterial
          color="#d4af37"
          metalness={0.48}
          roughness={0.12}
          transmission={0.2}
          transparent
          opacity={0.58}
          emissive="#715615"
          emissiveIntensity={0.6}
        />
      </mesh>

      {/* Inner wireframe */}

      <mesh scale={0.57}>
        <icosahedronGeometry
          args={[
            1.15,
            isMobile ? 1 : 2,
          ]}
        />

        <meshBasicMaterial
          color="#d4af37"
          wireframe
          transparent
          opacity={0.65}
        />
      </mesh>

      {/* Energy core */}

      <mesh>
        <sphereGeometry
          args={[
            isMobile ? 0.11 : 0.14,
            16,
            16,
          ]}
        />

        <meshStandardMaterial
          color="#fff1a0"
          emissive="#d4af37"
          emissiveIntensity={5}
          toneMapped={false}
        />
      </mesh>

      <pointLight
        color="#d4af37"
        intensity={
          isMobile ? 1.3 : 2
        }
        distance={3.5}
      />
    </group>
  );
}

/* =========================================================
   ORBIT SYSTEM
========================================================= */

function OrbitSystem({
  isMobile,
  reducedMotion,
}) {
  const groupRef = useRef(null);

  useFrame((state, delta) => {
    if (
      reducedMotion ||
      !groupRef.current
    ) {
      return;
    }

    groupRef.current.rotation.y +=
      delta * 0.028;
  });

  return (
    <group
      ref={groupRef}
      scale={
        isMobile ? 0.78 : 0.82
      }
    >
      <OrbitRing
        radius={1.72}
        rotation={[
          Math.PI / 2.3,
          0.1,
          0,
        ]}
        color="#d4af37"
        opacity={0.82}
        speed={0.045}
        isMobile={isMobile}
        reducedMotion={reducedMotion}
      />

      <OrbitRing
        radius={2.05}
        rotation={[
          Math.PI / 2.85,
          -0.4,
          0.18,
        ]}
        color="#ffffff"
        opacity={0.3}
        speed={-0.03}
        isMobile={isMobile}
        reducedMotion={reducedMotion}
      />

      <OrbitRing
        radius={1.4}
        rotation={[
          Math.PI / 2.05,
          0.5,
          0.15,
        ]}
        color="#d4af37"
        opacity={0.34}
        speed={0.02}
        isMobile={isMobile}
        reducedMotion={reducedMotion}
      />

      <OrbitDot
        position={[
          1.72,
          0.5,
          0,
        ]}
        size={
          isMobile ? 0.032 : 0.042
        }
      />

      <OrbitDot
        position={[
          -1.6,
          -0.52,
          0.1,
        ]}
        color="#ffffff"
        size={
          isMobile ? 0.025 : 0.034
        }
      />

      <OrbitDot
        position={[
          0.15,
          1.7,
          0.1,
        ]}
        size={
          isMobile ? 0.028 : 0.038
        }
      />
    </group>
  );
}

/* =========================================================
   FLOATING FRAGMENTS
========================================================= */

function FloatingFragments({
  isMobile,
  reducedMotion,
}) {
  const refs = useRef([]);

  const items = useMemo(
    () => [
      {
        position: [1.45, 1.1, 0],
        scale: 0.1,
      },
      {
        position: [-1.4, 0.85, -0.1],
        scale: 0.075,
      },
      {
        position: [1.55, -0.9, 0.1],
        scale: 0.085,
      },
      {
        position: [-1.3, -1.0, 0],
        scale: 0.065,
      },
    ],
    [],
  );

  useFrame((state) => {
    if (reducedMotion) {
      return;
    }

    refs.current.forEach(
      (item, index) => {
        if (!item) {
          return;
        }

        item.rotation.x =
          state.clock.elapsedTime *
          (0.15 + index * 0.025);

        item.rotation.y =
          state.clock.elapsedTime *
          (0.1 + index * 0.018);
      },
    );
  });

  return (
    <group>
      {items.map(
        (item, index) => (
          <mesh
            key={index}
            ref={(element) => {
              refs.current[index] =
                element;
            }}
            position={
              isMobile
                ? item.position.map(
                    (value) =>
                      value * 0.72,
                  )
                : item.position
            }
            scale={
              item.scale *
              (isMobile ? 0.8 : 1)
            }
          >
            <octahedronGeometry
              args={[1, 0]}
            />

            <meshPhysicalMaterial
              color="#d8d8d8"
              metalness={0.65}
              roughness={0.16}
              transparent
              opacity={0.5}
              clearcoat={1}
            />
          </mesh>
        ),
      )}
    </group>
  );
}

/* =========================================================
   BASE PLATFORM
========================================================= */

function BasePlatform({
  isMobile,
  reducedMotion,
}) {
  const ringRef = useRef(null);

  useFrame((_, delta) => {
    if (
      reducedMotion ||
      !ringRef.current
    ) {
      return;
    }

    ringRef.current.rotation.z +=
      delta * 0.018;
  });

  return (
    <group
      position={[
        0,
        -1.05,
        0,
      ]}
      scale={
        isMobile ? 0.58 : 0.68
      }
    >
      <mesh
        rotation={[
          -Math.PI / 2,
          0,
          0,
        ]}
      >
        <circleGeometry
          args={[
            1.45,
            96,
          ]}
        />

        <meshStandardMaterial
          color="#070707"
          metalness={0.85}
          roughness={0.24}
        />
      </mesh>

      <mesh
        ref={ringRef}
        rotation={[
          -Math.PI / 2,
          0,
          0,
        ]}
      >
        <torusGeometry
          args={[
            1.38,
            0.009,
            8,
            96,
          ]}
        />

        <meshBasicMaterial
          color="#d4af37"
          transparent
          opacity={0.6}
        />
      </mesh>

      <mesh
        rotation={[
          -Math.PI / 2,
          0,
          0,
        ]}
      >
        <torusGeometry
          args={[
            0.92,
            0.005,
            8,
            96,
          ]}
        />

        <meshBasicMaterial
          color="#d4af37"
          transparent
          opacity={0.3}
        />
      </mesh>
    </group>
  );
}

/* =========================================================
   SCENE CONTENT
========================================================= */

function SceneContents({
  isMobile,
  reducedMotion,
}) {
  const cameraTarget = useRef(
    new THREE.Vector3(),
  );

  useFrame((state) => {
    if (reducedMotion) {
      return;
    }

    cameraTarget.current.set(
      state.pointer.x *
        (isMobile ? 0.025 : 0.06),

      state.pointer.y *
        (isMobile ? 0.018 : 0.04),

      isMobile ? 6.6 : 6.75,
    );

    state.camera.position.lerp(
      cameraTarget.current,
      0.025,
    );

    state.camera.lookAt(
      0,
      0.2,
      0,
    );
  });

  return (
    <>
      <ambientLight
        intensity={
          isMobile ? 0.18 : 0.25
        }
      />

      <directionalLight
        position={[
          4,
          5,
          6,
        ]}
        intensity={
          isMobile ? 1.2 : 1.8
        }
        color="#ffffff"
      />

      <pointLight
        position={[
          -3,
          1,
          4,
        ]}
        intensity={
          isMobile ? 2.3 : 3.8
        }
        distance={9}
        color="#d4af37"
      />

      <pointLight
        position={[
          3,
          -1,
          2,
        ]}
        intensity={
          isMobile ? 1 : 2
        }
        distance={8}
        color="#fff0c0"
      />

      <CrystalCore
        isMobile={isMobile}
        reducedMotion={reducedMotion}
      />

      <OrbitSystem
        isMobile={isMobile}
        reducedMotion={reducedMotion}
      />

      <FloatingFragments
        isMobile={isMobile}
        reducedMotion={reducedMotion}
      />

      <ParticleField
        isMobile={isMobile}
        reducedMotion={reducedMotion}
      />

      <BasePlatform
        isMobile={isMobile}
        reducedMotion={reducedMotion}
      />
    </>
  );
}

/* =========================================================
   HERO SCENE
========================================================= */

function HeroScene() {
  const {
    isMobile,
    reducedMotion,
  } = useMotionPreferences();

  return (
    <div
      className="heroScene"
      aria-hidden="true"
      style={{
        width: '100%',
        height: '100%',
        minHeight: '100%',
      }}
    >
      <Canvas
        camera={{
          position: [
            0,
            0,
            isMobile ? 6.6 : 6.75,
          ],

          fov: isMobile ? 44 : 38,

          near: 0.1,

          far: 100,
        }}
        dpr={
          isMobile
            ? [1, 1.1]
            : [1, 1.25]
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
        <SceneContents
          isMobile={isMobile}
          reducedMotion={
            reducedMotion
          }
        />
      </Canvas>
    </div>
  );
}

export default HeroScene;