import {
  useEffect,
  useRef,
} from 'react';

import { useFrame } from '@react-three/fiber';

import { MeshDistortMaterial } from '@react-three/drei';

import gsap from 'gsap';

import FloatingGroup from './FloatingGroup.jsx';

const serviceVisuals = [
  {
    color: '#D4AF37',
    scale: 1,
    rotationSpeed: 0.25,
    distort: 0.25,
  },
  {
    color: '#8FB8C9',
    scale: 1.08,
    rotationSpeed: 0.3,
    distort: 0.35,
  },
  {
    color: '#D4AF37',
    scale: 0.95,
    rotationSpeed: 0.38,
    distort: 0.45,
  },
  {
    color: '#B8A1D9',
    scale: 1.12,
    rotationSpeed: 0.22,
    distort: 0.55,
  },
  {
    color: '#C7C7C7',
    scale: 1.05,
    rotationSpeed: 0.32,
    distort: 0.3,
  },
  {
    color: '#E0C878',
    scale: 0.98,
    rotationSpeed: 0.28,
    distort: 0.4,
  },
];

function hexToRgb(hex) {
  return {
    r:
      parseInt(
        hex.slice(1, 3),
        16,
      ) / 255,

    g:
      parseInt(
        hex.slice(3, 5),
        16,
      ) / 255,

    b:
      parseInt(
        hex.slice(5, 7),
        16,
      ) / 255,
  };
}

function Service3DObject({
  activeService = 0,
  isMobile = false,
  reducedMotion = false,
}) {
  const groupRef = useRef(null);
  const coreRef = useRef(null);
  const outerRingRef =
    useRef(null);
  const innerRingRef =
    useRef(null);

  const materialRef =
    useRef(null);

  const previousService =
    useRef(activeService);

  const visual =
    serviceVisuals[
      activeService
    ] || serviceVisuals[0];

  const coreDetail = 2;

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

    /*
     * Reduced motion:
     * immediately apply the visual state
     * without creating a GSAP timeline.
     */
    if (reducedMotion) {
      groupRef.current.scale.set(
        visual.scale,
        visual.scale,
        visual.scale,
      );

      if (materialRef.current) {
        materialRef.current.color.set(
          visual.color,
        );
      }

      return undefined;
    }

    const timeline =
      gsap.timeline();

    timeline
      .to(
        groupRef.current.scale,
        {
          x: visual.scale * 0.84,
          y: visual.scale * 0.84,
          z: visual.scale * 0.84,
          duration: 0.18,
          ease: 'power2.in',
        },
      )
      .to(
        groupRef.current.rotation,
        {
          y:
            groupRef.current
              .rotation.y +
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
          x: visual.scale,
          y: visual.scale,
          z: visual.scale,
          duration: 0.35,
          ease: 'back.out(1.7)',
        },
      );

    if (materialRef.current) {
      const rgb =
        hexToRgb(
          visual.color,
        );

      gsap.to(
        materialRef.current.color,
        {
          r: rgb.r,
          g: rgb.g,
          b: rgb.b,
          duration: 0.5,
          ease: 'power2.out',
        },
      );
    }

    return () => {
      timeline.kill();

      if (materialRef.current) {
        gsap.killTweensOf(
          materialRef.current.color,
        );
      }
    };
  }, [
    activeService,
    visual.color,
    visual.scale,
    reducedMotion,
  ]);

  /* =======================================================
     CONTINUOUS 3D MOTION
  ======================================================= */

  useFrame(
    (state, delta) => {
      if (
        reducedMotion ||
        !groupRef.current
      ) {
        return;
      }

      groupRef.current.rotation.y +=
        delta *
        visual.rotationSpeed;

      groupRef.current.rotation.x =
        Math.sin(
          state.clock.elapsedTime *
            0.45,
        ) * 0.08;

      if (coreRef.current) {
        coreRef.current.rotation.x +=
          delta * 0.12;

        coreRef.current.rotation.z +=
          delta * 0.08;
      }

      if (outerRingRef.current) {
        outerRingRef.current.rotation.z +=
          delta * 0.18;
      }

      if (innerRingRef.current) {
        innerRingRef.current.rotation.x +=
          delta * 0.22;
      }
    },
  );

  const floatSpeed = isMobile
    ? 0.9
    : 1.4;

  const rotationIntensity =
    isMobile ? 0.08 : 0.15;

  const floatIntensity =
    isMobile ? 0.2 : 0.45;

  const coreDistort =
    isMobile
      ? visual.distort * 0.65
      : visual.distort;

  const coreSpeed =
    isMobile ? 0.8 : 1.5;

  const renderCore =
    (
      <group
        ref={groupRef}
        scale={visual.scale}
      >
        {/* Main distorted technology core */}
        <mesh ref={coreRef}>
          <icosahedronGeometry
            args={[
              1.45,
              coreDetail,
            ]}
          />

          <MeshDistortMaterial
            ref={materialRef}
            color={visual.color}
            metalness={0.9}
            roughness={0.2}
            distort={
              reducedMotion
                ? 0
                : coreDistort
            }
            speed={
              reducedMotion
                ? 0
                : coreSpeed
            }
          />
        </mesh>

        {/* Inner wireframe */}
        <mesh scale={0.62}>
          <icosahedronGeometry
            args={[
              1.45,
              1,
            ]}
          />

          <meshStandardMaterial
            color="#050505"
            metalness={1}
            roughness={0.18}
            wireframe
          />
        </mesh>

        {/* Outer gold orbit */}
        <mesh
          ref={outerRingRef}
          rotation={[
            Math.PI / 2,
            0,
            0,
          ]}
        >
          <torusGeometry
            args={[
              isMobile
                ? 1.9
                : 2.05,
              0.025,
              12,
              isMobile
                ? 64
                : 96,
            ]}
          />

          <meshStandardMaterial
            color={visual.color}
            metalness={0.9}
            roughness={0.2}
          />
        </mesh>

        {/* White orbit */}
        <mesh
          ref={innerRingRef}
          rotation={[
            0.8,
            0.4,
            0,
          ]}
        >
          <torusGeometry
            args={[
              isMobile
                ? 2.1
                : 2.35,
              0.018,
              12,
              isMobile
                ? 64
                : 96,
            ]}
          />

          <meshStandardMaterial
            color="#ffffff"
            metalness={0.75}
            roughness={0.25}
          />
        </mesh>

        {/* Secondary orbit */}
        <mesh
          rotation={[
            0.3,
            1.1,
            0,
          ]}
        >
          <torusGeometry
            args={[
              isMobile
                ? 1.55
                : 1.7,
              0.012,
              10,
              isMobile
                ? 56
                : 80,
            ]}
          />

          <meshStandardMaterial
            color={visual.color}
            metalness={0.8}
            roughness={0.25}
          />
        </mesh>
      </group>
    );

  if (reducedMotion) {
    return renderCore;
  }

  return (
    <FloatingGroup
      speed={floatSpeed}
      rotationIntensity={rotationIntensity}
      floatIntensity={floatIntensity}
    >
      {renderCore}
    </FloatingGroup>
  );
}

export default Service3DObject;