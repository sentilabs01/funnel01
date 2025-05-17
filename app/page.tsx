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
      <span className="loader">Loading 3D scene...</span>
    </div>
  ),
});

export default function Home() {
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted before rendering theme-dependent elements
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSearch = async (query: string) => {
    if (!query.trim()) return;
    
    setIsSearching(true);
    
    try {
      // Import dynamically to avoid SSR issues
      const { vectorSearch } = await import('@/lib/vector-search');
      const results = await vectorSearch(query);
      setSearchResults(results);
    } catch (error) {
      console.error('Search error:', error);
      // Fallback to mock results on error
      setSearchResults([
        { id: '1', title: 'Website Design', content: 'Custom website design with responsive layouts, modern UI/UX, and seamless functionality.', type: 'service', similarity: 0.9 },
        { id: '2', title: 'Automation & Bots', content: 'Custom automation solutions and chatbots to streamline your business processes.', type: 'service', similarity: 0.8 },
        { id: '3', title: 'Graphics & Media', content: 'Custom graphics, animations, and media content to enhance your digital presence.', type: 'service', similarity: 0.7 },
      ]);
    } finally {
      setIsSearching(false);
    }
  };

  if (!mounted) {
    return null; // Avoid rendering until client-side
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-24 bg-gray-50 dark:bg-gray-950 transition-colors duration-300 theme-transition">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <SplineScene 
          scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
          className="w-full h-full"
        />
      </div>
      
      <div className="w-full max-w-5xl mx-auto z-10 responsive-test">
        <div className="flex justify-between items-center mb-4">
          <Link href="/test" className="text-sm text-gray-500 dark:text-gray-400 hover:underline">
            Test Features
          </Link>
          <ThemeToggle />
        </div>
        
        <div className="flex flex-col items-center justify-center space-y-8 my-12">
          <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 text-center">
            Automation Alien
          </h1>
          
          <SearchBar onSearch={handleSearch} />
        </div>
        
        {isSearching ? (
          <div className="mt-12 text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="mt-12 space-y-6">
            {searchResults.length > 0 ? (
              searchResults.map((result, index) => (
                <div 
                  key={index}
                  className="p-6 rounded-lg bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{result.title}</h2>
                  <p className="mt-2 text-gray-700 dark:text-gray-300">{result.content}</p>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200">
                      {result.type}
                    </span>
                    {result.similarity && (
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Match: {Math.round(result.similarity * 100)}%
                      </span>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 dark:text-gray-400">
                {searchResults.length === 0 && 
                  <p>Search for Automation Alien services using the search bar above.</p>
                }
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
