'use client';

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Search, Mic, MicOff } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

// Type definitions for Web Speech API
interface SpeechRecognitionEvent extends Event {
  results: {
    [index: number]: {
      [index: number]: {
        transcript: string;
      };
    };
  };
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  onstart: () => void;
  onresult: (event: SpeechRecognitionEvent) => void;
  onend: () => void;
  onerror: (event: SpeechRecognitionErrorEvent) => void;
  start: () => void;
}

interface SpeechRecognitionConstructor {
  new (): SpeechRecognition;
}

interface Window {
  webkitSpeechRecognition: SpeechRecognitionConstructor;
  SpeechRecognition: SpeechRecognitionConstructor;
}

interface SearchBarProps {
  placeholder?: string
  onSearch?: (query: string) => void
}

const SearchBar = ({ placeholder = "SEARCH AI DATABASE...", onSearch }: SearchBarProps) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isFocused, setIsFocused] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isAnimating, setIsAnimating] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [hasVoiceSupport, setHasVoiceSupport] = useState(false)

  useEffect(() => {
    // Check if browser supports speech recognition
    setHasVoiceSupport('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)
  }, [])

  const startVoiceInput = async () => {
    if (!hasVoiceSupport) return

    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition
    const recognition = new SpeechRecognition()

    recognition.continuous = false
    recognition.interimResults = false

    recognition.onstart = () => {
      setIsListening(true)
    }

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript
      setSearchQuery(transcript)
      if (onSearch) {
        onSearch(transcript)
      }
    }

    recognition.onend = () => {
      setIsListening(false)
    }

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error)
      setIsListening(false)
    }

    recognition.start()
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (onSearch && searchQuery.trim()) {
      onSearch(searchQuery)
      setIsAnimating(true)
      setTimeout(() => setIsAnimating(false), 1000)
    }
  }

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Outer glow effect */}
      <div className={cn(
        "absolute -inset-2 rounded-2xl opacity-50 blur-xl transition-all duration-500",
        "bg-gradient-to-r from-cyan-500/30 via-purple-500/30 to-fuchsia-500/30",
        isFocused && "opacity-100 -inset-3 blur-2xl",
        "animate-pulse-slow"
      )} />

      {/* Neon border effect */}
      <div className={cn(
        "absolute -inset-[1px] rounded-2xl transition-opacity duration-300",
        "bg-gradient-to-r from-cyan-500 via-purple-500 to-fuchsia-500",
        "opacity-50",
        isFocused && "opacity-100 animate-neon"
      )} />

      <div
        role="search"
        className="relative"
      >
        <form onSubmit={handleSubmit}>
          <div
            className={cn(
              "relative flex items-center backdrop-blur-xl rounded-2xl transition-all duration-300",
              "bg-black/40 border border-white/10",
              "shadow-[0_0_1rem_0_rgba(0,0,0,0.2)]",
              isFocused && [
                "bg-black/60 border-white/20",
                "shadow-[0_0_2rem_0_rgba(0,0,0,0.4)]",
                "scale-[1.02]"
              ]
            )}
          >
            {/* Search icon */}
            <div className={cn(
              "pl-6 transition-transform duration-300",
              isFocused && "scale-110"
            )}>
              <Search
                size={20}
                className={cn(
                  "transition-all duration-300",
                  isAnimating ? "text-cyan-400" : isFocused ? "text-white" : "text-gray-400",
                  isFocused && "drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]"
                )}
              />
            </div>

            {/* Input field */}
            <input
              ref={inputRef}
              type="text"
              placeholder={placeholder}
              value={searchQuery}
              onChange={handleSearch}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className={cn(
                "w-full py-5 px-4 bg-transparent",
                "text-base md:text-lg tracking-wider uppercase",
                "text-white placeholder:text-gray-500",
                "outline-none focus:outline-none",
                "transition-all duration-300",
                "font-['Orbitron']",
                isFocused && "tracking-widest"
              )}
            />

            {/* Voice input button */}
            {hasVoiceSupport && (
              <AnimatePresence>
                <motion.div
                  className={cn(
                    "p-3 mx-2 rounded-xl inline-flex items-center justify-center",
                    "transition-all duration-300",
                    "hover:bg-white/10 active:bg-white/20",
                    "group cursor-pointer",
                    isListening && [
                      "bg-red-500/20",
                      "animate-pulse"
                    ]
                  )}
                  onClick={startVoiceInput}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  {isListening ? (
                    <MicOff className="text-red-400 drop-shadow-[0_0_8px_rgba(248,113,113,0.5)]" size={20} />
                  ) : (
                    <Mic className="text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]" size={20} />
                  )}
                </motion.div>
              </AnimatePresence>
            )}

            {/* Search button */}
            {searchQuery && (
              <motion.div
                onClick={handleSubmit}
                className={cn(
                  "mr-3 px-6 py-2.5 rounded-xl inline-flex items-center justify-center",
                  "bg-gradient-to-r from-cyan-500 via-purple-500 to-fuchsia-500",
                  "text-white font-bold tracking-widest uppercase text-sm",
                  "shadow-lg shadow-cyan-500/20",
                  "transition-all duration-300 ease-out",
                  "hover:shadow-xl hover:shadow-cyan-500/30",
                  "hover:from-cyan-400 hover:via-purple-400 hover:to-fuchsia-400",
                  "active:from-cyan-600 active:via-purple-600 active:to-fuchsia-600",
                  "font-['Orbitron']",
                  "relative overflow-hidden group cursor-pointer"
                )}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10">SEARCH</span>
                {/* Button shine effect */}
                <div className={cn(
                  "absolute inset-0 opacity-0 group-hover:opacity-100",
                  "transition-opacity duration-300",
                  "bg-gradient-to-r from-transparent via-white/20 to-transparent",
                  "translate-x-[-100%] group-hover:translate-x-[100%]",
                  "transition-transform duration-1000"
                )} />
              </motion.div>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default SearchBar
