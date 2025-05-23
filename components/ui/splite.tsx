'use client'

import { Suspense, lazy } from 'react'
import React, { useRef, useEffect } from 'react'
const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
  cursor?: { x: number; y: number }
}

export function SplineScene({ scene, className, cursor }: SplineSceneProps) {
  const splineRef = useRef<any>(null);

  const handleLoad = (spline: any) => {
    splineRef.current = spline;
  };

  useEffect(() => {
    if (splineRef.current && cursor) {
      // For now, just log the cursor and instance to verify
      console.log('Spline instance:', splineRef.current);
      console.log('Cursor:', cursor);
      // Here you would update the Spline scene based on cursor
    }
  }, [cursor]);

  return (
    <Suspense 
      fallback={
        <div className="w-full h-full flex items-center justify-center">
          <span className="loader"></span>
        </div>
      }
    >
      <Spline
        scene={scene}
        className={className}
        onLoad={handleLoad}
      />
    </Suspense>
  )
}