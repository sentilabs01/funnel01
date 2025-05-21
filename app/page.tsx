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
              Interactive Animations
            </h1>
            <p className="mt-4 text-gray-700 dark:text-gray-300 max-w-lg font-geist-sans">
              Bring your UI to life with beautiful 3D scenes. Create immersive experiences 
              that capture attention and enhance your business.
            </p>
            <a 
              href="https://agent.jotform.com/01952a9d3fb275588d4fce8dc19d1aa9d6e0"
              target="_blank"
              rel="noopener noreferrer"
              className="relative mt-8 inline-flex group"
            >
              <button
                className="relative px-8 py-4 rounded-xl flex items-center gap-4 overflow-hidden border border-white/40 dark:border-white/20 bg-white/20 dark:bg-black/30 backdrop-blur-0 transition-all duration-300
                  before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/60 before:to-white/0 dark:before:from-white/10 dark:before:to-black/0 before:opacity-80 before:pointer-events-none
                  after:content-[''] after:absolute after:inset-0 after:rounded-xl after:opacity-70 after:pointer-events-none
                  after:bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] after:from-indigo-400/70 after:to-transparent
                  group-hover:after:from-indigo-300/90 group-hover:after:to-transparent
                  focus:outline-none"
                style={{ boxShadow: '0 0 20px 6px rgba(99,102,241,0.5), 0 0 0 2px rgba(255,255,255,0.15) inset' }}
              >
                <span className="relative z-10 text-black dark:text-white font-bold font-geist-sans tracking-wide text-lg select-none drop-shadow-[0_1px_2px_rgba(0,0,0,0.15)]">
                  Let&apos;s Chat
                </span>
                <span className="relative z-10">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500 dark:text-indigo-300 group-hover:text-indigo-100 transition drop-shadow-[0_1px_2px_rgba(0,0,0,0.15)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
