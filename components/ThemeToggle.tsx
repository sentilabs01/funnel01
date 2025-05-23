'use client';

import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  // Avoid hydration mismatch
  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <div
      onClick={toggleTheme}
      className="fixed top-4 right-4 p-2 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg cursor-pointer"
      style={{ WebkitTapHighlightColor: 'transparent' }}
      role="button"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <motion.span 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{ display: 'block', position: 'relative', width: '1.5rem', height: '1.5rem' }}
      >
        <motion.span
          initial={false}
          animate={{
            scale: theme === 'light' ? 0 : 1,
            opacity: theme === 'light' ? 0 : 1,
          }}
          transition={{ duration: 0.2 }}
          style={{ 
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Moon className="text-yellow-300" size={20} />
        </motion.span>
        <motion.span
          initial={false}
          animate={{
            scale: theme === 'light' ? 1 : 0,
            opacity: theme === 'light' ? 1 : 0,
          }}
          transition={{ duration: 0.2 }}
          style={{ 
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Sun className="text-yellow-500" size={20} />
        </motion.span>
      </motion.span>
    </div>
  )
}

export default ThemeToggle
