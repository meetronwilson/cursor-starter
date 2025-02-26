/**
 * SlideIn component for animating elements with a slide-in effect
 * Wraps children in a motion.div with slide-in animation from different directions
 */
"use client";

import { ReactNode } from "react";
import { motion, MotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface SlideInProps extends MotionProps {
  children: ReactNode;
  className?: string;
  direction?: "left" | "right" | "up" | "down";
  delay?: number;
  duration?: number;
  distance?: number;
  viewportOnce?: boolean;
  viewportMargin?: string;
}

export function SlideIn({
  children,
  className,
  direction = "up",
  delay = 0,
  duration = 0.4,
  distance = 20,
  viewportOnce = true,
  viewportMargin = "0px",
  ...props
}: SlideInProps) {
  // Create directional offsets
  const getDirectionalOffset = () => {
    switch (direction) {
      case "up":
        return { y: distance };
      case "down":
        return { y: -distance };
      case "left":
        return { x: distance };
      case "right":
        return { x: -distance };
      default:
        return { y: distance };
    }
  };

  // Create variants with the specified direction, delay, and duration
  const variants = {
    hidden: {
      ...getDirectionalOffset(),
      opacity: 0,
    },
    visible: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        duration: duration,
        delay: delay,
        ease: "easeOut",
      },
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