import { useEffect, useCallback, type RefObject } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import type { SceneId, LotId } from '@community-explorer/shared';
import type { ViewerAdapter, CameraTarget } from './viewer-adapter';

interface ThreeViewerBridgeProps {
  adapterRef: RefObject<ViewerAdapter | null>;
  sceneId: SceneId | null;
  lotId: LotId | null;
  reduceMotion: boolean;
}

function ThreeViewerBridge({ adapterRef, sceneId: _sceneId, lotId: _lotId, reduceMotion }: ThreeViewerBridgeProps) {
  const { camera } = useThree();

  const setCamera = useCallback(
    (target: CameraTarget) => {
      if (reduceMotion) {
        camera.position.set(...target.position);
        if (target.lookAt) camera.lookAt(...target.lookAt);
      } else {
        const dest = new THREE.Vector3(...target.position);
        camera.position.lerp(dest, 1);
        if (target.lookAt) camera.lookAt(...target.lookAt);
      }
      camera.updateProjectionMatrix();
    },
    [camera, reduceMotion]
  );

  useEffect(() => {
    if (!adapterRef.current) return;
    const impl: ViewerAdapter = {
      loadScene: async (id) => {
        // Placeholder: actual loading via manifest happens elsewhere
        await Promise.resolve(id);
      },
      setCamera,
      highlightLot: (_id) => {
        // Placeholder: highlight geometry when lot selected
      },
      dispose: () => {},
    };
    (adapterRef as React.MutableRefObject<ViewerAdapter | null>).current = impl;
    return () => {
      impl.dispose();
      (adapterRef as React.MutableRefObject<ViewerAdapter | null>).current = null;
    };
  }, [adapterRef, setCamera]);

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2, 1, 1]} />
        <meshStandardMaterial color="#64748b" />
      </mesh>
      <OrbitControls makeDefault enableDamping dampingFactor={0.05} />
    </>
  );
}

interface ThreeViewerProps {
  adapterRef: RefObject<ViewerAdapter | null>;
  sceneId: SceneId | null;
  lotId: LotId | null;
  reduceMotion: boolean;
  className?: string;
}

export function ThreeViewer({ adapterRef, sceneId, lotId, reduceMotion, className }: ThreeViewerProps) {
  return (
    <div className={`h-full w-full bg-slate-900 ${className ?? ''}`} role="img" aria-label="3D community view">
      <Canvas
        camera={{ position: [5, 5, 5], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: false }}
      >
        <ThreeViewerBridge
          adapterRef={adapterRef}
          sceneId={sceneId}
          lotId={lotId}
          reduceMotion={reduceMotion}
        />
      </Canvas>
    </div>
  );
}
