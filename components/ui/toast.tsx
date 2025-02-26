/**
 * Toast component for displaying notifications
 * Supports different types: default, success, error, warning, info
 */
"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { Toast as ToastType, ToastType as ToastVariant } from "@/lib/hooks/use-toast";

interface ToastProps {
  toast: ToastType;
  onDismiss: (id: string) => void;
}

const toastVariants = {
  initial: { opacity: 0, y: 50, scale: 0.8 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
};

const ToastIcon = ({ type }: { type: ToastVariant }) => {
  switch (type) {
    case "success":
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    case "error":
      return <AlertCircle className="h-5 w-5 text-red-500" />;
    case "warning":
      return <AlertTriangle className="h-5 w-5 text-amber-500" />;
    case "info":
      return <Info className="h-5 w-5 text-blue-500" />;
    default:
      return null;
  }
};

export function Toast({ toast, onDismiss }: ToastProps) {
  const [progress, setProgress] = useState(100);
  const { id, title, description, type = "default", duration = 5000, action } = toast;

  // Handle progress bar animation
  useEffect(() => {
    if (duration === Infinity) return;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 100 / (duration / 100);
      });
    }, 100);

    return () => clearInterval(timer);
  }, [duration]);

  return (
    <motion.div
      key={id}
      layout
      initial="initial"
      animate="animate"
      exit="exit"
      variants={toastVariants}
      className={cn(
        "relative flex w-full max-w-md overflow-hidden rounded-lg border shadow-lg",
        "bg-background text-foreground",
        "dark:bg-background dark:text-foreground"
      )}
    >
      <div
        className={cn(
          "flex w-full flex-col gap-1 p-4",
          action ? "pr-12" : "pr-8"
        )}
      >
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <ToastIcon type={type} />
          </div>
          <div className="flex-1">
            {title && <div className="font-semibold">{title}</div>}
            {description && (
              <div className="text-sm text-muted-foreground">{description}</div>
            )}
          </div>
        </div>

        {action && <div className="mt-2">{action}</div>}

        <button
          onClick={() => onDismiss(id)}
          className="absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-70 transition-opacity hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Progress bar */}
      {duration !== Infinity && (
        <div className="absolute bottom-0 left-0 h-1 bg-primary" style={{ width: `${progress}%` }} />
      )}
    </motion.div>
  );
}

interface ToastContainerProps {
  toasts: ToastType[];
  onDismiss: (id: string) => void;
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left" | "top-center" | "bottom-center";
}

export function ToastContainer({
  toasts,
  onDismiss,
  position = "bottom-right",
}: ToastContainerProps) {
  const positionClasses = {
    "top-right": "top-0 right-0",
    "top-left": "top-0 left-0",
    "bottom-right": "bottom-0 right-0",
    "bottom-left": "bottom-0 left-0",
    "top-center": "top-0 left-1/2 -translate-x-1/2",
    "bottom-center": "bottom-0 left-1/2 -translate-x-1/2",
  };

  return (
    <div
      className={cn(
        "fixed z-50 m-4 flex flex-col gap-2",
        positionClasses[position]
      )}
    >
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <Toast key={toast.id} toast={toast} onDismiss={onDismiss} />
        ))}
      </AnimatePresence>
    </div>
  );
} 