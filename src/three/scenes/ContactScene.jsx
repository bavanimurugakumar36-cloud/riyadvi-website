import { useMemo, useRef } from 'react';

import { Canvas, useFrame, useThree } from '@react-three/fiber';

import {
  Float,
  Line,
  OrbitControls,
  Sparkles,
} from '@react-three/drei';

import * as THREE from 'three';


/* =========================================================
   PARTICLE FIELD
========================================================= */

function ParticleField({ count = 450 }) {
  const points = useRef();

  const positions = useMemo(() => {
    const data = new Float32Array(count * 3);

    for (let i = 0; i < count; i += 1) {
      const radius = 3.5 + Math.random() * 4;

      const theta =
        Math.random() * Math.PI * 2;

      const phi =
        Math.acos(2 * Math.random() - 1);

      data[i * 3] =
        radius *
        Math.sin(phi) *
        Math.cos(theta);

      data[i * 3 + 1] =
        radius *
        Math.cos(phi);

      data[i * 3 + 2] =
        radius *
        Math.sin(phi) *
        Math.sin(theta);
    }

    return data;
  }, [count]);

  useFrame((state) => {
    if (!points.current) return;

    points.current.rotation.y =
      state.clock.elapsedTime * 0.025;

    points.current.rotation.x =
      Math.sin(state.clock.elapsedTime * 0.15) * 0.03;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>

      <pointsMaterial
        color="#d4af37"
        size={0.018}
        transparent
        opacity={0.65}
        depthWrite={false}
      />
    </points>
  );
}


/* =========================================================
   DIGITAL GLOBE
========================================================= */

function DigitalGlobe() {
  const globe = useRef();
  const inner = useRef();

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    if (globe.current) {
      globe.current.rotation.y =
        time * 0.18;
    }

    if (inner.current) {
      inner.current.rotation.y =
        -time * 0.1;

      inner.current.rotation.x =
        Math.sin(time * 0.35) * 0.08;
    }
  });

  return (
    <group ref={globe}>
      {/* Core sphere */}

      <mesh>
        <sphereGeometry args={[1.35, 48, 48]} />

        <meshStandardMaterial
          color="#b88b18"
          emissive="#8d6500"
          emissiveIntensity={1.1}
          roughness={0.35}
          metalness={0.8}
          wireframe
        />
      </mesh>

      {/* Inner glowing sphere */}

      <mesh scale={0.88}>
        <sphereGeometry args={[1.35, 32, 32]} />

        <meshStandardMaterial
          color="#d4af37"
          emissive="#b88700"
          emissiveIntensity={0.8}
          transparent
          opacity={0.12}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Latitude rings */}

      {[0.35, 0.65, 1].map((scale) => (
        <mesh
          key={scale}
          rotation={[
            Math.PI / 2,
            0,
            0,
          ]}
          scale={scale}
        >
          <torusGeometry
            args={[1.35, 0.006, 8, 96]}
          />

          <meshBasicMaterial
            color="#d4af37"
            transparent
            opacity={0.35}
          />
        </mesh>
      ))}

      {/* Orbit rings */}

      <group ref={inner}>
        <mesh
          rotation={[
            Math.PI / 2.8,
            0.2,
            0.5,
          ]}
        >
          <torusGeometry
            args={[1.8, 0.009, 8, 128]}
          />

          <meshBasicMaterial
            color="#e4bd42"
            transparent
            opacity={0.75}
          />
        </mesh>

        <mesh
          rotation={[
            1.1,
            0.4,
            0.2,
          ]}
        >
          <torusGeometry
            args={[2.15, 0.006, 8, 128]}
          />

          <meshBasicMaterial
            color="#d4af37"
            transparent
            opacity={0.4}
          />
        </mesh>

        <mesh
          rotation={[
            0.35,
            1,
            0.15,
          ]}
        >
          <torusGeometry
            args={[2.5, 0.004, 8, 128]}
          />

          <meshBasicMaterial
            color="#d4af37"
            transparent
            opacity={0.25}
          />
        </mesh>
      </group>

      {/* Orbiting nodes */}

      <OrbitNode
        radius={1.8}
        speed={0.7}
        offset={0}
      />

      <OrbitNode
        radius={2.15}
        speed={-0.45}
        offset={2}
      />

      <OrbitNode
        radius={2.5}
        speed={0.3}
        offset={4}
      />
    </group>
  );
}


