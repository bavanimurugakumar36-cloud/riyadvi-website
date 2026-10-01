import {
  useEffect,
  useMemo,
  useRef,
} from 'react';

import { useFrame } from '@react-three/fiber';

import { RoundedBox } from '@react-three/drei';

import * as THREE from 'three';

import gsap from 'gsap';

import FloatingGroup from './FloatingGroup.jsx';


/* =========================================================
   SERVICE COLORS
========================================================= */

const SERVICE_COLORS = [
  '#D4AF37', // Web Development
  '#8FB8C9', // App Development
  '#D4AF37', // Digital Marketing
  '#B8A1D9', // AR / VR
  '#D4AF37', // 3D Modeling
  '#E0C878', // UI / UX
];


/* =========================================================
   WEB DEVELOPMENT
   Futuristic laptop / browser
========================================================= */

function WebDevelopmentVisual({
  color,
  isMobile,
  reducedMotion,
}) {
  const groupRef = useRef(null);

  useFrame((state) => {
    if (!groupRef.current || reducedMotion) {
      return;
    }

    groupRef.current.rotation.y =
      Math.sin(state.clock.elapsedTime * 0.4) * 0.08;

    groupRef.current.rotation.x =
      Math.sin(state.clock.elapsedTime * 0.45) * 0.025;
  });

  return (
    <group
      ref={groupRef}
      scale={isMobile ? 0.82 : 0.95}
    >

      {/* =================================================
          LAPTOP SCREEN
      ================================================= */}

      <group position={[0, 0.35, 0]}>

        {/* Outer screen frame */}
        <RoundedBox
          args={[3.4, 2.15, 0.18]}
          radius={0.13}
          smoothness={6}
        >
          <meshStandardMaterial
            color="#B8B8B5"
            metalness={0.55}
            roughness={0.25}
          />
        </RoundedBox>

        {/* Dark bezel */}
        <RoundedBox
          args={[3.08, 1.83, 0.075]}
          radius={0.08}
          smoothness={5}
          position={[0, 0, 0.12]}
        >
          <meshStandardMaterial
            color="#252525"
            metalness={0.35}
            roughness={0.3}
          />
        </RoundedBox>

        {/* Actual screen */}
        <RoundedBox
          args={[2.82, 1.58, 0.045]}
          radius={0.055}
          smoothness={4}
          position={[0, -0.02, 0.17]}
        >
          <meshStandardMaterial
            color="#101010"
            metalness={0.05}
            roughness={0.32}
          />
        </RoundedBox>

        {/* Browser header */}
        <mesh position={[0, 0.62, 0.2]}>
          <boxGeometry args={[2.55, 0.055, 0.025]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.45}
          />
        </mesh>

        {/* Browser dots */}
        {[-1.17, -0.97, -0.77].map(
          (x, index) => (
            <mesh
              key={index}
              position={[x, 0.69, 0.21]}
            >
              <sphereGeometry
                args={[0.045, 16, 16]}
              />

              <meshStandardMaterial
                color={
                  index === 0
                    ? '#D4AF37'
                    : '#6B6B6B'
                }
                emissive={
                  index === 0
                    ? '#D4AF37'
                    : '#000000'
                }
                emissiveIntensity={
                  index === 0 ? 0.4 : 0
                }
              />
            </mesh>
          ),
        )}

        {/* Code window */}
        <RoundedBox
          args={[1.08, 0.92, 0.035]}
          radius={0.05}
          smoothness={4}
          position={[-0.76, -0.05, 0.2]}
        >
          <meshStandardMaterial
            color="#181818"
            metalness={0.15}
            roughness={0.45}
          />
        </RoundedBox>

        {/* Code accent */}
        <mesh position={[-0.76, 0.02, 0.225]}>
          <boxGeometry
            args={[0.42, 0.06, 0.025]}
          />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.5}
          />
        </mesh>

        <mesh position={[-0.76, -0.16, 0.225]}>
          <boxGeometry
            args={[0.65, 0.035, 0.025]}
          />
          <meshStandardMaterial color="#777777" />
        </mesh>

        <mesh position={[-0.76, -0.29, 0.225]}>
          <boxGeometry
            args={[0.48, 0.035, 0.025]}
          />
          <meshStandardMaterial color="#555555" />
        </mesh>

        {/* Website preview */}
        <RoundedBox
          args={[1.15, 0.98, 0.035]}
          radius={0.05}
          smoothness={4}
          position={[0.72, -0.03, 0.2]}
        >
          <meshStandardMaterial
            color="#262626"
            metalness={0.1}
            roughness={0.4}
          />
        </RoundedBox>

        {/* Website image */}
        <mesh position={[0.72, 0.23, 0.225]}>
          <boxGeometry
            args={[0.78, 0.3, 0.025]}
          />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.28}
          />
        </mesh>

        {/* Website text */}
        <mesh position={[0.72, -0.08, 0.225]}>
          <boxGeometry
            args={[0.72, 0.045, 0.025]}
          />
          <meshStandardMaterial color="#A0A0A0" />
        </mesh>

        <mesh position={[0.58, -0.22, 0.225]}>
          <boxGeometry
            args={[0.42, 0.035, 0.025]}
          />
          <meshStandardMaterial color="#666666" />
        </mesh>

        {/* Camera */}
        <mesh position={[0, 0.88, 0.21]}>
          <sphereGeometry
            args={[0.035, 16, 16]}
          />
          <meshStandardMaterial
            color="#111111"
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      </group>


      {/* =================================================
          LAPTOP BASE
      ================================================= */}

      <group position={[0, -0.85, 0]}>

        {/* Main base */}
        <mesh rotation={[-0.05, 0, 0]}>
          <boxGeometry
            args={[3.9, 0.16, 2.25]}
          />
          <meshStandardMaterial
            color="#9E9E9B"
            metalness={0.65}
            roughness={0.25}
          />
        </mesh>

        {/* Keyboard surface */}
        <RoundedBox
          args={[2.8, 0.035, 1.15]}
          radius={0.035}
          smoothness={3}
          position={[0, 0.105, -0.05]}
        >
          <meshStandardMaterial
            color="#181818"
            metalness={0.25}
            roughness={0.4}
          />
        </RoundedBox>

        {/* Keyboard rows */}
        {[0.28, 0.05, -0.18].map(
          (y, rowIndex) => (
            <mesh
              key={rowIndex}
              position={[0, 0.13, y]}
            >
              <boxGeometry
                args={[
                  rowIndex === 2
                    ? 2.15
                    : 2.35,
                  0.025,
                  0.12,
                ]}
              />
              <meshStandardMaterial
                color={
                  rowIndex === 0
                    ? color
                    : '#555555'
                }
                emissive={
                  rowIndex === 0
                    ? color
                    : '#000000'
                }
                emissiveIntensity={
                  rowIndex === 0 ? 0.12 : 0
                }
              />
            </mesh>
          ),
        )}

        {/* Trackpad */}
        <RoundedBox
          args={[0.75, 0.025, 0.5]}
          radius={0.035}
          smoothness={3}
          position={[0, 0.14, 0.62]}
        >
          <meshStandardMaterial
            color="#555555"
            metalness={0.5}
            roughness={0.25}
          />
        </RoundedBox>
      </group>


      {/* =================================================
          FLOATING CODE CARD
      ================================================= */}

      <group
        position={[-2.05, 0.65, 0]}
        rotation={[0, 0.18, -0.08]}
      >
        <RoundedBox
          args={[0.72, 0.72, 0.08]}
          radius={0.09}
          smoothness={5}
        >
          <meshStandardMaterial
            color="#202020"
            metalness={0.45}
            roughness={0.3}
          />
        </RoundedBox>

        <mesh position={[0, 0, 0.08]}>
          <boxGeometry
            args={[0.38, 0.06, 0.025]}
          />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.45}
          />
        </mesh>
      </group>


      {/* =================================================
          FLOATING CLOUD CARD
      ================================================= */}

      <group
        position={[2.0, 0.85, 0]}
        rotation={[0, -0.18, 0.08]}
      >
        <RoundedBox
          args={[0.72, 0.72, 0.08]}
          radius={0.09}
          smoothness={5}
        >
          <meshStandardMaterial
            color="#202020"
            metalness={0.45}
            roughness={0.3}
          />
        </RoundedBox>

        <mesh position={[-0.08, 0, 0.08]}>
          <sphereGeometry
            args={[0.11, 18, 18]}
          />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.4}
          />
        </mesh>

        <mesh position={[0.08, 0, 0.08]}>
          <sphereGeometry
            args={[0.14, 18, 18]}
          />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.4}
          />
        </mesh>
      </group>


      {/* =================================================
          FLOATING SERVER CARD
      ================================================= */}

      <group
        position={[2.05, -0.55, 0]}
        rotation={[0, -0.2, 0.06]}
      >
        <RoundedBox
          args={[0.72, 0.72, 0.08]}
          radius={0.09}
          smoothness={5}
        >
          <meshStandardMaterial
            color="#202020"
            metalness={0.45}
            roughness={0.3}
          />
        </RoundedBox>

        {[0.14, 0, -0.14].map(
          (y, index) => (
            <mesh
              key={index}
              position={[0, y, 0.08]}
            >
              <boxGeometry
                args={[0.38, 0.045, 0.025]}
              />
              <meshStandardMaterial
                color={
                  index === 0
                    ? color
                    : '#777777'
                }
                emissive={
                  index === 0
                    ? color
                    : '#000000'
                }
                emissiveIntensity={
                  index === 0 ? 0.3 : 0
                }
              />
            </mesh>
          ),
        )}
      </group>

    </group>
  );
}


