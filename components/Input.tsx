import { cn } from "@/lib/utils"
import type { InputHTMLAttributes } from "react"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

const Input = ({ className, label, error, ...props }: InputProps) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-white/80 mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          className={cn(
            // Base styles
            "w-full px-4 py-3 bg-transparent",
            "rounded-xl backdrop-blur-xl",
            "bg-white/5 border border-white/10",
            "text-white placeholder:text-gray-400",
            "shadow-[0_0_1rem_0_rgba(0,0,0,0.2)]",
            // Focus styles
            "focus:outline-none focus:ring-2 focus:ring-violet-500/50",
            "focus:border-white/20 focus:bg-white/10",
            // Font
            "font-['Space_Grotesk'] text-base tracking-wide",
            // Error styles
            error && "border-red-500/50 focus:ring-red-500/50",
            className
          )}
          {...props}
        />
        {/* Inner glow */}
        <div className="absolute inset-0 rounded-xl opacity-30 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-500/30 via-transparent to-fuchsia-500/30" />
        </div>
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-400">{error}</p>
      )}
    </div>
  )
}

export default Input 