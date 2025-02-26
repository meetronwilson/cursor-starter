/**
 * Toast hook for managing toast notifications
 * Uses sonner for toast notifications
 */
import { toast as sonnerToast } from "sonner";

interface ToastOptions {
  title?: string;
  description?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
  onDismiss?: () => void;
}

export function useToast() {
  const toast = (options: ToastOptions) => {
    const { title, description, duration, action, onDismiss } = options;
    
    return sonnerToast(title || "", {
      description,
      duration,
      action: action ? {
        label: action.label,
        onClick: action.onClick,
      } : undefined,
      onDismiss,
    });
  };

  const success = (options: Omit<ToastOptions, "type">) => {
    const { title, description, duration, action, onDismiss } = options;
    
    return sonnerToast.success(title || "", {
      description,
      duration,
      action: action ? {
        label: action.label,
        onClick: action.onClick,
      } : undefined,
      onDismiss,
    });
  };

  const error = (options: Omit<ToastOptions, "type">) => {
    const { title, description, duration, action, onDismiss } = options;
    
    return sonnerToast.error(title || "", {
      description,
      duration,
      action: action ? {
        label: action.label,
        onClick: action.onClick,
      } : undefined,
      onDismiss,
    });
  };

  const warning = (options: Omit<ToastOptions, "type">) => {
    const { title, description, duration, action, onDismiss } = options;
    
    return sonnerToast(title || "", {
      description,
      duration,
      action: action ? {
        label: action.label,
        onClick: action.onClick,
      } : undefined,
      onDismiss,
      className: "bg-amber-50 dark:bg-amber-900 border-amber-200 dark:border-amber-800",
    });
  };

  const info = (options: Omit<ToastOptions, "type">) => {
    const { title, description, duration, action, onDismiss } = options;
    
    return sonnerToast.info(title || "", {
      description,
      duration,
      action: action ? {
        label: action.label,
        onClick: action.onClick,
      } : undefined,
      onDismiss,
    });
  };

  return {
    toast,
    success,
    error,
    warning,
    info,
    dismiss: sonnerToast.dismiss,
    // For compatibility with the previous API
    dismissToast: sonnerToast.dismiss,
    // Expose the original sonner toast for advanced usage
    sonnerToast,
  };
} 