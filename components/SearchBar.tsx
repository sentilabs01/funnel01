'use client';

import { useState, useEffect } from 'react';
import VoiceSearch from './VoiceSearch';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  const handleVoiceInput = (transcript: string) => {
    setQuery(transcript);
    // Auto-search after voice input completes
    if (transcript.trim()) {
      onSearch(transcript);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <form 
        onSubmit={handleSearch}
        className={`relative flex items-center transition-all duration-300 ${
          isFocused 
            ? 'bg-white dark:bg-gray-800 shadow-lg' 
            : 'bg-gray-100 dark:bg-gray-900'
        } rounded-full overflow-hidden`}
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Search for anything..."
          className="w-full py-3 px-6 bg-transparent outline-none text-gray-900 dark:text-gray-100"
          aria-label="Search query"
        />
        
        <div className="flex items-center space-x-2 pr-3">
          <VoiceSearch onTranscript={handleVoiceInput} />
          
          <button
            type="submit"
            className="p-2 rounded-full bg-cyan-500 hover:bg-cyan-600 transition-colors duration-200"
            aria-label="Search"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 text-white" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
              />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
}
