import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import type { HTMLAttributes } from "react"

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean
}

// Utility to filter out unwanted props for motion.div
function filterMotionDivProps(props: CardProps) {
  const rest = { ...props };
  delete rest.onDrag;
  delete rest.onDragStart;
  delete rest.onDragEnd;
  delete rest.onDragOver;
  delete rest.onDragEnter;
  delete rest.onDragLeave;
  delete rest.onDrop;
  delete rest.onAnimationStart;
  delete rest.onAnimationEnd;
  delete rest.onAnimationIteration;
  return rest;
}

const Card = ({ children, className, hover = true, ...props }: CardProps) => {
  const restProps = filterMotionDivProps(props) as Omit<React.ComponentProps<typeof motion.div>, 'ref'>;
  return (
    <motion.div
      whileHover={hover ? { scale: 1.01, y: -2 } : undefined}
      transition={{ duration: 0.2 }}
      className={cn(
        // Base styles
        "rounded-2xl backdrop-blur-xl",
        "bg-white/5 border border-white/10",
        "shadow-[0_0_1rem_0_rgba(0,0,0,0.2)]",
        // Hover effects
        hover && "hover:shadow-[0_0_2rem_0_rgba(0,0,0,0.2)] hover:bg-white/10 hover:border-white/20",
        // Inner glow
        "relative overflow-hidden",
        className
      )}
      {...restProps}
    >
      {/* Inner glow effect */}
      <div className="absolute inset-0 rounded-2xl opacity-30">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-500/30 via-transparent to-fuchsia-500/30" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  )
}

export default Card 