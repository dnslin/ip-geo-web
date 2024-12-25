import { useState, useCallback } from "react";

export function useToast() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const showToast = useCallback((msg: string) => {
    setMessage(msg);
    setIsOpen(true);
  }, []);

  const hideToast = useCallback(() => {
    setIsOpen(false);
  }, []);

  return {
    isOpen,
    message,
    showToast,
    hideToast,
  };
}