/* =========================================================
   ORBIT NODE
========================================================= */

function OrbitNode({
  radius,
  speed,
  offset,
}) {
  const node = useRef();

  useFrame((state) => {
    const t =
      state.clock.elapsedTime * speed +
      offset;

    node.current.position.x =
      Math.cos(t) * radius;

    node.current.position.z =
      Math.sin(t) * radius;

    node.current.position.y =
      Math.sin(t * 1.5) * 0.4;
  });

  return (
    <mesh ref={node}>
      <sphereGeometry args={[0.055, 16, 16]} />

      <meshBasicMaterial
        color="#f5d76e"
      />
    </mesh>
  );
}


/* =========================================================
   CONNECTION LINES
========================================================= */

function ConnectionLines() {
  const lines = [
    [
      [-2.7, 1.4, 0],
      [-1.6, 0.8, 0],
      [-1.1, 0.3, 0],
    ],

    [
      [2.8, 1.2, 0],
      [2, 0.8, 0],
      [1.3, 0.4, 0],
    ],

    [
      [-2.6, -1.4, 0],
      [-1.7, -0.9, 0],
      [-1.1, -0.5, 0],
    ],

    [
      [2.7, -1.2, 0],
      [1.8, -0.8, 0],
      [1.2, -0.4, 0],
    ],
  ];

  return (
    <group>
      {lines.map((points, index) => (
        <Line
          key={index}
          points={points}
          color="#d4af37"
          transparent
          opacity={0.28}
          lineWidth={0.6}
        />
      ))}
    </group>
  );
}


/* =========================================================
   FLOATING DATA BLOCKS
========================================================= */

function DataBlocks() {
  const blocks = [
    {
      position: [-2.65, 1.45, 0],
      label: 'IDEAS',
    },
    {
      position: [2.7, 1.35, 0],
      label: 'TECHNOLOGY',
    },
    {
      position: [2.8, -1.2, 0],
      label: 'GROWTH',
    },
    {
      position: [-2.7, -1.3, 0],
      label: 'PEOPLE',
    },
  ];

  return (
    <group>
      {blocks.map((block) => (
        <Float
          key={block.label}
          speed={1.2}
          rotationIntensity={0.15}
          floatIntensity={0.35}
        >
          <group position={block.position}>
            <mesh>
              <boxGeometry
                args={[0.7, 0.28, 0.035]}
              />

              <meshBasicMaterial
                color="#d4af37"
                transparent
                opacity={0.05}
              />
            </mesh>

            <Line
              points={[
                [-0.35, -0.14, 0.02],
                [0.35, -0.14, 0.02],
                [0.35, 0.14, 0.02],
                [-0.35, 0.14, 0.02],
                [-0.35, -0.14, 0.02],
              ]}
              color="#d4af37"
              transparent
              opacity={0.75}
              lineWidth={0.7}
            />
          </group>
        </Float>
      ))}
    </group>
  );
}


/* =========================================================
   HERO SCENE
========================================================= */

function HeroScene() {
  const group = useRef();
  const { pointer } = useThree();

  useFrame(() => {
    if (!group.current) return;

    group.current.rotation.y +=
      (pointer.x * 0.08 -
        group.current.rotation.y) *
      0.025;

    group.current.rotation.x +=
      (-pointer.y * 0.05 -
        group.current.rotation.x) *
      0.025;
  });

  return (
    <>
      <ambientLight intensity={0.18} />

      <pointLight
        position={[0, 0, 3]}
        intensity={4}
        distance={8}
        color="#d4af37"
      />

      <pointLight
        position={[-3, 2, 2]}
        intensity={1.4}
        distance={6}
        color="#ffe7a0"
      />

      <group ref={group}>
        <DigitalGlobe />

        <ConnectionLines />

        <DataBlocks />

        <ParticleField count={500} />
      </group>

      <Sparkles
        count={100}
        scale={[7, 5, 4]}
        size={1.2}
        speed={0.15}
        color="#d4af37"
      />
    </>
  );
}


