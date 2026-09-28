function ServiceLights({
  isMobile = false,
}) {
  return (
    <>
      <ambientLight
        intensity={
          isMobile ? 0.3 : 0.35
        }
      />

      <directionalLight
        position={[4, 6, 5]}
        intensity={
          isMobile ? 1.5 : 2
        }
      />

      <pointLight
        position={[-4, 2, 3]}
        intensity={
          isMobile ? 1 : 1.5
        }
        distance={
          isMobile ? 7 : 9
        }
      />

      <pointLight
        position={[4, -2, -3]}
        intensity={
          isMobile ? 0.65 : 1
        }
        distance={
          isMobile ? 6 : 8
        }
      />
    </>
  );
}

export default ServiceLights;