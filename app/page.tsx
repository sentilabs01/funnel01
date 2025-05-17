'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import dynamic from 'next/dynamic';
import SearchBar from '@/components/SearchBar';
import ThemeToggle from '@/components/ThemeToggle';
import Link from 'next/link';

// Dynamically import Spline component to avoid SSR issues
const SplineScene = dynamic(() => import('@/components/SplineScene'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent" />
        <p className="mt-4">Loading 3D scene...</p>
      </div>
    </div>
  ),
});

export default function Home() {
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent" />
          <p className="mt-4 text-gray-600 dark:text-gray-300">Loading application...</p>
        </div>
      </div>
    );
  }

  const handleSearch = async (query: string) => {
    if (!query.trim()) return;
    
    setIsSearching(true);
    
    try {
      const { vectorSearch } = await import('@/lib/vector-search');
      const results = await vectorSearch(query);
      setSearchResults(results);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([
        { id: '1', title: 'Website Design', content: 'Custom website design with responsive layouts, modern UI/UX, and seamless functionality.', type: 'service', similarity: 0.9 },
        { id: '2', title: 'Automation & Bots', content: 'Custom automation solutions and chatbots to streamline your business processes.', type: 'service', similarity: 0.8 },
        { id: '3', title: 'Graphics & Media', content: 'Custom graphics, animations, and media content to enhance your digital presence.', type: 'service', similarity: 0.7 },
      ]);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <main className="relative min-h-screen bg-gray-950 overflow-hidden p-8">
      {/* Theme Toggle */}
      <div className="absolute top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      {/* Main Container */}
      <div className="h-screen flex items-center justify-center gap-8">
        {/* Left Card - Spline Animation */}
        <div className="flex-1 h-[90vh] rounded-2xl overflow-hidden bg-black/40 backdrop-blur-xl border border-white/10 shadow-lg">
          <SplineScene 
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full"
          />
        </div>

        {/* Right Card - Search Interface */}
        <div className="flex-1 h-[90vh] rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 shadow-lg p-8 flex flex-col">
          {/* Logo and Title */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-fuchsia-500 mb-4 font-['Orbitron'] tracking-wider">
              AUTOMATION ALIEN
            </h1>
            <p className="text-gray-400 text-lg tracking-wide font-['Orbitron']">
              VECTOR SEARCH ENGINE
            </p>
          </div>

          {/* Search Bar */}
          <div className="w-full max-w-2xl mx-auto mb-8">
            <SearchBar onSearch={handleSearch} />
          </div>

          {/* Search Results */}
          <div className="flex-1 overflow-y-auto pr-4">
            {isSearching ? (
              <div className="text-center">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent" />
              </div>
            ) : (
              <div className="space-y-4">
                {searchResults.map((result, index) => (
                  <div 
                    key={index}
                    className="p-6 rounded-xl bg-black/40 backdrop-blur-xl border border-white/10 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <h2 className="text-xl font-semibold text-white mb-2 font-['Orbitron'] tracking-wide">
                      {result.title}
                    </h2>
                    <p className="text-gray-300">{result.content}</p>
                    <div className="mt-4 flex justify-between items-center">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                        {result.type}
                      </span>
                      {result.similarity && (
                        <span className="text-sm text-cyan-400">
                          Match: {Math.round(result.similarity * 100)}%
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