/* =========================================================
   APP DEVELOPMENT
   Premium smartphone
========================================================= */

function AppDevelopmentVisual({
  color,
  isMobile,
  reducedMotion,
}) {
  const groupRef = useRef(null);

  useFrame((state) => {
    if (!groupRef.current || reducedMotion) {
      return;
    }

    groupRef.current.rotation.y =
      Math.sin(
        state.clock.elapsedTime * 0.45,
      ) * 0.1;

    groupRef.current.rotation.z =
      Math.sin(
        state.clock.elapsedTime * 0.35,
      ) * 0.025;
  });

  return (
    <group
      ref={groupRef}
      scale={isMobile ? 0.9 : 1}
    >
      <RoundedBox
        args={[1.55, 3.15, 0.22]}
        radius={0.2}
        smoothness={7}
      >
        <meshStandardMaterial
          color="#151515"
          metalness={0.85}
          roughness={0.2}
        />
      </RoundedBox>

      <RoundedBox
        args={[1.3, 2.78, 0.06]}
        radius={0.13}
        smoothness={5}
        position={[0, -0.03, 0.15]}
      >
        <meshStandardMaterial
          color="#080808"
          roughness={0.28}
        />
      </RoundedBox>

      <RoundedBox
        args={[0.95, 0.55, 0.035]}
        radius={0.05}
        smoothness={3}
        position={[0, 0.55, 0.2]}
      >
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.2}
        />
      </RoundedBox>

      {[
        [-0.32, -0.1],
        [0.32, -0.1],
        [-0.32, -0.62],
        [0.32, -0.62],
      ].map(([x, y], index) => (
        <RoundedBox
          key={index}
          args={[0.43, 0.36, 0.035]}
          radius={0.05}
          smoothness={3}
          position={[x, y, 0.2]}
        >
          <meshStandardMaterial
            color={
              index === 0
                ? color
                : '#242424'
            }
          />
        </RoundedBox>
      ))}

      <mesh position={[0, 1.25, 0.2]}>
        <sphereGeometry
          args={[0.055, 16, 16]}
        />
        <meshStandardMaterial
          color="#777777"
        />
      </mesh>

      <mesh position={[0, -1.22, 0.2]}>
        <boxGeometry
          args={[0.45, 0.035, 0.025]}
        />
        <meshStandardMaterial
          color="#777777"
        />
      </mesh>

      {[
        [-1.25, 0.8, 0],
        [1.25, 0.45, 0],
        [1.35, -0.85, 0],
      ].map(([x, y, z], index) => (
        <mesh
          key={index}
          position={[x, y, z]}
        >
          <sphereGeometry
            args={[0.16, 20, 20]}
          />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.25}
          />
        </mesh>
      ))}
    </group>
  );
}


