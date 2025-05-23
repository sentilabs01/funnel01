import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import type { ButtonHTMLAttributes } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
}

const Button = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled,
  ...props
}: ButtonProps) => {
  const variants = {
    primary: "bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white shadow-lg shadow-purple-500/20 hover:shadow-xl hover:shadow-purple-500/30",
    secondary: "bg-white/10 text-white border border-white/20 hover:bg-white/20",
    ghost: "bg-transparent text-white hover:bg-white/10"
  }

  const sizes = {
    sm: "px-4 py-1.5 text-sm",
    md: "px-6 py-2 text-base",
    lg: "px-8 py-3 text-lg"
  }

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        // Base styles
        "rounded-xl font-medium tracking-wide transition-all duration-300 ease-out",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        "font-['Space_Grotesk']",
        // Variant and size styles
        variants[variant],
        sizes[size],
        // Custom classes
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
          Loading...
        </div>
      ) : children}
    </motion.button>
  )
}

export default Button 