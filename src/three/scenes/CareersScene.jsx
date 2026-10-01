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
  OrbitControls,
} from '@react-three/drei';

import * as THREE from 'three';


const GOLD = '#D4AF37';
const LIGHT_GOLD = '#F4D56A';
const SOFT_GOLD = '#8F7420';


function useScenePreferences() {
  const [preferences, setPreferences] = useState({
    mobile: false,
    reducedMotion: false,
  });

  useEffect(() => {
    const update = () => {
      setPreferences({
        mobile: window.innerWidth < 768,
        reducedMotion: window.matchMedia(
          '(prefers-reduced-motion: reduce)'
        ).matches,
      });
    };

    update();

    const motionQuery = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    );

    window.addEventListener('resize', update);
    motionQuery.addEventListener('change', update);

    return () => {
      window.removeEventListener('resize', update);
      motionQuery.removeEventListener('change', update);
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

  const count = mobile ? 140 : 360;

  const positions = useMemo(() => {
    const array = new Float32Array(count * 3);

    for (let i = 0; i < count; i += 1) {
      const radius = 2.8 + Math.random() * 2.5;

      const theta =
        Math.random() * Math.PI * 2;

      const phi =
        Math.acos(
          2 * Math.random() - 1
        );

      array[i * 3] =
        radius *
        Math.sin(phi) *
        Math.cos(theta);

      array[i * 3 + 1] =
        radius *
        Math.cos(phi);

      array[i * 3 + 2] =
        radius *
        Math.sin(phi) *
        Math.sin(theta);
    }

    return array;
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current || reducedMotion) {
      return;
    }

    pointsRef.current.rotation.y =
      state.clock.elapsedTime * 0.025;

    pointsRef.current.rotation.x =
      Math.sin(
        state.clock.elapsedTime * 0.12
      ) * 0.04;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>

      <pointsMaterial
        color={LIGHT_GOLD}
        size={mobile ? 0.018 : 0.025}
        transparent
        opacity={0.72}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}


/* =========================================================
   GLOBE NETWORK
========================================================= */

function GlobeNetwork({
  mobile,
  reducedMotion,
}) {
  const groupRef = useRef();

  const count = mobile ? 160 : 320;

  const particles = useMemo(() => {
    const data = [];

    for (let i = 0; i < count; i += 1) {
      const phi =
        Math.acos(
          1 - 2 * Math.random()
        );

      const theta =
        Math.random() *
        Math.PI *
        2;

      const radius = 1.18;

      data.push({
        position: [
          radius *
            Math.sin(phi) *
            Math.cos(theta),

          radius *
            Math.cos(phi),

          radius *
            Math.sin(phi) *
            Math.sin(theta),
        ],
      });
    }

    return data;
  }, [count]);

  useFrame((state) => {
    if (!groupRef.current || reducedMotion) {
      return;
    }

    groupRef.current.rotation.y =
      state.clock.elapsedTime * 0.1;

    groupRef.current.rotation.x =
      Math.sin(
        state.clock.elapsedTime * 0.2
      ) * 0.08;
  });

  return (
    <group ref={groupRef}>

      <mesh>
        <sphereGeometry
          args={[1.2, 32, 32]}
        />

        <meshBasicMaterial
          color="#080705"
          transparent
          opacity={0.96}
        />
      </mesh>


      <mesh>
        <sphereGeometry
          args={[1.205, 28, 28]}
        />

        <meshBasicMaterial
          color={GOLD}
          wireframe
          transparent
          opacity={0.28}
        />
      </mesh>


      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particles.length}
            array={new Float32Array(
              particles.flatMap(
                (particle) =>
                  particle.position
              )
            )}
            itemSize={3}
          />
        </bufferGeometry>

        <pointsMaterial
          color={LIGHT_GOLD}
          size={mobile ? 0.025 : 0.032}
          transparent
          opacity={0.95}
          depthWrite={false}
        />
      </points>


      <mesh>
        <sphereGeometry
          args={[1.28, 18, 18]}
        />

        <meshBasicMaterial
          color={GOLD}
          wireframe
          transparent
          opacity={0.09}
        />
      </mesh>

    </group>
  );
}


/* =========================================================
   ORBIT RINGS
========================================================= */

function OrbitRing({
  rotation,
  radius,
  speed,
  reducedMotion,
}) {
  const ref = useRef();

  useFrame((state) => {
    if (!ref.current || reducedMotion) {
      return;
    }

    ref.current.rotation.z =
      rotation[2] +
      state.clock.elapsedTime * speed;

    ref.current.rotation.y =
      rotation[1] +
      Math.sin(
        state.clock.elapsedTime * 0.18
      ) * 0.08;
  });

  return (
    <mesh
      ref={ref}
      rotation={rotation}
    >
      <torusGeometry
        args={[
          radius,
          0.008,
          12,
          160,
        ]}
      />

      <meshBasicMaterial
        color={GOLD}
        transparent
        opacity={0.55}
      />
    </mesh>
  );
}


/* =========================================================
   ORBITING NODES
========================================================= */

function OrbitNodes({
  mobile,
  reducedMotion,
}) {
  const groupRef = useRef();

  const nodeCount = mobile ? 5 : 8;

  const nodes = useMemo(
    () =>
      Array.from(
        { length: nodeCount },
        (_, index) => ({
          angle:
            (index / nodeCount) *
            Math.PI *
            2,

          radius:
            1.65 +
            (index % 2) * 0.22,

          y:
            (index % 3 - 1) *
            0.35,
        })
      ),
    [nodeCount]
  );

  useFrame((state) => {
    if (!groupRef.current || reducedMotion) {
      return;
    }

    groupRef.current.rotation.y =
      state.clock.elapsedTime * 0.16;
  });

  return (
    <group ref={groupRef}>

      {nodes.map((node, index) => (
        <mesh
          key={index}
          position={[
            Math.cos(node.angle) *
              node.radius,

            node.y,

            Math.sin(node.angle) *
              node.radius,
          ]}
        >
          <sphereGeometry
            args={[
              index % 2 === 0
                ? 0.045
                : 0.06,
              12,
              12,
            ]}
          />

          <meshBasicMaterial
            color={
              index % 2 === 0
                ? LIGHT_GOLD
                : GOLD
            }
          />
        </mesh>
      ))}

    </group>
  );
}


/* =========================================================
   CORE LIGHT
========================================================= */

function CoreLight() {
  return (
    <group>

      <mesh>
        <sphereGeometry
          args={[0.45, 24, 24]}
        />

        <meshBasicMaterial
          color={GOLD}
          transparent
          opacity={0.18}
        />
      </mesh>

      <mesh>
        <sphereGeometry
          args={[0.16, 24, 24]}
        />

        <meshBasicMaterial
          color={LIGHT_GOLD}
        />
      </mesh>

      <pointLight
        color={LIGHT_GOLD}
        intensity={3}
        distance={5}
      />

    </group>
  );
}


/* =========================================================
   PLATFORM
========================================================= */

function Platform({
  reducedMotion,
}) {
  const ref = useRef();

  useFrame((state) => {
    if (!ref.current || reducedMotion) {
      return;
    }

    ref.current.rotation.z =
      Math.sin(
        state.clock.elapsedTime * 0.3
      ) * 0.03;
  });

  return (
    <group
      ref={ref}
      position={[0, -1.72, 0]}
    >

      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry
          args={[
            0.8,
            1.65,
            96,
          ]}
        />

        <meshBasicMaterial
          color={GOLD}
          transparent
          opacity={0.34}
          side={THREE.DoubleSide}
        />
      </mesh>


      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry
          args={[
            1.75,
            1.77,
            96,
          ]}
        />

        <meshBasicMaterial
          color={SOFT_GOLD}
          transparent
          opacity={0.2}
          side={THREE.DoubleSide}
        />
      </mesh>


      <pointLight
        color={GOLD}
        intensity={1.2}
        distance={4}
      />

    </group>
  );
}


/* =========================================================
   CAMERA PARALLAX
========================================================= */

function CameraRig({
  reducedMotion,
}) {
  const { camera } = useThree();

  useFrame((state) => {
    if (reducedMotion) {
      return;
    }

    const targetX =
      state.pointer.x * 0.12;

    const targetY =
      state.pointer.y * 0.08;

    camera.position.x +=
      (targetX - camera.position.x) *
      0.025;

    camera.position.y +=
      (targetY - camera.position.y) *
      0.025;

    camera.lookAt(0, 0, 0);
  });

  return null;
}


/* =========================================================
   SCENE
========================================================= */

function SceneContent({
  mobile,
  reducedMotion,
}) {
  const groupRef = useRef();

  useFrame((state) => {
    if (!groupRef.current || reducedMotion) {
      return;
    }

    groupRef.current.rotation.y =
      Math.sin(
        state.clock.elapsedTime * 0.12
      ) * 0.05;
  });

  return (
    <>

      <ambientLight
        intensity={0.25}
      />

      <pointLight
        position={[2, 2, 3]}
        color={LIGHT_GOLD}
        intensity={2}
      />

      <pointLight
        position={[-3, -2, 1]}
        color="#8A6818"
        intensity={1.2}
      />


      <ParticleField
        mobile={mobile}
        reducedMotion={reducedMotion}
      />


      <group ref={groupRef}>

        <Float
          speed={reducedMotion ? 0 : 1.1}
          rotationIntensity={
            reducedMotion ? 0 : 0.12
          }
          floatIntensity={
            reducedMotion ? 0 : 0.16
          }
        >

          <GlobeNetwork
            mobile={mobile}
            reducedMotion={reducedMotion}
          />

          <CoreLight />

          <OrbitRing
            rotation={[
              Math.PI * 0.32,
              0,
              0.15,
            ]}
            radius={1.65}
            speed={0.12}
            reducedMotion={reducedMotion}
          />

          <OrbitRing
            rotation={[
              -Math.PI * 0.22,
              Math.PI * 0.25,
              -0.2,
            ]}
            radius={1.85}
            speed={-0.09}
            reducedMotion={reducedMotion}
          />

          <OrbitRing
            rotation={[
              Math.PI * 0.5,
              0.25,
              0.5,
            ]}
            radius={2.08}
            speed={0.055}
            reducedMotion={reducedMotion}
          />

          <OrbitNodes
            mobile={mobile}
            reducedMotion={reducedMotion}
          />

        </Float>

        <Platform
          reducedMotion={reducedMotion}
        />

      </group>


      <CameraRig
        reducedMotion={reducedMotion}
      />

    </>
  );
}


/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function ContactScene() {
  const {
    mobile,
    reducedMotion,
  } = useScenePreferences();

  return (
    <Canvas
      camera={{
        position: [0, 0, 5.2],
        fov: mobile ? 40 : 36,
      }}
      dpr={
        mobile
          ? [1, 1.25]
          : [1, 1.6]
      }
      gl={{
        antialias: !mobile,
        alpha: true,
        powerPreference: 'high-performance',
      }}
      frameloop="always"
    >

      <SceneContent
        mobile={mobile}
        reducedMotion={reducedMotion}
      />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableDamping
        dampingFactor={0.06}
        rotateSpeed={0.25}
        minPolarAngle={Math.PI * 0.35}
        maxPolarAngle={Math.PI * 0.65}
      />

    </Canvas>
  );
}