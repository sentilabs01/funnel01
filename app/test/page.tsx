// Test script for voice search and dark/light mode functionality
'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

export default function TestFeatures() {
  const [voiceTestResult, setVoiceTestResult] = useState<string>('Not tested');
  const [themeTestResult, setThemeTestResult] = useState<string>('Not tested');
  const [currentTheme, setCurrentTheme] = useState<string>('unknown');
  const { theme, setTheme } = useTheme();
  
  // Update current theme display when mounted and when theme changes
  useEffect(() => {
    setCurrentTheme(theme || 'system');
  }, [theme]);
  
  // Test voice recognition availability
  const testVoiceRecognition = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      try {
        const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = true;
        
        // Test if we can initialize and configure
        recognition.onresult = () => {};
        recognition.onend = () => {};
        
        setVoiceTestResult('PASS: Voice recognition is available and initialized correctly');
      } catch (error) {
        setVoiceTestResult(`FAIL: Error initializing voice recognition: ${error}`);
      }
    } else {
      setVoiceTestResult('FAIL: Voice recognition is not supported in this browser');
    }
  };
  
  // Test theme toggle functionality
  const testThemeToggle = () => {
    const initialTheme = theme;
    
    // Toggle theme
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    
    // Check if theme was toggled successfully
    setTimeout(() => {
      if (theme !== initialTheme) {
        setThemeTestResult(`PASS: Theme successfully toggled from ${initialTheme} to ${theme}`);
      } else {
        setThemeTestResult(`FAIL: Theme did not toggle from ${initialTheme}`);
      }
    }, 500);
  };
  
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Feature Testing</h1>
      
      <div className="mb-8 p-4 border rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Voice Search Test</h2>
        <p className="mb-4">Current status: <span className={voiceTestResult.includes('PASS') ? 'text-green-500' : voiceTestResult.includes('FAIL') ? 'text-red-500' : 'text-gray-500'}>{voiceTestResult}</span></p>
        <button 
          onClick={testVoiceRecognition}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Test Voice Recognition
        </button>
      </div>
      
      <div className="mb-8 p-4 border rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Theme Toggle Test</h2>
        <p className="mb-2">Current theme: <span className="font-medium">{currentTheme}</span></p>
        <p className="mb-4">Test status: <span className={themeTestResult.includes('PASS') ? 'text-green-500' : themeTestResult.includes('FAIL') ? 'text-red-500' : 'text-gray-500'}>{themeTestResult}</span></p>
        <button 
          onClick={testThemeToggle}
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
        >
          Test Theme Toggle
        </button>
      </div>
      
      <div className="mt-8">
        <a href="/" className="text-blue-500 hover:underline">Return to main page</a>
      </div>
    </div>
  );
}
