"use client";

import { SplineScene } from "@/components/ui/splite";
import { Card } from "@/components/ui/card";
import { useTheme } from "next-themes";

export default function Home() {
  const { theme } = useTheme();

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4">
      <Card className="w-full h-[500px] bg-white dark:bg-black/[0.96] relative overflow-hidden">
        <div className="flex h-full">
          {/* Left content */}
          <div className="flex-1 p-8 relative z-10 flex flex-col justify-center">
            <h1 className="text-4xl md:text-5xl font-bold text-black dark:text-white font-orbitron tracking-wider">
              Interactive 3D
            </h1>
            <p className="mt-4 text-gray-700 dark:text-gray-300 max-w-lg font-geist-sans">
              Bring your UI to life with beautiful 3D scenes. Create immersive experiences 
              that capture attention and enhance your design.
            </p>
            <a 
              href="https://agent.jotform.com/01952a9d3fb275588d4fce8dc19d1aa9d6e0/voice"
              target="_blank"
              rel="noopener noreferrer"
              className="relative mt-8 inline-flex group"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-neutral-400 to-neutral-300 dark:from-white/30 dark:to-white/10 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
              <button className="relative px-8 py-4 bg-black dark:bg-white rounded-lg leading-none flex items-center divide-x divide-gray-600 dark:divide-gray-200">
                <span className="text-gray-100 dark:text-gray-800 group-hover:text-white dark:group-hover:text-black pr-6 font-geist-sans">Let's Chat</span>
                <span className="text-indigo-400 dark:text-indigo-500 group-hover:text-gray-100 dark:group-hover:text-gray-800 pl-6 transition duration-200">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </button>
            </a>
          </div>

          {/* Right content */}
          <div className="flex-1 relative">
            <SplineScene 
              scene={
                theme === 'dark' 
                  ? "https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode" 
                  : "https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              }
              className="w-full h-full"
            />
          </div>
        </div>
      </Card>
    </div>
  );
}
