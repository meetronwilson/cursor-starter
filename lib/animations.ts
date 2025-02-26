/**
 * Animation utility functions and variants for Framer Motion
 * These can be used with the animation components or directly with Framer Motion
 */

import { Variants } from "framer-motion";

// Fade in animation variants
export const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.4 }
  },
};

// Slide in animation variants (supports different directions)
export const slideInVariants = (direction: "left" | "right" | "up" | "down" = "up"): Variants => {
  const directions = {
    up: { y: 20 },
    down: { y: -20 },
    left: { x: 20 },
    right: { x: -20 }
  };

  return {
    hidden: { 
      ...directions[direction], 
      opacity: 0 
    },
    visible: { 
      x: 0, 
      y: 0, 
      opacity: 1,
      transition: { 
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };
};

// Scale animation variants
export const scaleVariants: Variants = {
  hidden: { 
    scale: 0.95,
    opacity: 0 
  },
  visible: { 
    scale: 1,
    opacity: 1,
    transition: { 
      duration: 0.3,
      ease: [0.16, 1, 0.3, 1] // Custom ease curve for a nice spring effect
    }
  }
};

// Staggered children animation helper
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1 // Delay between each child animation
    }
  }
};

// Hover scale effect for interactive elements
export const hoverScale = {
  whileHover: { scale: 1.03 },
  whileTap: { scale: 0.97 }
};

// Bounce animation for attention-grabbing elements
export const bounceVariants: Variants = {
  hidden: { 
    y: 0,
    opacity: 0 
  },
  visible: { 
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 10
    }
  }
}; 