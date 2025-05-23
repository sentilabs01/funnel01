'use client';

import { Suspense, useState } from 'react';
import Spline from '@splinetool/react-spline';

interface SplineSceneProps {
  scene: string;
  className?: string;
}

export default function SplineScene({ scene, className }: SplineSceneProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setError('Failed to load 3D scene');
    setIsLoading(false);
  };

  return (
    <Suspense
      fallback={
        <div className="w-full h-full flex items-center justify-center bg-transparent">
          <div className="text-center">
            <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]" />
            <p className="mt-4 text-gray-600 dark:text-gray-300">Loading 3D scene...</p>
          </div>
        </div>
      }
    >
      <div className={`relative ${className}`}>
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-transparent">
            <div className="text-center">
              <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]" />
              <p className="mt-4 text-gray-600 dark:text-gray-300">Loading 3D scene...</p>
            </div>
          </div>
        )}
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-transparent">
            <p className="text-red-500">{error}</p>
          </div>
        )}
        <Spline
          scene={scene}
          className={className}
          onLoad={handleLoad}
          onError={handleError}
        />
      </div>
    </Suspense>
  );
}
