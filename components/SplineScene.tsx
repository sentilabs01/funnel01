'use client';

import { Suspense } from 'react';
import Spline from '@splinetool/react-spline';

interface SplineSceneProps {
  scene: string;
  className?: string;
}

export default function SplineScene({ scene, className }: SplineSceneProps) {
  return (
    <Suspense
      fallback={
        <div className="w-full h-full flex items-center justify-center">
          <span className="loader">Loading 3D scene...</span>
        </div>
      }
    >
      <Spline
        scene={scene}
        className={className}
      />
    </Suspense>
  );
}
