import { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

import Service3DObject from '../components/Service3DObject.jsx';
import ServiceLights from '../lights/ServiceLights.jsx';

function useScenePreferences() {
  const [preferences, setPreferences] =
    useState({
      isMobile: false,
      reducedMotion: false,
    });

  useEffect(() => {
    const mobileQuery =
      window.matchMedia(
        '(max-width: 700px)',
      );

    const reducedMotionQuery =
      window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      );

    const updatePreferences = () => {
      setPreferences({
        isMobile: mobileQuery.matches,
        reducedMotion:
          reducedMotionQuery.matches,
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

function ServicesScene({
  activeService = 0,
}) {
  const {
    isMobile,
    reducedMotion,
  } = useScenePreferences();

  return (
    <Canvas
      camera={{
        position: [
          0,
          0,
          isMobile ? 6.2 : 6,
        ],
        fov: isMobile ? 47 : 45,
      }}
      dpr={
        isMobile
          ? [1, 1.2]
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
      <ServiceLights
        isMobile={isMobile}
      />

      <Service3DObject
        activeService={activeService}
        isMobile={isMobile}
        reducedMotion={
          reducedMotion
        }
      />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={
          !reducedMotion
        }
        enableDamping={
          !reducedMotion
        }
        dampingFactor={0.06}
        minPolarAngle={
          Math.PI / 2.8
        }
        maxPolarAngle={
          Math.PI / 1.8
        }
        rotateSpeed={
          isMobile ? 0.35 : 0.5
        }
      />
    </Canvas>
  );
}

export default ServicesScene;