import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

import FloatingGroup from '../components/FloatingGroup.jsx';

function useMotionPreferences() {
  const [preferences, setPreferences] = useState({
    isMobile: false,
    reducedMotion: false,
  });

  useEffect(() => {
    const mobileQuery = window.matchMedia(
      '(max-width: 640px)',
    );

    const reducedMotionQuery = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    );

    const updatePreferences = () => {
      setPreferences({
        isMobile: mobileQuery.matches,
        reducedMotion: reducedMotionQuery.matches,
      });
    };

    updatePreferences();

    mobileQuery.addEventListener(
      'change',
      updatePreferences,
    );

    reducedMotionQuery.addEventListener(
      'change',
      updatePreferences,
    );

    return () => {
      mobileQuery.removeEventListener(
        'change',
        updatePreferences,
      );

      reducedMotionQuery.removeEventListener(
        'change',
        updatePreferences,
      );
    };
  }, []);

  return preferences;
}

function CoreObject({
  isMobile,
  reducedMotion,
}) {
  const groupRef = useRef(null);
  const outerRingRef = useRef(null);
  const innerRingRef = useRef(null);

  const coreDetail = isMobile ? 1 : 2;
  const nodeSegments = isMobile ? 10 : 16;

  const nodePositions = useMemo(
    () => [
      [2.25, 0.2, 0],
      [-2.1, 0.5, 0.3],
      [0.2, 2.1, 0],
      [-0.3, -2.0, 0.2],
      [0.2, 0.1, 2.1],
    ],
    [],
  );

  useFrame((state, delta) => {
    if (
      reducedMotion ||
      !groupRef.current
    ) {
      return;
    }

    const targetRotationY =
      state.pointer.x * 0.25;

    const targetRotationX =
      state.pointer.y * 0.15;

    groupRef.current.rotation.y =
      THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetRotationY,
        0.04,
      );

    groupRef.current.rotation.x =
      THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        targetRotationX,
        0.04,
      );

    if (outerRingRef.current) {
      outerRingRef.current.rotation.z +=
        delta * 0.15;
    }

    if (innerRingRef.current) {
      innerRingRef.current.rotation.z -=
        delta * 0.22;
    }
  });

  return (
    <group
      ref={groupRef}
      scale={isMobile ? 1.05 : 1.25}
    >
      {/* Central technology core */}
      <mesh>
        <icosahedronGeometry
          args={[
            1.35,
            coreDetail,
          ]}
        />

        <meshStandardMaterial
          color="#d4af37"
          metalness={0.85}
          roughness={0.2}
          wireframe
        />
      </mesh>

      {/* Inner core */}
      <mesh>
        <icosahedronGeometry
          args={[
            0.82,
            coreDetail,
          ]}
        />

        <meshStandardMaterial
          color="#ffffff"
          metalness={0.7}
          roughness={0.25}
          transparent
          opacity={0.12}
        />
      </mesh>

      {/* Outer orbit */}
      <mesh
        ref={outerRingRef}
        rotation={[
          Math.PI / 2.5,
          0,
          0,
        ]}
      >
        <torusGeometry
          args={[
            isMobile ? 1.85 : 2.1,
            0.025,
            12,
            isMobile ? 64 : 96,
          ]}
        />

        <meshStandardMaterial
          color="#d4af37"
          metalness={0.9}
          roughness={0.2}
        />
      </mesh>

      {/* Inner orbit */}
      <mesh
        ref={innerRingRef}
        rotation={[
          Math.PI / 3,
          0.4,
          0,
        ]}
      >
        <torusGeometry
          args={[
            isMobile ? 1.5 : 1.7,
            0.018,
            12,
            isMobile ? 64 : 96,
          ]}
        />

        <meshStandardMaterial
          color="#ffffff"
          metalness={0.8}
          roughness={0.25}
          transparent
          opacity={0.55}
        />
      </mesh>

      {/* Technology nodes */}
      {nodePositions.map(
        (position, index) => {
          const nodePosition = isMobile
            ? position.map(
                (value) => value * 0.86,
              )
            : position;

          return (
            <mesh
              key={index}
              position={nodePosition}
            >
              <sphereGeometry
                args={[
                  isMobile
                    ? 0.065
                    : 0.075,
                  nodeSegments,
                  nodeSegments,
                ]}
              />

              <meshStandardMaterial
                color="#d4af37"
                emissive="#d4af37"
                emissiveIntensity={1.5}
              />
            </mesh>
          );
        },
      )}
    </group>
  );
}

function HeroScene() {
  const {
    isMobile,
    reducedMotion,
  } = useMotionPreferences();

  return (
    <div
      className="heroScene"
      aria-hidden="true"
    >
      <Canvas
        camera={{
          position: [
            0,
            0,
            isMobile ? 5.2 : 5.5,
          ],
          fov: isMobile ? 44 : 42,
        }}
        dpr={
          isMobile
            ? [1, 1.25]
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
        <ambientLight
          intensity={
            isMobile ? 0.3 : 0.35
          }
        />

        <directionalLight
          position={[4, 4, 5]}
          intensity={
            isMobile ? 1.5 : 2
          }
          color="#ffffff"
        />

        <pointLight
          position={[-4, -2, 3]}
          intensity={
            isMobile ? 8 : 12
          }
          distance={10}
          color="#d4af37"
        />

        {reducedMotion ? (
          <CoreObject
            isMobile={isMobile}
            reducedMotion
          />
        ) : (
          <FloatingGroup
            speed={isMobile ? 0.8 : 1.2}
            rotationIntensity={isMobile ? 0.08 : 0.15}
            floatIntensity={isMobile ? 0.2 : 0.4}
          >
            <CoreObject
              isMobile={isMobile}
              reducedMotion={false}
            />
          </FloatingGroup>
        )}
      </Canvas>
    </div>
  );
}

export default HeroScene;