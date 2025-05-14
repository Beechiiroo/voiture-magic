
import { useState, useEffect } from 'react';

export type ToastVariant = 'default' | 'success' | 'destructive' | 'warning';

export interface Toast {
  id: string;
  title?: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
}

export interface ToastOptions {
  title?: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
}

let toastCount = 0;

function generateId() {
  return `toast-${Date.now()}-${toastCount++}`;
}

// This is a simple implementation of toast functionality
// In a real app, you'd want to use a more robust solution
export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (options: ToastOptions) => {
    const toast: Toast = {
      id: generateId(),
      title: options.title,
      description: options.description,
      variant: options.variant || 'default',
      duration: options.duration || 5000,
    };

    setToasts((prev) => [...prev, toast]);
    return toast.id;
  };

  const dismissToast = (toastId: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== toastId));
  };

  return {
    toasts,
    toast: addToast,
    dismiss: dismissToast,
  };
}

// For use outside React components (like in utility functions)
export const toast = (options: ToastOptions) => {
  const event = new CustomEvent('add-toast', {
    detail: options,
  });
  document.dispatchEvent(event);
};

// Clean up event listeners when the component unmounts
useEffect(() => {
  const handleAddToast = (event: CustomEvent<ToastOptions>) => {
    toast(event.detail);
  };

  document.addEventListener('add-toast', handleAddToast as EventListener);

  return () => {
    document.removeEventListener('add-toast', handleAddToast as EventListener);
  };
}, []);

export default useToast;