/* =========================================================
   PROCESS VISUAL
========================================================= */

function ProcessVisual() {
  const group = useRef();

  useFrame((state) => {
    if (!group.current) return;

    group.current.rotation.y =
      state.clock.elapsedTime * 0.08;
  });

  return (
    <>
      <ambientLight intensity={0.2} />

      <pointLight
        position={[2, 2, 3]}
        intensity={4}
        color="#d4af37"
      />

      <group ref={group}>
        {[0, 1, 2, 3, 4].map((index) => (
          <mesh
            key={index}
            rotation={[
              index * 0.3,
              index * 0.4,
              index * 0.2,
            ]}
            scale={1 - index * 0.12}
          >
            <torusGeometry
              args={[
                1.35 + index * 0.18,
                0.012,
                8,
                96,
              ]}
            />

            <meshBasicMaterial
              color="#d4af37"
              transparent
              opacity={0.5 - index * 0.07}
            />
          </mesh>
        ))}

        <mesh>
          <icosahedronGeometry
            args={[0.72, 2]}
          />

          <meshStandardMaterial
            color="#d4af37"
            emissive="#9a7100"
            emissiveIntensity={1}
            wireframe
            metalness={0.9}
            roughness={0.25}
          />
        </mesh>

        <ParticleField count={180} />
      </group>
    </>
  );
}


/* =========================================================
   CTA VISUAL
========================================================= */

function CtaVisual() {
  const crystal = useRef();

  useFrame((state) => {
    if (!crystal.current) return;

    crystal.current.rotation.x =
      state.clock.elapsedTime * 0.12;

    crystal.current.rotation.y =
      state.clock.elapsedTime * 0.18;

    crystal.current.position.y =
      Math.sin(
        state.clock.elapsedTime * 0.7
      ) * 0.12;
  });

  return (
    <>
      <ambientLight intensity={0.15} />

      <pointLight
        position={[0, 2, 3]}
        intensity={5}
        color="#d4af37"
      />

      <group>
        <mesh ref={crystal}>
          <icosahedronGeometry
            args={[1.45, 1]}
          />

          <meshStandardMaterial
            color="#d4af37"
            emissive="#8e6500"
            emissiveIntensity={1}
            metalness={0.9}
            roughness={0.18}
            wireframe
          />
        </mesh>

        <mesh scale={0.72}>
          <icosahedronGeometry
            args={[1.45, 1]}
          />

          <meshStandardMaterial
            color="#d4af37"
            emissive="#b88700"
            emissiveIntensity={0.8}
            transparent
            opacity={0.15}
            metalness={1}
            roughness={0.1}
          />
        </mesh>

        {[1.9, 2.35, 2.8].map(
          (radius, index) => (
            <mesh
              key={radius}
              rotation={[
                index * 0.7,
                index * 0.45,
                index * 0.25,
              ]}
            >
              <torusGeometry
                args={[
                  radius,
                  0.008,
                  8,
                  100,
                ]}
              />

              <meshBasicMaterial
                color="#d4af37"
                transparent
                opacity={
                  0.4 - index * 0.08
                }
              />
            </mesh>
          )
        )}

        <ParticleField count={240} />
      </group>
    </>
  );
}


/* =========================================================
   MAIN SCENE
========================================================= */

function SceneContent({ variant }) {
  if (variant === 'process') {
    return <ProcessVisual />;
  }

  if (variant === 'cta') {
    return <CtaVisual />;
  }

  return <HeroScene />;
}


/* =========================================================
   PUBLIC COMPONENT
========================================================= */

export default function ContactScene({
  variant = 'hero',
}) {
  return (
    <Canvas
      camera={{
        position: [0, 0, 6],
        fov: 42,
      }}
      dpr={[1, 1.5]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      }}
    >
      <SceneContent variant={variant} />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableDamping
        dampingFactor={0.04}
        rotateSpeed={0.25}
        autoRotate={false}
      />
    </Canvas>
  );
}