/* =========================================================
   DIGITAL MARKETING
========================================================= */

function MarketingVisual({
  color,
  isMobile,
  reducedMotion,
}) {
  const groupRef = useRef(null);

  const bars = useMemo(
    () => [0.65, 1.0, 1.4, 1.85],
    [],
  );

  useFrame((state) => {
    if (!groupRef.current || reducedMotion) {
      return;
    }

    groupRef.current.rotation.y =
      Math.sin(
        state.clock.elapsedTime * 0.35,
      ) * 0.06;
  });

  return (
    <group
      ref={groupRef}
      scale={isMobile ? 0.85 : 1}
    >
      <mesh position={[0, -1.05, 0]}>
        <cylinderGeometry
          args={[2.15, 2.15, 0.12, 64]}
        />
        <meshStandardMaterial
          color="#151515"
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {bars.map((height, index) => (
        <mesh
          key={index}
          position={[
            -1.15 + index * 0.75,
            -1.0 + height / 2,
            0,
          ]}
          scale={[1, height, 1]}
        >
          <boxGeometry
            args={[0.42, 1, 0.42]}
          />
          <meshStandardMaterial
            color={
              index === bars.length - 1
                ? color
                : '#555555'
            }
            metalness={0.55}
            roughness={0.3}
            emissive={
              index === bars.length - 1
                ? color
                : '#000000'
            }
            emissiveIntensity={
              index === bars.length - 1
                ? 0.2
                : 0
            }
          />
        </mesh>
      ))}

      <mesh
        position={[0.45, 0.85, 0.3]}
        rotation={[0, 0, -0.38]}
      >
        <boxGeometry
          args={[2.1, 0.055, 0.055]}
        />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.3}
        />
      </mesh>

      <mesh
        position={[1.35, 1.25, 0.3]}
        rotation={[0, 0, -0.65]}
      >
        <coneGeometry
          args={[0.16, 0.4, 4]}
        />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.25}
        />
      </mesh>

      <FloatingTechCard
        position={[-1.9, 0.75, 0]}
        rotation={[0, 0.2, -0.1]}
        color={color}
        icon="server"
      />

      <FloatingTechCard
        position={[1.85, 0.65, 0]}
        rotation={[0, -0.2, 0.08]}
        color={color}
        icon="code"
      />
    </group>
  );
}


