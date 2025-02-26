/**
 * Scale component for animating elements with a scale effect
 * Wraps children in a motion.div with scale animation
 */
"use client";

import { ReactNode } from "react";
import { motion, MotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface ScaleProps extends MotionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  initialScale?: number;
  viewportOnce?: boolean;
  viewportMargin?: string;
  hover?: boolean;
}

export function Scale({
  children,
  className,
  delay = 0,
  duration = 0.3,
  initialScale = 0.95,
  viewportOnce = true,
  viewportMargin = "0px",
  hover = false,
  ...props
}: ScaleProps) {
  // Create variants with the specified scale, delay, and duration
  const variants = {
    hidden: {
      scale: initialScale,
      opacity: 0,
    },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: duration,
        delay: delay,
        ease: [0.16, 1, 0.3, 1], // Custom ease curve for a nice spring effect
      },
    },
  };

  // Add hover effects if enabled
  const hoverProps = hover
    ? {
        whileHover: { scale: 1.03 },
        whileTap: { scale: 0.97 },
      }
    : {};

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      className={cn(className)}
      viewport={{
        once: viewportOnce,
        margin: viewportMargin,
      }}
      {...hoverProps}
      {...props}
    >
      {children}
    </motion.div>
  );
} 