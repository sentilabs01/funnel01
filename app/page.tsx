"use client";

import { SplineScene } from "@/components/ui/splite";
import { Card } from "@/components/ui/card";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";

export default function Home() {
  const { theme } = useTheme();
  const [cursor, setCursor] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursor({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4">
      <Card className="w-full h-[500px] bg-white dark:bg-black/[0.96] relative overflow-hidden">
        <div className="flex h-full">
          {/* Left content */}
          <div className="flex-1 p-8 relative z-10 flex flex-col justify-center">
            <h1 className="text-4xl md:text-5xl font-bold text-black dark:text-white font-orbitron tracking-wider">
              Automate Workflows
            </h1>
            {/* Logos row */}
            <div className="flex items-center gap-8 mt-8">
              <a href="https://www.make.com/" target="_blank" rel="noopener noreferrer">
                <img src="https://automationalien.s3.us-east-1.amazonaws.com/make-logo-png.png" alt="Make Logo" className="h-16 w-auto" />
              </a>
              <a href="https://n8n.io/" target="_blank" rel="noopener noreferrer">
                <img src="https://automationalien.s3.us-east-1.amazonaws.com/n8n-logo-png_seeklogo-470809.png" alt="n8n Logo" className="h-16 w-auto" />
              </a>
              <a href="https://zapier.com/" target="_blank" rel="noopener noreferrer">
                <img src="https://automationalien.s3.us-east-1.amazonaws.com/Zapier_logo.png" alt="Zapier Logo" className="h-5 w-auto" />
              </a>
            </div>
            <a 
              href="https://agent.jotform.com/01952a9d3fb275588d4fce8dc19d1aa9d6e0"
              target="_blank"
              rel="noopener noreferrer"
              className="relative mt-8 inline-flex group"
            >
              <button
                className="glass-shimmer-btn"
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
            <style jsx>{`
              .glass-shimmer-btn {
                position: relative;
                display: inline-flex;
                align-items: center;
                gap: 1rem;
                padding: 1rem 2rem;
                border-radius: 1rem;
                border: 1.5px solid rgba(255,255,255,0.35);
                background: linear-gradient(135deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.10) 100%);
                box-shadow: 0 4px 32px 0 rgba(31,38,135,0.15);
                backdrop-filter: blur(16px);
                overflow: hidden;
                cursor: pointer;
                transition: transform 0.25s cubic-bezier(.4,2,.3,1), box-shadow 0.25s;
              }
              .glass-shimmer-btn::before {
                content: '';
                position: absolute;
                top: -50%;
                left: -50%;
                width: 200%;
                height: 200%;
                background: linear-gradient(120deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.15) 60%, rgba(255,255,255,0.7) 100%);
                opacity: 0.35;
                transform: skewX(-20deg) translateX(-100%);
                transition: transform 0.7s cubic-bezier(.4,2,.3,1);
                pointer-events: none;
              }
              .glass-shimmer-btn:hover::before, .glass-shimmer-btn:focus::before {
                transform: skewX(-20deg) translateX(100%);
              }
              .glass-shimmer-btn:hover, .glass-shimmer-btn:focus {
                transform: rotateY(8deg) scale(1.04);
                box-shadow: 0 8px 40px 0 rgba(31,38,135,0.25);
              }
            `}</style>
          </div>

          {/* Right content */}
          <div className="flex-1 relative">
            <a
              href="https://agent.jotform.com/01952a9d3fb275588d4fce8dc19d1aa9d6e0"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'block', width: '100%', height: '100%' }}
            >
              <SplineScene 
                scene={
                  theme === 'dark' 
                    ? "https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode" 
                    : "https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                }
                className="w-full h-full cursor-pointer"
                cursor={cursor}
              />
            </a>
          </div>
        </div>
      </Card>
    </div>
  );
}