/* =========================================================
   AR / VR
========================================================= */

function ArVrVisual({
  color,
  isMobile,
  reducedMotion,
}) {
  const groupRef = useRef(null);

  useFrame((state) => {
    if (!groupRef.current || reducedMotion) {
      return;
    }

    groupRef.current.rotation.y =
      Math.sin(
        state.clock.elapsedTime * 0.4,
      ) * 0.12;
  });

  return (
    <group
      ref={groupRef}
      scale={isMobile ? 0.85 : 1}
    >
      <RoundedBox
        args={[3.0, 1.25, 1.0]}
        radius={0.28}
        smoothness={7}
      >
        <meshStandardMaterial
          color="#151515"
          metalness={0.8}
          roughness={0.2}
        />
      </RoundedBox>

      <mesh position={[-0.72, 0, 0.55]}>
        <cylinderGeometry
          args={[0.42, 0.42, 0.1, 32]}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <meshStandardMaterial
          color="#080808"
          metalness={0.9}
          roughness={0.1}
          emissive={color}
          emissiveIntensity={0.12}
        />
      </mesh>

      <mesh position={[0.72, 0, 0.55]}>
        <cylinderGeometry
          args={[0.42, 0.42, 0.1, 32]}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <meshStandardMaterial
          color="#080808"
          metalness={0.9}
          roughness={0.1}
          emissive={color}
          emissiveIntensity={0.12}
        />
      </mesh>

      <mesh position={[0, 0, 0.55]}>
        <boxGeometry
          args={[0.32, 0.14, 0.12]}
        />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.25}
        />
      </mesh>

      <mesh
        position={[0, 0.1, -0.65]}
        rotation={[0.2, 0, 0]}
      >
        <torusGeometry
          args={[1.45, 0.06, 12, 64, Math.PI]}
        />
        <meshStandardMaterial
          color="#555555"
          metalness={0.65}
          roughness={0.25}
        />
      </mesh>

      <mesh position={[0, 0, 1.15]}>
        <torusGeometry
          args={[2.05, 0.025, 10, 64]}
        />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.2}
        />
      </mesh>
    </group>
  );
}


