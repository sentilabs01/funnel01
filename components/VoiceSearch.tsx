'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

interface VoiceSearchProps {
  onTranscript: (transcript: string) => void;
}

export default function VoiceSearch({ onTranscript }: VoiceSearchProps) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [recognition, setRecognition] = useState<any>(null);
  const { theme } = useTheme();

  useEffect(() => {
    // Check if browser supports SpeechRecognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = true;
      
      recognitionInstance.onresult = (event: any) => {
        const current = event.resultIndex;
        const currentTranscript = event.results[current][0].transcript;
        setTranscript(currentTranscript);
        onTranscript(currentTranscript);
      };
      
      recognitionInstance.onend = () => {
        setIsListening(false);
      };
      
      setRecognition(recognitionInstance);
    }
  }, [onTranscript]);

  const toggleListening = () => {
    if (isListening) {
      recognition?.stop();
      setIsListening(false);
    } else {
      setTranscript('');
      recognition?.start();
      setIsListening(true);
    }
  };

  return (
    <button
      onClick={toggleListening}
      className={`p-2 rounded-full transition-colors duration-200 ${
        isListening 
          ? 'bg-red-500 dark:bg-red-600 animate-pulse' 
          : 'bg-blue-500 dark:bg-blue-600'
      }`}
      aria-label={isListening ? 'Stop listening' : 'Start voice search'}
      title={isListening ? 'Stop listening' : 'Start voice search'}
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-5 w-5 text-white"
        viewBox="0 0 20 20" 
        fill="currentColor"
      >
        <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
      </svg>
    </button>
  );
}
