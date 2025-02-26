/**
 * Toast provider component for managing toast notifications
 * Uses sonner for toast notifications
 */
"use client";

import { Toaster } from "@/components/ui/sonner";

export function ToastProvider() {
  return (
    <Toaster 
      position="bottom-right"
      toastOptions={{
        duration: 5000,
        className: "border border-border",
      }}
    />
  );
} 