/* =========================================================
   3D MODELING
========================================================= */

function ModelingVisual({
  color,
  isMobile,
  reducedMotion,
}) {
  const groupRef = useRef(null);

  useFrame((state, delta) => {
    if (!groupRef.current || reducedMotion) {
      return;
    }

    groupRef.current.rotation.y +=
      delta * 0.25;

    groupRef.current.rotation.x =
      Math.sin(
        state.clock.elapsedTime * 0.35,
      ) * 0.08;
  });

  return (
    <group
      ref={groupRef}
      scale={isMobile ? 0.85 : 1}
    >
      <mesh>
        <icosahedronGeometry
          args={[1.45, 2]}
        />
        <meshStandardMaterial
          color={color}
          wireframe
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      <mesh scale={0.68}>
        <icosahedronGeometry
          args={[1.45, 1]}
        />
        <meshStandardMaterial
          color="#171717"
          metalness={0.8}
          roughness={0.22}
          transparent
          opacity={0.9}
        />
      </mesh>

      <mesh
        rotation={[
          Math.PI / 2.4,
          0.3,
          0,
        ]}
      >
        <torusGeometry
          args={[1.85, 0.025, 10, 80]}
        />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.2}
        />
      </mesh>

      <mesh
        rotation={[
          0.4,
          Math.PI / 2.5,
          0,
        ]}
      >
        <torusGeometry
          args={[1.65, 0.018, 10, 70]}
        />
        <meshStandardMaterial
          color="#FFFFFF"
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      <mesh>
        <sphereGeometry
          args={[0.12, 20, 20]}
        />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.45}
        />
      </mesh>
    </group>
  );
}


/* =========================================================
   UI / UX
========================================================= */

