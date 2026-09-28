import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';

function FloatingGroup({
  children,
  speed = 0.5,
  rotationSpeed = 0.08,
  floatIntensity = 0.12,
}) {
  const groupRef = useRef(null);

  useFrame(({ clock }) => {
    const group = groupRef.current;

    if (!group) return;

    const elapsed = clock.getElapsedTime();

    group.position.y =
      Math.sin(elapsed * speed) * floatIntensity;

    group.rotation.y += rotationSpeed * 0.01;
  });

  return (
    <group ref={groupRef}>
      {children}
    </group>
  );
}

export default FloatingGroup;