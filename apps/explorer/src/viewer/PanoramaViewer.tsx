import { Suspense, useEffect, useRef } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { useTexture, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

interface PanoramaSphereProps {
  url: string;
}

function PanoramaSphere({ url }: PanoramaSphereProps) {
  const texture = useTexture(url);
  texture.mapping = THREE.EquirectangularReflectionMapping;
  texture.colorSpace = THREE.SRGBColorSpace;

  return (
    <mesh>
      <sphereGeometry args={[500, 60, 40]} />
      <meshBasicMaterial
        map={texture}
        side={THREE.BackSide}
        toneMapped={false}
      />
    </mesh>
  );
}

function PanoramaControls() {
  return (
    <OrbitControls
      makeDefault
      enablePan={false}
      enableZoom={false}
      enableRotate={true}
      rotateSpeed={0.4}
      enableDamping
      dampingFactor={0.08}
      minPolarAngle={0}
      maxPolarAngle={Math.PI}
      target={[0, 0, -1]}
    />
  );
}

function PanoramaBridge({ url }: { url: string }) {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(0, 0, 0);
    camera.near = 0.1;
    camera.far = 1000;
    camera.updateProjectionMatrix();
  }, [camera]);

  return (
    <>
      <PanoramaSphere url={url} />
      <PanoramaControls />
    </>
  );
}

export interface PanoramaViewerProps {
  /** URL to equirectangular 360° image (2:1 aspect). */
  url: string;
  className?: string;
}

export function PanoramaViewer({ url, className = '' }: PanoramaViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className={`h-full w-full bg-slate-900 ${className}`}
      role="img"
      aria-label="360° street view panorama"
    >
      <Canvas
        camera={{ position: [0, 0, 0], fov: 75, near: 0.1, far: 1000 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: false }}
      >
        <Suspense fallback={null}>
          <PanoramaBridge url={url} />
        </Suspense>
      </Canvas>
    </div>
  );
}