function UiUxVisual({
  color,
  isMobile,
  reducedMotion,
}) {
  const groupRef = useRef(null);

  useFrame((state) => {
    if (!groupRef.current || reducedMotion) {
      return;
    }

    groupRef.current.rotation.y =
      Math.sin(
        state.clock.elapsedTime * 0.4,
      ) * 0.08;
  });

  const panels = [
    {
      position: [-1.05, 0.15, 0],
      rotation: [0, 0.12, -0.06],
      scale: 0.82,
    },
    {
      position: [0, 0, 0.5],
      rotation: [0, 0, 0],
      scale: 1,
    },
    {
      position: [1.05, 0.18, 0],
      rotation: [0, -0.12, 0.06],
      scale: 0.82,
    },
  ];

  return (
    <group
      ref={groupRef}
      scale={isMobile ? 0.82 : 1}
    >
      {panels.map((panel, index) => (
        <group
          key={index}
          position={panel.position}
          rotation={panel.rotation}
          scale={panel.scale}
        >
          <RoundedBox
            args={[1.55, 2.15, 0.1]}
            radius={0.12}
            smoothness={5}
          >
            <meshStandardMaterial
              color={
                index === 1
                  ? '#E8E3D8'
                  : '#171717'
              }
              metalness={0.35}
              roughness={0.32}
            />
          </RoundedBox>

          <mesh
            position={[0, 0.72, 0.08]}
          >
            <boxGeometry
              args={[1.05, 0.08, 0.025]}
            />
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={0.2}
            />
          </mesh>

          <mesh
            position={[0, 0.25, 0.08]}
          >
            <boxGeometry
              args={[0.9, 0.35, 0.025]}
            />
            <meshStandardMaterial
              color={
                index === 1
                  ? '#292929'
                  : '#333333'
              }
            />
          </mesh>

          <mesh
            position={[0, -0.18, 0.08]}
          >
            <boxGeometry
              args={[0.78, 0.06, 0.025]}
            />
            <meshStandardMaterial
              color={
                index === 1
                  ? '#555555'
                  : '#777777'
              }
            />
          </mesh>

          <RoundedBox
            args={[0.58, 0.25, 0.035]}
            radius={0.04}
            smoothness={3}
            position={[0, -0.65, 0.09]}
          >
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={0.15}
            />
          </RoundedBox>
        </group>
      ))}
    </group>
  );
}


/* =========================================================
   FLOATING TECHNOLOGY CARD
========================================================= */

function FloatingTechCard({
  position,
  rotation,
  color,
  icon,
}) {
  return (
    <group
      position={position}
      rotation={rotation}
    >
      <RoundedBox
        args={[0.65, 0.65, 0.08]}
        radius={0.08}
        smoothness={4}
      >
        <meshStandardMaterial
          color="#151515"
          metalness={0.6}
          roughness={0.25}
        />
      </RoundedBox>

      {icon === 'code' && (
        <mesh position={[0, 0, 0.08]}>
          <boxGeometry
            args={[0.3, 0.07, 0.03]}
          />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.35}
          />
        </mesh>
      )}

      {icon === 'server' && (
        <>
          {[0.12, 0, -0.12].map(
            (y, index) => (
              <mesh
                key={index}
                position={[0, y, 0.08]}
              >
                <boxGeometry
                  args={[0.34, 0.055, 0.03]}
                />
                <meshStandardMaterial
                  color={color}
                  emissive={color}
                  emissiveIntensity={
                    index === 0 ? 0.25 : 0
                  }
                />
              </mesh>
            ),
          )}
        </>
      )}

      {icon === 'cloud' && (
        <>
          <mesh
            position={[-0.08, 0, 0.08]}
          >
            <sphereGeometry
              args={[0.12, 16, 16]}
            />
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={0.25}
            />
          </mesh>

          <mesh
            position={[0.08, 0, 0.08]}
          >
            <sphereGeometry
              args={[0.15, 16, 16]}
            />
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={0.25}
            />
          </mesh>
        </>
      )}
    </group>
  );
}


/* =========================================================
   SERVICE VISUAL SWITCHER
========================================================= */

