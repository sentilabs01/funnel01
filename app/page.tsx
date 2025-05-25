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
            <a
              href="https://agent.jotform.com/01952a9d3fb275588d4fce8dc19d1aa9d6e0"
              target="_blank"
              rel="noopener noreferrer"
              className="text-4xl md:text-5xl font-bold text-black dark:text-white font-orbitron tracking-wider mb-8 text-left transition"
            >
              Automate Workflows
            </a>
            <div className="flex flex-row flex-wrap items-center justify-start gap-8 w-full">
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
