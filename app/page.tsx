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
          <div className="flex-1 p-8 relative z-10 flex flex-col justify-center items-start gap-8">
            <h1 className="text-4xl md:text-5xl font-bold text-black dark:text-white font-orbitron tracking-wider mb-8 text-left">
              Automate Workflows
            </h1>
            <div className="flex flex-row flex-wrap items-center justify-start gap-8 w-full">
              <a href="https://github.com/sentilabs01/splite" target="_blank" rel="noopener noreferrer">
                <svg className="h-8 md:h-10 lg:h-12 w-auto object-contain" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.26.82-.577 0-.285-.01-1.04-.015-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.73.083-.73 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.76-1.606-2.665-.304-5.466-1.334-5.466-5.93 0-1.31.468-2.38 1.236-3.22-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.5 11.5 0 0 1 3.003-.404c1.02.005 2.047.138 3.003.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.873.12 3.176.77.84 1.235 1.91 1.235 3.22 0 4.61-2.803 5.624-5.475 5.92.43.37.823 1.102.823 2.222 0 1.606-.015 2.898-.015 3.293 0 .32.216.694.825.576C20.565 21.796 24 17.297 24 12c0-6.63-5.37-12-12-12z"/>
                </svg>
              </a>
              <a href="https://www.make.com/" target="_blank" rel="noopener noreferrer">
                <img src="https://automationalien.s3.us-east-1.amazonaws.com/make-logo-png.png" alt="Make Logo" className="h-8 md:h-10 lg:h-12 w-auto object-contain" />
              </a>
              <a href="https://n8n.io/" target="_blank" rel="noopener noreferrer">
                <img src="https://automationalien.s3.us-east-1.amazonaws.com/n8n-logo-png_seeklogo-470809.png" alt="n8n Logo" className="h-8 md:h-10 lg:h-12 w-auto object-contain" />
              </a>
              <a href="https://zapier.com/" target="_blank" rel="noopener noreferrer">
                <img src="https://automationalien.s3.us-east-1.amazonaws.com/Zapier_logo.png" alt="Zapier Logo" className="h-4 md:h-5 lg:h-6 w-auto object-contain" style={{maxWidth:'40px'}} />
              </a>
            </div>
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