function ServiceVisual({
  activeService,
  color,
  isMobile,
  reducedMotion,
}) {
  switch (activeService) {
    case 0:
      return (
        <WebDevelopmentVisual
          color={color}
          isMobile={isMobile}
          reducedMotion={reducedMotion}
        />
      );

    case 1:
      return (
        <AppDevelopmentVisual
          color={color}
          isMobile={isMobile}
          reducedMotion={reducedMotion}
        />
      );

    case 2:
      return (
        <MarketingVisual
          color={color}
          isMobile={isMobile}
          reducedMotion={reducedMotion}
        />
      );

    case 3:
      return (
        <ArVrVisual
          color={color}
          isMobile={isMobile}
          reducedMotion={reducedMotion}
        />
      );

    case 4:
      return (
        <ModelingVisual
          color={color}
          isMobile={isMobile}
          reducedMotion={reducedMotion}
        />
      );

    case 5:
      return (
        <UiUxVisual
          color={color}
          isMobile={isMobile}
          reducedMotion={reducedMotion}
        />
      );

    default:
      return null;
  }
}


/* =========================================================
   MAIN SERVICE 3D OBJECT
========================================================= */

function Service3DObject({
  activeService = 0,
  isMobile = false,
  reducedMotion = false,
}) {
  const groupRef = useRef(null);
  const visualRef = useRef(null);

  const previousService = useRef(
    activeService,
  );

  const color = useMemo(
    () =>
      new THREE.Color(
        SERVICE_COLORS[
          activeService
        ] || SERVICE_COLORS[0],
      ),
    [activeService],
  );


  /* =======================================================
     SERVICE CHANGE ANIMATION
  ======================================================= */

  useEffect(() => {
    if (!groupRef.current) {
      return undefined;
    }

    const direction =
      activeService >
      previousService.current
        ? 1
        : -1;

    previousService.current =
      activeService;

    if (reducedMotion) {
      groupRef.current.scale.set(
        1,
        1,
        1,
      );

      groupRef.current.rotation.set(
        0,
        0,
        0,
      );

      return undefined;
    }

    const timeline =
      gsap.timeline();

    timeline
      .to(
        groupRef.current.scale,
        {
          x: 0.72,
          y: 0.72,
          z: 0.72,
          duration: 0.18,
          ease: 'power2.in',
        },
      )
      .to(
        groupRef.current.rotation,
        {
          y:
            groupRef.current.rotation.y +
            direction *
              Math.PI *
              0.35,
          duration: 0.45,
          ease: 'power2.inOut',
        },
        '<',
      )
      .to(
        groupRef.current.scale,
        {
          x: 1,
          y: 1,
          z: 1,
          duration: 0.42,
          ease: 'back.out(1.7)',
        },
      );

    return () => {
      timeline.kill();
    };
  }, [
    activeService,
    reducedMotion,
  ]);


  /* =======================================================
     MAIN GROUP MOTION
  ======================================================= */

  useFrame((state) => {
    if (
      !groupRef.current ||
      reducedMotion
    ) {
      return;
    }

    const targetY =
      Math.sin(
        state.clock.elapsedTime * 0.55,
      ) * 0.035;

    groupRef.current.position.y =
      THREE.MathUtils.lerp(
        groupRef.current.position.y,
        targetY,
        0.035,
      );

    if (visualRef.current) {
      visualRef.current.rotation.y =
        THREE.MathUtils.lerp(
          visualRef.current.rotation.y,
          0,
          0.03,
        );
    }
  });


  /* =======================================================
     FLOATING GROUP
  ======================================================= */

  const floatSpeed = isMobile
    ? 0.7
    : 1;

  const rotationIntensity =
    reducedMotion
      ? 0
      : isMobile
        ? 0.04
        : 0.08;

  const floatIntensity =
    reducedMotion
      ? 0
      : isMobile
        ? 0.12
        : 0.22;


  return (
    <FloatingGroup
      speed={floatSpeed}
      rotationIntensity={rotationIntensity}
      floatIntensity={floatIntensity}
    >
      <group ref={groupRef}>
        <group ref={visualRef}>
          <ServiceVisual
            activeService={activeService}
            color={color}
            isMobile={isMobile}
            reducedMotion={reducedMotion}
          />
        </group>
      </group>
    </FloatingGroup>
  );
}


export default Service3DObject;