/**
 * FadeIn component for animating elements with a fade-in effect
 * Wraps children in a motion.div with fade-in animation
 */
"use client";

import { ReactNode } from "react";
import { motion, MotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface FadeInProps extends MotionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  viewportOnce?: boolean;
  viewportMargin?: string;
}

export function FadeIn({
  children,
  className,
  delay = 0,
  duration = 0.4,
  viewportOnce = true,
  viewportMargin = "0px",
  ...props
}: FadeInProps) {
  // Create custom variants with the specified delay and duration
  const variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: duration,
        delay: delay 
      }
    },
  };

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
      {...props}
    >
      {children}
    </motion.div>
  );
} 